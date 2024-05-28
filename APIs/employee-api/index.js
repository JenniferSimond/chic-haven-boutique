const express = require('express');
const {
  createEmployee,
  createCategory,
  createProduct,
  updateProduct,
  fetchAllUsers,
  deleteUserById,
  updateUserById,
} = require('../../database/database.js');
const {
  isSuperAdmin,
  isSiteAdmin,
  isAuthenticated,
  permissionToModify,
} = require('../../middleware/auth.js');
const router = express.Router();

// ** SUPER ADMIN ROUTES **

// CREATE employee
router.post('/register', async (req, res, next) => {
  try {
    const { last_name, first_name, password, email, phone_number, role } =
      req.body;
    const newEmployee = await createEmployee({
      last_name,
      first_name,
      password,
      email,
      phone_number,
      role,
    });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

// GET users
router.get('/users', isAuthenticated, isSiteAdmin, async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// UPDATE users by id
router.put(
  '/users/:id',
  isAuthenticated,
  permissionToModify,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userNewData = req.body;
      modifiedBy = req.user.id;
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

// DELETE USERS
router.delete(
  '/users/:id',
  isAuthenticated,
  isSiteAdmin,
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

// CREATE product
router.post(
  '/products',
  isAuthenticated,
  isSuperAdmin,
  async (req, res, next) => {
    try {
      const { name, description, price, category, merchant_id, status } =
        req.body;
      const user_id = req.user.id; // Gets the authenticated user ID from isAuthenticated the req.user.id is defined there
      const newProduct = await createProduct({
        name,
        description,
        price,
        category,
        merchant_id,
        status,
        user_id,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// UPDATE product
router.put(
  '/products/:id',
  isAuthenticated,
  isSiteAdmin,

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, merchant_id, status } =
        req.body;
      const user_id = req.user.id; // Gets the authenticated user ID from isAuthenticated the req.user.id is defined there
      const updatedProduct = await updateProduct({
        id,
        name,
        description,
        price,
        category,
        merchant_id,
        status,
        user_id,
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// orders
// ordered items

// UPDATE user by id

module.exports = router;
