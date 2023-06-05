import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: String,
  picture: String,
  price: { type: Number, default: 0 },
  category: { type: String, enum: ['computers', 'phones', 'accessories'] },
  description: String
})

export default mongoose.model('Product', ProductSchema)
