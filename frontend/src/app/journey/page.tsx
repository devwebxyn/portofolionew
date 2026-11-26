import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Wafer } from "@/components/bare/Hardware";
import { Essay, Index, Note } from "@/components/exhibition/Editorial";
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
      <Index items={[["linimasa","Linimasa"],["pergeseran","Pergeseran pertanyaan"],["arah","Arah belajar"]]}/>
    </section>
    <section className="frame journey-content" id="linimasa">
      <ol className="timeline" aria-label="Linimasa perjalanan">
        {milestones.map(({label,title,text},i)=><li key={label} data-scene>
          <div className="timeline-dot" /><span className="eyebrow">{i === 0 ? <time dateTime="2024-07">{label}</time> : label}</span><div><h2>{title}</h2><p>{text}</p></div>
        </li>)}
      </ol>
      <Scene art={<Wafer />} label="Dari aplikasi ke silikon" className="journey-wafer" />
    </section>
    <Essay id="pergeseran" number="01" title="Pergeseran pertanyaan" tone="paper">
      <h2>Dari bisa berjalan <em>ke bisa dijelaskan.</em></h2>
      <div><p>Ketika mulai bersama AI pada Juli 2024, saya bisa membawa pertanyaan langsung ke bentuk yang dapat dicoba. Saya belajar membuat batas yang jelas: apa yang seharusnya dilakukan aplikasi, perubahan mana yang sedang diuji, dan apa yang terjadi ketika data atau koneksi tak tersedia. Dari situ saya mulai lebih memperhatikan penjelasan di balik hasil.</p><p>Sebuah proyek membantu ketika ia memperlihatkan keputusan yang sebelumnya tersembunyi. Permintaan berkas mengundang pertanyaan tentang sistem operasi. Data yang salah tempat memunculkan pertanyaan tentang pointer dan format penyimpanan. Dari kejadian kecil itu, arsitektur komputer berubah dari istilah menjadi rangkaian pertanyaan yang bisa saya ikuti.</p><p>Praktik elektronika di Teknik Elektronika Industri memberi cara lain untuk melihat hal serupa. Ketika rangkaian tidak bekerja, saya melacak sambungan dan mengukur apa yang bisa diukur. Saya ingin membawa kebiasaan itu saat membaca kode: periksa sinyal atau keluaran yang benar-benar ada, lalu persempit dugaan.</p></div>
    </Essay>
    <Essay id="arah" number="02" title="Arah belajar">
      <h2>Satu jalur, <em>banyak skala.</em></h2>
      <div><p>Saya sedang menghubungkan pengalaman merakit dengan konsep firmware, kernel, dan logika digital. Di mikrokontroler, saya bisa menanyakan bagian program yang membaca input dan kapan keluarannya berubah. Di Linux, pertanyaan itu punya lapisan tambahan: driver, scheduler, memori virtual, serta program yang menunggu hasil.</p><p>Semikonduktor memperpanjang jalur itu sampai ke material dan bentuk chip. GPU computing menambah pertanyaan tentang bagaimana data dan pekerjaan dibagi. Saya memberi tempat bagi setiap topik sebagai fokus eksplorasi. Saya ingin bisa menunjukkan hubungan yang saya pahami, dan menjelaskan batas model yang saya pakai.</p><p>Saat berpindah topik, saya mencoba menyimpan satu pertanyaan penghubung. Bagaimana logika menyimpan keadaan? Di mana keadaan itu terlihat saat program dihentikan? Apa yang bertahan setelah daya dimatikan? Pertanyaan tentang keadaan menghubungkan flip-flop, register, RAM, penyimpanan, dan proses boot. Jalur seperti ini memberi cara untuk kembali ke konsep yang sudah saya pelajari dari sudut yang berbeda.</p><Note label="Bagaimana saya memilih topik berikutnya?"><p>Saya mencari pertanyaan yang bisa dilacak melalui contoh kecil. Ketika contoh itu dapat diterangkan, saya bandingkan dengan dokumentasi, kemudian periksa asumsi yang tidak lagi berlaku saat skala atau perangkat berubah.</p></Note></div>
    </Essay>
    <NextChapter href="/ai" title="Cara kerja yang terus saya asah.">Lihat metode bersama AI</NextChapter>
  </>;
}
