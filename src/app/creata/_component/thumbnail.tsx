"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";

export const Thumbnail = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={src}
        alt={alt}
        className={className}
        width={1280}
        height={720}
        loading="lazy"
        decoding="async"
        style={{ objectFit: "cover", width: "100%", height: "auto" }}
      />
    </motion.div>
  );
};
