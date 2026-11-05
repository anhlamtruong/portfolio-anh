"use client";

import { useEffect, useRef } from "react";
import { setupGlitch } from "./glitch";
import { setupHolo } from "./holo";
import { setupScramble } from "./scramble";
import { setupSpotlight } from "./spotlight";
import "./fx.css";

/**
 * Page-wide effects for the homepage, mounted once inside .bp-root:
 * hologram cards, grid spotlight, glitch headings, scramble links.
 * (The hero shader is separate: <HeroShader /> inside the hero section.)
 * Renders only the spotlight layer; everything else is event-driven and
 * attaches to markup that is already on the page.
 */
export function FxRoot() {
  const spotRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanups: (() => void)[] = [];
    const add = (setup: () => () => void) => {
      try {
        cleanups.push(setup());
      } catch (err) {
        if (process.env.NODE_ENV !== "production") console.error("[fx]", err);
      }
    };
    add(setupHolo);
    add(setupGlitch);
    add(setupScramble);
    const spot = spotRef.current;
    const grid = gridRef.current;
    if (spot && grid) add(() => setupSpotlight(spot, grid));
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div ref={spotRef} className="fx-spot" aria-hidden="true">
      <div ref={gridRef} className="fx-spot__grid" />
    </div>
  );
}
