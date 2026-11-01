import { site } from "@content/site";
import { ogSize, renderOgImage } from "@/lib/og";
import { getProject } from "@/lib/projects";

export const alt = "Case study by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return site.work.projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  return renderOgImage(
    project?.title ?? site.seo.title,
    project?.isDemo ? site.work.demoLabel : "Case study",
  );
}
