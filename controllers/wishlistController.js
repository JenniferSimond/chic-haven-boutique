const express = require('express');
const router = express('router');

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSiteAdmin,
  permissionToViewOrModify,
  canPostReviews,
} = require('./shared/userAuth.js');

const {
  createWishlistItem,
  fetchAllWishlists,
  fetchAllWishlistItems,
  fetchWishlistItemsById,
  deleteWishlistItemByIds,
} = require('../database/index');

// add with list items -->
router.post(
  '/wishlists/:wishlist_id/items',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const wishlistId = req.params.wishlist_id;
      const productId = req.body;
      const modifiedBy = req.user.id;

      const newWishlistItem = await createWishlistItem(
        wishlistId,
        productId,
        modifiedBy
      );

      res.status(201).json(newWishlistItem);
    } catch (error) {
      next(error);
    }
  }
);

// get all wishlists  -->
router.get('/wishlists', async (req, res, next) => {
  try {
    const wishlists = await fetchAllWishlists();
    res.json(wishlists);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/users/:user_id/wishlist',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {}
);

// get wishlist items by Id -->
router.get(
  '/wishlists/:wishlist_id/items',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

// delete items -->

router.delete(
  '/wisthlist/:wishlist_id/items/:item_id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
