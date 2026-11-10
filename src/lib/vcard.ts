import { site } from "@content/site";
import type { SiteSettings } from "./settings";

/** Escapes text for a vCard value (backslashes, commas, semicolons and line breaks). */
function escape(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/,/g, "\\,").replace(/;/g, "\\;").replace(/\r?\n/g, "\\n");
}

/** Your website from the admin panel, or this site's address when none is set. */
export function contactWebsite({ person }: SiteSettings) {
  return person.website ?? site.url;
}

/** Your phone from the admin panel, or your WhatsApp number when no phone is set. */
export function contactPhone({ person, whatsapp }: SiteSettings) {
  return person.phone ?? (whatsapp ? `+${whatsapp}` : null);
}

/**
 * Your contact card (vCard 3.0). Everything in it comes from the admin panel
 * (Site settings → Person, and WhatsApp when no phone is set). Phones offer to save it as a contact when the QR code is scanned.
 * Kept to name, email, phone and website so the QR code stays easy to scan.
 * The website is also in the note, because many phones' scan previews skip the URL field.
 */
export function contactCard(settings: SiteSettings) {
  const { person } = settings;
  const phone = contactPhone(settings);
  const website = contactWebsite(settings);
  const [first, ...rest] = person.name.trim().split(/\s+/);

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escape(rest.join(" "))};${escape(first ?? "")};;;`,
    `FN:${escape(person.name)}`,
    `EMAIL:${person.email}`,
    ...(phone ? [`TEL;TYPE=CELL:${phone.replace(/[^\d+]/g, "")}`] : []),
    `URL:${website}`,
    `NOTE:${escape(`Website: ${website}`)}`,
    "END:VCARD",
  ].join("\r\n");
}
