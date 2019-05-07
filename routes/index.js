/**
 * @fileOverview App routes
 * @author Tey García
 */

'use strict'
const express = require('express')
const productController = require('../controllers/product')
const userController = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

/**
 * Get the list of products
 *
 * @name api/getProducts
 * @path {get} /api/product
 * 
 * @code {404} Products not found
 * @code {500} Error definition, server error
 * @code {200} Product list retrieved
 * 
 * @response {Object} res Contains the message, data and status of the response
 * @response {String} message Answer of the server to the user (if accesible)
 * @response {number} status Informs the status of http requests
 * @response {Object} products List of products obtained from db
 */
api.get('/product', productController.getProducts)

api.get('/product/:productId', productController.getProduct)
api.post('/product', auth, productController.saveProduct)
api.put('/product/:productId', auth, productController.updateProduct)
api.delete('/product/:productId', auth, productController.deleteProduct)
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)
//Ejecución de un middleware previo a la ejecución de la ruta
api.get('/private', auth, (req, res) => {
  res.status(200).send({message: `Tienes acceso`})
})

module.exports = api