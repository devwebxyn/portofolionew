import { PageIntro, TextLink } from "@/components/Editorial";
import { LabDiagram, MemoryDemo } from "@/components/LabExperiments";
import { Workbench } from "@/components/Visuals";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/systems", "Eksplorasi sistem", "Catatan tentang hal yang dipelajari Samuel Indra Bastian di Linux, sistem operasi, pemrograman low-level, memori, dan embedded systems.");

export default function Systems() {
  return <>
    <PageIntro label="Eksplorasi sistem" className="systems-intro" title={<>Di balik <em>program.</em></>} art={<Workbench pose="systems" />}>
      Saya sedang mempelajari bagaimana perangkat lunak sampai ke mesin yang menjalankannya, dari sistem operasi dan pemrograman low-level hingga prosesor dan mikrokontroler.
    </PageIntro>
    <section className="frame section">
      <div className="section-heading"><p className="eyebrow">Lapisan komputasi</p><h2>Apa yang terjadi saat <em>kode berjalan?</em></h2><p className="lead">Pilih salah satu lapisan untuk melihat pertanyaan yang sedang saya telusuri.</p></div>
      <LabDiagram kind="chip" />
    </section>
    <section className="lilac section">
      <div className="frame editorial">
        <div className="prose"><p className="eyebrow">Ruang memori</p><h2>Menemukan data lewat alamat</h2><p>Representasi heksadesimal memudahkan saya membaca alamat dalam bentuk yang ringkas. Contoh ini membagi ruang alamat sederhana ke dalam blok-blok kecil.</p></div>
        <MemoryDemo />
      </div>
    </section>
    <section className="frame section-compact"><TextLink href="/electronics">Lanjut ke meja kerja elektronika</TextLink></section>
  </>;
}
