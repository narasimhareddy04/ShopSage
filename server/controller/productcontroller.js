import { pool } from '../config/database.js'

// Create Product and Product Details
export const createProductAndDetails = async (req, res) => {
  try {
    console.log(req.body)
    const {
      image,
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
      INSERT INTO products (image, title, price, review)
      VALUES ($1,  $2, $3, $4)
      RETURNING id`

    const createProductDetailsQuery = `
      INSERT INTO product_details (product_id, category, description, additional_information, seller_info, shipping_and_return_policy, reviews)
      VALUES ($1, $2, $3, $4, $5, $6, $7)`

    const client = await pool.connect()
    try {
      // Insert product data and get the product ID
      const productData = [image, title, price, review]
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
    const queryValue = req.query.category
    const getAllProductsQuery = 'SELECT * FROM products'
    if (queryValue) {
      getAllProductsQuery += `WHERE category = $1`
    }

    const { rows } = await pool.query(getAllProductsQuery, [queryValue])
    console.log(rows)
    return res.status(200).json(rows)
  } catch (error) {
    console.error('Error getting products:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// get product details

// Get Product Details with Image from Product by Product ID using RIGHT JOIN
export const getProductDetailsById = async (req, res) => {
  const productId = parseInt(req.params.id)

  try {
    const getProductDetailsQuery = `
        SELECT product_details.*, products.image
        FROM product_details
        RIGHT JOIN products 
        ON product_details.product_id = products.id
        WHERE product_details.product_id = $1
      `

    const { rows } = await pool.query(getProductDetailsQuery, [productId])
    console.log(rows)
    if (rows.length > 0) {
      res.status(200).json(rows[0]) // Assuming one product has one set of details
    } else {
      res.status(404).json({ message: 'Product details not found' })
    }
  } catch (error) {
    console.error(
      'Error getting product details with image using RIGHT JOIN:',
      error,
    )
    res.status(500).json({ error: 'Internal server error' })
  }
}

// Update Product by ID
export const updateProduct = async (req, res) => {
  try {
    const productId = parseInt(req.params.id)
    const { image, title, price, review } = req.body
    const updateProductQuery = `
      UPDATE products
      SET image = $1, accessories = $2, title = $3, price = $4, review = $5
      WHERE id = $6`

    await pool.query(updateProductQuery, [
      image,

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
