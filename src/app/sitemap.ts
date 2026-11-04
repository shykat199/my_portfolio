import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...site.services.items.map((service) => `/services/${service.slug}`),
    ...site.work.projects.map((project) => `/work/${project.slug}`),
    "/privacy",
  ];

  return [
    ...paths.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: site.lastUpdated,
    })),
    { url: `${site.url}/blog`, lastModified: posts[0]?.updated ?? posts[0]?.published ?? site.lastUpdated },
    ...posts.map((post) => ({
      url: `${site.url}/blog/${post.slug}`,
      lastModified: post.updated ?? post.published,
    })),
  ];
}
