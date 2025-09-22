import { WebSocketServer } from "ws";

let wss = null;
let botStatus = "offline";
let refreshTimeout = null;

export function initWebSocket(server) {
  if (wss) return wss;

  wss = new WebSocketServer({ server });
  const paths = ["/bhb"]; // Add more paths here if needed
  const allowedIPs = [process.env.NOVO_ALLOW_IP, "::1"];

  wss.on("connection", (ws, req) => {
    const path = req.url;
    const ip = (req.socket.remoteAddress || "").replace(/^::ffff:/, "");

    if (!paths.includes(path)) {
      ws.close(1008, "Invalid path");
      return;
    }

    if (!allowedIPs.includes(ip)) {
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
    }

    ws.on("message", (message) => {
      const text = message.toString();
      if (text === "ping") {
        if (botStatus !== "online") {
          botStatus = "online";
          console.log("Bot set online");
        }
      }
      refreshTime();
    });

    ws.on("close", () => {
      clearTimeout(refreshTimeout);
      setOfflineStatus();
    });
  });

  return wss;
}

export function getBotStatus() {
  return botStatus;
}
