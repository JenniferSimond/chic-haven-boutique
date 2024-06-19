const { client } = require('../tables');
const { v4: uuidv4 } = require('uuid');

const fetchAllCarts = async () => {
  const SQL = `
  SELECT * FROM customer_cart;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCartById = async (id) => {
  const SQL = `
        SELECT * FROM customer_cart WHERE user_id = $1;
      `;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const fetchCartItemsById = async (id) => {
  const SQL = `
    SELECT * FROM cart_items WHERE customer_cart_id = $1
  `;

  const response = await client.query(SQL, [id]);
  return response.rows;
};

const addCartItem = async ({
  customer_cart_id,
  product_id,
  quantity,
  user_id,
}) => {
  const productCheckSQL = `SELECT * FROM products WHERE id = $1`;
  const productCheckResponse = await client.query(productCheckSQL, [
    product_id,
  ]);

  if (productCheckResponse.rows.length === 0) {
    throw new Error('Product does not exist');
  }

  const SQL = `
    INSERT INTO cart_items (
      id, 
      customer_cart_id, 
      product_id, 
      product_name, 
      product_price, 
      product_img,
      quantity, 
      total_price,
      created_at, 
      updated_at, 
      modified_by
    ) 
    VALUES (
      $1, 
      $2, 
      $3, 
      (SELECT name FROM products WHERE id = $3), 
      (SELECT price FROM products WHERE id = $3), 
      (SELECT image_url FROM products WHERE id = $3),
      $4::integer, 
      (SELECT price FROM products WHERE id = $3) * $4::integer, 
      CURRENT_TIMESTAMP, 
      CURRENT_TIMESTAMP, 
      $5
    )
    RETURNING *;
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    customer_cart_id,
    product_id,
    parseInt(quantity, 10), // Ensure quantity is an integer
    user_id,
  ]);
  return response.rows[0];
};

// add UPDATE cart items

const updateCartItem = async ({ id, quantity, modifiedBy }) => {
  const SQL = `
    UPDATE cart_items
      SET
      quantity = $2,
      total_price = product_price * $2::integer,
      updated_at = CURRENT_TIMESTAMP,
      modified_by = $3
    WHERE id = $1
    RETURNING *;
  `;
  const response = await client.query(SQL, [id, quantity, modifiedBy]);
  return response.rows[0];
};

// add DELETE cart item
const deleteCartItem = async ({ id }) => {
  const SQL = `
  DELETE FROM cart_items WHERE id = $1
  `;
  await client.query(SQL, [id]);
};

// checkout_cart

module.exports = {
  fetchAllCarts,
  fetchCartById,
  addCartItem,
  fetchCartItemsById,
  updateCartItem,
  deleteCartItem,
};
