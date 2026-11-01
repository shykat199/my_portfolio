import { site } from "@content/site";
import { FaqList } from "@/components/ui/FaqList";
import { Reveal } from "@/components/ui/Reveal";

export function Faq() {
  const { faq } = site;

  return (
    <section id="faq" className="wrap section-y grid gap-8 md:grid-cols-12 md:gap-14">
      <Reveal className="md:col-span-5">
        <p className="font-mono text-[0.8rem] font-medium text-accent">{faq.eyebrow}</p>
        <h2 className="mt-3 text-4xl leading-[1.1] sm:text-5xl">{faq.title}</h2>
      </Reveal>

      <Reveal className="md:col-span-7">
        <FaqList items={faq.items} />
      </Reveal>
    </section>
  );
}
