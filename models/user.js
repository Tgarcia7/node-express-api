import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const SALT_ROUNDS = 8
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  displayName: String,
  avatar: String,
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date
})

UserSchema.pre('save', async function(next) {
  const user = this

  if (!user.isModified('password')) return next()

  try {
    user.password = await hashPassword(user.password)
    next()
  } catch (error) {
    return error
  }
})

UserSchema.pre('updateOne', async function(next) {
  const user = this._update
  
  if (user && !user.password) return next()

  try {
    user.password = await hashPassword(user.password)
    next()
  } catch (error) {
    return error
  }
})

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, function(err, hash) {
      if (err) return reject(err)
  
      resolve(hash)
    })
  })
}

UserSchema.methods.gravatar = function() {
  if (!this.email) return 'https://gravatar.com/avatar/?s=200&d=retro'

  const md5 = crypto.createHash('md5').update(this.email).digest('hex')
  return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

export default mongoose.model('User', UserSchema)
