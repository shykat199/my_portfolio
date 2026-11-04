import type { Project } from "@content/site";
import { fetchFromApi, fetchListFromApi } from "./api";

/**
 * Case studies shown on the website, in their display order (set in the
 * admin panel). If the admin panel can't be reached this returns an empty list.
 */
export function getProjects(): Promise<Project[]> {
  return fetchListFromApi<Project>("/projects", "projects");
}

/** One case study, or undefined if there is no such project. */
export async function getProject(slug: string): Promise<Project | undefined> {
  return (await fetchFromApi<Project>(`/projects/${encodeURIComponent(slug)}`, "projects")) ?? undefined;
}
