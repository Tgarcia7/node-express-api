'use strict'

const services = require('../services')

function isAuth(req, res, next){
  if(!req.headers.authorization){
    //Acceso prohibido (no tiene autorización en el header)
    return res.status(403).send({message: `No tienes autorización`})
  }

  //El header contiene el token después del espacio
  const token = req.headers.authorization.split(' ')[1]
  
  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status)
    })
  }

module.exports = isAuth