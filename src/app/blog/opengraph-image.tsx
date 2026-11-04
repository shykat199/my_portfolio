import { blog } from "@content/blog";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Blog by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export default async function OpengraphImage() {
  return renderOgImage(blog.title, "shykatroy.com/blog");
}
