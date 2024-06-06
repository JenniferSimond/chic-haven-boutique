const { v4: uuidv4 } = require('uuid');
const { client } = require('../tables.js');

// CREATE CATEGORY
const createCategory = async ({ name, modifiedBy }) => {
  // on a conflict (name already there, DO UPDATE the existing name --> DON'T create a new one)
  const SQL = `
          INSERT INTO categories(id, name, created_at, updated_at, modified_by) 
          VALUES ($1, $2, current_timestamp, current_timestamp, $3) 
          ON CONFLICT (name) DO UPDATE 
          SET updated_at = excluded.updated_at, modified_by = excluded.modified_by
          RETURNING *;
        `;
  const response = await client.query(SQL, [uuidv4(), name, modifiedBy]);
  return response.rows[0];
};

const fetchAllCategories = async () => {
  const SQL = `
        SELECT * FROM categories;
        `;
  const response = await client.query(SQL);
  return response.rows;
};

const fetchCategoryById = async ({ id }) => {
  const SQL = `
          SELECT * FROM categories WHERE id = $1
  `;

  const response = await client.query(SQL, [id]);
  return response.rows[0];
};

// UPDATE CATEGORY

const updateCategory = async ({ id, name, modifiedBy }) => {
  const SQL = `
        UPDATE categories 
        SET 
          name = $2, 
          updated_at = current_timestamp, 
          modified_by = $3
          WHERE id = $1 
          RETURNING *;
        `;

  const response = await client.query(SQL, [id, name, modifiedBy]);
  return response.rows[0];
};

// DELETE CATEGORY
const deleteCategory = async ({ id }) => {
  const SQL = `
        DELETE FROM categories WHERE id = $1
        `;
  await client.query(SQL, [id]);
};

module.exports = {
  createCategory,
  fetchAllCategories,
  fetchCategoryById,
  updateCategory,
  deleteCategory,
};
