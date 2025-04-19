/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { ReactNode, useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CarouselAnimationType,
  CarouselConfig,
  carouselVariants,
  defaultCarouselConfig,
} from "./doodle-meme-carousel-config";

interface DoodleMemeCarousalProps {
  children: React.ReactNode[];
  className?: string;
  enableSwipe?: boolean;
  enableKeyboard?: boolean;
  enableButtons?: boolean;
  config?: CarouselConfig | Record<string, any>;
}

export interface TransitionState {
  index: number;
  axis: "x" | "y"; // which axis the animation uses
  direction: number; // +1 or -1 (e.g. down/right = +1, up/left = -1)
}

// Pixels threshold for a swipe gesture
const SWIPE_THRESHOLD = 100;

/**
 * triggerTransition:
 * For dynamic slides, we use a simple approach:
 * - For forward navigation (swipe down or right, positive values), next index = (current index + 1) mod total.
 * - For backward navigation (swipe up or left, negative values), next index = (current index - 1 + total) mod total.
 */
const DoodleMemeCarousal: React.FC<DoodleMemeCarousalProps> = ({
  children,
  className,
  enableSwipe = true,
  enableKeyboard = true,
  enableButtons = true,
  config = defaultCarouselConfig,
}) => {
  const [state, setState] = useState<TransitionState>({
    index: 0,
    axis: "y", // default axis for the animation
    direction: 1,
  });

  const triggerTransition = useCallback(
    (axis: "x" | "y", direction: number) => {
      setState((prev) => {
        const n = children.length;
        const nextIndex =
          direction > 0 ? (prev.index + 1) % n : (prev.index - 1 + n) % n;
        return { index: nextIndex, axis, direction };
      });
    },
    [children.length]
  );

  // We'll use ArrowDown/ArrowRight for forward and ArrowUp/ArrowLeft for backward.
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enableKeyboard) return;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        triggerTransition(e.key === "ArrowDown" ? "y" : "x", 1);
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        triggerTransition(e.key === "ArrowUp" ? "y" : "x", -1);
      }
    },
    [enableKeyboard, triggerTransition]
  );

  useEffect(() => {
    if (enableKeyboard) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
  }, [enableKeyboard, handleKeyDown]);

  // Animation variants for the transitions.
  const variants =
    carouselVariants[config.animationType as CarouselAnimationType];

  // Handle drag (swipe) gestures.
  const handleDragEnd = (
    e: MouseEvent | TouchEvent | PointerEvent,
    info: {
      offset: { x: number; y: number };
      velocity: { x: number; y: number };
    }
  ) => {
    // console.log("Drag ended", info.offset, info.velocity);

    if (!enableSwipe) return;
    // Determine dominant drag axis.
    if (Math.abs(info.offset.x) > Math.abs(info.offset.y)) {
      // Horizontal drag:
      if (info.offset.x > SWIPE_THRESHOLD) {
        triggerTransition("x", -1);
      } else if (info.offset.x < -SWIPE_THRESHOLD) {
        triggerTransition("x", 1);
      }
    } else {
      // Vertical drag:
      if (info.offset.y > SWIPE_THRESHOLD) {
        triggerTransition("y", -1);
      } else if (info.offset.y < -SWIPE_THRESHOLD) {
        triggerTransition("y", 1);
      }
    }
  };

  return (
    <>
      <div
        className={cn(
          className,
          "relative w-full h-full overflow-hidden pointer-events-none"
        )}
      >
        <AnimatePresence initial={false} custom={state}>
          <motion.div
            key={state.index}
            custom={{ ...state }}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {
                type: "spring",
                stiffness: config.springStiffness,
                damping: config.springDamping,
              },
              y: {
                type: "spring",
                stiffness: config.springStiffness,
                damping: config.springDamping,
              },
              opacity: { duration: config.opacityDuration, ease: "easeInOut" },
            }}
            drag={enableSwipe ? true : false}
            dragElastic={config.dragElastic}
            dragConstraints={config.dragConstraints}
            onDragEnd={handleDragEnd}
            className="absolute w-full pointer-events-auto"
          >
            {children[state.index]}
          </motion.div>
        </AnimatePresence>
        {enableButtons && (
          <div className="absolute inset-0 flex items-end justify-center px-4 [&>*]:pointer-events-auto ">
            <div className="flex gap-4 items-center">
              <PrevButton
                onClickHandler={() => triggerTransition("x", -1)}
                className="p-2 bg-gray-800 text-white rounded-sm focus:outline-none"
              >
                Left
              </PrevButton>
              <div className="flex flex-col gap-2">
                <PrevButton
                  onClickHandler={() => triggerTransition("y", -1)}
                  className="p-2 bg-gray-800 text-white rounded-sm focus:outline-none"
                >
                  Up
                </PrevButton>
                <NextButton
                  onClickHandler={() => triggerTransition("y", 1)}
                  className="p-2 bg-gray-800 text-white rounded-sm focus:outline-none"
                >
                  Down
                </NextButton>
              </div>

              <NextButton
                onClickHandler={() => triggerTransition("x", 1)}
                className="p-2  bg-gray-800 text-white rounded-sm focus:outline-none"
              >
                Right
              </NextButton>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

interface PrevButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
}

const PrevButton: React.FC<PrevButtonProps> = ({
  className,
  onClickHandler,
  children,
}) => {
  return (
    <motion.button
      onClick={onClickHandler}
      className={cn(
        className,
        "flex h-8 w-16 items-center justify-center text-center aspect-square"
      )}
    >
      {children || "Prev"}
    </motion.button>
  );
};

interface NextButtonProps {
  onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  children?: ReactNode;
}

const NextButton: React.FC<NextButtonProps> = ({
  className,
  onClickHandler,
  children,
}) => {
  return (
    <motion.button
      onClick={onClickHandler}
      className={cn(
        className,
        "flex h-8 w-16 items-center justify-center text-center aspect-square"
      )}
    >
      {children || "Next"}
    </motion.button>
  );
};

export default DoodleMemeCarousal;
