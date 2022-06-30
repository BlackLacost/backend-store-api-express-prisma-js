const prisma = require('../db')
const ApiError = require('../errors/ApiError')

class BrandsController {
  async create(req, res, next) {
    const { name } = req.body
    const brandExists = await prisma.brand.findUnique({ where: { name } })

    if (brandExists) {
      return next(
        ApiError.badRequest(`Бренд ${brandExists.name} уже существует`)
      )
    }

    const brand = await prisma.brand.create({ data: { name } })
    return res.json(brand)
  }

  async getAll(req, res) {
    const brands = await prisma.brand.findMany()
    return res.json(brands)
  }
}

module.exports = new BrandsController()
