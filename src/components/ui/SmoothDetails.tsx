"use client";

import { useEffect } from "react";

const DURATION = 320;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

function contentOf(details: HTMLDetailsElement) {
  return details.querySelector(":scope > summary")?.nextElementSibling as HTMLElement | null;
}

function animateHeight(details: HTMLDetailsElement, from: number, to: number, onDone?: () => void) {
  details.getAnimations().forEach((animation) => animation.cancel());
  details.style.overflow = "hidden";
  const animation = details.animate({ height: [`${from}px`, `${to}px`] }, { duration: DURATION, easing: EASING });
  animation.onfinish = () => {
    details.style.overflow = "";
    onDone?.();
  };
}

function close(details: HTMLDetailsElement) {
  const summary = details.querySelector(":scope > summary") as HTMLElement;
  details.dataset.closing = "";
  contentOf(details)?.animate({ opacity: [1, 0] }, { duration: DURATION / 2, fill: "forwards" });
  animateHeight(details, details.offsetHeight, summary.offsetHeight, () => {
    details.open = false;
    delete details.dataset.closing;
    contentOf(details)?.getAnimations().forEach((animation) => animation.cancel());
  });
}

function open(details: HTMLDetailsElement) {
  // Close any other open item in the same group with its own animation.
  // The name is lifted while animating so the browser doesn't snap them shut.
  const name = details.getAttribute("name");
  if (name) {
    document.querySelectorAll<HTMLDetailsElement>(`details[name="${name}"][open]`).forEach((other) => {
      if (other !== details) close(other);
    });
    details.removeAttribute("name");
  }

  const start = details.offsetHeight;
  details.open = true;
  const end = details.offsetHeight;
  contentOf(details)?.animate(
    { opacity: [0, 1], transform: ["translateY(-6px)", "none"] },
    { duration: DURATION, easing: EASING },
  );
  animateHeight(details, start, end, () => {
    if (name) details.setAttribute("name", name);
  });
}

/**
 * Makes every <details> on the site (the FAQs) open and close smoothly.
 * Mounted once in the layout; without JavaScript they still work, just instantly.
 */
export function SmoothDetails() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const summary = (event.target as Element).closest?.("summary");
      const details = summary?.parentElement;
      if (!(details instanceof HTMLDetailsElement) || summary !== details.querySelector(":scope > summary")) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      event.preventDefault();
      if (details.open && !("closing" in details.dataset)) close(details);
      else open(details);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
