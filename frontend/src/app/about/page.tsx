import { PageIntro, TextLink } from "@/components/Editorial";
import { Workbench } from "@/components/Visuals";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/about", "Tentang saya", "Kenali Samuel Indra Bastian, Vibe Coder sejak Juli 2024 dan pelajar elektronika industri.");

export default function About() {
  return <>
    <PageIntro label="Tentang saya" title={<>Halo, saya <em>Samuel.</em></>} art={<Workbench pose="about" />}>
      Saya Samuel Indra Bastian, Vibe Coder, penggemar teknologi, dan pelajar elektronika industri. Saya senang membongkar cara kerja sesuatu, baik di layar maupun di meja solder.
    </PageIntro>
    <section className="paper section">
      <div className="frame editorial">
        <div className="editorial-aside"><p className="eyebrow">Sejak Juli 2024</p><p className="editorial-note">Satu ide, banyak <em>eksperimen.</em></p></div>
        <div className="prose">
          <h2>Berkenalan dengan cara baru untuk membangun</h2>
          <p>Pada Juli 2024 saya mulai memakai AI untuk membuat perangkat lunak. Istilah <i>vibe coding</i> belum dikenal luas saat itu. Yang membuat saya terus mencoba adalah kesempatan untuk membawa sebuah ide sampai bisa dijalankan, lalu mengamati hasilnya sendiri.</p>
          <p>Sebutan Vibe Coder terasa pas karena AI menjadi pendamping utama saya dalam mengembangkan perangkat lunak. Saya menentukan arah, memberi konteks kepada agen, menguji hasilnya, dan memutuskan apa yang perlu diperbaiki.</p>
          <TextLink href="/journey">Lihat bagaimana perjalanan itu dimulai</TextLink>
        </div>
      </div>
    </section>
    <section className="frame section editorial">
      <div className="editorial-aside"><p className="eyebrow">Di luar layar</p><p className="editorial-note">Dari kode ke <em>rangkaian.</em></p></div>
      <div className="prose">
        <h2>Belajar lewat hal yang bisa saya coba</h2>
        <p>Di elektronika industri, saya merancang dan merakit PCB, menyolder komponen SMD dan THT, serta mencari sumber gangguan pada rangkaian. Papan yang tidak berfungsi memberi saya sesuatu yang konkret untuk diperiksa.</p>
        <p>Rasa ingin tahu yang sama membawa saya ke Linux, sistem operasi, pemrograman low-level, mikrokontroler, dan otomasi pengembangan. Saya ingin memahami apa yang terjadi setelah sebuah program dijalankan dan bagaimana ia memakai sumber daya komputer.</p>
        <TextLink href="/electronics">Lihat meja kerja elektronika</TextLink>
      </div>
    </section>
    <section className="lilac section">
      <div className="frame editorial">
        <div className="editorial-aside"><p className="eyebrow">Cara saya belajar</p><p className="editorial-note">Coba, amati, <em>ulangi.</em></p></div>
        <div className="prose">
          <h2>Terbuka tentang prosesnya</h2>
          <p>Sebagian besar implementasi perangkat lunak dalam proyek saya dikerjakan dengan bantuan AI. Bagian saya adalah mengarahkan pekerjaan, mencoba hasilnya, mengevaluasi keputusan, dan belajar dari proses tersebut.</p>
          <p>Saat suatu teknologi muncul di arsip proyek, itu berarti teknologi tersebut dipakai di sana. Hal yang sedang saya pelajari dan pekerjaan yang saya lakukan sendiri punya tempatnya masing-masing di situs ini.</p>
          <TextLink href="/ai">Kenali cara saya bekerja bersama AI</TextLink>
        </div>
      </div>
    </section>
  </>;
}
