"use client";
import { ReactNode, FC } from "react";
import { cn } from "@/lib/utils";

// Define the types for the SnapSection component props
interface SnapSectionProps {
  children: ReactNode;
  className?: string | undefined;
  id: string;
}

// SnapSection Component that accepts a React component as a prop
export const SnapSection: FC<SnapSectionProps> = ({
  children,
  className,
  id,
}) => {
  return (
    <section
      id={id}
      className={cn(
        "h-screen w-full flex justify-center items-center",
        className
      )}
    >
      {children}
    </section>
  );
};
