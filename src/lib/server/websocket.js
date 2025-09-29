import { WebSocketServer } from "ws";

let wss = null;
let botStatus = "offline";
let refreshTimeout = null;

export function initWebSocket(server) {
  if (wss) {
    console.log("WebSocketServer already initialized.");
    return wss;
  }

  wss = new WebSocketServer({ server });
  const paths = ["/bhb"]; // Add more paths here if needed
  const allowedIPs = [process.env.NOVO_ALLOW_IP, "::1"];

  console.log("WebSocketServer initialized.");

  wss.on("connection", (ws, req) => {
    const path = req.url;
    const ip = (req.socket.remoteAddress || "").replace(/^::ffff:/, "");

    console.log(`New connection: path=${path}, ip=${ip}`);

    if (!paths.includes(path)) {
      console.log(`Connection rejected: Invalid path (${path})`);
      ws.close(1008, "Invalid path");
      return;
    }

    if (!allowedIPs.includes(ip)) {
      console.log(`Connection rejected: Unauthorized IP (${ip})`);
      ws.close(1008, "Unauthorized");
      return;
    }

    function setOfflineStatus() {
      if (botStatus !== "offline") {
        botStatus = "offline";
        console.log("Bot set offline");
      }
    }

    function refreshTime() {
      clearTimeout(refreshTimeout);
      refreshTimeout = setTimeout(setOfflineStatus, 10000);
      console.log("Bot status refresh timeout reset.");
    }

    ws.on("message", (message) => {
      const text = message.toString();
      console.log(`Received message: ${text}`);
      if (text === "ping") {
        if (botStatus !== "online") {
          botStatus = "online";
          console.log("Bot set online");
        }
      }
      refreshTime();
    });

    ws.on("close", () => {
      console.log("Connection closed.");
      clearTimeout(refreshTimeout);
      setOfflineStatus();
    });
  });

  return wss;
}

export function getBotStatus() {
  console.log(`getBotStatus called: ${botStatus}`);
  return botStatus;
}
