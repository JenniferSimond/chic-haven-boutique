const express = require('express');
const router = express('router');
const upload = require('./config/multerConfig.js');

const {
  createProduct,
  fetchProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require('../database/index');

const {
  isSuperAdmin,
  isSiteAdmin,
  isAuthenticated,
  permissionToViewOrModify,
} = require('./shared/userAuth.js');

// CREATE

router.post(
  '/',
  isAuthenticated,
  isSuperAdmin,
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { name, description, price, category, product_status } = req.body;
      const user_id = req.user.id; // Gets the authenticated user ID from isAuthenticated the req.user.id is defined there

      //handels images
      const image_url = req.file
        ? `/product-images/${req.file.filename}`
        : null;

      const newProduct = await createProduct({
        name,
        description,
        price,
        category,
        product_status,
        image_url,
        user_id,
      });
      res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

// READ --> FETCH ALL
router.get('/', async (req, res, next) => {
  try {
    // res.send(await fetchProducts());
    const products = await fetchProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// READ --> FETCH By ID
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await fetchProductById(id);
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put(
  '/:id',
  isAuthenticated,
  isSuperAdmin,
  upload.single('image'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, description, price, category, merchant_id, status } =
        req.body;
      const user_id = req.user.id; // Gets the authenticated user ID from isAuthenticated the req.user.id is defined there

      const image_url = req.file
        ? `/product-images/${req.file.filename}`
        : null;

      const updatedProduct = await updateProduct({
        id,
        name,
        description,
        price,
        category,
        merchant_id,
        status,
        image_url,
        user_id,
      });
      res.status(200).json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

// DELETE

router.delete('/:id', isAuthenticated, isSuperAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteProduct({ id });
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
