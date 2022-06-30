const Router = require('express')
const usersController = require('../controllers/users.controller')
const errorHandler = require('../middleware/error-handler.wrapper')
const authMiddleware = require('../middleware/auth.middleware')

const router = new Router()

router.post('/registration', errorHandler(usersController.registration))
router.post('/login', errorHandler(usersController.login))
router.get('/auth', authMiddleware, errorHandler(usersController.check))

module.exports = { usersRouter: router }
