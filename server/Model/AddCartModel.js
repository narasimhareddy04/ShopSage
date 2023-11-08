import { pool } from '../config/database.js'

const createCartTableQuery = `
  CREATE TABLE IF NOT EXISTS cart (
    id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
    image_url TEXT NOT NULL,
    product_name TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL,
    total NUMERIC(10, 2) NOT NULL
  )`

const createCartTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createCartTableQuery)
    client.release() // Release the client back to the pool
    console.log('Cart table created successfully')
  } catch (err) {
    console.error('Error creating cart table:', err)
  }
}

export default createCartTable
