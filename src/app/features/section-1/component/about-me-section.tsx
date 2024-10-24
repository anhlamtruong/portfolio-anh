"use client";
import { useEffect, useState } from "react";
import AnimatedWrapper from "../animation/animation-wrapper";

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
    <div className="flex items-start justify-start">
      <AnimatedWrapper>
        <div>
          <h1 className="text-8xl text-white">Page 1</h1>
          <div className="text-center mt-20">
            <div className="odometer-container text-center mt-20">
              <div className="odometer text-white">
                {String(Math.floor(value))
                  .split("")
                  .map((digit, index) => (
                    <span key={index} className="odometer-digit">
                      {digit}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </AnimatedWrapper>
    </div>
  );
};
