import { site } from "@content/site";
import { getPost, getPosts } from "@/lib/blog";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Article by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  return renderOgImage(post?.title ?? site.seo.title, "shykatroy.com/blog");
}
