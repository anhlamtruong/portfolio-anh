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
    content: (
      <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
        <p>
          <strong>The Forkify project</strong> is a modern recipe application
          that allows users to search, view, bookmark, and even upload their own
          recipes. The primary architectural goal was to build the application
          using the well-established **MVC (Model-View-Controller) pattern**,
          ensuring a clear separation of concerns and creating a scalable and
          maintainable codebase from scratch.
        </p>

        <div>
          <h4 className="font-bold mb-2">
            Key Design & Development Decisions:
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>MVC Architecture:</strong> The application is strictly
              organized with the Model for managing state and business logic
              (like API calls), the View for rendering the UI, and the
              Controller to act as the bridge between them.
            </li>
            <li>
              <strong>Asynchronous Data Flow:</strong> All communication with
              the third-party recipe API is handled with `async/await` inside a
              reusable `AJAX` helper function, ensuring a smooth, non-blocking
              user experience while fetching data.
            </li>
            <li>
              <strong>Reusable & Class-Based Views:</strong> A parent `View`
              class was implemented to contain shared rendering logic (like
              rendering spinners, errors, and messages), which other specific
              views inherit from, promoting code reusability and efficiency.
            </li>
          </ul>
        </div>

        <p>
          The result is a robust and feature-rich application that demonstrates
          modern JavaScript architecture and best practices.
        </p>

        <span>
          Click{" "}
          <Link
            className=" underline text-blue-200"
            target="_blank"
            href="https://forkify-application-anh-portfolio.netlify.app/"
          >
            HERE
          </Link>{" "}
          to view the website!
        </span>
      </div>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/forkify.png",
    title: "Forkify Recipe Keeping App",
  },
  {
    id: 4,
    content: (
      <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
        <p>
          <strong>The Bankist project</strong> is a two-part application
          featuring a modern landing page and a functional, interactive banking
          GUI. The primary focus was to demonstrate advanced DOM manipulation
          and modern JavaScript features by building a professional and engaging
          user experience from the ground up, without relying on any external
          frameworks.
        </p>

        <div>
          <h4 className="font-bold mb-2">
            Key Design & Development Decisions:
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>Interactive Landing Page:</strong> Key features like the
              tabbed operations section, a testimonial slider, and lazy-loading
              images were built with advanced JavaScript, utilizing the
              Intersection Observer API to create a high-performance, animated,
              and engaging user flow.
            </li>
            <li>
              <strong>Dynamic Banking Application:</strong> The separate banking
              UI is fully interactive, with features like user login,
              transaction displays, money transfers, and loan requests. All UI
              elements are dynamically rendered and updated in real-time through
              direct DOM manipulation.
            </li>
            <li>
              <strong>Modern JavaScript Implementation:</strong> The application
              leverages the Internationalization API (`Intl.DateTimeFormat` and
              `Intl.NumberFormat`) to correctly format dates and currencies
              based on user locale, and includes a session logout timer to
              manage user inactivity.
            </li>
          </ul>
        </div>

        <p>
          The result is a polished showcase of how to build a modern,
          interactive, and feature-rich web application using vanilla
          JavaScript.
        </p>

        <span>
          Click{" "}
          <Link
            className=" underline text-blue-200"
            target="_blank"
            href="https://anhlamtruong.github.io/banklist-app/"
          >
            HERE
          </Link>{" "}
          to view the website!
        </span>
      </div>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/bankist.png",
    title: "Bankist Minimal Bank Application",
  },
  {
    id: 5,
    content: (
      <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
        <p>
          <strong>The Creata project</strong> is a full-stack social media
          application built with Next.js, Firebase, and TypeScript. The primary
          focus was to design a scalable and modern web app centered around a
          robust, asynchronous state management architecture using{" "}
          <strong>Redux-Saga</strong>.
        </p>

        <div>
          <h4 className="font-bold mb-2">
            Key Design & Development Decisions:
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>Scalable State Management:</strong> Leveraged Redux-Saga
              to manage all asynchronous actions, such as user authentication
              with Firebase and fetching posts, ensuring that side effects are
              isolated and application state remains predictable.
            </li>
            <li>
              <strong>Server-Side & Static Rendering (SSR/SSG):</strong>{" "}
              Utilized Next.js features like `getStaticProps` and
              `getStaticPaths` to pre-render post pages, ensuring fast load
              times and SEO optimization, while using real-time Firestore
              listeners for data hydration./[slug].tsx
            </li>
            <li>
              <strong>Backend-Driven Content & Auth:</strong> Designed a secure
              backend using Firebase Authentication for user management and
              Firestore for database operations, including a &quot;heart&quot;
              feature and de-normalized post data for efficient querying.
            </li>
          </ul>
        </div>

        <p>
          The result is a feature-complete social media platform demonstrating a
          modern, decoupled, and event-driven application architecture.
        </p>

        <span>
          Click{" "}
          <Link
            className=" underline text-blue-200"
            target="_blank"
            href="https://creeta.vercel.app/"
          >
            HERE
          </Link>{" "}
          to view the website!
        </span>
      </div>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/social-media.png",
    title: "Minimal Social Media",
  },
  {
    id: 6,
    content: (
      <div className="font-serif flex flex-col gap-4 text-sm md:text-md lg:text-lg">
        <p>
          <strong>The Web3 Asset Dashboard</strong> is a comprehensive
          decentralized application (dApp) built with Next.js, Thirdweb, and
          Sanity.io. The primary objective was to abstract the complexity of
          blockchain interactions into a clean, modern interface that allows
          users to seamlessly manage their portfolios and deploy their own
          tokens.
        </p>

        <div>
          <h4 className="font-bold mb-2">
            Key Design & Development Decisions:
          </h4>
          <ul className="list-disc list-inside flex flex-col gap-2">
            <li>
              <strong>Seamless Blockchain Integration:</strong> Leveraged the{" "}
              <strong>Thirdweb SDK</strong> to handle secure wallet connections
              and smart contract interactions. This abstraction layer enables
              complex actions—like minting custom tokens—to be performed with a
              single click, significantly improving the Web3 user experience.
            </li>
            <li>
              <strong>Hybrid Data Architecture:</strong> Implemented a
              dual-source data strategy using
              <strong>Sanity.io</strong> (Headless CMS) to manage static assets
              and token metadata, combined with real-time on-chain data
              fetching. This ensures the application remains performant and
              SEO-friendly while displaying accurate blockchain states.
            </li>
            <li>
              <strong>Component-Driven UI System:</strong> Built a modular and
              responsive interface using
              <strong>Tailwind CSS</strong> and Shadcn/UI components. The design
              includes dynamic theme switching and skeleton loading states to
              provide immediate visual feedback, crucial for maintaining user
              engagement during asynchronous blockchain transactions.
            </li>
          </ul>
        </div>

        <p>
          The result is a professional-grade dashboard that demonstrates how to
          build accessible and scalable frontend architectures for the
          decentralized web.
        </p>

        <span>
          Click{" "}
          <Link
            className=" underline text-blue-200"
            target="_blank"
            href="https://3rd-web-dashboard.vercel.app/?section=dashboard"
          >
            HERE
          </Link>{" "}
          to view the website!
        </span>
      </div>
    ),
    className: "p-4 rounded-lg text-white",
    thumbnail: "assets/img/3rdweb.png", // Make sure to update this path
    title: "Web3 Asset Manager",
  },
];
export const ProjectSection = () => {
  return (
    <div className="mt-2 md:mt-0 h-screen w-full flex flex-col justify-start items-start p-8 ">
      <AnimatedWrapper>
        <h1 className="text-white md:text-8xl sm:text-7xl text-4xl">
          My Projects or {<ColorfulText text="Portfolio"></ColorfulText>}
        </h1>
      </AnimatedWrapper>
      <ProjectLayoutGrid cards={mockCards}></ProjectLayoutGrid>
    </div>
  );
};
