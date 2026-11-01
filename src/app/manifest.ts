import type { MetadataRoute } from "next";
import { site } from "@content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.seo.title,
    short_name: site.name,
    description: site.seo.description,
    lang: "en-GB",
    start_url: "/",
    display: "standalone",
    background_color: "#0c1311",
    theme_color: "#0c1311",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
