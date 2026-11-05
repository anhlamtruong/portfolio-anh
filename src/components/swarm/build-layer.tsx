"use client";

/**
 * BuildLayer: agent-swarm "build the page" animation. Loaded lazily by
 * SwarmRoot (next/dynamic, ssr: false), so it never blocks first paint.
 * It plays for every visitor (including reduced-motion systems, by the site
 * owner's choice); the HUD always offers Skip, and ?build=off disables it.
 *
 * DOM contract
 * - Section: [data-build-section="name"]. Optional data-build-start="load"
 *   (build right after the engine starts instead of on scroll) and
 *   data-build-plan="text" (planner tag; default "plan · N tasks").
 *   Items belong to their nearest section; items outside any section are
 *   shown immediately.
 * - Item: [data-build-item][data-build="<kind>"]
 *     frame   container/card: outline dragged corner to corner, then fades in.
 *     type    short text (< ~90 chars): typed behind a caret via clip-path
 *             (no DOM/layout changes; long text falls back to reveal).
 *     reveal  text block/list: unmasked line by line.
 *     image   outline, then a top-to-bottom scan.
 *     dup     sibling inside a [data-build-list]; the list's first item is the
 *             master (mark it "frame"). Ghost copies fly from master to slot.
 *   Items nested inside another item wait for it. Optional:
 *   data-build-keep (never hidden, still annotated), data-build-label (frame
 *   tag text), data-build-order="n", data-build-role="coder|designer|...".
 * - Hiding only applies under html[data-build="on"] (BuildFlagScript sets it
 *   before paint). Finished items and sections get [data-built].
 */
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { Director } from "./director";
import { Hud } from "./hud";
import { detectProfile } from "./palette";
import { offByUrl } from "./motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Status = "off" | "idle" | "building";
type SwarmWindow = Window & { __swarmReady?: boolean; __swarmLive?: number };

export default function BuildLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lenis = useLenis();
  const lenisRef = useRef(lenis);
  const [status, setStatus] = useState<Status>("off");
  const [director, setDirector] = useState<Director | null>(null);

  useEffect(() => {
    lenisRef.current = lenis;
  }, [lenis]);

  useGSAP(() => {
    const w = window as SwarmWindow;
    const root = document.documentElement;
    const canvas = canvasRef.current;
    w.__swarmReady = true; // disarms the head script's failsafe
    if (!canvas || offByUrl()) {
      root.removeAttribute("data-build");
      return;
    }

    let alive = true;
    let d: Director;
    try {
      d = new Director({
        canvas,
        profile: detectProfile(),
        getScroll: () => lenisRef.current?.animatedScroll ?? window.scrollY,
        onBusy: (busy) => alive && setStatus(busy ? "building" : "idle"),
      });
    } catch {
      root.removeAttribute("data-build");
      return;
    }
    w.__swarmLive = (w.__swarmLive ?? 0) + 1;
    setDirector(d);

    const begin = () => {
      if (!alive) return;
      try {
        d.start(root.dataset.build === "on");
        setStatus((s) => (s === "off" ? "idle" : s));
      } catch (err) {
        root.removeAttribute("data-build");
        console.error("[swarm]", err);
      }
    };
    // Measure only after web fonts settle (capped so content is never held hostage).
    Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]).then(begin, begin);

    return () => {
      alive = false;
      d.destroy();
      w.__swarmLive = (w.__swarmLive ?? 1) - 1;
      // A real unmount (not a StrictMode re-run) must never leave content hidden.
      setTimeout(() => {
        if (!w.__swarmLive) root.removeAttribute("data-build");
      }, 0);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="swarm-canvas" aria-hidden="true" />
      {director && status !== "off" ? <Hud controls={director} building={status === "building"} /> : null}
    </>
  );
}
