import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro?: string;
};

export function SectionHeading({ eyebrow, title, intro }: SectionHeadingProps) {
  return (
    <Reveal className="max-w-2xl">
      <p className="font-mono text-[0.8rem] font-medium text-accent">{eyebrow}</p>
      <h2 className="mt-3 type-section">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
