const { v4: uuidv4 } = require('uuid');
const { client } = require('../tables.js');

const createProduct = async ({
  name,
  description,
  price,
  category,
  product_status, // Fixed the naming here
  user_id, // Include user_id as a parameter
}) => {
  // Ensure the category exists or create a new one, passing user_id
  const categoryRow = await createCategory({ name: category, user_id });

  const SQL = `
      INSERT INTO products(id, name, description, price, category_id, product_status, created_at, updated_at, modified_by) 
      VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp, $7) RETURNING *
    `;

  const response = await client.query(SQL, [
    uuidv4(),
    name,
    description,
    price,
    categoryRow.id,
    product_status,
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

// UPDATE PRODUCT
const updateProduct = async ({
  id,
  name,
  description,
  price,
  category,
  merchant_id,
  product_status, // Fixed the naming here
  user_id,
}) => {
  // Ensure the category exists or create a new one, passing user_id
  const categoryRow = await createCategory({ name: category, user_id });

  const SQL = `
      UPDATE products 
      SET name = $2, description = $3, price = $4, category_id = $5, merchant_id = $6, product_status = $7, updated_at = current_timestamp, modified_by = $8
      WHERE id = $1 RETURNING *
    `;

  const response = await client.query(SQL, [
    id,
    name,
    description,
    price,
    categoryRow.id,
    merchant_id,
    product_status, // Fixed the naming here
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

const createCategory = async ({ name, modifiedBy }) => {
  // on a conflict (name already there, DO UPDATE the existing name --> DON'T create a new one)
  const SQL = `
          INSERT INTO categories(id, name, created_at, updated_at, modified_by) 
          VALUES ($1, $2, current_timestamp, current_timestamp, $3) 
          ON CONFLICT (name) DO UPDATE 
          SET updated_at = excluded.updated_at, modified_by = excluded.modified_by
          RETURNING *;
        `;
  const response = await client.query(SQL, [uuidv4(), name, modifiedBy]);
  return response.rows[0];
};

const fetchAllCategories = async () => {
  const SQL = `
        SELECT * FROM categories;
        `;
  const response = await client.query(SQL);
  return response.rows;
};

// UPDATE CATEGORY

module.exports = {
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
};
