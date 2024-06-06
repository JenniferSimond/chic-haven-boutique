const { v4: uuidv4 } = require('uuid');
const { client } = require('../tables.js');
const { createCategory } = require('./categories.js');

// creates product and sets/creates category
const createProduct = async ({
  name,
  description,
  price,
  category,
  product_status,
  user_id,
}) => {
  // checks if category exists or create a new one --> the check happens in createCategory model
  // passes the cateefory name if needs to be created user_id for modified by
  const categoryInfo = await createCategory({ name: category, user_id });

  const SQL = `
      INSERT INTO products(id, name, description, price, category_id, product_status, created_at, updated_at, modified_by) 
      VALUES ($1, $2, $3, $4, $5, $6, current_timestamp, current_timestamp, $7) RETURNING *
    `;

  const response = await client.query(SQL, [
    uuidv4(),
    name,
    description,
    price,
    categoryInfo.id,
    product_status,
    user_id, // Track who created the product --> Taken from is req.user -> from auth
  ]);

  return response.rows[0];
};

// FETCH  ALL PRODUCTS
const fetchProducts = async () => {
  const SQL = `
        SELECT * FROM products
      `;

  const response = await client.query(SQL);
  return response.rows;
};

// FETCH PRODUCTS By ID
const fetchProductById = async (id) => {
  const SQL = `
    SELECT * FROM products WHERE id = $1
    `;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// UPDATE PRODUCT
const updateProduct = async ({
  id,
  name,
  description,
  price,
  category,
  product_status,
  user_id,
}) => {
  // Ensure the category exists or create a new one, passing user_id
  let categoryRow;
  if (category) {
    categoryRow = await createCategory({ name: category, user_id });
  }

  const SQL = `
    UPDATE products 
    SET 
      name = COALESCE($2, name),
      description = COALESCE($3, description),
      price = COALESCE($4, price),
      category_id = COALESCE($5, category_id),
      product_status = COALESCE($6, product_status), 
      updated_at = CURRENT_TIMESTAMP, 
      modified_by = $7
    WHERE id = $1 
    RETURNING *;
  `;

  const response = await client.query(SQL, [
    id,
    name,
    description,
    price,
    categoryRow ? categoryRow.id : null,
    product_status,
    user_id,
  ]);

  return response.rows[0];
};

module.exports = {
  updateProduct,
};

// DELETE PRODUCT
const deleteProduct = async ({ id }) => {
  const SQL = `
    
    DELETE FROM products WHERE id = $1 RETURNING *
    `;
  await client.query(SQL, [id]);
};

module.exports = {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
};
