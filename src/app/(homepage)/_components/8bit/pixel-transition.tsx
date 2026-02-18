"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { useEditorStore } from "@/services/theme";

/**
 * PixelTransition — wraps page content with a "screen wipe"
 * transition effect when in 8-bit layout mode.
 * In modern mode, renders children directly with no animation.
 */
export function PixelTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const layoutMode = useEditorStore((s) => s.themeState.layoutMode);

  // Skip transition for modern mode
  if (layoutMode !== "8bit") {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative w-full h-full">
        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {children}
        </motion.div>

        {/* Wipe-in overlay (covers screen then shrinks away) */}
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none"
          style={{
            background: "hsl(var(--background))",
            transformOrigin: "left",
          }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        />

        {/* Pixelated scanline flash */}
        <motion.div
          className="fixed inset-0 z-[9998] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,0,0.03) 2px, rgba(0,255,0,0.03) 4px)",
          }}
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
