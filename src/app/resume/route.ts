import { getSettings } from "@/lib/settings";

// Always fetch the current file, so a new résumé uploaded in the admin panel is served straight away.
export const dynamic = "force-dynamic";

/**
 * The résumé uploaded in the admin panel (Site settings), served from this
 * site's own address and downloaded as "Your-Name-Resume.pdf".
 */
export async function GET() {
  const { resume, person } = await getSettings();
  if (!resume) return new Response("Not found", { status: 404 });

  const file = await fetch(resume, { cache: "no-store" });
  if (!file.ok || !file.body) return new Response("Not found", { status: 404 });

  // Header values must be plain ASCII.
  const name = person.name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const filename = name ? `${name}-Resume.pdf` : "Resume.pdf";

  return new Response(file.body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "no-store",
    },
  });
}
