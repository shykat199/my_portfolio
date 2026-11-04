"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };
type TocProps = { title: string; headings: Heading[] };

/** The id of the section currently being read. */
function useActiveHeading(headings: Heading[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current: string | null = null;
      for (const { id } of headings) {
        const element = document.getElementById(id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.3) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headings]);

  return active;
}

function TocLinks({ headings, active, onPick }: { headings: Heading[]; active: string | null; onPick?: () => void }) {
  return (
    <ol className="space-y-1 border-l border-line">
      {headings.map((heading) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            onClick={onPick}
            aria-current={active === heading.id ? "location" : undefined}
            className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm leading-snug text-muted transition-colors hover:text-fg aria-[current]:border-accent aria-[current]:text-accent"
          >
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Sidebar version for large screens. Lists the sections and highlights the one being read. */
export function TableOfContents({ title, headings }: TocProps) {
  const active = useActiveHeading(headings);
  if (headings.length === 0) return null;

  return (
    <nav aria-label={title}>
      <p className="font-mono text-xs font-medium tracking-wide text-accent uppercase">{title}</p>
      <div className="mt-4">
        <TocLinks headings={headings} active={active} />
      </div>
    </nav>
  );
}

/**
 * Phone and tablet version: a bar that floats under the menu while reading,
 * showing the current section. Tap it to open the full list.
 */
export function MobileTableOfContents({ title, headings }: TocProps) {
  const active = useActiveHeading(headings);
  const [open, setOpen] = useState(false);
  if (headings.length === 0) return null;

  const index = headings.findIndex((heading) => heading.id === active);
  const current = index >= 0 ? headings[index].text : headings[0].text;
  const progress = ((index + 1) / headings.length) * 100;

  return (
    <nav aria-label={title} className="sticky top-[5.25rem] z-30 -mx-1 mb-8 lg:hidden">
      <div className="overflow-hidden rounded-xl border border-line bg-surface/90 shadow-[0_12px_30px_-12px_rgb(0_0_0/0.8)] backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4 shrink-0 text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h10M4 18h13" />
          </svg>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-[0.65rem] tracking-wide text-accent uppercase">{title}</span>
            <span className="block truncate text-sm">{current}</span>
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`size-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        {/* Reading progress through the sections. */}
        <div aria-hidden="true" className="h-0.5 bg-line">
          <div className="h-full bg-accent transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>

        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="min-h-0 overflow-hidden">
            <div className="max-h-[50vh] overflow-y-auto px-4 py-4">
              <TocLinks headings={headings} active={active} onPick={() => setOpen(false)} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
