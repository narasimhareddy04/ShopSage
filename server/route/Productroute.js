import express from 'express'
const router = express.Router()

import {
  createProductAndDetails,
  deleteProduct,
  updateProduct,
  getAllProducts,
} from '../controller/productcontroller.js'

// product route
router.post('/', createProductAndDetails)
router.get('/', getAllProducts)

export default router
