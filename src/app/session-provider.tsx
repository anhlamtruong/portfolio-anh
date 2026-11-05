"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { isStandaloneRoute } from "@/services/theme/standalone-routes";

// The portfolio pages never read the session, so they skip the provider and
// its /api/auth/session request. Every other route gets it as before.
export function AppSessionProvider({ children }: { children: ReactNode }) {
  if (isStandaloneRoute(usePathname())) return <>{children}</>;
  return <SessionProvider>{children}</SessionProvider>;
}
