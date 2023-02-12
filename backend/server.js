import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'

const PORT = process.env.PORT || 8000

dotenv.config()

connectDB()

const app = express()

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
)

app.get('/', (req, res) => {
  res.send('API is running')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on ${PORT}`.yellow.bold
  )
)
