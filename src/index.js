require('dotenv').config()
const express = require('express')
const { queryParser } = require('express-query-parser')
const path = require('path')
const cors = require('cors')

const prisma = require('./db')
const errorHandler = require('./middleware/error-handler.middleware')
const { router } = require('./routes')

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(cors())
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
)
app.use('/api', router)

// Обработка ошибок должна регистрироваться в конце без вызова next()
app.use(errorHandler)

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  } finally {
    await prisma.$disconnect()
  }
}

start()
