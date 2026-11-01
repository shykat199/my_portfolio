import type { MetadataRoute } from "next";
import { site } from "@content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    ...site.services.items.map((service) => `/services/${service.slug}`),
    ...site.work.projects.map((project) => `/work/${project.slug}`),
    "/privacy",
  ];

  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: site.lastUpdated,
  }));
}
