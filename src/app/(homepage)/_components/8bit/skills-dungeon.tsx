"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";
import { CrtWrapper } from "./crt-wrapper";
import { useTRPC } from "../../_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

// ── Pixel skill tile ──
function SkillTile({
  icon,
  delay,
}: {
  icon: { path: string; name: string };
  delay: number;
}) {
  return (
    <motion.button
      className="pixel-border-sm bg-card/60 backdrop-blur-none p-2 sm:p-3 flex flex-col items-center gap-1 cursor-pointer group hover-glitch"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, type: "spring", damping: 15 }}
      whileHover={{
        scale: 1.15,
        transition: { duration: 0.1 },
      }}
      whileTap={{ scale: 0.9 }}
      onClick={() => toast(`SKILL UNLOCKED: ${icon.name}`)}
    >
      <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
        <Image
          src={icon.path}
          alt={icon.name}
          width={32}
          height={32}
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>
      <span
        className="text-[11px] sm:text-sm text-muted-foreground group-hover:text-primary transition-colors truncate max-w-[70px] text-center"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        {icon.name.toUpperCase()}
      </span>
    </motion.button>
  );
}

// ── Dungeon floor row ──
function DungeonFloor({
  icons,
  floorNumber,
  startDelay,
}: {
  icons: { path: string; name: string }[];
  floorNumber: number;
  startDelay: number;
}) {
  return (
    <motion.div
      className="flex items-center gap-2 sm:gap-3"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: startDelay }}
    >
      {/* Floor label */}
      <span
        className="text-accent text-xs sm:text-sm w-10 sm:w-12 text-right shrink-0 crt-glow"
        style={{ fontFamily: "var(--font-vt323), monospace" }}
      >
        F{floorNumber}
      </span>

      {/* Separator */}
      <span className="text-muted-foreground text-sm">│</span>

      {/* Skill tiles — grid on mobile, flex on desktop */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
        {icons.map((icon, i) => (
          <SkillTile
            key={`${icon.name}-${i}`}
            icon={icon}
            delay={startDelay + i * 0.06}
          />
        ))}
      </div>
    </motion.div>
  );
}

/**
 * SkillsDungeon — 8-bit replacement for SkillsSection.
 * Displays skills as a "dungeon" of floors, each with a row of pixel skill tiles.
 * Fetches logos from tRPC like the original EiffelTower.
 */
export function SkillsDungeon() {
  const trpc = useTRPC();
  const { data: logos } = useSuspenseQuery(
    trpc.homepage.getLogos.queryOptions(),
  );

  // Fallback local icons
  const fallbackIcons = [
    { path: "/assets/logos/javascript.svg", name: "JavaScript" },
    { path: "/assets/logos/typescript.svg", name: "TypeScript" },
  ];

  const allIcons = logos && logos.length > 0 ? logos : fallbackIcons;

  // Distribute icons across dungeon floors (progressive widening)
  const floorSizes = [1, 2, 3, 3, 4, 5, 6, 7, 8, 10];
  const floors: { path: string; name: string }[][] = [];
  let idx = 0;
  for (const size of floorSizes) {
    if (idx >= allIcons.length) break;
    floors.push(allIcons.slice(idx, idx + size));
    idx += size;
  }
  // If leftover, push remaining
  if (idx < allIcons.length) {
    floors.push(allIcons.slice(idx));
  }

  return (
    <section
      id="section-2"
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
            {"─── "}LEVEL 2{" ───"}
          </p>
          <h2 className="text-primary text-lg sm:text-2xl md:text-3xl crt-glow mb-2">
            SKILLS DUNGEON
          </h2>
          <p
            className="text-muted-foreground text-xs sm:text-sm"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {">> "}TAP A SKILL TO INSPECT IT
          </p>
        </motion.div>

        {/* Dungeon floors */}
        <div className="flex flex-col gap-3 sm:gap-4 items-center">
          {floors.map((floorIcons, i) => (
            <DungeonFloor
              key={i}
              icons={floorIcons}
              floorNumber={floors.length - i}
              startDelay={0.3 + i * 0.1}
            />
          ))}
        </div>

        {/* Stats bar */}
        <motion.div
          className="mt-8 pixel-border bg-card/50 px-4 py-2 flex justify-between text-xs sm:text-sm max-w-md mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          <span className="text-accent">SKILLS FOUND: {allIcons.length}</span>
          <span className="text-primary">FLOORS: {floors.length}</span>
          <span className="text-secondary-foreground">RANK: S+</span>
        </motion.div>
      </CrtWrapper>
    </section>
  );
}
