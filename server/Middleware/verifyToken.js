import jwt from 'jsonwebtoken'

function verifyToken(req, res, next) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    console.log(decoded)

    req.userId = decoded.userId
    next()
  })
}
