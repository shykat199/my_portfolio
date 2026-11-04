import Image from "next/image";
import Link from "next/link";
import { blog, type BlogPost } from "@content/blog";
import { formatDate, readingMinutes } from "@/lib/blog";

export function BlogMeta({ post }: { post: BlogPost }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden="true">·</span>
      <span>
        {readingMinutes(post)} {blog.labels.minRead}
      </span>
    </p>
  );
}

export function BlogCover({ post, sizes, priority = false }: { post: BlogPost; sizes: string; priority?: boolean }) {
  return (
    <Image
      src={post.cover.src}
      alt={post.cover.alt}
      width={1200}
      height={630}
      sizes={sizes}
      priority={priority}
      // SVG illustrations are already sharp at any size, so skip resizing them.
      unoptimized={post.cover.src.endsWith(".svg")}
      className="aspect-[1200/630] w-full object-cover"
    />
  );
}

type BlogCardProps = { post: BlogPost; featured?: boolean; headingLevel?: "h2" | "h3" };

export function BlogCard({ post, featured = false, headingLevel = "h2" }: BlogCardProps) {
  const Heading = headingLevel;

  return (
    <article
      className={`matte-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-line transition-colors duration-300 hover:border-accent/40 ${
        featured ? "lg:grid lg:grid-cols-2" : ""
      }`}
    >
      <div className={`overflow-hidden border-b border-line ${featured ? "lg:border-r lg:border-b-0" : ""}`}>
        <div className="transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none">
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
        <p className="mt-3 leading-relaxed text-muted">{post.description}</p>

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
