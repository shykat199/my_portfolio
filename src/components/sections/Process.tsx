import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Process() {
  const { process } = site;

  return (
    <section id="process" className="wrap section-y">
      <SectionHeading eyebrow={process.eyebrow} title={process.title} intro={process.intro} />

      <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {process.steps.map((step, index) => (
          <li key={step.title}>
            <Reveal delay={index * 0.08} className="border-t border-fg/25 pt-5">
              <p aria-hidden="true" className="font-serif text-xl text-accent">
                {index + 1}
              </p>
              <h3 className="mt-3 text-2xl leading-tight">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
