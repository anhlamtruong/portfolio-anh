"use client";

import { useEffect, useRef, useCallback, memo } from "react";

// ── Procedural pixel cityscape config ──
const INTERNAL_W = 384;
const INTERNAL_H = 216;
const STAR_COUNT = 120;
const BUILDING_COUNT_FAR = 18;
const BUILDING_COUNT_NEAR = 12;
const FPS_CAP = 30;

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
}

interface Building {
  x: number;
  width: number;
  height: number;
  color: string;
  windows: { wx: number; wy: number; lit: boolean }[];
}

function createStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * INTERNAL_W,
    y: Math.random() * INTERNAL_H * 0.55,
    size: Math.random() > 0.85 ? 2 : 1,
    brightness: 0.3 + Math.random() * 0.7,
    twinkleSpeed: 0.5 + Math.random() * 2,
    twinkleOffset: Math.random() * Math.PI * 2,
  }));
}

function createBuildings(
  count: number,
  minH: number,
  maxH: number,
  colors: string[],
  hasWindows: boolean,
): Building[] {
  const buildings: Building[] = [];
  let x = -20;
  for (let i = 0; i < count; i++) {
    const width = 14 + Math.floor(Math.random() * 22);
    const height = minH + Math.floor(Math.random() * (maxH - minH));
    const color = colors[Math.floor(Math.random() * colors.length)];
    const windows: Building["windows"] = [];
    if (hasWindows) {
      for (let wy = 4; wy < height - 4; wy += 6) {
        for (let wx = 3; wx < width - 3; wx += 5) {
          windows.push({ wx, wy, lit: Math.random() > 0.45 });
        }
      }
    }
    buildings.push({ x, width, height, color, windows });
    x += width + Math.floor(Math.random() * 8) - 2;
  }
  return buildings;
}

/**
 * PixiJS-free Canvas pixel cityscape background.
 * Renders at low internal resolution for authentic 8-bit look,
 * then scaled up via CSS image-rendering: pixelated.
 */
function PixelCityscapeInner({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>(createStars());
  const farBuildingsRef = useRef<Building[]>(
    createBuildings(
      BUILDING_COUNT_FAR,
      20,
      55,
      ["#1a1040", "#1e1250", "#251560", "#16103a"],
      false,
    ),
  );
  const nearBuildingsRef = useRef<Building[]>(
    createBuildings(
      BUILDING_COUNT_NEAR,
      35,
      90,
      ["#0d0d1a", "#141428", "#1a1a30"],
      true,
    ),
  );
  const animFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef(0);
  const scrollRef = useRef(scrollProgress);

  // Keep scrollRef in sync without re-creating draw
  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  const draw = useCallback(
    (time: number) => {
      // Don't render when tab is hidden
      if (document.hidden) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      // FPS cap
      const elapsed = time - lastFrameTimeRef.current;
      if (elapsed < 1000 / FPS_CAP) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }
      lastFrameTimeRef.current = time;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const W = INTERNAL_W;
      const H = INTERNAL_H;
      const currentScroll = scrollRef.current;

      // ── Sky gradient ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      skyGrad.addColorStop(0, "#05050f");
      skyGrad.addColorStop(0.4, "#0d0825");
      skyGrad.addColorStop(0.7, "#1a1040");
      skyGrad.addColorStop(1, "#2d1560");
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Stars ──
      const stars = starsRef.current;
      const timeSec = time / 1000;
      for (const star of stars) {
        const alpha =
          star.brightness *
          (0.5 +
            0.5 * Math.sin(timeSec * star.twinkleSpeed + star.twinkleOffset));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha.toFixed(2)})`;
        ctx.fillRect(
          Math.floor(star.x),
          Math.floor(star.y),
          star.size,
          star.size,
        );
      }

      // Parallax offsets
      const farOffset = currentScroll * 15;
      const nearOffset = currentScroll * 40;

      // ── Far buildings (silhouettes) ──
      const groundY = H * 0.65;
      for (const b of farBuildingsRef.current) {
        const bx = ((((b.x - farOffset) % (W + 40)) + W + 40) % (W + 40)) - 20;
        ctx.fillStyle = b.color;
        ctx.fillRect(
          Math.floor(bx),
          Math.floor(groundY - b.height),
          b.width,
          b.height + 40,
        );
      }

      // ── Ground strip ──
      ctx.fillStyle = "#0d0d1a";
      ctx.fillRect(
        0,
        Math.floor(groundY + 25),
        W,
        H - Math.floor(groundY + 25),
      );

      // ── Near buildings with windows ──
      const nearGroundY = H * 0.72;
      for (const b of nearBuildingsRef.current) {
        const bx = ((((b.x - nearOffset) % (W + 40)) + W + 40) % (W + 40)) - 20;
        const by = Math.floor(nearGroundY - b.height);
        ctx.fillStyle = b.color;
        ctx.fillRect(Math.floor(bx), by, b.width, b.height + 60);

        // Windows — deterministic flicker based on time + position
        for (const w of b.windows) {
          if (!w.lit) continue;
          const flicker = Math.sin(timeSec * 3 + w.wx * 7 + w.wy * 11) > 0.85;
          ctx.fillStyle = flicker ? "#ffcc00" : "#ffaa00";
          // Deterministic occasional dark window (replaces Math.random())
          const darkCycle =
            Math.sin(timeSec * 0.5 + w.wx * 13 + w.wy * 17) > 0.995;
          if (!darkCycle) {
            ctx.fillRect(Math.floor(bx + w.wx), by + w.wy, 3, 3);
          }
        }
      }

      // ── Foreground ground ──
      ctx.fillStyle = "#080812";
      ctx.fillRect(0, Math.floor(nearGroundY + 30), W, H);

      // ── Neon accent line at horizon ──
      ctx.fillStyle = "rgba(57, 255, 20, 0.15)";
      ctx.fillRect(0, Math.floor(nearGroundY + 28), W, 2);

      animFrameRef.current = requestAnimationFrame(draw);
    },
    [], // No deps — uses refs for mutable state
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = INTERNAL_W;
    canvas.height = INTERNAL_H;

    animFrameRef.current = requestAnimationFrame(draw);

    // Pause rAF when tab hidden, resume when visible
    const onVisibility = () => {
      if (!document.hidden) {
        lastFrameTimeRef.current = performance.now();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        imageRendering: "pixelated",
        width: "100%",
        height: "100%",
      }}
    />
  );
}

export const PixelCityscape = memo(PixelCityscapeInner);
