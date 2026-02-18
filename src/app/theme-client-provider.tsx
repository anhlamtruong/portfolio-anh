"use client";

import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeLoader, ThemeProvider } from "@/services/theme";
import { PixelTransition } from "./(homepage)/_components/8bit/pixel-transition";

export function ThemeClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NuqsAdapter>
      <ThemeProvider>
        <ThemeLoader>
          <PixelTransition>{children}</PixelTransition>
        </ThemeLoader>
      </ThemeProvider>
    </NuqsAdapter>
  );
}
