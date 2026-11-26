import { ArrowDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { Action, TextLink } from "@/components/Editorial";
import { ProjectShowcase, ProjectSkeleton } from "@/components/ProjectShowcase";
import { Abstraction, Connection, Logic, Memory, Registers, Stack } from "@/components/bare/Computing";
import { Chapter, Scene } from "@/components/bare/Exhibit";
import { Board, Processor } from "@/components/bare/Hardware";
import { ProcessorStage } from "@/components/bare/SceneControls";

const languages = [
  { name: "Rust", keyword: "Kepemilikan data", art: <Memory mode="rust" />, text: "Sebuah nilai bisa berpindah pemilik. Aturan ownership memberi cara untuk menjaga keamanan memori tanpa garbage collector." },
  { name: "C", keyword: "Alamat & pointer", art: <Memory mode="c" />, text: "Pointer menyimpan alamat. Lewat alamat itu, program dapat mengakses data dan melihat bagaimana byte tersusun dalam memori." },
  { name: "C++", keyword: "Abstraksi native", art: <Abstraction />, text: "Sebuah antarmuka dapat menyembunyikan cara data disimpan sambil tetap memberi kendali atas masa hidup objek dan sumber daya." },
  { name: "Assembly", keyword: "Instruksi & register", art: <Registers result />, text: "Setiap instruksi bekerja pada keadaan mesin. Contoh ini menambah satu pada nilai di register AX." },
  { name: "Verilog", keyword: "Hardware description language", art: <Logic />, text: "Verilog mendeskripsikan perangkat keras digital. Gerbang AND menghasilkan satu saat kedua masukannya bernilai satu." },
];

export default function Home() {
  return <>
    <section className="opening">
      <div className="frame opening-inner">
        <div className="opening-copy">
          <p className="eyebrow"><span className="status-dot" /> Samuel Indra Bastian</p>
          <h1><span><b>Komputasi</b></span><span><b>hingga ke</b></span><span><b><em>lapisan dasar.</em></b></span></h1>
          <p className="opening-role">Penggemar pemrograman low-level &amp; sistem Linux</p>
          <p className="lead">Saya mempelajari bagaimana kode menjadi instruksi, bagaimana Linux menjalankannya, dan bagaimana rangkaian membuatnya bekerja.</p>
          <div className="opening-actions"><Action href="/systems">Jelajahi sistem</Action><Link className="text-link opening-scroll" href="#lapisan"><ArrowDown size={16} aria-hidden /> Lihat lapisan</Link></div>
        </div>
        <ProcessorStage><Processor /></ProcessorStage>
      </div>
      <div className="frame opening-index"><span>PERANGKAT LUNAK <i /> PERANGKAT KERAS</span><span>01—05 / EKSPLORASI</span></div>
    </section>

    <section className="section frame" id="lapisan">
      <Chapter id="01" label="Lapisan komputasi" />
      <div className="feature-grid stack-feature">
        <div className="feature-copy"><h2>Apa yang terjadi <em>setelah klik?</em></h2><p className="lead">Sebuah aksi di aplikasi bisa melintasi runtime, userspace, dan kernel sebelum mencapai perangkat keras. Setiap lapisan punya tanggung jawabnya sendiri.</p><TextLink href="/systems">Telusuri arsitektur Linux</TextLink></div>
        <Scene art={<Stack />} label="Aplikasi → Perangkat keras" className="stack-scene" />
      </div>
    </section>
    <section className="section language-section">
      <div className="frame">
        <Chapter id="02" label="Bahasa & logika" />
        <div className="section-heading"><h2>Lima cara membaca <em>mesin.</em></h2><p className="lead">Bahasa yang saya pelajari memberi cara berbeda untuk menelusuri data, instruksi, dan logika digital.</p></div>
        <div className="language-grid">
          {languages.map(({name, keyword, art, text}, i) => <article className={`language language-${i}`} data-scene key={name}>
            <div className="language-art">{art}</div>
            <div className="language-copy"><p className="eyebrow">{keyword}</p><h3>{name}</h3><p>{text}</p></div>
          </article>)}
        </div>
      </div>
    </section>
    <section className="section frame">
      <Chapter id="03" label="Arsip proyek" />
      <div className="section-heading"><h2>Eksperimen <em>yang terbit.</em></h2><TextLink href="/projects">Lihat arsip proyek</TextLink></div>
      <Suspense fallback={<ProjectSkeleton compact />}><ProjectShowcase preview /></Suspense>
    </section>
    <section className="section board-band">
      <div className="frame">
        <Chapter id="04" label="Meja kerja elektronika" />
        <div className="feature-grid reverse-feature">
          <Scene art={<Board />} label="Substrat / tembaga / komponen" className="board-scene" />
          <div className="feature-copy"><h2>Ketika sinyal <em>menjadi fisik.</em></h2><p className="lead">Dari desain PCB hingga penyolderan SMD dan THT, saya mengikuti jalur sinyal dan memeriksa sambungan yang membuat rangkaian bekerja.</p><TextLink href="/electronics">Masuk ke meja kerja</TextLink></div>
        </div>
      </div>
    </section>
    <section className="section frame">
      <Chapter id="05" label="Perjalanan" />
      <div className="journey-preview" data-scene><p className="date-display"><span>Juli</span> 2024</p><div><h2>Bermula dari <em>sebuah pertanyaan.</em></h2><p className="lead">Saya mulai membangun perangkat lunak bersama AI pada Juli 2024. Dari sana, saya semakin ingin memahami sistem yang memberi instruksi itu tempat untuk bekerja.</p><TextLink href="/journey">Baca perjalanan</TextLink></div></div>
    </section>
    <section className="closing" data-scene>
      <div className="frame"><Connection /><h2>Kode. Sistem. <em>Silikon.</em></h2><div><Link className="action action-solid" href="/about">Tentang saya <ArrowUpRight size={17} aria-hidden /></Link><Action href="/contact" outline>Hubungi saya</Action></div></div>
    </section>
  </>;
}
