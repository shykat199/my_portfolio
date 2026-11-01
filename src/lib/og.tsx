import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@content/site";

export const ogSize = { width: 1200, height: 630 };

export async function renderOgImage(title: string, label: string) {
  const newsreader = await readFile(join(process.cwd(), "src/assets/newsreader-regular.ttf"));

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0c1311",
        color: "#edf3ef",
        fontFamily: "Newsreader",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 34 }}>
        <span>{site.name}</span>
        <span style={{ color: "#5ee0ae" }}>{label}</span>
      </div>
      <div style={{ display: "flex", fontSize: 76, lineHeight: 1.08, letterSpacing: -1, maxWidth: 1000 }}>
        {title}
      </div>
      <div style={{ display: "flex", height: 8, width: 96, background: "#5ee0ae" }} />
    </div>,
    {
      ...ogSize,
      fonts: [{ name: "Newsreader", data: newsreader, style: "normal", weight: 400 }],
    },
  );
}
