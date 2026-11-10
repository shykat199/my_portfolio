import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import { getProject, getProjects } from "@/lib/projects";
import { breadcrumbNode, caseStudyNode, webPageNode, type Crumb } from "@/lib/schema";
import { getService } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Projects added in the admin panel after the last build are rendered the first time they are visited.
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    ...pageMetadata({
      title: project.seo.title,
      description: project.seo.description,
      path: `/work/${project.slug}`,
      type: "article",
    }),
    keywords: project.seo.keywords,
  };
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-9 md:grid-cols-12 md:gap-10">
      <h2 className="text-2xl leading-tight md:col-span-4">{title}</h2>
      <div className="text-lg leading-relaxed text-muted md:col-span-8">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden="true" className="mt-3.5 h-px w-3 shrink-0 bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const { caseStudy, work, cta, breadcrumbs } = site;
  const path = `/work/${project.slug}`;
  const service = project.relatedService ? await getService(project.relatedService) : undefined;
  const crumbs: Crumb[] = [
    { label: breadcrumbs.home, href: "/" },
    { label: breadcrumbs.work, href: "/work" },
    { label: project.title },
  ];

  return (
    <article>
      <JsonLd
        nodes={[
          webPageNode({
            path,
            name: project.seo.title,
            description: project.seo.description,
            hasBreadcrumb: true,
          }),
          caseStudyNode(project),
          breadcrumbNode(path, crumbs),
        ]}
      />
      <header className="wrap pt-10 pb-10 md:pt-16 md:pb-14">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-8 text-sm text-muted">
          {project.category} · {caseStudy.yearLabel} {project.year}
          {project.isDemo && (
            <span className="ml-3 rounded-lg border border-accent/40 px-2 py-0.5 text-xs font-medium text-accent">
              {work.demoLabel}
            </span>
          )}
        </p>
        <h1 className="mt-4 max-w-3xl type-display">{project.title}</h1>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
          >
            {caseStudy.liveLinkLabel}
            <span aria-hidden="true"> ↗</span>
          </a>
        )}
      </header>

      <div className="wrap">
        <Image
          src={project.cover.src}
          alt={project.cover.alt}
          width={1600}
          height={1000}
          sizes="(min-width: 72rem) 1088px, 100vw"
          preload
          fetchPriority="high"
          className="rounded-lg"
        />

        <div className="mt-14">
          <Block title={caseStudy.overview}>
            <p>{project.overview}</p>
          </Block>
          <Block title={caseStudy.problem}>
            <p>{project.clientProblem}</p>
          </Block>
          <Block title={caseStudy.built}>
            <List items={project.built} />
          </Block>
          <Block title={caseStudy.tech}>
            <p>{project.tech.join(", ")}</p>
          </Block>
          <Block title={caseStudy.results}>
            <List items={project.results} />
          </Block>
          {service && (
            <Block title={caseStudy.relatedService}>
              <Link href={`/services/${service.slug}`} className="text-accent underline underline-offset-4">
                {service.heading}
              </Link>
            </Block>
          )}
        </div>

        {project.screenshots.length > 0 && (
          <section aria-labelledby="screenshots" className="border-t border-line py-9">
            <h2 id="screenshots" className="text-2xl leading-tight">
              {caseStudy.screenshots}
            </h2>
            <div className="mt-7 grid gap-8 md:grid-cols-2">
              {project.screenshots.map((screenshot) => (
                <Reveal key={screenshot.src}>
                  <figure>
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={1600}
                      height={1000}
                      sizes="(min-width: 72rem) 530px, (min-width: 48rem) 50vw, 100vw"
                      className="rounded-lg border border-line"
                    />
                    <figcaption className="mt-3 text-sm text-muted">{screenshot.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}
      </div>

      <section className="mt-10 border-t border-line bg-raised">
        <div className="wrap section-y">
          <h2 className="max-w-2xl type-section">{caseStudy.ctaTitle}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{caseStudy.ctaText}</p>
          <Button href={bookingHref} icon="calendar" className="mt-8">
            {cta.hero}
          </Button>
        </div>
      </section>
    </article>
  );
}
