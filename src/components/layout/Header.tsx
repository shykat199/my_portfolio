"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";

const SHRINK_AFTER = 48;
// "/#about" -> "about" (a section on the home page); "/blog" -> "blog" (its own page).
const navKeys = site.nav.map((item) => (item.href.includes("#") ? item.href.split("#")[1] : item.href.slice(1)));
const sectionIds = navKeys.filter((_, index) => site.nav[index].href.includes("#"));

// Outline icons for each nav link, keyed by section id.
const navIcons: Record<string, string> = {
  services: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  work: "M3 8h18v12H3zM8 8V5h8v3M3 13h18",
  process: "M7 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM21 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 6h6a3 3 0 0 1 0 6h-2a3 3 0 0 0 0 6h6",
  about: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0",
  experience: "M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12ZM8.5 14 7 21l5-3 5 3-1.5-7",
  blog: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5v14ZM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5M8 7h8M8 11h6",
  faq: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6M12 17h.01",
};

function NavIcon({ id, className }: { id: string; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={navIcons[id]} />
    </svg>
  );
}

export function Header({ logo }: { logo: string | null }) {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const current = pathname === "/" ? active : null;
  const isCurrent = (index: number) =>
    site.nav[index].href.includes("#") ? current === navKeys[index] : pathname.startsWith(site.nav[index].href);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > SHRINK_AFTER);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for whichever section sits under the top 40% of the screen.
  useEffect(() => {
    if (pathname !== "/") return;

    const onScroll = () => {
      const line = window.innerHeight * 0.4;
      let visible: string | null = null;
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (!section) continue;
        const { top, bottom } = section.getBoundingClientRect();
        if (top <= line && bottom > line) visible = id;
      }
      setActive(visible);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onResize = () => setOpen(false);

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onResize);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-3 z-40 px-3 sm:top-4">
      <div
        data-shrunk={shrunk}
        className={`dock pointer-events-auto relative mx-auto flex w-full items-center justify-between gap-2 rounded-full border bg-raised ${
          shrunk
            ? "max-w-[17rem] border-accent/30 py-1.5 pr-2 pl-2 shadow-[0_14px_40px_-12px_rgb(94_224_174/0.28)] lg:max-w-[54rem]"
            : "max-w-[70rem] border-line py-2.5 pr-3 pl-3 shadow-[0_14px_40px_-16px_rgb(0_0_0/0.8)]"
        }`}
      >
        <Link
          href="/"
          aria-label={site.name}
          className="flex shrink-0 items-center rounded-full"
          onClick={() => setOpen(false)}
        >
          {logo ? (
            // The logo uploaded in the admin panel; shown as uploaded (often SVG).
            <Image src={logo} alt="" width={40} height={40} unoptimized className="size-10 rounded-full object-contain" />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-10 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-surface"
            >
              {site.initials}
            </span>
          )}
          <span
            aria-hidden="true"
            className={`dock-name inline-block font-serif text-xl max-[379px]:hidden ${shrunk ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-40 opacity-100"}`}
          >
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {site.nav.map((item, index) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isCurrent(index) ? "location" : undefined}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-[0.95rem] text-muted transition-colors duration-200 hover:bg-fg/10 hover:text-fg aria-[current]:bg-accent/15 aria-[current]:text-accent"
                >
                  <NavIcon id={navKeys[index]} className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Button href={bookingHref} icon="calendar" className="min-h-10! px-4! text-sm! whitespace-nowrap">
            {site.cta.header}
          </Button>
          <button
            type="button"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-fg/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span aria-hidden="true" className="relative block h-3 w-5">
              <span
                className={`absolute left-0 h-px w-5 bg-fg transition-transform duration-200 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px w-5 bg-fg transition-transform duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="pointer-events-auto fixed inset-0 -z-10 overflow-y-auto bg-surface pt-24 lg:hidden"
      >
        <ul className="wrap">
          {site.nav.map((item, index) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                aria-current={isCurrent(index) ? "location" : undefined}
                className="flex items-center gap-4 py-5 font-serif text-3xl transition-colors hover:text-accent aria-[current]:text-accent"
                onClick={() => setOpen(false)}
              >
                <NavIcon id={navKeys[index]} className="size-6 shrink-0 text-accent" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
