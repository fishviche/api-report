const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  port: 5440,
  user: 'db-test-pg',
  password: 'a1c.13s1',
  database: 'testpg'
});
module.exports = {
  async query(text, params){
    const res = await pool.query(text, params);
    return res;
  }
}