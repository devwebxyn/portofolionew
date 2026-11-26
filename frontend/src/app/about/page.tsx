import { TextLink } from "@/components/Editorial";
import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Render } from "@/components/exhibition/Render";
import { Connection } from "@/components/bare/Computing";
import { Essay, Index, Note } from "@/components/exhibition/Editorial";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/about", "Tentang saya", "Samuel Indra Bastian, pelajar Teknik Elektronika Industri di SMK PGRI 3 Malang dan penggemar pemrograman low-level serta sistem Linux.");

export default function About() {
  return <>
    <section className="frame page-top about-top">
      <Chapter id="PROFIL" label="Samuel Indra Bastian" />
      <div className="about-composition">
        <header className="entrance"><h1>Di balik<br /> <em>rasa ingin tahu.</em></h1><p className="lead">Saya Samuel Indra Bastian, pelajar berusia 18 tahun di SMK PGRI 3 Malang, jurusan Teknik Elektronika Industri. Saya tertarik pada pemrograman low-level dan sistem Linux, terutama ketika kode dapat ditelusuri sampai ke perangkat yang menjalankannya.</p></header>
        <Scene art={<Render name="wafer" alt="Wafer silikon dengan pola die berulang"/>} label="Permukaan silikon" className="wafer-scene" />
      </div>
      <Index items={[["pengalaman","Pengalaman elektronika"],["fokus","Yang saya dalami"],["cara-kerja","Cara belajar"]]}/>
    </section>
    <Essay id="pengalaman" number="01" title="Pengalaman elektronika" tone="paper">
      <h2>Belajar dari <em>papan yang nyata.</em></h2>
      <div><p>Di meja elektronika, sebuah sambungan bisa mengubah perilaku seluruh rangkaian. Pengalaman menyolder komponen SMD dan THT mengajari saya membaca penanda orientasi, memeriksa pad, dan memperhatikan bagaimana pemasangan memengaruhi hasil. Saat mendesain dan merakit PCB, saya harus memikirkan hubungan antara skematik, footprint, jalur sinyal, susunan komponen, dan ruang yang tersedia.</p><p>Bagian yang paling menarik bagi saya adalah diagnosis. Ketika rangkaian belum merespons, saya mencoba memisahkan hal yang sudah terukur dari dugaan. Saya melihat jalur daya, sambungan, dan titik tempat sinyal seharusnya muncul. Pemeriksaan seperti itu membantu saya menentukan langkah berikutnya dengan alasan yang bisa dijelaskan.</p><p>Itu adalah pengalaman praktis yang saya bawa dari elektronika. Pengalaman tersebut juga memengaruhi cara saya membaca perangkat lunak. Jika program gagal, saya ingin tahu lapisan yang pertama kali menyimpang dari perilaku yang diharapkan dan bagaimana cara membuktikannya.</p><TextLink href="/electronics">Lihat pengalaman elektronika saya</TextLink></div>
    </Essay>
    <Essay id="fokus" number="02" title="Fokus eksplorasi">
      <h2>Menelusuri <em>jalur instruksi.</em></h2>
      <div><p>Saya sedang memperdalam sistem Linux, fondasi kernel, systems engineering, dan arsitektur komputer. Pertanyaan sederhana, seperti mengapa proses tak langsung melihat alamat fisik, membawa saya ke page table, CPU, dan kebijakan kernel. Pertanyaan seperti bagaimana sensor memberi tahu CPU membawa saya ke firmware, periferal, interrupt, dan driver.</p><p>Rust membuat saya memperhatikan kepemilikan nilai. C memberi pandangan langsung tentang pointer dan representasi data. C++ mempertemukan abstraksi dengan keputusan tentang sumber daya. Assembly membantu saya membaca perubahan keadaan mesin. Verilog memperkenalkan cara mendeskripsikan perangkat keras, termasuk logika yang bekerja serentak dan keadaan yang tersimpan di register.</p><p>Ketertarikan saya juga bergerak ke dua arah. Di satu sisi ada logika digital, teknologi semikonduktor, dan cara sebuah chip dibuat. Di sisi lain ada GPU computing dan AI, tempat throughput, hierarki memori, dan susunan kerja menentukan cara model berjalan. Bidang-bidang ini menjadi ruang belajar yang terus berkembang.</p><p>Saya suka berpindah skala agar sebuah konsep tidak berhenti sebagai hafalan. Saya bisa mulai dari satu gerbang logika, melihat bagaimana register dibangun, lalu bertanya apa yang dilakukan instruksi ketika register berganti nilai. Ketika kembali ke papan, saya dapat mencari jalur sinyal yang berperan pada perubahan tersebut. Hubungan semacam itu membuat pertanyaan berikutnya lebih spesifik.</p><Note label="Apa yang menghubungkan semua topik itu?"><p>Saya mencari hubungan yang bisa dijelaskan dari satu lapisan ke lapisan berikutnya. Kode berinteraksi dengan runtime dan sistem operasi. Driver serta firmware berinteraksi dengan perangkat. Di bawahnya, instruksi dan sinyal bergantung pada rangkaian fisik.</p></Note></div>
    </Essay>
    <section className="frame section" id="cara-kerja">
      <div className="feature-grid">
        <Scene art={<Connection />} label="Dari ide menuju sinyal" />
        <div className="feature-copy"><h2>Membangun sambil <em>memahami.</em></h2><p className="lead">Sejak Juli 2024, sebelum istilah vibe coding dikenal luas, AI menjadi alat utama saya untuk mengembangkan perangkat lunak dan mengeksplorasi teknologi. Saya memakai percakapan untuk menyusun pendekatan, lalu membaca perubahan dan menguji hasilnya.</p><p className="reference">Yang ingin saya bawa ke proyek selanjutnya adalah kebiasaan bertanya sampai hubungan antara software, firmware, sistem operasi, prosesor, serta logika digital dapat saya jelaskan dengan contoh yang konkret.</p><TextLink href="/ai">Cara saya bekerja bersama AI</TextLink></div>
      </div>
    </section>
    <NextChapter href="/journey" title="Awal perjalanan saya.">Baca linimasa</NextChapter>
  </>;
}
