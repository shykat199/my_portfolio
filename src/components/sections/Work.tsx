import Image from "next/image";
import Link from "next/link";
import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getProjects } from "@/lib/projects";

export async function Work() {
  const { work } = site;
  const projects = await getProjects();
  if (projects.length === 0) return null;

  return (
    <section id="work" className="border-y border-line bg-raised/80">
      <div className="wrap section-y">
        <SectionHeading eyebrow={work.eyebrow} title={work.title} intro={work.intro} />

        <ul className="mt-12 space-y-14 md:space-y-20">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <Reveal>
                <article className="grid items-center gap-7 md:grid-cols-12 md:gap-10">
                  <Link
                    href={`/work/${project.slug}`}
                    className={`group block overflow-hidden rounded-lg md:col-span-7 ${index % 2 ? "md:order-last" : ""}`}
                  >
                    <Image
                      src={project.cover.src}
                      alt={project.cover.alt}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 72rem) 640px, (min-width: 48rem) 58vw, 100vw"
                      className="transition-transform duration-500 ease-out group-hover:scale-[1.015] motion-reduce:transform-none"
                    />
                  </Link>

                  <div className="md:col-span-5">
                    <p className="text-sm text-muted">
                      {project.category}
                      {project.isDemo && (
                        <span className="ml-3 rounded-lg border border-accent/40 px-2 py-0.5 text-xs font-medium text-accent">
                          {work.demoLabel}
                        </span>
                      )}
                    </p>
                    <h3 className="mt-3 text-3xl leading-tight">{project.title}</h3>

                    <dl className="mt-5 space-y-3 text-[0.95rem] leading-relaxed">
                      <div>
                        <dt className="font-medium">{work.labels.problem}</dt>
                        <dd className="text-muted">{project.problem}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">{work.labels.solution}</dt>
                        <dd className="text-muted">{project.solution}</dd>
                      </div>
                      <div>
                        <dt className="font-medium">{work.labels.result}</dt>
                        <dd className="text-muted">{project.result}</dd>
                      </div>
                    </dl>

                    <Link
                      href={`/work/${project.slug}`}
                      className="mt-5 inline-block py-1.5 font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {work.linkLabel}
                      <span className="sr-only">: {project.title}</span>
                    </Link>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
