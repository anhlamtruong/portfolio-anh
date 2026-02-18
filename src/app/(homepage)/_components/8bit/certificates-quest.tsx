"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback, useEffect, useRef } from "react";
import { CrtWrapper } from "./crt-wrapper";

// ── Certificate data (mirrored from expandable-card.tsx) ──
const certificates = [
  {
    id: "aws",
    title: "AWS Solutions Architect",
    issuer: "Amazon Web Services",
    date: "AUG 2023",
    icon: "/assets/logos/aws.svg",
    link: "https://cp.certmetrics.com/amazon/en/public/verify/credential/KP71RW6C4M1Q1EWK",
    skills: [
      "Cloud infrastructure design",
      "Cost-effective scaling",
      "Security & compliance",
      "Migration strategy",
    ],
    rarity: "LEGENDARY",
    rarityColor: "text-yellow-400",
  },
  {
    id: "meta",
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "OCT 2024",
    icon: "/assets/logos/meta-icon.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/9Q4LRT7VCCVO",
    skills: [
      "React & JS frameworks",
      "Responsive HTML/CSS",
      "Bootstrap CSS",
      "Portfolio projects",
    ],
    rarity: "EPIC",
    rarityColor: "text-purple-400",
  },
  {
    id: "google-ux",
    title: "Google UX Design",
    issuer: "Google (Coursera)",
    date: "APR 2024",
    icon: "/assets/logos/google-icon.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/CJKM3JF96EZB",
    skills: [
      "User-centered design",
      "Wireframes & prototyping",
      "Usability testing",
      "UX portfolio",
    ],
    rarity: "EPIC",
    rarityColor: "text-purple-400",
  },
  {
    id: "gcloud-leader",
    title: "Google Cloud Digital Leader",
    issuer: "Google Cloud (Coursera)",
    date: "JUL 2024",
    icon: "/assets/logos/google-cloud.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/YXEJRM2ELTNG",
    skills: [
      "Cloud fundamentals",
      "Digital transformation",
      "GCP products & services",
      "App modernization",
    ],
    rarity: "RARE",
    rarityColor: "text-blue-400",
  },
  {
    id: "gcloud-dev",
    title: "Google Cloud Developer",
    issuer: "Google Cloud (Coursera)",
    date: "AUG 2024",
    icon: "/assets/logos/google-cloud.svg",
    link: "https://www.coursera.org/account/accomplishments/specialization/certificate/PMUATOWH1TZP",
    skills: [
      "GCP core services",
      "App Engine & GKE",
      "Cloud monitoring",
      "CI/CD pipelines",
    ],
    rarity: "RARE",
    rarityColor: "text-blue-400",
  },
];

// ── Certificate quest card ──
function QuestCard({
  cert,
  index,
  isActive,
  onSelect,
}: {
  cert: (typeof certificates)[number];
  index: number;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <motion.button
      className={`w-full pixel-border bg-card/60 p-3 sm:p-4 flex items-center gap-3 text-left group cursor-pointer transition-colors ${
        isActive
          ? "bg-primary/10 border-primary"
          : "hover:bg-card/80"
      }`}
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 + index * 0.1, type: "spring", damping: 15 }}
      onClick={onSelect}
      whileHover={{ x: 4 }}
      role="tab"
      aria-selected={isActive}
      tabIndex={0}
    >
      {/* Icon */}
      <div className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 pixel-border-sm bg-muted/50 p-1 overflow-hidden flex items-center justify-center">
        <Image
          src={cert.icon}
          alt={cert.title}
          width={32}
          height={32}
          className="w-full h-full object-contain"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-primary text-[8px] sm:text-[10px] truncate">
            {cert.title.toUpperCase()}
          </h3>
          <span
            className={`text-[6px] sm:text-[7px] px-1 py-[1px] bg-card pixel-border-sm ${cert.rarityColor}`}
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {cert.rarity}
          </span>
        </div>
        <p
          className="text-muted-foreground text-[6px] sm:text-[8px]"
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          {cert.issuer} · {cert.date}
        </p>
      </div>

      {/* Arrow */}
      <span
        className={`text-muted-foreground text-[10px] sm:text-xs shrink-0 ${
          isActive ? "text-primary crt-glow" : ""
        }`}
      >
        {isActive ? "▶" : "▷"}
      </span>
    </motion.button>
  );
}

// ── Expanded detail panel ──
function QuestDetail({ cert }: { cert: (typeof certificates)[number] }) {
  return (
    <motion.div
      key={cert.id}
      className="pixel-border bg-card/70 p-4 sm:p-6 origin-center"
      initial={{ opacity: 0, scaleY: 0.005, scaleX: 1, filter: "brightness(5)" }}
      animate={{ opacity: 1, scaleY: 1, scaleX: 1, filter: "brightness(1)" }}
      exit={{ opacity: 0, scaleY: 0.005, scaleX: 1, filter: "brightness(5)" }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-12 h-12 pixel-border-sm bg-muted/50 p-1 shrink-0 flex items-center justify-center">
          <Image
            src={cert.icon}
            alt={cert.title}
            width={40}
            height={40}
            className="w-full h-full object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div>
          <h3 className="text-primary text-[10px] sm:text-xs crt-glow">
            {cert.title.toUpperCase()}
          </h3>
          <p
            className="text-muted-foreground text-[7px] sm:text-[9px]"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            QUEST COMPLETED: {cert.date}
          </p>
        </div>
      </div>

      {/* Unlocked skills */}
      <div className="mb-4">
        <p
          className="text-accent text-[7px] sm:text-[9px] mb-2"
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          {">> "}SKILLS UNLOCKED:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
          {cert.skills.map((skill, i) => (
            <motion.div
              key={skill}
              className="flex items-center gap-2 text-[7px] sm:text-[9px]"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              <span className="text-primary">✦</span>
              <span className="text-foreground">{skill}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <motion.a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="pixel-btn bg-primary text-primary-foreground px-4 py-1 text-[7px] sm:text-[9px] inline-block"
        whileHover={{ scale: 1.05 }}
        whileTap={{ y: 2 }}
      >
        {">"} VERIFY CERTIFICATE
      </motion.a>
    </motion.div>
  );
}

/**
 * CertificatesQuest — 8-bit replacement for CertificatesSection.
 * A "quest log" style list with expandable details.
 */
export function CertificatesQuest() {
  const [activeId, setActiveId] = useState<string>(certificates[0].id);
  const activeCert = certificates.find((c) => c.id === activeId) ?? certificates[0];
  const listRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation for quest list
  const navigateCert = useCallback(
    (direction: -1 | 1) => {
      const idx = certificates.findIndex((c) => c.id === activeId);
      const nextIdx = Math.max(0, Math.min(idx + direction, certificates.length - 1));
      setActiveId(certificates[nextIdx].id);
    },
    [activeId],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateCert(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateCert(1);
      }
    };

    list.addEventListener("keydown", onKey);
    return () => list.removeEventListener("keydown", onKey);
  }, [navigateCert]);

  return (
    <section
      id="section-3"
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
          <p className="text-muted-foreground text-[8px] sm:text-[10px] mb-2">
            {"─── "}LEVEL 3{" ───"}
          </p>
          <h2 className="text-primary text-sm sm:text-lg md:text-xl crt-glow mb-2">
            CERTIFICATES QUEST
          </h2>
          <p
            className="text-muted-foreground text-[7px] sm:text-[9px]"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {">> "}SELECT A QUEST TO VIEW DETAILS
          </p>
        </motion.div>

        {/* Quest log layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Left: Quest list */}
          <div ref={listRef} className="flex flex-col gap-2" role="tablist" aria-label="Certificate quests">
            {certificates.map((cert, i) => (
              <QuestCard
                key={cert.id}
                cert={cert}
                index={i}
                isActive={cert.id === activeId}
                onSelect={() => setActiveId(cert.id)}
              />
            ))}
          </div>

          {/* Right: Detail panel */}
          <div role="tabpanel" aria-label={activeCert.title}>
            <AnimatePresence mode="wait">
              <QuestDetail cert={activeCert} />
            </AnimatePresence>
            {/* Mobile close hint */}
            <p
              className="text-center text-muted-foreground text-[6px] mt-2 md:hidden"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              ↑ SELECT ANOTHER QUEST ABOVE ↑
            </p>
          </div>
        </div>

        {/* Quest completion bar */}
        <motion.div
          className="mt-8 pixel-border bg-card/50 px-4 py-2 flex items-center gap-3 max-w-sm mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          <span className="text-accent text-[7px] sm:text-[9px]">
            QUESTS COMPLETED:
          </span>
          <div className="flex-1 h-2 bg-muted pixel-border-sm overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 1.5 }}
            />
          </div>
          <span className="text-primary text-[7px] sm:text-[9px]">
            {certificates.length}/{certificates.length}
          </span>
        </motion.div>
      </CrtWrapper>
    </section>
  );
}
