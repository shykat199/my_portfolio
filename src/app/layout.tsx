import type { Metadata, Viewport } from "next";
import { GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { Instrument_Sans, JetBrains_Mono, Newsreader } from "next/font/google";
import type { ReactNode } from "react";
import { site } from "@content/site";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { JsonLd } from "@/components/ui/JsonLd";
import { MotionProvider } from "@/components/ui/MotionProvider";
import { NodeField } from "@/components/ui/NodeField";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SmoothDetails } from "@/components/ui/SmoothDetails";
import { siteGraph } from "@/lib/schema";
import { getServices } from "@/lib/services";
import { getSettings } from "@/lib/settings";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.seo.title, template: `%s | ${site.name}` },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
};

export const viewport: Viewport = {
  themeColor: "#0c1311",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const [services, settings] = await Promise.all([getServices(), getSettings()]);

  return (
    <html
      lang="en-GB"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      {gtmId && <GoogleTagManager gtmId={gtmId} />}
      <body suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-fg focus:px-4 focus:py-3 focus:text-surface"
        >
          Skip to content
        </a>
        <JsonLd nodes={siteGraph(services, settings)} />
        <NodeField />
        <MotionProvider>
          <ScrollProgress />
          <Header logo={settings.logo} />
          <main id="main" className="pt-20">{children}</main>
          <Footer />
          <FloatingActions whatsapp={settings.whatsapp} />
          <SmoothDetails />
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
