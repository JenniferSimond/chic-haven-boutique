const express = require('express');
const { createEmployee } = require('../../database/database.js');
const router = express.Router();

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

module.exports = router;
