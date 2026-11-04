import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blog } from "@content/blog";
import { site } from "@content/site";
import { BlogBody } from "@/components/blog/BlogBody";
import { BlogCard, BlogCover } from "@/components/blog/BlogCard";
import { ShareLinks } from "@/components/blog/ShareLinks";
import { MobileTableOfContents, TableOfContents } from "@/components/blog/TableOfContents";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/ui/FaqList";
import { JsonLd } from "@/components/ui/JsonLd";
import { formatDate, getPost, getPosts, relatedPosts } from "@/lib/blog";
import { bookingHref } from "@/lib/booking";
import { pageMetadata } from "@/lib/metadata";
import { getSettings } from "@/lib/settings";
import { blogPostingNode, breadcrumbNode, faqNode, webPageNode, type Crumb } from "@/lib/schema";
import { formatPrice, getService } from "@/lib/services";

type PageProps = {
  params: Promise<{ slug: string }>;
};

// Posts published after the last build are rendered the first time they are visited.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    ...pageMetadata({
      // Shown exactly as written in the admin panel, without " | Shykat Roy" added.
      title: post.seo.title,
      absoluteTitle: true,
      description: post.seo.description,
      path: `/blog/${post.slug}`,
      type: "article",
      article: { publishedTime: post.published, modifiedTime: post.updated ?? undefined, tags: post.tags },
    }),
    keywords: post.seo.keywords,
    authors: [{ name: site.name, url: site.url }],
  };
}

const sideLabel = "font-mono text-xs font-medium tracking-wide text-accent uppercase";

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { labels } = blog;
  const path = `/blog/${post.slug}`;
  const crumbs: Crumb[] = [
    { label: site.breadcrumbs.home, href: "/" },
    { label: site.breadcrumbs.blog, href: "/blog" },
    { label: post.title },
  ];
  const headings = post.toc;
  const service = post.service ? await getService(post.service) : undefined;
  const related = relatedPosts(post, await getPosts());
  const { about } = await getSettings();

  return (
    <article>
      <JsonLd
        nodes={[
          webPageNode({ path, name: post.seo.title, description: post.seo.description, hasBreadcrumb: true }),
          blogPostingNode(post),
          breadcrumbNode(path, crumbs),
          ...(post.faq.length > 0 ? [faqNode(path, post.faq)] : []),
        ]}
      />

      <header className="wrap pt-10 pb-12 md:pt-14 md:pb-14">
        <Breadcrumbs crumbs={crumbs} />
        <p className="mt-8 inline-block rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
          {post.category}
        </p>
        <h1 className="mt-5 max-w-4xl type-display">{post.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted sm:text-xl">{post.description}</p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-line pt-6">
          <div className="flex items-center gap-3">
            <Image
              src={about.photo?.src ?? site.about.photo.src}
              alt=""
              width={88}
              height={88}
              sizes="44px"
              className="size-11 rounded-full object-cover"
            />
            <p className="text-sm leading-snug">
              <span className="block text-muted">{labels.by}</span>
              <Link href="/#about" rel="author" className="font-medium hover:text-accent">
                {site.name}
              </Link>
            </p>
          </div>
          <dl className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <div>
              <dt className="inline">{labels.published}: </dt>
              <dd className="inline text-fg/90">
                <time dateTime={post.published}>{formatDate(post.published)}</time>
              </dd>
            </div>
            {post.updated && (
              <div>
                <dt className="inline">{labels.updated}: </dt>
                <dd className="inline text-fg/90">
                  <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </dd>
              </div>
            )}
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd className="inline text-fg/90">
                {post.readingMinutes} {labels.minRead}
              </dd>
            </div>
          </dl>
        </div>

        {post.cover && (
          <figure className="mt-10 overflow-hidden rounded-2xl border border-line">
            <BlogCover post={post} priority sizes="(min-width: 72rem) 1088px, 100vw" />
          </figure>
        )}
      </header>

      <div className="wrap grid gap-12 pb-20 lg:grid-cols-12 lg:gap-14">
        <aside className="hidden lg:order-2 lg:col-span-4 lg:block">
          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="matte-card hidden rounded-lg border border-line p-6 lg:block">
              <TableOfContents title={labels.toc} headings={headings} />
            </div>
            <div className="hidden lg:block">
              <ShareLinks title={post.title} url={`${site.url}${path}`} label={labels.share} />
            </div>
            <div className="hidden rounded-lg border border-accent/25 bg-accent/[0.06] p-6 lg:block">
              <p className="font-serif text-xl">{labels.ctaTitle}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{labels.ctaText}</p>
              <Button href={bookingHref} icon="calendar" className="mt-4 min-h-10! px-5! text-sm!">
                {site.cta.header}
              </Button>
            </div>
          </div>
        </aside>

        <div className="min-w-0 lg:order-1 lg:col-span-8">
          <MobileTableOfContents title={labels.toc} headings={headings} />
          <BlogBody html={post.html} />

          <div className="mt-12 border-t border-line pt-6">
            <p className={sideLabel}>{labels.tags}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-fg/15 px-3 py-1 font-mono text-xs text-fg/80">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 lg:hidden">
            <ShareLinks title={post.title} url={`${site.url}${path}`} label={labels.share} />
          </div>

          {post.faq.length > 0 && (
            <section aria-labelledby="faq" className="mt-16">
              <h2 id="faq" className="scroll-mt-28 text-3xl leading-tight sm:text-[2.1rem]">
                {labels.faq}
              </h2>
              <div className="mt-6">
                <FaqList items={post.faq} />
              </div>
            </section>
          )}

          {service && (
            <aside className="matte-card mt-16 rounded-lg border border-line p-6 sm:p-8">
              <p className={sideLabel}>{labels.serviceEyebrow}</p>
              <p className="mt-3 font-serif text-2xl leading-tight">
                <Link href={`/services/${service.slug}`} className="hover:text-accent">
                  {service.heading}
                </Link>
              </p>
              <p className="mt-2 leading-relaxed text-muted">{service.forWho}</p>
              <p className="mt-4 font-mono text-sm text-accent">
                {site.services.fromLabel} {formatPrice(service.price)}
                {service.priceSuffix}
              </p>
              <Button href={`/services/${service.slug}`} variant="secondary" icon="arrow" className="mt-5">
                {site.services.linkLabel}
              </Button>
            </aside>
          )}

          <aside className="mt-16 flex flex-col gap-5 rounded-lg border border-line p-6 sm:flex-row sm:items-center sm:p-8">
            <Image
              src={about.photo?.src ?? site.about.photo.src}
              alt={about.photo?.alt ?? site.about.photo.alt}
              width={160}
              height={160}
              sizes="80px"
              className="size-20 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-sm text-muted">{labels.by}</p>
              <p className="font-serif text-2xl">{site.name}</p>
              <p className="mt-2 leading-relaxed text-muted">{labels.authorBio}</p>
            </div>
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="border-t border-line bg-raised/80">
          <div className="wrap section-y">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="related" className="type-section">
                {labels.related}
              </h2>
              <Link href="/blog" className="text-sm font-medium text-accent underline-offset-4 hover:underline">
                {labels.allPosts}
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-2">
              {related.map((other) => (
                <li key={other.slug}>
                  <BlogCard post={other} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
}
