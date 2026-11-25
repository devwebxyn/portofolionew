import { PageIntro, TextLink } from "@/components/Editorial";
import { Workflow } from "@/components/LabExperiments";
import { Workbench } from "@/components/Visuals";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ai", "Bersama AI", "Bagaimana Samuel Indra Bastian mengarahkan agen AI, menguji perangkat lunak, dan belajar dari proyek sejak Juli 2024.");

export default function AI() {
  return <>
    <PageIntro label="Bersama AI" className="ai-intro" title={<>Berpikir, mencoba, <em>mengulang.</em></>} art={<Workbench pose="ai" />}>
      Sejak Juli 2024, AI menjadi pendamping utama saya untuk membuat perangkat lunak, mengurai pertanyaan, dan mencoba ide yang sebelumnya hanya ada di catatan.
    </PageIntro>
    <section className="lilac section">
      <div className="frame">
        <div className="section-heading"><p className="eyebrow">Alur kerja konseptual</p><h2>Dari ide <em>ke hasil.</em></h2><p className="lead">Pilih tahap untuk melihat peran saya dan AI di sepanjang proses.</p></div>
        <Workflow />
      </div>
    </section>
    <section className="frame section editorial">
      <div className="editorial-aside"><p className="eyebrow">Vibe coding</p><p className="editorial-note">Membangun sambil <em>belajar.</em></p></div>
      <div className="prose">
        <h2>AI memberi saya ruang untuk bertanya</h2>
        <p>Saya bisa meminta agen menjelaskan bagian yang membingungkan, mencoba beberapa pendekatan, dan kembali ke pertanyaan awal setelah melihat hasilnya. Saya menentukan apa yang mau saya bangun dan arah mana yang ingin saya coba.</p>
        <h2>Pengujian memberi saya bahan untuk memutuskan</h2>
        <p>Sebagian besar implementasi perangkat lunak saya dibantu AI. Saya menjalankan proyek, memeriksa apakah hasilnya sesuai dengan tujuan, dan memakai temuan itu untuk memberi arahan berikutnya. Kadang proses itu membuat saya mengubah ide awal.</p>
        <TextLink href="/projects">Lihat proyek yang saya kerjakan</TextLink>
      </div>
    </section>
  </>;
}
