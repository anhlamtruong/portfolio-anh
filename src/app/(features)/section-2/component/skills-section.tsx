"use client";

import AnimatedWrapper from "../../section-1/animation/animation-wrapper";
import EiffelTower from "./eiffel-tower";

export const SkillsSection = () => {
  return (
    <div className="mt-2 md:mt-0 h-screen w-full flex flex-col justify-start items-start p-8">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
          My Skills
        </h1>
      </AnimatedWrapper>
      <EiffelTower></EiffelTower>
    </div>
  );
};
