const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')

const env = require('./config/env')
const db = require('./config/db')
const router = require('./router')

const app = express()
const PORT = env.PORT

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json')
  next()
})

router(app, db)

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server up and listening on port ${PORT}`)
  })
})
