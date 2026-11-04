import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";

/** The newest of several YYYY-MM-DD dates, ignoring missing ones. */
function latest(...dates: (string | null | undefined)[]) {
  return dates.filter((date): date is string => Boolean(date)).sort().at(-1) ?? site.lastUpdated;
}

/**
 * Every public page, with the date it last changed, so search engines know
 * what to re-crawl. Drafts and hidden items never appear (the API leaves
 * them out).
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services, projects, settings] = await Promise.all([
    getPosts(),
    getServices(),
    getProjects(),
    getSettings(),
  ]);
  const postDate = (post: (typeof posts)[number]) => post.updated ?? post.published;

  return [
    {
      // The home page shows services, projects, the latest posts and the settings.
      url: site.url, // Matches the home page canonical exactly.
      lastModified: latest(
        settings.updatedAt,
        ...services.map((service) => service.updatedAt),
        ...projects.map((project) => project.updatedAt),
        ...posts.map(postDate),
      ),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...services.map((service) => ({
      url: `${site.url}/services/${service.slug}`,
      lastModified: latest(service.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: latest(project.updatedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/blog`,
      lastModified: latest(...posts.map(postDate)),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: postDate(post),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: `${site.url}/privacy`,
      lastModified: site.lastUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
