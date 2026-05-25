// /src/app/layout.tsx

import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; // <-- Impor Navbar
import { Footer } from "@/components/Footer"; // <-- Impor Footer
import { RouteProgress } from "@/components/RouteProgress";
import { RouteTypingNavigator } from "@/components/RouteTypingNavigator";
import { SEOJsonLd } from "@/components/SEOJsonLd";

// (Konfigurasi font tidak berubah)
const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const fontSora = Sora({
  subsets: ["latin"],
  weight: ['400', '600', '700'],
  variable: "--font-sora",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samuel Indra Bastian - Fullstack Developer",
    template: "%s | Samuel Indra Bastian",
  },
  description: "Merancang dan membangun solusi digital end-to-end.",
  keywords: [
    "Samuel Indra Bastian",
    "Samuel",
    "Fullstack Developer",
    "Web Engineer",
    "IoT",
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
    title: "Samuel Indra Bastian - Fullstack Developer",
    description: "Merancang dan membangun solusi digital end-to-end.",
    siteName: "Samuel Indra Bastian",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Samuel Indra Bastian Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Indra Bastian - Fullstack Developer",
    description: "Merancang dan membangun solusi digital end-to-end.",
    images: ["/og.png"],
    creator: "@samuel",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': "large",
      'max-video-preview': -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontSora.variable}`}>
      <body className="bg-background-dark text-text-body font-body">
        <SEOJsonLd siteUrl={siteUrl} />
        <RouteProgress />
  <RouteTypingNavigator />
        <Navbar /> {/* <-- Tambahkan Navbar di sini */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer /> {/* <-- Tambahkan Footer di sini */}
      </body>
    </html>
  );
}