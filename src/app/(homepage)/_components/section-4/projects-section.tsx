"use client";

import { BentoGrid, BentoCard, BentoSection } from "../bento/bento-grid";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/* ─── Project data ─── */
type Project = {
  id: number;
  title: string;
  subtitle: string;
  thumbnail: string;
  tags: string[];
  featured?: boolean;
  links: { label: string; href: string }[];
  description: string;
  highlights: string[];
};

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Crushie",
    subtitle: "AI Conversation Coach",
    thumbnail: "/assets/img/crushie.jpg",
    tags: ["Next.js", "Azure OpenAI", "ElevenLabs", "tRPC"],
    featured: true,
    links: [{ label: "Devpost", href: "https://devpost.com/software/crushie" }],
    description:
      "An AI-powered real-time conversation coaching platform built during the Microsoft Hackathon (Feb 2026). It leverages Patriot AI, Azure OpenAI, and ElevenLabs to deliver real-time vision coaching and voice feedback for social interactions.",
    highlights: [
      "AI Vision Coaching with live camera feed and instant feedback on social cues",
      "ElevenLabs voice synthesis for natural coaching prompts as an AI wingman",
      "Vector similarity engine powered by Supabase pgvector with HNSW indexing",
      "Gamified SIQ (Social Intelligence Quotient) scoring system",
    ],
  },
  {
    id: 2,
    title: "FinHack Finance",
    subtitle: "AI Financial Platform",
    thumbnail: "/assets/img/finhack.png",
    tags: ["Gemini", "Claude 3.7", "ElevenLabs", "Snowflake"],
    featured: true,
    links: [
      {
        label: "Devpost",
        href: "https://devpost.com/software/finance-queens",
      },
    ],
    description:
      "A voice-enabled AI financial platform built during the Capital One Hackathon (Jan–Feb 2026). Combines Gemini, Claude 3.7, and ElevenLabs for intelligent financial insights with natural voice interaction.",
    highlights: [
      "Multi-model AI pipeline with Gemini and Claude 3.7 for financial analysis",
      "Voice-first interface for hands-free financial queries and recommendations",
      "Cloud-native architecture with Docker/Terraform on Vultr",
      "Solana blockchain auditing with dual Supabase/MongoDB storage",
    ],
  },
  {
    id: 7,
    title: "The Pig Game",
    subtitle: "Dice Game",
    thumbnail: "/assets/img/pig-game-thumbnail.png",
    tags: ["HTML", "CSS", "JavaScript"],
    links: [
      {
        label: "Live Site",
        href: "https://anhlamtruong.github.io/The-Pig-Game/",
      },
    ],
    description:
      "A classic dice game built with vanilla JavaScript. Players take turns rolling a die — roll a 1 and your turn score resets, or hold to bank your points. First to 100 wins!",
    highlights: [
      "Pure HTML/CSS/JavaScript implementation",
      "Turn-based game logic with score accumulation",
      "Clean, intuitive UI design",
    ],
  },
  {
    id: 8,
    title: "Omnifood",
    subtitle: "Landing Page",
    thumbnail: "/assets/img/omnifood.png",
    tags: ["HTML", "CSS", "Design System"],
    links: [
      {
        label: "Live Site",
        href: "https://anhlamtruong.github.io/Omnifood-Project-Desktop-/",
      },
    ],
    description:
      "A comprehensive landing page designed from the ground up for a modern food subscription service with a systematic design approach.",
    highlights: [
      "Systematic grid and spacing layout system",
      "Cohesive color palette and typographic hierarchy",
      "User-centric component design with clear visual states",
    ],
  },
  {
    id: 3,
    title: "Forkify",
    subtitle: "Recipe App",
    thumbnail: "/assets/img/forkify.png",
    tags: ["JavaScript", "MVC", "API"],
    links: [
      {
        label: "Live Site",
        href: "https://forkify-application-anh-portfolio.netlify.app/",
      },
    ],
    description:
      "A modern recipe application built using the MVC pattern, allowing users to search, view, bookmark, and upload their own recipes.",
    highlights: [
      "Strict MVC architecture for maintainable code",
      "Async/await data flow with reusable AJAX helper",
      "Class-based views with shared rendering logic",
    ],
  },
  {
    id: 4,
    title: "Bankist",
    subtitle: "Banking App",
    thumbnail: "/assets/img/bankist.png",
    tags: ["JavaScript", "DOM", "Intl API"],
    links: [
      {
        label: "Live Site",
        href: "https://anhlamtruong.github.io/banklist-app/",
      },
    ],
    description:
      "A two-part application featuring a modern landing page and a functional banking GUI, demonstrating advanced DOM manipulation and modern JavaScript features.",
    highlights: [
      "Interactive landing page with Intersection Observer API",
      "Dynamic banking UI with real-time DOM updates",
      "Internationalization API for dates and currencies",
    ],
  },
  {
    id: 5,
    title: "Creata",
    subtitle: "Social Media Platform",
    thumbnail: "/assets/img/social-media.png",
    tags: ["Next.js", "Firebase", "Redux-Saga"],
    links: [{ label: "Live Site", href: "https://creeta.vercel.app/" }],
    description:
      "A full-stack social media application built with Next.js, Firebase, and TypeScript with scalable state management using Redux-Saga.",
    highlights: [
      "Redux-Saga for isolated asynchronous side effects",
      "SSR/SSG with Next.js for fast loads and SEO",
      "Firebase Authentication and Firestore backend",
    ],
  },
  {
    id: 6,
    title: "Web3 Dashboard",
    subtitle: "Asset Manager",
    thumbnail: "/assets/img/3rdweb.png",
    tags: ["Next.js", "Thirdweb", "Sanity.io", "Blockchain"],
    links: [
      {
        label: "Live Site",
        href: "https://3rd-web-dashboard.vercel.app/?section=dashboard",
      },
    ],
    description:
      "A comprehensive decentralized application (dApp) built with Next.js, Thirdweb, and Sanity.io for seamless portfolio management and custom token deployment.",
    highlights: [
      "Thirdweb SDK for secure wallet and smart contract interactions",
      "Hybrid data architecture with Sanity.io CMS and on-chain data",
      "Dynamic theme switching and skeleton loading states",
    ],
  },
];

export const ProjectSection = () => {
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <BentoSection title="Projects" subtitle="Things I've built and shipped">
      <BentoGrid className="lg:grid-cols-4 auto-rows-[minmax(180px,auto)]">
        {/* ── Featured projects (large cards) ── */}
        {featured.map((project) => (
          <BentoCard
            key={project.id}
            colSpan="sm:col-span-2 lg:col-span-2"
            rowSpan="row-span-2"
            onClick={() => setSelected(project)}
            className="p-0 overflow-hidden"
          >
            <div className="relative h-full w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-[10px] bg-white/10 backdrop-blur-sm text-white border-white/10"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  {project.title}
                </h3>
                <p className="text-sm text-white/70">{project.subtitle}</p>
              </div>
            </div>
          </BentoCard>
        ))}

        {/* ── Regular projects ── */}
        {others.map((project) => (
          <BentoCard
            key={project.id}
            onClick={() => setSelected(project)}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="relative h-24 sm:h-28 -mx-5 -mt-5 mb-3 overflow-hidden rounded-t-2xl">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <h3 className="font-semibold text-foreground text-sm leading-tight">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {project.subtitle}
              </p>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-[9px] font-normal"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </BentoCard>
        ))}
      </BentoGrid>

      {/* Detail Dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-xl max-h-[85vh] overflow-y-auto p-0">
          {selected && (
            <>
              {/* Hero image */}
              <div className="relative h-48 sm:h-56 w-full">
                <Image
                  src={selected.thumbnail}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="px-6 pb-6 -mt-8 relative z-10">
                <DialogHeader>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {selected.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <DialogTitle className="text-xl">
                    {selected.title}
                  </DialogTitle>
                  <DialogDescription>{selected.subtitle}</DialogDescription>
                </DialogHeader>

                <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                  {selected.description}
                </p>

                {selected.highlights.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-semibold text-foreground">
                      Key Highlights
                    </h4>
                    {selected.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{h}</p>
                      </div>
                    ))}
                  </div>
                )}

                {selected.links.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {selected.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button size="sm" className="gap-1.5">
                          {link.label}
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BentoSection>
  );
};
