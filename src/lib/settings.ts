import { site } from "@content/site";
import { fetchFromApi } from "./api";

export type SocialNetwork = "linkedin" | "github" | "facebook" | "instagram" | "x";

/** Site-wide settings managed in the admin panel (Site settings). */
export type SiteSettings = {
  /** Last saved in the admin panel (YYYY-MM-DD), or null when using the built-in content. */
  updatedAt: string | null;
  /** Uploaded logo, or null to show the built-in initials badge. */
  logo: string | null;
  /** Uploaded favicon (square PNG), or null for the built-in icon. */
  favicon: string | null;
  /** Uploaded résumé (PDF), or null to hide the download button. */
  resume: string | null;
  social: Record<SocialNetwork, string | null>;
  /** WhatsApp number with country code, digits only, or null to hide WhatsApp. */
  whatsapp: string | null;
  /** Home page sections switched off in the admin panel, by section id (e.g. "work"). */
  hiddenSections: string[];
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
  /** Who you are, for search engines (schema.org Person). */
  person: {
    name: string;
    jobTitle: string;
    description: string | null;
    email: string;
    phone: string | null;
    /** Website in the contact QR code, or null to use this site's address. */
    website: string | null;
    city: string | null;
    country: string | null;
    skills: string[];
    languages: string[];
    /** Your current employer, taken from the current job in Experience. */
    worksFor: { name: string; url: string | null } | null;
  };
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
  updatedAt: null,
  logo: null,
  favicon: null,
  resume: null,
  social: { linkedin: site.links.linkedin, github: site.links.github, facebook: null, instagram: null, x: null },
  whatsapp: site.whatsapp.number || null,
  hiddenSections: [],
  hero: {
    prefix: site.hero.eyebrow.prefix,
    words: site.hero.eyebrow.words,
    headline: site.hero.headline,
    highlight: site.hero.headlineHighlight,
    supporting: site.hero.supporting,
  },
  seo: { ...site.seo, keywords: [] },
  person: {
    name: site.name,
    jobTitle: site.jobTitle,
    description: null,
    email: site.email,
    phone: null,
    website: null,
    city: site.location.city,
    country: site.location.country,
    skills: site.skills,
    languages: site.languages,
    worksFor: null,
  },
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
    type ApiSettings = Omit<SiteSettings, "hero" | "seo" | "person"> & {
      hero: SiteSettings["hero"] | null;
      seo: SiteSettings["seo"] | null;
      person: SiteSettings["person"] | null;
    };
    const settings = await fetchFromApi<ApiSettings>("/settings", "settings");
    if (!settings) return fallback;
    // Anything not filled in yet in the admin panel keeps the built-in content.
    return {
      ...settings,
      resume: settings.resume ?? null,
      hiddenSections: settings.hiddenSections ?? fallback.hiddenSections,
      hero: settings.hero ?? fallback.hero,
      seo: settings.seo ?? fallback.seo,
      person: settings.person ?? fallback.person,
      about: { ...settings.about, photo: settings.about.photo ?? fallback.about.photo },
    };
  } catch (error) {
    console.error("Could not load site settings from the admin panel.", error);
    return fallback;
  }
}
