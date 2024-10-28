"use client";
import { useEffect, useState } from "react";
import AnimatedWrapper from "../animation/animation-wrapper";
import SpringOdometer from "./spring-odmeter";
import { FlipWords } from "../../homepage/ui/flip-words";
import Image from "next/legacy/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    <div className="mt-2 md:mt-0 h-screen w-full flex flex-col justify-start items-start p-8">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
          Congratulations!
        </h1>
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
      <div className=" inline-block self-center gap-0.5 mt-4 text-white text-2xl">
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
      <div className="relative overflow-auto w-full h-full no-scrollbar border-none mt-4">
        <Button
          onClick={() => {
            window.open("/assets/pdfs/anh-truong-resume.pdf", "_blank");
          }}
          className="absolute bottom-4 right-4 z-50 md:hidden flex"
        >
          {"Download my resume"}
          <Download className="text-white" />
        </Button>
        <Link
          href="/assets/pdfs/anh-truong-resume.pdf"
          className="absolute bottom-4 right-4 z-50 bg-black p-2 rounded-full hover:opacity-40 transition hidden md:block "
          download
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download className="text-white size-4 md:size-5 lg:size-6 " />
        </Link>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <ul className=" list-none list-inside text-white text-md sm:text-lg md:text-xl leading-relaxed space-y-2">
            <li>
              <span className="font-semibold text-blue-300">Migrated:</span>{" "}
              2,000+ student records with 100% accuracy
            </li>
            <li>
              <span className="font-semibold text-green-300">Built:</span> The
              entire hiring system from scratch
            </li>
            <li>
              <span className="font-semibold text-purple-300">Mentored:</span>{" "}
              300+ people in DSA
            </li>
            <li>
              <span className="font-semibold text-yellow-300">Gained:</span>{" "}
              700+ followers on Threads Tech
            </li>
            <li>
              <span className="font-semibold text-red-300">Implemented:</span>{" "}
              Digitized procedures based on cloud
            </li>
            <li>
              <span className="font-semibold text-pink-300">Developed:</span>{" "}
              Cookit.dev, generating $1,000 revenue
            </li>
          </ul>
          <Image
            src="/assets/img/anh-truong-resume.webp"
            alt="Anh Truong's Resume"
            width={800}
            height={1100}
            className="hidden md:block w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl origin-top-left transform"
          />
        </div>
      </div>
    </div>
  );
};
