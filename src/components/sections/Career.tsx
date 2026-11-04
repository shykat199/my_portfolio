import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getExperience } from "@/lib/profile";

export async function Career() {
  const { career } = site;
  const jobs = await getExperience();

  if (jobs.length === 0) return null;

  return (
    <section id="experience" className="wrap section-y">
      <SectionHeading eyebrow={career.eyebrow} title={career.title} intro={career.intro} />

      <ol className="relative mt-12 space-y-6 border-l border-fg/15 pl-7 md:ml-3 md:pl-10">
        {jobs.map((job, index) => {
          const isCurrent = !job.end;

          return (
            <li key={`${job.company}-${job.start}`} className="relative">
              <span
                aria-hidden="true"
                className={`absolute top-8 -left-[33px] size-[11px] rounded-full md:-left-[45px] ${
                  isCurrent
                    ? "bg-accent shadow-[0_0_0_4px_rgb(94_224_174/0.18),0_0_16px_2px_rgb(94_224_174/0.5)]"
                    : "border border-fg/40 bg-surface"
                }`}
              />

              <Reveal
                delay={index * 0.08}
                className={`matte-card rounded-lg border p-6 transition-colors duration-300 hover:border-fg/30 sm:p-8 ${
                  isCurrent ? "border-accent/40" : "border-line"
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-2xl leading-tight">{job.role}</h3>
                    <p className="mt-1 text-fg/90">
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:text-accent hover:underline"
                        >
                          {job.company}
                        </a>
                      ) : (
                        job.company
                      )}
                      <span className="text-muted"> · {job.type}</span>
                      {job.location && <span className="text-muted"> · {job.location}</span>}
                    </p>
                  </div>

                  <p className="flex items-center gap-2 font-mono text-[0.8rem] text-muted">
                    {isCurrent && (
                      <span className="flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-accent">
                        <span className="relative flex size-1.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                          <span className="relative size-1.5 rounded-full bg-accent" />
                        </span>
                        {career.current}
                      </span>
                    )}
                    {job.start} – {job.end ?? career.present}
                  </p>
                </div>

                <p className="mt-4 leading-relaxed text-muted">{job.summary}</p>

                {job.highlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {job.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-3 leading-snug">
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}

                {job.tech.length > 0 && (
                  <ul aria-label="Technologies" className="mt-5 flex flex-wrap gap-2">
                    {job.tech.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-fg/10 px-3 py-1 font-mono text-xs text-fg/80"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
