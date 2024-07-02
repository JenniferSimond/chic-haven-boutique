const express = require('express');
const router = express.Router();

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSiteAdmin,
  permissionToViewOrModify,
  canPostReviews,
} = require('./shared/userAuth.js');

const {
  createProductReview,
  fetchAllReviews,
  fetchReviewsByProduct,
  fetchReviewsByUser,
  deleteProductReview,
  updateProductReview,
} = require('../database/index');

// create review
router.post(
  '/users/:user_id/products/:product_id/reviews',
  isAuthenticated,
  isAuthorizedCustomer,
  canPostReviews,
  async (req, res, next) => {
    console.log('route hit');
    try {
      const userId = req.params.user_id;
      const productId = req.params.product_id;
      const modifiedBy = req.user.id;
      const { rating, comment } = req.body;

      const newReview = await createProductReview(
        userId,
        productId,
        rating,
        comment,
        modifiedBy
      );

      res.status(201).json(newReview);
    } catch (error) {
      next(error);
    }
  }
);

// fetch reviews
router.get('/reviews', isAuthenticated, isSiteAdmin, async (req, res, next) => {
  try {
    const reviews = await fetchAllReviews();
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get('/products/:product_id/reviews', async (req, res, next) => {
  try {
    const productId = req.params.product_id;
    const productReviews = await fetchReviewsByProduct(productId);

    if (!productReviews.length) {
      return res.status(404).json({ message: 'Product Reviews Not Found' });
    }

    res.json(productReviews);
  } catch (error) {
    next(error);
  }
});

// router.get('/users/:user_id/reviews', async (req, res, next) => {
//   try {
//     const userId = req.params.user_id;
//     const customerReviews = await fetchReviewsByUser(userId);

//     if (!customerReviews.length) {
//       return res.status(404).json({ message: 'User Reviews Not Found' });
//     }

//     res.json(customerReviews);
//   } catch (error) {
//     next(error);
//   }
// });

// update review
router.put(
  '/users/:user_id/reviews/:review_id',
  isAuthenticated,
  isAuthorizedCustomer,
  canPostReviews,
  async (req, res, next) => {
    try {
      const reviewId = req.params.review_id;
      const userId = req.params.user_id;
      const { rating, comment } = req.body;
      const modifiedBy = req.user.id;

      const updatedReview = await updateProductReview(
        reviewId,
        userId,
        rating,
        comment,
        modifiedBy
      );

      if (!updatedReview) {
        return res.status(404).json({ message: 'Review Not Found' });
      }

      res.status(200).json(updatedReview);
    } catch (error) {
      next(error);
    }
  }
);

// delete review
router.delete(
  '/reviews/:review_id',
  isAuthenticated,
  isAuthorizedCustomer,
  canPostReviews,
  async (req, res, next) => {
    try {
      const id = req.params.review_id;

      await deleteProductReview(id);

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
