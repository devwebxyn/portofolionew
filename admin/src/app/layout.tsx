import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const fontSpace = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: {
    default: "Admin — Portfolio",
    template: "%s · Admin",
  },
  description: "Panel admin portfolio",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${fontInter.variable} ${fontSpace.variable}`}>
      <body className="bg-void font-sans text-hi">
        {children}
      </body>
    </html>
  );
}
