"use client";

import { useEffect, useRef, useState } from "react";
import { createAurora } from "./aurora";
import "./fx.css";

/**
 * WebGL "liquid light" behind the hero. Mount it as the first child of the
 * hero <section> (which is position: relative). It fades in once the hero is
 * built (or right away when the build engine is off), only renders while the
 * hero is on screen, and renders nothing when WebGL is unavailable.
 */
export function HeroShader() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const scope =
      canvas.closest<HTMLElement>("[data-build-section]") ?? canvas.parentElement ?? document.body;
    let aurora: ReturnType<typeof createAurora> = null;
    try {
      aurora = createAurora(canvas, scope);
    } catch {
      aurora = null;
    }
    if (!aurora) {
      setFailed(true);
      return;
    }
    return () => aurora?.destroy();
  }, []);

  if (failed) return null;
  return <canvas ref={ref} className="fx-shader" aria-hidden="true" />;
}
