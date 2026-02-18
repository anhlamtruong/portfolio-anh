"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Sparkles } from "lucide-react";
import { useEditorStore } from "@/services/theme/store";
import { cn } from "@/lib/utils";

/**
 * Layout Mode Toggle — eye-catching floating pill that switches between
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
        applyThemePreset("modern-minimal");
      } else {
        applyThemePreset("8-bit");
      }

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

      {/* Toggle button — eye-catching pill with glow */}
      <motion.button
        onClick={handleToggle}
        disabled={transitioning}
        className={cn(
          "fixed bottom-6 right-6 z-[999] group",
          "flex items-center gap-2.5 px-5 py-3",
          "font-semibold tracking-wide",
          "shadow-xl transition-all duration-300",
          is8Bit
            ? [
                "pixel-btn !rounded-none border-2 border-[var(--crt-green,#39ff14)]",
                "bg-black/90 text-[#39ff14]",
                "shadow-[0_0_20px_rgba(57,255,20,0.4),inset_0_0_12px_rgba(57,255,20,0.1)]",
                "hover:shadow-[0_0_30px_rgba(57,255,20,0.6),inset_0_0_20px_rgba(57,255,20,0.15)]",
              ]
            : [
                "rounded-full",
                "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600",
                "text-white",
                "shadow-[0_0_20px_rgba(139,92,246,0.4)]",
                "hover:shadow-[0_0_30px_rgba(139,92,246,0.6)]",
                "hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500",
              ],
        )}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        title={is8Bit ? "Switch to Modern" : "Switch to 8-Bit"}
        aria-label={
          is8Bit ? "Switch to Modern layout" : "Switch to 8-Bit layout"
        }
      >
        {/* Animated glow ring behind the button */}
        <span
          className={cn(
            "absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            is8Bit
              ? "animate-pulse bg-[#39ff14]/10"
              : "animate-pulse bg-purple-400/20",
          )}
        />

        {is8Bit ? (
          <>
            <Sparkles className="h-4 w-4 relative" />
            <span className="relative text-[10px] uppercase tracking-widest">
              Modern
            </span>
          </>
        ) : (
          <>
            <Gamepad2 className="h-5 w-5 relative" />
            <span className="relative text-sm">Retro</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
          </>
        )}
      </motion.button>
    </>
  );
}
