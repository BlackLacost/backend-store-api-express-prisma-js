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
    const devices = await prisma.device.findMany({
      include: { brand: true, type: true },
    })
    return res.json(devices)
  }

  async getOne(req, res, next) {}
}

module.exports = new DevicesController()
