"use client";

import "lenis/dist/lenis.css";
import { useEffect, useRef, useState } from "react";
import type Lenis from "lenis";
import { ReactLenis, type LenisRef } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// syncTouch stays false: phones keep native touch scrolling.
const OPTIONS = { autoRaf: false, anchors: true, syncTouch: false };

/** Root Lenis instance driven by gsap.ticker. Not mounted under reduced motion. */
export function SmoothScroll() {
  const ref = useRef<LenisRef>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    let bound: Lenis | undefined;
    const raf = (time: number) => {
      const lenis = ref.current?.lenis;
      if (!lenis) return; // ReactLenis creates the instance after its first effect
      if (lenis !== bound) {
        bound?.off("scroll", ScrollTrigger.update);
        lenis.on("scroll", ScrollTrigger.update);
        bound = lenis;
      }
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(raf);
      bound?.off("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, [enabled]);

  return enabled ? <ReactLenis root options={OPTIONS} ref={ref} /> : null;
}
