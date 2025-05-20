// src/components/StarsBackground.tsx
"use client";
import { useMemo } from "react";

export default function StarsBackground() {
  const small = useMemo(() => genBoxShadow(700), []);
  const medium = useMemo(() => genBoxShadow(200), []);
  const large = useMemo(() => genBoxShadow(100), []);

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
      <h1 className="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 text-5xl font-light tracking-[10px] text-white">
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 block p-4">
          Lam Anh Truong
        </span>
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 block p-4">
          Software Engineer
        </span>
      </h1>
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
