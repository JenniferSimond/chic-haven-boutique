// const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { findUserByToken, fetchUserById } = require('../../database/index.js');

const secret = process.env.JWT_SECRET || 'shhhhhlocal';

// Middleware --> checks if user is authenticated //
const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Not Authorized!');
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = await findUserByToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not Authorized' });
  }
};

// Middleware --> checks if user is site admin or higher
const isSiteAdmin = (req, res, next) => {
  try {
    if (
      req.user.user_role !== 'site_admin' &&
      req.user.user_role !== 'super_admin'
    ) {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Not Authorized' });
  }
};

// Middleware --> checks if user is a super admin
const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.user_role !== 'super_admin') {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Not Authorized' });
  }
};

// Middleware --> checks if user is an authorized customer or higher
const isAuthorizedCustomer = (req, res, next) => {
  try {
    if (
      req.user.user_role !== 'customer' &&
      req.user.user_role !== 'site_admin' &&
      req.user.user_role !== 'super_admin'
    ) {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Not Authorized' });
  }
};

// Delete middlewear

const permissionToViewOrModify = async (req, res, next) => {
  try {
    const { id } = req.params; // setting the :id as a required parameter
    const targetUser = await fetchUserById(id);

    if (!targetUser) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    // super-admin

    if (req.user.user_role === 'super_admin') {
      return next();
    }

    // site-admin
    if (
      req.user.user_role === 'site_admin' &&
      targetUser.user_role === 'customer'
    ) {
      return next();
    }

    // customer
    if (req.user.user_role === 'customer' && req.user.id === targetUser.id) {
      return next();
    }

    throw new Error('Forbidden');
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

const canPostReviews = (req, res, next) => {
  try {
    if (
      req.user.user_role === 'super_admin' ||
      req.user.user_role === 'site_admin'
    ) {
      return next();
    }

    if (
      req.user.user_role === 'customer' &&
      req.user.can_post_reviews === true // Assuming can_post_reviews is a boolean
    ) {
      return next();
    }

    throw new Error('Forbidden');
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = {
  isAuthenticated,
  isSiteAdmin,
  isSuperAdmin,
  isAuthorizedCustomer,
  permissionToViewOrModify,
  canPostReviews,
};
