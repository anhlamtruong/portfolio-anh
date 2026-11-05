import type { Detail, Profile, Role, TaskKind } from "./types";

/** sessionStorage key: "all" once every section has been built in this tab. */
export const SESSION_KEY = "swarm-built-v1";

/** Phone profile below this width; swarm.css uses the same breakpoint. */
export const PHONE_QUERY = "(min-width: 768px)";

export const COLORS = {
  bg: "#07090d",
  panel: "#0c1017",
  glass: "rgba(12,16,23,0.94)",
  line: "#1c2431",
  lineStrong: "#2a3546",
  text: "#e8edf4",
  muted: "#8a97a8",
  dim: "#5b6676",
  accent: "#5eead4",
  guide: "#fbbf24",
  ink: "#07090d",
} as const;

export const ROLE_COLOR: Record<Role, string> = {
  planner: "#a78bfa",
  coder: "#34d399",
  designer: "#f472b6",
  reviewer: "#fbbf24",
  tester: "#60a5fa",
  deployer: "#fb923c",
};

const LIKES: Partial<Record<Role, readonly TaskKind[]>> = {
  coder: ["type", "reveal", "frame"],
  designer: ["image", "frame", "dup"],
  tester: ["reveal", "type"],
  deployer: ["dup", "image"],
};

/** Score bonus (px, lower wins) when a role picks up a task kind. */
export function rolePref(role: Role, kind: TaskKind): number {
  if (kind === "color") return role === "designer" ? -260 : 40;
  return LIKES[role]?.includes(kind) ? -60 : 0;
}

const ROSTERS: Record<Profile["kind"], Record<Role, number>> = {
  desktop: { planner: 1, coder: 7, designer: 3, tester: 1, deployer: 1, reviewer: 1 },
  tablet: { planner: 1, coder: 4, designer: 2, tester: 1, deployer: 1, reviewer: 1 },
  phone: { planner: 1, coder: 3, designer: 1, tester: 1, deployer: 0, reviewer: 1 },
};

const DETAIL: Record<Profile["kind"], Detail> = {
  desktop: { fontFirstOnly: false, panels: true, autoTune: 2, colorsPerSection: 99, logoDrags: 3, dragTime: 1 },
  tablet: { fontFirstOnly: false, panels: true, autoTune: 3, colorsPerSection: 2, logoDrags: 2, dragTime: 0.85 },
  phone: { fontFirstOnly: true, panels: false, autoTune: 0, colorsPerSection: 1, logoDrags: 1, dragTime: 0.6 },
};

export function detectProfile(): Profile {
  const w = window.innerWidth;
  const kind: Profile["kind"] = !window.matchMedia(PHONE_QUERY).matches ? "phone" : w < 1024 ? "tablet" : "desktop";
  const roles: Role[] = [];
  const labels: string[] = [];
  const counts = ROSTERS[kind];
  for (const role of Object.keys(counts) as Role[]) {
    for (let i = 0; i < counts[role]; i++) {
      roles.push(role);
      const numbered = role === "coder" || role === "designer";
      labels.push(numbered ? `${role}·${String(i + 1).padStart(2, "0")}` : role);
    }
  }
  return {
    kind,
    budget: kind === "phone" ? 2 : kind === "tablet" ? 2.9 : 3.4,
    heroBudget: kind === "phone" ? 2 : kind === "tablet" ? 3.9 : 4.8,
    dprCap: kind === "phone" ? 1.5 : 2,
    roles,
    labels,
    speed: kind === "phone" ? 900 : 1150,
    detail: DETAIL[kind],
  };
}

/** Resolved monospace family for canvas text (next/font sets the variable). */
export function monoFamily(): string {
  const v = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim();
  return `${v ? v + ", " : ""}ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
}

/** Human label for a computed font-family (next/font hashes its names). */
export function fontLabel(family: string): string {
  const first = (family.split(",")[0] ?? "").replace(/["']/g, "").trim();
  if (/geist.?mono/i.test(first)) return "Geist Mono";
  if (/geist/i.test(first)) return "Geist";
  const clean = first
    .replace(/^_+/, "")
    .replace(/(_Fallback)?_[0-9a-f]{5,}$/i, "")
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
  return clean || "Sans";
}
