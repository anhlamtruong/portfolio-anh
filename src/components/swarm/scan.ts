// DOM -> task graph. scanPage() reads structure once; measureSection() reads
// geometry (all reads, no writes) right before a section starts building.
import type { Box, BuildKind, CharBox, Guide, LineBox, Role, SectionModel, Task } from "./types";

const SECTION = "[data-build-section]";
const KINDS: readonly BuildKind[] = ["frame", "type", "reveal", "image", "dup"];
const ROLES: readonly Role[] = ["planner", "coder", "designer", "reviewer", "tester", "deployer"];
const CLASS_WORDS = ["card", "tile", "chip", "btn", "button", "badge", "terminal", "panel", "logo"];
const TAG_WORDS: Record<string, string> = {
  IMG: "img", PICTURE: "img", SVG: "svg", A: "link", BUTTON: "button", LI: "item",
  UL: "list", OL: "list", ARTICLE: "card", FIGURE: "figure", P: "p", H1: "h1",
  H2: "h2", H3: "h3", H4: "h4", DL: "list",
};
const MAX_TYPE_CHARS = 120;

const kindOf = (el: HTMLElement): BuildKind => {
  const k = el.dataset.build as BuildKind;
  return KINDS.includes(k) ? k : "frame";
};

function labelOf(el: HTMLElement, kind: BuildKind): string {
  if (el.dataset.buildLabel) return el.dataset.buildLabel;
  for (const c of Array.from(el.classList)) {
    const hit = CLASS_WORDS.find((w) => c === w || c.endsWith("-" + w));
    if (hit) return hit;
  }
  return TAG_WORDS[el.tagName.toUpperCase()] ?? (kind === "image" ? "img" : "frame");
}

function makeTask(id: number, el: HTMLElement, kind: BuildKind): Task {
  const order = Number.parseFloat(el.dataset.buildOrder ?? "");
  const role = el.dataset.buildRole as Role;
  return {
    id, el, kind,
    keep: el.hasAttribute("data-build-keep"),
    role: ROLES.includes(role) ? role : null,
    label: labelOf(el, kind),
    order: Number.isFinite(order) ? order : null,
    rank: id, deps: [], slots: [el], absorbed: [], master: -1,
    box: { x: 0, y: 0, w: 0, h: 0 }, lines: [], chars: [], slotBoxes: [],
    state: 0, agent: -1,
  };
}

function scanSection(section: HTMLElement, workers: number): SectionModel {
  const items = Array.from(section.querySelectorAll<HTMLElement>("[data-build-item]")).filter(
    (el) => el.closest(SECTION) === section,
  );
  const isItem = new Set(items);
  const parentItem = (el: HTMLElement): HTMLElement | null => {
    for (let p = el.parentElement; p && p !== section; p = p.parentElement) if (isItem.has(p)) return p;
    return null;
  };
  const listOf = (el: HTMLElement) => el.parentElement?.closest<HTMLElement>("[data-build-list]") ?? null;
  const masterOf = (list: HTMLElement) =>
    (Array.from(list.children) as HTMLElement[]).find((c) => isItem.has(c)) ?? null;
  // A dup needs a list and a master that is not itself; otherwise it is a frame.
  const isDup = (el: HTMLElement) => {
    if (kindOf(el) !== "dup") return false;
    const list = listOf(el);
    const master = list && masterOf(list);
    return !!master && master !== el;
  };

  const tasks: Task[] = [];
  const taskOf = new Map<HTMLElement, Task>();
  const dupGroups = new Map<HTMLElement, HTMLElement[]>();
  const nestedInDup = new Map<HTMLElement, HTMLElement>();

  for (const el of items) {
    let dupAncestor: HTMLElement | null = null;
    for (let p = parentItem(el); p; p = parentItem(p)) if (isDup(p)) dupAncestor = p;
    if (dupAncestor) nestedInDup.set(el, dupAncestor);
    else if (isDup(el)) {
      const list = listOf(el) as HTMLElement;
      if (!dupGroups.has(list)) dupGroups.set(list, []);
      (dupGroups.get(list) as HTMLElement[]).push(el);
    } else {
      const kind = kindOf(el) === "dup" ? "frame" : kindOf(el);
      const t = makeTask(tasks.length, el, kind);
      tasks.push(t);
      taskOf.set(el, t);
    }
  }

  // Batch large lists so a few agents can finish 50 tiles inside the budget.
  const maxBatches = Math.max(2, Math.round(workers * 1.5));
  dupGroups.forEach((slots, list) => {
    const master = taskOf.get(masterOf(list) as HTMLElement);
    const size = Math.max(1, Math.ceil(slots.length / maxBatches));
    for (let i = 0; i < slots.length; i += size) {
      const t = makeTask(tasks.length, slots[i], "dup");
      t.slots = slots.slice(i, i + size);
      t.label = master?.label ?? t.label;
      t.master = master ? master.id : -1;
      if (master) t.deps.push(master.id);
      tasks.push(t);
      for (const s of t.slots) taskOf.set(s, t);
    }
  });

  nestedInDup.forEach((slot, el) => taskOf.get(slot)?.absorbed.push(el));

  // Items nested inside another item wait for it.
  for (const t of tasks) {
    const parent = parentItem(t.el);
    const dep = parent ? taskOf.get(parent) : undefined;
    if (dep && dep !== t && !t.deps.includes(dep.id)) t.deps.push(dep.id);
  }

  return {
    el: section,
    name: section.dataset.buildSection || "section",
    onLoad: section.dataset.buildStart === "load",
    planLabel: section.dataset.buildPlan ?? null,
    tasks,
    box: { x: 0, y: 0, w: 0, h: 0 },
    guides: [],
    tagX: 0,
    tagY: 0,
  };
}

/** Finds every build section plus items that live outside any section. */
export function scanPage(workers: number): { sections: SectionModel[]; orphans: HTMLElement[] } {
  const sections = Array.from(document.querySelectorAll<HTMLElement>(SECTION)).map((s) =>
    scanSection(s, workers),
  );
  const orphans = Array.from(document.querySelectorAll<HTMLElement>("[data-build-item]")).filter(
    (el) => !el.closest(SECTION),
  );
  return { sections, orphans };
}

const toDoc = (r: DOMRect, sy: number): Box => ({ x: r.left, y: r.top + sy, w: r.width, h: r.height });

/** Per-glyph right edges and line boxes for typing. Returns false if unsuitable. */
function measureChars(t: Task, er: DOMRect, range: Range): boolean {
  const chars: CharBox[] = [];
  const lines: LineBox[] = [];
  let cur: LineBox | null = null;
  let prevX = -Infinity;
  const walker = document.createTreeWalker(t.el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
    const s = node.data;
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      if (c === 32 || c === 10 || c === 9 || c === 13 || c === 160) continue;
      const j = c >= 0xd800 && c <= 0xdbff && i + 1 < s.length ? i + 2 : i + 1;
      range.setStart(node, i);
      range.setEnd(node, j);
      i = j - 1;
      const r = range.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      const x1 = r.left - er.left;
      const y1 = r.top - er.top;
      if (!cur || y1 > (cur.y + cur.b) / 2 || x1 < prevX - 2) {
        if (cur && y1 < cur.y) return false; // visual order differs from DOM order
        cur = { x: x1, y: y1, r: r.right - er.left, b: r.bottom - er.top };
        lines.push(cur);
      } else {
        cur.x = Math.min(cur.x, x1);
        cur.y = Math.min(cur.y, y1);
        cur.r = Math.max(cur.r, r.right - er.left);
        cur.b = Math.max(cur.b, r.bottom - er.top);
      }
      prevX = x1;
      chars.push({ x: r.right - er.left, line: lines.length - 1 });
      if (chars.length > MAX_TYPE_CHARS) return false;
    }
  }
  if (!chars.length) return false;
  t.chars = chars;
  t.lines = lines;
  return true;
}

/** Visual lines of a text block, from text-node fragments only. */
function measureLines(t: Task, er: DOMRect, range: Range): void {
  const frags: LineBox[] = [];
  const walker = document.createTreeWalker(t.el, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (!node.nodeValue?.trim()) continue;
    range.selectNodeContents(node);
    for (const r of Array.from(range.getClientRects())) {
      if (r.width < 0.5 || r.height < 0.5) continue;
      frags.push({ x: r.left - er.left, y: r.top - er.top, r: r.right - er.left, b: r.bottom - er.top });
    }
  }
  frags.sort((a, b) => a.y - b.y);
  const lines: LineBox[] = [];
  for (const f of frags) {
    const l = lines[lines.length - 1];
    const overlap = l ? Math.min(l.b, f.b) - Math.max(l.y, f.y) : 0;
    if (l && overlap > 0.5 * Math.min(l.b - l.y, f.b - f.y)) {
      l.x = Math.min(l.x, f.x);
      l.r = Math.max(l.r, f.r);
      l.y = Math.min(l.y, f.y);
      l.b = Math.max(l.b, f.b);
    } else lines.push({ ...f });
  }
  while (lines.length > 32) {
    for (let i = 0; i + 1 < lines.length; i++) {
      const a = lines[i];
      const b = lines.splice(i + 1, 1)[0];
      lines[i] = { x: Math.min(a.x, b.x), y: a.y, r: Math.max(a.r, b.r), b: b.b };
    }
  }
  t.lines = lines.length ? lines : [{ x: 0, y: 0, r: er.width, b: er.height }];
}

/** Reads every rect the section's build needs. */
export function measureSection(m: SectionModel): void {
  const sy = window.scrollY;
  const range = document.createRange();
  m.box = toDoc(m.el.getBoundingClientRect(), sy);
  for (const t of m.tasks) {
    const r = t.el.getBoundingClientRect();
    t.box = toDoc(r, sy);
    if (t.kind === "type" && !measureChars(t, r, range)) t.kind = "reveal";
    if (t.kind === "reveal") measureLines(t, r, range);
    if (t.kind === "dup") {
      t.slotBoxes = t.slots.map((s) => toDoc(s.getBoundingClientRect(), sy));
      const xs = t.slotBoxes;
      const x = Math.min(...xs.map((b) => b.x));
      const y = Math.min(...xs.map((b) => b.y));
      t.box = {
        x, y,
        w: Math.max(...xs.map((b) => b.x + b.w)) - x,
        h: Math.max(...xs.map((b) => b.y + b.h)) - y,
      };
    }
  }

  // Default order: rows top-to-bottom, then left-to-right; data-build-order overrides.
  const geo = m.tasks
    .slice()
    .sort((a, b) => Math.round(a.box.y / 24) - Math.round(b.box.y / 24) || a.box.x - b.box.x || a.id - b.id);
  geo.forEach((t, i) => (t.rank = i));
  geo
    .sort((a, b) => (a.order ?? a.rank) - (b.order ?? b.rank) || a.rank - b.rank)
    .forEach((t, i) => (t.rank = i));

  const visible = m.tasks.filter((t) => t.box.w > 0 && t.box.h > 0);
  const src = visible.length ? visible.map((t) => t.box) : [m.box];
  const left = Math.min(...src.map((b) => b.x));
  const right = Math.max(...src.map((b) => b.x + b.w));
  const top = Math.min(...src.map((b) => b.y));
  const bottom = Math.max(...src.map((b) => b.y + b.h));
  const guides: Guide[] = [
    { x1: left - 28, y1: top, x2: right + 28, y2: top },
    { x1: left, y1: top - 18, x2: left, y2: bottom + 18 },
    { x1: right, y1: top - 18, x2: right, y2: bottom + 18 },
  ];
  // One interior column line: the most common left edge away from the sides.
  const counts = new Map<number, number>();
  for (const b of src) {
    const x = Math.round(b.x / 4) * 4;
    if (x - left > 24 && right - x > 24) counts.set(x, (counts.get(x) ?? 0) + 1);
  }
  let col = -1;
  let best = 0;
  counts.forEach((n, x) => {
    if (n > best) [best, col] = [n, x];
  });
  if (col >= 0) guides.push({ x1: col, y1: top - 18, x2: col, y2: bottom + 18 });
  m.guides = guides;
  m.tagX = left;
  m.tagY = top - 26;
}
