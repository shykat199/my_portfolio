import Link from "next/link";
import { site } from "@content/site";

const linkClass = "underline-offset-4 transition-colors hover:text-fg hover:underline";

const iconClass =
  "flex size-10 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 hover:border-accent hover:text-accent";

const socials = [
  {
    label: "Email",
    href: `mailto:${site.email}`,
    path: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  },
  {
    label: "LinkedIn",
    href: site.links.linkedin,
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
  },
  {
    label: "GitHub",
    href: site.links.github,
    path: "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3",
  },
  ...(site.whatsapp.number
    ? [
        {
          label: "WhatsApp",
          href: `https://wa.me/${site.whatsapp.number}`,
          path: "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.65l6.04-1.58a11.35 11.35 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.34-8.04",
        },
      ]
    : []),
];

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
          <ul className="mb-5 flex gap-3 md:justify-end">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  aria-label={social.label}
                  title={social.label}
                  className={iconClass}
                  {...(social.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                >
                  <svg viewBox="0 0 24 24" className="size-[18px]" fill="currentColor" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
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
              <Link href="/blog" className={linkClass}>
                {site.breadcrumbs.blog}
              </Link>
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
