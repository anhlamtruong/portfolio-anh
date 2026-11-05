"use client";

import { useEffect, useRef } from "react";

export interface HudControls {
  skip(): void;
  replay(): void;
  /** The engine writes the counter text into this node (<= 10x/s). */
  setStatsTarget(el: HTMLElement | null): void;
}

/** Fixed bottom-left build controls. Collapses to one button when idle. */
export function Hud({ controls, building }: { controls: HudControls; building: boolean }) {
  const statsRef = useRef<HTMLSpanElement>(null);
  const replayRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    controls.setStatsTarget(building ? statsRef.current : null);
    return () => controls.setStatsTarget(null);
  }, [controls, building]);

  const skip = () => {
    const focused = document.activeElement;
    controls.skip();
    // Skip unmounts itself; keep keyboard focus inside the HUD.
    if (focused instanceof HTMLElement && focused.closest(".swarm-hud")) {
      requestAnimationFrame(() => replayRef.current?.focus());
    }
  };

  return (
    <div
      className="swarm-hud"
      data-state={building ? "building" : "idle"}
      role="group"
      aria-label="Page build animation"
    >
      {building ? (
        <>
          <span ref={statsRef} className="swarm-hud__stats" aria-live="off" />
          <button type="button" className="swarm-hud__btn" onClick={skip} aria-label="Skip build animation">
            Skip
          </button>
        </>
      ) : null}
      <button
        ref={replayRef}
        type="button"
        className="swarm-hud__btn"
        onClick={() => controls.replay()}
        aria-label={building ? "Replay build animation" : undefined}
      >
        {building ? "Replay" : "replay build"}
      </button>
    </div>
  );
}
