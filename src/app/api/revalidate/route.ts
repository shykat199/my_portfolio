import { timingSafeEqual } from "node:crypto";
import { revalidateTag } from "next/cache";
import { CONTENT_TAGS, type ContentTag } from "@/lib/api";

function isAuthorised(given: string | null) {
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || !given) return false;
  const a = Buffer.from(given);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Called by the admin panel after content is saved or deleted, so the site
 * shows the change straight away. The body may name one tag (see CONTENT_TAGS);
 * without one, everything is refreshed.
 */
export async function POST(request: Request) {
  if (!isAuthorised(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ revalidated: false }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { tag?: string };
  const tags = CONTENT_TAGS.filter((tag: ContentTag) => !body.tag || tag === body.tag);
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: true, tags });
}
