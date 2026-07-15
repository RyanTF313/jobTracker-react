const KNOWN_USERS_KEY = "jobTracker_known_users";

export function readKnownUsers(): string[] {
  try {
    const knownRaw = localStorage.getItem(KNOWN_USERS_KEY);
    if (!knownRaw) return [];
    const known: unknown = JSON.parse(knownRaw);
    return Array.isArray(known)
      ? known.filter((u): u is string => typeof u === "string")
      : [];
  } catch {
    return [];
  }
}

export function rememberKnownUser(username: string): void {
  try {
    const known = readKnownUsers();
    if (!known.includes(username)) {
      localStorage.setItem(
        KNOWN_USERS_KEY,
        JSON.stringify([...known, username]),
      );
    }
  } catch {
    // Ignore storage write failures.
  }
}
