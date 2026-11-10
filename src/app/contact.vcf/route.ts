import { getSettings } from "@/lib/settings";
import { contactCard } from "@/lib/vcard";

/** The same contact card as the QR code, for visitors on a computer ("Save contact"). */
export async function GET() {
  const settings = await getSettings();
  const name = settings.person.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") || "contact";

  return new Response(contactCard(settings), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${name}.vcf"`,
    },
  });
}
