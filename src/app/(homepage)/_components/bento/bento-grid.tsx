"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import React from "react";

/* ─── Grid container ─── */
interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <motion.div
      variants={gridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn(
        "grid auto-rows-[minmax(180px,auto)] gap-4",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ─── Card primitive ─── */
interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  /** col-span shortcut, e.g. "sm:col-span-2 lg:col-span-2" */
  colSpan?: string;
  /** row-span shortcut, e.g. "row-span-2" */
  rowSpan?: string;
  /** Disable hover lift */
  noHover?: boolean;
  onClick?: () => void;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

export function BentoCard({
  children,
  className,
  colSpan,
  rowSpan,
  noHover = false,
  onClick,
}: BentoCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={noHover ? undefined : { y: -4, scale: 1.01 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      onClick={onClick}
      className={cn(
        // Glass-morphism card
        "group relative overflow-hidden rounded-2xl",
        "border border-border/50",
        "bg-card/60 backdrop-blur-md",
        "shadow-sm hover:shadow-lg",
        "transition-shadow duration-300",
        "p-5",
        colSpan,
        rowSpan,
        onClick && "cursor-pointer",
        className,
      )}
    >
      {/* Subtle gradient glow on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

/* ─── Section wrapper (replaces per-section boilerplate) ─── */
interface BentoSectionProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
  /** Extra element next to title, e.g. a CTA button */
  action?: React.ReactNode;
}

export function BentoSection({
  children,
  title,
  subtitle,
  className,
  action,
}: BentoSectionProps) {
  return (
    <div
      className={cn(
        "h-full w-full flex flex-col p-6 md:p-10 lg:p-14 overflow-y-auto no-scrollbar",
        className,
      )}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6 md:mb-8"
      >
        <div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground max-w-xl">
              {subtitle}
            </p>
          )}
        </div>
        {action}
      </motion.div>

      {/* Grid content */}
      <div className="flex-1 min-h-0">{children}</div>
    </div>
  );
}
