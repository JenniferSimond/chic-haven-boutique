const express = require('express');
const router = express.Router();
const { fetchProducts } = require('../../database/database.js');

// Define your shared routes here
router.get('/', (req, res) => {
  res.send('Shared API Home');
});

router.get('/status', (req, res) => {
  res.json({ status: 'API is running' });
});

router.get('/products', async (req, res, next) => {
  try {
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
