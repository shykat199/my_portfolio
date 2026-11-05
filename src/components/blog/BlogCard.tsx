import Image from "next/image";
import Link from "next/link";
import { blog, type BlogPostSummary } from "@content/blog";
import { formatDate } from "@/lib/blog";

export function BlogMeta({ post }: { post: BlogPostSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden="true">·</span>
      <span>
        {post.readingMinutes} {blog.labels.minRead}
      </span>
    </p>
  );
}

type BlogCoverProps = { post: BlogPostSummary; sizes: string; priority?: boolean };

export function BlogCover({ post, sizes, priority = false }: BlogCoverProps) {
  if (!post.cover) {
    // No image uploaded yet: a branded panel with the category keeps cards even.
    return (
      <div className="blueprint-grid flex aspect-[1200/630] w-full items-center justify-center bg-raised">
        <span className="font-serif text-3xl text-accent/70">{post.category}</span>
      </div>
    );
  }

  return (
    <Image
      src={post.cover.src}
      alt={post.cover.alt}
      width={1200}
      height={630}
      sizes={sizes}
      preload={priority}
      // SVG illustrations are already sharp at any size, so skip resizing them.
      unoptimized={post.cover.src.endsWith(".svg")}
      className="aspect-[1200/630] w-full object-cover"
    />
  );
}

type BlogCardProps = { post: BlogPostSummary; featured?: boolean; headingLevel?: "h2" | "h3" };

export function BlogCard({ post, featured = false, headingLevel = "h2" }: BlogCardProps) {
  const Heading = headingLevel;

  return (
    <article
      className={`matte-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-accent/40 ${
        featured ? "lg:grid lg:grid-cols-[1.2fr_1fr]" : ""
      }`}
    >
      <div className={`overflow-hidden border-b border-line ${featured ? "lg:flex lg:items-center lg:border-r lg:border-b-0 lg:bg-raised" : ""}`}>
        <div className="w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
          <BlogCover
            post={post}
            priority={featured}
            sizes={featured ? "(min-width: 64rem) 560px, 100vw" : "(min-width: 48rem) 560px, 100vw"}
          />
        </div>
      </div>

      <div className={`flex flex-1 flex-col p-6 sm:p-7 ${featured ? "lg:justify-center lg:p-10" : ""}`}>
        <div className="flex items-center gap-3">
          <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.7rem] text-accent">
            {post.category}
          </span>
          {featured && <span className="font-mono text-[0.7rem] text-warm">{blog.labels.latest}</span>}
        </div>

        <Heading className={`mt-4 leading-tight ${featured ? "text-3xl sm:text-[2.1rem]" : "text-2xl"}`}>
          {/* The whole card is clickable through this link's stretched area. */}
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:rounded-lg">
            {post.title}
          </Link>
        </Heading>
        {/* Clamped so long excerpts end neatly with "…" and cards stay even. */}
        <p className={`mt-3 leading-relaxed text-muted ${featured ? "line-clamp-4" : "line-clamp-3"}`}>{post.description}</p>

        <div className={`flex items-center justify-between gap-4 pt-6 ${featured ? "lg:mt-4" : "mt-auto"}`}>
          <BlogMeta post={post} />
          <span aria-hidden="true" className="flex items-center gap-1.5 text-sm font-medium text-accent">
            {blog.labels.readMore}
            <svg
              viewBox="0 0 24 24"
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
