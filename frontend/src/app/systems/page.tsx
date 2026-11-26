import { Chapter, NextChapter } from "@/components/bare/Exhibit";
import { layers, Logic, Memory, Registers, Stack } from "@/components/bare/Computing";
import { Explorer } from "@/components/bare/SceneControls";
import { Index } from "@/components/exhibition/Editorial";
import { InstructionScene } from "@/components/exhibition/InstructionScene";
import { BootChapter, RuntimeChapter } from "@/components/exhibition/SystemJourney";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/systems", "Eksplorasi sistem Linux", "Eksplorasi konseptual Samuel Indra Bastian tentang userspace, kernel Linux, memori virtual, register CPU, dan logika digital.");

const pipeline = [
  ["Fetch", "Mengambil instruksi", "Prosesor mengambil instruksi dari alamat yang ditunjuk program counter."],
  ["Decode", "Mengenali operasi", "Bagian decode menentukan operasi dan operand dari encoding instruksi."],
  ["Execute", "Menjalankan operasi", "Unit eksekusi menjalankan operasi, misalnya penjumlahan atau perhitungan alamat."],
  ["Write-back", "Menyimpan hasil", "Jika operasi menghasilkan nilai register, hasilnya ditulis ke register tujuan."],
];

export default function Systems() {
  return <>
    <section className="frame page-top systems-top">
      <Chapter id="LINUX" label="Arsitektur sistem" />
      <header className="systems-title entrance"><h1>Di bawah <em>aplikasi.</em></h1><p className="lead">Saya mempelajari bagaimana Linux menjembatani kode aplikasi dengan sumber daya mesin. Pilih lapisan untuk mengikuti jalur tersebut.</p></header>
      <Explorer label="Pilih lapisan komputasi" views={layers.map((layer, i) => ({ ...layer, art: <Stack active={i} /> }))} className="layer-explorer" />
      <Index items={[["boot-linux","Boot Linux"],["memori-register","Memori dan register"],["instruksi","Pipeline"],["runtime-linux","Penjadwalan dan I/O"],["logika","Logika digital"]]}/>
    </section>
    <BootChapter/>
    <section className="section system-bench" id="memori-register">
      <div className="frame">
        <Chapter id="01" label="Keadaan mesin" />
        <div className="section-heading"><h2>Di mana data <em>berada?</em></h2><p className="lead">Di tingkat sistem operasi, data dipetakan ke memori. Di tingkat instruksi, nilai dapat berubah langsung di register.</p></div>
        <Explorer label="Pilih tampilan memori atau register" views={[
          {label:"Memori virtual",title:"Alamat virtual diterjemahkan",text:"Page table memetakan halaman virtual ke frame fisik. Skema ini menyederhanakan proses translasi yang dilakukan perangkat keras dengan tabel yang dikelola kernel.",art:<Memory />},
          {label:"Register awal",title:"Sebelum instruksi dijalankan",text:"Dalam contoh x86 ini, AX menyimpan 0x002A. Instruksi ADD meminta penambahan nilai 0x01.",art:<Registers />},
          {label:"Hasil instruksi",title:"AX menjadi 0x002B",text:"Operasi memperbarui register tujuan. BX dan CX tidak berubah.",art:<Registers result />},
        ]} />
      </div>
    </section>
    <section className="section frame" id="instruksi">
      <Chapter id="02" label="Aliran instruksi" />
      <div className="section-heading"><h2>Empat tahap <em>eksekusi.</em></h2><p className="lead">Model konseptual untuk mengikuti sebuah instruksi. Rincian tahap dan pengurutannya bisa berbeda antarprosesor.</p></div>
      <Explorer label="Pilih tahap pipeline" className="pipeline-explorer" views={pipeline.map(([label,title,text],i)=>({label,title,text,art:<InstructionScene index={i} />}))} />
    </section>
    <RuntimeChapter/>
    <section className="section frame logic-section" id="logika">
      <Chapter id="03" label="Logika digital" />
      <div className="feature-grid">
        <div className="feature-copy"><h2>Dari bit <em>ke sinyal.</em></h2><p className="lead">Gerbang logika bekerja pada nilai digital. Ubah masukan B untuk melihat keluaran AND dengan masukan A tetap bernilai satu.</p></div>
        <Explorer className="logic-explorer" label="Ubah masukan B" views={[
          {label:"B = 0",title:"Y = 0",text:"Salah satu masukan bernilai nol. Keluaran AND bernilai nol.",art:<Logic high={false} />},
          {label:"B = 1",title:"Y = 1",text:"Kedua masukan bernilai satu. Keluaran AND bernilai satu.",art:<Logic />},
        ]} />
      </div>
    </section>
    <NextChapter href="/electronics" title="Di ujung instruksi ada rangkaian.">Jelajahi elektronika</NextChapter>
  </>;
}
