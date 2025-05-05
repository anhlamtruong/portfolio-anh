"use client";
//TODO: Create a lazy loading component for the image for the thumbnail and using this for only the doodle meme carousel.
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type VideoProps = {
  src: string;
  title: string;
  className?: string;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  control?: boolean;
};

export const VideoDisplay: React.FC<VideoProps> = ({
  src,
  title,
  className,
  loop = false,
  autoPlay = false,
  muted = false,
  control = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="aspect-video">
        <video
          className={cn("w-full h-auto", className)}
          controls={control}
          preload="auto"
          loop={loop}
          autoPlay={autoPlay}
          muted={muted} // Muted is often required for autoplay
        >
          <source src={src} type="video/mp4" />
          {title && <track label={title} kind="descriptions" />}
        </video>
      </div>
    </motion.div>
  );
};
