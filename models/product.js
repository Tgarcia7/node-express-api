/**
 * @fileOverview Product model
 * @author Tey García
 */

/**
 * Product model
 * 
 * @typedef {Object} Product
 * @property {string} name - Product's name
 * @property {string} picture - Picture's location on the server
 * @property {number} price - Cost of the product
 * @property {String} category - Kind of product (computers, phones or accesories)
 * @property {String} description - Details to describe the product
 */
'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = ({
  name: String,
  picture: String,
  price: {type: Number, default: 0},
  category: {type: String, enum: ['computers', 'phones', 'accesories']},
  description: String
})

module.exports = mongoose.model('Product', ProductSchema)