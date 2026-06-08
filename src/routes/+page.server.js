import { fetchSession } from "$lib/server/sessionHandler";
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

export async function load({ cookies, fetch }) {
  const sessionID = cookies.get("session_id");
  const user = fetchSession(sessionID);

  let githubStats = null;
  try {
    const res = await fetch("/api/v1/github/stats");
    if (res.ok) {
      githubStats = await res.json();
    }
  } catch {}

  const projectData = await loadProjects();

  return {
    user,
    githubStats,
    favoriteProjects: projectData.favoriteProjects ?? [],
    projects: projectData.projects ?? []
  };
}
