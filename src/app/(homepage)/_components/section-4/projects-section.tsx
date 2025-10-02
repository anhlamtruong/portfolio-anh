"use client";

import AnimatedWrapper from "../section-1/animation/animation-wrapper";
import { ColorfulText } from "./_components/colorful-text";
import { ProjectLayoutGrid } from "./_components/projects-layout";
import Link from "next/link";

const mockCards = [
  {
    id: 1,
    content: (
      <>
        <div className="font-serif flex flex-col gap-2 text-sm md:text-md lg:text-lg">
          <span>
            {`A game was written in HTML CSS and JavaScript Each turn, a player
            repeatedly rolls a dice until either a 1 is rolled or the player
            decides to "hold": `}
          </span>
          <span>
            {`If the player rolls a 1, they score
            nothing and it becomes the next player's turn. If the player
            rolls any other number, it is added to their turn total and the
            player's turn continues. If a player chooses to
            "hold", their turn total is added to their score, and it
            becomes the next player's turn. The first player to score 100 or
            more points wins.`}
          </span>
          <span>
            {`For example, the first player, Donald, begins a
            turn with a roll of 5. Donald could hold and score 5 points, but
            chooses to roll again. Donald rolls a 2, and could hold with a turn
            total of 7 points, but chooses to roll again. Donald rolls a 1, and
            must end his turn without scoring. The next player, Alexis, rolls
            the sequence 4-5-3-5-5, after which she chooses to hold, and adds
            her turn total of 22 points to her score.`}
          </span>
          <span>
            Click{" "}
            <Link
              className=" underline text-blue-200"
              target="_blank"
              href="https://anhlamtruong.github.io/The-Pig-Game/"
            >
              HERE
            </Link>{" "}
            to view the website !!
          </span>
        </div>
      </>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "/assets/img/pig-game-thumbnail.png",
    title: "The Pig Game",
  },
  {
    id: 2,
    content: (
      <>
        <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
          <p>
            <strong>The Omnifood project</strong> is a comprehensive landing
            page designed from the ground up for a modern food subscription
            service. The core challenge was to create a clean, trustworthy, and
            appealing interface that effectively converts visitors into
            customers. The entire design process was built on a systematic
            approach, starting with a well-defined design system.
          </p>

          <div>
            <h4 className="font-bold mb-2">Key Design Decisions:</h4>
            <ul className="list-disc list-inside flex flex-col gap-2">
              <li>
                <strong>Systematic Layout:</strong> A consistent grid and
                spacing system was established to ensure a structured, balanced,
                and visually appealing layout across all sections.
              </li>
              <li>
                <strong>Cohesive Color & Typography:</strong> A specific color
                palette was chosen to reflect the brand&apos;s vibrant and
                healthy identity, with a clear typographic hierarchy to guide
                the user&apos;s eye and improve readability.
              </li>
              <li>
                <strong>User-Centric Component Design:</strong> Elements like
                buttons and forms were designed with clear visual cues and
                states (e.g., hover, focus) to create an intuitive and seamless
                user experience.
              </li>
            </ul>
          </div>

          <p>
            The result is a polished and professional landing page that
            prioritizes user experience.
          </p>

          <span>
            Click{" "}
            <Link
              className=" underline text-blue-200"
              target="_blank"
              href="https://anhlamtruong.github.io/Omnifood-Project-Desktop-/"
            >
              HERE
            </Link>{" "}
            to view the website!
          </span>
        </div>
      </>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/omnifood.png",
    title: "Omnifood Welcome Page",
  },
  {
    id: 3,
    content:
      "A native mobile weather application developed with React Native, providing real-time forecasts via an external API.",
    className:
      "p-4 bg-indigo-900/50 border border-indigo-700 rounded-lg text-white",
    thumbnail: "https://picsum.photos/seed/project3/300/500",
    title: "Weather App",
  },
  {
    id: 4,
    content: (
      <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
        <p>
          <strong>The Bankist project</strong> is a landing page for a
          minimalist digital bank, designed to create a clean, modern, and
          highly interactive user experience. The primary focus was to blend a
          minimalist aesthetic with advanced JavaScript DOM manipulation to
          build a professional and engaging website from scratch.
        </p>

        <div>
          <h4 className="font-bold mb-2">
            Key Design & Development Decisions:
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>Interactive Component Development:</strong> Key features
              like the tabbed operations section and the testimonial slider were
              built using JavaScript to create a dynamic and engaging user flow
              without reloading the page.
            </li>
            <li>
              <strong>Performance Optimization:</strong> Advanced techniques
              like lazy loading for images and smooth-scrolling navigation were
              implemented using the Intersection Observer API to ensure a fast,
              fluid, and seamless user experience.
            </li>
            <li>
              <strong>Systematic & Modern Styling:</strong> A clean and
              consistent design was achieved through a well-defined color scheme
              using CSS variables, along with modern CSS properties for layout,
              transitions, and animations.
            </li>
          </ul>
        </div>

        <p>
          The result is a polished showcase of how to build a modern,
          interactive, and high-performance website.
        </p>

        <span>
          Click{" "}
          <Link
            className=" underline text-blue-200"
            target="_blank"
            href="https://anhlamtruong.github.io/Banklist-DOM/"
          >
            HERE
          </Link>{" "}
          to view the website!
        </span>
      </div>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/bankist.png",
    title: "Bankist Welcome Page",
  },
];
export const ProjectSection = () => {
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
