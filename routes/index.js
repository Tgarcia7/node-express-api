import { Router } from 'express'

const router = Router()

import productController from '../controllers/product.js'
import userController from '../controllers/user.js'
import auth from '../middlewares/auth.js'

router.get('/health', (req, res) => {
  res.status(200).send({ message: 'UP' })
})

router.get('/product', productController.getProducts)
router.post('/product', productController.saveProduct)
router.get('/product/:productId', productController.getProduct)
router.put('/product/:productId', productController.updateProduct)
router.delete('/product/:productId', productController.deleteProduct)
router.post('/signup', userController.signUp)
router.post('/signin', auth, userController.signIn)

export default router
