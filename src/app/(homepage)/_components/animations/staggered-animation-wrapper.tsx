// components/animations/StaggeredAnimationWrapper.tsx

"use client";

import { motion, Variants } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  // Optional: allows you to customize the stagger delay
  staggerAmount?: number;
  // Optional: determines if the animation runs once or every time
  once?: boolean;
}
/**
 * StaggeredAnimationWrapper
 *
 * Developer notes:
 * - Wrap a list of elements with this component to animate children in a staggered entrance.
 * - Each direct child will be wrapped in a motion.div and animated using the configured itemVariants.
 * - Keep children as static elements (e.g., <div>, <li>, <Card />) so animations remain stable.
 *
 * Props:
 * - children: React nodes to animate.
 * - staggerAmount (number, default 0.07): delay (in seconds) between each child's animation start.
 * - once (boolean, default false): if true, animation will run only once when the element enters the viewport.
 *
 * Usage:
 * <StaggeredAnimationWrapper staggerAmount={0.1} once>
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggeredAnimationWrapper>
 *
 * Accessibility & Performance:
 * - Avoid animating large numbers of complex children; prefer pagination or virtualization for long lists.
 * - If content is interactive, ensure focus and screen-reader order are preserved; animation wrappers do not alter DOM order.
 * - Use `once={true}` for initial-load-only animations to reduce repeated work while scrolling.
 *
 * Caveats:
 * - The wrapper uses whileInView so SSR will render children unanimated; use prefetch/suspense if you need server-side prefetching.
 * - If children already use framer-motion `variants`, they may conflict with the applied itemVariants.
 */
const StaggeredAnimationWrapper = ({
  children,
  staggerAmount = 0.07,
  once = false,
}: Props) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerAmount,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
    >
      {React.Children.map(children, (child) => (
        <motion.div variants={itemVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredAnimationWrapper;
