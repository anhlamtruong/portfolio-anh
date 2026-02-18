"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CrtWrapperProps {
  children: ReactNode;
  className?: string;
  enableScanlines?: boolean;
  enableVignette?: boolean;
  enableGlow?: boolean;
}

/**
 * CRT Wrapper — applies scanline overlay, vignette, and pixel font
 * to children when rendered inside the 8-bit layout mode.
 */
export function CrtWrapper({
  children,
  className,
  enableScanlines = true,
  enableVignette = true,
}: CrtWrapperProps) {
  return (
    <div
      className={cn(
        "relative",
        enableScanlines && "crt-scanlines",
        enableVignette && "crt-vignette",
        className,
      )}
      style={{ fontFamily: "var(--font-pixel), var(--font-vt323), monospace" }}
    >
      {children}
    </div>
  );
}
