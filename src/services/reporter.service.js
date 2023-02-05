const { pool } = require('../database/database.js');
const reporterService = {}

reporterService.findReporter = async(document_number) => {
  const data = await pool.query(
    `SELECT * FROM reporter
    WHERE document_number = $1`,
    [ document_number ]
  )
  return { user: data.rows[0] };
}


module.exports = reporterService;