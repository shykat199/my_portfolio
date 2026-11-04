import type { Service } from "@content/site";
import { fetchFromApi, fetchListFromApi } from "./api";

/**
 * Services shown on the website, in their display order (set in the admin
 * panel). If the admin panel can't be reached this returns an empty list.
 */
export function getServices(): Promise<Service[]> {
  return fetchListFromApi<Service>("/services", "services");
}

/** One service, or undefined if there is no such service. */
export async function getService(slug: string): Promise<Service | undefined> {
  return (await fetchFromApi<Service>(`/services/${encodeURIComponent(slug)}`, "services")) ?? undefined;
}

export function formatPrice(price: number) {
  return `£${price.toLocaleString("en-GB")}`;
}
