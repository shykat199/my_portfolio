import type { Metadata } from "next";
import { site } from "@content/site";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Work } from "@/components/sections/Work";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { faqNode, webPageNode, websiteNode } from "@/lib/schema";

const { title, description } = site.seo;

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/",
  absoluteTitle: true,
});

export default function Home() {
  return (
    <>
      <JsonLd
        nodes={[
          websiteNode,
          webPageNode({ path: "/", name: title, description }),
          faqNode("/", site.faq.items),
        ]}
      />
      <Hero />
      <TrustStrip />
      <Services />
      <Work />
      <Process />
      <About />
      <Testimonials />
      <Faq />
      <Contact />
    </>
  );
}
