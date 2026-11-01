import { site } from "@content/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = site.seo.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(site.hero.headline, "shykatroy.com");
}
