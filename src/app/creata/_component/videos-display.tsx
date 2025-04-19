"use client";

import React, { useEffect } from "react";
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

interface PreloadVideoProps {
  src: string;
}

export const PreloadVideo: React.FC<PreloadVideoProps> = ({ src }) => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "video";
    link.href = src;
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, [src]);

  return null;
};


