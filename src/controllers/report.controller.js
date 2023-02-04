const db = require('../database/database.js');
const reportCtr = {};


reportCtr.getReports = async (req, res) => {
  const response = await db.query('SELECT * FROM report', []);
  res.send({ data: response.rows })
}

reportCtr.saveReport = async (req, res) => {
  try {
    const { name } = req.body;
    query = 'INSERT INTO category(name) VALUES ($1) RETURNING category_id'
    const response = await db.query(query, [name]);
    res.status(200).json({
      message: `User added with ID: ${response.rows[0].category_id}`,
      error: false
    })
  } catch (error) {
    console.log(error);
    res.json({
      error: true
    })
  } finally {
    await pool.end();
  }
}
module.exports = reportCtr;