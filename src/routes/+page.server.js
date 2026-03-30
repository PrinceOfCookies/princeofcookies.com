import { fetchSession } from "$lib/server/sessionHandler";

export async function load({ cookies, fetch }) {
  const sessionID = cookies.get("session_id");
  const user = fetchSession(sessionID);

  let githubStats = null;
  try {
    const res = await fetch('/api/v1/github/stats');
    if (res.ok) githubStats = await res.json();
  } catch {}

  return { user, githubStats };
}
