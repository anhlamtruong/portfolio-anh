import { TransitionState } from "./doodle-meme-carousel";

export type CarouselAnimationType = "default" | "withOpacity";

export interface CarouselConfig {
  enterOffset: number;
  exitOffset: number;
  springStiffness: number;
  springDamping: number;
  opacityDuration: number;
  swipeThreshold: number;
  dragElastic: number;
  dragConstraints: { left: number; right: number; top: number; bottom: number };
  animationType: CarouselAnimationType;
}

export const defaultCarouselConfig: CarouselConfig = {
  enterOffset: 1000,
  exitOffset: 1000,
  springStiffness: 500,
  springDamping: 40,
  opacityDuration: 0.1,
  swipeThreshold: 100,
  dragElastic: 0,
  dragConstraints: { left: 0, right: 0, top: 0, bottom: 0 },
  animationType: "default",
};

export const carouselVariants = {
  // A sliding variant with opacity animation (default)
  withOpacity: {
    enter: (custom: TransitionState) =>
      custom.axis === "x"
        ? { x: custom.direction > 0 ? 1000 : -1000, opacity: 0 }
        : { y: custom.direction > 0 ? 1000 : -1000, opacity: 0 },
    center: { x: 0, y: 0, opacity: 1 },
    exit: (custom: TransitionState) =>
      custom.axis === "x"
        ? { x: custom.direction < 0 ? 1000 : -1000, opacity: 0 }
        : { y: custom.direction < 0 ? 1000 : -1000, opacity: 0 },
  },
  // A variant that only slides without opacity change.
  default: {
    enter: (custom: TransitionState) =>
      custom.axis === "x"
        ? { x: custom.direction > 0 ? 1000 : -1000 }
        : { y: custom.direction > 0 ? 1000 : -1000 },
    center: { x: 0, y: 0 },
    exit: (custom: TransitionState) =>
      custom.axis === "x"
        ? { x: custom.direction < 0 ? 1000 : -1000 }
        : { y: custom.direction < 0 ? 1000 : -1000 },
  },
  // You can add many more animations here...
};
