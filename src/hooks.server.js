// hooks.server.js
import { fetchSession } from "$lib/server/sessionHandler";
import {
  buildScpUrl,
  getScpCharacterSlugFromPath,
  getScpPathFromLegacyPath,
  isScpHostname,
} from "$lib/scp-routing";
import { redirect, error } from "@sveltejs/kit";

export const handle = async ({ event, resolve }) => {
  const sessionID = event.cookies.get("session_id");
  event.locals.user = fetchSession(sessionID);
  event.locals.isScpHost = isScpHostname(event.url.hostname);

  const legacyScpPath = getScpPathFromLegacyPath(event.url.pathname);
  if (legacyScpPath !== null) {
    throw redirect(308, buildScpUrl(event.url, legacyScpPath).toString());
  }

  const scpCharacterSlug = getScpCharacterSlugFromPath(event.url.pathname);
  if (!event.locals.isScpHost && scpCharacterSlug) {
    throw redirect(308, buildScpUrl(event.url).toString());
  }

  if (event.url.pathname.startsWith("/dash")) {
    const user = event.locals.user;

    if (!user) throw redirect(302, "/");
    if (user.id !== "698793333178368040") throw error(401, "Unauthorized");
  }

  return await resolve(event);
};
