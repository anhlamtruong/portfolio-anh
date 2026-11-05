#!/usr/bin/env node
// Encode a HyperFrames render into the web files the site loads:
//   public/videos/<name>.mp4   H.264, no audio, fast start (Safari, fallback)
//   public/videos/<name>.webm  VP9, no audio (smaller, Chrome/Firefox/Edge)
//   public/videos/<name>.webp  poster = frame 0 (first paint, before playback)
//
// Usage: node video/encode.mjs <render.mp4> <name> [--width 1280] [--crf 26] [--webm-crf 38]
// FFmpeg comes from $FFMPEG or PATH.

import { spawnSync } from "node:child_process";
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const [input, name] = args.filter((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--"));
const flag = (key, fallback) => {
  const i = args.indexOf(`--${key}`);
  return i >= 0 ? args[i + 1] : fallback;
};

if (!input || !name) {
  console.error("Usage: node video/encode.mjs <render.mp4> <name> [--width 1280] [--crf 26] [--webm-crf 38]");
  process.exit(1);
}

const ffmpeg = process.env.FFMPEG || "ffmpeg";
const width = flag("width", "");
const crf = flag("crf", "26");
const webmCrf = flag("webm-crf", "38");

const here = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(here, "../public/videos");
mkdirSync(outDir, { recursive: true });

const scale = width ? ["-vf", `scale=${width}:-2:flags=lanczos`] : [];

function run(label, extra, out) {
  const res = spawnSync(ffmpeg, ["-y", "-hide_banner", "-loglevel", "error", "-i", input, ...extra, out], {
    stdio: "inherit",
  });
  if (res.status !== 0) {
    console.error(`${label} failed`);
    process.exit(res.status ?? 1);
  }
  const kb = (statSync(out).size / 1024).toFixed(0);
  console.log(`${label.padEnd(5)} ${path.relative(process.cwd(), out)}  ${kb} KB`);
}

run(
  "mp4",
  [...scale, "-an", "-c:v", "libx264", "-preset", "slow", "-crf", crf, "-pix_fmt", "yuv420p",
    "-profile:v", "high", "-movflags", "+faststart"],
  path.join(outDir, `${name}.mp4`),
);
run(
  "webm",
  [...scale, "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", webmCrf, "-row-mt", "1",
    "-deadline", "good", "-cpu-used", "1", "-pix_fmt", "yuv420p"],
  path.join(outDir, `${name}.webm`),
);
run(
  "webp",
  [...scale, "-frames:v", "1", "-c:v", "libwebp", "-quality", "80"],
  path.join(outDir, `${name}.webp`),
);
