"use client";

/**
 * BuildLayer: agent-swarm "build the page" animation. Loaded lazily by
 * SwarmRoot (next/dynamic, ssr: false), so it never blocks first paint.
 * It plays for every visitor (including reduced-motion systems, by the site
 * owner's choice); the HUD always offers Skip, and ?build=off disables it.
 *
 * DOM contract
 * - Section: [data-build-section="name"]. Optional data-build-start="load"
 *   (build right after the engine starts; gets the larger hero budget) and
 *   data-build-plan="text" (planner tag; default "plan · N tasks").
 *   Items belong to their nearest section; items outside any section are
 *   shown immediately.
 * - Item: [data-build-item][data-build="<kind>"]
 *     frame   container/card: outline dragged corner to corner, then fades in.
 *             data-build-tune: always open the inspector panel (radius /
 *             padding knobs, read from computed style). Some leaf cards get
 *             it automatically on desktop/tablet; never on phones.
 *     type    short text (< ~90 chars): typed behind a caret via clip-path
 *             (no DOM/layout changes; long text falls back to reveal).
 *             data-build-font: type in a mono draft (an aria-hidden clone in
 *             an overlay layer), pick the real font from a menu, cross-fade.
 *             Phones: only the first such item on the page.
 *     reveal  text block/list: unmasked line by line.
 *     image   ghost card dragged in from the nearest viewport edge (or
 *             data-build-from="left|right|top|bottom") and dropped on the
 *             slot; uses the inner <img> as thumbnail, else a hatched
 *             placeholder with the alt/aria-label text. Kept images get the
 *             older outline + scan instead.
 *     dup     sibling inside a [data-build-list]; the list's first item is the
 *             master (mark it "frame"). Ghost copies fly from master to slot.
 *             In lists of 6+ items containing <img>, a few are dragged in
 *             individually as images.
 *   Any item: data-build-color="text|fill|stroke" -> after the item appears
 *   in a neutral color, a color wheel picks its real computed color (one per
 *   section on phones).
 *   Items nested inside another item wait for it. Optional:
 *   data-build-keep (never hidden, still annotated; ="mobile" only on the
 *   phone profile, below 768px), data-build-label (tag text),
 *   data-build-order="n", data-build-role="coder|designer|...".
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
  const layerRef = useRef<HTMLDivElement>(null);
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
        layer: layerRef.current,
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
      <div ref={layerRef} className="swarm-layer" aria-hidden="true" />
      <canvas ref={canvasRef} className="swarm-canvas" aria-hidden="true" />
      {director && status !== "off" ? <Hud controls={director} building={status === "building"} /> : null}
    </>
  );
}
