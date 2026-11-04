import Image from "next/image";
import { site, type TechItem } from "@content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTechStack } from "@/lib/profile";
import { MarqueeRow } from "./MarqueeRow";

const ROWS = 3;

function Chip({ tech }: { tech: TechItem }) {
  return (
    <li className="group flex shrink-0 items-center gap-3 rounded-full border border-fg/10 bg-raised/70 py-2 pr-5 pl-2 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50">
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center overflow-hidden rounded-full bg-fg/[0.06] font-mono text-xs font-semibold text-accent ring-1 ring-fg/10 transition-transform duration-300 group-hover:scale-110"
      >
        {tech.logo ? (
          // Logos are tiny (often SVG), so they are shown as uploaded.
          <Image src={tech.logo} alt="" width={20} height={20} unoptimized className="size-5 object-contain" />
        ) : (
          tech.name.slice(0, 2)
        )}
      </span>
      <span className="text-[0.95rem] whitespace-nowrap text-fg/90">{tech.name}</span>
    </li>
  );
}

function Row({ items, index }: { items: TechItem[]; index: number }) {
  return (
    <MarqueeRow speed={42 - index * 6} reverse={index % 2 === 1}>
      <ul className="flex gap-4 pr-4">
        {items.map((tech) => (
          <Chip key={tech.name} tech={tech} />
        ))}
      </ul>
    </MarqueeRow>
  );
}

/** Splits the items, in display order, into up to three similar-sized rows. */
function toRows(items: TechItem[]) {
  const count = Math.min(ROWS, Math.max(1, Math.floor(items.length / 4)));
  const size = Math.ceil(items.length / count);
  return Array.from({ length: count }, (_, row) => items.slice(row * size, (row + 1) * size));
}

export async function TechStack() {
  const { stack } = site;
  const items = await getTechStack();
  if (items.length === 0) return null;

  return (
    <section id="stack" className="section-y relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(40rem_18rem_at_50%_60%,rgb(94_224_174/0.08),transparent_70%)]"
      />
      <div className="wrap relative">
        <SectionHeading eyebrow={stack.eyebrow} title={stack.title} intro={stack.intro} />
      </div>
      <div className="relative mt-12 space-y-4">
        {toRows(items).map((row, index) => (
          <Row key={index} items={row} index={index} />
        ))}
      </div>
    </section>
  );
}
