import { Chapter, NextChapter, Scene } from "@/components/bare/Exhibit";
import { Essay, Index, Note, sources } from "@/components/exhibition/Editorial";
import { CudaScene } from "@/components/exhibition/CudaScene";
import { Workload } from "@/components/exhibition/InteractiveBoards";
import { Render } from "@/components/exhibition/Render";
import { ModelFlow } from "@/components/exhibition/ModelFlow";
import { Sequence, type Step } from "@/components/exhibition/Sequence";
import { pageMetadata } from "@/lib/site";
import type { CSSProperties } from "react";

export const metadata=pageMetadata("/computing","GPU computing, CUDA dan AI","Arsitektur GPU, pekerjaan paralel, model CUDA, hierarki memori, dan alur pengembangan AI.");

function TensorArt() {
  return <div className="tensor-art" aria-hidden="true">
    {[0,1,2].map(g=><div className="tensor-sheet" key={g} style={{"--n":g} as CSSProperties}>{Array.from({length:16},(_,i)=><i key={i} style={{"--n":i} as CSSProperties}>{(i*7+g*11)%13}</i>)}</div>)}
    <p>MATRIKS A × MATRIKS B → C</p>
  </div>;
}
const pipeline:Step[]=[
  {label:"Data",text:"Kumpulkan data sesuai tujuan. Periksa sumber, izin penggunaan, distribusi contoh, dan definisi label sebelum membuat keputusan model.",art:<ModelFlow stage={0}/>},
  {label:"Preprocessing",text:"Data diubah menjadi representasi numerik dan dibagi dengan cara yang mengurangi kebocoran antarset. Tensor menyimpan nilai dan bentuk multidimensi.",art:<ModelFlow stage={1}/>},
  {label:"Model",text:"Arsitektur menentukan operasi dan parameter yang terhubung. Perkalian matriks adalah contoh operasi umum yang bisa memanfaatkan banyak unit komputasi.",art:<ModelFlow stage={2}/>},
  {label:"Training",text:"Prediksi dibandingkan dengan target melalui fungsi loss. Gradien membantu memperbarui parameter. Memori sering juga menyimpan aktivasi dan keadaan optimizer.",art:<ModelFlow stage={3}/>},
  {label:"Evaluasi",text:"Ukur perilaku pada data yang disisihkan. Periksa pola kegagalan dan kecocokan metrik dengan tugas, termasuk contoh yang kurang terwakili.",art:<ModelFlow stage={4}/>},
  {label:"Inferensi",text:"Model menggunakan parameter yang sudah ditetapkan untuk menghasilkan keluaran baru. Latensi, throughput, memori, serta perpindahan data dapat membatasi pengalaman pengguna.",art:<ModelFlow stage={5}/>},
];

export default function Computing(){
  return <>
    <section className="world-hero gpu-hero"><div className="frame page-top">
      <Chapter id="KOMPUTASI" label="GPU, CUDA, dan kecerdasan buatan"/>
      <header className="world-title entrance"><h1>Bekerja <em>secara paralel.</em></h1><p className="lead">Ketika banyak elemen menjalani operasi serupa, cara membagi kerja dan memindahkan data menjadi sama pentingnya dengan operasi itu sendiri.</p></header>
      <Render name="gpu" alt="Ilustrasi kartu grafis dengan dua kipas dan sirip pendingin" priority/>
      <Index items={[["beban","Pembagian pekerjaan"],["cuda","Model CUDA"],["model-ai","Jalur model AI"]]}/>
    </div></section>
    <Essay id="beban" number="01" title="Latensi dan throughput">
      <h2>Satu pekerjaan, <em>banyak unit.</em></h2>
      <div><p>CPU dan GPU sama-sama bisa menjalankan pekerjaan paralel, dengan penekanan berbeda. CPU dirancang untuk tugas yang bervariasi dan respons cepat pada alur kontrol yang rumit. GPU menekankan throughput ketika banyak operasi dapat berjalan bersamaan, misalnya pemrosesan elemen gambar atau matriks.</p><p>Yang ingin saya pahami adalah kapan pembagian itu menguntungkan. Jika setiap langkah bergantung pada hasil sebelumnya, hanya sebagian pekerjaan yang dapat dibagi. Jika data perlu bolak-balik antara host dan perangkat, keuntungan komputasi dapat hilang karena waktu transfer.</p><p>Model berikut membagikan item bebas ke satu atau empat unit dengan durasi per item yang sama. Jumlah putaran memberi gambaran sederhana tentang pembagian pekerjaan, dengan asumsi tanpa overhead dan tanpa ketergantungan data.</p></div>
    </Essay>
    <div className="frame"><Workload/></div>
    <section className="section frame" id="cuda"><Chapter id="02" label="Model eksekusi NVIDIA CUDA"/><div className="section-heading"><h2>Dari thread <em>ke grid.</em></h2><p className="lead">CUDA memberi cara untuk menulis sebuah kernel dan menentukan bagaimana banyak thread memproses bagian data yang berbeda.</p></div>
      <Sequence label="Hierarki eksekusi" steps={[
        {label:"Thread",text:"Thread menjalankan instance kernel. Indeksnya dapat digunakan untuk memilih elemen data. Register biasanya menyimpan nilai yang dekat dengan eksekusi thread.",art:<CudaScene level={0}/>},
        {label:"Block",text:"Sejumlah thread membentuk satu block. Thread dalam block dapat bekerja sama melalui shared memory dan sinkronisasi yang didukung. Register dan shared memory memakai sumber daya perangkat.",art:<CudaScene level={1}/>},
        {label:"Grid",text:"Seluruh block dari satu peluncuran membentuk grid. Perangkat menjadwalkan block pada unit eksekusi yang tersedia; posisi grid tidak menentukan urutan eksekusi.",art:<CudaScene level={2}/>},
      ]}/>
      <Note label="Mengapa hierarki memori penting?"><p>GPU memiliki ruang memori dengan kegunaan berbeda. Global memory dapat dijangkau luas, tetapi pola akses dan locality berpengaruh pada throughput. Shared memory dapat membantu kerja sama di dalam block. Cache serta register mengurangi sebagian perjalanan data, bergantung arsitektur, konfigurasi, dan kernel.</p></Note>
      <Note label="Apa yang terjadi ketika thread berbeda jalur?"><p>Pada GPU NVIDIA, thread dalam warp dijalankan dengan model SIMT. Jalur cabang berbeda dapat mengurangi efisiensi jika kelompok perlu mengerjakan jalur bergantian. Visual grid menggambarkan pengorganisasian kerja, bukan pemetaan fisik tiap thread.</p></Note>
      <p className="reference">Rujukan <a href={sources.cuda}>NVIDIA CUDA Programming Guide</a>.</p>
    </section>
    <section className="section gpu-band" id="model-ai"><div className="frame"><Chapter id="03" label="Jalur komputasi model AI"/><div className="section-heading"><h2>Dari data <em>hingga inferensi.</em></h2><p className="lead">Tahapan ini memberi kerangka untuk mempelajari cara sebuah model dibangun dan digunakan. Eksplorasi saya berfokus pada hubungan operasi matematika, memori, dan verifikasi hasil.</p></div>
      <Sequence label="Pengembangan model" steps={pipeline}/>
      <Scene art={<TensorArt/>} label="Operasi matriks konseptual" className="tensor-scene"/>
    </div></section>
    <NextChapter href="/ai" title="AI juga bagian dari cara saya bekerja.">Baca perjalanan bersama AI</NextChapter>
  </>;
}
