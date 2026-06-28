import { fetchSession } from "$lib/server/sessionHandler";
import { isScpHostname } from "$lib/scp-routing";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const PROJECTS_PATH = resolve("static/assets/json/proj.json");

let projectsCache = null;

async function loadProjects() {
  if (projectsCache) {
    return projectsCache;
  }

  const raw = await readFile(PROJECTS_PATH, "utf8");
  projectsCache = JSON.parse(raw);
  return projectsCache;
}

export async function load({ cookies, fetch, url }) {
  const sessionID = cookies.get("session_id");
  const user = fetchSession(sessionID);
  const isScpHost = isScpHostname(url.hostname);

  if (isScpHost) {
    return {
      isScpHost,
      user,
      githubStats: null,
      favoriteProjects: [],
      projects: []
    };
  }

  let githubStats = null;
  try {
    const res = await fetch("/api/v1/github/stats");
    if (res.ok) {
      githubStats = await res.json();
    }
  } catch {}

  const projectData = await loadProjects();

  return {
    isScpHost,
    user,
    githubStats,
    favoriteProjects: projectData.favoriteProjects ?? [],
    projects: projectData.projects ?? []
  };
}
