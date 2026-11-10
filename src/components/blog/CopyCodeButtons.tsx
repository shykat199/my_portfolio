"use client";

import { useEffect } from "react";

const RESET_AFTER = 2000;

/**
 * Makes the copy buttons in the article's code blocks work. The buttons are
 * part of the article HTML (lib/highlight.ts), so one listener handles them all.
 */
export function CopyCodeButtons() {
  useEffect(() => {
    async function copy(event: MouseEvent) {
      const button = (event.target as Element | null)?.closest<HTMLButtonElement>("[data-copy-code]");
      const code = button?.closest(".code-block")?.querySelector("pre")?.textContent;
      if (!button || code == null) return;

      const label = button.querySelector("[data-copy-label]");
      try {
        await navigator.clipboard.writeText(code);
        if (label) label.textContent = "Copied!";
        button.dataset.copied = "true";
      } catch {
        if (label) label.textContent = "Press Ctrl+C";
      }
      setTimeout(() => {
        if (label) label.textContent = "Copy";
        delete button.dataset.copied;
      }, RESET_AFTER);
    }

    document.addEventListener("click", copy);
    return () => document.removeEventListener("click", copy);
  }, []);

  return null;
}
