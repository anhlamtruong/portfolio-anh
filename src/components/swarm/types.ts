// Shared types for the agent-swarm build engine.

export type Role = "planner" | "coder" | "designer" | "reviewer" | "tester" | "deployer";
export type BuildKind = "frame" | "type" | "reveal" | "image" | "dup";

/** Rect in document coordinates (CSS px, scroll-independent). */
export interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A visual text line, in coordinates local to the item's border box. */
export interface LineBox {
  x: number;
  y: number;
  r: number;
  b: number;
}

/** Right edge (local x) of a typed glyph and the index of its line. */
export interface CharBox {
  x: number;
  line: number;
}

export const TASK_PENDING = 0;
export const TASK_CLAIMED = 1;
export const TASK_RUNNING = 2;
export const TASK_DONE = 3;

export interface Task {
  id: number;
  el: HTMLElement;
  kind: BuildKind;
  keep: boolean;
  role: Role | null;
  label: string;
  order: number | null;
  rank: number;
  deps: number[];
  /** dup batches: every sibling produced by this task (el === slots[0]). */
  slots: HTMLElement[];
  /** Items nested inside dup slots; built together with them. */
  absorbed: HTMLElement[];
  /** dup batches: index of the list's master frame task. */
  master: number;
  box: Box;
  lines: LineBox[];
  chars: CharBox[];
  slotBoxes: Box[];
  state: number;
  agent: number;
}

export interface Guide {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface SectionModel {
  el: HTMLElement;
  name: string;
  onLoad: boolean;
  planLabel: string | null;
  tasks: Task[];
  box: Box;
  guides: Guide[];
  tagX: number;
  tagY: number;
}

export const MK = {
  guide: 0,
  frame: 1,
  box: 2,
  ghost: 3,
  scan: 4,
  caret: 5,
  tag: 6,
  badge: 7,
  outline: 8,
} as const;
export type MarkKind = (typeof MK)[keyof typeof MK];

/** Something drawn on the overlay. Plain object so GSAP can tween its fields. */
export interface Mark {
  k: MarkKind;
  x: number;
  y: number;
  w: number;
  h: number;
  /** Secondary point/rect: guide end point, ghost source rect. */
  x2: number;
  y2: number;
  w2: number;
  h2: number;
  p: number;
  a: number;
  s: number;
  color: string;
  label: string;
  dead: boolean;
}

export interface Profile {
  kind: "desktop" | "tablet" | "phone";
  /** Seconds a single section may take, start to approval. */
  budget: number;
  dprCap: number;
  roles: Role[];
  labels: string[];
  /** Base cruise speed in px/s. */
  speed: number;
}
