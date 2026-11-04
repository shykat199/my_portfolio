"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Counts the number at the start of `text` up from 0 the first time it
 * scrolls into view, e.g. "3+ years" ticks 0, 1, 2, 3 and keeps "+ years".
 */
export function CountUp({ text, duration = 1.6 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [, digits = "", rest = text] = text.match(/^(\d+)(.*)$/s) ?? [];
  const target = Number(digits);

  // The real number is in the HTML for search engines and no-JS visitors;
  // reset it to 0 before the first paint so the count starts from zero.
  useLayoutEffect(() => {
    if (ref.current && digits) ref.current.textContent = "0";
  }, [digits]);

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node || !digits) return;
    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => (node.textContent = String(Math.round(value))),
    });
    return () => controls.stop();
  }, [inView, digits, target, duration]);

  if (!digits) return <>{text}</>;

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        <span ref={ref} className="tabular-nums">
          {digits}
        </span>
        {rest}
      </span>
    </>
  );
}
