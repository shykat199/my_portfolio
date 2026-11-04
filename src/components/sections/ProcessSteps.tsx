"use client";

import * as m from "motion/react-m";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

type Step = { title: string; text: string };

const ease = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const badge: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 320, damping: 18 } },
};

const words: Variants = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
};

/**
 * On large screens the section pins in place while scrolling, and a white dot
 * travels along the track, switching on each step as it reaches it. The page
 * only moves on once the dot has completed step 4. On smaller screens the
 * steps stack and the dot runs down a vertical track instead of pinning.
 * Once all four steps are done the pin is released for good, so scrolling
 * back up (or down again) passes straight through.
 */
type Anchor = { target: "stage" | "after"; top: number };

/**
 * If the steps are on screen, hold them still when the pin is released. If the
 * visitor has already gone past (e.g. jumped to a later section), hold what
 * comes after the steps instead.
 */
function measure(stage: HTMLElement | null, box: HTMLElement | null, target?: Anchor["target"]): Anchor | null {
  if (!stage || !box) return null;
  const stageBox = stage.getBoundingClientRect();
  const use = target ?? (stageBox.bottom > 0 ? "stage" : "after");
  return { target: use, top: use === "stage" ? stageBox.top : box.getBoundingClientRect().bottom };
}

export function ProcessSteps({ steps, heading }: { steps: Step[]; heading: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  // What to hold still on screen when the pin is released, and where it was.
  const anchor = useRef<Anchor | null>(null);
  const [done, setDone] = useState(false);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 64rem)");
    const update = () => setPinned(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: pinned ? ["start start", "end end"] : ["start 0.7", "end 0.7"],
  });

  // Progress only ever moves forward, so the sequence plays once.
  const reached = useMotionValue(0);
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (value <= reached.get()) return;
    reached.set(value);
    setActive(Math.min(steps.length - 1, Math.floor(value * steps.length + 0.02)));
    if (value >= 0.999 && !done) {
      anchor.current = measure(stage.current, ref.current);
      setDone(true);
    }
  });

  // Releasing the pin shortens the page. Scroll by the difference so nothing
  // visibly jumps.
  useLayoutEffect(() => {
    const before = anchor.current;
    anchor.current = null;
    if (!done || !pinned || !before) return;
    const now = measure(stage.current, ref.current, before.target);
    const shift = now ? now.top - before.top : 0;
    if (shift) window.scrollBy({ top: shift, behavior: "instant" });
  }, [done, pinned]);

  // A menu link to a section further down skips the steps: release the pin
  // before the browser scrolls, so it lands on the right spot.
  useEffect(() => {
    if (done || !pinned) return;
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element).closest?.("a[href*='#']");
      const id = link?.getAttribute("href")?.split("#")[1];
      const target = id && document.getElementById(id);
      if (!target || !ref.current) return;
      if (!(ref.current.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
      if (ref.current.contains(target)) return;
      flushSync(() => {
        reached.set(1);
        setActive(steps.length - 1);
        setDone(true);
      });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [done, pinned, reached, steps.length]);

  const pin = pinned && !done;

  const position = useTransform(reached, (value) => `${value * 100}%`);
  const fill = useTransform(reached, (value) => value);

  return (
    <div ref={ref} className={pin ? "h-[280vh]" : undefined}>
      <div ref={stage} className={pin ? "sticky top-0 flex h-screen flex-col justify-center" : "lg:py-28"}>
        {heading}

        <div className="relative mt-12 pl-8 lg:pt-10 lg:pl-0">
          {/* Track: vertical on small screens, horizontal on large ones. */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[5px] w-px bg-fg/15 lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto"
          >
            <m.div
              style={pinned ? { scaleX: fill } : { scaleY: fill }}
              className="absolute inset-0 origin-top bg-fg/80 lg:origin-left"
            />
            <m.div
              style={pinned ? { left: position } : { top: position }}
              className="absolute -left-[5px] -mt-[5px] size-[11px] rounded-full bg-white shadow-[0_0_14px_3px_rgb(255_255_255/0.55)] lg:-top-[5px] lg:mt-0 lg:-ml-[5px]"
            />
          </div>

          <m.ol
            className="grid gap-10 lg:grid-cols-4 lg:gap-6"
            viewport={{ once: true, margin: "0px 0px -20% 0px" }}
            onViewportEnter={() => setActive((current) => Math.max(current, 0))}
          >
            {steps.map((step, index) => (
              <m.li
                key={step.title}
                variants={item}
                initial="hidden"
                animate={index <= active ? "show" : "hidden"}
              >
                <m.p
                  data-reveal
                  aria-hidden="true"
                  variants={badge}
                  className="flex size-9 items-center justify-center rounded-full border border-accent/40 font-serif text-xl text-accent"
                >
                  {index + 1}
                </m.p>
                <m.h3 data-reveal variants={words} className="mt-3 text-2xl leading-tight">
                  {step.title}
                </m.h3>
                <m.p data-reveal variants={words} className="mt-2 leading-relaxed text-muted">
                  {step.text}
                </m.p>
              </m.li>
            ))}
          </m.ol>
        </div>
      </div>
    </div>
  );
}
