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

export default async function Home() {
  const [faqs, { seo }] = await Promise.all([getFaqs(), getSettings()]);

  return (
    <>
      <JsonLd
        nodes={[
          websiteNode,
          webPageNode({ path: "/", name: seo.title, description: seo.description }),
          ...(faqs.length > 0 ? [faqNode("/", faqs)] : []),
        ]}
      />
      <Hero />
      <TrustStrip />
      <Services />
      <Work />
      <TechStack />
      <Process />
      <Career />
      <About />
      <Testimonials />
      <LatestPosts />
      <Faq />
      <Contact />
    </>
  );
}
