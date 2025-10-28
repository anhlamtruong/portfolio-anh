"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import AnimatedWrapper from "../section-1/animation/animation-wrapper";
import { cn } from "@/lib/utils";

const FILE_ID = "1r9FGyd2hJ-NhBAC8qazOBJ_urr9F1nUI";

const RESUME_URL_PDF_PREVIEW = `https://drive.google.com/file/d/${FILE_ID}/preview?rm=minimal`;

const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${FILE_ID}`;

export const ResumeSection = () => {
  return (
    <div className="h-full w-full flex flex-col justify-start md:justify-center items-start p-8 md:p-12 lg:p-16 overflow-y-auto no-scrollbar">
      <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <AnimatedWrapper>
          <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
            My Resume
          </h1>
        </AnimatedWrapper>

        <AnimatedWrapper>
          <Link
            href={RESUME_DOWNLOAD_URL}
            download="Truong_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full md:w-auto"
            )}
          >
            Download Resume
            <Download className="ml-2 h-4 w-4" />
          </Link>
        </AnimatedWrapper>
      </div>

      <div className="w-full flex-1 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
        <div className="lg:col-span-2 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Key Highlights
          </h2>
          <ul className="list-none list-inside text-gray-300 text-md sm:text-lg md:text-xl leading-relaxed space-y-4">
            <HighlightItem color="text-blue-300">
              <span className="font-semibold">Migrated:</span> 2,000+ student
              records with 100% accuracy
            </HighlightItem>
            <HighlightItem color="text-green-300">
              <span className="font-semibold">Built:</span> The entire hiring
              system from scratch
            </HighlightItem>
            <HighlightItem color="text-purple-300">
              <span className="font-semibold">Mentored:</span> 300+ people in
              DSA
            </HighlightItem>
            <HighlightItem color="text-yellow-300">
              <span className="font-semibold">Gained:</span> 700+ followers on
              Threads Tech
            </HighlightItem>
            <HighlightItem color="text-red-300">
              <span className="font-semibold">Implemented:</span> Digitized
              procedures based on cloud
            </HighlightItem>
            <HighlightItem color="text-pink-300">
              <span className="font-semibold">Developed:</span> Cookit.dev,
              generating $1,000 revenue
            </HighlightItem>
          </ul>
        </div>

        <div className="lg:col-span-3 h-full w-full hidden lg:block">
          <div className="w-full h-full rounded-lg overflow-hidden border-2 border-gray-700/50">
            <iframe
              src={RESUME_URL_PDF_PREVIEW}
              title="Anh Truong's Resume"
              className="w-full h-full"
              style={{ border: "none" }}
            >
              {/* <p>
                Your browser does not support embedded PDFs.
                <a
                  href={RESUME_DOWNLOAD_URL}
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Please download the resume to view it.
                </a>
              </p> */}
            </iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const HighlightItem = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) => (
  <li className="flex items-start gap-3">
    <svg
      className={cn("flex-shrink-0 w-5 h-5 mt-1.5", color)}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      ></path>
    </svg>
    <span>{children}</span>
  </li>
);
