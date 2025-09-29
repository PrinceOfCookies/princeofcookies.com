import express from "express";
import http from "http";
import { handler } from "./build/handler.js";
import { initWebSocket } from "./build/lib/server/websocket.js";

const app = express();
const server = http.createServer(app);

app.use(handler);

initWebSocket(server);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`✅ Server listening on http://localhost:${port}`);
});
