import type { CSSProperties } from "react";
import { Scene } from "@/components/bare/Exhibit";
import { Essay, Note, sources } from "./Editorial";
import { ArtBoard } from "./Machines";
import { SignalDiagram, TransferArt } from "./Diagrams";
import { Sequence, type Step } from "./Sequence";

const boot:Step[]=[
  {label:"Firmware",text:"Firmware awal membawa perangkat ke keadaan yang dapat dipakai dan memilih jalur boot. Tahap ini berbeda pada PC UEFI dan berbagai papan embedded.",art:<TransferArt from="RESET" to="FIRMWARE" units={["ROM","I/O","RAM"]}/>},
  {label:"Bootloader",text:"Dalam satu jalur umum, bootloader memilih dan memuat kernel, parameter boot, serta initramfs jika digunakan. Sebagian sistem memiliki mekanisme pemuatan lain.",art:<TransferArt from="MEDIA" to="RAM" units={["KERN","INIT","ARG"]}/>},
  {label:"Inisialisasi kernel",text:"Kernel menyiapkan pengelolaan memori, scheduler, interrupt, dan subsistem perangkat sesuai konfigurasi. File awal dapat membantu menyiapkan root filesystem.",art:<TransferArt from="KERNEL" to="PERANGKAT" units={["MM","IRQ","DRV"]}/>},
  {label:"Init dan userspace",text:"Program init sebagai PID 1 mengelola proses awal sesuai distribusi. Layanan dan program lain menyusul, dengan interaksi sistem melalui antarmuka kernel.",art:<TransferArt from="PID 1" to="LAYANAN" units={["LOG","NET","APP"]}/>},
];

function ScheduleArt() {
  return <ArtBoard className="schedule-art">
    <path d="M81 301h463m-436-46 422-62v-72l-422 63z" stroke="#a1ada5" fill="#333e44"/>
    <g transform="skewY(-8)">
      {[0,1,2,3,4].map(i=><g className="schedule-slice" style={{"--n":i} as CSSProperties} key={i}><rect x={112+i*81} y="212" width="73" height="49" fill={i%2 ? "#776380" : "#53827a"} stroke="#aabab3"/><text x={124+i*81} y="243" fill="#efdfd0" className="art-label">{i%2 ? "PID B" : "PID A"}</text></g>)}
    </g>
    <path d="M159 165l104-75h186" fill="none" stroke="#d1ac89" strokeDasharray="4 7"/>
    <text x="271" y="72" className="art-label" fill="#e1c5aa">SIMPAN KEADAAN → PULIHKAN</text>
  </ArtBoard>;
}

function CacheArt() {
  return <div className="cache-art" aria-hidden="true">
    {["REGISTER","CACHE L1","CACHE LANJUT","RAM"].map((label,i)=><div key={label} style={{"--n":i} as CSSProperties}>{label}<i/></div>)}
  </div>;
}

export function BootChapter() {
  return <section id="boot-linux" className="section firmware-band"><div className="frame">
    <div className="section-heading"><h2>Sebelum <em>login.</em></h2><p className="lead">Saya mengikuti urutan boot untuk mencari tahu kapan OS mulai mengambil tanggung jawab dari firmware dan bootloader.</p></div>
    <Sequence label="Jalur boot Linux" steps={boot}/>
    <p className="reference">Rujukan awal userspace <a href={sources.linux}>dokumentasi kernel Linux</a>.</p>
  </div></section>;
}

export function RuntimeChapter() {
  return <>
    <Essay id="runtime-linux" number="04" title="Waktu, memori, dan perangkat">
      <h2>Berbagi <em>satu mesin.</em></h2>
      <div><p>Saya membayangkan bagaimana dua program terlihat berjalan bersama ketika satu inti hanya bisa mengeksekusi satu konteks pada sebuah kesempatan. Scheduler memilih tugas yang siap berjalan. Context switch menyimpan bagian keadaan tugas lama dan mengembalikan keadaan tugas berikutnya. Kebijakan aktual juga mempertimbangkan prioritas, beban, dan banyak inti.</p><p>Alamat program memberi pandangan yang berbeda lagi. Page table menghubungkan halaman virtual dengan frame serta hak akses. CPU dapat mengingat terjemahan dalam TLB. Cache data menangani akses yang berbeda: salinan dari data atau instruksi yang sering dipakai, sehingga sebagian permintaan tidak harus mencapai RAM.</p><p>Ketika program membuka berkas, VFS memberi antarmuka yang konsisten di atas beragam filesystem. Pada perangkat penyimpanan, driver menerjemahkan permintaan. Selesainya operasi bisa dilaporkan lewat interrupt, lalu kernel membangunkan pekerjaan yang menunggu. Satu panggilan aplikasi dapat menjadi rangkaian peristiwa di beberapa lapisan.</p><Note label="Apa perbedaan register dan cache?"><p>Instruksi menyebut register sebagai bagian dari keadaan arsitektur. Cache mempercepat akses ke data atau instruksi dan biasanya ditangani perangkat keras secara transparan bagi kode biasa. Diagram ini menunjukkan kedekatan konsep, bukan ukuran atau waktu akses prosesor tertentu.</p></Note></div>
    </Essay>
    <div className="frame twin-scenes system-details">
      <Scene art={<ScheduleArt/>} label="Penjadwalan dan context switch"/>
      <Scene art={<CacheArt/>} label="Kedekatan data ke inti CPU"/>
      <Scene art={<TransferArt from="VFS" to="DRIVER" units={["FILE","I/O","BUF"]}/>} label="Dari filesystem ke perangkat"/>
      <Scene art={<SignalDiagram labels={["IRQ","HANDLER","BANGUN"]} pattern="edge"/>} label="Interrupt dan respons kernel"/>
    </div>
  </>;
}
