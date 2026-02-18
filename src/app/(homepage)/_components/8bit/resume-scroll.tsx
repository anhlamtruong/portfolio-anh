"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CrtWrapper } from "./crt-wrapper";

const RESUME_DOWNLOAD_URL =
  "https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da";

// ── Highlight data (mirrored from resume-section.tsx) ──
const highlights = [
  {
    icon: "⚔",
    label: "LANGUAGES",
    value: "Python, C++, JavaScript, React",
    color: "text-teal-300",
  },
  {
    icon: "🤖",
    label: "AI CHATBOT",
    value: "Built for 2K+ students, 100+ staff",
    color: "text-cyan-300",
  },
  {
    icon: "🔗",
    label: "TEAM LEAD",
    value: "Led 7 people, 10 clients, 500+ monthly jobs",
    color: "text-indigo-300",
  },
  {
    icon: "📚",
    label: "TUTOR",
    value: "DSA (C++) for 300+ students, 80% pass rate",
    color: "text-orange-300",
  },
  {
    icon: "💰",
    label: "REVENUE",
    value: "Cookit React project generated $1K+",
    color: "text-lime-300",
  },
  {
    icon: "🎓",
    label: "MIGRATION",
    value: "2K+ student records, 100% accuracy",
    color: "text-blue-300",
  },
  {
    icon: "👥",
    label: "FOLLOWERS",
    value: "1K+ on Threads Tech",
    color: "text-yellow-300",
  },
];

// ── Stat row ──
function StatRow({
  stat,
  index,
}: {
  stat: (typeof highlights)[number];
  index: number;
}) {
  return (
    <motion.div
      className="flex items-start gap-3 pixel-border-sm bg-card/40 p-2 sm:p-3"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 + index * 0.08, type: "spring", damping: 15 }}
    >
      <span className="text-sm sm:text-base shrink-0">{stat.icon}</span>
      <div className="min-w-0">
        <span
          className={`text-[7px] sm:text-[9px] ${stat.color} font-bold`}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          {stat.label}
        </span>
        <p
          className="text-muted-foreground text-[7px] sm:text-[9px] leading-snug"
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          {stat.value}
        </p>
      </div>
    </motion.div>
  );
}

/**
 * ResumeScroll — 8-bit replacement for ResumeSection.
 * An "ancient scroll" / RPG stat sheet style resume view.
 */
export function ResumeScroll() {
  return (
    <section
      id="section-10"
      className="min-h-screen w-full flex flex-col items-center justify-center relative px-4 py-16"
    >
      <CrtWrapper className="w-full max-w-3xl mx-auto">
        {/* Section header — Final Boss reveal */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-yellow-400 text-[8px] sm:text-[10px] mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            ⚠ WARNING ⚠
          </motion.p>
          <p className="text-muted-foreground text-[8px] sm:text-[10px] mb-2">
            {"─── "}FINAL BOSS{" ───"}
          </p>
          <h2 className="text-primary text-sm sm:text-lg md:text-xl crt-glow mb-2">
            RESUME SCROLL
          </h2>
          <p
            className="text-muted-foreground text-[7px] sm:text-[9px]"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            {">> "}DEFEAT THE BOSS TO CLAIM YOUR REWARD
          </p>
        </motion.div>

        {/* Character card */}
        <motion.div
          className="pixel-border bg-card/60 p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Character header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-muted">
            <div>
              <h3 className="text-primary text-[10px] sm:text-xs crt-glow">
                LAM ANH TRUONG
              </h3>
              <p
                className="text-muted-foreground text-[7px] sm:text-[9px]"
                style={{ fontFamily: "var(--font-vt323), monospace" }}
              >
                CLASS: FULL-STACK DEVELOPER │ LVL: 99
              </p>
            </div>
            <div
              className="text-right"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              <p className="text-accent text-[7px] sm:text-[9px]">HP: ████████ 99/99</p>
              <p className="text-primary text-[7px] sm:text-[9px]">MP: ███████░ 87/99</p>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            {highlights.map((stat, i) => (
              <StatRow key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {/* XP bar */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <span
              className="text-accent text-[7px] sm:text-[9px] shrink-0"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              EXP:
            </span>
            <div className="flex-1 h-3 bg-muted pixel-border-sm overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "0%" }}
                whileInView={{ width: "85%" }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 2, ease: "easeOut" }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center text-[6px] text-primary-foreground"
                style={{ fontFamily: "var(--font-vt323), monospace" }}
              >
                8500 / 10000
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Boss Defeated — Reward Section */}
        <motion.div
          className="pixel-border bg-yellow-400/5 border-yellow-400/30 p-4 sm:p-6 mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, type: "spring", damping: 15 }}
        >
          <p
            className="text-yellow-400 text-center text-[8px] sm:text-[10px] mb-3 crt-glow"
            style={{ fontFamily: "var(--font-vt323), monospace" }}
          >
            ★ BOSS DEFEATED! CLAIM YOUR REWARD ★
          </p>

          {/* PDF preview on large screens */}
          <div className="hidden lg:block mb-4">
            <div className="pixel-border-sm bg-muted/30 w-full aspect-[8.5/5] overflow-hidden">
              <iframe
                src={`${RESUME_DOWNLOAD_URL}#toolbar=0`}
                title="Resume Preview"
                className="w-full h-full"
                style={{ border: "none" }}
              />
            </div>
          </div>

          <div className="text-center">
            <Link
              href={RESUME_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              download="Truong_Resume.pdf"
            >
              <motion.span
                className="pixel-btn bg-yellow-400 text-black px-6 py-2 text-[8px] sm:text-[10px] inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ y: 2 }}
              >
                {">"} COLLECT RESUME SCROLL
              </motion.span>
            </Link>
            <p
              className="text-muted-foreground text-[6px] sm:text-[8px] mt-3"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              +500 EXP │ LEGENDARY DROP │ EXPORT AS .PDF
            </p>
          </div>
        </motion.div>
      </CrtWrapper>
    </section>
  );
}
