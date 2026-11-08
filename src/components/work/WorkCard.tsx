import Image from "next/image";
import Link from "next/link";
import { site, type Project } from "@content/site";

/** How many technologies the card lists; the case study shows them all. */
const TECH_SHOWN = 4;

/** A project on the all-work page. The whole card links to its case study. */
export function WorkCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const { work } = site;

  return (
    <article className="matte-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-accent/40">
      {/*
        Shaped like the project covers (1600×782 screenshots), so they fill it exactly.
        A cover of another shape shows whole, with a blurred copy filling the frame around it.
      */}
      <div className="relative aspect-[1600/782] overflow-hidden border-b border-line">
        <Image src={project.cover.src} alt="" aria-hidden="true" fill sizes="64px" className="scale-125 object-cover opacity-60 blur-2xl" />
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          fill
          sizes="(min-width: 80rem) 400px, (min-width: 48rem) 50vw, 100vw"
          preload={priority}
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transform-none"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.7rem] text-accent">
            {project.category}
          </span>
          {project.year && <span className="font-mono text-[0.7rem] text-muted">{project.year}</span>}
          {project.isDemo && <span className="font-mono text-[0.7rem] text-warm">{work.demoLabel}</span>}
        </div>

        <h2 className="mt-4 text-2xl leading-tight">
          {/* The whole card is clickable through this link's stretched area. */}
          <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
            {project.title}
          </Link>
        </h2>

        <dl className="mt-4 space-y-3 text-[0.95rem] leading-relaxed">
          <div>
            <dt className="font-medium">{work.labels.problem}</dt>
            <dd className="line-clamp-2 text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-medium">{work.labels.result}</dt>
            <dd className="line-clamp-2 text-muted">{project.result}</dd>
          </div>
        </dl>

        {project.tech.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={site.caseStudy.tech}>
            {project.tech.slice(0, TECH_SHOWN).map((tech) => (
              <li key={tech} className="rounded-md border border-line px-2 py-0.5 font-mono text-[0.7rem] text-muted">
                {tech}
              </li>
            ))}
          </ul>
        )}

        <span aria-hidden="true" className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-accent">
          {work.linkLabel}
          <svg
            viewBox="0 0 24 24"
            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </article>
  );
}
