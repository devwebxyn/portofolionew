import { Chapter, NextChapter } from "@/components/bare/Exhibit";
import { Workflow } from "@/components/exhibition/Workflow";
import { Explorer } from "@/components/bare/SceneControls";
import { Essay, Index, Note } from "@/components/exhibition/Editorial";
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
      <Index items={[["praktik-ai","Praktik pengembangan"],["verifikasi-ai","Menguji hasil"],["batas-ai","Batas dan arah"]]}/>
      <p className="workflow-intro">Ikuti satu contoh dari awal hingga akhir: cara arsip merespons saat API proyek mengembalikan HTTP 503.</p>
      <Explorer label="Pilih langkah kerja" className="workflow-explorer" views={steps.map(([label,title,text],i)=>({label,title,text,art:<Workflow active={i} />}))} />
    </section>
    <Essay id="praktik-ai" number="01" title="Praktik pengembangan" tone="paper">
      <h2>Dari percakapan <em>ke perubahan.</em></h2>
      <div><p>Saya mulai memakai AI sebagai alat utama pengembangan perangkat lunak pada Juli 2024, sebelum istilah vibe coding diperkenalkan dan dikenal luas. Cara ini membuka jalan untuk mencoba ide, membaca penjelasan alternatif, dan membuat bentuk awal sebuah sistem. Percakapan yang berguna bagi saya biasanya berawal dari masalah yang bisa dinyatakan dengan jelas.</p><p>Saat memberi arahan, saya menyebutkan keadaan saat ini, perilaku yang diinginkan, dan hal yang harus tetap bekerja. Saya membatasi perubahan agar bisa menelusuri dampaknya. Hasil yang besar perlu dipecah menjadi bagian yang bisa dibaca serta diperiksa melalui tindakan nyata.</p><p>Untuk mempelajari topik baru, saya memakai AI untuk membuat pertanyaan atau contoh kecil. Ketika topiknya teknis, saya kembali ke dokumentasi dan menguji contoh. Asumsi mengenai runtime, perangkat, dan versi dapat mengubah perilaku meskipun kodenya terlihat masuk akal.</p></div>
    </Essay>
    <Essay id="verifikasi-ai" number="02" title="Menguji hasil">
      <h2>Memeriksa <em>jalur yang gagal.</em></h2>
      <div><p>Saya memeriksa hasil dengan contoh biasa dan kondisi yang sengaja dibuat gagal. Untuk arsip proyek, itu berarti menanyakan apa yang terjadi ketika koneksi putus, daftar kosong, atau ID sudah tidak ada. Untuk diagram, itu berarti memastikan label, nilai, dan perpindahan keadaan sesuai dengan model yang diterangkan.</p><p>Umpan balik yang bisa ditelusuri menghasilkan instruksi lanjutan yang lebih jelas. Ketika kesalahan muncul, saya memilih satu skenario, mencatat perilaku yang terlihat, dan membandingkannya dengan harapan. Setelah perbaikan, saya kembali ke skenario semula agar perubahan bisa dinilai.</p><Note label="Apa yang saya cari ketika membaca perubahan?"><p>Periksa sumber data, keadaan gagal, jalur pemanggilan, dan contoh yang bisa dijalankan ulang. Hasil tes memberi bukti untuk kondisi yang diuji, dengan batas sesuai skenario dan lingkungan.</p></Note></div>
    </Essay>
    <Essay id="batas-ai" number="03" title="Batas dan arah">
      <h2>Keputusan tetap <em>punya alasan.</em></h2>
      <div><p>AI memberi banyak pilihan. Saya menentukan tujuan, memutuskan bagian yang perlu ditelusuri, dan menilai apakah hasil sesuai kebutuhan. Dalam eksplorasi perangkat keras, saya membedakan simulasi konseptual dengan desain yang sudah diukur; dalam software, saya membedakan contoh yang berjalan dengan perilaku yang sudah diverifikasi pada kondisi nyata.</p><p>Cara kerja ini terus berubah seiring pertanyaan saya. Tujuannya agar sebuah keputusan bisa diterangkan dengan hasil yang bisa dilihat, dan agar proyek berikutnya dimulai dari pemahaman yang sedikit lebih baik.</p></div>
    </Essay>
    <NextChapter href="/projects" title="Dari metode ke hasil.">Lihat arsip proyek</NextChapter>
  </>;
}
