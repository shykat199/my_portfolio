import Link from "next/link";
import type { ReactNode } from "react";
import type { BlogBlock } from "@content/blog";
import { slugify } from "@/lib/blog";

const linkClass = "text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent";

/** Renders **bold** and [links](/path) inside a line of text. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index): ReactNode => {
    const bold = part.match(/^\*\*(.+)\*\*$/);
    if (bold) {
      return (
        <strong key={index} className="font-semibold text-fg">
          {bold[1]}
        </strong>
      );
    }
    const link = part.match(/^\[(.+)\]\((.+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("http") ? (
        <a key={index} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {label}
        </a>
      ) : (
        <Link key={index} href={href} className={linkClass}>
          {label}
        </Link>
      );
    }
    return part;
  });
}

export function BlogBody({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <div className="text-[1.0625rem] leading-[1.8] text-fg/85 sm:text-lg sm:leading-[1.8]">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "h2":
            return (
              <h2 key={index} id={slugify(block.text)} className="mt-14 scroll-mt-40 text-3xl lg:scroll-mt-28 leading-tight text-fg first:mt-0 sm:text-[2.1rem]">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} className="mt-9 text-2xl leading-tight text-fg">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={index} className="mt-5">
                <Inline text={block.text} />
              </p>
            );
          case "list": {
            const List = block.ordered ? "ol" : "ul";
            return (
              <List key={index} className="mt-5 space-y-3">
                {block.items.map((item, itemIndex) => (
                  <li key={item} className="flex gap-3">
                    {block.ordered ? (
                      <span aria-hidden="true" className="mt-[0.15em] font-mono text-sm text-accent">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    ) : (
                      <span aria-hidden="true" className="mt-[0.9em] h-px w-3 shrink-0 bg-accent" />
                    )}
                    <span>
                      <Inline text={item} />
                    </span>
                  </li>
                ))}
              </List>
            );
          }
          case "tip":
            return (
              <aside key={index} className="mt-8 rounded-lg border border-accent/30 bg-accent/[0.07] p-5 sm:p-6">
                {block.title && <p className="font-serif text-xl text-accent">{block.title}</p>}
                <p className={block.title ? "mt-2" : ""}>
                  <Inline text={block.text} />
                </p>
              </aside>
            );
        }
      })}
    </div>
  );
}
