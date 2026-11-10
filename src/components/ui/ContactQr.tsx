import QRCode from "qrcode";
import { site } from "@content/site";
import { getSettings } from "@/lib/settings";
import { contactCard, contactPhone, contactWebsite } from "@/lib/vcard";

/** Blank modules around the code, which scanners need to find it. */
const QUIET = 4;
const FINDER = 7;

// Dark on light so every phone camera can read it, whatever the site's theme.
const ink = "#08130f";
const finderInk = "#0c5a40";

/**
 * A QR code of your contact card (website, email and phone from the admin
 * panel), drawn with rounded dots and corner markers, with your logo (or
 * initials) in the middle.
 */
export async function ContactQr({ id, className = "" }: { id?: string; className?: string }) {
  const settings = await getSettings();
  const logo = await logoDataUrl(settings.logo);
  const { modules } = QRCode.create(contactCard(settings), { errorCorrectionLevel: "Q" });
  const { size } = modules;
  const full = size + QUIET * 2;
  // Room for the logo badge; level Q codes still read with up to 25% covered.
  const badge = Math.round(size * 0.2) | 1;
  const badgeStart = (size - badge) / 2;

  const inFinder = (row: number, col: number) =>
    (row < FINDER && col < FINDER) || (row < FINDER && col >= size - FINDER) || (row >= size - FINDER && col < FINDER);
  // The badge plus one blank module around it.
  const inBadge = (row: number, col: number) =>
    row >= badgeStart - 1 && row <= badgeStart + badge && col >= badgeStart - 1 && col <= badgeStart + badge;

  const dots: { x: number; y: number }[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (modules.get(row, col) && !inFinder(row, col) && !inBadge(row, col)) {
        dots.push({ x: col + QUIET, y: row + QUIET });
      }
    }
  }

  const finders = [
    [QUIET, QUIET],
    [QUIET + size - FINDER, QUIET],
    [QUIET, QUIET + size - FINDER],
  ];
  const phone = contactPhone(settings);
  const label = `QR code: scan to save ${settings.person.name}'s contact (${[contactWebsite(settings), settings.person.email, phone]
    .filter(Boolean)
    .join(", ")})`;

  return (
    <svg id={id} xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${full} ${full}`} role="img" aria-label={label} className={`rounded-2xl ${className}`}>
      {/* Part of the image (not CSS), so the shared PNG has it too. */}
      <rect width={full} height={full} rx={3} fill="#ffffff" />
      {/* Softly rounded squares: modern, but solid enough for any camera. */}
      {dots.map((dot) => (
        <rect key={`${dot.x}-${dot.y}`} x={dot.x + 0.04} y={dot.y + 0.04} width={0.92} height={0.92} rx={0.3} fill={ink} />
      ))}
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x + 0.5} y={y + 0.5} width={FINDER - 1} height={FINDER - 1} rx={2} fill="none" stroke={finderInk} strokeWidth={1} />
          <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.9} fill={finderInk} />
        </g>
      ))}
      {logo ? (
        <>
          <rect
            x={QUIET + badgeStart}
            y={QUIET + badgeStart}
            width={badge}
            height={badge}
            rx={badge * 0.28}
            fill="#ffffff"
            stroke={finderInk}
            strokeWidth={0.35}
          />
          {/* Rounded to match the badge, so square logos and photos look neat. */}
          <clipPath id={`${id ?? "qr"}-logo`}>
            <rect
              x={QUIET + badgeStart + badge * 0.1}
              y={QUIET + badgeStart + badge * 0.1}
              width={badge * 0.8}
              height={badge * 0.8}
              rx={badge * 0.2}
            />
          </clipPath>
          <image
            href={logo}
            x={QUIET + badgeStart + badge * 0.1}
            y={QUIET + badgeStart + badge * 0.1}
            width={badge * 0.8}
            height={badge * 0.8}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${id ?? "qr"}-logo)`}
          />
        </>
      ) : (
        <>
          <rect x={QUIET + badgeStart} y={QUIET + badgeStart} width={badge} height={badge} rx={badge * 0.28} fill={finderInk} />
          <text
            x={QUIET + size / 2}
            y={QUIET + size / 2}
            textAnchor="middle"
            dominantBaseline="central"
            fill="#ffffff"
            fontFamily="ui-monospace, monospace"
            fontWeight={700}
            fontSize={badge * 0.42}
          >
            {site.initials}
          </text>
        </>
      )}
    </svg>
  );
}

/**
 * The logo uploaded in the admin panel, embedded as a data URL so it is part
 * of the image itself (and of the PNG the share button makes). Null when there
 * is no logo or it can't be loaded, which shows your initials instead.
 */
async function logoDataUrl(src: string | null) {
  if (!src) return null;

  try {
    const response = await fetch(src, { next: { revalidate: 300, tags: ["settings"] } });
    if (!response.ok) return null;
    const type = response.headers.get("content-type")?.split(";")[0] || "image/png";
    if (!type.startsWith("image/")) return null;

    return `data:${type};base64,${Buffer.from(await response.arrayBuffer()).toString("base64")}`;
  } catch (error) {
    console.error("Contact QR: could not load the logo", error);
    return null;
  }
}
