const pg = require('pg');
const dotenv = require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

const createTables = async () => {
  const SQL = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  
  DROP TABLE IF EXISTS users CASCADE;
  DROP TABLE IF EXISTS user_roles CASCADE;
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
      last_name VARCHAR(50) NOT NULL,
      first_name VARCHAR(50) NOT NULL,
      password VARCHAR(255) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      phone_number VARCHAR(25),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE user_roles(
      id UUID PRIMARY KEY, 
      user_role role DEFAULT 'customer',
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE user_addresses(
      id UUID PRIMARY KEY, 
      user_id UUID REFERENCES users(id) NOT NULL,
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
    name VARCHAR(30) NOT NULL,
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
      product_id UUID REFERENCES products(id),
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
      product_id UUID REFERENCES products(id),
      user_id UUID REFERENCES users(id),
      rating INTEGER,
      comment VARCHAR(255),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE customer_orders(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      total_price DECIMAL,
      status VARCHAR(24),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE ordered_items(
      id UUID PRIMARY KEY,
      customer_order_id UUID REFERENCES customer_orders(id),
      product_id UUID REFERENCES products(id),
      quantity INTEGER,
      item_price DECIMAL,
      total_price DECIMAL,
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp,
      modified_by UUID REFERENCES users(id)
  );

  CREATE TABLE customer_cart(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
  );

  CREATE TABLE cart_items(
      id UUID PRIMARY KEY,
      customer_cart_id UUID REFERENCES customer_cart(id),
      product_id UUID REFERENCES products(id),
      quantity INTEGER,
      save_for_later BOOL DEFAULT FALSE,
      price DECIMAL,
      total_price DECIMAL
  );

  CREATE TABLE customer_wishlist(
      id UUID PRIMARY KEY,
      user_id UUID REFERENCES users(id),
      created_at TIMESTAMP DEFAULT current_timestamp,
      updated_at TIMESTAMP DEFAULT current_timestamp
  );

  CREATE TABLE wishlist_items(
      id UUID PRIMARY KEY,
      customer_wishlist_id UUID REFERENCES customer_wishlist(id),
      product_id UUID REFERENCES products(id),
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

  CREATE OR REPLACE FUNCTION set_created_timestamp() RETURNS TRIGGER AS $$
  BEGIN
      IF (TG_OP = 'INSERT') THEN
          NEW.created_at = CURRENT_TIMESTAMP;
      END IF;
      RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE OR REPLACE FUNCTION create_user_associated_records() RETURNS TRIGGER AS $$
  BEGIN 
      IF NOT EXISTS (SELECT 1 FROM user_roles WHERE id = NEW.id) THEN
        INSERT INTO user_roles (id, user_role, created_at, updated_at, modified_by) 
        VALUES (NEW.id, 'customer', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, NULL);
      END IF;

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
  `;

  await client.query(SQL);
};

const createCustomer = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
}) => {
  const SQL = `
    INSERT INTO users(id, last_name, first_name, password, email, phone_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
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

const createEmployee = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
  role = 'site_admin',
}) => {
  const userId = uuidv4();
  const SQL = `
      WITH new_user AS (
        INSERT INTO users(id, last_name, first_name, password, email, phone_number) 
        VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING *
      ),
      new_role AS (
        INSERT INTO user_roles(id, user_role, created_at, updated_at) 
        VALUES ($1, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      )
      SELECT * FROM new_user;
    `;
  const response = await client.query(SQL, [
    userId,
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
    role,
  ]);
  return response.rows[0];
};

const authorize = async () => {};

module.exports = { client, createTables, createCustomer, createEmployee };
