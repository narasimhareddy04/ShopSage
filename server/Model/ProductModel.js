import { pool } from '../config/database.js'

const createProductDetailsTableQuery = `
  DROP TABLE IF EXISTS product_details;
  CREATE TABLE IF NOT EXISTS product_details (
    id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(id),
    category TEXT[],
    description TEXT,
    additional_information TEXT,
    seller_info TEXT,
    shipping_and_return_policy TEXT,
    reviews JSON[]
  )`

const createProductsTableQuery = `
  DROP TABLE IF EXISTS products;
  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    accessories VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    review TEXT[]
  )`

export const createProductsTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createProductsTableQuery)
    client.release() // Release the client back to the pool
    console.log('Products table created or already exists')
  } catch (err) {
    console.error('Error creating Products table:', err)
  }
}

export const createProductDetailsTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createProductDetailsTableQuery)
    client.release() // Release the client back to the pool
    console.log('ProductDetails table created or already exists')
  } catch (err) {
    console.error('Error creating ProductDetails table:', err)
  }
}
