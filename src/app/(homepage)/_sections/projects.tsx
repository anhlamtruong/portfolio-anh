import Image from "next/image";
import { projects, type Project } from "@/content/profile";
import { CrossMark, DimLine } from "./decor";
import { AgentGraphArt, ExternalArrow, SectionHeader } from "./shared";

function ProjectLinks({ links }: { links: Project["links"] }) {
  if (!links.length) return null;
  return (
    <div className="mt-5 flex flex-wrap gap-4 text-sm">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="bp-link inline-flex items-center gap-1"
        >
          {link.label}
          <ExternalArrow className="h-3.5 w-3.5" />
        </a>
      ))}
    </div>
  );
}

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  return (
    <article
      data-build-item
      data-build="frame"
      data-build-tune
      data-build-label="project"
      className="bp-card bp-card-hover flex w-full flex-col overflow-hidden"
    >
      <div
        data-build-item
        data-build="image"
        data-build-from={index % 2 === 0 ? "left" : "right"}
        className="relative aspect-[16/10] overflow-hidden border-b border-[color:var(--bp-line)] bg-[#0a0e15]"
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 540px, (min-width: 768px) 50vw, 100vw"
            className="object-cover object-top"
            data-parallax-img
          />
        ) : (
          <div data-parallax-img className="h-full w-full">
            <AgentGraphArt seed={project.title} label={`${project.title} diagram`} />
          </div>
        )}
        {project.badge ? (
          <span className="bp-chip absolute left-4 top-4 border-[color:var(--bp-accent)] text-[color:var(--bp-accent)]">
            {project.badge}
          </span>
        ) : null}
        <span className="bp-mono bp-dim absolute right-4 top-4 text-xs">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p data-build-item data-build="type" className="bp-mono bp-dim text-xs">
          {project.dates}
        </p>
        <h3
          data-build-item
          data-build="type"
          data-build-font
          className="bp-h3 mt-2 text-xl"
        >
          {project.title}
        </h3>
        <p
          data-build-item
          data-build="type"
          data-build-color="text"
          className="bp-accent mt-1 text-sm"
        >
          {project.tagline}
        </p>
        <p
          data-build-item
          data-build="reveal"
          className="bp-muted mt-4 text-[0.95rem] leading-7"
        >
          {project.description}
        </p>
        {project.result ? (
          <p
            data-build-item
            data-build="reveal"
            className="mt-4 border-l-2 border-[color:var(--bp-accent)] pl-3 text-sm leading-6"
          >
            {project.result}
          </p>
        ) : null}
        <ul data-build-list className="mt-5 flex flex-wrap gap-2">
          {project.stack.map((tech, i) => (
            <li
              key={tech}
              data-build-item
              data-build={i === 0 ? "frame" : "dup"}
              className="bp-chip"
            >
              {tech}
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <ProjectLinks links={project.links} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const more = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="bp-section">
      <div className="bp-container">
        <DimLine at="left-0 top-[11rem]" width="46%" label="col 1 · 540" speed={0.18} />
        <CrossMark at="-right-4 top-[40rem]" label="x 1180 · y 3020" speed={0.35} />
        <SectionHeader
          id="projects"
          index="02"
          label="projects"
          title="Selected builds"
        >
          Hackathon winners, a product that got acquired, and the small
          projects where I learned the craft.
        </SectionHeader>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {featured.map((project, i) => (
            <div
              key={project.title}
              data-build-section={`project-${i + 1}`}
              className="flex"
            >
              <FeaturedCard project={project} index={i} />
            </div>
          ))}
        </div>

        <div data-build-section="projects-more" className="mt-12">
          <p data-build-item data-build="type" className="bp-eyebrow">
            more builds
          </p>
          <ul data-build-list className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((project, i) => (
              <li
                key={project.title}
                data-build-item
                data-build={i === 0 ? "frame" : "dup"}
                className="bp-card bp-card-hover flex flex-col p-5"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="bp-h3 text-base">{project.title}</h3>
                  <span className="bp-mono bp-dim shrink-0 text-[0.7rem]">
                    {project.dates}
                  </span>
                </div>
                <p className="bp-accent mt-1 text-sm">{project.tagline}</p>
                <p className="bp-muted mt-3 text-sm leading-6">
                  {project.result ?? project.description}
                </p>
                <p className="bp-mono bp-dim mt-3 text-[0.7rem] leading-5">
                  {project.stack.join(" · ")}
                </p>
                <div className="mt-auto">
                  <ProjectLinks links={project.links} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
