import express from 'express'
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
} from '../controlers/productControler.js'
import { protect, admin } from '../middleware/authMiddlewere.js'

const app = express()

const router = express.Router()

router.get('/', getProducts)
router.get('/:id', getProductById)
router.delete('/:id', protect, admin, deleteProduct)
router.put('/:id', protect, admin, updateProduct)
router.post('/', protect, admin, createProduct)

export default router
