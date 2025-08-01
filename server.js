const { createServer } = require("http");
const next = require("next");
const { parse } = require("url");
const port = 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      console.log(`Received request from ${req.headers["user-agent"]}`);
      const ismyBot = req.headers["user-agent"] === process.env.DISCORD_BOT_UA;
      if (!ismyBot) {
        const start = Date.now();
        res.on("finish", () => {
          const duration = Date.now() - start;
          console.log(`Request to ${req.url} took ${duration}ms`);
        });
      }

      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    });

    server.listen(port, (err) => {
      if (err) throw err;

      // Run Discord bot AFTER server and WebSocket are online
      require("./bot");

      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Next.js server preparation failed:", err);
    process.exit(1);
  });
