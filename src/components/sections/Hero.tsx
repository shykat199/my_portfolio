import Image from "next/image";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";
import { CodePanel } from "./CodePanel";

export function Hero() {
  const { hero, cta, about } = site;
  const [before, after] = hero.headline.split(hero.headlineHighlight);

  return (
    <section className="relative -mt-20 overflow-hidden">
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />

      <div className="wrap relative grid items-center gap-12 pt-34 pb-16 md:pt-40 md:pb-24 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <p className="font-mono text-[0.8rem] font-medium text-accent">{hero.eyebrow}</p>
          <h1 className="mt-5 text-[2.75rem] leading-[1.06] sm:text-6xl lg:text-[4rem]">
            {before}
            <span className="text-highlight">{hero.headlineHighlight}</span>
            {after}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{hero.supporting}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={bookingHref}>{cta.hero}</Button>
            <Button href="/#work" variant="secondary">
              {cta.work}
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <Image
              src={about.photo.src}
              alt={about.photo.alt}
              width={96}
              height={96}
              sizes="48px"
              className="size-12 rounded-full object-cover"
            />
            <p className="max-w-xs text-sm leading-snug text-muted">{hero.signature}</p>
          </div>
        </div>

        <div className="lg:col-span-5">
          <CodePanel />
        </div>
      </div>
    </section>
  );
}
