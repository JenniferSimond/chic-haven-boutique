const express = require('express');
const router = express.Router();

// routes for employee
router.get('/', (req, res) => {
  res.send('Employee API');
});

module.exports = router;
