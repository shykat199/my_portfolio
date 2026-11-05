import { CopyCodeButtons } from "@/components/blog/CopyCodeButtons";
import { highlightCode } from "@/lib/highlight";

/**
 * The article, as HTML rendered by the admin panel from Markdown. Raw HTML
 * typed into the article is escaped there and unsafe links are removed, so
 * it is safe to insert. Code blocks are coloured on the server (lib/highlight.ts).
 * Styles live under .blog-prose in globals.css.
 */
export async function BlogBody({ html }: { html: string }) {
  return (
    <>
      <div className="blog-prose" dangerouslySetInnerHTML={{ __html: await highlightCode(html) }} />
      <CopyCodeButtons />
    </>
  );
}
