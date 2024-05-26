const pg = require('pg');
const dotenv = require('dotenv').config();
const { uuid } = require('uuidv4');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

const createTables = async () => {
  // enum used to create type for user_roles --> see notes for more info
  /* a customer can only see self, a site_admin can see/manipulate all customers, but can only see/manipulate their empoyee data -->
   * a super_admin can manipulate/see everyone -- we don't want a disgruntaled admin (regular employee) to change employee roles and lock out supervisor/owner */
  const SQL = `
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS user_roles;
        DROP TABLE IF EXISTS user_addresses;
        DROP TABLE IF EXISTS products;

        CREATE TABLE users(
            id UUID PRIMARY KEY, 
            last_name VARCHAR(50) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            password VARCHAR(n) NOT NULL,
            email NOT NULL UNIQUE NOT NULL,
            phone_number VARCHAR(25),
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            updated_by TIMESTAMP,
            modified_by UUID REFERENCES users(id)
        );

        CREATE TYPE role AS ENUM ('customer', 'site_admin', super_admin);

        CREATE Table user_roles(
            id UUID PRIMARY KEY, 
            user_role role DEFAULT 'customer',
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            modified_by UUID REFERENCES users(id)

        );

        CREATE TABLE user_addresses(
            id UUID PRIMARY KEY, 
            user_id UUID REFERENCES users(id) NOT NULL,
            address_1 VARCHAR(100) NOT NULL,
            address_1 VARCHAR(50),
            city VARCHAR(50) NOT NULL
        );

        CREATE TABLE products(
            id UUID PRIMARY KEY, 
            name VARCHAR(50) NOT NULL,
            description VARCHAR(n),
            price decimal NOT NULL,
            category_id UUID REFERENCES categories(id),
            merchant_id UUID REFERENCES merchants(id),
            status VARCHAR(25),
            created_at TIMESTAMP NOT NULL,
            updated_at TIMESTAMP NOT NULL,
            modified_by user_id REFERENCES users(id),
        );

        CREATE TABLE categories(
            id UUID PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            updated_at TIMESTAMP,
            modified_by UUID REFERENCES users(id)
        );
        
        CREATE TABLE merchants(
            id UUID PRIMARY KEY,
            name VARCHAR(30) NOT NULL,
            website_link VARCHAR,
            email VARCHAR(100),
            phone INTEGER,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            modified_by UUID REFERENCES users(id)
        );

        CREATE TABLE inventory_orders(
            id UUID PRIMARY KEY,
            product_id UUID REFERENCES products(id),
            order_qty INTEGER,
            received_qty INTEGER,
            price DECIMAL,
            order_status VARCHAR,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            modified_by UUID REFERENCES users(id)
        );

        CREATE TABLE product_reviews(
                id UUID PRIMARY KEY,
                product_id UUID REFERENCES products(id),
                user_id UUID REFERENCES users(id),
                rating INTEGER,
                comment VARCHAR,
                created_at TIMESTAMP,
                updated_at TIMESTAMP
        );

        CREATE TABLE customer_orders(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            total_price DECIMAL,
            status VARCHAR(24),
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        );

        CREATE TABLE ordered_items(
            id UUID PRIMARY KEY,
            customer_order_id UUID REFERENCES customer_orders(id),
            product_id UUID REFERENCES products(id),
            quantity INTEGER,
            item_price DECIMAL,
            total_price DECIMAL
        );

        CREATE TABLE customer_cart(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
        );

        CREATE TABLE cart_items(
            id UUID PRIMARY KEY,
            customer_cart_id UUID REFERENCES customer_cart(id),
            product_id UUID REFERENCES products(id),
            quantity INTEGER,
            save_for_later BOOL DEFAULT FALSE ,
            price DECIMAL,
            total_price DECIMAL
        );

        CREATE TABLE customer_wishlist(
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
        );

        CREATE TABLE wishlist_items(
            id UUID PRIMARY KEY,
            customer_wishlist_id UUID REFERENCES customer_wishlist(id),
            product_id UUID REFERENCES products(id),
            created_at TIMESTAMP,
            updated_at TIMESTAMP
        );
    `;

  await client.query(SQL);
};

// insert functions

module.exports = { client, createTables };
