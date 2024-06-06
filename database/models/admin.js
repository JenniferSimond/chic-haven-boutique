const { client } = require('../tables');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const createAdmin = async ({
  last_name,
  first_name,
  password,
  email,
  phone_number,
  user_role = 'site_admin',
}) => {
  const SQL = `
          INSERT INTO users(id, last_name, first_name, password, email, phone_number, user_role, can_post_reviews) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE) RETURNING *
          `;
  const response = await client.query(SQL, [
    uuidv4(),
    last_name,
    first_name,
    await bcrypt.hash(password, 10),
    email,
    phone_number,
    user_role,
  ]);
  return response.rows[0];
};

const fetchAllAdmins = async () => {
  const SQL = `
    SELECT * FROM users 
    WHERE user_role IN ('site_admin', 'super_admin')
    `;
  const response = await client.query(SQL);
  return response.rows;
};

module.exports = { createAdmin, fetchAllAdmins };
