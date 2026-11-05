import "./_sections/blueprint.css";
import "@/components/swarm/swarm.css";
import { SwarmRoot } from "@/components/swarm/swarm-root";
import { getSkillLogos } from "./_sections/data";
import { SiteHeader } from "./_sections/site-header";
import { Hero } from "./_sections/hero";
import { Experience } from "./_sections/experience";
import { Projects } from "./_sections/projects";
import { Skills } from "./_sections/skills";
import { Credentials } from "./_sections/credentials";
import { Contact, SiteFooter } from "./_sections/contact";

// Fully static: rendered at build time and refreshed once a day (for the
// skill logos). All content is in the HTML; the build animation only plays
// on top of it.
export const revalidate = 86400;

export default async function HomePage() {
  const logos = await getSkillLogos();

  return (
    <div className="bp-root">
      <a
        href="#main"
        className="bp-btn fixed left-4 top-3 z-50 -translate-y-20 focus:translate-y-0"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Skills logos={logos} />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
      <SwarmRoot />
    </div>
  );
}
