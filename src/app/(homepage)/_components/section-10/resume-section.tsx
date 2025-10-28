"use client";

import Link from "next/link";
// 1. Import the new icons you'll need
import { Download, GraduationCap, DollarSign } from "lucide-react";
import { FaCodeBranch } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { GrIntegration } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";

import { buttonVariants } from "@/components/ui/button";
import AnimatedWrapper from "../section-1/animation/animation-wrapper";
import { cn } from "@/lib/utils";

const RESUME_URL_PDF_PREVIEW = `https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da?toolbar=0&navpanes=0&scrollbar=0`;
const RESUME_DOWNLOAD_URL = `https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da`;

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
            <HighlightItem Icon={FaCodeBranch} color="text-teal-300">
              Proficient in <strong>Python</strong>, <strong>C++</strong>,{" "}
              <strong>Javascript</strong>, and <strong>React</strong>.
            </HighlightItem>
            <HighlightItem Icon={AiOutlineRobot} color="text-cyan-300">
              Created an AI-powered FAQ chatbot for <strong>2K+</strong>{" "}
              students and <strong>100+</strong> staff.
            </HighlightItem>
            <HighlightItem Icon={GrIntegration} color="text-indigo-300">
              Led <strong>7 people</strong> to integrate job platforms for{" "}
              <strong>10 clients</strong>, transferring <strong>500+</strong>{" "}
              monthly jobs.
            </HighlightItem>
            <HighlightItem Icon={PiStudentFill} color="text-orange-300">
              Tutored Data Structures & Algorithms (<strong>C++</strong>) for{" "}
              <strong>300+</strong> students (<strong>80%</strong> pass rate).
            </HighlightItem>
            <HighlightItem Icon={DollarSign} color="text-lime-300">
              My Cookit <strong>React</strong> project generated{" "}
              <strong>$1K+</strong> revenue.
            </HighlightItem>
            <HighlightItem Icon={GraduationCap} color="text-blue-300">
              <span className="font-semibold">Migrated:</span>{" "}
              <strong>2K+</strong> student records with <strong>100%</strong>{" "}
              accuracy
            </HighlightItem>
            <HighlightItem Icon={IoIosPeople} color="text-yellow-300">
              <span className="font-semibold">Gained:</span>{" "}
              <strong>1K+</strong> followers on Threads Tech
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

// 3. Update HighlightItem to accept an Icon component
const HighlightItem = ({
  children,
  color,
  Icon, // Add Icon prop
}: {
  children: React.ReactNode;
  color: string;
  Icon?: React.ElementType;
}) => (
  <li className="flex items-start gap-3">
    {Icon ? (
      <Icon className={cn("flex-shrink-0 w-5 h-5 mt-1", color)} />
    ) : (
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
    )}
    <span>{children}</span>
  </li>
);
