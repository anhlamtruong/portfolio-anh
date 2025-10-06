// src/components/StarsBackground.tsx
"use client";

import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FlipWords } from "./flip-words";

export default function StarsBackground() {
  const small = useMemo(() => genBoxShadow(700), []);
  const medium = useMemo(() => genBoxShadow(200), []);
  const large = useMemo(() => genBoxShadow(100), []);
  const params = useSearchParams();
  const sectionNumber = Number(params.get("section"));
  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#1B2735] to-[#090A0F]">
      {/* small */}
      <div
        className="absolute inset-0 w-[1px] h-[1px] bg-transparent animate-star-sm"
        style={{ boxShadow: small }}
      />
      {/* small duplicate for after */}
      <div
        className="absolute inset-0 top-[2000px] w-[1px] h-[1px] bg-transparent animate-star-sm"
        style={{ boxShadow: small }}
      />

      {/* medium */}
      <div
        className="absolute inset-0 w-[2px] h-[2px] bg-transparent animate-star-md"
        style={{ boxShadow: medium }}
      />
      <div
        className="absolute inset-0 top-[2000px] w-[2px] h-[2px] bg-transparent animate-star-md"
        style={{ boxShadow: medium }}
      />

      {/* large */}
      <div
        className="absolute inset-0 w-[3px] h-[3px] bg-transparent animate-star-lg"
        style={{ boxShadow: large }}
      />
      <div
        className="absolute inset-0 top-[2000px] w-[3px] h-[3px] bg-transparent animate-star-lg"
        style={{ boxShadow: large }}
      />

      {/* title */}
      <div className="w-full h-screen">
        <h1
          className={cn(
            sectionNumber && sectionNumber != 1 ? " blur-lg" : "",
            "w-11/12 md:w-3/4 h-1/2 absolute top-2/3 left-1/2 text-center transition-all transform -translate-x-1/2 -translate-y-1/2 text-3xl md:text-5xl font-light tracking-[10px] text-white"
          )}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 block p-4">
            Lam Anh Truong
          </span>
          <span className="block">
            <FlipWords
              className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 block p-4 text-white"
              words={[
                "Web Developer",
                "Software Engineer",
                "Creator",
                "Designer",
                "Entrepreneur",
              ]}
            />
          </span>
        </h1>
      </div>
    </div>
  );
}

export function genBoxShadow(count: number) {
  let shadows = "";
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000) + "px";
    const y = Math.floor(Math.random() * 2000) + "px";
    shadows += `${x} ${y} #FFF${i < count - 1 ? "," : ""}`;
  }
  return shadows;
}
