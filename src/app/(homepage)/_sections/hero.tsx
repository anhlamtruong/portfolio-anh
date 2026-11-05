import Image from "next/image";
import { metrics, profile, socialLinks } from "@/content/profile";
import avatar from "../../../../public/assets/img/ava.jpg";
import { Bracket, CrossMark, DimLine, HeroSchematic } from "./decor";
import { ExternalArrow, SocialIcon, isExternal } from "./shared";
import { ViewCounter } from "./view-counter";

const RUN_LOG = [
  { who: "planner", color: "var(--bp-violet)", text: "split portfolio into 7 sections" },
  { who: "coder·03", color: "#34d399", text: "experience timeline" },
  { who: "designer·01", color: "var(--bp-pink)", text: "type, color + images" },
  { who: "tester", color: "var(--bp-blue)", text: "a11y + layout shift = 0" },
  { who: "reviewer", color: "var(--bp-guide)", text: "approved · 0 regressions" },
];

// Each metric gets its own color so the designer agent can pick it.
const METRIC_COLORS = ["#5eead4", "#a78bfa", "#f472b6", "#60a5fa"];

export function Hero() {
  const links = socialLinks.filter((l) => l.kind !== "web");

  return (
    <section
      id="top"
      data-build-section="hero"
      data-build-start="load"
      data-parallax-scope
      className="relative pb-20 pt-28 sm:pt-36"
    >
      <HeroSchematic />
      <div className="bp-container grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
        <CrossMark at="-left-2 -top-10" label="x 0 · y 0" speed={0.15} />
        <Bracket at="-right-1 top-0" speed={0.3} flip />

        <div>
          <p
            data-build-item
            data-build="type"
            className="bp-mono bp-muted inline-flex items-center gap-2.5 text-xs"
          >
            <span className="bp-dot" aria-hidden="true" />
            shipping agents at {profile.company}
          </p>

          {/* Typed first (order -1) in a mono draft, then switched to Geist +
              the serif accent, then its weight sweeps up. Desktop only;
              phones keep it visible from the first paint (LCP). */}
          <h1
            data-build-item
            data-build="type"
            data-build-font
            data-build-weight
            data-build-keep="mobile"
            data-build-order="-1"
            data-build-role="coder"
            data-build-label="h1.name"
            className="bp-h1 mt-6"
          >
            Alan <span className="bp-serif bp-muted">(Lam Anh)</span>
            <br />
            Truong
          </h1>

          <p
            data-build-item
            data-build="type"
            data-build-font
            className="mt-6 text-lg font-medium sm:text-xl"
          >
            {profile.role} · Founder of Chuchube
          </p>

          <p
            data-build-item
            data-build="reveal"
            className="bp-muted mt-4 max-w-xl text-base leading-7"
          >
            {profile.summary}
          </p>

          <div data-build-list className="mt-8 flex flex-wrap gap-3">
            {links.map((link, i) => (
              <a
                key={link.label}
                data-build-item
                data-build={i === 0 ? "frame" : "dup"}
                {...(link.kind === "resume" ? { "data-build-color": "fill" } : {})}
                href={link.href}
                {...(isExternal(link.href)
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={
                  link.kind === "resume" ? "bp-btn bp-btn-primary" : "bp-btn"
                }
              >
                <SocialIcon kind={link.kind} className="h-4 w-4" />
                {link.label}
                {link.kind === "resume" ? (
                  <ExternalArrow className="h-3.5 w-3.5 opacity-70" />
                ) : null}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div
              data-build-item
              data-build="image"
              data-build-from="right"
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-[color:var(--bp-line-strong)] bg-[var(--bp-panel)]"
            >
              <Image
                src={avatar}
                alt={profile.name}
                fill
                priority
                placeholder="blur"
                sizes="80px"
                className="object-cover"
              />
            </div>
            <div className="bp-mono text-xs leading-6">
              <p data-build-item data-build="type" className="bp-dim">
                alan.jpg · 1:1
              </p>
              <p data-build-item data-build="type" className="bp-muted">
                {profile.pronouns} · {profile.location}
              </p>
            </div>
          </div>

          <div
            data-build-item
            data-build="frame"
            data-build-tune
            data-build-label="run.log"
            className="bp-card bp-terminal overflow-hidden"
            aria-label="Orchestration run log"
          >
            <div className="flex items-center justify-between border-b border-[color:var(--bp-line)] px-4 py-2.5">
              <span className="bp-dim">orchestrate://portfolio</span>
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[#2a3546]" />
                <span className="h-2 w-2 rounded-full bg-[#2a3546]" />
                <span className="h-2 w-2 rounded-full bg-[#2a3546]" />
              </span>
            </div>
            <div className="space-y-0.5 px-4 py-4">
              <p data-build-item data-build="type" className="text-[color:var(--bp-text)]">
                <span className="bp-accent">$</span> orchestrate build portfolio
                --agents 14
              </p>
              {/* Live log: the engine replaces these fallback lines with real
                  build events (fixed height, so nothing shifts). */}
              <div data-swarm-log data-swarm-log-lines="6" className="bp-log">
                {RUN_LOG.map((line) => (
                  <p key={line.who} className="swarm-log__line">
                    <span className="swarm-log__who" style={{ color: line.color }}>
                      {line.who}
                    </span>
                    <span className="swarm-log__what">{line.text}</span>
                  </p>
                ))}
              </div>
              <p data-build-item data-build="type" className="pt-1">
                <span className="bp-accent">✓</span>{" "}
                <span className="text-[color:var(--bp-text)]">
                  shipped · scroll to watch
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bp-container mt-16">
        <DimLine at="left-0 -top-8" width="38%" label="1120 · grid 12" speed={0.1} />
        <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              data-build-item
              data-build="frame"
              {...(i === 0 ? { "data-build-tune": "" } : {})}
              className="bp-card flex flex-col p-5"
            >
              <dt className="bp-muted order-2 mt-1 text-sm leading-5">
                {m.label}
              </dt>
              <dd
                data-build-item
                data-build="type"
                data-build-color="text"
                className="bp-h2 order-1 tabular-nums"
                style={{ color: METRIC_COLORS[i % METRIC_COLORS.length] }}
              >
                {m.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* "frame", not "type": the counter is React-managed text. */}
        <p
          data-build-item
          data-build="frame"
          data-build-label="meta"
          className="bp-mono bp-dim mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
        >
          <span>
            visits <ViewCounter className="bp-muted" />
          </span>
        </p>
      </div>
    </section>
  );
}
