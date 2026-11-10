import type { Metadata } from "next";
import { site } from "@content/site";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { webPageNode } from "@/lib/schema";
import { getSettings } from "@/lib/settings";

const { privacy } = site;

export const metadata: Metadata = pageMetadata({
  title: privacy.title,
  description: privacy.description,
  path: "/privacy",
});

export default async function PrivacyPage() {
  // "{email}" in the policy text is your email from the admin panel.
  const { person } = await getSettings();

  return (
    <div className="wrap section-y max-w-3xl!">
      <JsonLd
        nodes={[webPageNode({ path: "/privacy", name: privacy.title, description: privacy.description })]}
      />
      <h1 className="type-display">{privacy.title}</h1>
      <p className="mt-4 text-muted">Last updated: {privacy.updated}</p>

      <div className="mt-12 space-y-10">
        {privacy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-2xl leading-tight">{section.title}</h2>
            <div className="mt-3 space-y-3 text-lg leading-relaxed text-muted">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph.replaceAll("{email}", person.email)}</p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
