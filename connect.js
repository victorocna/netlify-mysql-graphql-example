require("dotenv").config();
const mysql = require("mysql");

let cachedDbPool;
function getDbPool() {
  console.log({ cachedDbPool: !!cachedDbPool });
  if (!cachedDbPool) {
    cachedDbPool = mysql.createPool({
      connectionLimit: 1,
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
    });
  }
  return cachedDbPool;
}
const instance = getDbPool()

module.exports = instance;
