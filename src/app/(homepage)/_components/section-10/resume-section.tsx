"use client";

import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedWrapper from "../section-1/animation/animation-wrapper";

export const ResumeSection = () => {
  return (
    <div className="mt-2 md:mt-0 h-screen w-full flex flex-col justify-start items-start p-8">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
          My Resume
        </h1>
      </AnimatedWrapper>
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
            width={500}
            height={800}
            priority
            className="hidden md:block h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl origin-top-left transform"
            style={{
              height: "auto",
            }}
          />
        </div>
      </div>
    </div>
  );
};
