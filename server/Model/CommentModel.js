import { pool } from '../config/database.js'

const createCommentsTableQuery = `
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    userId INT REFERENCES users(id) NOT NULL
  )`

const createTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createCommentsTableQuery)
    client.release() // Release the client back to the pool
    console.log('Comments table created successfully')
  } catch (err) {
    console.error('Error creating comments table:', err)
  }
}

export default createTable
