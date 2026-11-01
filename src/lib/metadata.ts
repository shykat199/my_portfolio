import type { Metadata } from "next";
import { site } from "@content/site";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /** Skips the " | Shykat Roy" ending when the title already includes it. */
  absoluteTitle?: boolean;
  type?: "website" | "article";
};

export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle,
  type = "website",
}: PageMetadataOptions): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      locale: "en_GB",
      siteName: site.name,
      url: path,
      title: shareTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: shareTitle, description },
  };
}
