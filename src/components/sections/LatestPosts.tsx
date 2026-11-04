import Link from "next/link";
import { blog } from "@content/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { posts } from "@/lib/blog";

export function LatestPosts() {
  if (posts.length === 0) return null;
  const { labels } = blog;

  return (
    <section id="blog" className="wrap section-y">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow={blog.eyebrow} title={labels.homeTitle} intro={labels.homeIntro} />
        <Link href="/blog" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
          {labels.allPosts} →
        </Link>
      </div>

      <ul className="mt-12 grid gap-6 md:grid-cols-2">
        {posts.slice(0, 2).map((post, index) => (
          <li key={post.slug}>
            <Reveal delay={index * 0.08} className="h-full">
              <BlogCard post={post} headingLevel="h3" />
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
