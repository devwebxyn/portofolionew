import type { Metadata } from "next";
import { Instrument_Serif, Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RouteProgress } from "@/components/RouteProgress";
import { SEOJsonLd } from "@/components/SEOJsonLd";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const fontSpace = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});
const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
});
const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samuel Indra Bastian — Fullstack & IoT Developer",
    template: "%s · Samuel Indra Bastian",
  },
  description:
    "Fullstack & IoT developer. Merancang dan membangun produk digital end-to-end — dari antarmuka yang halus hingga sistem yang kokoh dan aman.",
  keywords: [
    "Samuel Indra Bastian",
    "Fullstack Developer",
    "Web Engineer",
    "IoT Engineer",
    "DevOps",
    "System Architect",
    "Portfolio",
  ],
  authors: [{ name: "Samuel Indra Bastian", url: siteUrl }],
  creator: "Samuel Indra Bastian",
  publisher: "Samuel Indra Bastian",
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Samuel Indra Bastian — Fullstack & IoT Developer",
    description:
      "Merancang dan membangun produk digital end-to-end — antarmuka halus, sistem kokoh.",
    siteName: "Samuel Indra Bastian",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Samuel Indra Bastian Portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Indra Bastian — Fullstack & IoT Developer",
    description:
      "Merancang dan membangun produk digital end-to-end — antarmuka halus, sistem kokoh.",
    images: ["/og.png"],
  },
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fontInter.variable} ${fontSpace.variable} ${fontSerif.variable} ${fontMono.variable}`}>
      <body className="relative bg-ink font-sans text-body">
        {/* Global ambient background */}
        <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
          <div className="grid-lines absolute inset-0" />
          <div className="aurora animate-drift -top-40 left-1/4 h-[36rem] w-[36rem] bg-accent/14" />
          <div className="aurora animate-drift top-1/3 -right-40 h-[30rem] w-[30rem] bg-accent2/10" style={{ animationDelay: "-8s" }} />
          <div className="aurora animate-drift -bottom-40 left-10 h-[28rem] w-[28rem] bg-accent3/10" style={{ animationDelay: "-14s" }} />
        </div>

        <div className="grain relative z-10 min-h-screen">
          <SEOJsonLd siteUrl={siteUrl} />
          <RouteProgress />
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
