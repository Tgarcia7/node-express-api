'use strict'
const Product = require('../models/product')

function getProduct(req, res){
  let productId = req.params.productId

  Product.findOne(productId, (err, product) => {
    if(err){
      return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    }
    if(!product){
      return res.status(404).send({message: `El producto no existe`})
    }

    res.status(200).send({product})//la key y variable se llaman igual entonces se puede poner así
  })
}

function getProducts(req, res){
  Product.find({}, (err, products) => {

    if(err){
      return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    }

    if(!products){
      return res.status(404).send({message: `No existen productos`})
    }

    res.status(200).send({products})
  })
}

function saveProduct(req, res){
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, productStored) => {
    if(err) {
      res.status(500).send({message: `Error al salvar el producto en la bd ${err}`})
    }
    res.status(200).send({product: productStored})
  })
}

function updateProduct(req, res){
  let productId = req.params.productId
  let update = req.body

  Product.findOneAndUpdate(productId, update, (err, productUpdated) => {
    if(err) {res.status(500).send({message: `Error al actualizar el producto ${err}`})}
    
    res.status(200).send({product: productUpdated})
  })
}

function deleteProduct(req, res){
  let productId = req.params.productId

  Product.findOneAndDelete(productId, (err, product) => {
    if(err){ res.status(500).send({message: `Error al borrar el producto ${err}`}) }

    product.remove(err => {
      res.status(200).send({message: `El producto ha sido eliminado`})
    })

  })
}

module.exports = {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}