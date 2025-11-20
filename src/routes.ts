/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  "/",
  "/links",
  "/auth/new-verification",
  "/creata",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to the privateRoutes
 * @type {string[]}
 */
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",

  "/auth/reset",
  "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The prefix for API publics routes
 * Routes that start with this prefix are used for API publics
 * @type {string}
 */
export const apiPublicPrefix = "/api/public";

/**
 * The prefix for API publics routes for TRPC
 * Routes that start with this prefix are used for API publics for TRPC
 * @type {string}
 */
export const apiTrpcPublicPrefix = "/api/trpc";

/**
 * The prefix for CLI login routes
 * Routes that start with this prefix are used for CLI
 * @type {string}
 */
export const authCLIRoutes = ["/auth/cli-login"];

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/";
