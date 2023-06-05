import services from '../services/index.js'

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'Unauthorized' })
  }

  // Extract token from headers
  const token = req.headers.authorization.split(' ')[1]

  // Decodes and validates the token
  services.decodeToken(token)
    .then(response => {
      req.user = response
      next()
    })
    .catch(response => {
      res.status(response.status).send({ message: response.message })
    })
}

export default isAuth
