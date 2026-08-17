import type { Metadata } from "next";
import "./globals.css";
import SiteNav from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Gubat Banwa — Compendium & Character Builder",
  description:
    "A browsable compendium and local character builder for Gubat Banwa, the Filipino martial-arts TTRPG of the Sword Isles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteNav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="no-print mx-auto max-w-6xl px-4 py-8 text-center text-xs text-ink/60">
          Fan-made reference tool. Gubat Banwa is © makapatag / Swordsfall.
          Character data is stored only in your browser.
        </footer>
      </body>
    </html>
  );
}
