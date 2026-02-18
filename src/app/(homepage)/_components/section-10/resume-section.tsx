"use client";

import { BentoGrid, BentoCard, BentoSection } from "../bento/bento-grid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Download,
  GraduationCap,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { FaCodeBranch } from "react-icons/fa";
import { AiOutlineRobot } from "react-icons/ai";
import { GrIntegration } from "react-icons/gr";
import { IoIosPeople } from "react-icons/io";
import { PiStudentFill } from "react-icons/pi";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const RESUME_URL_PDF_PREVIEW = `https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da?toolbar=0&navpanes=0&scrollbar=0`;
const RESUME_DOWNLOAD_URL = `https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da`;

type Highlight = {
  icon: React.ElementType;
  color: string;
  stat: string;
  label: string;
};

const HIGHLIGHTS: Highlight[] = [
  {
    icon: FaCodeBranch,
    color: "text-teal-400",
    stat: "4+",
    label: "Languages (Python, C++, JS, React)",
  },
  {
    icon: AiOutlineRobot,
    color: "text-cyan-400",
    stat: "2K+",
    label: "Students served by AI chatbot",
  },
  {
    icon: GrIntegration,
    color: "text-indigo-400",
    stat: "500+",
    label: "Monthly jobs transferred",
  },
  {
    icon: PiStudentFill,
    color: "text-orange-400",
    stat: "300+",
    label: "Students tutored (80% pass rate)",
  },
  {
    icon: DollarSign,
    color: "text-lime-400",
    stat: "$1K+",
    label: "Revenue from Cookit project",
  },
  {
    icon: GraduationCap,
    color: "text-blue-400",
    stat: "2K+",
    label: "Student records migrated (100% accuracy)",
  },
  {
    icon: IoIosPeople,
    color: "text-yellow-400",
    stat: "1K+",
    label: "Followers on Threads Tech",
  },
];

export const ResumeSection = () => {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  return (
    <BentoSection
      title="Resume"
      subtitle="Experience highlights and achievements"
      action={
        <Link
          href={RESUME_DOWNLOAD_URL}
          download="Truong_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Download PDF
          </Button>
        </Link>
      }
    >
      <BentoGrid className="lg:grid-cols-4 auto-rows-[minmax(120px,auto)]">
        {/* ── Stat highlight cards ── */}
        {HIGHLIGHTS.map((h) => (
          <BentoCard key={h.label} className="flex flex-col justify-center">
            <div className="flex items-center gap-3">
              <div className={cn("p-2 rounded-lg bg-muted/50", h.color)}>
                <h.icon className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">
                  {h.stat}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                  {h.label}
                </p>
              </div>
            </div>
          </BentoCard>
        ))}

        {/* ── PDF Preview (takes remaining space) ── */}
        <BentoCard
          colSpan="sm:col-span-2 lg:col-span-4"
          rowSpan="row-span-2"
          noHover
          className="p-0 overflow-hidden hidden md:flex flex-col"
        >
          <div className="relative flex-1 min-h-0">
            {!pdfLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-3 w-3/4 max-w-md">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-32 w-full mt-4" />
                </div>
              </div>
            )}
            <iframe
              src={RESUME_URL_PDF_PREVIEW}
              title="Anh Truong's Resume"
              className="w-full h-full"
              style={{ border: "none", minHeight: "400px" }}
              allow="fullscreen"
              onLoad={() => setPdfLoaded(true)}
            />
          </div>
        </BentoCard>

        {/* ── Mobile: link to open PDF ── */}
        <BentoCard
          colSpan="sm:col-span-2"
          noHover
          className="flex md:hidden items-center justify-center"
        >
          <Link
            href={RESUME_DOWNLOAD_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="gap-2">
              <ExternalLink className="h-4 w-4" />
              View Full Resume
            </Button>
          </Link>
        </BentoCard>
      </BentoGrid>
    </BentoSection>
  );
};
