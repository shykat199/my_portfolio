import type { Job, TechItem } from "@content/site";
import { fetchListFromApi } from "./api";

/** The tech stack, in display order. Empty if the admin panel can't be reached. */
export function getTechStack(): Promise<TechItem[]> {
  return fetchListFromApi<TechItem>("/tech", "tech");
}

/** Jobs for the Experience section, newest first. Empty if the admin panel can't be reached. */
export function getExperience(): Promise<Job[]> {
  return fetchListFromApi<Job>("/experience", "experience");
}
