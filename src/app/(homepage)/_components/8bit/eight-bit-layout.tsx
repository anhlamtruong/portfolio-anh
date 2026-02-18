"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Hero8Bit } from "./hero-8bit";
import { SkillsDungeon } from "./skills-dungeon";
import { CertificatesQuest } from "./certificates-quest";
import { ProjectsArcade } from "./projects-arcade";
import { ResumeScroll } from "./resume-scroll";

const PixelCityscape = dynamic(
  () => import("./pixel-cityscape").then((m) => m.PixelCityscape),
  { ssr: false },
);

// ── Section metadata for HUD ──
const SECTIONS = [
  { id: 1, label: "HERO" },
  { id: 2, label: "SKILLS" },
  { id: 3, label: "CERTS" },
  { id: 4, label: "PROJECTS" },
  { id: 10, label: "RESUME" },
] as const;

// ── Section Progress HUD (minimap) ──
function SectionHUD({
  activeSection,
  onNavigate,
}: {
  activeSection: number;
  onNavigate: (id: number) => void;
}) {
  return (
    <motion.nav
      className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeSection;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`group flex items-center gap-2 transition-all ${
              isActive ? "scale-110" : "opacity-60 hover:opacity-100"
            }`}
            aria-label={`Go to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label (visible on hover) */}
            <span
              className="text-[6px] sm:text-[7px] text-primary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              {section.label}
            </span>
            {/* Dot */}
            <span
              className={`block w-2 h-2 sm:w-2.5 sm:h-2.5 pixel-border-sm transition-colors ${
                isActive
                  ? "bg-primary crt-glow"
                  : "bg-muted-foreground/40 group-hover:bg-primary/60"
              }`}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}

// ── Pixel section divider ──
function SectionDivider() {
  return <div className="section-divider w-full" aria-hidden />;
}

/**
 * EightBitLayout — full 8-bit mode layout orchestrator.
 * Replaces the snap-scroll modern layout with smooth scroll
 * and the PixelCityscape background.
 */
export function EightBitLayout() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const router = useRouter();
  const params = useSearchParams();

  // Initial scroll to section from URL
  useEffect(() => {
    const idx = Number(params.get("section")) || 1;
    document
      .getElementById(`section-${idx}`)
      ?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track scroll progress for parallax
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      setScrollProgress(progress);

      // URL sync with IntersectionObserver-like behavior
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section for HUD
  const [activeSection, setActiveSection] = useState(
    Number(params.get("section")) || 1,
  );

  // URL sync via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number(e.target.id.replace("section-", ""));
            setActiveSection(idx);
            router.replace(`/?section=${idx}`);
          }
        }
      },
      { threshold: 0.5 },
    );

    document
      .querySelectorAll("[id^='section-']")
      .forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [router]);

  // Navigate to section helper
  const navigateToSection = (id: number) => {
    document
      .getElementById(`section-${id}`)
      ?.scrollIntoView({ behavior: "smooth" });
    router.replace(`/?section=${id}`);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const currIdx = SECTIONS.findIndex((s) => s.id === activeSection);
      let nextIdx = currIdx;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") nextIdx = currIdx + 1;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") nextIdx = currIdx - 1;
      nextIdx = Math.max(0, Math.min(nextIdx, SECTIONS.length - 1));
      if (nextIdx !== currIdx) {
        navigateToSection(SECTIONS[nextIdx].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSection]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Pixel cityscape fixed background */}
      <div className="fixed inset-0 z-0">
        <PixelCityscape scrollProgress={scrollProgress} />
      </div>

      {/* Section Progress HUD */}
      <SectionHUD activeSection={activeSection} onNavigate={navigateToSection} />

      {/* Scrollable content */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 h-screen overflow-y-auto scroll-smooth no-scrollbar"
      >
        {/* Section 1: Hero */}
        <div id="section-1">
          <Hero8Bit />
        </div>

        <SectionDivider />

        {/* Section 2: Skills Dungeon */}
        <SkillsDungeon />

        <SectionDivider />

        {/* Section 3: Certificates Quest */}
        <CertificatesQuest />

        <SectionDivider />

        {/* Section 4: Projects Arcade */}
        <ProjectsArcade />

        <SectionDivider />

        {/* Section 10: Resume Scroll */}
        <ResumeScroll />
      </div>
    </div>
  );
}
