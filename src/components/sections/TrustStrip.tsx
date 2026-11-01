import { site } from "@content/site";

export function TrustStrip() {
  return (
    <section aria-label="Why work with me" className="border-y border-line bg-raised">
      <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4">
        {site.trust.map((item) => (
          <li key={item.title}>
            <p className="font-serif text-2xl leading-tight text-accent">{item.title}</p>
            <p className="mt-1 text-sm leading-snug text-muted">{item.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
