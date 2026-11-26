import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Render } from "@/components/exhibition/Render";
import { Explorer } from "@/components/bare/SceneControls";
import { LazyExhibit } from "@/components/exhibition/LazyExhibit";
import { Essay, Index, Note, sources } from "@/components/exhibition/Editorial";
import { PcbJourney } from "@/components/exhibition/PcbJourney";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/electronics", "Elektronika", "Praktik elektronika Samuel Indra Bastian, termasuk desain PCB, penyolderan SMD dan THT, perakitan, dan diagnosis rangkaian.");

export default function Electronics() {
  return <>
    <section className="electronics-top">
      <div className="frame page-top">
        <Chapter id="PCB" label="Meja kerja elektronika" />
        <header className="workbench-title entrance"><h1>Di luar <em>kode.</em></h1><p className="lead">Merancang jalur, memasang komponen, dan memeriksa sinyal. Di meja kerja, cara kerja sistem bisa saya telusuri dengan tangan.</p></header>
        <Scene art={<Render name="pcb-populated" alt="Papan rangkaian dengan IC dan komponen SMD" priority/>} label="Rakitan PCB" className="board-scene workbench-board" />
        <Index items={[["praktek","Dari meja kerja"],["komponen-galeri","Galeri komponen"],["manufaktur-pcb","Pembuatan PCB"],["mikrokontroler","Mikrokontroler"]]}/>
      </div>
    </section>
    <Essay id="praktek" number="01" title="Dari meja kerja">
      <h2>Menelusuri <em>jejak kerusakan.</em></h2>
      <div><p>Di Teknik Elektronika Industri, dua papan dengan gejala yang sama bisa meminta pemeriksaan yang berbeda. Sambungan yang kurang baik, arah komponen yang terbalik, dan jalur daya yang putus bisa sama-sama membuat sistem tidak merespons. Saya mulai dari asumsi yang bisa diperiksa, seperti kontinuitas jalur dan keberadaan tegangan pada titik yang semestinya.</p><p>Saya punya pengalaman praktis menyolder SMD dan THT, mendesain dan merakit PCB, serta menelusuri gangguan rangkaian. Saat merakit, tanda pada silkscreen membantu memeriksa orientasi. Ketika papan gagal, saya kembali ke skematik untuk mengetahui jaringan yang menghubungkan hasil ukur dengan perilaku yang diharapkan.</p><Note label="Mengapa visual skematik dan fisik perlu dipisahkan?"><p>Simbol menerangkan fungsi dan hubungan antarterminal. Kemasan menerangkan bentuk, footprint, serta cara memasang komponen. Satu fungsi dapat hadir dalam lebih dari satu kemasan.</p></Note></div>
    </Essay>
    <section className="section frame" id="komponen-galeri">
      <Chapter id="02" label="Galeri komponen"/>
      <div className="section-heading"><h2>Tubuh, terminal, <em>dan fungsi.</em></h2><p className="lead">Pilih kategori dan satu komponen. Putar ilustrasi, lihat simbol, lalu buka tanda pada bagian yang menjelaskan perilakunya.</p></div>
      <LazyExhibit kind="gallery"/>
      <p className="reference">Paket dalam galeri merupakan contoh visual. Bukti pinout dan rating berasal dari datasheet masing-masing komponen.</p>
    </section>
    <section className="section pcb-band" id="manufaktur-pcb"><div className="frame">
      <Chapter id="03" label="Dari skematik ke papan"/>
      <div className="section-heading"><h2>Merancang sebelum <em>menyolder.</em></h2><p className="lead">Ukuran footprint, letak komponen, dan lintasan arus balik sudah menentukan banyak hal sebelum papan dicetak. Ikuti perubahan dari gambar koneksi hingga papan yang dapat diuji.</p></div>
      <PcbJourney/>
      <p className="reference">Rujukan alur layout <a href={sources.pcb}>dokumentasi PCB Editor KiCad</a>.</p>
    </div></section>
    <section className="section frame">
      <Chapter id="04" label="Pemasangan komponen" />
      <div className="section-heading"><h2>Di atas dan <em>menembus papan.</em></h2><p className="lead">Saya menggunakan penyolderan SMD dan THT sesuai jenis komponen dan kebutuhan perakitan.</p></div>
      <Explorer label="Pilih jenis pemasangan" className="component-explorer" views={[
        {label:"SMD",title:"Sambungan di permukaan",text:"Terminasi komponen bertemu pad di permukaan PCB. Saat menyolder, saya memeriksa posisi, pembasahan timah, dan kemungkinan jembatan antar-pad.",art:<Render name="smd" alt="Resistor SMD dengan terminasi logam di kedua ujung"/>},
        {label:"THT",title:"Kaki melewati lubang",text:"Kaki komponen masuk melalui lubang PCB. Setelah menyolder, saya memeriksa apakah sambungannya terbentuk dengan baik dan kaki terpotong rapi.",art:<Render name="r" alt="Resistor through-hole dengan kaki kawat di kedua ujung"/>},
      ]} />
    </section>
    <section className="section paper">
      <div className="frame">
        <Chapter id="05" label="Dari desain ke diagnosis" />
        <div className="work-list">
          <article><h3>Desain PCB</h3><p>Menata komponen dan menentukan jalur sesuai koneksi, ruang, dan kebutuhan perakitan.</p></article>
          <article><h3>Perakitan PCB</h3><p>Memasang komponen, mengecek orientasi dan polaritas, lalu memeriksa sambungan sebelum memberi daya.</p></article>
          <article><h3>Troubleshooting</h3><p>Melacak sambungan putus, hubungan pendek, atau pemasangan yang keliru.</p></article>
          <article><h3>Diagnosis perangkat</h3><p>Membandingkan tegangan serta sinyal yang terukur dengan perilaku yang diharapkan.</p></article>
        </div>
      </div>
    </section>
    <section className="section frame" id="mikrokontroler">
      <div className="feature-grid">
        <Scene art={<Render name="mcu" alt="IC mikrokontroler dengan kontak mengelilingi kemasan"/>} label="Paket mikrokontroler" className="mcu-scene" />
        <div className="feature-copy"><h2>Di tempat kode <em>bertemu pin.</em></h2><p className="lead">Mikrokontroler menghubungkan firmware dengan perangkat melalui periferal seperti GPIO dan timer. Fungsi tiap pin bergantung pada konfigurasi dan chip yang dipakai.</p><details className="hotspot"><summary>GPIO</summary><p>Pin digital yang bisa dibaca sebagai masukan atau dikendalikan sebagai keluaran.</p></details><details className="hotspot"><summary>Timer dan bus</summary><p>Timer menangani pengukuran atau penjadwalan yang bergantung waktu. Bus menghubungkan CPU dengan periferal atau perangkat lain.</p></details></div>
      </div>
    </section>
    <NextChapter href="/lab" title="Amati perilaku rangkaian virtual.">Masuk ke laboratorium</NextChapter>
  </>;
}
