import { blog, type BlogBlock, type BlogPost } from "@content/blog";

/** Newest first. */
export const posts = [...blog.posts].sort((a, b) => b.published.localeCompare(a.published));

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}

/** Turns a heading into a URL-friendly id, e.g. "What is it?" -> "what-is-it". */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function blockText(block: BlogBlock) {
  return block.type === "list" ? block.items.join(" ") : block.text;
}

export function wordCount(post: BlogPost) {
  return post.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
}

/** About 200 words a minute, never less than 1. */
export function readingMinutes(post: BlogPost) {
  return Math.max(1, Math.round(wordCount(post) / 200));
}

export function tableOfContents(post: BlogPost) {
  return post.body.flatMap((block) => (block.type === "h2" ? [{ id: slugify(block.text), text: block.text }] : []));
}

export function formatDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function relatedPosts(post: BlogPost, limit = 2) {
  const shared = (other: BlogPost) => other.tags.filter((tag) => post.tags.includes(tag)).length;
  return posts
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, limit);
}
