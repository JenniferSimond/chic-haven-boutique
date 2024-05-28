const express = require('express');
const {
  createCustomer,
  fetchUserById,
  updateUserById,
} = require('../../database/database.js');
const router = express.Router();
const {
  isAuthorizedCustomer,
  isAuthenticated,
} = require('../../middleware/auth.js');

router.post('/signup', async (req, res, next) => {
  try {
    const { last_name, first_name, password, email, phone_number } = req.body;
    const newUser = await fetchUserById({
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

// get customer by id

router.get(
  '/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await fetchCustomerById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userNewData = req.body;
      const modifiedBy = req.user.id;
      const updatedUserDetails = await updateUserById(
        id,
        userNewData,
        modifiedBy
      );
      if (!updatedUserDetails) {
        return res.status(404).json({ message: 'Customer Not Found' });
      }
      res.json(updatedUserDetails);
    } catch (error) {
      next(error);
    }
  }
);
// cart routes

// cart_items routes

// wish_list routes

// address route

module.exports = router;
