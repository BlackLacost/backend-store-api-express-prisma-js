const Router = require('express')
const router = new Router()
const typesController = require('../controllers/types.controller')

router.post('/', typesController.create)
router.get('/', typesController.getAll)

module.exports = { typesRouter: router }
