import express from 'express'
import {
  authUser,
  getUserProfile,
  registerUser,
} from '../controlers/userControler.js'
import { protect } from '../middleware/authMiddlewere.js'

const app = express()

const router = express.Router()

router.post('/login', authUser)
router.post('/', registerUser)
router.get('/profile', protect, getUserProfile)

export default router
