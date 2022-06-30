const ApiError = require('../errors/ApiError')

const errorHandler = (cb) => {
  return (req, res, next) =>
    cb(req, res, next).catch((e) => next(ApiError.badRequest(e.message)))
}

module.exports = errorHandler
