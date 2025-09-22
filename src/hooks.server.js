import { fetchSession } from "$lib/server/sessionHandler";
import { initWebSocket } from "$lib/server/websocket";
import { redirect, error } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  const sessionID = event.cookies.get("session_id");
  event.locals.user = fetchSession(sessionID);

  if (event.url.pathname.startsWith("/dash")) {
    const user = event.locals.user;

    if (!user) throw redirect(302, "/");
    if (user.id !== "698793333178368040") throw error(401, "Unauthorized");
  }

  if (event.platform?.httpServer) {
    initWebSocket(event.platform.httpServer);
  }
  return await resolve(event);
};
