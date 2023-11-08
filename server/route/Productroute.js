import express from 'express'
const router = express.Router()

import {
  createProductAndDetails,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getProductDetailsById,
} from '../controller/productcontroller.js'

// product route
router.post('/', createProductAndDetails)
router.get('/', getAllProducts)
router.get('/:id', getProductDetailsById)

export default router
