import type { Metadata } from "next";
import { site } from "@content/site";
import { About } from "@/components/sections/About";
import { Career } from "@/components/sections/Career";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { LatestPosts } from "@/components/sections/LatestPosts";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { TechStack } from "@/components/sections/TechStack";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { getFaqs } from "@/lib/home";
import { faqNode, webPageNode, websiteNode } from "@/lib/schema";
import { getSettings } from "@/lib/settings";

/** The home page's title, description and keywords are set in the admin panel (Site settings). */
export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getSettings();

  return {
    ...pageMetadata({ title: seo.title, description: seo.description, path: "/", absoluteTitle: true }),
    ...(seo.keywords.length > 0 ? { keywords: seo.keywords } : {}),
  };
}

/** The sections below the hero, in order, keyed by the id the admin panel uses to switch them off. */
const sections = [
  ["trust", TrustStrip],
  ["services", Services],
  ["work", Work],
  ["stack", TechStack],
  ["process", Process],
  ["experience", Career],
  ["about", About],
  ["testimonials", Testimonials],
  ["blog", LatestPosts],
  ["faq", Faq],
  ["contact", Contact],
] as const;

export default async function Home() {
  const [faqs, { seo, hiddenSections }] = await Promise.all([getFaqs(), getSettings()]);
  const shown = sections.filter(([id]) => !hiddenSections.includes(id));
  const showsFaq = shown.some(([id]) => id === "faq");

  return (
    <>
      <JsonLd
        nodes={[
          websiteNode,
          webPageNode({ path: "/", name: seo.title, description: seo.description }),
          ...(showsFaq && faqs.length > 0 ? [faqNode("/", faqs)] : []),
        ]}
      />
      <Hero />
      {shown.map(([id, Section]) => (
        <Section key={id} />
      ))}
    </>
  );
}
