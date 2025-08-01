const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function GetConnectionStatus() {
  return await pool
    .query("SELECT 1")
    .then(() => ({ status: "connected" }))
    .catch((err) => ({ status: "error", error: err.message }));
}

module.exports = { pool, GetConnectionStatus };
