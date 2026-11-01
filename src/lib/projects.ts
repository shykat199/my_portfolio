import { site } from "@content/site";

export function getProject(slug: string) {
  return site.work.projects.find((project) => project.slug === slug);
}
