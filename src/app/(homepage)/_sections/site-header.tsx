import { RESUME_URL } from "@/content/profile";
import { ExternalArrow } from "./shared";
import { ScrambleText } from "./fx/scramble-text";

const NAV = [
  { href: "#experience", label: "experience" },
  { href: "#projects", label: "projects" },
  { href: "#skills", label: "stack" },
  { href: "#credentials", label: "credentials" },
  { href: "#contact", label: "contact" },
];

// Solid background instead of backdrop blur: blur repaints on every scroll
// frame, which costs smoothness on slower machines.
export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-[color:var(--bp-line)] bg-[rgba(7,9,13,0.92)]">
      <div className="bp-container flex h-14 items-center justify-between gap-6">
        <a href="#top" className="bp-mono flex items-center gap-2.5 text-sm">
          <span className="grid h-7 w-7 place-items-center rounded-md border border-[color:var(--bp-line-strong)] text-[0.7rem] text-[color:var(--bp-accent)]">
            AT
          </span>
          <span className="hidden sm:inline">
            <ScrambleText inline>alan.truong</ScrambleText>
          </span>
        </a>
        <nav aria-label="Sections" className="hidden md:block">
          <ul className="bp-mono bp-muted flex items-center gap-6 text-xs">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors hover:text-[color:var(--bp-text)]">
                  <ScrambleText inline>{item.label}</ScrambleText>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bp-btn h-9 px-3 text-sm"
        >
          <ScrambleText>Resume</ScrambleText>
          <ExternalArrow className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}
