import type { MetadataRoute } from "next";
import { site } from "@content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/ only holds the endpoint the admin panel uses to refresh content.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
