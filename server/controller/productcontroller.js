import { pool } from '../config/database.js'

// Create Product and Product Details
export const createProductAndDetails = async (req, res) => {
  try {
    const {
      image,
      accessories,
      title,
      price,
      review,
      category,
      description,
      additional_information,
      seller_info,
      shipping_and_return_policy,
      reviews,
    } = req.body

    const createProductQuery = `
      INSERT INTO products (image, accessories, title, price, review)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id`

    const createProductDetailsQuery = `
      INSERT INTO product_details (product_id, category, description, additional_information, seller_info, shipping_and_return_policy, reviews)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const client = await pool.connect()
    try {
      // Insert product data and get the product ID
      const productData = [image, accessories, title, price, review]
      const productResult = await client.query(createProductQuery, productData)
      const productid = productResult.rows[0].id
      console.log(productid)
      // Insert product details with the product ID
      const productDetailsData = [
        productid,
        category,
        description,
        additional_information,
        seller_info,
        shipping_and_return_policy,
        reviews,
      ]
      const productDetailsjson = await client.query(
        createProductDetailsQuery,
        productDetailsData,
      )

      return res.status(201).json({ message: 'Product Successfully Added' })
    } catch (error) {
      console.error('Error creating product and details:', error)
      res.status(500).json({ error: 'Internal server error' })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Error connecting to the database:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Get All Products
export const getAllProducts = async (req, res) => {
  try {
    const getAllProductsQuery = 'SELECT * FROM products'
    const { rows } = await pool.query(getAllProductsQuery)
    console.log(rows)
    res.status(200).json(rows)
  } catch (error) {
    console.error('Error getting products:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const { image, accessories, title, price, review } = req.body
    const updateProductQuery = `
      UPDATE products
      SET image = $1, accessories = $2, title = $3, price = $4, review = $5
      WHERE id = $6`

    await pool.query(updateProductQuery, [
      image,
      accessories,
      title,
      price,
      review,
      productId,
    ])
    res.status(204).send()
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Delete Product by ID
export const deleteProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const deleteProductQuery = 'DELETE FROM products WHERE id = $1'
    await pool.query(deleteProductQuery, [productId])
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting product:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
