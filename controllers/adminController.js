const express = require('express');
const { authenticateUser } = require('../database/index.js');
const {
  updateUser,
  createAdmin,
  fetchAllAdmins,
  fetchUserById,
  deleteUser,
} = require('../database/index.js');
const {
  isAuthenticated,
  isSiteAdmin,
  isSuperAdmin,
  permissionToViewOrModify,
} = require('./shared/userAuth.js');

const router = express('router');

// Create
// only super admins can create new employee account

router.post(
  '/register',
  isAuthenticated,
  isSuperAdmin,
  async (req, res, next) => {
    try {
      const {
        last_name,
        first_name,
        password,
        email,
        phone_number,
        user_role,
      } = req.body;
      const newEmployee = await createAdmin({
        last_name,
        first_name,
        password,
        email,
        phone_number,
        user_role,
      });
      res.status(201).json(newEmployee);
    } catch (error) {
      next(error);
    }
  }
);

// * READ *

//  login
// route only works if site_admin or higher
// admin login --> since they have two portals, I want them to have seperate routes for login
router.post('/login', async (req, res, next) => {
  try {
    const { userDetails, token } = await authenticateUser(req.body);

    if (
      userDetails.user_role !== 'site_admin' &&
      userDetails.user_role !== 'super_admin'
    ) {
      return res.status(403).json({ message: 'Access Denied' });
    }

    res.json({ userDetails, token });
  } catch (error) {
    next(error);
  }
});

// If user == super-admin can fetch all admins

router.get('/', isAuthenticated, isSuperAdmin, async (req, res, next) => {
  try {
    const admins = await fetchAllAdmins();
    if (!admins) {
      return res.json({ message: 'User Not Found' });
    }
    res.json(admins);
  } catch (error) {
    next(error);
  }
});

// get by id /:
router.get('/:id', isAuthenticated, isSuperAdmin, async (req, res, next) => {
  try {
    const { id } = req.params;
    const admin = await fetchUserById(id);

    if (!admin) {
      return res.json({ message: 'User Not Found' });
    }
    res.json(admin);
  } catch (error) {
    next(error);
  }
});

// Update --> Super admin can edit anyone and site-admins can only edit themselves.
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

// Delete
router.delete(
  '/:id',
  isAuthenticated,
  permissionToViewOrModify,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await deleteUser(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
