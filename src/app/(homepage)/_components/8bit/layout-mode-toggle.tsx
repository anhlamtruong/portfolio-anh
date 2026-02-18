"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Palette } from "lucide-react";
import { useEditorStore } from "@/services/theme/store";
import { cn } from "@/lib/utils";

/**
 * Layout Mode Toggle — floating action button that switches between
 * "modern" and "8-bit" layout modes with a TV off/on transition effect.
 */
export function LayoutModeToggle() {
  const { themeState, applyThemePreset } = useEditorStore();
  const layoutMode = themeState.layoutMode ?? "modern";
  const [transitioning, setTransitioning] = useState(false);
  const is8Bit = layoutMode === "8bit";

  const handleToggle = useCallback(() => {
    if (transitioning) return;
    setTransitioning(true);

    // After TV-off animation (400ms), swap theme, then play TV-on
    setTimeout(() => {
      if (is8Bit) {
        // Switch to modern-minimal (or previous preset)
        applyThemePreset("modern-minimal");
      } else {
        applyThemePreset("8-bit");
      }

      // Let the new theme apply, then start TV-on
      setTimeout(() => {
        setTransitioning(false);
      }, 450);
    }, 420);
  }, [transitioning, is8Bit, applyThemePreset]);

  return (
    <>
      {/* TV transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <div className="w-full h-full flex items-center justify-center bg-black">
              <motion.div
                className="w-full bg-white"
                initial={{ height: "100vh", opacity: 1 }}
                animate={{
                  height: ["100vh", "2px", "2px", "100vh"],
                  opacity: [1, 1, 1, 1],
                }}
                transition={{
                  duration: 0.85,
                  times: [0, 0.35, 0.55, 1],
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={handleToggle}
        disabled={transitioning}
        className={cn(
          "fixed bottom-6 right-6 z-[999] flex items-center gap-2 rounded-full px-4 py-3",
          "shadow-lg transition-colors",
          is8Bit
            ? "pixel-btn bg-primary text-primary-foreground !rounded-none"
            : "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={is8Bit ? "Switch to Modern" : "Switch to 8-Bit"}
        aria-label={is8Bit ? "Switch to Modern layout" : "Switch to 8-Bit layout"}
      >
        {is8Bit ? (
          <>
            <Palette className="h-5 w-5" />
            <span className="hidden sm:inline text-[8px]">MODERN</span>
          </>
        ) : (
          <>
            <Gamepad2 className="h-5 w-5" />
            <span className="hidden sm:inline text-xs font-medium">8-Bit</span>
          </>
        )}
      </motion.button>
    </>
  );
}
