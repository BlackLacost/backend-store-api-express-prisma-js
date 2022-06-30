const Router = require('express')
const brandsController = require('../controllers/brands.controller')
const router = new Router()

router.post('/', brandsController.create)
router.get('/', brandsController.getAll)

module.exports = { brandsRouter: router }
