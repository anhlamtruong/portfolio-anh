"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface FadeInOutWrapperProps {
  children: ReactNode;
  show?: boolean;
  className?: string;
  duration?: number;
}

const FadeInOutWrapper = ({
  children,
  show = true,
  className = "",
  duration = 0.5,
}: FadeInOutWrapperProps) => {
  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="fade"
          className={className}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FadeInOutWrapper;
