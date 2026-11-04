import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";

const { notFound } = site;

export const metadata: Metadata = {
  title: notFound.title,
  description: notFound.text,
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="wrap section-y">
      <h1 className="max-w-2xl type-display">{notFound.title}</h1>
      <p className="mt-5 text-lg text-muted">{notFound.text}</p>
      <Button href="/" icon="arrow" className="mt-8">
        {notFound.link}
      </Button>

      <p className="mt-12 text-muted">{notFound.suggestions}</p>
      <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
        {notFound.links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="inline-block py-1.5 text-accent underline underline-offset-4">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
