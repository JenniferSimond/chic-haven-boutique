const express = require('express');
const { createCustomer } = require('../../database/database.js');
const router = express.Router();

router.post('/signup', async (req, res, next) => {
  try {
    const { last_name, first_name, password, email, phone_number } = req.body;
    const newUser = await createCustomer({
      last_name,
      first_name,
      password,
      email,
      phone_number,
    });
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// cart routes

// cart_items routes

// wish_list routes

module.exports = router;
