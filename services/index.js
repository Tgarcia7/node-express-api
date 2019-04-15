'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')//manejo de fechas en js
const config = require('../config')

function createToken(user){
  const payload = {
    sub: user._id,
    iat: moment().unix(),//fecha de creación del token
    exp: moment().add(14, 'days').unix()//fecha de expiración del token
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
  const decoded = new Promise((resolve, reject) => {
    try{
      //Decodifica el token que envió el cliente en la petición
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      //Validación del token
      //Compara la expiración del token que nos envía con la fecha actual
      if(payload.exp <= moment().unix()){
        reject({
          status: 401,
          message: `El token ha expirado`
        })
      }
      resolve(payload.sub)
    }catch(err){
      reject({
        status: 500,
        message: 'Invalid token'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}