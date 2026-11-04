import type { BlogPost, BlogPostSummary } from "@content/blog";
import type { FaqItem } from "@content/site";
import { fetchFromApi, fetchListFromApi } from "./api";

type ApiPost = BlogPostSummary & { html?: string; toc?: BlogPost["toc"]; faq?: FaqItem[] };

/**
 * All published posts, newest first. If the admin panel can't be reached
 * this returns an empty list, so the rest of the site keeps working.
 */
export function getPosts(): Promise<BlogPostSummary[]> {
  return fetchListFromApi<ApiPost>("/posts", "posts");
}

/** One published post, or undefined if there is no such post. */
export async function getPost(slug: string): Promise<BlogPost | undefined> {
  const post = await fetchFromApi<ApiPost>(`/posts/${encodeURIComponent(slug)}`, "posts");
  if (!post) return undefined;

  return { ...post, html: post.html ?? "", toc: post.toc ?? [], faq: post.faq ?? [] };
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function relatedPosts(post: BlogPostSummary, all: BlogPostSummary[], limit = 2) {
  const shared = (other: BlogPostSummary) => other.tags.filter((tag) => post.tags.includes(tag)).length;
  return all
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, limit);
}
