// When the build animation may play.
// - ?build=off always disables it.
// - ?build=force, or a visitor who pressed "watch the agents build" this
//   session, plays it even when the system asks for reduced motion.
// - Otherwise it follows prefers-reduced-motion.

export const OPT_IN_KEY = "swarm-motion-optin";

const OFF_RE = /[?&]build=off(&|$)/;
const FORCE_RE = /[?&]build=force(&|$)/;

export function offByUrl(): boolean {
  return OFF_RE.test(window.location.search);
}

export function forcedByUser(): boolean {
  if (FORCE_RE.test(window.location.search)) return true;
  try {
    return sessionStorage.getItem(OPT_IN_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberOptIn(): void {
  try {
    sessionStorage.setItem(OPT_IN_KEY, "1");
  } catch {
    // Private mode: the opt-in just lasts for this page view.
  }
}
