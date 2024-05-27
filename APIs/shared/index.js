const express = require('express');
const router = express.Router();
const {
  fetchProducts,
  authenticateUser,
} = require('../../database/database.js');

router.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

router.post('/auth/login', async (req, res, next) => {
  try {
    res.send(await authenticateUser(req.body));
  } catch (error) {
    next(error);
  }
});

router.get('/products', async (req, res, next) => {
  1``;
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
