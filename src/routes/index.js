const Router = require('express')
const { brandsRouter } = require('./brands.router')
const { typesRouter } = require('./types.router')
const { devicesRouter } = require('./devices.router')
const { usersRouter } = require('./users.router')

const router = new Router()

router.use('/users', usersRouter)
router.use('/types', typesRouter)
router.use('/brands', brandsRouter)
router.use('/devices', devicesRouter)

module.exports = { router }
