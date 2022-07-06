const Router = require('express')
const router = new Router()
const typesController = require('../controllers/types.controller')
const checkRoleMiddleware = require('../middleware/check-role.middleware')
const errorHandler = require('../middleware/error-handler.wrapper')

router.post(
  '/',
  checkRoleMiddleware('ADMIN'),
  errorHandler(typesController.create)
)
router.get('/', errorHandler(typesController.getAll))
router.get('/:typeId', errorHandler(typesController.getOne))

module.exports = { typesRouter: router }
