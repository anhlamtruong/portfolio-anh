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
import { Parallax } from "./_sections/parallax";
import { FxRoot } from "./_sections/fx/fx-root";
import { VideoBand } from "./_sections/video-band";
import { displaySerif } from "./_sections/fonts";

// Fully static: rendered at build time and refreshed once a day (for the
// skill logos). All content is in the HTML; the build animation only plays
// on top of it.
export const revalidate = 86400;

export default async function HomePage() {
  const logos = await getSkillLogos();

  return (
    <div className={`bp-root ${displaySerif.variable}`}>
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
        <VideoBand
          name="band-pipeline"
          reel="reel 01 · pipeline"
          caption="plan → code → test → review → ship"
        />
        <Projects />
        <VideoBand
          name="band-trace"
          reel="reel 02 · trace"
          caption="every span, every agent, end to end"
        />
        <Skills logos={logos} />
        <Credentials />
        <Contact />
      </main>
      <SiteFooter />
      <FxRoot />
      <Parallax />
      <SwarmRoot />
    </div>
  );
}
