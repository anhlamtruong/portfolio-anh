// Imports
// ========================================================
import { NextResponse } from "next/server";
import { auth } from "@/auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  apiPublicPrefix,
} from "./routes";

const corsOptions: {
  allowedMethods: string[];
  allowedOrigins: string[];
  allowedHeaders: string[];
  exposedHeaders: string[];
  maxAge?: number;
  credentials: boolean;
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || "").split(","),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || "").split(","),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || "").split(","),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
  maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined, // 60 * 60 * 24 * 30, // 30 days
  credentials: process.env?.CREDENTIALS == "true",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req: any) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiPublicPrefix = nextUrl.pathname.startsWith(apiPublicPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoutes) {
    return null;
  }
  if (isApiAuthRoute) {
    return null;
  }
  if (isApiPublicPrefix) {
    // Response
    const response = NextResponse.next();
    // Allowed origins check
    const origin = req.headers.get("origin") ?? "";
    if (
      corsOptions.allowedOrigins.includes("*") ||
      corsOptions.allowedOrigins.includes(origin)
    ) {
      response.headers.set("Access-Control-Allow-Origin", origin);
    }
    // Set default CORS headers
    response.headers.set(
      "Access-Control-Allow-Credentials",
      corsOptions.credentials.toString()
    );
    response.headers.set(
      "Access-Control-Allow-Methods",
      corsOptions.allowedMethods.join(",")
    );
    response.headers.set(
      "Access-Control-Allow-Headers",
      corsOptions.allowedHeaders.join(",")
    );
    response.headers.set(
      "Access-Control-Expose-Headers",
      corsOptions.exposedHeaders.join(",")
    );
    response.headers.set(
      "Access-Control-Max-Age",
      corsOptions.maxAge?.toString() ?? ""
    );

    // Return
    return response;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  if (!isLoggedIn && !isPublicRoutes) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);

    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
