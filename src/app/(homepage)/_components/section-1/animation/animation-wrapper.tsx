import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import React from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
  variants?: Variants; // Optional variants prop to customize animations
  className?: string; // Optional className prop for styling
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  children,
  variants,
  className,
}) => {
  // Define the animation variants for sliding in from the left with opacity change
  const defaultVariants = {
    hidden: { opacity: 0, x: -100 }, // Start hidden with opacity 0 and moved to the left
    visible: {
      opacity: 1,
      x: 0, // Fully visible and in the original position
      transition: {
        type: "spring", // Use spring for bounce
        stiffness: 100, // Control the strength of the spring (higher = stronger bounce)
        damping: 10, // Control the friction (lower = more bounce)
        mass: 0.75, // Adjust the mass to make it bounce more naturally
        duration: 0.8, // Duration of the animation
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants || defaultVariants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
