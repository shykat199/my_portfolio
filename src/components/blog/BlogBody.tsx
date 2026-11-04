/**
 * The article, as HTML rendered by the admin panel from Markdown. Raw HTML
 * typed into the article is escaped there and unsafe links are removed, so
 * it is safe to insert. Styles live under .blog-prose in globals.css.
 */
export function BlogBody({ html }: { html: string }) {
  return <div className="blog-prose" dangerouslySetInnerHTML={{ __html: html }} />;
}
