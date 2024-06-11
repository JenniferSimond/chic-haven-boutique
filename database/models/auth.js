const { client } = require('../tables.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'shhhhhlocal';

const authenticateUser = async ({ email, password }) => {
  const SQL = `
    SELECT id, password, user_role, can_post_reviews
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

  const token = jwt.sign(
    {
      id: user.id,
      user_role: user.user_role,
      can_post_reviews: user.can_post_reviews,
    },
    secret,
    {}
  );
  return { token };
};

const findUserByToken = async (token) => {
  let userId, userRole, canPostReviews;
  try {
    const decoded = jwt.verify(token, secret);
    userId = decoded.id;
    userRole = decoded.user_role;
    canPostReviews = decoded.can_post_reviews;
  } catch (ex) {
    const error = new Error('Not Authorized');
    error.status = 401;
    throw error;
  }

  const SQL = `
    SELECT id, email, user_role, can_post_reviews FROM users WHERE id = $1;
  `;
  const response = await client.query(SQL, [userId]);
  if (response.rows.length === 0) {
    const error = new Error('User not found');
    error.status = 401;
    throw error;
  }

  return {
    ...response.rows[0],
    user_role: userRole,
    can_post_reviews: canPostReviews,
  };
};

module.exports = {
  authenticateUser,
  findUserByToken,
};
