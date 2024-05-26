const pg = require('pg');
const dotenv = require('dotenv').config();
const { uuid } = require('uuidv4');

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

const createTables = async () => {
  const SQL = `
        CREATE TABLE users(
            id UUID PRIMARY KEY, 
            last_name VARCHAR(50) NOT NULL,
            first_name VARCHAR(50) NOT NULL,
            password VARCHAR(n) UNIQUE NOT NULL,
            email NOT NULL,
            phone ,
            created_at,
            updated_at ,
            updated_by
        );
    `;
};
