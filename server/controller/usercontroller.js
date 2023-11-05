import { pool } from '../config/database.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

// Register Function
const userregister = async (req, res) => {
  try {
    const { username, email, password, isSeller, description } = req.body

    // 2. Check if the email is already registered
    const checkEmailQuery = 'SELECT id FROM users WHERE email = $1'
    const client = await pool.connect()
    const emailCheckResult = await client.query(checkEmailQuery, [email])

    if (emailCheckResult.rows.length > 0) {
      // Email is already registered
      client.release()
      return res.status(409).json({ message: 'Email is already registered' })
    }

    // 3. If the email is not registered, insert into the "users" table
    const insertUserQuery = `
      INSERT INTO users (email, password, username)
      VALUES ($1, $2, $3)
      RETURNING id;
    `

    // Hashed the password
    const hashedPassword = await bcrypt.hash(password, 10)

    const userResult = await client.query(insertUserQuery, [
      email,
      hashedPassword,
      username,
    ])

    const searchID = 'SELECT id FROM users WHERE email = $1'
    const userIDQuery = await client.query(searchID, [email])
    const userID = userIDQuery.rows[0].id
    const insertUserDetailsQuery = `
    INSERT INTO userdetails (user_id,isSeller, description)
    VALUES ($1, $2, $3)
    ;
  `
    const userDetailsResult = await client.query(insertUserDetailsQuery, [
      userID,
      isSeller,
      description,
    ])

    return res.status(201).json({
      message: 'User registered successfully',
    })
  } catch (error) {
    console.error('Error during user registration:', error)
    res.status(500).json({ message: 'User registration failed' })
  }
}

//  Login Function

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body

    // 1. Check if the email exists in the "users" table
    const checkEmailQuery = 'SELECT id, password FROM users WHERE email = $1'
    const client = await pool.connect()
    const emailCheckResult = await client.query(checkEmailQuery, [email])

    console.log(emailCheckResult)
    client.release()

    if (emailCheckResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const user = emailCheckResult.rows[0]

    // 2. Verify the password
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // 3. Password is correct; generate a JWT token
    const token = jwt.sign({ userId: user.id }, process.env.SECRETKEY, {
      expiresIn: '6h', // Token expires in 6 hours
    })

    return res.status(200).json({
      message: 'Login successful',
      token: token,
    })
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' })
  }
}

const userlogout = async (req, res) => {
  return res.status(200).json({ message: 'Succesfully Logout' })
}

export { userregister, userlogin, userlogout }
