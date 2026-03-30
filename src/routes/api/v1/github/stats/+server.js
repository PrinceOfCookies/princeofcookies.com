import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const USERNAME = 'PrinceOfCookies';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

let cacheTime = 0;

function buildHeaders() {
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'princeofcookies-portfolio',
    'X-GitHub-Api-Version': '2022-11-28'
  };
  if (env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${env.GITHUB_TOKEN}`;
  }
  return headers;
}

async function fetchStats() {
  const headers = buildHeaders();

  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
    fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`, { headers })
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API error: ${userRes.status} / ${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0);

  // Count repos by primary language (exclude forks)
  const langCount = {};
  for (const repo of repos) {
    if (!repo.fork && repo.language) {
      langCount[repo.language] = (langCount[repo.language] ?? 0) + 1;
    }
  }
  const totalLangRepos = Object.values(langCount).reduce((a, b) => a + b, 0);
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, count]) => ({
      name,
      percentage: Math.round((count / totalLangRepos) * 100)
    }));

  return {
    repos: user.public_repos,
    followers: user.followers,
    following: user.following,
    stars: totalStars,
    topLanguages
  };
}

export async function GET() {
  const now = Date.now();

  if (cache && now - cacheTime < CACHE_TTL) {
    return json(cache, { headers: { 'Cache-Control': 'public, max-age=3600' } });
  }

  try {
    const stats = await fetchStats();
    cache = stats;
    cacheTime = now;
    return json(stats, { headers: { 'Cache-Control': 'public, max-age=3600' } });
  } catch (err) {
    console.error('[github/stats]', err);
    // Serve stale cache rather than a hard error
    if (cache) {
      return json(cache, { headers: { 'Cache-Control': 'public, max-age=60' } });
    }
    return json({ error: 'Failed to fetch GitHub stats' }, { status: 502 });
  }
}
