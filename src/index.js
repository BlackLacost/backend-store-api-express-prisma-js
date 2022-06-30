require('dotenv').config()
const express = require('express')
const { router } = require('./routes')

const PORT = process.env.PORT || 5000
const app = express()
app.use('/api', router)

app.get('/', (req, res) => {
  res.json({ message: 'Hello World!' })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
