import { pool } from "./sql.js";

export async function logRoute(ip, userAgent, route, timestamp) {
  try {
    await pool.query(
      "INSERT INTO logs (ip, useragent, route, timestamp) VALUES (?, ?, ?, ?)",
      [ip, userAgent, route, new Date(timestamp)]
    );
  } catch (err) {
    console.error("Failed to log route:", err);
  }
}
