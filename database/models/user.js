const { client } = require('../tables.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByToken } = require('./auth.js');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

// CREATE CUSTOMERS
const createUserCustomer = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
}) => {
  const SQL = `
    INSERT INTO users(id, last_name, first_name, password, email, phone_number, user_role, can_post_reviews) 
    VALUES ($1, $2, $3, $4, $5, $6, 'customer', TRUE) RETURNING *
  `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
  ]);

  const newUser = response.rows[0];

  const token = jwt.sign(
    {
      id: newUser.id,
      user_role: newUser.user_role,
      can_post_reviews: newUser.can_post_reviews,
    },
    secret,
    { expiresIn: '1h' }
  );

  const userDetails = await findUserByToken(token);

  return { userDetails, token };
};

// FETCH USERS (customers)
const fetchAllUsers = async () => {
  const SQL = `
    SELECT * FROM users 
    WHERE user_role = 'customer'
  `;
  const response = await client.query(SQL);
  return response.rows;
};

// FETCH USER BY ID
const fetchUserById = async (id) => {
  const SQL = `
    SELECT * FROM users WHERE id = $1
  `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

const fetchUserDetails = async () => {
  // need to fetch all details
  // -> cart id, wishlist id, customer account details
};

const fetchUserDetailsById = async () => {};

// UPDATE USER BY ID
const updateUser = async (id, customerNewData, modifiedBy) => {
  const {
    last_name,
    first_name,
    email,
    password,
    phone_number,
    user_role = 'customer',
    can_post_reviews = 'TRUE',
  } = customerNewData;

  // If user changes password, hash it
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const SQL = `
    UPDATE users
    SET 
      last_name = COALESCE($2, last_name),
      first_name = COALESCE($3, first_name),
      email = COALESCE($4, email),
      password = COALESCE($5, password),
      phone_number = COALESCE($6, phone_number),
      user_role = COALESCE($7, user_role),
      can_post_reviews = $8,
      modified_by = $9,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $1
    RETURNING *;
  `;

  const response = await client.query(SQL, [
    id,
    last_name,
    first_name,
    email,
    hashedPassword || password, // Use hashedPassword if provided or password if not
    phone_number,
    user_role,
    can_post_reviews,
    modifiedBy,
  ]);

  return response.rows[0];
};

// DELETE USER
const deleteUser = async (id) => {
  const SQL = `
    DELETE FROM users WHERE id = $1;
  `;
  await client.query(SQL, [id]);
};

module.exports = {
  createUserCustomer,
  fetchAllUsers,
  fetchUserById,
  updateUser,
  deleteUser,
};
