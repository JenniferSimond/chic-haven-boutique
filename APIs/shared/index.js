const express = require('express');
const dotenv = require('dotenv').config();
const router = express.Router();
const {
  fetchProducts,
  authenticateUser,
  updateUserById,
  fetchAllCategories,
} = require('../../database/database.js');
const {
  isAuthorizedCustomer,
  isAuthenticated,
} = require('../../middleware/auth.js');

router.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

// PUBLIC SHARED ROUTES

// login
router.post('/login', async (req, res, next) => {
  try {
    res.send(await authenticateUser(req.body));
  } catch (error) {
    next(error);
  }
});

router.get('/products', async (req, res, next) => {
  try {
    // res.send(await fetchProducts());
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get('/categories', async (req, res, next) => {
  try {
    const categories = await fetchAllCategories();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

//get reviews

// PROTECTED SHARED ROUTES

// post a review (post)

// edit their review --> this is mostly used by customers may move

// curl http://localhost:3000/api/boutique/products

module.exports = router;
