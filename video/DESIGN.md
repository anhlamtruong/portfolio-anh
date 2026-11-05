# Portfolio videos: shared design spec

Every video on lamanhtruong.com is a HyperFrames project in this folder,
rendered to MP4 and encoded into `public/videos/` by `encode.mjs`. They play
muted, looping, inline, inside the "blueprint" theme of the site, so they must
look like part of the page, not like ads dropped onto it.

## Look

- Ground `#07090d`. Panels `#0c1017`. Lines `#1c2431`, strong lines `#2a3546`.
- Text `#e8edf4`, muted `#8a97a8`, dim `#5b6676`.
- Accent (teal) `#5eead4`. Guide (amber) `#fbbf24`.
- Agent role colors (use them for nodes, packets, highlights):
  planner `#a78bfa`, coder `#34d399`, designer `#f472b6`, tester `#60a5fa`,
  reviewer `#fbbf24`, deployer `#fb923c`, layout `#a3e635`.
- Blueprint grid: 1 px lines `rgba(120,140,170,0.07)` every 96 px with a finer
  `rgba(120,140,170,0.035)` grid every 24 px (scale with the canvas).
- Panels: 1 px border `#2a3546`, radius 14 px (scaled), no drop shadows except a
  soft colored glow on "lit" things.
- Feel: precise, technical, calm motion with sharp moments. Thin lines, mono
  labels, small coordinate readouts, crosshairs, dimension lines.

## Type

Copy the shared fonts into each project's `assets/fonts/` and declare them:

```css
@font-face { font-family: "Geist"; src: url("assets/fonts/GeistVF.woff") format("woff"); font-weight: 100 900; }
@font-face { font-family: "Geist Mono"; src: url("assets/fonts/GeistMonoVF.woff") format("woff"); font-weight: 100 900; }
@font-face { font-family: "Instrument Serif"; src: url("assets/fonts/InstrumentSerif-Regular.woff2") format("woff2"); }
@font-face { font-family: "Instrument Serif"; font-style: italic; src: url("assets/fonts/InstrumentSerif-Italic.woff2") format("woff2"); }
```

- Headlines: Geist 600, tight tracking (-0.03em). Accent words: Instrument Serif italic.
- Labels, logs, numbers: Geist Mono 400-500, small, often uppercase or lowercase-mono.
- Text must stay readable at the size it plays on the page (see Sizes): body
  labels at least ~22 px on a 1280-wide canvas, headlines 64 px+.

## Motion rules

- Seamless loop: the last frame must flow into frame 0 with no jump. Design
  each video as a cycle (state at t = duration equals state at t = 0), or as a
  marquee that moves exactly one tile per loop.
- Frame 0 is the poster and the first thing people see: it must already look
  complete and attractive (never an empty grid that builds up).
- Eases: `power3.out` / `expo.out` for arrivals, `power2.inOut` for travel,
  `sine.inOut` for ambient drift. No bouncy elastic, no spin.
- Keep 1-3 focal motions at a time; ambient motion everywhere else is subtle.
- Deterministic only (HyperFrames contract): no Math.random without a seed,
  no Date.now, no timers, no `repeat: -1`.

## Banned (legal and taste)

These come from unlicensed sites we must not copy. Do not use any of them:
orbiting intros or things orbiting a center, a crowd that grows with speed,
flocking or agents gathering into a shape, heading font-size ticking up while
typing, a W×H size badge next to a cursor, any "built by N agents" line,
computing-pioneer names, offset-then-snap-to-guide moves. No mouse-cursor
sprites in the videos (the page already has its own cursors). No sound.
No real company logos other than plain text names.

## Sizes and outputs

| name | canvas | length | plays on page | budget (mp4) |
| --- | --- | --- | --- | --- |
| `showreel` | 1280×800 | 10 s | hero card, ~480 px wide | ≤ 1.5 MB |
| `proj-orchestrator` | 1280×800 | 6 s | featured project card, ~540 px | ≤ 800 KB |
| `proj-aihire` | 1280×800 | 6 s | featured project card | ≤ 800 KB |
| `proj-crushie` | 1280×800 | 6 s | featured project card | ≤ 900 KB |
| `proj-finhack` | 1280×800 | 6 s | featured project card | ≤ 900 KB |
| `band-pipeline` | 1920×320 | 8 s | full-width strip between Experience and Projects | ≤ 900 KB |
| `band-trace` | 1920×320 | 8 s | full-width strip between Projects and Skills | ≤ 900 KB |

Bands are cropped with `object-fit: cover` on phones (to about 640×320 in the
center), so keep their key content in the middle 640 px and make the sides
pure continuation.

All at 30 fps. The page shows them inside a 1 px bordered frame on the
`#07090d` ground, so do not add your own outer frame or rounded corners.

## Work loop

```bash
# in video/<name>/
npx hyperframes check --json        # fix every error
npx hyperframes snapshot --at 0,1.5,3,4.5   # look at frames (adjust times)
npx hyperframes render -q delivery -o renders/<name>.mp4
node ../encode.mjs renders/<name>.mp4 <name>   # writes public/videos/<name>.{mp4,webm,webp}
```

FFmpeg must be on PATH (or set `FFMPEG` / `FFPROBE`).
