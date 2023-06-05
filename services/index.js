import jwt from 'jsonwebtoken'
import moment from 'moment'
import config from '../config.js'

function createToken(user) {
  user.admin = !!user.admin 

  const payload = {
    sub: { 
      userId: user._id, 
      name: user.name, 
      email: user.email,
      admin: user.admin 
    },
    iat: moment().unix(),
    exp: moment().add(15, 'minutes').unix()
  }

  return jwt.sign(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
  const decoded = new Promise((resolve, reject) => {
    try {
      const payload = jwt.verify(token, config.SECRET_TOKEN)

      resolve(payload.sub)
    } catch (err) {
      const errorCode = err.name === 'TokenExpiredError' ? 401 : 500

      reject({ status: errorCode, message: err.name })
    }
  })

  return decoded
}

export default {
  createToken,
  decodeToken
}
