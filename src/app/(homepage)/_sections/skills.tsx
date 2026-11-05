/* eslint-disable @next/next/no-img-element */
import { skillGroups } from "@/content/profile";
import type { StorageLogo } from "../_services/logo-loader/actions/get-logos-storage";
import { Bracket, CrossMark } from "./decor";
import { SectionHeader } from "./shared";

export function Skills({ logos }: { logos: StorageLogo[] }) {
  return (
    <section id="skills" className="bp-section">
      <div className="bp-container">
        <Bracket at="-left-3 top-[12rem]" speed={0.3} />
        <CrossMark at="right-0 top-[30rem]" label="x 1120 · y 4410" speed={0.2} />
        <SectionHeader id="skills" index="03" label="stack" title="Tools I reach for">
          Agents and LLM infrastructure first, then the TypeScript, Python and
          AWS work that keeps them running in production.
        </SectionHeader>

        <div
          data-build-section="skill-groups"
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillGroups.map((group, gi) => (
            <div
              key={group.name}
              data-build-item
              data-build="frame"
              {...(gi === 0 ? { "data-build-tune": "" } : {})}
              data-build-label="group"
              className={`bp-card p-6 ${gi === 0 ? "md:col-span-2 lg:col-span-2" : ""}`}
            >
              <h3
                data-build-item
                data-build="type"
                data-build-color="text"
                className="bp-mono bp-accent text-xs uppercase tracking-[0.08em]"
              >
                {group.name}
              </h3>
              <ul data-build-list className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item, i) => (
                  <li
                    key={item}
                    data-build-item
                    data-build={i === 0 ? "frame" : "dup"}
                    className="bp-chip"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logos come from Firebase Storage, cached at build time. Unoptimized
            on purpose: they are tiny and Firebase URLs carry tokens. */}
        {logos.length > 0 ? (
          <div data-build-section="skill-logos" className="mt-12">
            <p data-build-item data-build="type" className="bp-eyebrow">
              {logos.length} logos in the toolbox
            </p>
            <ul
              data-build-list
              className="mt-5 grid grid-cols-5 gap-2 sm:grid-cols-7 md:grid-cols-10 lg:grid-cols-[repeat(13,minmax(0,1fr))]"
            >
              {logos.map((logo, i) => (
                <li
                  key={logo.path}
                  data-build-item
                  data-build={i === 0 ? "frame" : i <= 3 ? "image" : "dup"}
                  {...(i > 0 && i <= 3
                    ? { "data-build-from": i % 2 ? "right" : "bottom" }
                    : {})}
                  className="bp-card bp-logo-tile flex aspect-square items-center justify-center p-3"
                  title={logo.name}
                >
                  <img
                    src={logo.path}
                    alt={logo.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="bp-logo h-full w-full object-contain"
                  />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
