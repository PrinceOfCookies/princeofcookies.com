import { json } from "@sveltejs/kit";

let botStatus = false; // boolean for clarity
let timeoutId = null;

export function GET() {
  return json({ online: botStatus });
}

export async function POST({ request }) {
  const authHeader = request.headers.get("authorization");
  const validToken = process.env.SERVER_STATUS_TOKEN;

  if (!authHeader || authHeader !== `Bearer ${validToken}`) {
    return json({ error: "Unauthorized" }, { status: 401 });
  }

  const { status } = await request.json();

  botStatus = status;

  if (timeoutId) clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    botStatus = false;
  }, 20000);

  return json({ online: botStatus });
}
