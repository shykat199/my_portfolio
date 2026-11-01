import { site } from "@content/site";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = site.privacy.title;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOgImage(site.privacy.title, "shykatroy.com");
}
