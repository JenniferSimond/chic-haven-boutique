const express = require('express');
const {
  createEmployee,
  createCategory,
  createProduct,
  updateProduct,
  fetchAllUsers,
} = require('../../database/database.js');
const {
  isSuperAdmin,
  isSiteAdmin,
  isAuthenticated,
} = require('../../middleware/auth.js');
const router = express.Router();

// should change this to /create --> a new employee woudn't register, they would be created
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

router.get(
  'admin/users',
  isAuthenticated,
  isSiteAdmin,
  async (req, res, next) => {
    try {
    } catch (error) {}
  }
);

//create product
router.post(
  '/super-admin/products',
  isAuthenticated,
  isSuperAdmin,
  async (req, res, next) => {
    try {
      const { name, description, price, category, merchant_id, status } =
        req.body;
      const user_id = req.user.id; // Get the authenticated user ID
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

// Route to update a product
router.put(
  '/super-admin/products/:id',
  isAuthenticated,
  isSuperAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, merchant_id, status } =
        req.body;
      const user_id = req.user.id; // Get the authenticated user ID
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

module.exports = router;
