import { metrics, profile, socialLinks } from "@/content/profile";
import { ExternalArrow, SocialIcon, isExternal } from "./shared";
import { ViewCounter } from "./view-counter";

const RUN_LOG = [
  { who: "planner", color: "var(--bp-violet)", text: "split portfolio into 7 sections" },
  { who: "coder·03", color: "#34d399", text: "experience timeline" },
  { who: "designer·01", color: "var(--bp-pink)", text: "project cards + art" },
  { who: "tester", color: "var(--bp-blue)", text: "a11y + reduced motion" },
  { who: "reviewer", color: "var(--bp-guide)", text: "approved · 0 regressions" },
];

export function Hero() {
  const links = socialLinks.filter((l) => l.kind !== "web");

  return (
    <section
      id="top"
      data-build-section="hero"
      data-build-start="load"
      className="pb-20 pt-28 sm:pt-36"
    >
      <div className="bp-container grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p
            data-build-item
            data-build="type"
            className="bp-mono bp-muted inline-flex items-center gap-2.5 text-xs"
          >
            <span className="bp-dot" aria-hidden="true" />
            shipping agents at {profile.company}
          </p>

          <h1
            data-build-item
            data-build="frame"
            data-build-keep
            data-build-label="h1.name"
            className="bp-h1 mt-6"
          >
            Alan <span className="bp-dim">(Lam Anh)</span>
            <br />
            Truong
          </h1>

          <p
            data-build-item
            data-build="type"
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

        <div
          data-build-item
          data-build="frame"
          data-build-label="run.log"
          className="bp-card bp-terminal overflow-hidden"
          aria-label="Example orchestration run log"
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
            {RUN_LOG.map((line) => (
              <p
                key={line.who}
                data-build-item
                data-build="type"
                className="flex gap-3"
              >
                <span className="bp-dim">→</span>
                <span className="w-24 shrink-0" style={{ color: line.color }}>
                  {line.who}
                </span>
                <span className="bp-muted">{line.text}</span>
              </p>
            ))}
            <p data-build-item data-build="type" className="pt-1">
              <span className="bp-accent">✓</span>{" "}
              <span className="text-[color:var(--bp-text)]">
                shipped · scroll to watch
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="bp-container mt-16">
        <dl data-build-list className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              data-build-item
              data-build={i === 0 ? "frame" : "dup"}
              className="bp-card flex flex-col p-5"
            >
              <dt className="bp-muted order-2 mt-1 text-sm leading-5">
                {m.label}
              </dt>
              <dd className="bp-h2 order-1 tabular-nums">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* "frame", not "type": the counter is React-managed text and must
            not be split into characters. */}
        <p
          data-build-item
          data-build="frame"
          data-build-label="meta"
          className="bp-mono bp-dim mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs"
        >
          <span>{profile.location}</span>
          <span>
            visits <ViewCounter className="bp-muted" />
          </span>
        </p>
      </div>
    </section>
  );
}
