'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
  if(err){
    return console.log(`No fue posible conectar con la DB. Error: ${err}`)
  }

  app.listen(config.port, () => {
    console.log(`API REST corriendo en http://localhost:${config.port}`)
  })
})