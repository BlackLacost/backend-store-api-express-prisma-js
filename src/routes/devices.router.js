const uuid = require('uuid')
const Router = require('express')
const multer = require('multer')
const path = require('path')

const devicesController = require('../controllers/devices.controller')
const errorHandler = require('../middleware/error-handler.wrapper')

const router = new Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'static')
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid.v4()}-${file.originalname}`)
  },
})
const upload = multer({ storage })

router.post('/', upload.single('img'), errorHandler(devicesController.create))
router.get('/', errorHandler(devicesController.getAll))
router.get('/:id', errorHandler(devicesController.getOne))

module.exports = { devicesRouter: router }
