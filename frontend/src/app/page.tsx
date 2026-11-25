import { Suspense } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, CircuitBoard, Cpu, Sparkles } from "lucide-react";
import { Action, TextLink } from "@/components/Editorial";
import { HeroProjectLink, HeroStage } from "@/components/HeroStage";
import { ProjectShowcase, ProjectSkeleton } from "@/components/ProjectShowcase";
import { Workbench } from "@/components/Visuals";

const areas = [
  { href: "/ai", name: "Bersama AI", text: "Dari pertanyaan pertama sampai menguji hasil buatan agen AI.", Icon: Sparkles },
  { href: "/electronics", name: "Elektronika", text: "Merancang PCB, menyolder SMD dan THT, lalu mencari sumber masalah pada rangkaian.", Icon: CircuitBoard },
  { href: "/systems", name: "Eksplorasi sistem", text: "Mempelajari apa yang terjadi di balik program, dari Linux hingga mikrokontroler.", Icon: Cpu },
];

export default function Home() {
  return <>
    <section className="hero">
      <div className="frame">
        <div className="hero-overline"><span><i /> Laboratorium digital pribadi</span><span>AI / Sistem / Elektronika</span></div>
        <div className="hero-grid">
          <div className="hero-copy entrance">
            <p className="hero-date">Sejak Juli 2024</p>
            <h1>Saya seorang <em>Vibe Coder.</em></h1>
            <p className="hero-subtitle">Membangun dengan AI sejak Juli 2024.</p>
            <p className="lead">Saya Samuel Indra Bastian. Saya mulai membuat perangkat lunak bersama AI sebelum istilah <i>vibe coding</i> dikenal luas. Hari ini rasa ingin tahu itu membawa saya dari kode ke sistem komputer dan meja solder.</p>
            <div className="actions"><HeroProjectLink /><Action href="/about" outline>Tentang saya</Action></div>
          </div>
          <HeroStage><Workbench /></HeroStage>
        </div>
        <a href="#eksplorasi" className="hero-bottom"><ArrowDown size={15} aria-hidden /> Lihat isi laboratorium</a>
      </div>
    </section>
    <section className="paper section" id="eksplorasi">
      <div className="frame">
        <div className="section-heading">
          <p className="eyebrow">Yang saya kerjakan dan pelajari</p>
          <h2>Dari baris kode <br />ke <em>jalur PCB.</em></h2>
        </div>
        <div className="areas reveal">
          {areas.map(({ href, name, text, Icon }) => <Link href={href} key={href} className="area">
            <Icon size={30} strokeWidth={1.5} aria-hidden /><h3>{name}</h3><p>{text}</p><ArrowUpRight size={21} aria-hidden />
          </Link>)}
        </div>
      </div>
    </section>
    <section className="frame section">
      <div className="section-heading heading-with-link">
        <div><p className="eyebrow">Arsip laboratorium</p><h2>Proyek <em>terbaru.</em></h2></div>
        <TextLink href="/projects">Lihat semua proyek</TextLink>
      </div>
      <Suspense fallback={<ProjectSkeleton compact />}><ProjectShowcase preview /></Suspense>
    </section>
    <section className="journey-callout">
      <div className="frame section journey-callout-inner">
        <p className="journey-year" aria-hidden="true">07<span>/</span>24</p>
        <div><p className="eyebrow">Titik awal</p><h2>Berawal dari <em>rasa ingin tahu.</em></h2><p className="lead">Pada Juli 2024 saya mulai membangun bersama AI. Dari sana muncul pertanyaan baru tentang cara perangkat lunak dan perangkat keras bekerja bersama.</p><TextLink href="/journey">Ikuti perjalanan saya</TextLink></div>
      </div>
    </section>
  </>;
}
