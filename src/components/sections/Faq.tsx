import type { FaqItem } from "@content/site";
import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { getFaqs } from "@/lib/home";

function FaqCard({ item, number }: { item: FaqItem; number: number }) {
  return (
    <details
      name="faq"
      className="group rounded-lg border border-line bg-raised/60 backdrop-blur-sm transition-colors duration-300 hover:border-fg/25 [&[open]:not([data-closing])]:border-accent/40 [&[open]:not([data-closing])]:bg-raised"
    >
      <summary className="flex items-start gap-4 px-5 py-4 sm:px-6 sm:py-5">
        <span aria-hidden="true" className="mt-1 font-mono text-xs text-accent">
          {String(number).padStart(2, "0")}
        </span>
        <span className="flex-1 font-medium leading-snug sm:text-[1.05rem]">{item.question}</span>
        <span
          aria-hidden="true"
          className="flex size-7 shrink-0 items-center justify-center rounded-full border border-fg/15 text-accent transition-colors group-[[open]:not([data-closing])]:border-accent/50 group-[[open]:not([data-closing])]:bg-accent/10"
        >
          <span className="faq-icon relative size-3 transition-transform duration-200 motion-reduce:transition-none">
            <span className="absolute top-1/2 left-0 h-px w-3 bg-current" />
            <span className="absolute top-0 left-1/2 h-3 w-px bg-current" />
          </span>
        </span>
      </summary>
      <p className="px-5 pb-5 pl-[3.25rem] leading-relaxed text-muted sm:px-6 sm:pb-6 sm:pl-[3.5rem]">{item.answer}</p>
    </details>
  );
}

export async function Faq() {
  const { faq } = site;
  const items = await getFaqs();
  if (items.length === 0) return null;

  // Two independent columns, so opening one answer never shifts the other column.
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <section id="faq" className="wrap section-y">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end md:gap-14">
        <div className="md:col-span-7">
          <p className="font-mono text-[0.8rem] font-medium text-accent">{faq.eyebrow}</p>
          <h2 className="mt-3 type-section">{faq.title}</h2>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{faq.intro}</p>
        </div>

        <div className="rounded-lg border border-accent/25 bg-accent/[0.06] p-5 md:col-span-5 md:p-6">
          <p className="font-serif text-xl">{faq.askTitle}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{faq.askText}</p>
          <Button href="/#contact" icon="arrow" className="mt-4 min-h-10! px-5! text-sm!">
            {faq.askLabel}
          </Button>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-3 lg:grid-cols-2 lg:gap-4">
        {columns.map((column, columnIndex) => (
          <Reveal key={columnIndex} delay={columnIndex * 0.08} className="flex flex-col gap-3 lg:gap-4">
            {column.map((item, index) => (
              <FaqCard key={item.question} item={item} number={columnIndex * half + index + 1} />
            ))}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
