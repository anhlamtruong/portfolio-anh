import { cn } from "@/lib/utils";
import React from "react";
import { ClimbingBoxLoader } from "react-spinners";
import { Progress } from "./progress";

export const Loader = ({ value }: { value?: number }) => (
  //TODO: NEED TO FIX, the animation is not really expected
  <div className="flex flex-col h-screen w-screen items-center justify-center gap-4">
    <div className="flex items-center justify-center space-x-4">
      {/* Circle Loader */}
      <div className="relative w-11 h-11">
        <div className="dot absolute w-[6px] h-[6px] bg-[#5628EE] rounded-full top-[37px] left-[19px] animate-loaderDotCircle" />
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <circle
            cx="40"
            cy="40"
            r="32"
            fill="none"
            stroke="#2F3545"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="150 50 150 50"
            strokeDashoffset="75"
            className="animate-loaderPathCircle"
          />
        </svg>
      </div>

      {/* Triangle Loader */}
      <div className="relative w-12 h-11">
        <div className="dot absolute w-[6px] h-[6px] bg-[#5628EE] rounded-full top-[37px] left-[21px] animate-loaderDotTriangle" />
        <svg viewBox="0 0 86 80" className="w-full h-full">
          <polygon
            points="43 8 79 72 7 72"
            fill="none"
            stroke="#2F3545"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-loaderPathTriangle"
            strokeDasharray="145 76 145 76"
          />
        </svg>
      </div>

      {/* Rectangle Loader */}
      <div className="relative w-11 h-11">
        <div className="dot absolute w-[6px] h-[6px] bg-[#5628EE] rounded-full top-[37px] left-[19px] animate-loaderDotRect" />
        <svg viewBox="0 0 80 80" className="w-full h-full">
          <rect
            x="8"
            y="8"
            width="64"
            height="64"
            fill="none"
            stroke="#2F3545"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-loaderPathRect"
            strokeDasharray="192 64 192 64"
          />
        </svg>
      </div>
    </div>
    <p>Loading ... </p>
    {value && <Progress value={value}></Progress>}
  </div>
);

export const PageLoading = () => <Loader></Loader>;
export const ComponentLoading = ({
  loading,
  className,
}: {
  loading: boolean;
  className?: string;
}) => (
  <ClimbingBoxLoader
    className={cn("invert", className)}
    loading={loading}
    speedMultiplier={2}
  />
);
