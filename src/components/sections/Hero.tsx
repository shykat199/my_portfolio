import Image from "next/image";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { TypedWords } from "@/components/ui/TypedWords";
import { bookingHref } from "@/lib/booking";
import { getSettings } from "@/lib/settings";
import { CodePanel } from "./CodePanel";

export async function Hero() {
  const { cta } = site;
  const settings = await getSettings();
  const { hero } = settings;
  const photo = settings.about.photo ?? site.about.photo;
  // Split the headline around the coloured words (if they appear in it).
  const highlightAt = hero.highlight ? hero.headline.indexOf(hero.highlight) : -1;
  const before = highlightAt >= 0 ? hero.headline.slice(0, highlightAt) : hero.headline;
  const after = highlightAt >= 0 ? hero.headline.slice(highlightAt + hero.highlight!.length) : "";

  return (
    <section className="relative -mt-20 overflow-hidden">
      <div aria-hidden="true" className="hero-glow absolute inset-0" />
      <div aria-hidden="true" className="blueprint-grid absolute inset-0 opacity-60" />

      <div className="wrap relative grid items-center gap-12 pt-28 pb-14 sm:pt-34 sm:pb-16 md:pt-40 md:pb-24 lg:grid-cols-12 lg:gap-12 lg:pt-32 lg:pb-20 xl:gap-14">
        <div className="min-w-0 lg:col-span-7">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-accent/[0.07] px-3.5 py-1.5 font-mono text-[0.8rem] font-medium text-accent sm:text-sm">
            <span aria-hidden="true" className="relative flex size-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            <TypedWords prefix={hero.prefix} words={hero.words} />
          </p>
          <h1 className="mt-4 type-display sm:mt-5">
            {before}
            {highlightAt >= 0 && <span className="text-highlight">{hero.highlight}</span>}
            {after}
          </h1>
          <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-muted sm:mt-6 sm:text-xl lg:text-lg xl:text-xl">{hero.supporting}</p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row lg:mt-8">
            <Button href={bookingHref} icon="calendar">
              {cta.hero}
            </Button>
            <Button href="/#work" variant="secondary" icon="arrow">
              {cta.work}
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-3 sm:mt-10 lg:mt-8">
            <Image
              src={photo.src}
              alt={photo.alt}
              width={96}
              height={96}
              sizes="48px"
              className="size-12 rounded-full object-cover"
            />
            <p className="max-w-xs text-sm leading-snug text-muted">{site.hero.signature}</p>
          </div>
        </div>

        <div className="min-w-0 lg:col-span-5">
          <CodePanel />
        </div>
      </div>
    </section>
  );
}
