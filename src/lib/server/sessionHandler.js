import crypto from "node:crypto";

const sessionUsers = new Map();

export function setSession(userData, tokenGrantData) {
  const newSessionID = crypto.randomBytes(32).toString("hex");
  const fullUser = { ...userData, ...tokenGrantData };

  sessionUsers.set(newSessionID, fullUser);

  setTimeout(() => {
    sessionUsers.delete(newSessionID);
  }, 1000 * 60 * 60 * 12); // Session expires after 12 hours

  return newSessionID;
}

export function fetchSession(sessionID) {
  const session = sessionUsers.get(sessionID);

  if (session) {
    delete session.access_token;
    delete session.refresh_token;
    delete session.expires_in;
    delete session.scope;
    delete session.token_type;

    return s;
  }

  return null;
}

export function deleteSession(sessionID) {
  sessionUsers.delete(sessionID);
}
