import type { Metadata } from "next";
import { site } from "@content/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { webPageNode } from "@/lib/schema";

const { privacy } = site;

export const metadata: Metadata = pageMetadata({
  title: privacy.title,
  description: privacy.description,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="wrap section-y max-w-3xl!">
      <JsonLd
        nodes={[webPageNode({ path: "/privacy", name: privacy.title, description: privacy.description })]}
      />
      <h1 className="text-[2.75rem] leading-[1.06] sm:text-6xl">{privacy.title}</h1>
      <p className="mt-4 text-muted">Last updated: {privacy.updated}</p>

      <div className="mt-12 space-y-10">
        {privacy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl leading-tight">{section.title}</h2>
            <div className="mt-3 space-y-3 text-lg leading-relaxed text-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
