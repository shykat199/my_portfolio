/** How long content from the admin panel is cached before being checked again. */
const REVALIDATE_SECONDS = 300;

/** Cache tags. The admin panel asks /api/revalidate to refresh one after a change. */
export const CONTENT_TAGS = ["posts", "services", "projects", "tech", "experience", "testimonials", "faqs", "settings"] as const;
export type ContentTag = (typeof CONTENT_TAGS)[number];

/**
 * Reads from the admin panel's API (BLOG_API_URL). Returns null for "not
 * found" and when no API is configured; throws on other errors so a cached
 * page is kept instead of being replaced by an empty one.
 */
export async function fetchFromApi<T>(path: string, tag: ContentTag): Promise<T | null> {
  const base = process.env.BLOG_API_URL;
  if (!base) {
    console.warn("BLOG_API_URL is not set, so content from the admin panel is unavailable.");
    return null;
  }

  const response = await fetch(`${base.replace(/\/$/, "")}/api${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: REVALIDATE_SECONDS, tags: [tag] },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Admin API ${path} responded with ${response.status}`);

  return ((await response.json()) as { data: T }).data;
}

/** Like fetchFromApi for lists, but returns an empty list if the API is down. */
export async function fetchListFromApi<T>(path: string, tag: ContentTag): Promise<T[]> {
  try {
    return (await fetchFromApi<T[]>(path, tag)) ?? [];
  } catch (error) {
    console.error(`Could not load ${tag} from the admin panel.`, error);
    return [];
  }
}
