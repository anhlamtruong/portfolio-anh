"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { LINK_DATA, TECH_TAGS } from "./_data/links";

function PixelLinkButton({
  link,
  index,
}: {
  link: (typeof LINK_DATA)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 + index * 0.08, type: "spring", damping: 15 }}
    >
      <Link
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="pixel-border bg-card/60 hover:bg-primary/10 p-3 flex items-center gap-3 group transition-colors w-full"
      >
        <span className="text-base sm:text-lg shrink-0">{link.emoji}</span>
        <span className="text-primary text-[8px] sm:text-[10px] group-hover:crt-glow flex-1">
          {link.title.toUpperCase()}
        </span>
        <span
          className="text-muted-foreground text-[8px] sm:text-[10px] group-hover:text-primary"
        >
          ▶
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Links8Bit — 8-bit pixel variant for the /links page.
 */
export function Links8Bit() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start p-4 pt-16 sm:pt-8"
      style={{
        fontFamily: "var(--font-pixel), var(--font-vt323), monospace",
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--card)) 100%)",
      }}
    >
      <div className="w-full max-w-md mx-auto">
        {/* Avatar */}
        <motion.div
          className="flex justify-center mb-4"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.1, type: "spring", damping: 12 }}
        >
          <div className="pixel-border w-20 h-20 sm:w-24 sm:h-24 overflow-hidden bg-muted">
            <Image
              src="/assets/img/ava.jpg"
              alt="Pixel Avatar"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              style={{
                imageRendering: "pixelated",
                filter: "contrast(1.4) saturate(1.2)",
              }}
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.div
          className="text-center mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-primary text-sm sm:text-base crt-glow">
            LAM ANH TRUONG
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-center text-muted-foreground text-[7px] sm:text-[9px] mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          {">> "}WEB DEV │ SOFTWARE ENG │ TECH ENTHUSIAST
        </motion.p>

        {/* Tech icons as text tags */}
        <motion.div
          className="flex justify-center gap-2 mb-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          {TECH_TAGS.map((tech) => (
            <span
              key={tech}
              className="text-[6px] sm:text-[7px] px-2 py-[2px] pixel-border-sm bg-card/60 text-accent"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              {tech}
            </span>
          ))}
        </motion.div>

        {/* Menu label */}
        <motion.p
          className="text-center text-accent text-[7px] sm:text-[9px] mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          ─── SELECT AN OPTION ───
        </motion.p>

        {/* Links */}
        <div className="flex flex-col gap-2">
          {LINK_DATA.map((link, i) => (
            <PixelLinkButton key={link.title} link={link} index={i} />
          ))}
        </div>

        {/* Footer */}
        <motion.p
          className="text-center text-muted-foreground text-[6px] sm:text-[7px] mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          PRESS START │ © 2025 LAM ANH TRUONG
        </motion.p>
      </div>
    </div>
  );
}
