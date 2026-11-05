"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * The two colored layers the glitch slices (see .fx-glitch in fx.css). They
 * are rendered only after hydration, so the static HTML (and search engines,
 * find-in-page, screen readers) see each heading once. Place it right after
 * the heading inside a `.fx-glitch` wrapper and give it the heading's
 * typography classes so the copies wrap exactly like the real text.
 */
export function GlitchCopies({ className = "", children }: { className?: string; children: ReactNode }) {
  const [on, setOn] = useState(false);
  useEffect(() => setOn(true), []);
  if (!on) return null;
  return (
    <>
      <span aria-hidden="true" className={`fx-glitch__copy fx-glitch__copy--a ${className}`}>
        {children}
      </span>
      <span aria-hidden="true" className={`fx-glitch__copy fx-glitch__copy--b ${className}`}>
        {children}
      </span>
    </>
  );
}
