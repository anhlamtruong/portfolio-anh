import { ImageResponse } from "next/og";

// Link preview for LinkedIn, Messenger, X, etc.
// Edge runtime: the Node build of next/og resolves its bundled font with
// path.join on a file URL, which breaks on Windows builds.
export const runtime = "edge";
export const alt =
  "Alan (Lam Anh) Truong — AI Software Engineer. A blueprint page being built by AI agents.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#07090d";
const LINE = "rgba(120,140,170,0.10)";
const ACCENT = "#5eead4";
const GUIDE = "rgba(251,191,36,0.55)";

function Cursor({
  x,
  y,
  color,
  label,
}: {
  x: number;
  y: number;
  color: string;
  label: string;
}) {
  return (
    <div style={{ position: "absolute", left: x, top: y, display: "flex", alignItems: "flex-start" }}>
      <svg width="22" height="24" viewBox="0 0 22 24">
        <path d="M2 2 L19 11 L11 13 L7 21 Z" fill={color} stroke={BG} strokeWidth="1.5" />
      </svg>
      <div
        style={{
          display: "flex",
          marginTop: 16,
          marginLeft: -2,
          padding: "3px 9px",
          borderRadius: 999,
          background: color,
          color: "#04110e",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Handle({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x - 5,
        top: y - 5,
        width: 10,
        height: 10,
        background: BG,
        border: `2px solid ${ACCENT}`,
      }}
    />
  );
}

export default function OpengraphImage() {
  // Frame drawn around the name.
  const fx = 72;
  const fy = 150;
  const fw = 760;
  const fh = 200;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: BG,
          backgroundImage: `linear-gradient(${LINE} 1px, transparent 1px), linear-gradient(90deg, ${LINE} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: "#e8edf4",
          padding: "56px 72px",
        }}
      >
        {/* Guides */}
        <div style={{ position: "absolute", left: 0, right: 0, top: fy - 22, height: 0, borderTop: `2px dashed ${GUIDE}` }} />
        <div style={{ position: "absolute", top: 0, bottom: 0, left: fx - 14, width: 0, borderLeft: `2px dashed ${GUIDE}` }} />

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#8a97a8" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 12, height: 12, borderRadius: 999, background: ACCENT, marginRight: 12 }} />
            orchestrate://portfolio
          </div>
          <div style={{ display: "flex", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.5)", borderRadius: 8, padding: "2px 10px", fontSize: 18 }}>
            plan · 7 sections
          </div>
        </div>

        {/* Name inside a selected frame */}
        <div
          style={{
            position: "absolute",
            left: fx,
            top: fy,
            width: fw,
            height: fh,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 24,
            border: `2px solid ${ACCENT}`,
            background: "rgba(94,234,212,0.05)",
          }}
        >
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Alan&nbsp;<span style={{ color: "#5b6676" }}>(Lam Anh)</span>
          </div>
          <div style={{ display: "flex", fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            Truong
          </div>
        </div>
        <div style={{ position: "absolute", left: fx, top: fy - 30, display: "flex", fontSize: 16, color: ACCENT }}>
          h1.name
        </div>
        <Handle x={fx} y={fy} />
        <Handle x={fx + fw} y={fy} />
        <Handle x={fx} y={fy + fh} />
        <Handle x={fx + fw} y={fy + fh} />

        {/* Role + metrics */}
        <div style={{ position: "absolute", left: fx, top: 386, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600 }}>
            AI Software Engineer · Fidorn Technologies
          </div>
          <div style={{ display: "flex", fontSize: 24, color: "#8a97a8", marginTop: 8 }}>
            Founder of Chuchube · ex-AWS Route 53 · MS CS @ George Mason
          </div>
          <div style={{ display: "flex", marginTop: 30 }}>
            {[
              { v: "837+", l: "PRs in 45 days", c: "#5eead4" },
              { v: "8.7×", l: "lower LLM cost", c: "#a78bfa" },
              { v: "13K+", l: "hackathon · prize", c: "#f472b6" },
            ].map((m) => (
              <div
                key={m.v}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 18,
                  padding: "14px 22px",
                  border: "1px solid #1c2431",
                  borderRadius: 14,
                  background: "#0c1017",
                }}
              >
                <div style={{ display: "flex", fontSize: 38, fontWeight: 700, color: m.c }}>{m.v}</div>
                <div style={{ display: "flex", fontSize: 18, color: "#8a97a8" }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Agents at work */}
        <Cursor x={fx + fw - 30} y={fy + fh - 22} color="#34d399" label="coder·03" />
        <Cursor x={900} y={96} color="#a78bfa" label="planner" />
        <Cursor x={960} y={330} color="#f472b6" label="designer·01" />
        <Cursor x={1010} y={470} color="#fbbf24" label="reviewer" />

        <div style={{ position: "absolute", right: 72, bottom: 48, display: "flex", fontSize: 24, color: "#8a97a8" }}>
          lamanhtruong.com
        </div>
      </div>
    ),
    { ...size },
  );
}
