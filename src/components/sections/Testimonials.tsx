import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const { testimonials } = site;

  if (testimonials.items.length === 0) return null;

  return (
    <section id="testimonials" className="wrap section-y">
      <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} />

      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {testimonials.items.map((testimonial) => (
          <li key={testimonial.name}>
            <Reveal>
              <figure className="border-t border-fg/25 pt-6">
                <blockquote className="font-serif text-2xl leading-snug">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="block text-muted">{testimonial.role}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
