"use client";

import * as m from "motion/react-m";
import { AnimatePresence, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { site } from "@content/site";

const { whatsapp } = site;

const buttonClass =
  "flex size-12 items-center justify-center rounded-full shadow-[0_10px_30px_-8px_rgb(0_0_0/0.6)] transition-transform duration-200 hover:scale-110";

export function FloatingActions() {
  const { scrollY } = useScroll();
  const [showTop, setShowTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (value) => setShowTop(value > 500));

  const whatsappHref = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-center gap-3 sm:right-6 sm:bottom-6">
      <AnimatePresence>
        {showTop && (
          <m.button
            key="top"
            type="button"
            aria-label={site.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 16, scale: 0.8 }}
            animate={{ opacity: 1, y: [0, -6, 0], scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.8, transition: { duration: 0.2 } }}
            transition={{
              opacity: { duration: 0.25 },
              scale: { duration: 0.25 },
              y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`${buttonClass} cursor-pointer border border-fg/15 bg-raised text-accent`}
          >
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </m.button>
        )}
      </AnimatePresence>

      {whatsapp.number && (
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={whatsapp.label}
          className={`${buttonClass} relative bg-[#25d366] text-white`}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-[#25d366] opacity-30 motion-reduce:hidden"
          />
          <svg viewBox="0 0 24 24" className="relative size-6" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.42 9.42 0 0 1-1.45-5.02c0-5.2 4.24-9.44 9.45-9.44 2.52 0 4.89.99 6.67 2.77a9.38 9.38 0 0 1 2.76 6.68c0 5.2-4.24 9.43-9.44 9.43m8.04-17.47A11.3 11.3 0 0 0 12.05.7C5.78.7.68 5.8.67 12.07c0 2 .52 3.96 1.52 5.68L.57 23.65l6.04-1.58a11.35 11.35 0 0 0 5.43 1.38h.01c6.27 0 11.37-5.1 11.38-11.37 0-3.04-1.18-5.9-3.34-8.04" />
          </svg>
        </a>
      )}
    </div>
  );
}
