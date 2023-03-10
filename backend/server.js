import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import morgan from 'morgan'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const PORT = process.env.PORT || 8000

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

if (process.env.NODE_ENV === 'devalopment') {
  app.use(morgan('dev'))
}

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/uploads', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold
  )
)
