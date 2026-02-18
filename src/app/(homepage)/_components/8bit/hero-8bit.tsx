"use client";

import { motion } from "framer-motion";
import { CrtWrapper } from "./crt-wrapper";
import { useTRPC } from "../../_trpc/client";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Image from "next/image";

// ── Typewriter text component ──
function TypewriterText({
  text,
  delay = 0,
  speed = 0.06,
  className,
}: {
  text: string;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: speed,
            delayChildren: delay,
          },
        },
      }}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          variants={{
            hidden: { opacity: 0, y: -10, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { type: "spring", damping: 12 },
            },
          }}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : undefined }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

// ── Pixel counter display ──
function PixelCounter({ count }: { count: number }) {
  const digits = count.toString().padStart(6, "0");
  return (
    <div className="flex items-center gap-1">
      <span className="text-accent text-sm sm:text-base mr-2 crt-glow">
        VISITORS:
      </span>
      <div className="flex gap-[2px]">
        {digits.split("").map((d, i) => (
          <motion.span
            key={i}
            className="inline-flex items-center justify-center bg-card text-primary w-7 h-9 sm:w-9 sm:h-11 text-base sm:text-lg pixel-border-sm font-mono"
            initial={{ rotateX: -90 }}
            animate={{ rotateX: 0 }}
            transition={{ delay: 0.8 + i * 0.1, type: "spring", damping: 15 }}
          >
            {d}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

// ── Pixel avatar with posterization effect ──
function PixelAvatar() {
  return (
    <motion.div
      className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-4"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 0.2, type: "spring", damping: 12 }}
    >
      <div className="pixel-border w-full h-full overflow-hidden bg-muted">
        <Image
          src="/assets/img/ava.jpg"
          alt="Pixel Avatar"
          width={128}
          height={128}
          className="w-full h-full object-cover"
          style={{
            imageRendering: "pixelated",
            filter: "contrast(1.4) saturate(1.2)",
          }}
          priority
        />
      </div>
      {/* Pixel badge */}
      <motion.div
        className="absolute -bottom-1 -right-1 bg-accent text-accent-foreground text-xs px-2 py-[2px] pixel-border-sm"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring" }}
      >
        LV.99
      </motion.div>
    </motion.div>
  );
}

/**
 * Hero8Bit — 8-bit replacement for AboutMeSection.
 * Pixel avatar, typewriter title, visitor counter as "SCORE".
 */
export function Hero8Bit() {
  const trpc = useTRPC();
  const { data: viewCount } = useSuspenseQuery(
    trpc.homepage.getPageView.queryOptions(),
  );
  const incrementMutation = useMutation(
    trpc.homepage.incrementPageView.mutationOptions({
      onError(error) {
        console.error("Error incrementing view count:", error);
      },
    }),
  );
  const [hasIncremented, setHasIncremented] = useState(false);

  useEffect(() => {
    if (!hasIncremented) {
      incrementMutation.mutate();
      setHasIncremented(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const count = parseInt(viewCount?.count ?? "0", 10);

  return (
    <CrtWrapper className="h-screen w-full flex flex-col items-center justify-center px-4 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Pixel avatar */}
        <PixelAvatar />

        {/* Title */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-primary text-xl sm:text-3xl md:text-4xl crt-glow mb-3 leading-relaxed">
            <TypewriterText text="WELCOME TO MY WORLD" delay={0.5} />
          </h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            <p
              className="text-muted-foreground text-sm sm:text-base leading-relaxed"
              style={{ fontFamily: "var(--font-vt323), monospace" }}
            >
              {">> "}WEB DEVELOPER | SOFTWARE ENGINEER | TECH ENTHUSIAST
            </p>
          </motion.div>
        </motion.div>

        {/* Visitor counter = "SCORE" */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0 }}
        >
          <PixelCounter count={count} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.3 }}
        >
          <motion.button
            className="pixel-btn bg-primary text-primary-foreground px-6 py-2.5 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ y: 2 }}
            onClick={() =>
              document
                .getElementById("section-2")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {">"} VIEW SKILLS
          </motion.button>
          <motion.button
            className="pixel-btn bg-accent text-accent-foreground px-6 py-2.5 text-sm sm:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ y: 2 }}
            onClick={() =>
              document
                .getElementById("section-4")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {">"} VIEW PROJECTS
          </motion.button>
        </motion.div>

        {/* Blinking prompt */}
        <motion.p
          className="mt-8 text-muted-foreground text-xs sm:text-sm typewriter-cursor inline-block pr-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          style={{ fontFamily: "var(--font-vt323), monospace" }}
        >
          SCROLL DOWN TO CONTINUE...
        </motion.p>
      </div>
    </CrtWrapper>
  );
}
