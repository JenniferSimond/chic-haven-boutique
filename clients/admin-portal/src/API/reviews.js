import { API_URL } from './apiConfig';

// Create a new review
const createReview = async (token, userId, productId, rating, comment) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/products/${productId}/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );
    const newReview = await response.json();
    console.log('Created Review (API)-->', newReview);
    return newReview;
  } catch (error) {
    console.error('Error creating review', error);
  }
};

// Fetch all reviews
const fetchAllReviews = async (token) => {
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const reviews = await response.json();
    return reviews;
  } catch (error) {
    console.error('Error fetching reviews', error);
  }
};

// Fetch reviews by product
const fetchReviewsByProduct = async (productId) => {
  try {
    const response = await fetch(`${API_URL}/products/${productId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const productReviews = await response.json();
    console.log('Product Reviews (API)-->', productReviews);
    return productReviews;
  } catch (error) {
    console.error('Error fetching product reviews', error);
  }
};

// Fetch reviews by user
const fetchReviewsByUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/reviews`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const userReviews = await response.json();
    return userReviews;
  } catch (error) {
    console.error('Error fetching user reviews', error);
  }
};

// Update a review
const updateReview = async (token, userId, reviewId, rating, comment) => {
  try {
    const response = await fetch(
      `${API_URL}/users/${userId}/reviews/${reviewId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, comment }),
      }
    );
    const updatedReview = await response.json();
    return updatedReview;
  } catch (error) {
    console.error('Error updating review', error);
  }
};

// Delete a review
const deleteReview = async (token, reviewId) => {
  try {
    await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error('Error deleting review', error);
  }
};

export {
  createReview,
  fetchAllReviews,
  fetchReviewsByProduct,
  fetchReviewsByUser,
  updateReview,
  deleteReview,
};
