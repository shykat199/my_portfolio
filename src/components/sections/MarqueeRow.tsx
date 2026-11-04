"use client";

import * as m from "motion/react-m";
import { useAnimationFrame, useMotionValue } from "motion/react";
import { useRef, type ReactNode } from "react";

type MarqueeRowProps = {
  children: ReactNode;
  /** Pixels per second. */
  speed: number;
  reverse?: boolean;
};

/**
 * Scrolls its content sideways forever. The content is drawn twice, and the
 * position wraps after one copy's width, so the loop joins up seamlessly.
 * Hovering eases the row to a stop; leaving eases it back up to speed.
 */
export function MarqueeRow({ children, speed, reverse }: MarqueeRowProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const hovered = useRef(false);
  const rate = useRef(1);

  useAnimationFrame((_, delta) => {
    const track = trackRef.current;
    if (!track) return;
    const half = track.scrollWidth / 2;
    if (!half) return;

    rate.current += ((hovered.current ? 0 : 1) - rate.current) * Math.min(1, delta / 250);
    const step = (speed * rate.current * delta) / 1000;
    let next = x.get() + (reverse ? step : -step);
    if (next <= -half) next += half;
    if (next > 0) next -= half;
    x.set(next);
  });

  return (
    <div
      className="marquee overflow-hidden"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
    >
      <m.div ref={trackRef} style={{ x }} className="flex w-max">
        <div className="flex shrink-0">{children}</div>
        <div aria-hidden="true" className="flex shrink-0">
          {children}
        </div>
      </m.div>
    </div>
  );
}
