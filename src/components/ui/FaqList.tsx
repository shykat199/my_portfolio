import type { FaqItem } from "@content/site";

export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {items.map((item) => (
        <details key={item.question} name="faq" className="border-b border-line">
          <summary className="flex items-center justify-between gap-6 py-5 text-lg font-medium">
            {item.question}
            <span
              aria-hidden="true"
              className="faq-icon relative size-4 shrink-0 text-accent transition-transform duration-200 motion-reduce:transition-none"
            >
              <span className="absolute top-1/2 left-0 h-px w-4 bg-current" />
              <span className="absolute top-0 left-1/2 h-4 w-px bg-current" />
            </span>
          </summary>
          <p className="max-w-prose pb-6 leading-relaxed text-muted">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
