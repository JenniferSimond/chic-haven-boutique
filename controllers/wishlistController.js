const express = require('express');
const router = express('router');

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSiteAdmin,
} = require('./shared/userAuth.js');

const {
  createWishlistItem,
  fetchAllWishlists,
  fetchWishlistByUserId,
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
      const { productId } = req.body;
      const modifiedBy = req.user.id;
      const newWishlistItem = await createWishlistItem({
        wishlistId,
        productId,
        modifiedBy,
      });
      if (!newWishlistItem) {
        return res
          .status(400)
          .json({ message: 'Unable To Create Wishlist Items' });
      }
      res.status(201).json(newWishlistItem);
    } catch (error) {
      next(error);
    }
  }
);

// get all wishlists  -->
router.get(
  '/wishlists',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const wishlists = await fetchAllWishlists();
      res.json(wishlists);
    } catch (error) {
      next(error);
    }
  }
);

// get all wishlist items -->
router.get(
  '/wishlists/items',
  isAuthenticated,
  isSiteAdmin,
  async (req, res, next) => {
    try {
      const wishlistItems = await fetchAllWishlistItems();
      if (!wishlistItems) {
        return res.status(404).json({ message: 'No Wishlist Items Found' });
      }
      res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }
);

// wishlist by User
router.get(
  '/users/:user_id/wishlists',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const wishlist = await fetchWishlistByUserId({ userId });
      if (!wishlist) {
        return res.status(404).json({ message: 'Wishlist Not Found' });
      }
      res.json(wishlist);
    } catch (error) {
      next(error);
    }
  }
);

// get wishlist items by wishlist Id -->
router.get(
  '/wishlists/:wishlist_id/items',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const wishlistId = req.params.wishlist_id;
      const wishlistItems = await fetchWishlistItemsById({ wishlistId });
      if (!wishlistItems) {
        return res.status(404).json({ message: 'Wishlist Items Not Found' });
      }
      res.json(wishlistItems);
    } catch (error) {
      next(error);
    }
  }
);

// delete items -->

router.delete(
  '/wishlists/items/:item_id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const itemsId = req.params.item_id;
      await deleteWishlistItemByIds(itemsId);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
