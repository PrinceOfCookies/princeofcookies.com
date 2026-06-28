export const SCP_SUBDOMAIN = "scp.princeofcookies.com";
export const SCP_ROUTE_PREFIX = "/scprp";
export const SCP_CHARACTER_SLUGS = ["benny-mcquail"];

export function isScpHostname(hostname) {
  return hostname === SCP_SUBDOMAIN;
}

export function isScpCharacterSlug(slug) {
  return SCP_CHARACTER_SLUGS.includes(slug);
}

export function getScpCharacterSlugFromPath(pathname) {
  const [, firstSegment = ""] = pathname.split("/");
  return isScpCharacterSlug(firstSegment) ? firstSegment : null;
}

export function getScpPathFromLegacyPath(pathname) {
  if (pathname === SCP_ROUTE_PREFIX) {
    return "/";
  }

  if (pathname.startsWith(`${SCP_ROUTE_PREFIX}/`)) {
    return pathname.slice(SCP_ROUTE_PREFIX.length);
  }

  return null;
}

export function getScpCharacterJsonPath(slug) {
  return `/assets/json/scprp/${slug}.json`;
}

export function buildScpUrl(url, pathname = url.pathname) {
  const target = new URL(url.href);
  target.hostname = SCP_SUBDOMAIN;
  target.pathname = pathname;
  return target;
}
