import { site } from "@content/site";
import { posts, getPost } from "@/lib/blog";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Article by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);

  return renderOgImage(post?.title ?? site.seo.title, "shykatroy.com/blog");
}
