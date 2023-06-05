import { ObjectId } from 'mongodb'
import User from '../models/user.js'
import service from '../services/index.js'

async function signUp(req, res) {
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  })
  let result

  try {
    result = await user.save()
  } catch (error) {
    console.error(error)
    if (error && error.code === 11000) return res.status(409).send({ message: 'Email duplicated' })

    return res.status(500).send({ message: 'Error saving the user' })
  }

  result.password = undefined
  const token = service.createToken(user)
  res.status(201).send({ user: result, token })
}

async function signIn(req, res) {
  let user
  const filter = { 'email': new ObjectId(req.params.email) }

  try {
    user = await User.find(filter)
    if (!user) return res.status(404).send({ message: 'Not found' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Log in error' })
  }

  const token = service.createToken(user)
  res.status(200).send({ token })
}

export default {
  signUp,
  signIn
}
