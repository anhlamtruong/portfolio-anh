import Link from "next/link";
import { profile, socialLinks } from "@/content/profile";
import { ExternalArrow, SocialIcon, isExternal } from "./shared";
import { ViewCounter } from "./view-counter";
import { SectionNumeral, WordBand } from "./decor";

export function Contact() {
  return (
    <section id="contact" className="border-t border-[color:var(--bp-line)]">
      <WordBand />
      <div
        data-build-section="contact"
        data-build-finale
        className="bp-container pb-24 pt-16 md:pb-32"
      >
        <SectionNumeral value="05" />
        <p data-build-item data-build="type" className="bp-eyebrow">
          05 — contact
        </p>
        <h2
          data-build-item
          data-build="type"
          data-build-font
          data-build-weight
          className="bp-h1 mt-6 max-w-4xl text-[clamp(2.2rem,6vw,4.5rem)]"
        >
          Let&apos;s build the next <em className="bp-serif">system</em>{" "}
          together.
        </h2>
        <p
          data-build-item
          data-build="reveal"
          className="bp-muted mt-6 max-w-xl text-base leading-7"
        >
          I&apos;m happy to talk about agent orchestration, LLM cost, AWS
          platforms, or a role on your team. Email is the fastest way to reach
          me.
        </p>

        <a
          data-build-item
          data-build="frame"
          data-build-color="fill"
          data-build-label="a.email"
          data-deploy-target
          data-deploy-text="live at lamanhtruong.com"
          href={`mailto:${profile.email}`}
          className="bp-btn bp-btn-primary mt-8 h-12 px-5 text-base"
        >
          <SocialIcon kind="email" className="h-4 w-4" />
          {profile.email}
        </a>

        <ul data-build-list className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks
            .filter((link) => link.kind !== "email")
            .map((link, i) => (
              <li
                key={link.label}
                data-build-item
                data-build={i === 0 ? "frame" : "dup"}
              >
                <a
                  href={link.href}
                  {...(isExternal(link.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="bp-card bp-card-hover flex items-center justify-between gap-3 p-4"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <SocialIcon kind={link.kind} className="bp-muted h-4 w-4 shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{link.label}</span>
                      <span className="bp-mono bp-dim block truncate text-xs">
                        {link.handle}
                      </span>
                    </span>
                  </span>
                  <ExternalArrow className="bp-muted h-4 w-4 shrink-0" />
                </a>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[color:var(--bp-line)] py-10">
      <div className="bp-container bp-mono bp-dim flex flex-col gap-3 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.shortName} · built with
          Next.js, GSAP and a few agents
        </p>
        <p className="flex items-center gap-5">
          <span>
            visits <ViewCounter className="bp-muted" />
          </span>
          <Link href="/links" className="bp-link">
            /links
          </Link>
        </p>
      </div>
    </footer>
  );
}
