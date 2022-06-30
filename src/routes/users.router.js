const Router = require('express')
const usersController = require('../controllers/users.controller')
const router = new Router()

router.post('/registration', usersController.registration)
router.post('/login', usersController.login)
router.get('/auth', usersController.check)

module.exports = { usersRouter: router }
