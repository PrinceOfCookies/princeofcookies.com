// bot.js
const {
  Client,
  GatewayIntentBits,
  REST,
  Routes,
  SlashCommandBuilder,
} = require("discord.js");
const os = require("os");
const { GetConnectionStatus, pool } = require("./app/components/sql");

const client = new Client({ intents: [GatewayIntentBits.DirectMessages] });

let lastStatus = 200;
let lastAlertTime = 0;
const rateLimit = 5 * 60 * 1000; // 5 minutes

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  // Register slash command after client is ready
  const commands = [
    new SlashCommandBuilder()
      .setName("serverstatus")
      .setDescription("Get current server health status"),
  ].map((command) => command.toJSON());

  const rest = new REST({ version: "10" }).setToken(
    process.env.DISCORD_BOT_TOKEN
  );

  try {
    await rest.put(Routes.applicationCommands(client.user.id), {
      body: commands,
    });
    console.log("Slash command registered");
  } catch (error) {
    console.error("Failed to register slash command:", error);
  }

  initDatabase()
    .then(() => startMonitoring())
    .catch((err) => {
      console.error("Failed to initialize database connection:", err);
    });
});

// Handle interaction events to respond to slash command
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "serverstatus") {
    await interaction.deferReply();

    const { status, metrics, dbStatus, timestamp, error } =
      await checkServerHealth();

    if (error) {
      return interaction.editReply(`Error checking server status: ${error}`);
    }

    const formattedMessage = formatStatusMessage(
      status,
      metrics,
      dbStatus,
      timestamp
    );

    await interaction.editReply(`**Server Status:**\n${formattedMessage}`);
  }
});

async function initDatabase() {
  const createServerHealthTable = `
  CREATE TABLE IF NOT EXISTS server_health_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    timestamp BIGINT NOT NULL,
    status VARCHAR(10) NOT NULL,
    memory_rss BIGINT,
    heap_used BIGINT,
    db_status VARCHAR(20),
    db_error TEXT
  )
`;

  const createDailyMetricsTable = `
  CREATE TABLE IF NOT EXISTS daily_metrics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    max_heap_used BIGINT
  )
`;

  await pool.query(createServerHealthTable);
  await pool.query(createDailyMetricsTable);
}

async function logServerHealth(entry) {
  const serverHealthQuery = `INSERT INTO server_health_logs 
    (timestamp, status, memory_rss, heap_used, db_status, db_error)
    VALUES (?, ?, ?, ?, ?, ?)`;

  pool
    .query(serverHealthQuery, [
      entry.timestamp,
      entry.status.toString(),
      entry.metrics?.memory.rss || null,
      entry.metrics?.memory.heapUsed || null,
      entry.dbStatus.status,
      entry.dbStatus.error || null,
    ])
    .catch((err) => {
      console.error("Failed to log server health:", err);
    });
}

async function updateDailyMetrics() {
  const [rows] = await pool.query(`
    SELECT
      DATE(FROM_UNIXTIME(timestamp)) as date,
      MAX(heap_used) AS max_heap_used
    FROM server_health_logs
    WHERE timestamp >= UNIX_TIMESTAMP(CURDATE())
    GROUP BY DATE(FROM_UNIXTIME(timestamp))
  `);

  if (!rows.length) {
    return;
  }

  const { date, max_heap_used } = rows[0];

  await pool.query(
    `INSERT INTO daily_metrics (date, max_heap_used)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE
       max_heap_used = VALUES(max_heap_used)`,
    [date, max_heap_used]
  );
}

function canSendAlert() {
  const now = Date.now();
  if (now - lastAlertTime < rateLimit) return false;
  lastAlertTime = now;
  return true;
}

function formatStatusMessage(status, metrics, dbStatus, timestamp) {
  return (
    `Alert: server status is ${status} at <t:${timestamp}>\n` +
    `Memory RSS: ${(metrics.memory.rss / 1024 / 1024).toFixed(2)} MB\n` +
    `Heap Used: ${(metrics.memory.heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
    `DB Status: ${dbStatus.status}${
      dbStatus.error ? `, Error: ${dbStatus.error}` : ""
    }`
  );
}

async function checkServerHealth() {
  const timestamp = Math.floor(Date.now() / 1000);
  let status = 0;
  let httpError = null;

  try {
    const response = await fetch("http://localhost:3000", {
      method: "GET",
      headers: { "User-Agent": process.env.DISCORD_BOT_UA },
    });
    status = response.status;
  } catch (err) {
    status = "error";
    httpError = err.message;
  }

  const memory = process.memoryUsage();
  const totalMem = os.totalmem();
  const uptime = process.uptime();
  const dbStatus = await GetConnectionStatus();

  const formatMB = (val) => Math.round(val / 1024 / 1024);
  const percent = (used) => ((used / totalMem) * 100).toFixed(2);

  const metrics = {
    memory: {
      rss: formatMB(memory.rss),
      heapUsed: formatMB(memory.heapUsed),
      heapTotal: formatMB(memory.heapTotal),
      rssPercent: percent(memory.rss),
      heapUsedPercent: percent(memory.heapUsed),
    },
    uptime: Math.floor(uptime),
  };

  return {
    status,
    metrics,
    dbStatus,
    timestamp,
    error: httpError,
  };
}

function formatStatusMessage(status, metrics, dbStatus, timestamp) {
  return (
    `Alert: server status is ${status} at <t:${timestamp}>\n` +
    `Memory RSS: ${metrics.memory.rss}MB (${metrics.memory.rssPercent}%)\n` +
    `Heap Used: ${metrics.memory.heapUsed}MB (${metrics.memory.heapUsedPercent}%)\n` +
    `DB Status: ${dbStatus.status}${
      dbStatus.error ? `, Error: ${dbStatus.error}` : ""
    }`
  );
}

async function startMonitoring() {
  setInterval(async () => {
    const { status, metrics, dbStatus, timestamp, error } =
      await checkServerHealth();

    if (status !== lastStatus) {
      lastStatus = status;

      if (status !== 200 || dbStatus.status !== "connected") {
        if (canSendAlert()) {
          const user = await client.users.fetch("698793333178368040");
          const msg = error
            ? `Alert: Server error at <t:${timestamp}>: ${error}`
            : formatStatusMessage(status, metrics, dbStatus, timestamp);
          user?.send(msg);
        }
      } else if (
        status === 200 &&
        dbStatus.status === "connected" &&
        canSendAlert()
      ) {
        const user = await client.users.fetch("698793333178368040");
        user?.send(`Server recovered and is healthy at <t:${timestamp}>`);
      }
    }
  }, 5000);
}

setInterval(async () => {
  const { status, metrics, dbStatus, timestamp, error } =
    await checkServerHealth();
  await logServerHealth({ status, metrics, dbStatus, timestamp, error });
  await updateDailyMetrics();
}, 30 * 60 * 1000); // every 30 minutes

client.login(process.env.DISCORD_BOT_TOKEN).catch((err) => {
  console.error("Failed to login to Discord:", err);
});
