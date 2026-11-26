import { TextLink } from "@/components/Editorial";
import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Wafer } from "@/components/bare/Hardware";
import { Connection } from "@/components/bare/Computing";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/about", "Tentang saya", "Samuel Indra Bastian mempelajari pemrograman low-level, sistem Linux, arsitektur komputer, dan elektronika.");

export default function About() {
  return <>
    <section className="frame page-top about-top">
      <Chapter id="PROFIL" label="Samuel Indra Bastian" />
      <div className="about-composition">
        <header className="entrance"><h1>Di balik<br /> <em>rasa ingin tahu.</em></h1><p className="lead">Saya Samuel Indra Bastian. Saya tertarik pada apa yang terjadi di antara kode yang kita tulis dan sinyal yang bergerak di papan rangkaian.</p></header>
        <Scene art={<Wafer />} label="Permukaan silikon" className="wafer-scene" />
      </div>
    </section>
    <section className="section paper">
      <div className="frame about-essay">
        <p className="eyebrow">Cara saya belajar</p>
        <div><h2>Saya mengikuti <em>jalur sebuah instruksi.</em></h2><p>Saya mempelajari pemrograman low-level dan fondasi kernel Linux lewat pertanyaan konkret. Apa yang terjadi saat sebuah program membuka berkas? Siapa yang menentukan lokasi data di memori? Bagaimana perangkat memberi tahu CPU bahwa ada pekerjaan baru?</p><p>Di elektronika, saya bisa mengikuti pertanyaan itu hingga ke rangkaian. Saya mendesain dan merakit PCB, menyolder komponen SMD dan THT, serta mencari penyebab kegagalan pada sambungan dan jalur sinyal.</p><TextLink href="/electronics">Lihat praktik elektronika saya</TextLink></div>
      </div>
    </section>
    <section className="frame section">
      <div className="feature-grid">
        <Scene art={<Connection />} label="Dari ide menuju sinyal" />
        <div className="feature-copy"><h2>Membangun sambil <em>memahami.</em></h2><p className="lead">Sejak Juli 2024, saya memakai AI untuk membantu mengembangkan perangkat lunak. Ide berawal dari pertanyaan saya, dan saya menguji hasilnya untuk melihat cara kerjanya.</p><TextLink href="/ai">Cara saya bekerja bersama AI</TextLink></div>
      </div>
    </section>
    <NextChapter href="/journey" title="Awal perjalanan saya.">Baca linimasa</NextChapter>
  </>;
}
