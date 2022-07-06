const prisma = require('../db')
const ApiError = require('../errors/ApiError')

class TypesController {
  async create(req, res, next) {
    const { name } = req.body
    const typeExists = await prisma.type.findUnique({ where: { name } })

    if (typeExists) {
      return next(ApiError.badRequest(`Тип ${typeExists.name} уже существует`))
    }

    const type = await prisma.type.create({ data: { name } })
    return res.json(type)
  }

  async getAll(req, res) {
    const types = await prisma.type.findMany()
    return res.json(types)
  }

  async getOne(req, res) {
    const { typeId } = req.params
    const { brands, devices } = req.query

    const type = await prisma.type.findUnique({
      where: { id: Number(typeId) },
      ...((brands || devices) && {
        include: {
          ...(brands === true && { brands: true }),
          ...(devices === true && { devices: true }),
        },
      }),
    })
    return res.json(type)
  }
}

module.exports = new TypesController()
