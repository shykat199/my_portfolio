import { site } from "@content/site";

export function getService(slug: string) {
  return site.services.items.find((service) => service.slug === slug);
}

export function formatPrice(price: number) {
  return `£${price.toLocaleString("en-GB")}`;
}
