const pg = require('pg');
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

const createTables = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS user_addresses CASCADE;
  DROP TABLE IF EXISTS products CASCADE;
  DROP TABLE IF EXISTS categories CASCADE;
  DROP TABLE IF EXISTS merchants CASCADE;
  DROP TABLE IF EXISTS inventory_orders CASCADE;
  DROP TABLE IF EXISTS product_reviews CASCADE;
  DROP TABLE IF EXISTS customer_orders CASCADE;
  DROP TABLE IF EXISTS ordered_items CASCADE;
  DROP TABLE IF EXISTS customer_cart CASCADE;
  DROP TABLE IF EXISTS cart_items CASCADE;
  DROP TABLE IF EXISTS customer_wishlist CASCADE;
  DROP TABLE IF EXISTS wishlist_items CASCADE;
  DROP TYPE IF EXISTS role;

  CREATE TYPE role AS ENUM ('customer', 'site_admin', 'super_admin');

  CREATE TABLE users(
      id UUID PRIMARY KEY,
      role role DEFAULT 'customer',
      last_name VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone_number VARCHAR(25),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE user_addresses(
      id UUID PRIMARY KEY, 
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      address_1 VARCHAR(100) NOT NULL,
      address_2 VARCHAR(50),
      city VARCHAR(50) NOT NULL,
      state VARCHAR(100) NOT NULL,
      zip_code INTEGER NOT NULL,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE categories(
    id UUID PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE merchants(
    id UUID PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    website_link VARCHAR(255),
    email VARCHAR(100),
    phone INTEGER,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE products(
      id UUID PRIMARY KEY, 
      name VARCHAR(50) NOT NULL,
      description VARCHAR(255),
      price DECIMAL NOT NULL,
      category_id UUID REFERENCES categories(id),
      merchant_id UUID REFERENCES merchants(id),
      status VARCHAR(25),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE inventory_orders(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) ON DELETE SET NULL,
      order_qty INTEGER,
      received_qty INTEGER,
      price DECIMAL,
      order_status VARCHAR,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      created_by UUID REFERENCES users(id),
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE product_reviews(
      id UUID PRIMARY KEY,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      user_id UUID REFERENCES users(id),
      rating INTEGER,
      comment VARCHAR(255),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE customer_orders(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      total_price DECIMAL,
      status VARCHAR(24),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE ordered_items(
      id UUID PRIMARY KEY,
      customer_order_id UUID REFERENCES customer_orders(id) ON DELETE SET NULL,
      product_id UUID REFERENCES products(id) ON DELETE SET NULL,
      quantity INTEGER,
      item_price DECIMAL,
      total_price DECIMAL,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE customer_cart(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
  );

  CREATE TABLE cart_items(
      id UUID PRIMARY KEY,
      customer_cart_id UUID REFERENCES customer_cart(id) ON DELETE CASCADE,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      quantity INTEGER,
      save_for_later BOOL DEFAULT FALSE,
      price DECIMAL,
      total_price DECIMAL
  );

  CREATE TABLE customer_wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
  );

  CREATE TABLE wishlist_items(
      id UUID PRIMARY KEY,
      customer_wishlist_id UUID REFERENCES customer_wishlist(id) ON DELETE CASCADE,
      product_id UUID REFERENCES products(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE OR REPLACE FUNCTION set_updated_timestamp() RETURNS TRIGGER AS $$ 
  BEGIN
      NEW.updated_at = CURRENT_TIMESTAMP;
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE OR REPLACE FUNCTION create_user_associated_records() RETURNS TRIGGER AS $$
  BEGIN 
      INSERT INTO customer_cart (id, user_id, created_at, updated_at)
      VALUES (uuid_generate_v4(), NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

      INSERT INTO customer_wishlist (id, user_id, created_at, updated_at)
      VALUES (uuid_generate_v4(), NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER after_user_insert
  AFTER INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_associated_records();

  CREATE TRIGGER set_updated_timestamp
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_timestamp();
  `;

  await client.query(SQL);
};

// ** Authentication **

const authenticateUser = async ({ email, password }) => {
  const SQL = `
  SELECT id, password, role 
  FROM users 
  WHERE email = $1;
  `;
  const response = await client.query(SQL, [email]);
  const user = response.rows[0];

  if (!user) {
    const error = new Error('User Not Found');
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    const error = new Error('Invalid Password');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secret);
  return { token };
};

const findUserWithToken = async (token) => {
  let userId, userRole;
  try {
    const decoded = jwt.verify(token, secret);
    userId = decoded.id;
    userRole = decoded.role;
  } catch (ex) {
    const error = new Error('Not Authorized');
    error.status = 401;
    throw error;
  }

  const SQL = `
    SELECT id, email FROM users WHERE id = $1;
  `;
  const response = await client.query(SQL, [userId]);
  if (response.rows.length === 0) {
    const error = new Error('User not found');
    error.status = 401;
    throw error;
  }

  return { ...response.rows[0], role: userRole };
};

// ** USERS **

// CREATE EMPLOYEE
const createEmployee = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
  role = 'site_admin',
}) => {
  const SQL = `
    INSERT INTO users(id, last_name, first_name, password, email, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
    role,
  ]);
  return response.rows[0];
};

// FETCH USERS
const fetchAllUsers = async () => {
  const SQL = `
  SELECT * FROM users
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// DELETE USER
const deleteUserById = async (id) => {
  const SQL = `
  DELETE FROM users WHERE id = $1
  `;
  await client.query(SQL, [id]);
};

// CREATE CUSTOMER
const createCustomer = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
}) => {
  const SQL = `
    INSERT INTO users(id, last_name, first_name, password, email, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6, 'customer') RETURNING *
    `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
  ]);
  return response.rows[0];
};

// FETCH USER BY ID
fetchUserById = async (id) => {
  const SQL = `
  SELECT * FROM users WHERE id = $1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// UPDATE USER BY ID
const updateUserById = async (id, customerNewData, modifiedBy) => {
  const { last_name, first_name, email, password, phone_number } =
    customerNewData;

  //if user changes password hash it
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const SQL = `
  UPDATE users
  SET 
    last_name = COALESCE($1, last_name),
    first_name = COALESCE($2, first_name),
    email = COALESCE($3, email),
    password = COALESCE($4, password),
    phone_number = COALESCE($5, phone_number),
    modified_by = $6,
    updated_at = current_timestamp
  WHERE id = $7
  RETURNING *;
  `;

  const response = await client.query(SQL, [
    last_name,
    first_name,
    email,
    hashedPassword || password,
    phone_number,
    modifiedBy,
    id,
  ]);

  return response.rows[0];
};

//

// ** PRODUCTS & CATEGORY  **

// CREATE CATEGORY
const createCategory = async ({ name, user_id }) => {
  const SQL = `
    INSERT INTO categories(id, name, created_at, updated_at, modified_by) 
    VALUES ($1, $2, current_timestamp, current_timestamp, $3) 
    ON CONFLICT (name) DO UPDATE 
    SET updated_at = excluded.updated_at, modified_by = excluded.modified_by
    RETURNING *;
  `;
  const response = await client.query(SQL, [uuidv4(), name, user_id]);
  return response.rows[0];
};

// UPDATE CATEGORY

const updateCategory = async ({ id, name, modifiedBy }) => {
  const SQL = `
  UPDATE categories 
  SET 
    name = $2, 
    updated_at = current_timestamp, 
    modified_by = $3
    WHERE id = $1 
    RETURNING *;
  `;

  const response = await client.query(SQL, [id, name, modifiedBy]);
  return response.rows[0];
};

// DELETE CATEGORY

// CREATE PRODUCT

const createProduct = async ({
  name,
  description,
  price,
  category,
  merchant_id,
  status,
  user_id, // Include user_id as a parameter
}) => {
  // Ensure the category exists or create a new one, passing user_id
  const categoryRow = await createCategory({ name: category, user_id });

  const SQL = `
    INSERT INTO products(id, name, description, price, category_id, merchant_id, status, created_at, updated_at, modified_by) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, current_timestamp, current_timestamp, $8) RETURNING *
  `;

  const response = await client.query(SQL, [
    uuidv4(),
    name,
    description,
    price,
    categoryRow.id,
    merchant_id,
    status,
    user_id, // Track who created the product
  ]);

  return response.rows[0];
};

// FETCH PRODUCT
const fetchProducts = async () => {
  const SQL = `
      SELECT * FROM products
    `;

  const response = await client.query(SQL);
  return response.rows;
};

// UPDATE PROdUCT
const updateProduct = async ({
  id,
  name,
  description,
  price,
  category,
  merchant_id,
  status,
  user_id,
}) => {
  // Ensure the category exists or create a new one, passing user_id
  const categoryRow = await createCategory({ name: category, user_id });

  const SQL = `
    UPDATE products 
    SET name = $2, description = $3, price = $4, category_id = $5, merchant_id = $6, status = $7, updated_at = current_timestamp, modified_by = $8
    WHERE id = $1 RETURNING *
  `;

  const response = await client.query(SQL, [
    id,
    name,
    description,
    price,
    categoryRow.id,
    merchant_id,
    status,
    user_id,
  ]);

  return response.rows[0];
};

// DELETE PRODUCT

const deleteProduct = async ({ id }) => {
  const SQL = `
  
  DELETE FROM products WHERE id = $1 RETURNING *
  `;
  await client.query(SQL, [id]);
};

// ** CARTS **

// ** WISHLIST **

// ** REVIEWS **

module.exports = {
  client,
  createTables,
  createCustomer,
  createEmployee,
  authenticateUser,
  findUserWithToken,
  fetchProducts,
  createCategory,
  createProduct,
  updateProduct,
  fetchAllUsers,
  fetchUserById,
  updateUserById,
  deleteUserById,
  updateCategory,
  deleteProduct,
};
