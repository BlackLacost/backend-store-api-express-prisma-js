const Router = require('express')
const router = new Router()
const typesController = require('../controllers/types.controller')
const errorHandler = require('../middleware/error-handler.wrapper')

router.post('/', errorHandler(typesController.create))
router.get('/', errorHandler(typesController.getAll))

module.exports = { typesRouter: router }
