const { client } = require('../tables.js');
const { v4: uuidv4 } = require('uuid');

const createWishlistItem = async ({ wishlist_id, product_id }) => {
  const SQL = `
          INSERT INTO wishlist_items (id, customer_wishlist_id, product_id, created_at, updated_at, modified_by)
          VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $2)
          RETURNING *;
        `;
  const response = await client.query(SQL, [
    uuidv4(),
    user_id,
    wishlist_id,
    product_id,
  ]);
  return response.rows[0];
};

// fetch all wishlist items
const fetchAllWishlistItems = async () => {
  const SQL = `
        SELECT * FROM wishlist_items
    `;

  const response = await client.query(SQL);
  return response.rows;
};

const fetchWishlistById = async ({ user_id }) => {
  const SQL = `
    SELECT * FROM customer_wishlist WHERE use_id = $1
    `;

  const response = await client.query(SQL, [user_id]);
  return response.rows[0];
};

// fetch wishlist item by id

const fetchWishlistItemsById = async ({ wishlist_id }) => {
  const SQL = `
        SELECT * FROM wishlist_items 
        WHERE customer_wishlist_id = $1
    `;
  const response = await client.query(SQL, [wishlist_id]);
  return response.rows;
};

const deleteWishlistItemByIds = async ({ wishlist_id }) => {
  const SQL = `
    DELETE FROM wishlist_items 
        WHERE wishlist_id = $1 
  `;
  await client.query(SQL, [wishlist_id]);
};

module.exports = {
  createWishlistItem,
  fetchAllWishlistItems,
  fetchWishlistItemsById,
  deleteWishlistItemByIds,
};
