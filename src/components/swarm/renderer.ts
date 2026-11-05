// Canvas overlay: one fixed full-viewport canvas, drawn in document space with
// a scroll-offset transform. Agent cursors and text pills are cached sprites.
import { COLORS, monoFamily } from "./palette";
import type { Sim } from "./sim";
import { MK, type Mark } from "./types";

interface Sprite {
  c: HTMLCanvasElement;
  w: number;
  h: number;
}

type PillStyle = "tag" | "plan" | "badge";
const PILLS: Record<PillStyle, { size: number; fg: string; bg: string; stroke: string | null }> = {
  tag: { size: 9, fg: COLORS.accent, bg: COLORS.panel, stroke: null },
  plan: { size: 10, fg: COLORS.guide, bg: COLORS.panel, stroke: COLORS.guide },
  badge: { size: 11, fg: COLORS.ink, bg: COLORS.accent, stroke: null },
};
const SCAN_TOP = "rgba(94,234,212,0)";
const SCAN_BOTTOM = "rgba(94,234,212,0.2)";

function roundRect(g: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly dprCap: number;
  private readonly colors: string[];
  private readonly labels: string[];
  private readonly family: string;
  private dpr = 0;
  private vw = 0;
  private vh = 0;
  private dirty = true;
  private shown = false;
  private agents: (Sprite | undefined)[] = [];
  private pills = new Map<string, Sprite>();

  constructor(canvas: HTMLCanvasElement, dprCap: number, colors: string[], labels: string[]) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("swarm: 2d canvas unavailable");
    this.canvas = canvas;
    this.ctx = ctx;
    this.dprCap = dprCap;
    this.colors = colors;
    this.labels = labels;
    this.family = monoFamily();
    this.dpr = Math.min(window.devicePixelRatio || 1, dprCap);
  }

  invalidate(): void {
    this.dirty = true;
  }

  show(): void {
    if (this.shown) return;
    this.shown = true;
    this.canvas.style.visibility = "visible";
  }

  /** Clears and releases the backing store; nothing is drawn while hidden. */
  hide(): void {
    this.shown = false;
    this.canvas.style.visibility = "hidden";
    this.canvas.width = this.canvas.height = 0;
    this.dirty = true;
  }

  pillSize(text: string, style: PillStyle): { w: number; h: number } {
    const s = this.pill(text, style);
    return { w: s.w, h: s.h };
  }

  draw(sim: Sim, marks: Mark[], sy: number): void {
    if (this.dirty) this.fit();
    const { ctx, dpr, vw, vh } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, -sy * dpr);
    const top = sy - 80;
    const bottom = sy + vh + 80;

    let keep = 0;
    for (let r = 0; r < marks.length; r++) {
      const m = marks[r];
      if (m.dead) continue;
      marks[keep++] = m;
      if (m.a <= 0.003) continue;
      const alt = m.k === MK.guide ? m.y2 : m.k === MK.ghost ? m.y2 : m.y;
      const altB = m.k === MK.guide ? m.y2 : m.k === MK.ghost ? m.y2 + m.h2 : m.y;
      if (Math.max(m.y + m.h, altB) < top || Math.min(m.y, alt) > bottom) continue;
      this.mark(m);
    }
    marks.length = keep;

    ctx.globalAlpha = 1;
    for (let i = 0; i < sim.n; i++) {
      if (!sim.on[i]) continue;
      const x = sim.x[i];
      const y = sim.y[i];
      if (y < top || y > bottom || x < -60 || x > vw + 60) continue;
      const s = this.agent(i);
      ctx.drawImage(s.c, x - 2, y - 2, s.w, s.h);
      if (sim.flag[i] & 1) {
        // "copy" marker while alt-dragging a duplicate
        ctx.fillStyle = COLORS.accent;
        ctx.beginPath();
        ctx.arc(x + 17, y + 3, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = COLORS.ink;
        ctx.fillRect(x + 14.5, y + 2.4, 5, 1.2);
        ctx.fillRect(x + 16.4, y + 0.5, 1.2, 5);
      }
    }
  }

  private fit(): void {
    const dpr = Math.min(window.devicePixelRatio || 1, this.dprCap);
    if (dpr !== this.dpr) {
      this.dpr = dpr;
      this.pills.clear();
      this.agents = [];
    }
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.canvas.width = Math.round(this.vw * dpr);
    this.canvas.height = Math.round(this.vh * dpr);
    this.dirty = false;
  }

  private sprite(w: number, h: number, paint: (g: CanvasRenderingContext2D) => void): Sprite {
    const c = document.createElement("canvas");
    c.width = Math.ceil(w * this.dpr);
    c.height = Math.ceil(h * this.dpr);
    const g = c.getContext("2d");
    if (g) {
      g.scale(this.dpr, this.dpr);
      paint(g);
    }
    return { c, w, h };
  }

  private pill(text: string, style: PillStyle): Sprite {
    const key = style + "|" + text;
    const hit = this.pills.get(key);
    if (hit) return hit;
    const st = PILLS[style];
    const font = `500 ${st.size}px ${this.family}`;
    this.ctx.font = font;
    const w = Math.ceil(this.ctx.measureText(text).width + 12);
    const h = st.size + 7;
    const s = this.sprite(w, h, (g) => {
      roundRect(g, 0.5, 0.5, w - 1, h - 1, style === "tag" ? 3 : (h - 1) / 2);
      g.fillStyle = st.bg;
      g.fill();
      if (st.stroke) {
        g.strokeStyle = st.stroke;
        g.stroke();
      }
      g.font = font;
      g.fillStyle = st.fg;
      g.textBaseline = "middle";
      g.fillText(text, 6, h / 2 + 0.5);
    });
    this.pills.set(key, s);
    return s;
  }

  /** Cursor glyph (a notched dart, tip at the origin) plus the agent's name pill. */
  private agent(i: number): Sprite {
    const hit = this.agents[i];
    if (hit) return hit;
    const color = this.colors[i];
    const label = this.labels[i];
    const font = `500 10px ${this.family}`;
    this.ctx.font = font;
    const pw = Math.ceil(this.ctx.measureText(label).width + 12);
    const px = 12;
    const py = 14;
    const ph = 16;
    const s = this.sprite(px + pw + 4, py + ph + 4, (g) => {
      g.translate(2, 2);
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(13, 5);
      g.lineTo(7.2, 7.2);
      g.lineTo(5, 13);
      g.closePath();
      g.fillStyle = color;
      g.fill();
      g.lineJoin = "round";
      g.lineWidth = 1.25;
      g.strokeStyle = COLORS.ink;
      g.stroke();
      roundRect(g, px, py, pw, ph, ph / 2);
      g.fillStyle = color;
      g.fill();
      g.font = font;
      g.fillStyle = COLORS.ink;
      g.textBaseline = "middle";
      g.fillText(label, px + 6, py + ph / 2 + 0.5);
    });
    this.agents[i] = s;
    return s;
  }

  private handle(x: number, y: number): void {
    this.ctx.fillRect(x - 2.5, y - 2.5, 5, 5);
    this.ctx.strokeRect(x - 2.5, y - 2.5, 5, 5);
  }

  private mark(m: Mark): void {
    const ctx = this.ctx;
    ctx.globalAlpha = m.a;
    ctx.strokeStyle = m.color;
    ctx.fillStyle = m.color;
    ctx.lineWidth = 1;
    switch (m.k) {
      case MK.guide: {
        ctx.globalAlpha = m.a * 0.6;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(m.x + 0.5, m.y + 0.5);
        ctx.lineTo(m.x + (m.x2 - m.x) * m.p + 0.5, m.y + (m.y2 - m.y) * m.p + 0.5);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      }
      case MK.frame:
      case MK.box: {
        const w = m.w * m.p;
        const h = m.h * m.p;
        ctx.strokeRect(m.x + 0.5, m.y + 0.5, w, h);
        if (m.k === MK.frame && m.p > 0.02) {
          ctx.fillStyle = COLORS.bg;
          this.handle(m.x, m.y);
          this.handle(m.x + w, m.y);
          this.handle(m.x, m.y + h);
          this.handle(m.x + w, m.y + h);
        }
        if (m.label) {
          const s = this.pill(m.label, "tag");
          ctx.drawImage(s.c, m.x, m.y - s.h - 4, s.w, s.h);
        }
        break;
      }
      case MK.ghost: {
        const t = m.p;
        const x = m.x2 + (m.x - m.x2) * t;
        const y = m.y2 + (m.y - m.y2) * t;
        const w = m.w2 + (m.w - m.w2) * t;
        const h = m.h2 + (m.h - m.h2) * t;
        ctx.globalAlpha = m.a * 0.08;
        ctx.fillRect(x, y, w, h);
        ctx.globalAlpha = m.a;
        ctx.setLineDash([4, 3]);
        ctx.strokeRect(x + 0.5, y + 0.5, w, h);
        ctx.setLineDash([]);
        break;
      }
      case MK.scan: {
        const yy = m.y + m.h * m.p;
        const band = Math.min(20, yy - m.y);
        if (band > 0) {
          const g = ctx.createLinearGradient(0, yy - band, 0, yy);
          g.addColorStop(0, SCAN_TOP);
          g.addColorStop(1, SCAN_BOTTOM);
          ctx.fillStyle = g;
          ctx.fillRect(m.x, yy - band, m.w, band);
          ctx.fillStyle = m.color;
        }
        ctx.fillRect(m.x, yy - 1, m.w, 1.5);
        break;
      }
      case MK.caret:
        ctx.fillRect(m.x, m.y, 2, m.h);
        break;
      case MK.tag: {
        const s = this.pill(m.label, "plan");
        ctx.drawImage(s.c, m.x, m.y - (1 - m.p) * 10, s.w, s.h);
        break;
      }
      case MK.badge: {
        const s = this.pill(m.label, "badge");
        const w = s.w * m.s;
        const h = s.h * m.s;
        ctx.drawImage(s.c, m.x + (s.w - w) / 2, m.y + (s.h - h) / 2, w, h);
        break;
      }
      case MK.outline: {
        // Two strokes leave the top-left corner and meet at the bottom-right.
        const d = (m.w + m.h) * m.p;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x + Math.min(d, m.w), m.y);
        if (d > m.w) ctx.lineTo(m.x + m.w, m.y + Math.min(d - m.w, m.h));
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x, m.y + Math.min(d, m.h));
        if (d > m.h) ctx.lineTo(m.x + Math.min(d - m.h, m.w), m.y + m.h);
        ctx.stroke();
        break;
      }
    }
  }
}
