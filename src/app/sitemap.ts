import type { MetadataRoute } from "next";
import { site } from "@content/site";
import { getPosts } from "@/lib/blog";
import { getProjects } from "@/lib/projects";
import { getServices } from "@/lib/services";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, services, projects] = await Promise.all([getPosts(), getServices(), getProjects()]);
  const paths = [
    "",
    ...services.map((service) => `/services/${service.slug}`),
    ...projects.map((project) => `/work/${project.slug}`),
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
