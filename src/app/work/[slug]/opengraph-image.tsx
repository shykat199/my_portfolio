import { site } from "@content/site";
import { ogSize, renderOgImage } from "@/lib/og";
import { getProject, getProjects } from "@/lib/projects";

export const alt = "Case study by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProject(slug);

  return renderOgImage(
    project?.title ?? site.seo.title,
    project?.isDemo ? site.work.demoLabel : "Case study",
  );
}
