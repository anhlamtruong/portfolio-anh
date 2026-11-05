import type { BuildKind, Profile, Role } from "./types";

/** sessionStorage key: "all" once every section has been built in this tab. */
export const SESSION_KEY = "swarm-built-v1";

export const COLORS = {
  bg: "#07090d",
  panel: "#0c1017",
  line: "#1c2431",
  text: "#e8edf4",
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

/** Kinds each worker role reaches for first (a soft preference). */
export const ROLE_PREFS: Record<Role, readonly BuildKind[]> = {
  planner: [],
  reviewer: [],
  coder: ["type", "reveal", "frame"],
  designer: ["image", "frame", "dup"],
  tester: ["reveal", "type"],
  deployer: ["dup", "image"],
};

const ROSTERS: Record<Profile["kind"], Record<Role, number>> = {
  desktop: { planner: 1, coder: 7, designer: 3, tester: 1, deployer: 1, reviewer: 1 },
  tablet: { planner: 1, coder: 4, designer: 2, tester: 1, deployer: 1, reviewer: 1 },
  phone: { planner: 1, coder: 3, designer: 1, tester: 1, deployer: 0, reviewer: 1 },
};

export function detectProfile(): Profile {
  const w = window.innerWidth;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const kind: Profile["kind"] =
    w < 640 || (coarse && w < 768) ? "phone" : w < 1024 ? "tablet" : "desktop";
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
    budget: kind === "phone" ? 1.4 : kind === "tablet" ? 2 : 2.6,
    dprCap: kind === "phone" ? 1.5 : 2,
    roles,
    labels,
    speed: kind === "phone" ? 900 : 1150,
  };
}

/** Resolved monospace family for canvas text (next/font sets the variable). */
export function monoFamily(): string {
  const v = getComputedStyle(document.body).getPropertyValue("--font-geist-mono").trim();
  return `${v ? v + ", " : ""}ui-monospace, SFMono-Regular, Menlo, Consolas, monospace`;
}
