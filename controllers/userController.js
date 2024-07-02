const express = require('express');
const router = express.Router();
const {
  createUserCustomer,
  authenticateUser,
  fetchAllUsers,
  fetchUserById,
  fetchReviewsByUser,
  updateUser,
  deleteUser,
} = require('../database/index.js');

const {
  isAuthenticated,
  isAuthorizedCustomer,
  isSiteAdmin,
  permissionToViewOrModify,
} = require('./shared/userAuth.js');

router.post('/signup', async (req, res, next) => {
  try {
    const { last_name, first_name, password, email, phone_number } = req.body;
    const { userDetails, token } = await createUserCustomer({
      last_name,
      first_name,
      password,
      email,
      phone_number,
    });
    res.status(201).json({ userDetails, token });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { userDetails, token } = await authenticateUser(req.body);
    res.json({ userDetails, token });
  } catch (error) {
    next(error);
  }
});

router.get(
  '/me',
  isAuthenticated,
  isAuthorizedCustomer,
  async (req, res, next) => {
    try {
      const customer = await fetchUserById(req.user.id);
      if (!customer) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  isAuthenticated,
  permissionToViewOrModify,

  async (req, res, next) => {
    try {
      const { id } = req.params;
      const customer = await fetchUserById(id);
      if (!customer) {
        return res.status(404).json({ message: 'Customer Not Found' });
      }
      res.json(customer);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/', isAuthenticated, isSiteAdmin, async (req, res, next) => {
  try {
    const users = await fetchAllUsers();
    if (!users) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    res.json(users);
  } catch (error) {
    next(error);
  }
});

// update --> if site_admin or customer to update

router.put(
  '/:id',
  isAuthenticated,
  permissionToViewOrModify,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const userNewData = req.body;
      modifiedBy = req.user.id;
      const updatedUserDetails = await updateUser(id, userNewData, modifiedBy);
      if (!updatedUserDetails) {
        return res.status(404).json({ message: 'Customer Not Found' });
      }
      res.json(updatedUserDetails);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  isAuthenticated,
  permissionToViewOrModify,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteUser(id);
      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:user_id/reviews', async (req, res, next) => {
  try {
    const userId = req.params.user_id;
    const customerReviews = await fetchReviewsByUser(userId);

    if (!customerReviews.length) {
      return res.status(404).json({ message: 'User Reviews Not Found' });
    }

    res.json(customerReviews);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
