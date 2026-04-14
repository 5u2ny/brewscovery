import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/site/providers";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { AgeGate } from "@/components/site/age-gate";

export const metadata: Metadata = {
  title: "Brewscovery — Curated craft beer, delivered.",
  description:
    "Premium craft beer discovery and subscription. Curated tasting packs, personalized recommendations, and the best of independent brewing — delivered to your door.",
  openGraph: {
    title: "Brewscovery",
    description: "Curated craft beer tasting, delivered.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Providers>
          <AgeGate />
          <SiteHeader />
          <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
