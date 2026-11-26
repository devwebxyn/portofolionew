import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { channels, name, pageMetadata, siteDescription, siteTitle, siteUrl } from "@/lib/site";
import { SceneObserver } from "@/components/bare/SceneControls";
import "./globals.css";
import "./scenes.css";
import "./exhibition.css";
import "./workflows.css";

const display = localFont({ src: "./fonts/space-grotesk.woff2", variable: "--font-display", weight: "400 700", display: "swap" });
const serif = localFont({ src: "./fonts/instrument-serif-italic.woff2", variable: "--font-serif", style: "italic", display: "swap" });
export const metadata: Metadata = {
  ...pageMetadata("/", siteTitle, siteDescription),
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s · Samuel Indra Bastian" },
  authors: [{ name, url: siteUrl }],
  creator: name,
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": `${siteUrl}/#samuel`, name, url: siteUrl,
      description: siteDescription,
      knowsAbout: ["Pemrograman low-level", "Sistem Linux", "Arsitektur komputer", "Elektronika"],
      sameAs: channels.filter(({ label }) => ["GitHub", "Instagram", "LinkedIn"].includes(label)).map(({ href }) => href),
    },
    {
      "@type": "WebSite", "@id": `${siteUrl}/#situs`, name, url: siteUrl,
      description: siteDescription, inLanguage: "id-ID", author: { "@id": `${siteUrl}/#samuel` },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${serif.variable}`}>
      <body>
        <a className="skip-link" href="#konten">Lewati ke konten</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <Navbar />
        <SceneObserver />
        <noscript><style>{`@media (max-width: 950px) {
          .header-inner { flex-wrap: wrap; padding-block: 10px; }
          .menu-toggle { display: none; }
          .navigation { display: flex; position: static; flex-flow: row wrap; gap: 0 16px; visibility: visible; opacity: 1; transform: none; padding: 0; overflow: visible; box-shadow: none; }
          .navigation a:last-child { margin-top: 0; }
        }
        .navigation .world-panel { position: static; display: flex; flex-wrap: wrap; visibility: visible; opacity: 1; transform: none; min-width: 0; gap: 8px; }
        .world-menu > button { display: none; }`}</style></noscript>
        <main id="konten" tabIndex={-1}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
