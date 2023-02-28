import express from 'express'
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controlers/orderControler.js'
import { protect } from '../middleware/authMiddlewere.js'

const app = express()

const router = express.Router()

router.post('/', protect, addOrderItems)
router.get('/myorders', protect, getMyOrders)
router.get('/:id', protect, getOrderById)
router.put('/:id/pay', protect, updateOrderToPaid)

export default router
