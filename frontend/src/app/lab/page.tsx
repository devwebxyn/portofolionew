import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Essay, Index, Note } from "@/components/exhibition/Editorial";
import { LazyExhibit } from "@/components/exhibition/LazyExhibit";
import { SignalDiagram } from "@/components/exhibition/Diagrams";
import { pageMetadata } from "@/lib/site";

export const metadata=pageMetadata("/lab","Laboratorium interaktif","Sepuluh simulasi edukatif: DC, RC, induktor, transformator, penyearahan, sakelar, proteksi, dan gerbang logika.");

export default function Laboratory(){
 return <>
  <section className="world-hero lab-hero"><div className="frame page-top"><Chapter id="LAB" label="Laboratorium elektronika"/>
    <div className="world-split"><header className="world-title entrance"><h1><span>Ubah kondisi.</span><em>Amati respons.</em></h1><p className="lead">Geser tegangan, ubah lilitan, atau picu gangguan virtual. Setiap meja menyorot satu hubungan antara parameter, sinyal, dan hasil yang bisa diamati.</p></header>
    <Scene art={<SignalDiagram labels={["VIRTUAL","KELUARAN"]} pattern="analog-edge"/>} label="Sinyal masuk dan respons" /></div>
    <Index items={[["simulasi","Meja simulasi"],["membaca","Cara membaca model"]]}/>
  </div></section>
  <section id="simulasi" className="frame section lab-section"><Chapter id="01" label="Sepuluh meja simulasi"/><LazyExhibit kind="lab"/></section>
  <Essay id="membaca" number="02" title="Membaca asumsi" tone="paper"><h2>Di balik <em>angka hasil.</em></h2>
    <div><p>Saya biasa memulai dari satu pertanyaan yang bisa diperiksa. Ketika resistansi digandakan sementara sumber tetap, apakah arus menjadi setengah? Ketika kapasitansi naik, apakah waktu untuk mencapai pecahan tegangan yang sama ikut bertambah? Model sederhana membantu menyusun dugaan sebelum membaca perilaku perangkat yang lebih kompleks.</p><p>Di meja ini, saya pisahkan model perhitungan ideal dari skenario kendali. Arus DC dan respons RC dihitung dengan persamaan. Proteksi kanal P serta eFuse ditampilkan sebagai perubahan keadaan. Warna dan laju aliran adalah petunjuk visual. Nilai tidak mewakili rating, suhu kerja, batas keselamatan, atau hasil pengukuran fisik.</p>
    <Note label="Bagaimana menguji dugaan lewat simulasi?"><p>Catat kondisi awal, ubah satu parameter, lalu bandingkan hasil. Saat perilaku berubah karena sebuah ambang, coba nilai di kedua sisi ambang. Pada gerbang logika, cocokkan masukan aktif dengan baris pada tabel kebenaran.</p></Note>
    <Note label="Apa arti isolasi pada sakelar kanal P?"><p>Kanal yang mati menghambat arus maju pada orientasi yang ditunjukkan. Body diode memberi jalur pada arah dan kondisi tertentu. Model memakai deteksi serta kontrol terpisah, dan menyederhanakan dinamika fault, waktu respons, serta pemulihan.</p></Note></div>
  </Essay>
  <NextChapter href="/electronics" title="Kenali bentuk komponen di meja kerja.">Lihat galeri elektronika</NextChapter>
 </>;
}
