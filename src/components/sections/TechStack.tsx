import { site } from "@content/site";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MarqueeRow } from "./MarqueeRow";

type Tech = { name: string; color: string };

function Chip({ tech }: { tech: Tech }) {
  return (
    <li className="group flex shrink-0 items-center gap-3 rounded-full border border-fg/10 bg-raised/70 py-2 pr-5 pl-2 backdrop-blur-sm transition-colors duration-300 hover:border-accent/50">
      <span
        aria-hidden="true"
        style={{ color: tech.color, backgroundColor: `${tech.color}1f` }}
        className="flex size-9 items-center justify-center rounded-full font-mono text-xs font-semibold ring-1 ring-current/30 transition-transform duration-300 group-hover:scale-110"
      >
        {tech.name.slice(0, 2)}
      </span>
      <span className="text-[0.95rem] whitespace-nowrap text-fg/90">{tech.name}</span>
    </li>
  );
}

function Row({ items, index }: { items: Tech[]; index: number }) {
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

export function TechStack() {
  const { stack } = site;

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
        {stack.rows.map((items, index) => (
          <Row key={index} items={items} index={index} />
        ))}
      </div>
    </section>
  );
}
