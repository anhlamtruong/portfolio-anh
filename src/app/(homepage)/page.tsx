"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

import { CertificatesSection } from "./_components/section-3/certificates-section";
import { SnapSection } from "./_components/homepage/homepage-section";
import { AboutMeSection } from "./_components/section-1/about-me-section";
import { SkillsSection } from "./_components/section-2/skills-section";
import { ProjectSection } from "./_components/section-4/projects-section";
import dynamic from "next/dynamic";
import { ResumeSection } from "./_components/section-10/resume-section";
import { useEditorStore } from "@/services/theme/store";
import { LayoutModeToggle } from "./_components/8bit/layout-mode-toggle";
import { EightBitLayout } from "./_components/8bit/eight-bit-layout";
import { ScrollProgress } from "./_components/bento/scroll-progress";

const StarsBackground = dynamic(
  () => import("./_components/homepage/stars-background"),
  { ssr: false },
);

const SECTIONS = [1, 2, 3, 4, 10] as const;

function useSectionSync() {
  const router = useRouter();
  const params = useSearchParams();

  // 1) INITIAL SCROLL
  useEffect(() => {
    const idx = Number(params.get("section")) || 1;
    document
      .getElementById(`section-${idx}`)
      ?.scrollIntoView({ behavior: "smooth" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only on mount

  // 2) URL SYNC on scroll/swipe via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = e.target.id.replace("section-", "");
            router.replace(`/?section=${idx}`);
          }
        }
      },
      { threshold: 0.5 },
    );

    document
      .querySelectorAll("[id^='section-']")
      .forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [router]);

  // 3) KEYBOARD NAV — uses SECTIONS array to navigate between all sections
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const curr = Number(params.get("section")) || 1;
      const currIdx = SECTIONS.indexOf(curr as (typeof SECTIONS)[number]);
      if (currIdx === -1) return;

      let nextIdx = currIdx;
      if (e.key === "ArrowDown" || e.key === "ArrowRight")
        nextIdx = Math.min(currIdx + 1, SECTIONS.length - 1);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft")
        nextIdx = Math.max(currIdx - 1, 0);

      if (nextIdx !== currIdx) {
        const nextSection = SECTIONS[nextIdx];
        document
          .getElementById(`section-${nextSection}`)
          ?.scrollIntoView({ behavior: "smooth" });
        router.replace(`/?section=${nextSection}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, params]);
}

export default function Home() {
  const layoutMode = useEditorStore((s) => s.themeState.layoutMode ?? "modern");

  return (
    <>
      <LayoutModeToggle />
      {layoutMode === "8bit" ? (
        <EightBitLayout />
      ) : (
        <main className="relative w-screen h-screen overflow-hidden no-scrollbar">
          <StarsBackground />
          <ScrollProgress />
          <HomeComponents />
        </main>
      )}
    </>
  );
}

const HomeComponents = () => {
  useSectionSync();
  return (
    <div className="relative z-10">
      <div className="flex items-center justify-center">
        <div className="no-scrollbar h-screen overflow-scroll snap-mandatory snap-y w-full scroll-smooth">
          <SnapSection
            id="section-1"
            className="w-full snap-center transition-all flex items-start justify-start"
          >
            <AboutMeSection />
          </SnapSection>
          <SnapSection
            id="section-2"
            className="snap-center transition-all flex items-start justify-start"
          >
            <SkillsSection />
          </SnapSection>
          <SnapSection
            id="section-3"
            className="snap-center transition-all flex items-start justify-start"
          >
            <CertificatesSection />
          </SnapSection>
          <SnapSection
            id="section-4"
            className="snap-center transition-all flex items-start justify-start"
          >
            <ProjectSection />
          </SnapSection>
          <SnapSection
            id="section-10"
            className="snap-center transition-all flex items-start justify-start"
          >
            <ResumeSection />
          </SnapSection>
        </div>
      </div>
    </div>
  );
};
