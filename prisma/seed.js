const prisma = require('../src/db')
const { devices, typesName } = require('./data')

async function start() {
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

  for (let { name, img, price, type, brand } of devices) {
    await prisma.device.create({
      data: {
        name,
        img,
        price,
        brand: {
          connectOrCreate: {
            where: { name: brand.name },
            create: { name: brand.name },
          },
        },
        type: {
          connectOrCreate: {
            where: { name: type.name },
            create: { name: type.name },
          },
        },
      },
    })
  }
  console.log('Added device data with brand & type')

  for (let typeName of Object.values(typesName)) {
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
