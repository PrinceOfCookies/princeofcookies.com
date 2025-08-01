import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function POST(req) {
  try {
    const { batch } = await req.json();
    if (!Array.isArray(batch) || batch.length === 0) {
      return new Response('No logs to insert', { status: 400 });
    }

    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      req.socket?.remoteAddress ||
      'unknown';

    if (!ip || ip == '::1') {
        return new Response('Invalid IP address', { status: 400 });
    }

    const values = batch.map(({ route, timestamp }) => [
      ip,
      req.headers.get('user-agent') || 'unknown',
      route,
      new Date(timestamp),
    ]);

    const sql = 'INSERT INTO logs (ip, useragent, route, timestamp) VALUES ?';

    await pool.query(sql, [values]);

    return new Response('Inserted batch', { status: 200 });
  } catch (error) {
    console.error('MySQL Insert Error:', error);
    return new Response('DB Insert Error: ' + error.message, { status: 500 });
  }
}
