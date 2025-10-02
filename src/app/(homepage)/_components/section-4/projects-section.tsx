"use client";

import AnimatedWrapper from "../section-1/animation/animation-wrapper";
import { ColorfulText } from "./_components/colorful-text";
import { InfiniteMovingCards } from "./_components/infinite-moving-cards";
import { ProjectLayoutGrid } from "./_components/projects-layout";

export const ProjectSection = () => {
  const mockCards = [
    {
      id: 1,
      // Example with JSX content
      content: (
        <div>
          <h3 className="font-bold text-lg mb-2">E-commerce Platform</h3>
          <p className="text-sm">
            A full-stack solution built with Next.js, Stripe, and Prisma for a
            seamless shopping experience.
          </p>
        </div>
      ),
      className:
        "p-4 bg-blue-900/50 border border-blue-700 rounded-lg text-white",
      thumbnail: "https://picsum.photos/seed/project1/500/300",
    },
    {
      id: 2,
      // Example with JSX and a strong tag
      content: (
        <div>
          <h3 className="font-bold text-lg mb-2">
            Data Visualization Dashboard
          </h3>
          <p className="text-sm">
            <strong>React</strong> and <strong>D3.js</strong> used to create
            interactive and real-time analytics charts.
          </p>
        </div>
      ),
      className:
        "p-4 bg-green-900/50 border border-green-700 rounded-lg text-white",
      thumbnail: "https://picsum.photos/seed/project2/500/300",
    },
    {
      id: 3,
      // Example with a simple string for content
      content:
        "A native mobile weather application developed with React Native, providing real-time forecasts via an external API.",
      className:
        "p-4 bg-indigo-900/50 border border-indigo-700 rounded-lg text-white",
      thumbnail: "https://picsum.photos/seed/project3/300/500", // Mobile aspect ratio
    },
    {
      id: 4,
      // Example with a link in the content
      content: (
        <div>
          <h3 className="font-bold text-lg mb-2">Headless CMS Blog</h3>
          <p className="text-sm">
            A performant and SEO-friendly blog using Next.js and Sanity.io.
            <a href="#" className="underline ml-2">
              Read more
            </a>
          </p>
        </div>
      ),
      className:
        "p-4 bg-purple-900/50 border border-purple-700 rounded-lg text-white",
      thumbnail: "https://picsum.photos/seed/project4/400/400", // Square aspect ratio
    },
  ];
  return (
    <div className="mt-2 md:mt-0 h-screen w-full flex flex-col justify-start items-start p-8">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
          My Projects or {<ColorfulText text="Portfolio"></ColorfulText>}
        </h1>
      </AnimatedWrapper>
      <ProjectLayoutGrid cards={mockCards}></ProjectLayoutGrid>
    </div>
  );
};
