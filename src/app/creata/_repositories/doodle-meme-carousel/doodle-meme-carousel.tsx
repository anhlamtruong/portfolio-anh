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
import { useTRPC } from "../../_trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { VideoDisplay } from "./components/videos-display";

interface DoodleMemeCarousalProps {
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
 * DoodleMemeCarousel Component
 * A carousel component for displaying doodle/meme videos with touch, keyboard and button controls.
 *
 * Features:
 * - Touch/swipe gestures support (horizontal and vertical)
 * - Keyboard arrow key navigation
 * - Navigation buttons (up/down/left/right)
 * - Configurable animations and transitions
 * - Responsive design
 *
 * Props:
 * @prop {string} className - Additional CSS classes
 * @prop {boolean} enableSwipe - Enable/disable swipe gestures (default: true)
 * @prop {boolean} enableKeyboard - Enable/disable keyboard controls (default: true)
 * @prop {boolean} enableButtons - Enable/disable navigation buttons (default: true)
 * @prop {CarouselConfig} config - Animation and behavior configuration
 *
 * State:
 * - index: Current video index
 * - axis: Current animation axis ('x' or 'y')
 * - direction: Animation direction (+1 or -1)
 *
 * Navigation Logic:
 * - Forward (swipe down/right): index = (current + 1) % total
 * - Backward (swipe up/left): index = (current - 1 + total) % total
 *
 * Keyboard Controls:
 * - ArrowDown/ArrowRight: Forward navigation
 * - ArrowUp/ArrowLeft: Backward navigation
 *
 * Swipe Gesture:
 * - Uses SWIPE_THRESHOLD (100px) to determine valid swipes
 * - Determines dominant axis (x/y) for direction
 */
const DoodleMemeCarousal: React.FC<DoodleMemeCarousalProps> = ({
  className,
  enableSwipe = true,
  enableKeyboard = true,
  enableButtons = true,
  config = defaultCarouselConfig,
}) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.doodle_meme_videos.getMany.queryOptions()
  );

  const [state, setState] = useState<TransitionState>({
    index: 0,
    axis: "y", // default axis for the animation
    direction: 1,
  });

  const triggerTransition = useCallback(
    (axis: "x" | "y", direction: number) => {
      setState((prev) => {
        const n = data?.length || 0; // total number of videos
        const nextIndex =
          direction > 0 ? (prev.index + 1) % n : (prev.index - 1 + n) % n;
        return { index: nextIndex, axis, direction };
      });
    },
    [data?.length]
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
  if (!data || data.length === 0) {
    return <div className="text-center">No videos found.</div>;
  }

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
            {data.length === 0 ? (
              <div className="text-center">No videos found.</div>
            ) : (
              <VideoDisplay
                key={data[state.index].name}
                title={data[state.index].name}
                src={data[state.index].path}
                loop={true}
                autoPlay={true}
                muted={true}
              />
            )}
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
