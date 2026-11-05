import type { ReactNode } from "react";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Linkedin,
  Mail,
} from "lucide-react";
import type { SocialLink } from "@/content/profile";
import { SectionNumeral } from "./decor";

// Section intro. Each header is its own small build section so the
// agents type it as soon as it scrolls into view.
export function SectionHeader({
  id,
  index,
  label,
  title,
  children,
}: {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <>
      <SectionNumeral value={index} />
    <header
      data-build-section={`${id}-head`}
      className="relative flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p data-build-item data-build="type" className="bp-eyebrow">
          {index} — {label}
        </p>
        <h2
          data-build-item
          data-build="type"
          data-build-font
          className="bp-h2 mt-4"
        >
          {title}
        </h2>
      </div>
      {children ? (
        <div
          data-build-item
          data-build="reveal"
          className="bp-muted max-w-sm text-sm leading-6"
        >
          {children}
        </div>
      ) : null}
    </header>
    </>
  );
}

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  email: Mail,
  resume: FileText,
  web: Globe,
} as const;

export function SocialIcon({
  kind,
  className,
}: {
  kind: SocialLink["kind"];
  className?: string;
}) {
  const Icon = ICONS[kind];
  return <Icon className={className} aria-hidden="true" />;
}

export function ExternalArrow({ className }: { className?: string }) {
  return <ArrowUpRight className={className} aria-hidden="true" />;
}

export function isExternal(href: string) {
  return href.startsWith("http");
}

// Small agent-graph drawing used for projects without a screenshot.
// Deterministic per title so server and client markup always match.
export function AgentGraphArt({ seed, label }: { seed: string; label: string }) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  const rand = () => {
    h ^= h << 13;
    h ^= h >>> 17;
    h ^= h << 5;
    return ((h >>> 0) % 1000) / 1000;
  };
  const colors = ["#a78bfa", "#34d399", "#f472b6", "#60a5fa", "#fbbf24", "#fb923c"];
  const nodes = Array.from({ length: 7 }, (_, i) => ({
    x: 40 + (i % 4) * 90 + rand() * 30,
    y: 40 + Math.floor(i / 4) * 90 + rand() * 40,
    c: colors[i % colors.length],
  }));
  const hub = { x: 200, y: 120 };

  return (
    <svg
      viewBox="0 0 400 250"
      role="img"
      aria-label={label}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <rect width="400" height="250" fill="#0a0e15" />
      <g stroke="#1c2431" strokeWidth="1">
        {Array.from({ length: 9 }, (_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="250" />
        ))}
        {Array.from({ length: 6 }, (_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      <g strokeWidth="1.25" fill="none">
        {nodes.map((n, i) => (
          <path
            key={`e${i}`}
            d={`M${hub.x} ${hub.y} C ${(hub.x + n.x) / 2} ${hub.y}, ${(hub.x + n.x) / 2} ${n.y}, ${n.x} ${n.y}`}
            stroke={n.c}
            strokeOpacity="0.45"
            strokeDasharray={i % 2 ? "4 4" : undefined}
          />
        ))}
      </g>
      <rect
        x={hub.x - 34}
        y={hub.y - 14}
        width="68"
        height="28"
        rx="6"
        fill="#0c1017"
        stroke="#5eead4"
      />
      <text
        x={hub.x}
        y={hub.y + 4}
        textAnchor="middle"
        fill="#5eead4"
        fontSize="11"
        fontFamily="ui-monospace, monospace"
      >
        planner
      </text>
      {nodes.map((n, i) => (
        <g key={`n${i}`}>
          <circle cx={n.x} cy={n.y} r="9" fill="#0c1017" stroke={n.c} />
          <circle cx={n.x} cy={n.y} r="3" fill={n.c} />
        </g>
      ))}
    </svg>
  );
}
