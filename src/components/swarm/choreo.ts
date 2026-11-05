// Per-task choreography. Each task gets one GSAP timeline that drives canvas
// marks, the agent's aim and cursor tool, and the element's temporary inline
// styles (opacity, clip-path, filter, neutral tint). No React, no layout writes
// beyond the draft-font overlay, which lives outside the page flow.
import { gsap } from "gsap";
import { COLORS } from "./palette";
import type { Renderer } from "./renderer";
import { keeps, measureText } from "./scan";
import type { Sim } from "./sim";
import { MK, TOOL, type Anim, type Box, type CharBox, type LineBox, type Mark, type MarkKind, type Run, type Task } from "./types";
import { DROP, INSP, INSP_H, TOOLBAR, WHEEL, dropH } from "./widgets";

export const EMPTY_CLIP = "polygon(0 0, 0 0, 0 0)";
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const DRAFT_COPY = [
  "font-size", "font-weight", "font-style", "letter-spacing", "word-spacing", "text-transform",
  "text-align", "text-indent", "font-kerning", "font-feature-settings", "white-space",
];

/** Everything a task timeline needs, bound to one run, task and agent. */
export interface Ctx {
  run: Run;
  t: Task;
  i: number;
  tl: gsap.core.Timeline;
  /** Duration scale for this section (<= 1). */
  s: number;
  color: string;
  sim: Sim;
  r: Renderer;
  sy: number;
  vw: number;
  vh: number;
  phone: boolean;
  dragTime: number;
  layer: HTMLElement | null;
  mark(k: MarkKind, p: Partial<Mark>): Mark;
  fx(a: Anim): void;
  /** Live-log line from this agent, timed from the section start. */
  log(what: string): void;
  /** Ignore section resizes for a while (a weight sweep reflows text). */
  quiet(seconds: number): void;
}

// ------------------------------------------------------------------ helpers

function aim(c: Ctx, x: number, y: number): void {
  c.sim.tx[c.i] = x;
  c.sim.ty[c.i] = y;
}

function tool(c: Ctx, t: number, follow: number): void {
  c.sim.tool[c.i] = t;
  c.sim.follow[c.i] = follow;
}

function wait(c: Ctx, d: number): void {
  c.tl.to({}, { duration: d });
}

/** Moves the agent to (x, y) as one step of the timeline. */
function step(c: Ctx, x: number, y: number, d: number, t: number = TOOL.arrow): void {
  c.tl.call(() => {
    tool(c, t, 16);
    aim(c, x, y);
  });
  wait(c, d);
}

export function click(c: Ctx, x: number, y: number): void {
  const m = c.mark(MK.ripple, { x, y });
  c.fx(gsap.to(m, { p: 1, duration: 0.38, ease: "power1.out", onComplete: () => void (m.dead = true) }));
}

export function flash(c: Pick<Ctx, "mark" | "fx">, b: Box): void {
  const m = c.mark(MK.flash, { x: b.x, y: b.y, w: b.w, h: b.h });
  c.fx(gsap.to(m, { a: 0, duration: 0.55, ease: "power1.out", onComplete: () => void (m.dead = true) }));
}

/** Top-left for a popover docked beside box b, kept inside the viewport. */
function dock(c: Ctx, b: Box, w: number, h: number): [number, number] {
  let x = b.x + b.w + 12;
  if (x + w > c.vw - 8) x = b.x - 12 - w;
  if (x < 8) x = clamp(b.x + b.w - w - 8, 8, c.vw - w - 8);
  const lo = Math.max(c.sy + 12, b.y - h + 16);
  const hi = Math.min(c.sy + c.vh - h - 12, b.y + Math.max(0, b.h - 16));
  return [x, hi >= lo ? clamp(b.y, lo, hi) : b.y];
}

/** Bounding box of text lines, in document coordinates. */
function textBox(b: Box, lines: LineBox[]): Box {
  let x = Infinity;
  let y = Infinity;
  let r = -Infinity;
  let bt = -Infinity;
  for (const l of lines) {
    x = Math.min(x, l.x);
    y = Math.min(y, l.y);
    r = Math.max(r, l.r);
    bt = Math.max(bt, l.b);
  }
  return { x: b.x + x, y: b.y + y, w: r - x, h: bt - y };
}

/** Clip showing every row above line L, and line L up to x = cx (local px). */
function stair(lines: LineBox[], L: number, cx: number, w: number, h: number): string {
  const P = 12;
  const top = L === 0 ? -P : (lines[L - 1].b + lines[L].y) / 2;
  const bot = L === lines.length - 1 ? h + P : (lines[L].b + lines[L + 1].y) / 2;
  const f = (v: number) => v.toFixed(1) + "px";
  return `polygon(${f(-P)} ${f(-P)}, ${f(w + P)} ${f(-P)}, ${f(w + P)} ${f(top)}, ${f(cx)} ${f(top)}, ${f(cx)} ${f(bot)}, ${f(-P)} ${f(bot)})`;
}

const rgbaCss = (a: number[], z: number[], q: number) =>
  `rgba(${Math.round(a[0] + (z[0] - a[0]) * q)},${Math.round(a[1] + (z[1] - a[1]) * q)},${Math.round(a[2] + (z[2] - a[2]) * q)},${(a[3] + (z[3] - a[3]) * q).toFixed(3)})`;

export const neutralCss = (t: Task) => rgbaCss(t.from4, t.from4, 0);

/** Where an image drag starts: data-build-from, else the nearest viewport edge. */
export function edgePoint(t: Task, sy: number, vw: number, vh: number): [number, number] {
  const b = t.box;
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  let e = t.from;
  if (!e) {
    const d = [cx, vw - cx, cy - sy, sy + vh - cy].map((v) => Math.max(0, v));
    e = (["left", "right", "top", "bottom"] as const)[d.indexOf(Math.min(...d))];
  }
  const y = clamp(cy, sy + 60, sy + vh - 60);
  const x = clamp(cx, 60, vw - 60);
  return e === "left" ? [10, y] : e === "right" ? [vw - 10, y] : e === "top" ? [x, sy + 10] : [x, sy + vh - 10];
}

/** Typing/reveal driver: advances a staircase clip on `target` behind a caret. */
function typer(c: Ctx, target: HTMLElement | null, lines: LineBox[], chars: CharBox[], typing: boolean, b: Box, caret: Mark): void {
  const n = typing ? chars.length : lines.length;
  const st = { v: 0 };
  let last = "";
  const paint = () => {
    let L = 0;
    let cx = lines[0].x;
    if (typing) {
      const k = Math.min(n, Math.floor(st.v));
      if (k > 0) {
        L = chars[k - 1].line;
        cx = chars[k - 1].x;
      }
    } else {
      const q = st.v * n;
      L = Math.min(n - 1, Math.floor(q));
      cx = lines[L].x + (lines[L].r - lines[L].x) * Math.min(1, q - L);
    }
    const ln = lines[L];
    caret.x = b.x + cx;
    caret.y = b.y + ln.y;
    caret.h = ln.b - ln.y;
    aim(c, caret.x + 2, caret.y + caret.h);
    if (!target) return;
    const end = typing ? st.v >= n : st.v >= 1;
    const clip = end ? "none" : typing && st.v < 1 ? EMPTY_CLIP : stair(lines, L, cx + 1, b.w, b.h);
    if (clip !== last) target.style.clipPath = last = clip;
  };
  paint();
  c.tl.to(st, {
    v: typing ? n : 1,
    duration: (typing ? clamp(n * 0.032, 0.2, 0.8) : clamp(n * 0.09, 0.28, 0.7)) * c.s,
    ease: typing ? "none" : "power1.inOut",
    onUpdate: paint,
  });
}

// -------------------------------------------------------------------- tasks

function frame(c: Ctx): void {
  const { t, tl, s } = c;
  const b = t.box;
  const f = c.mark(MK.frame, {
    x: b.x, y: b.y, w: b.w, h: b.h, label: t.label, r: t.inspect ? 0 : t.radius,
    x2: t.pad[0], y2: t.pad[1], w2: t.pad[2], h2: t.pad[3],
  });
  tool(c, TOOL.cross, 30);
  tl.to(f, { p: 1, duration: 0.42 * s, ease: "power2.inOut", onUpdate: () => aim(c, b.x + b.w * f.p, b.y + b.h * f.p) });
  if (t.inspect) inspector(c, f);
  if (!t.keep) tl.fromTo(t.el, { opacity: 0 }, { opacity: 1, duration: 0.24 * s, ease: "power1.out" }, t.inspect ? ">" : `-=${0.1 * s}`);
  tl.to(f, { a: 0.35, duration: 0.15 * s }, "<");
}

/** Inspector panel: drag radius/padding knobs; the outline follows. */
function inspector(c: Ctx, f: Mark): void {
  const { t, tl, s } = c;
  const b = t.box;
  const [px, py] = dock(c, b, INSP.w, INSP_H);
  const padMax = Math.max(...t.pad);
  const hasR = t.radius >= 1;
  const hasP = padMax >= 1;
  const rMax = Math.max(16, Math.ceil((t.radius * 1.6) / 4) * 4);
  const pMax = Math.max(24, Math.ceil((padMax * 1.6) / 4) * 4);
  const panel = c.mark(MK.inspector, {
    x: px, y: py, p: 0, u: 0, v: 0, s: hasR || hasP ? 1 : 0, w2: rMax, h2: pMax, label: t.label,
    img: c.r.inspectorSprite(t.label),
  });
  tl.to(panel, { p: 1, duration: 0.14 * s, ease: "power2.out" });
  const rowY = (k: number) => py + INSP.head + k * INSP.row + INSP.row / 2;
  const knobX = (q: number) => px + INSP.trackX + q * INSP.trackW;
  const slide = (k: number, key: "u" | "v" | "s", to: number, apply: (q: number) => void) => {
    step(c, knobX(panel[key]), rowY(k), 0.15 * s);
    tl.call(() => {
      tool(c, TOOL.slide, 34);
      click(c, knobX(panel[key]), rowY(k));
    });
    tl.to(panel, {
      [key]: to,
      duration: 0.34 * s,
      ease: "power2.inOut",
      onUpdate: () => {
        aim(c, knobX(panel[key]), rowY(k));
        apply(to > 0 ? panel[key] / to : 1);
      },
    });
  };
  if (hasR) slide(0, "u", t.radius / rMax, (q) => (f.r = t.radius * q));
  if (hasP) slide(1, "v", padMax / pMax, (q) => (f.u = q));
  if (!hasR && !hasP) slide(2, "s", 1, () => undefined);
  let bar: Mark | null = null;
  if (t.align >= 0 && b.w >= 560 && !c.phone) {
    // Wide frames: a tiny alignment toolbar under (or above) the panel.
    const below = py + INSP_H + 6;
    const ty = below + TOOLBAR.h < c.sy + c.vh - 8 ? below : py - TOOLBAR.h - 6;
    bar = c.mark(MK.toolbar, { x: px, y: ty, p: 0, u: -1, img: c.r.toolbarSprite() });
    const ix = px + 3 + t.align * TOOLBAR.icon + TOOLBAR.icon / 2;
    const iy = ty + TOOLBAR.h / 2;
    tl.to(bar, { p: 1, duration: 0.1 * s });
    step(c, ix, iy, 0.16 * s);
    const tb = bar;
    tl.call(() => {
      click(c, ix, iy);
      tb.u = t.align;
    });
    wait(c, 0.1 * s);
  }
  tl.call(() => tool(c, TOOL.arrow, 18));
  tl.to(bar ? [panel, bar] : panel, { p: 0, duration: 0.12 * s, ease: "power1.in" });
}

function typeText(c: Ctx): void {
  const { t, tl, s } = c;
  const typing = t.kind === "type";
  const caret = c.mark(MK.caret, { color: c.color });
  const box = typing ? c.mark(MK.box, { ...textBox(t.box, t.lines), label: t.label, a: 0.5, p: 1 }) : null;
  if (box) [box.x, box.y, box.w, box.h] = [box.x - 3, box.y - 2, box.w + 6, box.h + 4];
  const target = t.keep ? null : t.el;
  if (target) {
    target.style.opacity = "1";
    target.style.clipPath = EMPTY_CLIP;
  }
  tool(c, TOOL.beam, typing ? 28 : 14);
  typer(c, target, t.lines, t.chars, typing, t.box, caret);
  tl.to(box ? [caret, box] : caret, { a: 0, duration: 0.12 * s });
}

/** Clone of the element's text in the draft face, laid over its box (outside the flow). */
function makeDraft(c: Ctx): { node: HTMLElement; chars: CharBox[]; lines: LineBox[] } | null {
  const { t, layer } = c;
  if (!layer) return null;
  const el = t.el;
  const b = t.box;
  const cs = getComputedStyle(el);
  const lr = layer.getBoundingClientRect();
  const node = document.createElement("div");
  node.className = "swarm-draft";
  node.setAttribute("aria-hidden", "true");
  node.setAttribute("inert", "");
  const st = node.style;
  for (const p of DRAFT_COPY) st.setProperty(p, cs.getPropertyValue(p));
  const px = (v: string) => Number.parseFloat(v) || 0;
  const fs = px(cs.fontSize);
  if (cs.lineHeight !== "normal" && fs > 0) st.lineHeight = String(px(cs.lineHeight) / fs);
  st.left = `${b.x - lr.left}px`;
  st.top = `${b.y - (lr.top + window.scrollY)}px`;
  st.width = `${b.w}px`;
  st.height = `${b.h}px`;
  for (const side of ["Top", "Right", "Bottom", "Left"] as const) {
    st.setProperty(`padding-${side.toLowerCase()}`, `${px(cs[`padding${side}`]) + px(cs[`border${side}Width`])}px`);
  }
  st.color = cs.getPropertyValue("--bp-muted").trim() || COLORS.muted;
  for (const child of Array.from(el.childNodes)) node.appendChild(child.cloneNode(true));
  node.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
  layer.appendChild(node);
  // Mono runs wider than the real face: shrink until the draft fits the box.
  let size = fs;
  for (let k = 0; k < 4 && (node.scrollHeight > b.h + 1 || node.scrollWidth > b.w + 1); k++) {
    size *= Math.min(0.96, b.w / node.scrollWidth, Math.sqrt(b.h / node.scrollHeight));
    st.fontSize = `${size}px`;
  }
  st.clipPath = EMPTY_CLIP;
  const text = measureText(node, node.getBoundingClientRect());
  if (!text) {
    node.remove();
    return null;
  }
  return { node, ...text };
}

/** Type in a mono draft, pick the real font from a menu, cross-fade into the real text. */
function typeFont(c: Ctx): boolean {
  const { t, tl, s } = c;
  const draft = makeDraft(c);
  if (!draft) return false;
  c.run.nodes.push(draft.node);
  const b = t.box;
  const caret = c.mark(MK.caret, { color: c.color });
  const tb = textBox(b, draft.lines);
  const box = c.mark(MK.box, { x: tb.x - 3, y: tb.y - 2, w: tb.w + 6, h: tb.h + 4, label: t.label, a: 0.5, p: 1 });
  tool(c, TOOL.beam, 28);
  typer(c, draft.node, draft.lines, draft.chars, true, b, caret);
  tl.call(() => {
    caret.blink = true;
    tool(c, TOOL.arrow, 14);
    c.log(`typed ${t.logName}`);
  });
  wait(c, 0.22 * s);

  // Menu: the draft face, the real family and either a second family found in
  // the text (picked too) or a decoy.
  const two = !!t.fontName2;
  const rows = ["Geist Mono", t.fontName, two ? t.fontName2 : t.fontName === "Inter" ? "Geist" : "Inter"];
  const h = dropH(rows.length);
  let mx = tb.x + tb.w + 14;
  let my = tb.y;
  if (mx + DROP.w > c.vw - 8) [mx, my] = [clamp(tb.x, 8, c.vw - DROP.w - 8), tb.y + tb.h + 8];
  if (my + h > c.sy + c.vh - 8) my = Math.max(c.sy + 8, tb.y - h - 8);
  const menu = c.mark(MK.drop, { x: mx, y: my, p: 0, u: 0, v: 0, img: c.r.dropSprite(rows, 0b001) });
  const picked = c.r.dropSprite(rows, 0b010);
  const both = c.r.dropSprite(rows, 0b110);
  const rx = mx + DROP.w - 34;
  const ry = (k: number) => my + DROP.pad + k * DROP.row + DROP.row / 2;
  step(c, rx, ry(0), 0.16 * s);
  tl.call(() => click(c, rx, ry(0)));
  tl.to(menu, { p: 1, duration: 0.14 * s, ease: "power2.out" });
  tl.call(() => aim(c, rx, ry(1)));
  tl.to(menu, { u: 1, duration: 0.2 * s, ease: "power2.inOut" });
  tl.call(() => {
    click(c, rx, ry(1));
    menu.img = picked;
  });
  if (two) {
    tl.call(() => aim(c, rx, ry(2)));
    tl.to(menu, { u: 2, duration: 0.16 * s, ease: "power2.inOut" });
    tl.call(() => {
      click(c, rx, ry(2));
      menu.img = both;
    });
  }
  tl.call(() => c.log(`swapped font → ${t.fontName}${two ? ` + ${t.fontName2}` : ""}`));
  tl.to(menu, { p: 0, duration: 0.12 * s, delay: 0.1 * s, ease: "power1.in" });

  // Weight sweep (data-build-weight): the real text arrives light and gains
  // weight. Resizes are ignored meanwhile; the author's inline value returns.
  const el = t.el;
  const prev = el.style.fontWeight;
  const restore = () => {
    if (prev) el.style.fontWeight = prev;
    else el.style.removeProperty("font-weight");
  };
  const sweep = { w: 250 };
  const sweepDur = 0.55 * Math.max(0.7, s);
  if (t.sweep) {
    c.run.undo.push(restore);
    tl.call(() => {
      c.quiet(0.36 * s + sweepDur + 0.25);
      el.style.fontWeight = "250";
    });
  }

  // Morph: the draft blurs out while the real text (real font and color) blurs in.
  tl.call(() => void (caret.a = 0));
  tl.to(draft.node, { opacity: 0, filter: "blur(4px)", duration: 0.36 * s, ease: "power1.inOut" });
  tl.fromTo(t.el, { opacity: 0, filter: "blur(4px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.36 * s, ease: "power1.inOut" }, "<");
  tl.to(box, { a: 0, duration: 0.2 * s }, "<");
  tl.call(() => draft.node.remove());
  if (t.sweep) {
    tl.to(sweep, {
      w: t.weight,
      duration: sweepDur,
      ease: "power2.out",
      onUpdate: () => void (el.style.fontWeight = String(Math.round(sweep.w))),
    });
    tl.call(() => {
      restore();
      c.log(`weight 250 → ${t.weight}`);
    });
  }
  return true;
}

/** Legacy reveal for images that must stay visible: outline, then a scan line. */
function scanImage(c: Ctx): void {
  const { t, tl, s } = c;
  const b = t.box;
  const f = c.mark(MK.frame, { x: b.x, y: b.y, w: b.w, h: b.h, label: t.label, r: t.radius });
  const scan = c.mark(MK.scan, { x: b.x, y: b.y, w: b.w, h: b.h, a: 0 });
  tool(c, TOOL.cross, 30);
  tl.to(f, { p: 1, duration: 0.28 * s, ease: "power2.inOut", onUpdate: () => aim(c, b.x + b.w * f.p, b.y + b.h * f.p) });
  tl.call(() => void (scan.a = 1));
  tl.to(scan, { p: 1, duration: 0.4 * s, ease: "power1.inOut", onUpdate: () => aim(c, b.x + b.w + 3, b.y + b.h * scan.p) });
  tl.to(scan, { a: 0, duration: 0.12 * s });
  tl.to(f, { a: 0.35, duration: 0.15 * s }, "<");
}

/** Grab a card at the viewport edge, drag it in on a curve, drop it on the slot. */
function dragIn(c: Ctx): void {
  const { t, tl, sim, i } = c;
  const s = c.s * c.dragTime;
  const b = t.box;
  const x0 = sim.x[i];
  const y0 = sim.y[i];
  const cx = b.x + b.w / 2;
  const cy = b.y + b.h / 2;
  const s0 = c.phone ? 0.7 : 0.55;
  const card = c.mark(MK.card, {
    x: x0, y: y0, w: b.w, h: b.h, s: s0 * 0.8, a: 0,
    img: c.r.cardSprite(b.w, b.h, t.radius, t.img, t.alt, t.fit, t.pos),
  });
  const dx = cx - x0;
  const dy = cy - y0;
  const len = Math.hypot(dx, dy) || 1;
  const bend = (i % 2 ? 1 : -1) * Math.min(140, len * 0.2);
  const qx = (x0 + cx) / 2 - (dy / len) * bend;
  const qy = (y0 + cy) / 2 + (dx / len) * bend;
  const tilt = clamp(dx / 1400, -0.1, 0.1) + (bend > 0 ? 0.03 : -0.03);
  const st = { q: 0 };
  tool(c, TOOL.hand, 40);
  tl.call(() => click(c, x0, y0));
  tl.to(card, { a: 1, s: s0, duration: 0.1 * s, ease: "power2.out" });
  tl.to(st, {
    q: 1,
    duration: 0.6 * s,
    ease: "power2.inOut",
    onUpdate: () => {
      const q = st.q;
      const m = 1 - q;
      card.x = m * m * x0 + 2 * m * q * qx + q * q * cx;
      card.y = m * m * y0 + 2 * m * q * qy + q * q * cy;
      card.r = tilt * Math.sin(Math.PI * q);
      card.s = s0 + (1 - s0) * q;
      aim(c, card.x, card.y);
    },
  });
  tl.to(card, { s: 1.035, duration: 0.09 * s, ease: "power1.out" });
  tl.to(card, { s: 1, duration: 0.14 * s, ease: "power2.inOut" });
  tl.call(() => {
    click(c, cx, cy);
    tool(c, TOOL.arrow, 18);
  });
  if (!t.keep) tl.fromTo(t.el, { opacity: 0 }, { opacity: 1, duration: 0.22 * s }, "<");
  tl.to(card, { a: 0, duration: 0.24 * s }, "<");
}

/** Alt-drag ghost copies from the list master into each slot of the batch. */
function dup(c: Ctx, master: Box): void {
  const { t, tl, s, sim, i } = c;
  const mb = master;
  const n = t.slots.length;
  const per = 0.36 * s;
  const gap = Math.min(0.06, 0.3 / n) * s;
  tool(c, TOOL.hand, 26);
  sim.flag[i] = 1;
  t.slotBoxes.forEach((sb, gi) => {
    const g = c.mark(MK.ghost, { x: sb.x, y: sb.y, w: sb.w, h: sb.h, x2: mb.x, y2: mb.y, w2: mb.w, h2: mb.h, a: 0.9 });
    const at = gi * gap;
    const lead = gi === n - 1;
    const ax = mb.x + mb.w / 2;
    const ay = mb.y + mb.h / 2;
    const bx = sb.x + sb.w / 2;
    const by = sb.y + sb.h / 2;
    tl.to(g, {
      p: 1,
      duration: per,
      ease: "power2.inOut",
      onUpdate: lead ? () => aim(c, ax + (bx - ax) * g.p, ay + (by - ay) * g.p) : undefined,
    }, at);
    const slot = t.slots[gi];
    if (!keeps(slot, c.phone)) {
      tl.fromTo(slot, { opacity: 0 }, { opacity: 1, duration: 0.16 * s }, at + per * 0.8);
    }
    tl.to(g, { a: 0, duration: 0.14 * s }, at + per);
  });
}

/** Color wheel: hue ring, then the S/V square, then tween neutral -> real color. */
function colorPick(c: Ctx): void {
  const { t, tl, s } = c;
  const b = t.box;
  const [wx, wy] = dock(c, b, WHEEL.w, WHEEL.h);
  const [hue, sat, val] = t.hsv;
  const wheel = c.mark(MK.wheel, {
    x: wx, y: wy, p: 0, u: hue - 150, x2: 0.5, y2: 0.5, h2: 0, label: t.hex, color: t.hex,
    img: c.r.wheelSprite(),
  });
  const cx = wx + WHEEL.cx;
  const cy = wy + WHEEL.cy;
  const rm = (WHEEL.ro + WHEEL.ri) / 2;
  const ringX = () => cx + Math.cos(((wheel.u - 90) * Math.PI) / 180) * rm;
  const ringY = () => cy + Math.sin(((wheel.u - 90) * Math.PI) / 180) * rm;
  const sqX = () => cx - WHEEL.sq / 2 + wheel.x2 * WHEEL.sq;
  const sqY = () => cy - WHEEL.sq / 2 + (1 - wheel.y2) * WHEEL.sq;
  tool(c, TOOL.picker, 22);
  tl.call(() => flash(c, b));
  tl.to(wheel, { p: 1, duration: 0.14 * s, ease: "power2.out" });
  step(c, ringX(), ringY(), 0.14 * s, TOOL.picker);
  tl.call(() => {
    tool(c, TOOL.picker, 30);
    click(c, ringX(), ringY());
  });
  tl.to(wheel, { u: hue, duration: 0.42 * s, ease: "power2.inOut", onUpdate: () => aim(c, ringX(), ringY()) });
  tl.call(() => aim(c, sqX(), sqY()));
  wait(c, 0.12 * s);
  tl.to(wheel, { x2: sat, y2: val, duration: 0.26 * s, ease: "power2.inOut", onUpdate: () => aim(c, sqX(), sqY()) });
  tl.call(() => click(c, sqX(), sqY()));
  tl.to(wheel, { h2: 1, duration: 0.12 * s });
  const st = { q: 0 };
  const el = t.el;
  tl.to(st, {
    q: 1,
    duration: 0.34 * s,
    ease: "power1.inOut",
    onUpdate: () => el.style.setProperty(t.prop, rgbaCss(t.from4, t.to4, st.q)),
  });
  tl.to(wheel, { p: 0, duration: 0.12 * s, delay: 0.08 * s, ease: "power1.in" });
}

const plural = (s: string) => (/^[a-z]+$/i.test(s) && !s.endsWith("s") ? s + "s" : s);

/** Builds the task's timeline. */
export function choreograph(c: Ctx, master: Box | null): void {
  const t = c.t;
  let what = "";
  if (t.kind === "frame") {
    frame(c);
    what = t.inspect
      ? `tuned radius ${Math.round(t.radius)} · padding ${Math.round(Math.max(...t.pad))}`
      : `framed ${t.logName}`;
  } else if (t.kind === "image") {
    (t.drag ? dragIn : scanImage)(c);
    what = `${t.drag ? "dragged" : "scanned"} ${t.logName}`;
  } else if (t.kind === "dup") {
    dup(c, master ?? t.slotBoxes[0]);
    what = `dup ×${t.slots.length} ${t.slots.length === 1 ? t.label : plural(t.label)}`;
  } else if (t.kind === "color") {
    colorPick(c);
    what = `picked ${t.hex}`;
  } else if (!(t.kind === "type" && t.font && typeFont(c))) {
    typeText(c);
    what = `${t.kind === "type" ? "typed" : "revealed"} ${t.logName}`;
  }
  c.tl.call(() => {
    flash(c, t.box);
    if (what) c.log(what);
  });
}
