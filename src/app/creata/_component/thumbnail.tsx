"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export const Thumbnail = ({
  src,
  alt,
  className,
}: {
  src?: string;
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
        src={src ?? "/logo/logo-transparent-background.svg"}
        alt={alt}
        width={700}
        height={700}
        priority
        className={cn(className, "aspect-square object-contain rounded-md")}
        decoding="async"
        style={{ objectFit: "cover", width: "100%", height: "auto" }}
      />
    </motion.div>
  );
};
