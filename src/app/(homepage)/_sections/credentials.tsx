import { certifications, education } from "@/content/profile";
import { CrossMark } from "./decor";
import { ExternalArrow, SectionHeader } from "./shared";

export function Credentials() {
  return (
    <section id="credentials" className="bp-section">
      <div className="bp-container">
        <CrossMark at="-left-6 top-[9rem]" label="x 64 · y 5310" speed={0.3} />
        <SectionHeader
          id="credentials"
          index="04"
          label="credentials"
          title={
            <>
              Education &amp; <em className="bp-serif">certifications</em>
            </>
          }
        />

        <div
          data-build-section="education"
          data-build-grid
          className="mt-14 grid gap-4 md:grid-cols-2"
        >
          {education.map((school, i) => (
            <article
              key={school.school}
              data-build-item
              data-build="frame"
              {...(i === 0 ? { "data-build-tune": "" } : {})}
              data-build-label="school"
              className="bp-card p-6 md:p-8"
            >
              <p
                data-build-item
                data-build="type"
                data-build-color="text"
                className="bp-mono bp-accent text-xs"
              >
                {school.dates} · {school.place}
              </p>
              <h3
                data-build-item
                data-build="type"
                data-build-font
                className="bp-h3 mt-3 text-xl"
              >
                {school.degree}
              </h3>
              <p data-build-item data-build="type" className="mt-1">
                {school.school}
              </p>
              <p
                data-build-item
                data-build="reveal"
                className="bp-muted mt-4 text-sm leading-6"
              >
                {school.detail}
              </p>
              {i === 0 ? (
                <p className="bp-mono bp-dim mt-4 text-xs">in progress</p>
              ) : null}
            </article>
          ))}
        </div>

        <div data-build-section="certifications" className="mt-10">
          <p data-build-item data-build="type" className="bp-eyebrow">
            certifications
          </p>
          <ul data-build-list data-build-grid className="mt-5 grid gap-3 md:grid-cols-2">
            {certifications.map((cert, i) => {
              const body = (
                <>
                  <div className="min-w-0">
                    <p className="font-medium leading-6">{cert.name}</p>
                    <p className="bp-muted mt-0.5 text-sm">
                      {cert.issuer} · {cert.issued}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {cert.status === "expired" ? (
                      <span className="bp-chip">expired {cert.expired}</span>
                    ) : (
                      <span className="bp-chip border-[color:var(--bp-accent)] text-[color:var(--bp-accent)]">
                        active
                      </span>
                    )}
                    {cert.href ? (
                      <ExternalArrow className="bp-muted h-4 w-4" />
                    ) : null}
                  </div>
                </>
              );
              const className =
                "bp-card flex items-center justify-between gap-4 p-4 sm:p-5";
              return (
                <li
                  key={cert.name}
                  data-build-item
                  data-build={i === 0 ? "frame" : "dup"}
                >
                  {cert.href ? (
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${className} bp-card-hover`}
                      aria-label={`${cert.name}, ${cert.issuer} (verify)`}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className={className}>{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
