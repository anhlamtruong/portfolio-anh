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
import { Check, ExternalLink, Award } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Certificate = {
  title: string;
  issuer: string;
  date: string;
  src: string;
  ctaLink: string;
  badge: string;
  features: string[];
};

const CERTIFICATES: Certificate[] = [
  {
    title: "AWS Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    date: "Aug 2023",
    src: "/assets/logos/aws.svg",
    badge: "Cloud",
    ctaLink:
      "https://cp.certmetrics.com/amazon/en/public/verify/credential/KP71RW6C4M1Q1EWK",
    features: [
      "Design, deploy, and manage scalable cloud infrastructure",
      "Develop cloud-based solutions for business objectives",
      "Modernize legacy systems for efficiency",
      "Minimize downtime and security breaches",
      "Evaluate third-party platforms and frameworks",
      "Internal cloud application development and maintenance",
    ],
  },
  {
    title: "Meta Front-End Developer",
    issuer: "Meta (Coursera)",
    date: "Oct 2024",
    src: "/assets/logos/meta-icon.svg",
    badge: "Frontend",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/9Q4LRT7VCCVO",
    features: [
      "Create responsive websites with HTML, CSS, and JavaScript",
      "Use React in relation to JS libraries and frameworks",
      "Learn Bootstrap CSS Framework and GitHub version control",
      "Build portfolio-ready projects for job interviews",
    ],
  },
  {
    title: "Google UX Design",
    issuer: "Google (Coursera)",
    date: "Apr 2024",
    src: "/assets/logos/google-icon.svg",
    badge: "Design",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/CJKM3JF96EZB",
    features: [
      "Follow the design process: empathize, define, ideate, prototype, test",
      "Apply foundational UX concepts and accessibility principles",
      "Plan research studies and conduct usability tests",
      "Create a professional UX portfolio with end-to-end projects",
    ],
  },
  {
    title: "Google Cloud Digital Leader",
    issuer: "Google Cloud (Coursera)",
    date: "Jul 2024",
    src: "/assets/logos/google-cloud.svg",
    badge: "Cloud",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/YXEJRM2ELTNG",
    features: [
      "Recall fundamental cloud terminology",
      "Leverage cloud technology and data for innovation",
      "Identify Google Cloud products for digital transformation",
      "Key change patterns for infrastructure modernization",
    ],
  },
  {
    title: "Google Cloud Developer",
    issuer: "Google Cloud (Coursera)",
    date: "Aug 2024",
    src: "/assets/logos/google-cloud.svg",
    badge: "Cloud",
    ctaLink:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/PMUATOWH1TZP",
    features: [
      "Identify purpose and value of Google Cloud products",
      "Skills needed for a cloud developer engineering role",
      "Deploy on App Engine, GKE, and Compute Engine",
      "Monitor and troubleshoot infrastructure in Google Cloud",
    ],
  },
];

const BADGE_COLORS: Record<string, string> = {
  Cloud: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Frontend: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Design: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export const CertificatesSection = () => {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <BentoSection
      title="Certificates"
      subtitle="Professional certifications and achievements"
    >
      <BentoGrid className="lg:grid-cols-3 auto-rows-[minmax(200px,auto)]">
        {CERTIFICATES.map((cert) => (
          <BentoCard
            key={cert.title}
            onClick={() => setSelected(cert)}
            className="flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between mb-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted/50 p-1.5">
                  <Image
                    src={cert.src}
                    alt={cert.issuer}
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <Badge
                  className={`text-[10px] ${BADGE_COLORS[cert.badge] ?? ""}`}
                  variant="outline"
                >
                  {cert.badge}
                </Badge>
              </div>
              <h3 className="font-semibold text-foreground text-sm sm:text-base leading-tight mb-1">
                {cert.title}
              </h3>
              <p className="text-xs text-muted-foreground">{cert.issuer}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] text-muted-foreground/70">
                {cert.date}
              </span>
              <Award className="h-4 w-4 text-primary/50" />
            </div>
          </BentoCard>
        ))}
      </BentoGrid>

      {/* Detail Dialog */}
      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-muted/50 p-1.5">
                    <Image
                      src={selected.src}
                      alt={selected.issuer}
                      width={28}
                      height={28}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <DialogTitle className="text-base">
                      {selected.title}
                    </DialogTitle>
                    <DialogDescription>
                      {selected.issuer} &middot; {selected.date}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3 mt-2">
                {selected.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">{f}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link
                  href={selected.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full gap-2">
                    View Certificate
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </BentoSection>
  );
};
