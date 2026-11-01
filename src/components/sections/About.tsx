import Image from "next/image";
import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  const { about } = site;

  return (
    <section id="about" className="border-y border-line bg-raised">
      <div className="wrap section-y grid gap-10 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-5">
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            width={about.photo.width}
            height={about.photo.height}
            sizes="(min-width: 72rem) 440px, (min-width: 48rem) 40vw, 100vw"
            className="aspect-square w-full rounded-lg object-cover"
          />
        </Reveal>

        <Reveal className="md:col-span-7">
          <p className="font-mono text-[0.8rem] font-medium text-accent">{about.eyebrow}</p>
          <h2 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">{about.title}</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <h3 className="mt-9 text-2xl">{about.reasonsTitle}</h3>
          <ul className="mt-4 space-y-3">
            {about.reasons.map((reason) => (
              <li key={reason} className="flex gap-3 leading-snug">
                <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                {reason}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
