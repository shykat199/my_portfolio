import Link from "next/link";
import { site } from "@content/site";

const linkClass = "underline-offset-4 transition-colors hover:text-fg hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-1 text-muted">{site.footer.tagline}</p>
          <p className="mt-5 text-sm font-medium">{site.footer.servicesLabel}</p>
          <ul className="mt-1 text-sm text-muted">
            {site.services.items.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={`inline-block py-1 ${linkClass}`}>
                  {service.heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-muted md:text-right">
          <ul className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end">
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <a href={site.links.linkedin} className={linkClass} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={site.links.github} className={linkClass} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </li>
            <li>
              <Link href="/privacy" className={linkClass}>
                {site.footer.privacy}
              </Link>
            </li>
          </ul>
          <p className="mt-4">
            &copy; {new Date().getFullYear()} {site.name}. {site.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
