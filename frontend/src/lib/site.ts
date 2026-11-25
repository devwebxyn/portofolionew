import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.samuelindrabastian.my.id").replace(/\/+$/, "");
export const name = "Samuel Indra Bastian";
export const siteTitle = `${name} — Vibe Coder sejak Juli 2024`;
export const siteDescription = "Laboratorium pribadi Samuel Indra Bastian. Membangun dengan AI sejak Juli 2024, merakit elektronika, dan mempelajari cara kerja sistem komputer.";

export const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang" },
  { href: "/journey", label: "Perjalanan" },
  { href: "/projects", label: "Proyek" },
  { href: "/electronics", label: "Elektronika" },
  { href: "/systems", label: "Sistem" },
  { href: "/ai", label: "Bersama AI" },
  { href: "/contact", label: "Kontak" },
];

export const channels = [
  { label: "Email", href: "mailto:contact@samuelindrabastian.my.id", detail: "contact@samuelindrabastian.my.id" },
  { label: "GitHub", href: "https://github.com/devwebxyn", detail: "devwebxyn" },
  { label: "Instagram", href: "https://www.instagram.com/samuelindrabastian/", detail: "@samuelindrabastian" },
  { label: "WhatsApp", href: "https://wa.me/62882019494158", detail: "Kirim pesan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samuel-indra-bastian/", detail: "Samuel Indra Bastian" },
];

export function pageMetadata(path: string, title: string, description: string, image?: string): Metadata {
  const images = image ? [{ url: image, alt: `Gambar ${title}` }] : [{ url: "/og.png", width: 1200, height: 630, alt: "Samuel Indra Bastian, Vibe Coder sejak Juli 2024" }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "id_ID", url: path, siteName: name, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
