const { client } = require('../tables.js');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

const authenticateUser = async ({ email, password }) => {
  const SQL = `
    SELECT id, password, role 
    FROM users 
    WHERE email = $1;
    `;
  const response = await client.query(SQL, [email]);
  const user = response.rows[0];

  if (!user) {
    const error = new Error('User Not Found');
    error.status = 401;
    throw error;
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    const error = new Error('Invalid Password');
    error.status = 401;
    throw error;
  }

  const token = jwt.sign({ id: user.id, role: user.role }, secret);
  return { token };
};

const findUserWithToken = async (token) => {
  let userId, userRole;
  try {
    const decoded = jwt.verify(token, secret);
    userId = decoded.id;
    userRole = decoded.role;
  } catch (ex) {
    const error = new Error('Not Authorized');
    error.status = 401;
    throw error;
  }

  const SQL = `
      SELECT id, email FROM users WHERE id = $1;
    `;
  const response = await client.query(SQL, [userId]);
  if (response.rows.length === 0) {
    const error = new Error('User not found');
    error.status = 401;
    throw error;
  }

  return { ...response.rows[0], role: userRole };
};

// CREATE EMPLOYEES
const createEmployee = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
  role = 'site_admin',
}) => {
  const SQL = `
      INSERT INTO users(id, last_name, first_name, password, email, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *
      `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
    role,
  ]);
  return response.rows[0];
};

// CREATE CUSTOMERS
const createCustomer = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
}) => {
  const SQL = `
        INSERT INTO users(id, last_name, first_name, password, email, phone_number, role) VALUES ($1, $2, $3, $4, $5, $6, 'customer') RETURNING *
        `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
  ]);
  return response.rows[0];
};

// FETCH USERS
const fetchAllUsers = async () => {
  const SQL = `
    SELECT * FROM users
    `;
  const response = await client.query(SQL);
  return response.rows;
};

// DELETE USER
const deleteUser = async (id) => {
  const SQL = `
    DELETE FROM users WHERE id = $1
    `;
  await client.query(SQL, [id]);
};

// FETCH USER BY ID
const fetchUserById = async (id) => {
  const SQL = `
    SELECT * FROM users WHERE id = $1
    `;
  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// UPDATE USER BY ID
const updateUser = async (id, customerNewData, modifiedBy) => {
  const { last_name, first_name, email, password, phone_number } =
    customerNewData;

  //if user changes password hash it
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  const SQL = `
    UPDATE users
    SET 
      last_name = COALESCE($1, last_name),
      first_name = COALESCE($2, first_name),
      email = COALESCE($3, email),
      password = COALESCE($4, password),
      phone_number = COALESCE($5, phone_number),
      modified_by = $6,
      updated_at = current_timestamp
    WHERE id = $7
    RETURNING *;
    `;

  const response = await client.query(SQL, [
    last_name,
    first_name,
    email,
    hashedPassword || password,
    phone_number,
    modifiedBy,
    id,
  ]);

  return response.rows[0];
};

module.exports = {
  createEmployee,
  createCustomer,
  fetchAllUsers,
  fetchUserById,
  deleteUser,
  updateUser,
  authenticateUser,
  findUserWithToken,
  updateUser,
};
