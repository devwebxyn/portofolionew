import { Chapter, NextChapter } from "@/components/bare/Exhibit";
import { Workflow } from "@/components/bare/Computing";
import { Explorer } from "@/components/bare/SceneControls";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/ai", "Bersama AI", "Metode Samuel Indra Bastian dalam mengarahkan AI, menguji hasil, dan mengembangkan perangkat lunak sejak Juli 2024.");

const steps = [
  ["Ide","Menentukan apa yang ingin dibuat","Saya mulai dengan masalah, siapa yang akan memakai hasilnya, dan cara untuk melihat apakah ide itu bekerja."],
  ["Instruksi","Menetapkan ruang lingkup","Saya memberi AI konteks, tujuan, dan batasan. Perubahan kecil memudahkan saya memeriksa hasil pada tiap langkah."],
  ["Implementasi AI","Membaca perubahan","AI membantu menulis dan memperbaiki kode. Saya meninjau perubahan untuk memahami keputusan yang dibuat dan dampaknya pada bagian lain."],
  ["Pengujian","Menjalankan skenario nyata","Saya memeriksa jalur utama serta kondisi gagal, lalu membandingkan hasil dengan yang saya harapkan."],
  ["Evaluasi","Menilai hasil dan batasannya","Saya memutuskan bagian mana yang bisa diterima dan bagian mana yang perlu diperiksa lagi, dengan hasil pengujian sebagai acuan."],
  ["Iterasi","Memperbaiki berdasarkan temuan","Temuan menjadi instruksi berikutnya. Saya mengulangi siklus sampai hasilnya sesuai kebutuhan."],
];

export default function AI() {
  return <>
    <section className="ai-top page-top frame">
      <Chapter id="METODE" label="Bersama AI" />
      <header className="ai-header entrance"><h1>Saya mengarahkan. <em>AI membantu membangun.</em></h1><p className="lead">Sejak Juli 2024, AI menjadi alat utama dalam pengembangan perangkat lunak saya. Saya menentukan tujuan, membaca perubahan, dan menguji hasil sebelum melanjutkan.</p></header>
      <Explorer label="Pilih langkah kerja" className="workflow-explorer" views={steps.map(([label,title,text],i)=>({label,title,text,art:<Workflow active={i} />}))} />
    </section>
    <section className="section paper"><div className="frame about-essay"><p className="eyebrow">Juli 2024 hingga kini</p><div><h2>Metode yang tumbuh <em>bersama pertanyaan.</em></h2><p>Saya mulai bekerja dengan AI sebelum istilah vibe coding dikenal luas. Cara ini membuka jalan untuk membangun dan mencoba lebih banyak hal. Pengujian dan peninjauan membantu saya memahami hasilnya, termasuk bagian yang masih perlu saya pelajari.</p></div></div></section>
    <NextChapter href="/projects" title="Dari metode ke hasil.">Lihat arsip proyek</NextChapter>
  </>;
}
