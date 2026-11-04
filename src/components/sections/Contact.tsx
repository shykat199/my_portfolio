import { site } from "@content/site";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { bookingHref } from "@/lib/booking";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { contact, cta, links, email } = site;

  return (
    <section id="contact" className="border-t border-line bg-raised/80">
      <div className="wrap section-y grid gap-10 md:grid-cols-12 md:gap-14">
        <Reveal className="md:col-span-5">
          <p className="font-mono text-[0.8rem] font-medium text-accent">{contact.eyebrow}</p>
          <h2 className="mt-3 type-section">{contact.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{contact.text}</p>

          {links.booking && (
            <Button href={bookingHref} icon="calendar" className="mt-8">
              {cta.hero}
            </Button>
          )}

          <p className="mt-8 text-muted">
            {contact.emailPrompt}{" "}
            <a href={`mailto:${email}`} className="text-fg underline underline-offset-4">
              {email}
            </a>
          </p>
        </Reveal>

        <div className="md:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
