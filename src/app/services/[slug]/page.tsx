import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { bookingHref } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import { getProject } from "@/lib/projects";
import { breadcrumbNode, faqNode, serviceNode, webPageNode, type Crumb } from "@/lib/schema";
import { formatPrice, getService } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Only the slugs in content/site.ts exist. Anything else is a real 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return site.services.items.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return pageMetadata({
    title: service.seoTitle,
    description: service.intro,
    path: `/services/${service.slug}`,
  });
}

const headingClass = "text-3xl leading-tight sm:text-4xl";

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const { servicePage, process, breadcrumbs, cta, services, work } = site;
  const path = `/services/${service.slug}`;
  const crumbs: Crumb[] = [
    { label: breadcrumbs.home, href: "/" },
    { label: breadcrumbs.services, href: "/#services" },
    { label: service.name },
  ];
  const projects = service.relatedProjects.flatMap((projectSlug) => getProject(projectSlug) ?? []);
  const otherServices = services.items.filter((item) => item.slug !== service.slug);

  return (
    <article>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: service.seoTitle,
            description: service.intro,
            hasBreadcrumb: true,
          }),
          serviceNode(service),
          breadcrumbNode(path, crumbs),
          faqNode(path, service.faq),
        ]}
      />

      <header className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-8 max-w-4xl text-[2.75rem] leading-[1.06] sm:text-6xl">{service.heading}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{service.intro}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Button href={bookingHref}>{cta.hero}</Button>
          <Button href="/#contact" variant="secondary">
            {site.contact.formTitle}
          </Button>
        </div>
      </header>

      <div className="border-y border-line bg-raised">
        <div className="wrap section-y grid gap-10 md:grid-cols-2 md:gap-14">
          <div className="space-y-4 text-lg leading-relaxed text-muted">
            {service.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <section aria-labelledby="who-for">
            <h2 id="who-for" className={headingClass}>
              {servicePage.whoFor}
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{service.forWho}</p>
            <ul className="mt-5 space-y-3">
              {service.idealFor.map((item) => (
                <li key={item} className="flex gap-3 leading-snug">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <div className="wrap section-y grid gap-10 md:grid-cols-12 md:gap-14">
        <section aria-labelledby="included" className="md:col-span-7">
          <h2 id="included" className={headingClass}>
            {servicePage.included}
          </h2>
          <ul className="mt-6 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-lg leading-snug">
                <span aria-hidden="true" className="mt-3 h-px w-3 shrink-0 bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="price" className="rounded-lg border border-line bg-raised p-7 md:col-span-5">
          <h2 id="price" className={headingClass}>
            {servicePage.price}
          </h2>
          <p className="mt-4 text-sm text-muted">{services.fromLabel}</p>
          <p className="font-serif text-5xl text-accent">
            {formatPrice(service.price)}
            {service.priceSuffix && <span className="font-sans text-base text-muted">{service.priceSuffix}</span>}
          </p>
          <p className="mt-4 text-sm text-muted">
            {service.timeLabel}: <span className="font-medium text-fg">{service.time}</span>
          </p>
          <p className="mt-4 leading-relaxed text-muted">{servicePage.priceNote}</p>
        </section>
      </div>

      <section aria-labelledby="how" className="border-y border-line bg-raised">
        <div className="wrap section-y">
          <h2 id="how" className={headingClass}>
            {servicePage.process}
          </h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {process.steps.map((step, index) => (
              <li key={step.title} className="border-t border-fg/25 pt-5">
                <p aria-hidden="true" className="font-serif text-xl text-accent">
                  {index + 1}
                </p>
                <h3 className="mt-3 text-2xl leading-tight">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {projects.length > 0 && (
        <section aria-labelledby="related" className="wrap section-y">
          <h2 id="related" className={headingClass}>
            {servicePage.related}
          </h2>
          <ul className="mt-8 grid gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <li key={project.slug}>
                <Link href={`/work/${project.slug}`} className="group block">
                  <Image
                    src={project.cover.src}
                    alt={project.cover.alt}
                    width={1600}
                    height={1000}
                    sizes="(min-width: 72rem) 530px, (min-width: 48rem) 50vw, 100vw"
                    className="rounded-lg"
                  />
                  <h3 className="mt-4 text-2xl leading-tight transition-colors group-hover:text-accent">
                    {project.title}
                  </h3>
                  {project.isDemo && <p className="mt-1 text-sm text-muted">{work.demoLabel}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="service-faq" className="border-t border-line">
        <div className="wrap section-y grid gap-8 md:grid-cols-12 md:gap-14">
          <h2 id="service-faq" className={`${headingClass} md:col-span-5`}>
            {servicePage.faq}
          </h2>
          <div className="md:col-span-7">
            <FaqList items={service.faq} />
          </div>
        </div>
      </section>

      <section aria-labelledby="other" className="border-t border-line">
        <div className="wrap py-14">
          <h2 id="other" className={headingClass}>
            {servicePage.other}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {otherServices.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="block rounded-lg border border-line p-5 transition-colors hover:border-accent/50"
                >
                  <span className="block font-serif text-2xl">{item.name}</span>
                  <span className="mt-1 block text-sm text-muted">
                    {services.fromLabel} {formatPrice(item.price)}
                    {item.priceSuffix}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line bg-raised">
        <div className="wrap section-y">
          <h2 className="max-w-2xl text-4xl leading-[1.1] sm:text-5xl">{servicePage.ctaTitle}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{servicePage.ctaText}</p>
          <Button href={bookingHref} className="mt-8">
            {cta.hero}
          </Button>
        </div>
      </section>
    </article>
  );
}
