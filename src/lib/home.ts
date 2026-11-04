import type { FaqItem, Testimonial } from "@content/site";
import { fetchListFromApi } from "./api";

/** Client testimonials, in display order. Empty if the admin panel can't be reached. */
export function getTestimonials(): Promise<Testimonial[]> {
  return fetchListFromApi<Testimonial>("/testimonials", "testimonials");
}

/** The home page FAQ, in display order. Empty if the admin panel can't be reached. */
export function getFaqs(): Promise<FaqItem[]> {
  return fetchListFromApi<FaqItem>("/faqs", "faqs");
}
