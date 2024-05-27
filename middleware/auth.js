var jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const { findUserWithToken } = require('../database/database.js');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

//same as isLoggedIn in block 36user
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

// Create site admin middleware

const isSiteAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'site_admin' && req.user.role !== 'super_admin') {
      throw new Error('Not Authorized');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbbiden' });
  }
};
// Create super admin middle ware
const isSuperAdmin = (req, res, next) => {
  try {
    if (req.user.role !== 'super_admin') {
      throw new Error('Not Authorized');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbbiden' });
  }
};
// Creaete authorized customer middle ware
const isAuthorizedCustomer = (req, res, next) => {
  try {
    if (
      req.user.role !== 'customer' &&
      req.user.role !== 'site_admin' &&
      req.user.role !== 'super_admin'
    ) {
      throw new Error('Not Authorized');
    }
    next();
  } catch (error) {
    res.status(403).json({ message: 'Forbidden' });
  }
};

module.exports = {
  isSiteAdmin,
  isSuperAdmin,
  isAuthenticated,
};
