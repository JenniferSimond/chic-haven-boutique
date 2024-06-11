const pg = require('pg');
// const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';
const dotenv = require('dotenv').config();

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

const createTables = async () => {
  const SQL = `
  
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_addresses CASCADE;
DROP TABLE IF EXISTS product_reviews CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS merchants CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS inventory_orders CASCADE;
DROP TABLE IF EXISTS customer_orders CASCADE;
DROP TABLE IF EXISTS ordered_items CASCADE;
DROP TABLE IF EXISTS customer_cart CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS customer_wishlist CASCADE;
DROP TABLE IF EXISTS wishlist_items CASCADE;
DROP TYPE IF EXISTS user_role;
DROP TYPE IF EXISTS customer_order_status;

CREATE TYPE user_role AS ENUM ('customer', 'site_admin', 'super_admin');

CREATE TYPE customer_order_status AS ENUM ('initiated', 'processing', 'in progress', 'complete');

CREATE TABLE users(
    id UUID PRIMARY KEY,
    last_name VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(25),
    user_role user_role DEFAULT 'customer',
    can_post_reviews BOOL DEFAULT TRUE,
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
    product_status VARCHAR(20),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id)
);

CREATE TABLE product_images(
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  created_at TIMESTAMP DEFAULT current_timestamp,
  updated_at TIMESTAMP DEFAULT current_timestamp,
  modified_by UUID REFERENCES users(id)
);

CREATE TABLE inventory(
    id UUID PRIMARY KEY,
    product_id UUID REFERENCES products(id),
    merchant_id UUID REFERENCES merchants(id),
    stock_quantity INTEGER,
    stock_status VARCHAR(25)
);

CREATE TABLE inventory_orders(
    id UUID PRIMARY KEY,
    inventory_id UUID REFERENCES inventory(id),
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
    rating INTEGER NOT NULL,
    comment VARCHAR(255),
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id),
    CONSTRAINT unique_user_review UNIQUE (product_id, user_id)
);

CREATE TABLE customer_orders(
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    total_price DECIMAL,
    customer_order_status customer_order_status DEFAULT 'initiated',
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
    cart_status VARCHAR(20) DEFAULT 'empty',
    cart_total decimal DEFAULT 0.0,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp
);

CREATE TABLE cart_items(
    id UUID PRIMARY KEY,
    customer_cart_id UUID REFERENCES customer_cart(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(100),
    product_price DECIMAL,
    quantity INTEGER,
    total_price DECIMAL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id)
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
    product_name VARCHAR(100),
    product_price DECIMAL,
    created_at TIMESTAMP DEFAULT current_timestamp,
    updated_at TIMESTAMP DEFAULT current_timestamp,
    modified_by UUID REFERENCES users(id)
);

-- UPDATE TIME STAMP TRIGGER/FUNCTION
CREATE OR REPLACE FUNCTION set_updated_timestamp() RETURNS TRIGGER AS $$ 
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER 

CREATE TRIGGER set_updated_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION set_updated_timestamp();

-- USER ASSOCIATED RECORDS TRIGGER/FUNCTION

CREATE OR REPLACE FUNCTION create_user_associated_records() RETURNS TRIGGER AS $$ 
BEGIN 
    IF NEW.user_role = 'customer' THEN
        INSERT INTO customer_cart (id, user_id, cart_status, cart_total, created_at, updated_at)
        VALUES (uuid_generate_v4(), NEW.id, 'empty', 0.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

        INSERT INTO customer_wishlist (id, user_id, created_at, updated_at)
        VALUES (uuid_generate_v4(), NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_user_associated_records();

-- UPDATE PRODUCT TRIGGER/FUNCTION
CREATE OR REPLACE FUNCTION update_product_status() RETURNS TRIGGER AS $$ 
BEGIN
    IF NEW.stock_quantity IS NULL THEN
      NEW.stock_quantity = 0;
    END IF;

    IF NEW.stock_quantity = 0 THEN
        UPDATE products SET product_status = 'out of stock' WHERE id = NEW.product_id;
    ELSIF NEW.stock_quantity <= 25 THEN
        UPDATE products SET product_status = 'low stock' WHERE id = NEW.product_id;
    ELSE
        UPDATE products SET product_status = 'in stock' WHERE id = NEW.product_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- TRIGGER

CREATE TRIGGER update_product_status_trigger
AFTER INSERT OR UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_product_status();

-- INVENTORY TRIGGER
CREATE OR REPLACE FUNCTION update_inventory_stock_status() RETURNS TRIGGER AS $$
  BEGIN
    IF NEW.stock_quantity IS NULL THEN
    NEW.stock_quantity = 0;
  END IF;

  IF NEW.stock_quantity = 0 THEN
    NEW.stock_status = 'out of stock';
  ELSEIF NEW.stock_quanity <= 25 THEN
    NEW.stock_status = 'low stock';
  ELSE 
    NEW.stock_status = 'in stock';
  END IF;

  RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

CREATE TRIGGER update_stock_status 
AFTER INSERT OR UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_inventory_stock_status();

CREATE OR REPLACE FUNCTION update_cart_details() RETURNS TRIGGER AS $$
    BEGIN
      -- Calculate the cart total
      UPDATE customer_cart
      SET cart_total = (
        SELECT SUM(total_price)
        FROM cart_items
        WHERE customer_cart_id = COALESCE(NEW.customer_cart_id, OLD.customer_cart_id)
      )
      WHERE id = COALESCE(NEW.customer_cart_id, OLD.customer_cart_id);

      -- Update the cart status
      IF (
        SELECT COUNT(*)
        FROM cart_items
        WHERE customer_cart_id = COALESCE(NEW.customer_cart_id, OLD.customer_cart_id)
      ) > 0 THEN
        UPDATE customer_cart
        SET cart_status = 'occupied'
        WHERE id = COALESCE(NEW.customer_cart_id, OLD.customer_cart_id);
      ELSE
        UPDATE customer_cart
        SET cart_status = 'empty'
        WHERE id = COALESCE(NEW.customer_cart_id, OLD.customer_cart_id);
      END IF;

      RETURN NEW;
    END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER update_cart_details_trigger
  AFTER INSERT OR UPDATE OR DELETE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_cart_details();
  `;

  await client.query(SQL);
};

module.exports = {
  client,
  createTables,
};
