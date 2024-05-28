const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { findUserWithToken, fetchUserById } = require('../database/database.js');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

// Middleware --> checks if user is authenticated
const isAuthenticated = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('Not Authorized!');
    }
    const token = req.headers.authorization.split(' ')[1];
    const user = await findUserWithToken(token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not Authorized' });
  }
};

// Middleware --> checks if user is site admin or higher
const isSiteAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'site_admin' && req.user.role !== 'super_admin') {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Middleware --> checks if user is a super admin
const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'super_admin') {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Middleware --> checks if user is an authorized customer or higher
const isAuthorizedCustomer = (req, res, next) => {
  try {
    if (
      req.user.role !== 'customer' &&
      req.user.role !== 'site_admin' &&
      req.user.role !== 'super_admin'
    ) {
      throw new Error('Forbidden');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

// Delete middlewear

const permissionToModify = async (req, res, next) => {
  try {
    const { id } = req.params; // setting the :id as a required parameter
    const userToBeDeleted = await fetchUserById(id);

    if (!userToBeDeleted) {
      return res.status(404).json({ message: 'User Not Found' });
    }
    // super-admin

    if (req.user.role === 'super_admin') {
      return next();
    }

    // site-admin
    if (req.user.role === 'site_admin' && userToBeDeleted.role === 'customer') {
      return next();
    }

    // customer
    if (req.user.role === 'customer' && req.user.role === userToBeDeleted.id) {
      return next();
    }

    throw new Error('Forbidden');
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

module.exports = {
  isAuthenticated,
  isSiteAdmin,
  isSuperAdmin,
  isAuthorizedCustomer,
  permissionToModify,
};
