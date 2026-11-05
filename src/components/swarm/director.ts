// Scheduling: section lifecycle (plan -> build -> review), task claiming,
// per-item GSAP timelines, and the single gsap.ticker loop that steps the
// simulation and draws the overlay. Nothing here touches React state per frame.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COLORS, ROLE_COLOR, ROLE_PREFS, SESSION_KEY } from "./palette";
import { Renderer } from "./renderer";
import { measureSection, scanPage } from "./scan";
import { Sim } from "./sim";
import {
  MK,
  TASK_CLAIMED,
  TASK_DONE,
  TASK_PENDING,
  TASK_RUNNING,
  type LineBox,
  type Mark,
  type MarkKind,
  type Profile,
  type Role,
  type SectionModel,
  type Task,
} from "./types";

gsap.registerPlugin(ScrollTrigger);

// Agent modes.
const OFF = 0;
const IDLE = 1;
const TRAVEL = 2;
const WORK = 3;
const EXIT = 4;
// Section phases.
const WAIT = 0;
const PLAN = 1;
const BUILD = 2;
const REVIEW = 3;
const DONE = 4;

const EMPTY_CLIP = "polygon(0 0, 0 0, 0 0)";
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

type Anim = gsap.core.Animation;

interface Run {
  m: SectionModel;
  phase: number;
  t0: number;
  deadline: number;
  /** Duration multiplier for this section's tasks (<= 1). */
  scale: number;
  speedMul: number;
  joinGate: number;
  stagger: number;
  flushed: boolean;
  marks: Mark[];
  anims: Anim[];
  st: ScrollTrigger | null;
}

interface Brain {
  mode: number;
  run: Run | null;
  task: Task | null;
  hx: number;
  hy: number;
  until: number;
  go: ((i: number) => void) | null;
}

export interface DirectorOptions {
  canvas: HTMLCanvasElement;
  profile: Profile;
  /** Current vertical scroll (Lenis when present, else window.scrollY). */
  getScroll: () => number;
  /** Called when building starts/stops (rare; safe to set React state). */
  onBusy: (busy: boolean) => void;
}

function clearInline(el: HTMLElement): void {
  el.style.removeProperty("opacity");
  el.style.removeProperty("clip-path");
  if (el.getAttribute("style") === "") el.removeAttribute("style");
}

function markBuilt(el: HTMLElement): void {
  el.setAttribute("data-built", "");
  clearInline(el);
}

/** Clip showing every row above line L, and line L up to x = cx (local px). */
function stair(lines: LineBox[], L: number, cx: number, w: number, h: number): string {
  const P = 12;
  const top = L === 0 ? -P : (lines[L - 1].b + lines[L].y) / 2;
  const bot = L === lines.length - 1 ? h + P : (lines[L].b + lines[L + 1].y) / 2;
  const r = w + P;
  const f = (v: number) => v.toFixed(1) + "px";
  return `polygon(${f(-P)} ${f(-P)}, ${f(r)} ${f(-P)}, ${f(r)} ${f(top)}, ${f(cx)} ${f(top)}, ${f(cx)} ${f(bot)}, ${f(-P)} ${f(bot)})`;
}

export class Director {
  readonly agentCount: number;
  private readonly o: DirectorOptions;
  private readonly B: number;
  private readonly sim: Sim;
  private readonly renderer: Renderer;
  private readonly roles: Role[];
  private readonly brains: Brain[];
  private readonly workers: number[] = [];
  private readonly planner: number;
  private readonly reviewer: number;
  private runs: Run[] = [];
  private byEl = new Map<Element, Run>();
  private marks: Mark[] = [];
  private fx: Anim[] = [];
  private clock = 0;
  private elapsed = 0;
  private sy = 0;
  private vw = 0;
  private vh = 0;
  private ticking = false;
  private hidden = false;
  private busy = false;
  private alive = true;
  private exitDown: boolean | null = null;
  private statsEl: HTMLElement | null = null;
  private statsAt = -1;
  private ro: ResizeObserver | null = null;
  private roSeen = new WeakSet<Element>();
  private roFrame = 0;

  constructor(o: DirectorOptions) {
    this.o = o;
    this.B = o.profile.budget;
    this.roles = o.profile.roles;
    this.agentCount = this.roles.length;
    this.sim = new Sim(this.roles.length);
    this.renderer = new Renderer(
      o.canvas,
      o.profile.dprCap,
      this.roles.map((r) => ROLE_COLOR[r]),
      o.profile.labels,
    );
    this.brains = this.roles.map(() => ({ mode: OFF, run: null, task: null, hx: 0, hy: 0, until: 0, go: null }));
    this.planner = this.roles.indexOf("planner");
    this.reviewer = this.roles.indexOf("reviewer");
    this.roles.forEach((r, i) => r !== "planner" && r !== "reviewer" && this.workers.push(i));
  }

  // ---------------------------------------------------------------- public

  /** Scan the page and arm triggers. `active` = the html build flag is on. */
  start(active: boolean): void {
    const { sections, orphans } = scanPage(this.workers.length);
    orphans.forEach(markBuilt);
    this.runs = sections.map((m) => ({
      m, phase: WAIT, t0: 0, deadline: 0, scale: 1, speedMul: 1, joinGate: 0,
      stagger: 0.12, flushed: false, marks: [], anims: [], st: null,
    }));
    this.runs.forEach((r) => this.byEl.set(r.m.el, r));
    document.addEventListener("focusin", this.onFocus);
    document.addEventListener("visibilitychange", this.onVisibility);
    window.addEventListener("resize", this.onResize);
    this.ro = new ResizeObserver(this.onSectionResize);
    this.runs.forEach((r) => this.ro?.observe(r.m.el));
    if (!active) {
      for (const r of this.runs) {
        r.phase = DONE;
        r.m.tasks.forEach((t) => (t.state = TASK_DONE));
      }
      this.o.onBusy(false);
      return;
    }
    this.arm(true);
  }

  /** Finish every section immediately. */
  skip(): void {
    this.runs.forEach((r) => this.finish(r, true));
  }

  /** Reset every section and rebuild the ones in view; re-arm the rest. */
  replay(): void {
    if (!this.alive) return;
    for (const run of this.runs) {
      run.st?.kill();
      run.st = null;
      run.anims.forEach((a) => a.kill());
      run.anims = [];
      run.marks = [];
      run.phase = WAIT;
      run.flushed = false;
      for (const t of run.m.tasks) {
        t.state = TASK_PENDING;
        t.agent = -1;
        for (const el of [...t.slots, ...t.absorbed]) {
          el.removeAttribute("data-built");
          clearInline(el);
        }
      }
      run.m.el.removeAttribute("data-built");
    }
    this.marks.forEach((m) => gsap.killTweensOf(m));
    this.marks.length = 0;
    this.fx.forEach((a) => a.kill());
    this.fx = [];
    this.brains.forEach((b, i) => (b.mode === TRAVEL || b.mode === WORK) && this.release(i));
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {}
    document.documentElement.dataset.build = "on";
    this.elapsed = 0;
    this.setBusy();
    this.arm(false);
  }

  setStatsTarget(el: HTMLElement | null): void {
    this.statsEl = el;
    this.writeStats(true);
  }

  destroy(): void {
    this.alive = false;
    gsap.ticker.remove(this.tick);
    this.ticking = false;
    cancelAnimationFrame(this.roFrame);
    this.ro?.disconnect();
    document.removeEventListener("focusin", this.onFocus);
    document.removeEventListener("visibilitychange", this.onVisibility);
    window.removeEventListener("resize", this.onResize);
    for (const run of this.runs) {
      run.st?.kill();
      run.anims.forEach((a) => a.kill());
      for (const t of run.m.tasks) [...t.slots, ...t.absorbed].forEach(clearInline);
    }
    this.marks.forEach((m) => gsap.killTweensOf(m));
    this.fx.forEach((a) => a.kill());
    this.renderer.hide();
  }

  // ------------------------------------------------------------ lifecycle

  private arm(initial: boolean): void {
    this.readView();
    for (const run of this.runs) {
      if (run.phase !== WAIT) continue;
      const r = run.m.el.getBoundingClientRect();
      if ((initial && run.m.onLoad) || (r.top < this.vh * 0.78 && r.bottom > 0)) this.request(run);
      else if (r.bottom <= 0) this.finish(run, true);
      else {
        run.st = ScrollTrigger.create({
          trigger: run.m.el,
          start: "top 78%",
          once: true,
          onEnter: () => this.request(run),
        });
      }
    }
  }

  private request(run: Run): void {
    if (!this.alive || run.phase !== WAIT) return;
    run.st?.kill();
    run.st = null;
    this.readView();
    const m = run.m;
    measureSection(m);
    for (const t of m.tasks) if (t.box.w < 1 || t.box.h < 1) this.taskDone(run, t);
    const open = m.tasks.filter((t) => t.state !== TASK_DONE);
    if (!open.length || m.box.y + m.box.h <= this.sy) return this.finish(run, true);

    run.phase = PLAN;
    run.t0 = this.clock;
    run.flushed = false;
    this.estimate(run, open);
    this.spawn(run, open.length);
    this.ensureTicking();
    const p = this.brains[this.planner];
    const g = m.guides[0];
    if (p.mode === OFF || p.mode === IDLE || p.mode === EXIT) {
      this.send(this.planner, run, g.x1, g.y1, 0.08 * this.B, (i) => this.plan(run, i), null);
    } else this.plan(run, -1);
    this.setBusy();
  }

  /** Picks a duration scale so the section fits the time budget. */
  private estimate(run: Run, open: Task[]): void {
    const tasks = run.m.tasks;
    const cost = (t: Task) =>
      t.kind === "frame" ? 0.56
      : t.kind === "image" ? 0.8
      : t.kind === "type" ? clamp(t.chars.length * 0.032, 0.2, 0.8) + 0.12
      : t.kind === "reveal" ? clamp(t.lines.length * 0.09, 0.28, 0.7) + 0.1
      : 0.52 + Math.min(0.06, 0.3 / t.slots.length) * (t.slots.length - 1);
    const memo = new Map<number, number>();
    const path = (t: Task): number => {
      const hit = memo.get(t.id);
      if (hit !== undefined) return hit;
      memo.set(t.id, 0);
      let longest = 0;
      for (const d of t.deps) if (tasks[d].state !== TASK_DONE) longest = Math.max(longest, path(tasks[d]));
      const v = cost(t) + 0.14 + longest;
      memo.set(t.id, v);
      return v;
    };
    let sum = 0;
    let cp = 0;
    for (const t of open) {
      sum += cost(t) + 0.14;
      cp = Math.max(cp, path(t));
    }
    const W = 0.52 * this.B;
    const crew = this.crew(open.length);
    run.scale = clamp(W / Math.max(sum / crew, cp), 0.25, 1);
    run.speedMul = clamp(1 / run.scale, 1, 2.2);
    run.stagger = clamp((0.5 * W) / crew, 0.08, 0.18);
  }

  /** Workers worth bringing in for n open tasks. */
  private crew(n: number): number {
    return clamp(Math.ceil(n / 1.5), Math.min(2, this.workers.length), this.workers.length);
  }

  /** Brings enough agents into view for this section. */
  private spawn(run: Run, nOpen: number): void {
    const { sy, vh, vw } = this;
    const s = this.sim;
    const m = run.m;
    const L = m.guides[1].x1;
    const R = m.guides[2].x1;
    const restY = Math.min(m.box.y + m.box.h, sy + vh) - 48;
    const wanted = this.crew(nOpen);
    const far = (i: number) => s.y[i] < sy - vh * 0.6 || s.y[i] > sy + vh * 1.6;
    let active = this.workers.filter((i) => this.brains[i].mode !== OFF && this.brains[i].mode !== EXIT).length;
    let k = 0;
    for (const i of this.workers) {
      const b = this.brains[i];
      if (b.mode !== OFF && b.mode !== EXIT) continue;
      if (active >= wanted) break;
      active++;
      if (b.mode === OFF || far(i)) s.place(i, L + Math.random() * (R - L), sy + vh + 30 + Math.random() * 80);
      s.on[i] = 1;
      b.mode = IDLE;
      b.run = null;
      s.speed[i] = this.o.profile.speed * run.speedMul;
      b.hx = L + ((k++ + 0.5) / wanted) * (R - L);
      b.hy = restY - Math.random() * 30;
    }
    const edgeY = (y: number) => clamp(y, sy + 40, sy + vh - 40);
    for (const [i, x, y] of [
      [this.planner, -30, edgeY(m.tagY)],
      [this.reviewer, vw + 30, edgeY(m.box.y + 40)],
    ] as const) {
      const b = this.brains[i];
      if (b.mode === TRAVEL || b.mode === WORK) continue;
      if (b.mode === OFF || far(i)) s.place(i, x, y);
      s.on[i] = 1;
      if (b.mode === OFF || b.mode === EXIT) {
        b.mode = IDLE;
        b.hx = s.x[i];
        b.hy = s.y[i];
        s.speed[i] = this.o.profile.speed;
      }
    }
  }

  private plan(run: Run, i: number): void {
    if (run.phase !== PLAN) return this.free(i, run, null);
    const B = this.B;
    const m = run.m;
    const guides = m.guides.map((g) =>
      this.mark(run, MK.guide, { x: g.x1, y: g.y1, x2: g.x2, y2: g.y2, color: COLORS.guide }),
    );
    const label = m.planLabel ?? `plan · ${m.tasks.length} task${m.tasks.length === 1 ? "" : "s"}`;
    const tag = this.mark(run, MK.tag, { x: m.tagX, y: m.tagY, label, a: 0 });
    const tl = this.anim(run, gsap.timeline({ onComplete: () => this.free(i, run, null) }));
    guides.forEach((g, gi) => tl.to(g, { p: 1, duration: 0.1 * B, ease: "power2.out" }, gi * 0.022 * B));
    tl.to(tag, { a: 1, p: 1, duration: 0.07 * B, ease: "back.out(2)" }, 0.03 * B);
    tl.call(() => this.beginBuild(run), undefined, tl.duration() * 0.7);
    if (i >= 0) {
      const g = guides[0];
      this.sim.follow[i] = 18;
      tl.eventCallback("onUpdate", () => this.aim(i, g.x + (g.x2 - g.x) * g.p, g.y));
    }
  }

  private beginBuild(run: Run): void {
    if (run.phase !== PLAN) return;
    run.phase = BUILD;
    run.deadline = this.clock + 0.52 * this.B;
    run.joinGate = this.clock;
  }

  /** Over budget: speed up running tasks and fade in everything unclaimed. */
  private flush(run: Run): void {
    run.flushed = true;
    run.anims.forEach((a) => a.timeScale(5));
    const els: HTMLElement[] = [];
    for (const t of run.m.tasks) {
      if (t.state !== TASK_PENDING && t.state !== TASK_CLAIMED) continue;
      if (t.agent >= 0 && this.brains[t.agent].task === t) this.release(t.agent);
      t.agent = -1;
      t.state = TASK_DONE;
      t.absorbed.forEach(markBuilt);
      for (const el of t.slots) {
        if (el.hasAttribute("data-build-keep")) markBuilt(el);
        else els.push(el);
      }
    }
    if (els.length) {
      this.anim(run, gsap.fromTo(els, { opacity: 0 }, {
        opacity: 1,
        duration: 0.2,
        stagger: Math.min(0.015, 0.25 / els.length),
        onComplete: () => els.forEach(markBuilt),
      }));
    }
  }

  private review(run: Run): void {
    run.phase = REVIEW;
    const i = this.reviewer;
    const b = this.brains[i];
    const box = run.m.box;
    if (b.mode === TRAVEL || b.mode === WORK) return this.inspect(run, -1);
    const y = clamp(this.sy + 18, box.y + 4, box.y + box.h - 4);
    if (b.mode === OFF) this.sim.place(i, this.vw + 30, y);
    this.send(i, run, box.x + 4, y, 0.06 * this.B, (ai) => this.inspect(run, ai), null);
  }

  private inspect(run: Run, i: number): void {
    if (run.phase !== REVIEW) return this.free(i, run, null);
    const bx = run.m.box;
    const b = { x: bx.x + 3, y: bx.y + 3, w: Math.max(1, bx.w - 6), h: Math.max(1, bx.h - 6) };
    const rideY = clamp(this.sy + 18, b.y, b.y + b.h);
    const out = this.mark(run, MK.outline, { x: b.x, y: b.y, w: b.w, h: b.h });
    if (i >= 0) this.sim.follow[i] = 20;
    this.anim(run, gsap.timeline())
      .to(out, {
        p: 1,
        duration: 0.15 * this.B,
        ease: "power1.inOut",
        onUpdate: () => this.aim(i, b.x + Math.min(b.w, (b.w + b.h) * out.p), rideY),
      })
      .call(() => this.stamp(run, i));
  }

  private stamp(run: Run, i: number): void {
    if (run.phase !== REVIEW) return;
    const label = "✓ approved";
    const { w, h } = this.renderer.pillSize(label, "badge");
    const box = run.m.box;
    const x = Math.min(box.x + box.w, this.vw) - w - 14;
    const y = Math.max(box.y + 10, Math.min(this.sy + 14, box.y + box.h - h - 4));
    const badge = this.mark(null, MK.badge, { x, y, label, a: 0, s: 1.5 });
    this.anim(null, gsap.timeline()
      .to(badge, { a: 1, s: 1, duration: 0.16, ease: "back.out(2.5)" })
      .to(badge, { a: 0, duration: 0.25, delay: 0.55, onComplete: () => void (badge.dead = true) }));
    if (i >= 0 && this.brains[i].run === run) {
      this.release(i);
      this.brains[i].hx = x - 10;
      this.brains[i].hy = y + h + 8;
    }
    this.finish(run, false);
  }

  /** Completes a section: instantly (skip/focus/resize) or after review. */
  private finish(run: Run, instant: boolean): void {
    if (run.phase === DONE) return;
    run.phase = DONE;
    run.st?.kill();
    run.st = null;
    const anims = run.anims;
    run.anims = [];
    for (const a of anims) if (a.progress() < 1) a.progress(1);
    for (const t of run.m.tasks) {
      if (t.state !== TASK_DONE) this.taskDone(run, t);
      t.slots.forEach(markBuilt);
      t.absorbed.forEach(markBuilt);
    }
    run.m.el.setAttribute("data-built", "");
    for (const m of run.marks) {
      gsap.killTweensOf(m);
      if (instant) m.dead = true;
      else this.anim(null, gsap.to(m, { a: 0, duration: 0.3, onComplete: () => void (m.dead = true) }));
    }
    run.marks = [];
    this.brains.forEach((b, i) => b.run === run && (b.mode === TRAVEL || b.mode === WORK) && this.release(i));
    this.setBusy();
    if (this.runs.every((r) => r.phase === DONE)) {
      try {
        sessionStorage.setItem(SESSION_KEY, "all");
      } catch {}
    }
  }

  // ---------------------------------------------------------------- tasks

  private claim(): void {
    if (!this.workers.some((i) => this.brains[i].mode === IDLE)) return;
    const open: { run: Run; t: Task; x: number; y: number }[] = [];
    for (const run of this.runs) {
      if (run.phase !== BUILD || run.flushed) continue;
      const tasks = run.m.tasks;
      for (const t of tasks) {
        if (t.state !== TASK_PENDING || !t.deps.every((d) => tasks[d].state === TASK_DONE)) continue;
        const [x, y] = this.startPoint(run, t);
        open.push({ run, t, x, y });
      }
    }
    if (!open.length) return;
    const s = this.sim;
    for (const i of this.workers) {
      const b = this.brains[i];
      if (b.mode !== IDLE) continue;
      const role = this.roles[i];
      let best = -1;
      let bestScore = Infinity;
      for (let j = 0; j < open.length; j++) {
        const o = open[j];
        if (o.t.state !== TASK_PENDING || (b.run !== o.run && this.clock < o.run.joinGate)) continue;
        let score = Math.hypot(o.x - s.x[i], o.y - s.y[i]) + o.t.rank * 22;
        if (o.t.role) score += o.t.role === role ? -200 : 600;
        else if (ROLE_PREFS[role].includes(o.t.kind)) score -= 60;
        if (o.y < this.sy - 20 || o.y > this.sy + this.vh + 20) score += 700;
        if (score < bestScore) [bestScore, best] = [score, j];
      }
      if (best < 0) continue;
      const { run, t, x, y } = open[best];
      if (b.run !== run) run.joinGate = this.clock + run.stagger;
      t.state = TASK_CLAIMED;
      t.agent = i;
      const cap = clamp(0.28 * run.scale + 0.04, 0.1, 0.3);
      this.send(i, run, x, y, cap, (ai) => this.work(run, t, ai), t);
    }
  }

  private startPoint(run: Run, t: Task): [number, number] {
    const b = t.box;
    if (t.kind === "dup") {
      const mb = t.master >= 0 ? run.m.tasks[t.master].box : t.slotBoxes[0];
      return [mb.x + mb.w / 2, mb.y + mb.h / 2];
    }
    if (t.kind === "type" || t.kind === "reveal") return [b.x + t.lines[0].x, b.y + t.lines[0].b];
    return [b.x, b.y];
  }

  private work(run: Run, t: Task, i: number): void {
    if (t.state !== TASK_CLAIMED || run.phase !== BUILD) return this.free(i, run, t);
    t.state = TASK_RUNNING;
    const tl = this.anim(run, gsap.timeline({ onComplete: () => this.taskDone(run, t) }));
    const sc = run.scale;
    const s = this.sim;
    const b = t.box;
    const el = t.el;
    const show = !t.keep;

    if (t.kind === "frame" || t.kind === "image") {
      const f = this.mark(run, MK.frame, { x: b.x, y: b.y, w: b.w, h: b.h, label: t.label });
      s.follow[i] = 30;
      tl.to(f, {
        p: 1,
        duration: (t.kind === "image" ? 0.28 : 0.42) * sc,
        ease: "power2.inOut",
        onUpdate: () => this.aim(i, b.x + b.w * f.p, b.y + b.h * f.p),
      });
      if (t.kind === "frame") {
        if (show) tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.24 * sc, ease: "power1.out" }, `-=${0.1 * sc}`);
      } else {
        const scan = this.mark(run, MK.scan, { x: b.x, y: b.y, w: b.w, h: b.h, a: 0 });
        tl.call(() => {
          scan.a = 1;
          if (!show) return;
          el.style.opacity = "1";
          el.style.clipPath = "inset(0 0 100% 0)";
        });
        tl.to(scan, {
          p: 1,
          duration: 0.4 * sc,
          ease: "power1.inOut",
          onUpdate: () => {
            if (show) el.style.clipPath = `inset(0 0 ${((1 - scan.p) * 100).toFixed(2)}% 0)`;
            this.aim(i, b.x + b.w + 3, b.y + b.h * scan.p);
          },
        });
        tl.to(scan, { a: 0, duration: 0.12 * sc });
      }
      tl.to(f, { a: 0.35, duration: 0.15 * sc }, "<");
      return;
    }

    if (t.kind === "dup") {
      const mb = t.master >= 0 ? run.m.tasks[t.master].box : t.slotBoxes[0];
      const n = t.slots.length;
      const per = 0.36 * sc;
      const gap = Math.min(0.06, 0.3 / n) * sc;
      t.absorbed.forEach(markBuilt);
      s.follow[i] = 26;
      s.flag[i] = 1;
      t.slotBoxes.forEach((sb, gi) => {
        const g = this.mark(run, MK.ghost, {
          x: sb.x, y: sb.y, w: sb.w, h: sb.h, x2: mb.x, y2: mb.y, w2: mb.w, h2: mb.h, a: 0.9,
        });
        const at = gi * gap;
        const lead = gi === n - 1;
        tl.to(g, {
          p: 1,
          duration: per,
          ease: "power2.inOut",
          onUpdate: lead
            ? () => this.aim(i, mb.x + mb.w / 2 + (sb.x + sb.w / 2 - mb.x - mb.w / 2) * g.p,
                mb.y + mb.h / 2 + (sb.y + sb.h / 2 - mb.y - mb.h / 2) * g.p)
            : undefined,
        }, at);
        const slot = t.slots[gi];
        if (!slot.hasAttribute("data-build-keep")) {
          tl.fromTo(slot, { opacity: 0 }, { opacity: 1, duration: 0.16 * sc }, at + per * 0.8);
        }
        tl.to(g, { a: 0, duration: 0.14 * sc }, at + per);
      });
      return;
    }

    // type / reveal: a staircase clip-path follows a caret; layout never changes.
    const typing = t.kind === "type";
    const lines = t.lines;
    const n = typing ? t.chars.length : lines.length;
    const caret = this.mark(run, MK.caret, { color: ROLE_COLOR[this.roles[i]] });
    let box: Mark | null = null;
    if (typing) {
      const x0 = Math.min(...lines.map((l) => l.x));
      const y0 = Math.min(...lines.map((l) => l.y));
      box = this.mark(run, MK.box, {
        x: b.x + x0 - 3,
        y: b.y + y0 - 2,
        w: Math.max(...lines.map((l) => l.r)) - x0 + 6,
        h: Math.max(...lines.map((l) => l.b)) - y0 + 4,
        label: t.label,
        a: 0.5,
        p: 1,
      });
    }
    if (show) {
      el.style.opacity = "1";
      el.style.clipPath = EMPTY_CLIP;
    }
    s.follow[i] = typing ? 28 : 14;
    const st = { v: 0 };
    let last = "";
    const paint = () => {
      let L = 0;
      let cx = lines[0].x;
      if (typing) {
        const k = Math.min(n, Math.floor(st.v));
        if (k > 0) [L, cx] = [t.chars[k - 1].line, t.chars[k - 1].x];
      } else {
        const q = st.v * n;
        L = Math.min(n - 1, Math.floor(q));
        cx = lines[L].x + (lines[L].r - lines[L].x) * Math.min(1, q - L);
      }
      const ln = lines[L];
      caret.x = b.x + cx;
      caret.y = b.y + ln.y;
      caret.h = ln.b - ln.y;
      this.aim(i, caret.x + 2, caret.y + caret.h);
      if (!show) return;
      const end = typing ? st.v >= n : st.v >= 1;
      const clip = end ? "none" : typing && st.v < 1 ? EMPTY_CLIP : stair(lines, L, cx + 1, b.w, b.h);
      if (clip !== last) el.style.clipPath = last = clip;
    };
    paint();
    tl.to(st, {
      v: typing ? n : 1,
      duration: (typing ? clamp(n * 0.032, 0.2, 0.8) : clamp(n * 0.09, 0.28, 0.7)) * sc,
      ease: typing ? "none" : "power1.inOut",
      onUpdate: paint,
    });
    tl.to(box ? [caret, box] : caret, { a: 0, duration: 0.12 * sc });
  }

  private taskDone(run: Run, t: Task): void {
    if (t.state === TASK_DONE) return;
    const i = t.agent;
    t.state = TASK_DONE;
    t.agent = -1;
    t.slots.forEach(markBuilt);
    t.absorbed.forEach(markBuilt);
    if (i >= 0 && this.brains[i].task === t) this.release(i);
  }

  // --------------------------------------------------------------- agents

  private send(i: number, run: Run, x: number, y: number, cap: number, go: (i: number) => void, task: Task | null): void {
    const b = this.brains[i];
    const s = this.sim;
    s.on[i] = 1;
    b.mode = TRAVEL;
    b.run = run;
    b.task = task;
    b.go = go;
    b.until = this.clock + cap;
    s.follow[i] = 0;
    s.flag[i] = 0;
    s.tx[i] = x;
    s.ty[i] = y;
    s.speed[i] = Math.max(this.o.profile.speed * run.speedMul, (s.dist(i) / Math.max(cap, 0.05)) * 1.3);
  }

  private release(i: number): void {
    const b = this.brains[i];
    const s = this.sim;
    if (b.mode === OFF) return;
    b.mode = IDLE;
    b.task = null;
    b.go = null;
    s.follow[i] = 0;
    s.flag[i] = 0;
    s.speed[i] = this.o.profile.speed;
    b.hx = s.x[i];
    b.hy = s.y[i];
  }

  /** Releases agent i only if it is still busy with this run/task. */
  private free(i: number, run: Run, task: Task | null): void {
    const b = i >= 0 ? this.brains[i] : null;
    if (b && b.run === run && b.task === task && (b.mode === WORK || b.mode === TRAVEL)) this.release(i);
  }

  private aim(i: number, x: number, y: number): void {
    if (i < 0) return;
    this.sim.tx[i] = x;
    this.sim.ty[i] = y;
  }

  private exit(i: number): void {
    const b = this.brains[i];
    const s = this.sim;
    if (this.exitDown === null) {
      this.exitDown = this.runs.some((r) => r.phase === WAIT && r.m.el.getBoundingClientRect().top > this.vh * 0.5);
    }
    b.mode = EXIT;
    b.run = null;
    b.until = this.clock + 1.6;
    s.follow[i] = 0;
    s.flag[i] = 0;
    s.speed[i] = this.o.profile.speed * 0.75;
    if (this.exitDown) {
      s.tx[i] = s.x[i] + (Math.random() - 0.5) * 80;
      s.ty[i] = this.sy + this.vh + 90;
    } else {
      s.tx[i] = s.x[i] < this.vw / 2 ? -90 : this.vw + 90;
      s.ty[i] = s.y[i] + (Math.random() - 0.5) * 80;
    }
  }

  // ----------------------------------------------------------------- loop

  private tick = (_time: number, deltaMs: number): void => {
    // Scheduling runs on wall time (like the GSAP tweens) so slow devices keep
    // to the budget; physics is sub-stepped for stability.
    const dt = clamp(deltaMs / 1000, 0.001, 0.25);
    this.clock += dt;
    if (this.busy) this.elapsed += dt;
    this.sy = this.o.getScroll();
    this.update();
    const steps = Math.min(4, Math.ceil(dt * 60));
    for (let k = 0; k < steps; k++) this.sim.step(dt / steps);
    this.renderer.draw(this.sim, this.marks, this.sy);
    this.writeStats(false);
    if (!this.busy && !this.marks.length && this.brains.every((b) => b.mode === OFF)) this.stopTicking();
  };

  private update(): void {
    const s = this.sim;
    let oldest: Run | null = null;
    for (const run of this.runs) {
      if (run.phase === PLAN && this.clock > run.t0 + 0.34 * this.B) this.beginBuild(run);
      if (run.phase === BUILD) {
        if (run.m.tasks.every((t) => t.state === TASK_DONE)) this.review(run);
        else if (!run.flushed && this.clock > run.deadline) this.flush(run);
      }
      if ((run.phase === PLAN || run.phase === BUILD) && (!oldest || run.t0 < oldest.t0)) oldest = run;
    }
    this.claim();
    for (let i = 0; i < s.n; i++) {
      const b = this.brains[i];
      if (b.mode === TRAVEL) {
        if (s.dist(i) < 12 || this.clock >= b.until) {
          const go = b.go;
          b.mode = WORK;
          b.go = null;
          go?.(i);
        }
      } else if (b.mode === IDLE) {
        if (!this.busy) {
          this.exit(i);
          continue;
        }
        if (i === this.reviewer && oldest) {
          const box = oldest.m.box;
          b.hx = Math.min(box.x + box.w - 40, this.vw - 70);
          b.hy = Math.max(box.y, this.sy + 40) + 24;
        }
        s.tx[i] = b.hx + Math.sin(this.clock * 1.7 + i * 1.3) * 7;
        s.ty[i] = b.hy + Math.cos(this.clock * 1.3 + i * 2.1) * 5;
      } else if (b.mode === EXIT) {
        const y = s.y[i] - this.sy;
        if (y < -40 || y > this.vh + 40 || s.x[i] < -40 || s.x[i] > this.vw + 40 || this.clock > b.until) {
          b.mode = OFF;
          s.on[i] = 0;
        }
      }
    }
  }

  private ensureTicking(): void {
    if (this.ticking || !this.alive) return;
    this.ticking = true;
    this.renderer.show();
    if (!this.hidden) gsap.ticker.add(this.tick);
  }

  private stopTicking(): void {
    this.ticking = false;
    gsap.ticker.remove(this.tick);
    this.renderer.hide();
    this.fx = this.fx.filter((a) => a.isActive());
    this.writeStats(true);
  }

  private setBusy(): void {
    const busy = this.runs.some((r) => r.phase >= PLAN && r.phase <= REVIEW);
    if (busy === this.busy) return;
    this.busy = busy;
    if (busy) this.exitDown = null;
    this.o.onBusy(busy);
    this.writeStats(true);
  }

  private writeStats(force: boolean): void {
    const el = this.statsEl;
    if (!el || (!force && this.clock - this.statsAt < 0.1)) return;
    this.statsAt = this.clock;
    let done = 0;
    let total = 0;
    for (const r of this.runs) {
      for (const t of r.m.tasks) {
        total++;
        if (t.state === TASK_DONE) done++;
      }
    }
    const t = this.elapsed;
    const text = `agents ${this.agentCount} · tasks ${done}/${total} · ${String(Math.floor(t / 60)).padStart(2, "0")}:${(t % 60).toFixed(1).padStart(4, "0")}`;
    if (el.textContent !== text) el.textContent = text;
  }

  /** Layout-time view (matches the rects measureSection reads). */
  private readView(): void {
    this.vw = window.innerWidth;
    this.vh = window.innerHeight;
    this.sy = window.scrollY;
  }

  private mark(run: Run | null, k: MarkKind, p: Partial<Mark>): Mark {
    const m: Mark = {
      k, x: 0, y: 0, w: 0, h: 0, x2: 0, y2: 0, w2: 0, h2: 0, p: 0, a: 1, s: 1,
      color: COLORS.accent, label: "", dead: false, ...p,
    };
    this.marks.push(m);
    run?.marks.push(m);
    return m;
  }

  private anim<T extends Anim>(run: Run | null, a: T): T {
    (run ? run.anims : this.fx).push(a);
    return a;
  }

  // --------------------------------------------------------------- events

  private onFocus = (e: FocusEvent): void => {
    const target = e.target instanceof Element ? e.target : null;
    for (let el = target?.closest("[data-build-section]"); el; el = el.parentElement?.closest("[data-build-section]")) {
      const run = this.byEl.get(el);
      if (run) this.finish(run, true);
    }
  };

  private onVisibility = (): void => {
    const hidden = document.visibilityState === "hidden";
    if (hidden === this.hidden) return;
    this.hidden = hidden;
    const all = this.runs.flatMap((r) => r.anims).concat(this.fx);
    all.forEach((a) => (hidden ? a.pause() : a.resume()));
    if (!this.ticking) return;
    if (hidden) gsap.ticker.remove(this.tick);
    else gsap.ticker.add(this.tick);
  };

  private onResize = (): void => {
    this.renderer.invalidate();
    this.readView();
  };

  private onSectionResize = (entries: ResizeObserverEntry[]): void => {
    let changed = false;
    for (const e of entries) {
      if (this.roSeen.has(e.target)) changed = true;
      else this.roSeen.add(e.target);
    }
    if (!changed || this.roFrame) return;
    this.roFrame = requestAnimationFrame(() => {
      this.roFrame = 0;
      for (const run of this.runs) if (run.phase >= PLAN && run.phase <= REVIEW) this.finish(run, true);
      ScrollTrigger.refresh();
    });
  };
}
