"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2 } from "lucide-react";
import { isStandaloneRoute } from "./standalone-routes";

/**
 * Wrapper component that shows a loading spinner until the theme is mounted.
 * Prevents flash of unstyled content (FOUC).
 * Standalone pages render immediately so their server HTML is never hidden.
 */
export function ThemeLoader({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const standalone = isStandaloneRoute(usePathname());

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted && !standalone) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}
