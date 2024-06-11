const { client } = require('../tables');
const { v4: uuidv4 } = require('uuid');

const createProductReview = async (
  userId,
  productId,
  rating,
  comment,
  modifiedBy
) => {
  const SQL = `
    INSERT INTO product_reviews (
      id, 
      product_id,
      user_id,
      rating, 
      comment, 
      created_at, 
      updated_at, 
      modified_by
    )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      CURRENT_TIMESTAMP,
      CURRENT_TIMESTAMP,
      $6
    )
    RETURNING *;
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    productId,
    userId,
    rating,
    comment,
    modifiedBy,
  ]);
  return response.rows[0];
};

const fetchAllReviews = async () => {
  const SQL = `
    SELECT * FROM product_reviews;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchReviewsByProduct = async (productId) => {
  const SQL = `
    SELECT * FROM product_reviews WHERE product_id = $1;
  `;
  const response = await client.query(SQL, [productId]);
  return response.rows;
};

const fetchReviewsByUser = async (userId) => {
  const SQL = `
    SELECT * FROM product_reviews WHERE user_id = $1;
  `;
  const response = await client.query(SQL, [userId]);
  return response.rows;
};

const updateProductReview = async (
  reviewId,
  userId,
  rating,
  comment,
  modifiedBy
) => {
  const SQL = `
    UPDATE product_reviews
    SET
      rating = COALESCE($3, rating),
      comment = COALESCE($4, comment),
      modified_by = $5,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1 AND user_id = $2
    RETURNING *;
  `;
  const response = await client.query(SQL, [
    reviewId,
    userId,
    rating,
    comment,
    modifiedBy,
  ]);
  return response.rows[0];
};

const deleteProductReview = async (id) => {
  const SQL = `
    DELETE FROM product_reviews WHERE id = $1;
  `;
  await client.query(SQL, [id]);
};

module.exports = {
  createProductReview,
  fetchAllReviews,
  fetchReviewsByProduct,
  fetchReviewsByUser,
  updateProductReview,
  deleteProductReview,
};
