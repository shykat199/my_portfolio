import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@content/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { getPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { getProjects } from "@/lib/projects";
import { breadcrumbNode, webPageNode, type Crumb } from "@/lib/schema";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";

const path = "/site-map";
const { sitemapPage: page } = site;

export const metadata: Metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path,
});

type SitemapLink = { label: string; href: string };

/**
 * Every page on the site at a glance. Services, work and posts come from the
 * admin panel; empty lists and home sections switched off there are left out.
 */
export default async function SitemapPage() {
  const [services, projects, posts, { hiddenSections }] = await Promise.all([
    getServices(),
    getProjects(),
    getPosts(),
    getSettings(),
  ]);
  const crumbs: Crumb[] = [{ label: site.breadcrumbs.home, href: "/" }, { label: site.breadcrumbs.sitemap }];

  const groups: { title: string; links: SitemapLink[] }[] = [
    {
      title: page.pages,
      links: page.links.filter((link: { section?: string }) => !link.section || !hiddenSections.includes(link.section)),
    },
    { title: page.services, links: services.map((service) => ({ label: service.heading, href: `/services/${service.slug}` })) },
    { title: page.work, links: projects.map((project) => ({ label: project.title, href: `/work/${project.slug}` })) },
    { title: page.blog, links: posts.map((post) => ({ label: post.title, href: `/blog/${post.slug}` })) },
  ].filter((group) => group.links.length > 0);

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: page.seoTitle, description: page.description, hasBreadcrumb: true }),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <div className="wrap pt-10 pb-20 md:pt-14 md:pb-28">
        <Breadcrumbs crumbs={crumbs} />
        <h1 className="mt-8 type-display">{page.title}</h1>
        <p className="mt-4 text-lg text-muted">{page.intro}</p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <section key={group.title} aria-labelledby={`sitemap-${group.title}`}>
              <h2 id={`sitemap-${group.title}`} className="border-b border-line pb-3 text-xl">
                {group.title}
              </h2>
              <ul className="mt-3 text-muted">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-block py-1.5 underline-offset-4 transition-colors hover:text-fg hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
