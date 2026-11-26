import { Chapter, Scene } from "@/components/bare/Exhibit";
import { Render } from "./Render";
import { Logic, Memory } from "@/components/bare/Computing";
import { Workflow } from "./Workflow";
import { TextLink } from "@/components/Editorial";
import { Index } from "./Editorial";
import { CrystalArt, TransistorCutaway } from "./Machines";

export function AtlasIndex(){
  return <div className="frame atlas-index"><Index items={[["material","Material"],["lapisan","Sistem"],["bahasa","Bahasa"],["memori-firmware","Memori dan firmware"],["paralel-ai","GPU dan AI"],["arsip","Proyek"]]}/></div>;
}

export function AtlasMaterial(){
  return <section className="section frame atlas-material" id="material">
    <Chapter id="01" label="Material, semikonduktor, dan logika"/>
    <div className="atlas-intro"><p className="eyebrow">Perjalanan dari fisik ke digital</p><h2>Sebelum ada bit, <em>ada material.</em></h2><p className="lead">Kisi silikon adalah titik awal. Kita dapat menata wilayah dengan sifat listrik berbeda dan memakai medan untuk mengendalikan kanal. Dari sakelar ini, gerbang mengubah hubungan fisik menjadi aturan logika.</p><TextLink href="/semiconductor">Ikuti pembuatan chip</TextLink></div>
    <div className="atlas-grid">
      <Scene art={<CrystalArt/>} label="Kisi kristal dan dopan" className="atlas-crystal"/>
      <Scene art={<Render name="wafer" alt="Wafer silikon dengan kisi die berwarna iridesen"/>} label="Wafer dengan banyak die" className="atlas-wafer"/>
      <Scene art={<TransistorCutaway/>} label="Gate, isolator, dan kanal" className="atlas-transistor"/>
      <Scene art={<Logic/>} label="Gerbang AND dan clock" className="atlas-logic"/>
    </div>
  </section>;
}
export function AtlasFirmware(){
  return <section className="section firmware-band" id="memori-firmware"><div className="frame">
    <Chapter id="02" label="Prosesor, memori, dan firmware"/>
    <div className="section-heading"><h2>Ketika instruksi <em>mencapai pin.</em></h2><p className="lead">CPU mengambil instruksi dari memori. Pada perangkat embedded, firmware mengatur waktu, membaca keadaan, dan mengirim sinyal ke bagian papan yang lain.</p></div>
    <div className="atlas-device"><Scene art={<Memory/>} label="Alamat virtual dan frame"/><Scene art={<Render name="pico" alt="Papan mikrokontroler dengan konektor USB dan deretan pad GPIO"/>} label="Papan mikrokontroler"/><Scene art={<Render name="pcb-populated" alt="PCB dengan IC dan komponen permukaan"/>} label="Jalur pada PCB" className="board-scene"/></div>
    <div className="atlas-links"><TextLink href="/embedded">Telusuri boot dan flashing</TextLink><TextLink href="/electronics">Lihat lapisan PCB</TextLink></div>
  </div></section>;
}
export function AtlasParallel(){
  return <section className="section frame atlas-parallel" id="paralel-ai">
    <Chapter id="05" label="Aplikasi, GPU, dan AI"/>
    <div className="feature-grid">
      <div className="feature-copy"><h2>Kerja yang bisa <em>dibagi.</em></h2><p className="lead">Aplikasi bergantung pada sistem operasi untuk mengelola proses dan perangkat. Model AI menambah satu pertanyaan: bagaimana membagi operasi numerik dan memindahkan data di antara banyak unit komputasi?</p><TextLink href="/computing">Jelajahi GPU dan CUDA</TextLink></div>
      <Scene art={<Render name="gpu" alt="Kartu grafis dengan dua kipas"/>} className="atlas-gpu" label="Sistem pendingin kartu grafis"/>
    </div>
    <div className="atlas-method"><Scene art={<Workflow active={0}/>} label="Ide, implementasi, dan pengujian"/><div className="feature-copy"><h3>Di meja pengembangan, perannya berbeda.</h3><p className="lead">Sejak Juli 2024 saya memakai AI untuk membangun perangkat lunak, menyusun pertanyaan, dan mencoba ide. Pengujian membantu saya melihat kapan hasilnya sesuai dan kapan arahnya perlu diubah.</p><TextLink href="/ai">Lihat cara saya menguji hasil</TextLink></div></div>
  </section>;
}
