import { json } from "@sveltejs/kit";

let userCount = 0;
let bannedUsers = 0;
let commandsRan = 0;

export function GET() {
  return json({
    users: userCount,
    banned: bannedUsers,
    commands: commandsRan
  });
}

export async function POST({ request }) {
  const authHeader = request.headers.get("authorization");
  const validToken = process.env.SERVER_STATUS_TOKEN;

  if (!authHeader || authHeader !== `Bearer ${validToken}`) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const { type, amount } = await request.json();

  switch (type) {
    case "userCount":
      userCount = amount;
      break;
    case "bannedUsers":
      bannedUsers = amount;
      break;
    case "commandsRan":
      commandsRan = amount;
      break;
    default:
      return json({ error: "Invalid type" }, { status: 400 });
  }

  return json({ success: true });
}
