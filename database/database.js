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
            updated_by user_id REFERENCES users(id),
        );

        CREATE TABLE categories();
        
        CREATE TABLE merchants();

        CREATE TABLE inventory_orders();

        CREATE TABLE product_reviews();

        CREATE TABLE customer_orders();

        CREATE TABLE ordered_items();

        CREATE TABLE customer_cart();

        CREATE TABLE cart_items();

        CREATE TABLE customer_wishlist();

        CREATE TABLE wishlist_items();
    `;
};
