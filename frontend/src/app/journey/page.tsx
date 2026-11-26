import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Wafer } from "@/components/bare/Hardware";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/journey", "Perjalanan", "Perjalanan Samuel Indra Bastian sejak mulai mengembangkan perangkat lunak bersama AI pada Juli 2024 hingga mempelajari sistem Linux dan elektronika.");

const milestones = [
  { label: "Juli 2024", title: "Mulai membangun bersama AI", text: "Saya mulai memakai AI untuk mewujudkan ide menjadi perangkat lunak. Saya sudah bekerja dengan cara ini sebelum istilah vibe coding diperkenalkan dan dikenal luas." },
  { label: "Pengembangan", title: "Dari hasil ke cara kerjanya", text: "Ketika aplikasi berjalan, pertanyaan berikutnya muncul. Saya ingin tahu bagaimana proses dimulai, bagaimana data disimpan, dan apa yang terjadi ketika ada kegagalan." },
  { label: "Eksplorasi sistem", title: "Menelusuri batas userspace", text: "Rasa ingin tahu membawa saya ke Linux, fondasi kernel, dan pemrograman low-level. Saya mulai melihat aplikasi sebagai satu bagian dari susunan yang lebih besar." },
  { label: "Elektronika", title: "Membaca sistem dari sisi rangkaian", text: "Desain PCB, penyolderan, dan diagnosis perangkat membantu saya melihat komputasi sebagai kerja sama antara kode dan perangkat keras." },
];

export default function Journey() {
  return <>
    <section className="journey-top frame page-top">
      <Chapter id="LINIMASA" label="Perjalanan" />
      <header className="journey-header"><p aria-hidden="true" className="journey-engraving">2024</p><div><p className="eyebrow">Mulai Juli 2024</p><h1>Menelusuri <em>cara kerja.</em></h1><p className="lead">Dari ide yang saya bangun bersama AI hingga pertanyaan tentang Linux, instruksi mesin, dan rangkaian.</p></div></header>
    </section>
    <section className="frame journey-content">
      <ol className="timeline" aria-label="Linimasa perjalanan">
        {milestones.map(({label,title,text},i)=><li key={label} data-scene>
          <div className="timeline-dot" /><span className="eyebrow">{i === 0 ? <time dateTime="2024-07">{label}</time> : label}</span><div><h2>{title}</h2><p>{text}</p></div>
        </li>)}
      </ol>
      <Scene art={<Wafer />} label="Dari aplikasi ke silikon" className="journey-wafer" />
    </section>
    <NextChapter href="/ai" title="Cara kerja yang terus saya asah.">Lihat metode bersama AI</NextChapter>
  </>;
}
