import { PageIntro, TextLink } from "@/components/Editorial";
import { LabDiagram } from "@/components/LabExperiments";
import { Workbench } from "@/components/Visuals";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/electronics", "Elektronika", "Praktik elektronika industri Samuel Indra Bastian, dari penyolderan SMD dan THT hingga perakitan, desain PCB, dan diagnosis rangkaian.");

export default function Electronics() {
  return <>
    <PageIntro label="Elektronika" className="electronics-intro" title={<>Di meja <em>solder.</em></>} art={<Workbench pose="electronics" />}>
      Saya belajar elektronika industri lewat praktik langsung. Di meja kerja, saya merancang dan merakit PCB, menyolder komponen, dan menelusuri gangguan pada rangkaian.
    </PageIntro>
    <section className="paper section">
      <div className="frame">
        <div className="section-heading"><p className="eyebrow">Papan rangkaian</p><h2>Satu papan, <em>empat cara bekerja.</em></h2><p className="lead">Pilih area kerja untuk melihat apa yang saya lakukan di sana.</p></div>
        <LabDiagram kind="board" />
      </div>
    </section>
    <section className="frame section editorial">
      <div className="editorial-aside"><p className="eyebrow">Ketika papan tidak bekerja</p><p className="editorial-note">Ikuti <em>gejalanya.</em></p></div>
      <div className="prose">
        <h2>Memeriksa rangkaian selangkah demi selangkah</h2>
        <p>Saat papan bermasalah, saya mulai dari bagian yang bisa diperiksa. Apakah komponen terpasang pada posisi yang benar? Adakah sambungan yang perlu diperiksa lagi? Pertanyaan itu membantu saya mempersempit kemungkinan sebelum mengambil tindakan.</p>
        <p>Praktik ini juga membuat saya penasaran dengan pekerjaan di sisi lain papan, terutama ketika sebuah program mengendalikan mikrokontroler.</p>
        <TextLink href="/systems">Jelajahi sisi sistem</TextLink>
      </div>
    </section>
  </>;
}
