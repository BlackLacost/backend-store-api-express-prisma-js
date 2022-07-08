const prisma = require('../db')
const ApiError = require('../errors/ApiError')

class DevicesController {
  async create(req, res, next) {
    const { name, price, brandId, typeId, info } = req.body

    const deviceExists = await prisma.device.findUnique({ where: { name } })

    if (deviceExists) {
      return next(
        ApiError.badRequest(`Устройство ${deviceExists.name} уже есть`)
      )
    }

    const { filename } = req.file
    const device = await prisma.device.create({
      data: {
        name,
        price: parseInt(price),
        brandId: parseInt(brandId),
        typeId: parseInt(typeId),
        img: filename,
      },
    })

    return res.json(device)
  }

  async getAll(req, res) {
    const { typeId, brandId, take: take = 9, page: page = 1 } = req.query

    const skip = page * take - take

    const [count, devices] = await prisma.$transaction([
      prisma.device.count({
        where: {
          ...(typeId && { typeId }),
          ...(brandId && { brandId }),
        },
      }),
      prisma.device.findMany({
        where: {
          ...(typeId && { typeId }),
          ...(brandId && { brandId }),
        },
        include: { brand: true },
        skip,
        take,
      }),
    ])
    return res.json({
      pages: Math.ceil(count / take),
      devices,
    })
  }

  async getOne(req, res) {
    const { id } = req.params
    const device = await prisma.device.findUnique({
      where: { id: +id },
      include: { brand: true, type: true },
    })
    return res.json(device)
  }
}

module.exports = new DevicesController()
