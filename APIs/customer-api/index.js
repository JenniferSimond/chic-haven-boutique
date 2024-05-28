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
  permissionToModify,
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
      const customer = await fetchUserById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

// Update user by id
router.put(
  '/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  permissionToModify,
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

// DELETE ACCOUNT
router.delete(
  '/:id',
  isAuthenticated,
  isAuthorizedCustomer,
  permissionToModify,
  async (req, res, next) => {
    try {
      const id = req.params;
      await deleteUserById(id);
      res.status(204).send();
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
