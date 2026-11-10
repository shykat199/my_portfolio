import Link from "next/link";
import { site } from "@content/site";
import { getServices } from "@/lib/services";
import { socialIcons } from "@/components/ui/socialIcons";
import { getSettings } from "@/lib/settings";

const linkClass = "underline-offset-4 transition-colors hover:text-fg hover:underline";

const iconClass =
  "flex size-10 items-center justify-center rounded-full border border-fg/15 text-muted transition-colors duration-200 hover:border-accent hover:text-accent";

export async function Footer() {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);
  const { social, whatsapp, person } = settings;
  // Only networks with a link set in the admin panel are shown.
  const socials = [
    { label: "Email", href: `mailto:${person.email}` },
    { label: "LinkedIn", href: social.linkedin },
    { label: "GitHub", href: social.github },
    { label: "Facebook", href: social.facebook },
    { label: "Instagram", href: social.instagram },
    { label: "X", href: social.x },
    { label: "WhatsApp", href: whatsapp ? `https://wa.me/${whatsapp}` : null },
  ].flatMap((item) => (item.href ? [{ ...item, href: item.href, path: socialIcons[item.label] }] : []));

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
              <a href={`mailto:${person.email}`} className={linkClass}>
                {person.email}
              </a>
            </li>
            <li>
              <Link href="/about" className={linkClass}>
                {site.breadcrumbs.about}
              </Link>
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
            <li>
              <Link href="/site-map" className={linkClass}>
                {site.footer.sitemap}
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
