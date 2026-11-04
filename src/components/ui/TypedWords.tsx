"use client";

import { useEffect, useState } from "react";

const TYPE_MS = 90;
const DELETE_MS = 45;
const HOLD_MS = 1600;
const GAP_MS = 300;

/**
 * Types each word out, holds it, deletes it, then types the next one, with a
 * blinking cursor. Screen readers and search engines get the full list once.
 */
export function TypedWords({ prefix, words }: { prefix: string; words: string[] }) {
  const [index, setIndex] = useState(0);
  const [length, setLength] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const word = words[index];
    let delay = deleting ? DELETE_MS : TYPE_MS;
    if (!deleting && length === word.length) delay = HOLD_MS;
    if (deleting && length === 0) delay = GAP_MS;

    const timer = setTimeout(() => {
      if (!deleting && length === word.length) setDeleting(true);
      else if (deleting && length === 0) {
        setDeleting(false);
        setIndex((index + 1) % words.length);
      } else setLength(length + (deleting ? -1 : 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [index, length, deleting, words]);

  // The cursor stays solid while typing and blinks once a word is finished.
  const idle = !deleting && length === words[index].length;
  const list = `${words.slice(0, -1).join(", ")} and ${words.at(-1)}`;

  return (
    <>
      <span className="sr-only">
        {prefix} {list}
      </span>
      <span aria-hidden="true">
        {prefix}{" "}
        <span className="inline-block sm:min-w-[16ch] text-fg">
          {words[index].slice(0, length)}
          <span
            className={`ml-1 inline-block h-3.5 w-1.5 translate-y-[0.15em] bg-accent ${idle ? "code-cursor" : ""}`}
          />
        </span>
      </span>
    </>
  );
}
