import { motion } from "framer-motion";
import React from "react";

interface AnimatedWrapperProps {
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({ children }) => {
  // Define the animation variants for sliding in from the left with opacity change
  const variants = {
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
      animate="visible"
      exit="hidden" // Optional: Animate on unmount if used in routes
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
