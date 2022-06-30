require('dotenv').config()
const express = require('express')
const errorHandler = require('./middleware/error-handler.middleware')
const { router } = require('./routes')

const PORT = process.env.PORT || 5000
const app = express()
app.use('/api', router)

// Обработка ошибок должна регистрироваться в конце без вызова next()
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
