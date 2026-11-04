import Link from "next/link";
import { site } from "@content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatPrice } from "@/lib/services";

export function Services() {
  const { services } = site;

  return (
    <section id="services" className="wrap section-y">
      <SectionHeading eyebrow={services.eyebrow} title={services.title} intro={services.intro} />

      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {services.items.map((service, index) => (
          <li key={service.name}>
            <Reveal delay={index * 0.08} className="h-full">
              <article className="matte-card flex h-full flex-col rounded-lg border border-line p-7 transition-colors duration-200 hover:border-fg/30">
                <h3 className="text-[1.75rem] leading-tight">{service.name}</h3>
                <p className="mt-3 leading-relaxed text-muted">{service.forWho}</p>

                <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-snug">
                      <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>

                <dl className="mt-7 flex items-end justify-between gap-4 border-t border-line pt-5">
                  <div>
                    <dt className="text-sm text-muted">{services.fromLabel}</dt>
                    <dd className="font-serif text-3xl">
                      {formatPrice(service.price)}
                      {service.priceSuffix && (
                        <span className="font-sans text-sm text-muted">{service.priceSuffix}</span>
                      )}
                    </dd>
                  </div>
                  <div className="text-right">
                    <dt className="text-sm text-muted">{service.timeLabel}</dt>
                    <dd className="mt-1 text-sm font-medium">{service.time}</dd>
                  </div>
                </dl>

                <Link
                  href={`/services/${service.slug}`}
                  className="mt-5 inline-block py-1.5 font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {services.linkLabel}
                  <span className="sr-only">: {service.name}</span>
                </Link>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-muted">{services.note}</p>
    </section>
  );
}
