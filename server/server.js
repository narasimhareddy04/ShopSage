import express from 'express'
import path from 'path'

import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './route/Userauthroute.js'
import productRoutes from './route/Productroute.js'
import cartRoutes from './route/AddtoCartroute.js'
dotenv.config()

const PORT = process.env.PGPORT

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v2/users', userRoutes)
app.use('/api/v2/product', productRoutes)
app.use('/api/v2/cart', cartRoutes)
// specify the api path for the server to use

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
