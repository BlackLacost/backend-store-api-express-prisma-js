const Router = require('express')
const brandsController = require('../controllers/brands.controller')
const errorHandler = require('../middleware/error-handler.wrapper')
const router = new Router()

router.post('/', errorHandler(brandsController.create))
router.get('/', errorHandler(brandsController.getAll))

module.exports = { brandsRouter: router }
