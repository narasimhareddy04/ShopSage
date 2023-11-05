import { pool } from '../config/database.js'

const createUserDetailsTableQuery = `
  CREATE TABLE IF NOT EXISTS userdetails (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id), 
    isSeller BOOLEAN,
    description TEXT
  
  )`

const createUserDetailsTable = async () => {
  try {
    const client = await pool.connect() // Obtain a client from the pool
    await client.query(createUserDetailsTableQuery)
    client.release() // Release the client back to the pool
    console.log('UserDetails table created successfully')
  } catch (err) {
    console.error('Error creating UserDetails table:', err)
  }
}

export default createUserDetailsTable
