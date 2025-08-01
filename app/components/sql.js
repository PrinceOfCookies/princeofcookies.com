import mysql from "mysql2/promise";

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GetConnectionStatus() {
  return await pool
    .query("SELECT 1")
    .then(() => ({ status: "connected" }))
    .catch((err) => ({ status: "error", error: err.message }));
}
