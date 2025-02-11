"use client";

// import { Carousel, CarouselContent, CarouselItem } from "./carousel";
// import { VideoDisplay } from "./videos-display";
import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface DoodleMemeCarousalProps {
  children: React.ReactNode[];
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const DoodleMemeCarousal: React.FC<DoodleMemeCarousalProps> = ({
  children,
}) => {
  // page: current slide index; direction: animation direction (-1 for prev, +1 for next)
  const [[page, direction], setPage] = useState<[number, number]>([0, 0]);
  // Advance to the next or previous slide
  const paginate = useCallback((newDirection: number) => {
    setPage(([currentPage]) => [currentPage + newDirection, newDirection]);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        paginate(-1);
      } else if (e.key === "ArrowRight") {
        paginate(1);
      }
    },
    [paginate]
  );

  useEffect(() => {
    // Attach the keydown listener when the component mounts.
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      // Clean up the listener when the component unmounts.
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  // Define animation variants for slide transitions.
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };
  // Ensure the current index is within bounds.
  const index = ((page % children.length) + children.length) % children.length;

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, info) => {
            const swipe = swipePower(info.offset.x, info.velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute w-full"
        >
          {children[index]}
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <button
          onClick={() => paginate(-1)}
          className="p-2 bg-gray-800 text-white rounded-full focus:outline-none"
        >
          Prev
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-2 bg-gray-800 text-white rounded-full focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DoodleMemeCarousal;

{
  /* <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className=""
        orientation="horizontal"
      >
        <CarouselContent>
          <CarouselItem>
          <VideoDisplay
              key={"1"}
              src={"/videos/creata-doodle-meme-video/vid1.mp4"}
              title={""}
            />
          </CarouselItem>
          <CarouselItem>
            <div>Test2</div>
          </CarouselItem>
          <CarouselItem>
            <div>Test3</div>
          </CarouselItem>
        </CarouselContent>
      </Carousel> */
}
