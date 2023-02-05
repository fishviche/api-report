const { pool } = require('../database/database.js');
const categoryService = {}

categoryService.getOneCategory = async (categoryId) => {
  const response = await pool.query(`SELECT * FROM category WHERE category_id = $1`, [ categoryId ] );
  return response.rows[0] ? response.rows[0] : {};
};

categoryService.getCategories = async (categoryId) => {
  const response = await pool.query(`SELECT * FROM category`, [] );
  return response.rows ? response.rows : [];
};

categoryService.addCategory = async (data) => {
  const { name } = data;
  response = await pool.query(
    `INSERT INTO category(name)
      VALUES ($1) RETURNING category_id`, [ name ]
  );
  return {
    message: `Category added with ID: ${response.rows[0].category_id}`,
    error: false
  }
};

module.exports = categoryService;