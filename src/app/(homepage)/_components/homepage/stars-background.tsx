// src/components/StarsBackground.tsx
"use client";

import { useMemo } from "react";

export default function StarsBackground() {
  const small = useMemo(() => genBoxShadow(400), []);
  const medium = useMemo(() => genBoxShadow(120), []);
  const large = useMemo(() => genBoxShadow(60), []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-background via-background to-muted/30">
      {/* small */}
      <div
        className="absolute inset-0 w-[1px] h-[1px] bg-transparent animate-star-sm"
        style={{ boxShadow: small }}
      />
      <div
        className="absolute inset-0 top-[2000px] w-[1px] h-[1px] bg-transparent animate-star-sm"
        style={{ boxShadow: small }}
      />

      {/* medium */}
      <div
        className="absolute inset-0 w-[2px] h-[2px] bg-transparent animate-star-md"
        style={{ boxShadow: medium }}
      />
      <div
        className="absolute inset-0 top-[2000px] w-[2px] h-[2px] bg-transparent animate-star-md"
        style={{ boxShadow: medium }}
      />

      {/* large */}
      <div
        className="absolute inset-0 w-[3px] h-[3px] bg-transparent animate-star-lg"
        style={{ boxShadow: large }}
      />
      <div
        className="absolute inset-0 top-[2000px] w-[3px] h-[3px] bg-transparent animate-star-lg"
        style={{ boxShadow: large }}
      />
    </div>
  );
}

export function genBoxShadow(count: number) {
  let shadows = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000) + "px";
    const y = Math.floor(Math.random() * 2000) + "px";
    shadows += `${x} ${y} hsl(var(--foreground) / 0.7)${i < count - 1 ? "," : ""}`;
  }
  return shadows;
}
