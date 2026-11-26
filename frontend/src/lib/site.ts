import type { Metadata } from "next";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.samuelindrabastian.my.id").replace(/\/+$/, "");
export const name = "Samuel Indra Bastian";
export const siteTitle = `${name} — Pemrograman low-level & sistem Linux`;
export const siteDescription = "Portofolio Samuel Indra Bastian. Eksplorasi pemrograman low-level, sistem Linux, arsitektur komputer, dan elektronika.";

export const worlds = [
  { href: "/electronics", label: "Elektronika" },
  { href: "/embedded", label: "Embedded & firmware" },
  { href: "/semiconductor", label: "Silikon & fabrikasi" },
  { href: "/systems", label: "Sistem komputer" },
  { href: "/computing", label: "GPU, CUDA & AI" },
  { href: "/lab", label: "Laboratorium" },
];

export const navigation = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Tentang saya" },
  { href: "/journey", label: "Perjalanan" },
  { href: "/projects", label: "Proyek" },
  { href: "/ai", label: "Bersama AI" },
  { href: "/contact", label: "Kontak" },
  ...worlds,
];

export const channels = [
  { label: "Email", href: "mailto:contact@samuelindrabastian.my.id", detail: "contact@samuelindrabastian.my.id" },
  { label: "GitHub", href: "https://github.com/samuelindra123", detail: "samuelindra123" },
  { label: "Instagram", href: "https://www.instagram.com/samuelindrabastian/", detail: "@samuelindrabastian" },
  { label: "WhatsApp", href: "https://wa.me/62882019494158", detail: "Kirim pesan" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/samuel-indra-bastian/", detail: "Samuel Indra Bastian" },
];

export function pageMetadata(path: string, title: string, description: string, image?: string): Metadata {
  const images = image ? [{ url: image, alt: `Gambar ${title}` }] : [{ url: "/og.png", width: 1200, height: 630, alt: "Samuel Indra Bastian, Pemrograman low-level & sistem Linux" }];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "id_ID", url: path, siteName: name, title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
