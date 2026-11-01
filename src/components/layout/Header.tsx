"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { bookingHref } from "@/lib/booking";

const SHRINK_AFTER = 48;

export function Header() {
  const [open, setOpen] = useState(false);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const onScroll = () => setShrunk(window.scrollY > SHRINK_AFTER);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            ? "max-w-[17rem] border-accent/30 py-1.5 pr-2 pl-2 shadow-[0_14px_40px_-12px_rgb(94_224_174/0.28)] lg:max-w-[41rem]"
            : "max-w-[70rem] border-line py-2.5 pr-3 pl-3 shadow-[0_14px_40px_-16px_rgb(0_0_0/0.8)]"
        }`}
      >
        <Link
          href="/"
          aria-label={site.name}
          className="flex shrink-0 items-center rounded-full"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex size-10 items-center justify-center rounded-full bg-accent font-mono text-sm font-semibold text-surface"
          >
            {site.initials}
          </span>
          <span
            aria-hidden="true"
            className={`dock-name inline-block font-serif text-xl max-[379px]:hidden ${shrunk ? "ml-0 max-w-0 opacity-0" : "ml-3 max-w-40 opacity-100"}`}
          >
            {site.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-full px-3.5 py-2 text-[0.95rem] text-muted transition-colors duration-200 hover:bg-fg/10 hover:text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Button href={bookingHref} className="min-h-10! px-4! text-sm! whitespace-nowrap">
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
          {site.nav.map((item) => (
            <li key={item.href} className="border-b border-line">
              <Link
                href={item.href}
                className="block py-5 font-serif text-3xl transition-colors hover:text-accent"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
