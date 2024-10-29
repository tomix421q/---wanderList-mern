import * as dotenv from 'dotenv'
import 'express-async-errors' //must be on top
import express from 'express'
const app = express()
app.use(express.json())
dotenv.config()
import morgan from 'morgan'
import placeRouter from './routers/placeRouter.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import mongoose from 'mongoose'
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js'
import { authenticateUser } from './middleware/authMiddleware.js'
import cookieParser from 'cookie-parser'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import path from 'path'
import cloudinary from 'cloudinary'

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, './public')))

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
})

// ROUTERS
app.use('/api/places', authenticateUser, placeRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', authenticateUser, userRouter)

// frontend load
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'))
})

// NOT FOUND AND ERROR MIDDLEWARE
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' })
})
app.use(errorHandlerMiddleware)

//
// SERVER + DB
const port = process.env.PORT || 5090
try {
  await mongoose.connect(process.env.MONGO_URL)
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`)
  })
} catch (error) {
  console.log(error)
  process.exit(1)
}
