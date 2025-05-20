"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// import { BackgroundBeamsWithCollision } from "./(features)/homepage/ui/background-beams-with-collision";
import { CertificatesSection } from "./_components/section-3/certificates-section";
import { SnapSection } from "./_components/homepage/homepage-section";
import { AboutMeSection } from "./_components/section-1/about-me-section";
import { SkillsSection } from "./_components/section-2/skills-section";
import { ExperiencesSection } from "./_components/section-4/experiences-section";
import { PageContentLoading } from "@/components/ui/loading";
import dynamic from "next/dynamic";
const StarsBackground = dynamic(
  () => import("./_components/homepage/stars-background"),
  { ssr: false }
);

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
      { threshold: 0.5 }
    );

    document
      .querySelectorAll("[id^='section-']")
      .forEach((el) => obs.observe(el));

    return () => obs.disconnect();
  }, [router]);

  // 3) KEYBOARD NAV
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const curr = Number(params.get("section")) || 1;
      let next = curr;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = curr + 1;
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = curr - 1;
      next = Math.max(1, Math.min(next, 4)); // clamp between 1–4
      if (next !== curr) {
        document
          .getElementById(`section-${next}`)
          ?.scrollIntoView({ behavior: "smooth" });
        router.replace(`/?section=${next}`);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, params]);
}

export default function Home() {
  return (
    <div className="relative overflow-hidden no-scrollbar">
      <StarsBackground />
      <Suspense fallback={<PageContentLoading />}>
        <HomeComponents></HomeComponents>
      </Suspense>
    </div>
  );
}

const HomeComponents = () => {
  useSectionSync();
  return (
    <main className="relative z-10">
      <div className="flex items-center justify-center">
        <div className=" no-scrollbar h-screen overflow-scroll snap-mandatory snap-y w-full  scroll-smooth">
          <SnapSection
            id="section-1"
            className="bg-black bg-opacity-10 snap-center transition-all flex items-start justify-start"
          >
            <AboutMeSection></AboutMeSection>
          </SnapSection>
          <SnapSection
            id="section-2"
            className="bg-black bg-opacity-10 snap-center transition-all flex items-start justify-start"
          >
            <SkillsSection></SkillsSection>
          </SnapSection>
          <SnapSection
            id="section-3"
            className="bg-black bg-opacity-10 snap-center transition-all flex items-start justify-start"
          >
            <CertificatesSection></CertificatesSection>
          </SnapSection>
          <SnapSection
            id="section-4"
            className="bg-black bg-opacity-10 snap-center transition-all flex items-start justify-start"
          >
            <ExperiencesSection></ExperiencesSection>
          </SnapSection>
        </div>
      </div>
    </main>
  );
};
