import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import userRoutes from './routes/users'
import recipeRoutes from './routes/recipes'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200,
  })
)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')

  console.log('Request headers:', req.headers)

  // Log response headers after they've been set
  res.on('finish', () => {
    console.log('Response headers:', res.getHeaders())
  })

  next()
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Could not connect to MongoDB', err))

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Recipe Manager API')
})

// Middleware
app.use(express.json())
app.use('/api/users', userRoutes)
app.use('/api/recipes', recipeRoutes)
