import express from 'express'
const router = express.Router()
import {
  createCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} from '../controller/Addtocartcontroller.js'

router.post('/', createCartItem)
// Read
router.get('/', getCartItems)

// Update
router.put('/', updateCartItem)

// Delete
router.delete('/', deleteCartItem)

export default router
