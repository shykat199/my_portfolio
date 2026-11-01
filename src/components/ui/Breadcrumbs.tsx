import Link from "next/link";
import { site } from "@content/site";
import type { Crumb } from "@/lib/schema";

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label={site.breadcrumbs.label}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
        {crumbs.map((crumb, index) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="inline-block py-1.5 underline underline-offset-4 hover:text-fg">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-fg">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
