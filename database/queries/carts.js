const { client } = require('../../database/tables');
const { v4: uuidv4 } = require('uuid');

const fetchCartById = async ({ user_id }) => {
  const SQL = `
      SELECT * FROM customer_cart WHERE user_id = $1;
    `;

  const response = await client.query(SQL, [user_id]);
  return response.rows[0];
};

const addCartItem = async ({ user_id, product_id, quantity }) => {
  /* create cart_items table -->
        id, cart id, product id, quantity, price, total price
        not sure if total price should happen in items or cart  */

  const SQL = `
          INSERT INTO cart_items (id, customer_cart_id, product_id, product_name, product_price, quantity, total_price, created_at, updated_at, modified_by)
          VALUES (uuid_generate_v4(), (SELECT id FROM customer_cart WHERE user_id = $1), $2, (SELECT name FROM products WHERE id = $2),
          (SELECT price FROM products WHERE id = $2), $3, (SELECT price FROM products WHERE id = $2) * $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $1 )
          RETURNING *;
        `;
  const response = await client.query(SQL, [user_id, product_id, quantity]);
  return response.rows[0];
};

module.exports = { fetchCartById, addCartItem };
