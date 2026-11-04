import { site } from "@content/site";
import { fetchFromApi } from "./api";

export type SocialNetwork = "linkedin" | "github" | "facebook" | "instagram" | "x";

/** Site-wide settings managed in the admin panel (Site settings). */
export type SiteSettings = {
  /** Uploaded logo, or null to show the built-in initials badge. */
  logo: string | null;
  /** Uploaded favicon (square PNG), or null for the built-in icon. */
  favicon: string | null;
  social: Record<SocialNetwork, string | null>;
  /** WhatsApp number with country code, digits only, or null to hide WhatsApp. */
  whatsapp: string | null;
  hero: {
    /** The start of the typing line, e.g. "I build". */
    prefix: string;
    /** Typed out one after another after the prefix. */
    words: string[];
    /** The page's main heading (H1). */
    headline: string;
    /** Words of the headline shown in colour, or null for none. */
    highlight: string | null;
    supporting: string;
  };
  /** The home page's search engine title, description and keywords. */
  seo: { title: string; description: string; keywords: string[] };
  about: {
    title: string;
    story: string[];
    photo: { src: string; alt: string; width: number; height: number } | null;
    reasonsTitle: string;
    reasons: string[];
  };
};

/** Used when the admin panel can't be reached, so the site never looks broken. */
const fallback: SiteSettings = {
  logo: null,
  favicon: null,
  social: { linkedin: site.links.linkedin, github: site.links.github, facebook: null, instagram: null, x: null },
  whatsapp: site.whatsapp.number || null,
  hero: {
    prefix: site.hero.eyebrow.prefix,
    words: site.hero.eyebrow.words,
    headline: site.hero.headline,
    highlight: site.hero.headlineHighlight,
    supporting: site.hero.supporting,
  },
  seo: { ...site.seo, keywords: [] },
  about: {
    title: site.about.title,
    story: site.about.story,
    photo: site.about.photo,
    reasonsTitle: site.about.reasonsTitle,
    reasons: site.about.reasons,
  },
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    type ApiSettings = Omit<SiteSettings, "hero" | "seo"> & { hero: SiteSettings["hero"] | null; seo: SiteSettings["seo"] | null };
    const settings = await fetchFromApi<ApiSettings>("/settings", "settings");
    if (!settings) return fallback;
    // Anything not filled in yet in the admin panel keeps the built-in content.
    return {
      ...settings,
      hero: settings.hero ?? fallback.hero,
      seo: settings.seo ?? fallback.seo,
      about: { ...settings.about, photo: settings.about.photo ?? fallback.about.photo },
    };
  } catch (error) {
    console.error("Could not load site settings from the admin panel.", error);
    return fallback;
  }
}
