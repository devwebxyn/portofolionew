// /src/app/layout.tsx

import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar"; // <-- Impor Navbar
import { Footer } from "@/components/Footer"; // <-- Impor Footer
import { RouteProgress } from "@/components/RouteProgress";
import { RouteTypingNavigator } from "@/components/RouteTypingNavigator";

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

export const metadata: Metadata = {
  title: "Samuel Indra Bastian - Fullstack Developer",
  description: "Merancang dan membangun solusi digital end-to-end.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontInter.variable} ${fontSora.variable}`}>
      <body className="bg-background-dark text-text-body font-body">
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