const fs = require('fs')
const prisma = require('../src/db')
const { scraperData } = require('./data/scraperData')

const devices = JSON.parse(fs.readFileSync('devices.json'))
const typeNames = [...new Set(devices.map((device) => device.type))]

async function start() {
  await scraperData()
  console.log('Scrapped data to devices.json')

  await prisma.type.deleteMany({})
  console.log('Deleted records in type table')

  await prisma.brand.deleteMany({})
  console.log('Deleted records in brand table')

  await prisma.device.deleteMany({})
  console.log('Deleted records in device table')

  await prisma.$queryRaw`ALTER SEQUENCE "Type_id_seq" RESTART 1`
  console.log('Reset type auto increment to 1')

  await prisma.$queryRaw`ALTER SEQUENCE "Brand_id_seq" RESTART 1`
  console.log('Reset brand auto increment to 1')

  await prisma.$queryRaw`ALTER SEQUENCE "Device_id_seq" RESTART 1`
  console.log('Reset device auto increment to 1')

  for (let { name, images, price, type, brand } of devices) {
    await prisma.device.create({
      data: {
        name,
        img: images[0],
        price,
        brand: {
          connectOrCreate: {
            where: { name: brand },
            create: { name: brand },
          },
        },
        type: {
          connectOrCreate: {
            where: { name: type },
            create: { name: type },
          },
        },
      },
    })
  }
  console.log('Added device data with brand & type')

  for (let typeName of typeNames) {
    const brandsId = (
      await prisma.device.findMany({
        where: { type: { name: typeName } },
        select: { brandId: true },
      })
    ).map((item) => item.brandId)

    for (let brandId of brandsId) {
      await prisma.type.update({
        where: { name: typeName },
        data: { brands: { connect: { id: brandId } } },
      })
    }
  }
  console.log('Added to each type there brands')
}

start().catch((err) => console.log(err))
