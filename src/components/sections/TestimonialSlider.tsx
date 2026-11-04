"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Testimonial } from "@content/site";

const AUTOPLAY_MS = 6000;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Arrow({ direction, onClick, label }: { direction: "prev" | "next"; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-11 cursor-pointer items-center justify-center rounded-full border border-fg/15 text-fg transition-colors duration-200 hover:border-accent hover:bg-accent/10 hover:text-accent"
    >
      <svg
        viewBox="0 0 24 24"
        className={`size-5 ${direction === "prev" ? "rotate-180" : ""}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </button>
  );
}

/**
 * One testimonial at a time, sliding on its own every few seconds. Hovering or
 * focusing the slider pauses it; the arrows and dots move it by hand.
 */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = items.length;

  const go = useCallback((step: number) => setIndex((current) => (current + step + count) % count), [count]);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [index, paused, count, go]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="matte-card relative mt-12 rounded-2xl border border-line p-7 sm:p-10 lg:p-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-8 font-serif text-[8rem] leading-none text-accent/15 sm:text-[10rem]"
      >
        &rdquo;
      </span>

      {/* All slides share one grid cell, so the card is always as tall as the longest quote. */}
      <div className="grid">
        {items.map((item, i) => {
          const active = i === index;
          return (
            <figure
              key={item.name + i}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={!active}
              className={`col-start-1 row-start-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                active ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-6 opacity-0"
              }`}
            >
              {item.rating && (
                <div role="img" aria-label={`Rated ${item.rating} out of 5`} className="mb-5 flex gap-1">
                  {Array.from({ length: 5 }, (_, star) => (
                    <svg
                      key={star}
                      viewBox="0 0 20 20"
                      className={`size-4 ${star < item.rating! ? "text-warm" : "text-fg/15"}`}
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="max-w-3xl font-serif text-2xl leading-snug sm:text-[1.75rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="flex size-11 items-center justify-center overflow-hidden rounded-full bg-accent/15 font-mono text-sm font-semibold text-accent"
                >
                  {item.photo ? (
                    <Image src={item.photo} alt="" width={88} height={88} sizes="44px" className="size-full object-cover" />
                  ) : (
                    initials(item.name)
                  )}
                </span>
                <span className="text-sm">
                  <span className="block font-medium">{item.name}</span>
                  <span className="block text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          );
        })}
      </div>

      {count > 1 && (
        <div className="mt-9 flex items-center justify-between gap-4 border-t border-line pt-6">
          <div className="flex items-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.name + i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === index}
                className="group flex h-6 cursor-pointer items-center"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? "w-8 bg-accent" : "w-1.5 bg-fg/25 group-hover:bg-fg/50"
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Arrow direction="prev" onClick={() => go(-1)} label="Previous testimonial" />
            <Arrow direction="next" onClick={() => go(1)} label="Next testimonial" />
          </div>
        </div>
      )}
    </div>
  );
}
