import { site, type Testimonial } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getTestimonials } from "@/lib/home";
import { TestimonialSlider } from "./TestimonialSlider";

// Shown only on your own computer (npm run dev) while there are no real
// testimonials yet, so you can see the design. Never shown on the live site.
const previewItems: Testimonial[] = [
  { quote: "Sample testimonial. Replace this with real words from a client in content/site.ts.", name: "Sample Client", role: "Owner, Sample Business", rating: 5 },
  { quote: "A second sample, so you can see the slider move between quotes of different lengths, with the arrows and dots.", name: "Another Sample", role: "Manager, Example Company", rating: 5 },
  { quote: "A third sample testimonial.", name: "Third Sample", role: "Founder, Placeholder Ltd" },
];

export async function Testimonials() {
  const { testimonials } = site;
  const real = await getTestimonials();
  const preview = real.length === 0 && process.env.NODE_ENV === "development";
  const items = preview ? previewItems : real;

  if (items.length === 0) return null;

  return (
    <section id="testimonials" className="wrap section-y">
      <SectionHeading eyebrow={testimonials.eyebrow} title={testimonials.title} intro={testimonials.intro} />

      {preview && (
        <p className="mt-6 inline-block rounded-lg border border-warm/40 bg-warm/10 px-4 py-2 text-sm text-warm">
          Preview only: these are sample testimonials. This section stays hidden on the live site until you add real
          ones in the admin panel.
        </p>
      )}

      <Reveal>
        <TestimonialSlider items={items} />
      </Reveal>
    </section>
  );
}
