const db = require('../database/database.js');
const reportCtr = {};


reportCtr.getReports = async (req, res) => {
	const response = await db.query('SELECT * FROM users LIMIT 2', []);
    res.send({ data: response.rows })
}
module.exports = reportCtr;