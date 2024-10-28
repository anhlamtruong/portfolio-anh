"use client";
import { SnapSection } from "@/app/features/homepage/ui/homepage-section";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { debounce } from "lodash";
import { AboutMeSection } from "@/app/features/section-1/component/about-me-section";
import { BackgroundBeamsWithCollision } from "./features/homepage/ui/background-beams-with-collision";
import { SkillsSection } from "./features/section-2/component/skills-section";
import { CertificatesSection } from "./features/section-3/component/certificates-section";
import { ExperiencesSection } from "./features/section-4/experiences-section";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isProgrammaticScroll, setIsProgrammaticScroll] = useState(false); // Flag for programmatic scrolling
  const router = useRouter();
  const scrollRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  // Function to get the section number from the URL
  const getSectionFromUrl = () => {
    const sectionParam = searchParams.get("section");
    return sectionParam && !isNaN(Number(sectionParam))
      ? Number(sectionParam)
      : 1;
  };

  // On initial mount, check if URL has a section query, and scroll to the relevant section
  useEffect(() => {
    const sectionFromUrl = getSectionFromUrl();
    setActiveIndex(sectionFromUrl);

    const section = document.getElementById(`section-${sectionFromUrl}`);
    if (section) {
      setIsProgrammaticScroll(true); // Set flag for programmatic scroll
      section.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => setIsProgrammaticScroll(false), 500); // Disable the flag after scroll animation completes
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle the scroll event of the scrollable container
  const handleScroll = debounce(() => {
    if (!isProgrammaticScroll && scrollRef.current) {
      const sectionHeight = window.innerHeight;
      const scrollTop = scrollRef.current.scrollTop;
      const currentSection = Math.round(scrollTop / sectionHeight); // Calculate the current section based on scroll position

      if (activeIndex !== currentSection + 1) {
        setActiveIndex(currentSection + 1); // Update active section if it changes
      }
    }
  }, 50);

  // Scroll to the active section and update URL
  useEffect(() => {
    if (activeIndex !== null) {
      const section = document.getElementById(`section-${activeIndex}`);
      if (section) {
        setIsProgrammaticScroll(true); // Set flag for programmatic scroll
        section.scrollIntoView({ behavior: "smooth" });

        // Update the URL query parameter with the active section index
        const currentSectionInUrl = searchParams.get("section");
        if (currentSectionInUrl !== `${activeIndex}`) {
          router.replace(`/?section=${activeIndex}`, undefined);
        }

        setTimeout(() => setIsProgrammaticScroll(false), 500); // Disable the flag after scroll animation completes
      }
    }
  }, [activeIndex, router, searchParams]);

  return (
    <div>
      <main>
        <div className="flex items-center justify-center">
          <BackgroundBeamsWithCollision>
            <Suspense fallback={<div>Loading...</div>}>
              <div
                ref={scrollRef}
                onScroll={handleScroll} // Debounced scroll handler
                className=" no-scrollbar h-screen overflow-scroll snap-mandatory snap-y w-full sm:w-full md:w-11/12 lg:w-9/12 scroll-smooth"
              >
                <SnapSection
                  id="section-1"
                  className="bg-black bg-opacity-60 snap-center transition-all flex items-start justify-start"
                >
                  <AboutMeSection></AboutMeSection>
                </SnapSection>
                <SnapSection
                  id="section-2"
                  className="bg-black bg-opacity-60 snap-center transition-all flex items-start justify-start"
                >
                  <SkillsSection></SkillsSection>
                </SnapSection>
                <SnapSection
                  id="section-3"
                  className="bg-black bg-opacity-60 snap-center transition-all flex items-start justify-start"
                >
                  <CertificatesSection></CertificatesSection>
                </SnapSection>
                <SnapSection
                  id="section-4"
                  className="bg-black bg-opacity-60 snap-center transition-all flex items-start justify-start"
                >
                  <ExperiencesSection></ExperiencesSection>
                </SnapSection>
              </div>
            </Suspense>
          </BackgroundBeamsWithCollision>
        </div>
      </main>
    </div>
  );
}
