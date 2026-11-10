import { site } from "@content/site";
import { ContactQr } from "@/components/ui/ContactQr";
import { ShareQrButton } from "@/components/ui/ShareQrButton";
import { getSettings } from "@/lib/settings";
import { contactWebsite } from "@/lib/vcard";

const QR_ID = "contact-qr";

/** Green camera-style corner brackets around the QR code. */
const corners = [
  "top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl",
  "top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl",
  "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl",
  "bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl",
];

/** The contact QR code with one line of text and buttons to save or share it. */
export async function ContactQrCard({ className = "" }: { className?: string }) {
  const { contactQr } = site;
  const settings = await getSettings();
  const { name } = settings.person;
  const fileName = `${name.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "") || "contact"}-QR.png`;

  return (
    <div className={`relative overflow-hidden rounded-2xl border border-accent/25 bg-gradient-to-b from-raised to-surface p-5 ${className}`}>
      <div aria-hidden="true" className="pointer-events-none absolute -top-20 left-1/2 size-56 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-52 p-2.5">
        {corners.map((corner) => (
          <span key={corner} aria-hidden="true" className={`absolute size-7 border-accent ${corner}`} />
        ))}
        <ContactQr id={QR_ID} className="block aspect-square w-full shadow-[0_20px_50px_-20px_rgb(94_224_174/0.5)]" />
      </div>

      <p className="relative mt-4 text-center text-lg leading-tight">{contactQr.title}</p>

      <div className="relative mt-4 grid grid-cols-2 gap-3">
        <a
          href="/contact.vcf"
          download
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-medium whitespace-nowrap text-surface transition-colors hover:bg-accent-strong"
        >
          <svg viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
          </svg>
          {contactQr.save}
        </a>
        <ShareQrButton
          qrId={QR_ID}
          label={contactQr.share}
          fileName={fileName}
          title={contactQr.shareTitle.replace("{name}", name)}
          text={contactQr.shareText.replace("{name}", name)}
          url={contactWebsite(settings)}
          className="h-11 px-4 text-sm font-medium whitespace-nowrap"
        >
          {contactQr.shareShort}
        </ShareQrButton>
      </div>
    </div>
  );
}
