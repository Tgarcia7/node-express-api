import { ObjectId } from 'mongodb'
import Product from '../models/product.js'

async function getProduct(req, res) {
  let product
  const filter = { '_id': new ObjectId(req.params.productId) }

  try {
    product = await Product.findOne(filter)
    if (!product) return res.status(404).send({ message: 'Not found' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error obtaining the product' })
  }

  res.status(200).send(product)
}

async function getProducts(req, res) {
  let products 

  try {
    products = await Product.find({})
    if (!products) return res.status(404).send({ message: 'Not found' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error obtaining the products' })
  }

  res.status(200).send(products)
}

async function saveProduct(req, res) {
  const product = new Product({
    name: req.body.name,
    picture: req.body.picture,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description
  })

  try {
    await product.save()
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error saving the product' })
  }

  res.status(201).send(product)
}

async function updateProduct(req, res) {
  const filter = { '_id': new ObjectId(req.params.productId) }
  const product = {
    name: req.body.name,
    picture: req.body.picture,
    price: req.body.price,
    category: req.body.category,
    description: req.body.description
  }
  let result

  try {
    result = await Product.findOneAndUpdate(filter, product)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error updating the product' })
  }

  res.status(200).send(result)
}

async function deleteProduct(req, res) {
  const filter = { '_id': new ObjectId(req.params.productId) }

  try {
    await Product.findOneAndDelete(filter)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error deleting the product' })
  }

  res.status(200).send({ message: 'Deleted' })
}

export default {
  getProduct,
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct
}
