import type { Metadata } from "next";
import type { ItemList } from "schema-dts";
import { site } from "@content/site";
import { WorkCard } from "@/components/work/WorkCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
import { breadcrumbNode, webPageNode, type Crumb } from "@/lib/schema";

const path = "/work";
const { workPage: page } = site;

export const metadata: Metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path,
});

/** Every project from the admin panel, newest first as ordered there, each linking to its case study. */
export default async function WorkPage() {
  const projects = await getProjects();
  const crumbs: Crumb[] = [{ label: site.breadcrumbs.home, href: "/" }, { label: site.breadcrumbs.work }];

  // Tells search engines this page lists the case studies.
  const list: ItemList = {
    "@type": "ItemList",
    "@id": `${site.url}${path}#projects`,
    name: page.title,
    numberOfItems: projects.length,
    itemListElement: projects.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${site.url}/work/${project.slug}`,
      name: project.title,
    })),
  };

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: page.seoTitle, description: page.description, hasBreadcrumb: true }),
          breadcrumbNode(path, crumbs),
          list,
        ]}
      />

      <header className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-8 font-mono text-[0.8rem] font-medium text-accent">{page.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl type-display">{page.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{page.intro}</p>
        {projects.length > 0 && (
          <p className="mt-6 font-mono text-xs text-muted">{page.count.replace("{count}", String(projects.length))}</p>
        )}
      </header>

      <section aria-label={page.title} className="wrap pb-24">
        {projects.length === 0 ? (
          <p className="text-lg text-muted">{page.empty}</p>
        ) : (
          <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <li key={project.slug}>
                <Reveal delay={(index % 3) * 0.06} className="h-full">
                  <WorkCard project={project} priority={index < 2} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-line bg-raised">
        <div className="wrap section-y">
          <h2 className="max-w-2xl type-section">{page.ctaTitle}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{page.ctaText}</p>
          <Button href={bookingHref} icon="calendar" className="mt-8">
            {site.cta.hero}
          </Button>
        </div>
      </section>
    </>
  );
}
