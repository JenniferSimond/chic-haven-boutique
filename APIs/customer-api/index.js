const express = require('express');
const router = express.Router();

// routes for customers
router.get('/', (req, res) => {
  res.send('Customer API');
});

module.exports = router;
