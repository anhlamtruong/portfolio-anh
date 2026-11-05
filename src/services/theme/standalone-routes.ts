// Pages with their own fixed design (the portfolio homepage and /links).
// They are rendered on the server and must not wait for the theme engine,
// and the 8-bit layout mode does not apply to them.
const STANDALONE_ROUTES = new Set(["/", "/links"]);

export function isStandaloneRoute(pathname: string | null): boolean {
  return pathname !== null && STANDALONE_ROUTES.has(pathname);
}
