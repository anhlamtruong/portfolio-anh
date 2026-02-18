"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";
import { CrtWrapper } from "./crt-wrapper";

// ── Project data (mirrored from projects-section.tsx) ──
const projects = [
  {
    id: 1,
    title: "THE PIG GAME",
    thumbnail: "/assets/img/pig-game-thumbnail.png",
    link: "https://anhlamtruong.github.io/The-Pig-Game/",
    tech: ["HTML", "CSS", "JS"],
    description:
      "A dice game where players race to 100 points. Roll or hold — but roll a 1 and lose your turn!",
  },
  {
    id: 2,
    title: "OMNIFOOD",
    thumbnail: "/assets/img/omnifood.png",
    link: "https://anhlamtruong.github.io/Omnifood-Project-Desktop-/",
    tech: ["HTML", "CSS", "DESIGN"],
    description:
      "A landing page for a food subscription service. Built with a systematic design approach and cohesive brand identity.",
  },
  {
    id: 3,
    title: "FORKIFY RECIPE APP",
    thumbnail: "/assets/img/forkify.png",
    link: "https://forkify-application-anh-portfolio.netlify.app/",
    tech: ["JS", "MVC", "API"],
    description:
      "A recipe app with search, bookmarks, and uploads. Built with MVC architecture and async data flow.",
  },
  {
    id: 4,
    title: "BANKIST APP",
    thumbnail: "/assets/img/bankist.png",
    link: "https://anhlamtruong.github.io/banklist-app/",
    tech: ["JS", "DOM", "INTL"],
    description:
      "Banking landing page + interactive GUI with login, transfers, loans, and a session timer. Pure vanilla JS.",
  },
  {
    id: 5,
    title: "CREATA SOCIAL MEDIA",
    thumbnail: "/assets/img/social-media.png",
    link: "https://creeta.vercel.app/",
    tech: ["NEXT.JS", "FIREBASE", "REDUX"],
    description:
      "Full-stack social media app with Redux-Saga, SSR/SSG, Firebase Auth, and real-time Firestore listeners.",
  },
  {
    id: 6,
    title: "WEB3 ASSET MANAGER",
    thumbnail: "/assets/img/3rdweb.png",
    link: "https://3rd-web-dashboard.vercel.app/?section=dashboard",
    tech: ["NEXT.JS", "WEB3", "SANITY"],
    description:
      "A dApp dashboard for managing portfolios and deploying tokens using Thirdweb SDK and Sanity.io CMS.",
  },
  {
    id: 7,
    title: "CRUSHIE AI COACH",
    thumbnail: "/assets/img/crushie.jpg",
    link: "https://devpost.com/software/crushie",
    tech: ["NEXT.JS", "AZURE AI", "SUPABASE"],
    description:
      "Real-time conversation coaching with Patriot AI, Azure OpenAI & ElevenLabs. pgvector HNSW engine + gamified SIQ scoring.",
  },
  {
    id: 8,
    title: "FINHACK FINANCE",
    thumbnail: "/assets/img/finhack.png",
    link: "https://devpost.com/software/finance-queens",
    tech: ["GEMINI", "SNOWFLAKE", "DOCKER"],
    description:
      "Voice-enabled AI financial platform with Gemini, Claude 3.7, Snowflake ML forecasting & Solana blockchain auditing.",
  },
];

// ── Pixel project cartridge ──
function ProjectCartridge({
  project,
  index,
  isSelected,
  onSelect,
}: {
  project: (typeof projects)[number];
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      data-project-id={project.id}
      className={`shrink-0 w-36 sm:w-44 pixel-border p-2 sm:p-3 flex flex-col cursor-pointer transition-all ${
        isSelected ? "bg-primary/15 scale-105" : "bg-card/60 hover:bg-card/80"
      }`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 + index * 0.1, type: "spring", damping: 15 }}
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video pixel-border-sm bg-muted/50 overflow-hidden mb-2">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={176}
          height={99}
          className="w-full h-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Title */}
      <h3 className="text-primary text-xs sm:text-sm text-left leading-tight mb-1 line-clamp-2">
        {project.title}
      </h3>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] sm:text-xs px-1.5 bg-muted text-muted-foreground pixel-border-sm"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

// ── Project detail panel ──
function ProjectDetail({ project }: { project: (typeof projects)[number] }) {
  return (
    <motion.div
      key={project.id}
      className="pixel-border bg-card/70 p-4 sm:p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ type: "spring", damping: 20 }}
    >
      {/* Preview image */}
      <div className="w-full aspect-video pixel-border-sm bg-muted/50 overflow-hidden mb-4">
        <Image
          src={project.thumbnail}
          alt={project.title}
          width={640}
          height={360}
          className="w-full h-full object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Info */}
      <h3 className="text-primary text-sm sm:text-base crt-glow mb-2">
        {project.title}
      </h3>

      <p
        className="text-muted-foreground text-xs sm:text-sm mb-3 leading-relaxed"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1 mb-4">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-xs sm:text-sm px-2 py-[2px] bg-accent/20 text-accent pixel-border-sm"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link href={project.link} target="_blank" rel="noopener noreferrer">
        <motion.span
          className="pixel-btn bg-primary text-primary-foreground px-4 py-1.5 text-xs sm:text-sm inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ y: 2 }}
        >
          {">"} PLAY DEMO
        </motion.span>
      </Link>
    </motion.div>
  );
}

/**
 * ProjectsArcade — 8-bit replacement for ProjectSection.
 * Horizontal scrollable "cartridge" browser with detail panel.
 */
export function ProjectsArcade() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const selectedProject =
    projects.find((p) => p.id === selectedId) ?? projects[0];

  // Scroll selected cartridge into view
  const scrollToCartridge = useCallback((id: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector(`[data-project-id="${id}"]`);
    if (card) {
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, []);

  // Navigate to adjacent project
  const navigateProject = useCallback(
    (direction: -1 | 1) => {
      const idx = projects.findIndex((p) => p.id === selectedId);
      const nextIdx = Math.max(
        0,
        Math.min(idx + direction, projects.length - 1),
      );
      const nextId = projects[nextIdx].id;
      setSelectedId(nextId);
      scrollToCartridge(nextId);
    },
    [selectedId, scrollToCartridge],
  );

  // Wheel → horizontal scroll mapping
  const handleWheel = useCallback((e: React.WheelEvent) => {
    const container = scrollRef.current;
    if (!container) return;
    // Only intercept vertical wheel when the scroller is hovered
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      e.stopPropagation();
      container.scrollLeft += e.deltaY;
    }
  }, []);

  // Keyboard navigation when section is focused/visible
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onKey = (e: KeyboardEvent) => {
      // Only respond when this section is in viewport
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;

      if (e.key === "ArrowLeft" || e.key === "[") {
        e.preventDefault();
        navigateProject(-1);
      } else if (e.key === "ArrowRight" || e.key === "]") {
        e.preventDefault();
        navigateProject(1);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigateProject]);

  return (
    <section
      ref={sectionRef}
      id="section-4"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-16"
    >
      <CrtWrapper className="w-full max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-muted-foreground text-sm sm:text-base mb-2">
            {"─── "}LEVEL 4{" ───"}
          </p>
          <h2 className="text-primary text-lg sm:text-2xl md:text-3xl crt-glow mb-2">
            PROJECT ARCADE
          </h2>
          <p
            className="text-muted-foreground text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {">> "}CHOOSE YOUR CARTRIDGE
          </p>
        </motion.div>

        {/* Horizontal cartridge scroller */}
        <div className="relative mb-6">
          {/* Left arrow button */}
          <button
            onClick={() => navigateProject(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 pixel-border-sm bg-card/80 hover:bg-primary/20 flex items-center justify-center transition-colors text-primary text-xs sm:text-sm"
            aria-label="Previous project"
          >
            ◀
          </button>

          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar pb-2 px-10 sm:px-12"
            onWheel={handleWheel}
          >
            {projects.map((project, i) => (
              <ProjectCartridge
                key={project.id}
                project={project}
                index={i}
                isSelected={project.id === selectedId}
                onSelect={() => {
                  setSelectedId(project.id);
                  scrollToCartridge(project.id);
                }}
              />
            ))}
          </div>

          {/* Right arrow button */}
          <button
            onClick={() => navigateProject(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 pixel-border-sm bg-card/80 hover:bg-primary/20 flex items-center justify-center transition-colors text-primary text-xs sm:text-sm"
            aria-label="Next project"
          >
            ▶
          </button>

          {/* Scroll fade indicators */}
          <div
            className="absolute left-8 sm:left-10 top-0 h-full w-6 bg-gradient-to-r from-background/80 to-transparent pointer-events-none"
            aria-hidden
          />
          <div
            className="absolute right-8 sm:right-10 top-0 h-full w-6 bg-gradient-to-l from-background/80 to-transparent pointer-events-none"
            aria-hidden
          />
        </div>

        {/* Detail panel */}
        <AnimatePresence mode="wait">
          <ProjectDetail project={selectedProject} />
        </AnimatePresence>

        {/* Game counter */}
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <p
            className="text-muted-foreground text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            CARTRIDGE {projects.findIndex((p) => p.id === selectedId) + 1} OF{" "}
            {projects.length} │ USE [◀ ▶] OR ARROW KEYS
          </p>
        </motion.div>
      </CrtWrapper>
    </section>
  );
}
