const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  if (req.method === 'OPTION') {
    next()
  }

  try {
    const token = req.headers.authorization.replace('Bearer ', '')
    if (!token) {
      return res.status(401).json({ message: 'Не авторизован' })
    }

    const decode = jwt.verify(token, process.env.SECRET_JWT)
    req.user = decode
    next()
  } catch (e) {
    res.status(401).json({ message: 'Не авторизован' })
  }
}
