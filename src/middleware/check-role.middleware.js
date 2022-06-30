const jwt = require('jsonwebtoken')

module.exports = function (role) {
  return function (req, res, next) {
    if (req.method === 'OPTION') {
      next()
    }

    try {
      const token = req.headers.authorization.replace('Bearer ', '')
      if (!token) {
        return res.status(401).json({ message: 'Не авторизован' })
      }

      const decode = jwt.verify(token, process.env.SECRET_JWT)

      if (decode.role !== role) {
        return res.status(403).json({ message: 'Нет доступа' })
      }
      req.user = decode
      next()
    } catch (e) {
      res.status(401).json({ message: 'Не авторизован' })
    }
  }
}
