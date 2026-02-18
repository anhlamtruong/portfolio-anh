"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function ScrollProgress() {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = document.querySelector(".snap-mandatory");
    if (el instanceof HTMLElement) {
      containerRef.current = el;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>,
  });

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-primary z-50"
    />
  );
}
