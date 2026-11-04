import type { Metadata } from "next";
import { blog } from "@content/blog";
import { site } from "@content/site";
import { BlogCard } from "@/components/blog/BlogCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { blogNode, breadcrumbNode, webPageNode, type Crumb } from "@/lib/schema";

const path = "/blog";

export const metadata: Metadata = pageMetadata({
  title: blog.seoTitle,
  description: blog.description,
  path,
});

export default function BlogPage() {
  const crumbs: Crumb[] = [{ label: site.breadcrumbs.home, href: "/" }, { label: site.breadcrumbs.blog }];
  const [latest, ...rest] = posts;

  return (
    <>
      <JsonLd
        nodes={[
          webPageNode({ path, name: blog.seoTitle, description: blog.description, hasBreadcrumb: true }),
          blogNode(path, blog.title, blog.description, posts),
          breadcrumbNode(path, crumbs),
        ]}
      />

      <header className="wrap pt-10 pb-12 md:pt-14 md:pb-16">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-8 font-mono text-[0.8rem] font-medium text-accent">{blog.eyebrow}</p>
        <h1 className="mt-3 max-w-4xl type-display">{blog.title}</h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{blog.intro}</p>
      </header>

      <section aria-label={blog.labels.allPosts} className="wrap pb-24">
        {latest && (
          <Reveal>
            <BlogCard post={latest} featured />
          </Reveal>
        )}

        {rest.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-2">
            {rest.map((post, index) => (
              <li key={post.slug}>
                <Reveal delay={index * 0.06} className="h-full">
                  <BlogCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
