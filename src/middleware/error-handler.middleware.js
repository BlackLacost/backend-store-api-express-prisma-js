const ApiError = require('../errors/ApiError')

function errorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message })
  }
  console.log(err)

  return res.status(500).json({ message: 'Непредвиденная ошибка!' })
}

module.exports = errorHandler
