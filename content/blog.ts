/**
 * The blog's wording. The posts themselves are written in the admin panel
 * and loaded from its API (see BLOG_API_URL and src/lib/blog.ts).
 */

import type { FaqItem } from "./site";

/** What the blog list needs about each post. */
export type BlogPostSummary = {
  slug: string;
  title: string;
  /** Shown on the blog list and under the article title. */
  description: string;
  /** For search engines and social sites. The admin panel fills in any gaps
   * from the title, the summary and the topics. */
  seo: { title: string; description: string; keywords: string[] };
  category: string;
  tags: string[];
  /** Dates as YYYY-MM-DD. */
  published: string;
  updated?: string | null;
  readingMinutes: number;
  wordCount: number;
  cover: { src: string; alt: string } | null;
  service?: string | null;
};

/** A full post. The admin panel turns the Markdown article into safe HTML. */
export type BlogPost = BlogPostSummary & {
  html: string;
  /** The article's main headings, for "On this page". */
  toc: { id: string; text: string }[];
  faq: FaqItem[];
};

export const blog = {
  eyebrow: "Blog",
  title: "Web development insights for growing businesses",
  intro:
    "Practical guides on websites, web apps, mobile apps and SEO, written in plain English to help you make better decisions about your online presence.",
  seoTitle: "Web Development Blog: Websites, Apps & SEO Guides",
  description:
    "Practical guides from full-stack developer Shykat Roy on website costs, web apps, mobile apps, SEO and getting more customers online.",
  labels: {
    readMore: "Read article",
    minRead: "min read",
    published: "Published",
    updated: "Updated",
    by: "Written by",
    toc: "On this page",
    tags: "Topics",
    faq: "Frequently asked questions",
    share: "Share this article",
    related: "Keep reading",
    allPosts: "All articles",
    empty: "New articles are on the way. Check back soon.",
    latest: "Latest article",
    serviceEyebrow: "Related service",
    authorBio:
      "Full-stack web developer with more than 3 years of experience building websites, web apps and mobile apps with Laravel, React, Next.js and Node.js for businesses worldwide.",
    ctaTitle: "Have a project in mind?",
    ctaText: "Book a free 15-minute call and get a clear plan with one fixed price.",
    homeTitle: "Latest from the blog",
    homeIntro: "Guides to help you plan, build and grow your website or app.",
  },
};
