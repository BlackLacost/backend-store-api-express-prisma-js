const Router = require('express')
const devicesController = require('../controllers/devices.controller')
const router = new Router()

router.post('/', devicesController.create)
router.get('/', devicesController.getAll)
router.get('/:id', devicesController.getOne)

module.exports = { devicesRouter: router }
