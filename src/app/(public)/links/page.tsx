import "../../(homepage)/_sections/blueprint.css";
import "@/components/swarm/swarm.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, AtSign, FileText, Github, Globe, Linkedin, Mail, ScrollText, Sparkles } from "lucide-react";
import { SwarmRoot } from "@/components/swarm/swarm-root";
import { RESUME_URL, profile } from "@/content/profile";
import avatar from "../../../../public/assets/img/ava.jpg";

export const metadata: Metadata = {
  title: "Links",
  description: `${profile.name} — ${profile.role}. Resume, GitHub, LinkedIn and projects.`,
};

const TRANSCRIPT_URL =
  "https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTranscript%20-%20%20Lam%20Anh%20Truong.pdf?alt=media&token=e4e70ecf-41fc-401f-9f71-b4a96abf471f";

const LINKS = [
  { title: "Portfolio", note: "lamanhtruong.com", href: "/", icon: Globe, internal: true },
  { title: "Resume", note: "PDF", href: RESUME_URL, icon: FileText },
  { title: "LinkedIn", note: "lam-anh-truong", href: "https://www.linkedin.com/in/lam-anh-truong/", icon: Linkedin },
  { title: "GitHub", note: "anhlamtruong", href: "https://github.com/anhlamtruong", icon: Github },
  { title: "Chuchube", note: "workflow.chuchube.co", href: "https://workflow.chuchube.co/", icon: Sparkles },
  { title: "Projects", note: "selected builds", href: "/#projects", icon: ArrowUpRight, internal: true },
  { title: "Transcript", note: "PDF", href: TRANSCRIPT_URL, icon: ScrollText },
  { title: "Threads", note: "@lam.anh.truong", href: "https://www.threads.com/@lam.anh.truong", icon: AtSign },
  { title: "Email", note: profile.email, href: `mailto:${profile.email}`, icon: Mail },
];

export default function LinksPage() {
  return (
    <div className="bp-root">
      <main className="mx-auto flex min-h-dvh w-full max-w-md flex-col px-5 py-16">
        <section data-build-section="links" data-build-start="load" className="flex flex-col items-center text-center">
          <div
            data-build-item
            data-build="image"
            data-build-keep
            className="relative h-24 w-24 overflow-hidden rounded-full border border-[color:var(--bp-line-strong)]"
          >
            <Image
              src={avatar}
              alt={profile.name}
              fill
              priority
              placeholder="blur"
              sizes="96px"
              className="object-cover"
            />
          </div>
          <h1 data-build-item data-build="frame" data-build-keep data-build-label="h1.name" className="bp-h2 mt-6 text-3xl">
            {profile.name}
          </h1>
          <p data-build-item data-build="type" className="bp-muted mt-2 text-sm">
            {profile.role} @ {profile.company} · Founder of Chuchube
          </p>
          <p data-build-item data-build="type" className="bp-mono bp-dim mt-1 text-xs">
            {profile.location}
          </p>

          <ul data-build-list className="mt-10 flex w-full flex-col gap-3 text-left">
            {LINKS.map((link, i) => {
              const Icon = link.icon;
              const content = (
                <>
                  <span className="flex min-w-0 items-center gap-3">
                    <Icon className="bp-accent h-4 w-4 shrink-0" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-sm font-medium">{link.title}</span>
                      <span className="bp-mono bp-dim block truncate text-xs">{link.note}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="bp-muted h-4 w-4 shrink-0" aria-hidden="true" />
                </>
              );
              const className = "bp-card bp-card-hover flex items-center justify-between gap-3 px-4 py-3.5";
              return (
                <li key={link.title} data-build-item data-build={i === 0 ? "frame" : "dup"}>
                  {link.internal ? (
                    <Link href={link.href} className={className}>
                      {content}
                    </Link>
                  ) : (
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={className}
                    >
                      {content}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
        <p className="bp-mono bp-dim mt-auto pt-12 text-center text-xs">
          © {new Date().getFullYear()} {profile.shortName}
        </p>
      </main>
      <SwarmRoot />
    </div>
  );
}
