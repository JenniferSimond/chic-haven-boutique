const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { findUserWithToken } = require('../database/database.js');
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

module.exports = {
  isAuthenticated,
  isSiteAdmin,
  isSuperAdmin,
  isAuthorizedCustomer,
};
