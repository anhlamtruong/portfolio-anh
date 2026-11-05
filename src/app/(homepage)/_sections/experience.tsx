import { experience } from "@/content/profile";
import { Bracket, CrossMark } from "./decor";
import { ExternalArrow, SectionHeader } from "./shared";
import { ScrambleText } from "./fx/scramble-text";

function slug(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function Experience() {
  const main = experience.filter((job) => !job.type);
  const earlier = experience.filter((job) => job.type);

  return (
    <section id="experience" className="bp-section">
      <div className="bp-container">
        <CrossMark at="-left-6 top-40" label="x 64 · y 1240" speed={0.25} />
        <Bracket at="-right-2 top-[28rem]" speed={0.4} flip />
        <SectionHeader
          id="experience"
          index="01"
          label="experience"
          title={
            <>
              Where I&apos;ve <em className="bp-serif">shipped</em>
            </>
          }
        >
          From AWS&apos;s Tier 0 DNS firewall to a startup shipping 837+ PRs in 45
          days, the common thread is agents doing real work behind tests.
        </SectionHeader>

        <ol className="mt-14 space-y-4">
          {main.map((job) => (
            <li
              key={`${job.company}-${job.role}`}
              data-build-section={`exp-${slug(job.company)}`}
            >
              <article
                data-build-item
                data-build="frame"
                data-build-tune
                data-build-label="role"
                className="bp-card grid gap-6 p-6 md:grid-cols-[220px_1fr] md:p-8"
              >
                <div className="bp-mono text-xs leading-6">
                  <p
                    data-build-item
                    data-build="type"
                    data-build-color="text"
                    className="bp-accent"
                  >
                    {job.dates}
                  </p>
                  <p data-build-item data-build="type" className="bp-muted">
                    {job.place}
                  </p>
                </div>

                <div>
                  <h3
                    data-build-item
                    data-build="type"
                    data-build-font
                    className="bp-h3"
                  >
                    {job.role}{" "}
                    <span className="bp-muted font-normal">· </span>
                    {job.link ? (
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bp-link inline-flex items-center gap-1"
                      >
                        <ScrambleText>{job.company}</ScrambleText>
                        <ExternalArrow className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span>{job.company}</span>
                    )}
                  </h3>

                  <ul
                    data-build-item
                    data-build="reveal"
                    className="bp-muted mt-4 space-y-2.5 text-[0.95rem] leading-7"
                  >
                    {job.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span
                          className="bp-dim mt-[0.7rem] h-px w-3 shrink-0 bg-[color:var(--bp-line-strong)]"
                          aria-hidden="true"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {job.stack?.length ? (
                    <ul
                      data-build-list
                      className="mt-5 flex flex-wrap gap-2"
                      aria-label={`${job.company} stack`}
                    >
                      {job.stack.map((tech, i) => (
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
                  ) : null}
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div data-build-section="exp-earlier" className="mt-10">
          <p data-build-item data-build="type" className="bp-eyebrow">
            earlier
          </p>
          <ul data-build-list data-build-grid className="mt-5 grid gap-3 md:grid-cols-3">
            {earlier.map((job, i) => (
              <li
                key={`${job.company}-${job.role}`}
                data-build-item
                data-build={i === 0 ? "frame" : "dup"}
                className="bp-card p-5"
              >
                <p className="bp-mono bp-accent text-xs">{job.dates}</p>
                <p className="bp-h3 mt-2 text-base">{job.role}</p>
                <p className="bp-muted mt-1 text-sm">{job.company}</p>
                <p className="bp-muted mt-3 text-sm leading-6">
                  {job.points[0]}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
