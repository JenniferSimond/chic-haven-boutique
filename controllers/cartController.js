const express = require('express');
const router = express('router');

const {
  addCartItem,
  fetchAllCarts,
  fetchCartById,
  updateCartItem,
  fetchCartItemsById,
  deleteCartItem,
} = require('../database/index.js');

const { cartCheckOut } = require('../database/models/checkOut.js');

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSiteAdmin,
  permissionToViewOrModify,
} = require('./shared/userAuth.js');
// customer cart auto created when customer signs up

// get all carts

router.get('/carts', isAuthenticated, isSiteAdmin, async (req, res, next) => {
  try {
    const carts = await fetchAllCarts();
    res.json(carts);
  } catch (error) {
    next(error);
  }
});

// get cart
router.get(
  '/users/:id/cart',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const cart = await fetchCartById(id);
      res.json(cart);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/carts/:customer_cart_id/items',
  isAuthenticated,

  async (req, res, next) => {
    try {
      const { customer_cart_id } = req.params;
      const cartItems = await fetchCartItemsById(customer_cart_id);
      res.json(cartItems);
    } catch (error) {
      next(error);
    }
  }
);

// add item to cart
router.post(
  '/carts/:customer_cart_id/items',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { user_id, customer_cart_id } = req.params;
      const { product_id, quantity } = req.body;

      const newCartItem = await addCartItem({
        customer_cart_id,
        product_id,
        quantity,
        user_id,
      });
      res.status(201).json(newCartItem);
    } catch (error) {
      next(error);
    }
  }
);

// update cart item
router.put(
  '/carts/:customer_cart_id/items/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { quantity } = req.body;
      const modifiedBy = req.user.id;
      const cartItem = await updateCartItem({ id, quantity, modifiedBy });

      res.json(cartItem);
    } catch (error) {
      next(error);
    }
  }
);

// not sure if this the best place but it makes sense to me
router.post(
  '/users/:user_id/carts/:cart_id/checkout',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const userId = req.params.user_id;
      const cartId = req.params.cart_id;
      const modifiedBy = req.user.id;

      console.log(
        'Checkout request received for user:',
        userId,
        'and cart:',
        cartId
      );

      const checkOut = await cartCheckOut(userId, cartId, modifiedBy);
      res.status(201).json(checkOut);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/carts/items/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteCartItem({ id });
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
