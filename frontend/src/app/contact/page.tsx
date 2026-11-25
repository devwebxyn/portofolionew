import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { PageIntro } from "@/components/Editorial";
import { Workbench } from "@/components/Visuals";
import { channels, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/contact", "Kontak", "Hubungi Samuel Indra Bastian lewat formulir, email, GitHub, Instagram, WhatsApp, atau LinkedIn.");

export default function Contact() {
  return <>
    <PageIntro label="Kontak" className="contact-intro" title={<>Mari <em>ngobrol.</em></>} art={<Workbench pose="contact" />}>
      Punya pertanyaan tentang eksperimen saya, ingin berbagi ide, atau sekadar menyapa? Saya senang mendengarnya.
    </PageIntro>
    <section className="paper section">
      <div className="frame contact-layout">
        <div>
          <p className="eyebrow">Kanal lain</p><h2>Temui saya <em>di sini.</em></h2>
          <ul className="contact-channels">{channels.map(({ href, label, detail }) => <li key={href}><a href={href}><span><strong>{label}</strong><span>{detail}</span></span><ArrowUpRight size={20} aria-hidden /></a></li>)}</ul>
        </div>
        <div className="contact-panel"><h2>Tinggalkan pesan.</h2><p>Isi semua kolom. Saya memakai alamat emailmu untuk membalas.</p><ContactForm /><noscript><p>Kamu bisa mengirim pesan lewat kanal di halaman ini.</p><style>{".contact-form { display: none; }"}</style></noscript></div>
      </div>
    </section>
  </>;
}
