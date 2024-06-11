const express = require('express');
const router = express('router');

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSuperAdmin,
  isSiteAdmin,
  permissionToViewOrModify,
  canPostReviews,
} = require('./shared/userAuth.js');

const {
  createCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
} = require('../database/index.js');

// create category
router.post(
  '/categories',
  isAuthenticated,
  isSuperAdmin,
  async (req, res, next) => {
    try {
      const { name } = req.body;
      const { modifiedBy } = req.user.id;
      const newCategory = await createCategory({ name, modifiedBy });

      res.status(201).json(newCategory);
    } catch (error) {}
  }
);

// fetch all categories
router.get(
  '/categories',
  isAuthenticated,
  isSiteAdmin,
  async (req, res, next) => {
    try {
      const categories = await fetchAllCategories();

      if (!categories) {
        return res.status(404).json({ message: 'No Categories Found' });
      }

      res.json(categories);
    } catch (error) {
      next(error);
    }
  }
);

// fetch category by id
router.get('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await fetchCategoryById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category Not Found' });
    }
    res.json(category);
  } catch (error) {
    next(error);
  }
});

// update category
router.put(
  '/categories/:id',
  isAuthenticated,
  isSiteAdmin,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const modifiedBy = req.user.id;

      const updatedCategory = await updateCategory({
        id,
        name,
        modifiedBy,
      });

      res.status(200).json(updatedCategory);
    } catch (error) {
      next(error);
    }
  }
);

// delete category
router.delete('/categories/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteCategory({ id });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
