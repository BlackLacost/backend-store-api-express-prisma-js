const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../errors/ApiError')
const prisma = require('../db')

function generateJwt(id, email, role) {
  const token = jwt.sign({ id, email, role }, process.env.SECRET_JWT, {
    expiresIn: '24h',
  })
  return token
}

class UsersController {
  async registration(req, res, next) {
    const { email, password } = req.body
    if (!email && !password) {
      return next(ApiError.badRequest('Некорректный email или пароль'))
    }

    const candidate = await prisma.user.findUnique({ where: { email } })
    if (candidate) {
      return next(
        ApiError.badRequest(`Пользователь с таким ${email} уже существует`)
      )
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
      data: { email, password: hashPassword },
    })

    await prisma.basket.create({
      data: { userId: user.id },
    })

    const token = generateJwt(user.id, email, user.role)

    return res.json(token)
  }

  async login(req, res) {
    const { email, password } = req.body

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest('Пользователь или пароль не верен'))
    }

    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Пользователь или пароль не верен'))
    }

    const token = generateJwt(user.id, user.email, user.role)
    return res.json(token)
  }

  async check(req, res, next) {}
}

module.exports = new UsersController()
