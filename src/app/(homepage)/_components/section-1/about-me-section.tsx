"use client";

import { BentoGrid, BentoCard, BentoSection } from "../bento/bento-grid";
import CountingOdometer from "./components/counting-odometer";
import { FlipWords } from "../homepage/flip-words";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  ExternalLink,
  MapPin,
  GraduationCap,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/anhlamtruong",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/anhtruong1/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:anhlamtruong@gmail.com",
    label: "Email",
  },
];

const ROLES = [
  "Software Engineer",
  "Web Developer",
  "Creator",
  "Designer",
  "Entrepreneur",
];

export const AboutMeSection = () => {
  return (
    <BentoSection title="" className="justify-center">
      <BentoGrid className="lg:grid-cols-4 auto-rows-[minmax(140px,auto)] md:auto-rows-[minmax(160px,auto)]">
        {/* ── Avatar + Name (large card) ── */}
        <BentoCard
          colSpan="sm:col-span-2 lg:col-span-2"
          rowSpan="row-span-2"
          className="flex flex-col items-center justify-center text-center gap-4"
        >
          <Avatar className="h-24 w-24 md:h-32 md:w-32 ring-2 ring-primary/30 ring-offset-2 ring-offset-background">
            <AvatarImage src="/assets/img/avatar.jpg" alt="Lam Anh Truong" />
            <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
              LA
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground/80 to-primary">
                Lam Anh Truong
              </span>
            </h1>
            <div className="h-8 flex items-center justify-center">
              <FlipWords
                words={ROLES}
                className="text-base sm:text-lg md:text-xl text-muted-foreground font-medium"
                duration={3000}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            <span>San Francisco, CA</span>
          </div>
        </BentoCard>

        {/* ── Bio card ── */}
        <BentoCard
          colSpan="sm:col-span-2 lg:col-span-2"
          className="flex flex-col justify-center"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            About Me
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            A passionate full-stack developer who loves building elegant
            solutions to complex problems. Experienced in cloud architecture, AI
            integration, and modern web technologies. Always learning, always
            shipping.
          </p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">AWS</Badge>
            <Badge variant="secondary">Python</Badge>
          </div>
        </BentoCard>

        {/* ── CTA buttons ── */}
        <BentoCard
          colSpan="lg:col-span-1"
          noHover
          className="flex flex-col justify-center gap-3"
        >
          <Link href="#section-4">
            <Button className="w-full gap-2" size="lg">
              <ExternalLink className="h-4 w-4" />
              View Projects
            </Button>
          </Link>
          <Link
            href="https://firebasestorage.googleapis.com/v0/b/lam-anh-truong-portfolio.firebasestorage.app/o/portfolio%2FTruong_Resume.pdf?alt=media&token=bf26ad57-f9f1-42fe-acde-265b3bebd3da"
            target="_blank"
          >
            <Button variant="outline" className="w-full gap-2" size="lg">
              <FileText className="h-4 w-4" />
              Resume
            </Button>
          </Link>
        </BentoCard>

        {/* ── Education ── */}
        <BentoCard
          colSpan="lg:col-span-1"
          className="flex flex-col justify-center"
        >
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">Education</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            M.S. Computer Science
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            George Mason University
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            B.S. Computer Science
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            California State University, East Bay
          </p>
        </BentoCard>

        {/* ── Page views counter ── */}
        <BentoCard
          colSpan="sm:col-span-2 lg:col-span-2"
          className="flex flex-col justify-center items-center"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Page Views
          </p>
          <div className="transform scale-75 sm:scale-90 md:scale-100">
            <CountingOdometer
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground"
              amount={20000}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-1">and counting...</p>
        </BentoCard>

        {/* ── Social links ── */}
        <BentoCard
          colSpan="sm:col-span-2 lg:col-span-2"
          className="flex flex-col justify-center"
        >
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Connect
          </h3>
          <div className="flex gap-3">
            {SOCIAL_LINKS.map((link) => (
              <motion.div
                key={link.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 rounded-xl"
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="sr-only">{link.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </BentoCard>
      </BentoGrid>
    </BentoSection>
  );
};
