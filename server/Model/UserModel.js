import { pool } from '../config/database.js'

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL
  )`

const createTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createUserTableQuery)
    client.release() // Release the client back to the pool
    console.log('User table created successfully')
  } catch (err) {
    console.error('Error creating user table:', err)
  }
}

export default createTable
