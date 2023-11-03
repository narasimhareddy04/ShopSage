import { pool } from "./database.js";

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
      user_id serial PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      
    );
  `;
  try {
    const res = await pool.query(createUsersTableQuery);
    console.log("🎉 Users table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Users table", error);
  }
};

const createCategoriesTable = async () => {
  const createCategoriesTableQuery = `
    CREATE TABLE IF NOT EXISTS categories (
      category_id serial PRIMARY KEY,
      name VARCHAR(50) NOT NULL
    );
  `;
  try {
    const res = await pool.query(createCategoriesTableQuery);
    console.log("🎉 Categories table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Categories table", error);
  }
};

const createProductsTable = async () => {
  const createProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS products (
      product_id serial PRIMARY KEY,
      brand VARCHAR(255) ,
      price DECIMAL(10, 2) ,
      category_id INTEGER REFERENCES categories(category_id),
      image TEXT, /* New column for product image */
      description TEXT, /* New column for product description */
      
    );
  `;
  try {
    const res = await pool.query(createProductsTableQuery);
    console.log("🎉 Products table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Products table", error);
  }
};

const createReviewsTable = async () => {
  const createReviewsTableQuery = `
    CREATE TABLE IF NOT EXISTS reviews (
      review_id serial PRIMARY KEY,
      rating INTEGER ,
      user_id INTEGER REFERENCES users(user_id),
      product_id INTEGER REFERENCES products(product_id),
      review_text TEXT,
      
    );
  `;
  try {
    const res = await pool.query(createReviewsTableQuery);
    console.log("🎉 Reviews table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Reviews table", error);
  }
};

const createCartsTable = async () => {
  const createCartsTableQuery = `
    CREATE TABLE IF NOT EXISTS carts (
      cart_id serial PRIMARY KEY,
      user_id INTEGER REFERENCES users(user_id),
      
    );
  `;
  try {
    const res = await pool.query(createCartsTableQuery);
    console.log("🎉 Carts table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Carts table", error);
  }
};

const createCartProductsTable = async () => {
  const createCartProductsTableQuery = `
    CREATE TABLE IF NOT EXISTS cart_products (
      cart_id INTEGER REFERENCES carts(cart_id),
      product_id INTEGER REFERENCES products(product_id),
      quantity INTEGER NOT NULL,
      PRIMARY KEY (cart_id, product_id)
    );
  `;
  try {
    const res = await pool.query(createCartProductsTableQuery);
    console.log("🎉 Cart_Products table created successfully");
  } catch (error) {
    console.error("⚠️ Error creating Cart_Products table", error);
  }
};

const resetTables = async () => {
  await createUsersTable();
  await createCategoriesTable();
  await createProductsTable();
  await createReviewsTable();
  await createCartsTable();
  await createCartProductsTable();
};

resetTables();
