import { site } from "@content/site";
import { ogSize, renderOgImage } from "@/lib/og";
import { getService } from "@/lib/services";

export const alt = "Service by Shykat Roy";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return site.services.items.map((service) => ({ slug: service.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);

  return renderOgImage(service?.heading ?? site.seo.title, "shykatroy.com");
}
