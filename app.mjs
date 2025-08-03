import { handler } from './build/handler.js';
import http from 'http';

const port = process.env.PORT || 3001;

const server = http.createServer(handler);

server.listen(port, () => {
  console.log(`SvelteKit running on port ${port}`);
});
