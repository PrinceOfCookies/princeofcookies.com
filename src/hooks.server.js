// import { query } from '$lib/server/db';

// export async function handle({ event, resolve }) {
//   console.log('Middleware start:', event.url.pathname);

//   const timestamp = Math.floor(Date.now() / 1000);
//   const ip =
//     event.request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
//     event.getClientAddress() ||
//     'unknown';
//   const route = event.url.pathname;
//   const userAgent = event.request.headers.get('user-agent') || '';

//   try {
//     await query(
//       'INSERT INTO logs (timestamp, ip, route, useragent) VALUES (?, ?, ?, ?)',
//       [timestamp, ip, route, userAgent]
//     );
//     console.log('DB insert success');
//   } catch (e) {
//     console.error('DB insert error:', e);
//   }

//   console.log('Middleware end');
//   return await resolve(event);
// }
