import { pool } from '../config/database.js'

export const createCartItem = async (req, res) => {
  try {
    const {
      product_id,
      image_url,
      product_name,
      price,
      quantity,
      total,
    } = req.body
    const client = await pool.connect()
    const insertQuery = `
        INSERT INTO cart (product_id, image_url, product_name, price, quantity, total)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `
    const values = [product_id, image_url, product_name, price, quantity, total]
    const result = await client.query(insertQuery, values)
    client.release()
    return res.status(201).json(result.rows)
  } catch (err) {
    console.error('Error creating cart item:', err)
    return res.status(500).json({ error: 'Error creating a cart item' })
  }
}

// get cart

export const getCartItems = async (req, res) => {
  try {
    const client = await pool.connect()
    const selectQuery = 'SELECT * FROM cart'
    const result = await client.query(selectQuery)
    client.release()
    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error retrieving cart items:', err)
    return res.status(500).json({ error: 'Error retrieving cart items' })
  }
}

// Update Cart

export const updateCartItem = async (req, res) => {
  try {
    const {
      id,
      product_id,
      image_url,
      product_name,
      price,
      quantity,
      total,
    } = req.body
    const client = await pool.connect()
    const updateQuery = `
        UPDATE cart
        SET product_id = $2, image_url = $3, product_name = $4, price = $5, quantity = $6, total = $7
        WHERE id = $1
        RETURNING *;
      `
    const values = [
      id,
      product_id,
      image_url,
      product_name,
      price,
      quantity,
      total,
    ]
    const result = await client.query(updateQuery, values)
    client.release()
    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error updating cart item:', err)
    return res.status(500).json({ error: 'Error updating cart item' })
  }
}

// Delete Cart

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.body
    const client = await pool.connect()
    const deleteQuery = 'DELETE FROM cart WHERE id = $1 RETURNING *'
    const result = await client.query(deleteQuery, [id])
    client.release()
    return res.status(200).json(result.rows)
  } catch (err) {
    console.error('Error deleting cart item:', err)
    return res.status(500).json({ error: 'Error deleting cart item' })
  }
}
