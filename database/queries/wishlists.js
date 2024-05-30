const { client } = require('../../database/tables.js');

const addWishlistItem = async ({ user_id, product_id }) => {
  const SQL = `
      INSERT INTO wishlist_items (id, customer_wishlist_id, product_id, created_at, updated_at, modified_by)
      VALUES (uuid_generate_v4(), (SELECT id FROM customer_wishlist WHERE user_id = $1), $2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $1)
      RETURNING *;
    `;
  const response = await client.query(SQL, [user_id, product_id]);
  return response.rows[0];
};

module.exports = { addWishlistItem };
