"use client";
import { useEffect, useState } from "react";
import AnimatedWrapper from "../animation/animation-wrapper";
import SpringOdometer from "./spring-odmeter";
import { FlipWords } from "../../homepage/ui/flip-words";

export const AboutMeSection = () => {
  const [value, setValue] = useState(0); // The current value of the counter
  const targetValue = 12345; // The target value you want to count up to
  const duration = 2000; // Duration for the animation in milliseconds
  const incrementTime = 50; // How often to update the counter (in milliseconds)

  // Function to increment the value over time
  useEffect(() => {
    const incrementAmount = targetValue / (duration / incrementTime); // Calculate how much to increment per step

    const interval = setInterval(() => {
      setValue((prevValue) => {
        const nextValue = prevValue + incrementAmount;
        if (nextValue >= targetValue) {
          clearInterval(interval); // Stop the interval when the target value is reached
          return targetValue;
        }
        return nextValue;
      });
    }, incrementTime);

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [targetValue, duration, incrementTime]);

  return (
    <div className=" flex flex-col justify-start items-start p-8">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl text-5xl">Congratulations!</h1>
      </AnimatedWrapper>
      <div className="text-pretty flex items-start text-center mt-3 text-white gap-2 justify-end text-lg sm:text-xl md:text-2xl ">
        <h2 className="-mr-1 mt-1">You are the</h2>
        <div className="relative flex items-end">
          <SpringOdometer
            className="font-bold max-[445px]:text-4xl max-[445px]:mt-3"
            endValue={value}
          />
          <span className="text-sm mb-3">th</span>
        </div>
        <h2 className="-ml-1 mt-1">person who visit the page 🎉</h2>
      </div>
      <div className="flex gap-0.5 mt-4 text-white text-2xl">
        I am
        <FlipWords
          className="text-white"
          words={[
            "a Developer",
            "a Software Engineer",
            "a Creator",
            "an Entrepreneur",
          ]}
        />
      </div>
      <embed
        src="@/public/anh-truong-resume.pdf"
        width="100%"
        height="600px"
        type="application/pdf"
      />
    </div>
  );
};
