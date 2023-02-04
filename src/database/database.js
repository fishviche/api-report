const { Pool } = require('pg');
const pool = new Pool({
  host: 'db_inmigration',
  port: 5432,
  user: 'inmigration',
  password: 'y2K.inmIG21',
  database: 'inmigration'
});
module.exports = {
  async query(text, params){
    const res = await pool.query(text, params);
    return res;
  }
}