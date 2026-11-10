import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@content/site";
import { Career } from "@/components/sections/Career";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ContactQrCard } from "@/components/ui/ContactQrCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { socialIcons } from "@/components/ui/socialIcons";
import { bookingHref } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import { getExperience } from "@/lib/profile";
import { breadcrumbNode, profilePageNode, type Crumb } from "@/lib/schema";
import { getSettings, type SiteSettings } from "@/lib/settings";

const path = "/about";

function pageTitle({ name, jobTitle, city }: SiteSettings["person"]) {
  return `About ${name}, ${jobTitle}${city ? ` in ${city}` : ""}`;
}

function pageDescription({ person, about }: SiteSettings) {
  return person.description ?? about.story[0] ?? site.seo.description;
}

/** Whole years since the earliest job in Experience, e.g. "2023" or "Jan 2023". */
function yearsOfExperience(starts: string[]) {
  const years = starts.flatMap((start) => start.match(/\d{4}/)?.[0] ?? []).map(Number);
  return years.length > 0 ? new Date().getFullYear() - Math.min(...years) : 0;
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return pageMetadata({
    title: pageTitle(settings.person),
    description: pageDescription(settings),
    path,
    absoluteTitle: true,
  });
}

const headingClass = "text-3xl leading-tight sm:text-4xl";

export default async function AboutPage() {
  const [settings, jobs] = await Promise.all([getSettings(), getExperience()]);
  const { person, about, social, whatsapp, resume } = settings;
  const { aboutPage: labels, breadcrumbs, cta } = site;
  const crumbs: Crumb[] = [{ label: breadcrumbs.home, href: "/" }, { label: breadcrumbs.about }];
  const location = [person.city, person.country].filter(Boolean).join(", ");
  const years = yearsOfExperience(jobs.map((job) => job.start));

  const facts = [
    { label: labels.facts.role, value: person.jobTitle },
    {
      label: labels.facts.company,
      value: person.worksFor?.name,
      href: person.worksFor?.url,
    },
    { label: labels.facts.location, value: location },
    { label: labels.facts.experience, value: years > 0 ? labels.experienceYears.replace("{years}", String(years)) : null },
    { label: labels.facts.languages, value: person.languages.join(", ") },
    { label: labels.facts.email, value: person.email, href: `mailto:${person.email}` },
  ].filter((fact) => fact.value);

  // Only links set in the admin panel are listed. rel="me" tells search engines the profiles are yours.
  const profiles = [
    { label: "LinkedIn", href: social.linkedin },
    { label: "GitHub", href: social.github },
    { label: "Facebook", href: social.facebook },
    { label: "Instagram", href: social.instagram },
    { label: "X", href: social.x },
    { label: "WhatsApp", href: whatsapp ? `https://wa.me/${whatsapp}` : null, shown: whatsapp ? `+${whatsapp}` : null },
    { label: "Email", href: `mailto:${person.email}`, shown: person.email },
  ].flatMap((profile) =>
    profile.href
      ? [
          {
            label: profile.label,
            href: profile.href,
            shown: profile.shown ?? profile.href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
            isProfile: !("shown" in profile),
          },
        ]
      : [],
  );

  return (
    <article>
      <JsonLd
        nodes={[
          profilePageNode({ path, name: pageTitle(person), description: pageDescription(settings), settings }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <header className="wrap grid gap-10 pt-10 pb-12 md:grid-cols-12 md:items-center md:gap-14 md:pt-14 md:pb-16">
        <div className="md:col-span-7">
          <Breadcrumbs crumbs={crumbs} />
          <p className="mt-8 font-mono text-[0.8rem] font-medium text-accent">{labels.eyebrow}</p>
          <h1 className="mt-3 type-display">About {person.name}</h1>
          <p className="mt-5 text-xl text-fg/90">
            {person.jobTitle}
            {location && <span className="text-muted"> · {location}</span>}
          </p>
          {person.description && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{person.description}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            {resume && (
              <Button href="/resume" prefetch={false} download icon="download">
                {labels.resume}
              </Button>
            )}
            <Button href={bookingHref} variant={resume ? "secondary" : "primary"} icon="calendar">
              {cta.hero}
            </Button>
          </div>
        </div>

        {about.photo && (
          <Image
            src={about.photo.src}
            alt={about.photo.alt}
            width={about.photo.width}
            height={about.photo.height}
            sizes="(min-width: 72rem) 440px, (min-width: 48rem) 40vw, 100vw"
            priority
            className="aspect-square w-full rounded-lg object-cover md:col-span-5"
          />
        )}
      </header>

      <div className="border-y border-line bg-raised/80">
        <dl className="wrap grid grid-cols-1 gap-x-6 gap-y-6 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-xs font-medium tracking-wide text-accent uppercase">{fact.label}</dt>
              <dd className="mt-1.5 text-lg break-words">
                {fact.href ? (
                  <a
                    href={fact.href}
                    className="underline-offset-4 hover:text-accent hover:underline"
                    {...(fact.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {fact.value}
                  </a>
                ) : (
                  fact.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {about.story.length > 0 && (
        <section aria-labelledby="story" className="wrap section-y">
          <h2 id="story" className={headingClass}>
            {labels.story}
          </h2>
          <div className="mt-6 max-w-3xl space-y-4 text-lg leading-relaxed text-muted">
            {about.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      )}

      <Career />

      <div className="border-y border-line bg-raised/80">
        <div className="wrap section-y grid gap-12 md:grid-cols-12 md:gap-14">
          {person.skills.length > 0 && (
            <section aria-labelledby="skills" className="md:col-span-7">
              <h2 id="skills" className={headingClass}>
                {labels.skills}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {person.skills.map((skill) => (
                  <li key={skill} className="rounded-full border border-fg/15 px-3.5 py-1.5 text-sm">
                    {skill}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {profiles.length > 0 && (
            <section aria-labelledby="profiles" className="md:col-span-5">
              <h2 id="profiles" className={headingClass}>
                {labels.profiles}
              </h2>
              <ul className="mt-6 flex flex-wrap gap-3">
                {profiles.map((profile) => (
                  <li key={profile.label}>
                    <a
                      href={profile.href}
                      aria-label={`${profile.label}: ${profile.shown}`}
                      title={`${profile.label}: ${profile.shown}`}
                      {...(profile.href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: profile.isProfile ? "me noopener noreferrer" : "noopener noreferrer" })}
                      className="flex size-14 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                    >
                      <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
                        <path d={socialIcons[profile.label]} />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
              <ContactQrCard className="mt-8" />
            </section>
          )}
        </div>
      </div>

      <section aria-labelledby="cta" className="wrap section-y text-center">
        <h2 id="cta" className="type-section">
          {labels.ctaTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted">{labels.ctaText}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={bookingHref} icon="calendar">
            {cta.hero}
          </Button>
          <Button href="/#contact" variant="secondary" icon="arrow">
            {site.contact.formTitle}
          </Button>
        </div>
      </section>
    </article>
  );
}
