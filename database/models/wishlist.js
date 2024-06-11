const { client } = require('../tables.js');
const { v4: uuidv4 } = require('uuid');

const createWishlistItem = async ({ wishlistId, productId, modifiedBy }) => {
  const SQL = `
          INSERT INTO wishlist_items (id, customer_wishlist_id, product_id, created_at, updated_at, modified_by)
          VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4)
          RETURNING *;
        `;
  const response = await client.query(SQL, [
    uuidv4(),
    wishlistId,
    productId,
    modifiedBy,
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

const fetchAllWishlists = async () => {
  const SQL = `
    SELECT * FROM customer_wishlist
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchWishlistById = async ({ userId }) => {
  const SQL = `
    SELECT * FROM customer_wishlist WHERE use_id = $1
    `;

  const response = await client.query(SQL, [userId]);
  return response.rows[0];
};

// fetch wishlist item by id

const fetchWishlistItemsById = async ({ wishlistId }) => {
  const SQL = `
        SELECT * FROM wishlist_items 
        WHERE customer_wishlist_id = $1
    `;
  const response = await client.query(SQL, [wishlistId]);
  return response.rows;
};

const deleteWishlistItemByIds = async ({ id }) => {
  const SQL = `
    DELETE FROM wishlist_items 
        WHERE id = $1 
  `;
  await client.query(SQL, [wishlist_id]);
};

module.exports = {
  createWishlistItem,
  fetchAllWishlists,
  fetchAllWishlistItems,
  fetchWishlistItemsById,
  deleteWishlistItemByIds,
};
