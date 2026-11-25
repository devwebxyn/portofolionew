import { PageIntro, TextLink } from "@/components/Editorial";
import { Workbench } from "@/components/Visuals";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/journey", "Perjalanan", "Catatan perjalanan Samuel Indra Bastian sejak mulai membangun perangkat lunak bersama AI pada Juli 2024.");

const chapters = [
  { id: "mulai", period: "Juli 2024", title: "Mulai membangun bersama AI", text: "Saya mulai memakai AI untuk mengubah ide menjadi perangkat lunak yang bisa dicoba. Saat itu istilah vibe coding belum dikenal luas. Percobaan itu menjadi awal cara saya berkarya hari ini.", href: "/ai", link: "Cara saya bekerja bersama AI" },
  { id: "menjelajah", period: "Setelah itu", title: "Belajar lewat proyek", text: "Saya mulai mengeksplorasi lebih banyak hal melalui proyek. Setiap percobaan memberi alasan untuk menelusuri cara fitur bekerja, meminta penjelasan dari AI, lalu memeriksa sendiri hasilnya.", href: "/projects", link: "Buka arsip proyek" },
  { id: "memperluas", period: "Eksplorasi berlanjut", title: "Turun ke lapisan yang lebih dekat ke perangkat keras", text: "Minat saya meluas dari perangkat lunak ke Linux, sistem operasi, pemrograman low-level, dan embedded systems. Praktik elektronika memberi saya cara lain untuk memahami bentuk fisik sebuah sistem.", href: "/electronics", link: "Lihat sisi elektronika" },
  { id: "sekarang", period: "Sekarang", title: "Menghubungkan hal-hal yang saya pelajari", text: "Saya terus membuat proyek bersama AI sambil mempelajari arsitektur komputer dan mengasah praktik perakitan serta diagnosis rangkaian. Saya ingin semakin paham hubungan antara program, sistem, dan komponen yang menjalankannya.", href: "/systems", link: "Lihat eksplorasi sistem" },
];

export default function Journey() {
  return <>
    <PageIntro label="Perjalanan" title={<>Semuanya berawal <em>Juli 2024.</em></>} art={<Workbench pose="journey" />}>
      Dari percobaan pertama bersama AI hingga pertanyaan tentang apa yang terjadi di balik perangkat lunak.
    </PageIntro>
    <div className="frame section journey-layout">
      <nav aria-label="Bagian perjalanan" className="journey-nav"><p className="eyebrow">Di halaman ini</p>
        <ol>{chapters.map(({ id, period }) => <li key={id}><a href={`#${id}`}>{period}</a></li>)}</ol>
      </nav>
      <ol className="timeline">
        {chapters.map(({ id, period, title, text, href, link }) => <li id={id} key={id}>
          <article className="reveal"><p className="eyebrow">{period}</p><h2>{title}</h2><p className="lead">{text}</p><TextLink href={href}>{link}</TextLink></article>
        </li>)}
      </ol>
    </div>
  </>;
}
