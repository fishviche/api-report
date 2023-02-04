const { Pool } = require('pg');
const { db } = require('../config/config.js');
const pool = new Pool(db);
module.exports = {
  async query(text, params){
    const res = await pool.query(text, params);
    return res;
  }
}