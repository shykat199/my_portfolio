import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { getSettings } from "@/lib/settings";

const { notFound } = site;

export const metadata: Metadata = {
  title: notFound.title,
  description: notFound.text,
  alternates: { canonical: null },
};

function lineStyle(line: number) {
  return { "--line": line } as CSSProperties;
}

export default async function NotFound() {
  const { hiddenSections, person } = await getSettings();
  const { code } = notFound;
  // "/#work" -> "work"; pages of their own ("/about") are always shown.
  const links = notFound.links.filter((link) => !hiddenSections.includes(link.href.split("#")[1] ?? ""));
  const contactHref = hiddenSections.includes("contact") ? `mailto:${person.email}` : "/#contact";

  const lines = [
    <span key="request">
      <span className="text-accent">$</span> {code.request}
    </span>,
    <span key="response">
      <span className="text-error">{code.response}</span>
    </span>,
    <span key="comment" className="text-code-comment">{`// ${code.comment}`}</span>,
  ];

  return (
    <div className="wrap section-y">
      <div className="grid gap-12 md:grid-cols-12 md:items-center md:gap-14">
        <div className="md:col-span-7">
          <p className="font-mono text-[0.8rem] font-medium text-accent">{notFound.eyebrow}</p>
          <h1 className="mt-3 max-w-2xl type-display">{notFound.title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">{notFound.text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/" icon="arrow">
              {notFound.link}
            </Button>
            <Button href={contactHref} variant="secondary">
              {notFound.contact}
            </Button>
          </div>
        </div>

        <div className="md:col-span-5">
          <p
            aria-hidden="true"
            className="bg-gradient-to-br from-accent to-warm bg-clip-text font-serif text-[7rem] leading-none text-transparent sm:text-[9rem]"
          >
            404
          </p>

          <figure
            role="img"
            aria-label={code.description}
            className="mt-6 overflow-hidden rounded-2xl border border-fg/10 bg-code font-mono text-[0.8rem] leading-[1.8] text-fg shadow-[0_30px_80px_-30px_rgb(94_224_174/0.35)] sm:text-sm sm:leading-[1.8]"
          >
            <div className="flex items-center gap-2 border-b border-fg/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-error" />
              <span className="size-2.5 rounded-full bg-warm" />
              <span className="size-2.5 rounded-full bg-accent" />
              <span className="ml-2 text-xs text-code-comment">{code.fileName}</span>
            </div>
            <ol className="overflow-x-auto px-4 py-5 sm:px-5">
              {lines.map((line, index) => (
                <li key={index} style={lineStyle(index)} className="code-line flex whitespace-pre">
                  <span className="hidden w-8 shrink-0 text-code-comment/70 select-none sm:block">{index + 1}</span>
                  {line}
                </li>
              ))}
            </ol>
            <div
              style={lineStyle(lines.length)}
              className="code-line flex items-center gap-2 border-t border-fg/10 px-4 py-3 text-xs text-accent sm:px-5"
            >
              <span className="size-1.5 rounded-full bg-accent" />
              {code.status}
              <span className="code-cursor h-3.5 w-1.5 bg-accent" />
            </div>
          </figure>
        </div>
      </div>

      <section aria-labelledby="suggestions" className="mt-20">
        <h2 id="suggestions" className="text-3xl leading-tight sm:text-4xl">
          {notFound.suggestions}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="group matte-card flex h-full flex-col rounded-lg border border-line p-6 transition-colors duration-300 hover:border-accent/50"
              >
                <span className="flex items-center justify-between gap-4 text-xl">
                  {link.label}
                  <svg
                    viewBox="0 0 24 24"
                    className="size-5 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
                <span className="mt-2 leading-relaxed text-muted">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
