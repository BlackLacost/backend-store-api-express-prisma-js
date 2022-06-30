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
}

module.exports = new TypesController()
