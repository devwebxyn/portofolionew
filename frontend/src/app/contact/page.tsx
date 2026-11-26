import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { Chapter, Scene } from "@/components/bare/Exhibit";
import { Connection } from "@/components/bare/Computing";
import { channels, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/contact", "Kontak", "Hubungi Samuel Indra Bastian untuk berdiskusi tentang Linux, pemrograman low-level, dan elektronika.");

export default function Contact() {
  return <section className="frame page-top contact-page">
    <Chapter id="KONTAK" label="Buka sambungan" />
    <header className="contact-title entrance"><h1>Mari <em>terhubung.</em></h1><p className="lead">Ada pertanyaan tentang Linux, elektronika, atau eksperimen yang ingin kamu bahas? Kirim pesan atau temui saya lewat kanal berikut.</p></header>
    <div className="contact-layout">
      <Scene art={<Connection />} label="Jalur sinyal" />
      <div className="contact-panel"><h2>Tulis pesan</h2><p>Alamat emailmu saya gunakan untuk membalas pesan.</p><ContactForm /><noscript><p>Gunakan kanal lain di halaman ini untuk mengirim pesan.</p><style>{".contact-form { display: none; }"}</style></noscript></div>
      <ul className="contact-channels">{channels.map(({ href, label, detail }) => <li key={href}><a href={href}><span><strong>{label}</strong><span>{detail}</span></span><ArrowUpRight size={19} aria-hidden /></a></li>)}</ul>
    </div>
  </section>;
}
