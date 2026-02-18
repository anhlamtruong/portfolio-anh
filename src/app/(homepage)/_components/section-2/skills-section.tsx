"use client";

import { BentoGrid, BentoCard, BentoSection } from "../bento/bento-grid";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTRPC } from "../../_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Progress } from "@/components/ui/progress";

/* ─── Skill categories with proficiency (no local icons needed — API icons shown above) ─── */
const SKILL_CATEGORIES: {
  name: string;
  colSpan: string;
  skills: { name: string; level: number }[];
}[] = [
  {
    name: "Languages",
    colSpan: "sm:col-span-2 lg:col-span-2",
    skills: [
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Python", level: 85 },
      { name: "C++", level: 75 },
      { name: "Java", level: 70 },
    ],
  },
  {
    name: "Frontend",
    colSpan: "sm:col-span-2 lg:col-span-2",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 90 },
    ],
  },
  {
    name: "Backend & Cloud",
    colSpan: "sm:col-span-2 lg:col-span-2",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Firebase", level: 85 },
      { name: "Google Cloud", level: 75 },
      { name: "Docker", level: 70 },
    ],
  },
  {
    name: "Tools & Other",
    colSpan: "sm:col-span-2 lg:col-span-2",
    skills: [
      { name: "Git", level: 90 },
      { name: "Redux", level: 80 },
      { name: "Figma", level: 75 },
      { name: "PostgreSQL", level: 75 },
      { name: "MongoDB", level: 70 },
    ],
  },
];

export const SkillsSection = () => {
  /* Still fetch logos for supplemental data (icons, etc.) */
  const trpc = useTRPC();
  const { data: logos } = useSuspenseQuery(
    trpc.homepage.getLogos.queryOptions(),
  );

  return (
    <BentoSection
      title="My Skills"
      subtitle="Technologies and tools I work with daily"
    >
      <TooltipProvider delayDuration={100}>
        <BentoGrid className="lg:grid-cols-4 auto-rows-[minmax(200px,auto)]">
          {/* ── Dynamic skill icons from API (overview card) ── */}
          <BentoCard colSpan="lg:col-span-4" className="flex flex-col">
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              All Technologies
            </h3>
            <div className="flex flex-wrap gap-3 items-center">
              {(logos ?? []).map((icon, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.02, duration: 0.3 }}
                      whileHover={{ scale: 1.2, y: -4 }}
                      className="h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 flex items-center justify-center rounded-lg bg-muted/50 p-1.5 transition-colors hover:bg-muted"
                    >
                      <Image
                        src={icon.path}
                        alt={icon.name}
                        width={32}
                        height={32}
                        className="h-full w-full object-contain"
                      />
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{icon.name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </BentoCard>

          {/* ── Categorized skill cards with proficiency ── */}
          {SKILL_CATEGORIES.map((category) => (
            <BentoCard
              key={category.name}
              colSpan={category.colSpan}
              className="flex flex-col"
            >
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                {category.name}
              </h3>
              <div className="space-y-3 flex-1">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                          {skill.name}
                        </span>
                        <span className="text-[10px] text-muted-foreground ml-2">
                          {skill.level}%
                        </span>
                      </div>
                      <Progress value={skill.level} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </BentoCard>
          ))}
        </BentoGrid>
      </TooltipProvider>
    </BentoSection>
  );
};
