import Link from "next/link";
import { site } from "@content/site";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";

const linkClass = "underline-offset-4 transition-colors hover:text-fg hover:underline";

const iconClass =
  "flex size-10 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 hover:border-accent hover:text-accent";

const icons: Record<string, string> = {
  Email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z",
  LinkedIn:
    "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45Z",
  GitHub:
    "M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.23c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.82 1.1.82 2.22l-.01 3.29c0 .32.21.7.82.58A12 12 0 0 0 12 .3",
  Facebook:
    "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07",
  Instagram:
    "M12 2.16c3.2 0 3.58 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88Z",
  X: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
  WhatsApp:
    "M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.65l6.04-1.58a11.35 11.35 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.34-8.04",
};

export async function Footer() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const { social, whatsapp } = settings;
  // Only networks with a link set in the admin panel are shown.
  const socials = [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: social.linkedin },
    { label: "GitHub", href: social.github },
    { label: "Facebook", href: social.facebook },
    { label: "Instagram", href: social.instagram },
    { label: "X", href: social.x },
    { label: "WhatsApp", href: whatsapp ? `https://wa.me/${whatsapp}` : null },
  ].flatMap((item) => (item.href ? [{ ...item, href: item.href, path: icons[item.label] }] : []));

  return (
    <footer className="border-t border-line">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-serif text-2xl">{site.name}</p>
          <p className="mt-1 text-muted">{site.footer.tagline}</p>
          <p className="mt-5 text-sm font-medium">{site.footer.servicesLabel}</p>
          <ul className="mt-1 text-sm text-muted">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className={`inline-block py-1 ${linkClass}`}>
                  {service.heading}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-muted md:text-right">
          <ul className="mb-5 flex flex-wrap gap-3 md:justify-end">
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
