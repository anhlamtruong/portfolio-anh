"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type VideoProps = {
  src: string;
  title: string;
  className?: string;
};

export const VideoDisplay: React.FC<VideoProps> = ({
  src,
  title,
  className,
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
          controls
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          {title && <track label={title} kind="descriptions" />}
        </video>
      </div>
    </motion.div>
  );
};
