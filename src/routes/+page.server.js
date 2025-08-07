import { fetchSession } from "$lib/server/sessionHandler";
export function load({ cookies }) {
  const sessionID = cookies.get("session_id");
  const user = fetchSession(sessionID);

  return { user };
}