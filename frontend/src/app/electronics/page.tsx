import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Board, ComponentsArt, Microcontroller } from "@/components/bare/Hardware";
import { Explorer } from "@/components/bare/SceneControls";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/electronics", "Elektronika", "Praktik elektronika Samuel Indra Bastian, termasuk desain PCB, penyolderan SMD dan THT, perakitan, dan diagnosis rangkaian.");

export default function Electronics() {
  return <>
    <section className="electronics-top">
      <div className="frame page-top">
        <Chapter id="PCB" label="Meja kerja elektronika" />
        <header className="workbench-title entrance"><h1>Di luar <em>kode.</em></h1><p className="lead">Merancang jalur, memasang komponen, dan memeriksa sinyal. Di meja kerja, cara kerja sistem bisa saya telusuri dengan tangan.</p></header>
        <Scene art={<Board />} label="Rakitan PCB" className="board-scene workbench-board" />
      </div>
    </section>
    <section className="section frame">
      <Chapter id="01" label="Pemasangan komponen" />
      <div className="section-heading"><h2>Di atas dan <em>menembus papan.</em></h2><p className="lead">Saya menggunakan penyolderan SMD dan THT sesuai jenis komponen dan kebutuhan perakitan.</p></div>
      <Explorer label="Pilih jenis pemasangan" className="component-explorer" views={[
        {label:"SMD",title:"Sambungan di permukaan",text:"Terminasi komponen bertemu pad di permukaan PCB. Saat menyolder, saya memeriksa posisi, pembasahan timah, dan kemungkinan jembatan antar-pad.",art:<ComponentsArt />},
        {label:"THT",title:"Kaki melewati lubang",text:"Kaki komponen masuk melalui lubang PCB. Setelah menyolder, saya memeriksa apakah sambungannya terbentuk dengan baik dan kaki terpotong rapi.",art:<ComponentsArt throughHole />},
      ]} />
    </section>
    <section className="section paper">
      <div className="frame">
        <Chapter id="02" label="Dari desain ke diagnosis" />
        <div className="work-list">
          <article><h3>Desain PCB</h3><p>Menata komponen dan menentukan jalur sesuai koneksi, ruang, dan kebutuhan perakitan.</p></article>
          <article><h3>Perakitan PCB</h3><p>Memasang komponen, mengecek orientasi dan polaritas, lalu memeriksa sambungan sebelum memberi daya.</p></article>
          <article><h3>Troubleshooting</h3><p>Melacak sambungan putus, hubungan pendek, atau pemasangan yang keliru.</p></article>
          <article><h3>Diagnosis perangkat</h3><p>Membandingkan tegangan serta sinyal yang terukur dengan perilaku yang diharapkan.</p></article>
        </div>
      </div>
    </section>
    <section className="section frame">
      <div className="feature-grid">
        <Scene art={<Microcontroller />} label="Paket mikrokontroler" className="mcu-scene" />
        <div className="feature-copy"><h2>Di tempat kode <em>bertemu pin.</em></h2><p className="lead">Mikrokontroler menghubungkan firmware dengan perangkat melalui periferal seperti GPIO dan timer. Fungsi tiap pin bergantung pada konfigurasi dan chip yang dipakai.</p><details className="hotspot"><summary>GPIO</summary><p>Pin digital yang bisa dibaca sebagai masukan atau dikendalikan sebagai keluaran.</p></details><details className="hotspot"><summary>Timer dan bus</summary><p>Timer menangani pengukuran atau penjadwalan yang bergantung waktu. Bus menghubungkan CPU dengan periferal atau perangkat lain.</p></details></div>
      </div>
    </section>
    <NextChapter href="/projects" title="Dari meja kerja ke arsip.">Lihat proyek</NextChapter>
  </>;
}
