import { ImageResponse } from "next/og";
import { site } from "@content/site";
import { getSettings } from "./settings";

/**
 * The site icon: the favicon uploaded in the admin panel (a square PNG), or
 * the built-in initials badge when none has been uploaded.
 */
export async function renderIcon(size: number, { round }: { round: boolean }) {
  const { favicon } = await getSettings();

  if (favicon) {
    try {
      const response = await fetch(favicon, { next: { revalidate: 300, tags: ["settings"] } });
      if (response.ok) {
        return new Response(await response.arrayBuffer(), { headers: { "Content-Type": "image/png" } });
      }
    } catch (error) {
      console.error("Could not load the uploaded favicon, using the built-in icon.", error);
    }
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#5ee0ae",
        borderRadius: round ? "50%" : 0,
        color: "#0c1311",
        fontSize: size * 0.42,
        fontWeight: 700,
        fontFamily: "monospace",
      }}
    >
      {site.initials}
    </div>,
    { width: size, height: size },
  );
}
