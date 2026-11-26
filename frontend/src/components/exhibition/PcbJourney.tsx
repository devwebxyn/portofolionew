import { WorkflowVolume } from "./Workflow";
import { Render } from "./Render";
import { FirmwareFlow } from "./FirmwareFlow";
import { PcbLayout } from "./Diagrams";
import { LayerConsole } from "./InteractiveBoards";
import { Sequence, type Step } from "./Sequence";

function AssemblyComparison() {
  return <WorkflowVolume variant="pcb-assembly" summary="Ilustrasi pick-and-place. Paket IC turun ke pad, lalu hasil penempatan diperlihatkan pada papan.">
    <div className="pcb-assembly-scene">
      <div className="pcb-empty"><Render name="pcb-bare" alt=""/></div>
      <div className="pcb-mounted"><Render name="pcb-populated" alt=""/></div>
      <div className="pcb-placement-head"><Render name="ic" alt=""/></div>
    </div>
    <p className="volume-caption">Kepala mesin menurunkan paket ke posisi pad sebelum reflow.</p>
  </WorkflowVolume>;
}

const steps:Step[]=[
  {label:"Konsep rangkaian",text:"Tentukan fungsi, kondisi masukan, keluaran, kebutuhan daya, dan batas fisik sebelum memilih susunan komponen.",art:<WorkflowVolume variant="pcb-concept" summary="Contoh konsep pengendali suhu: sensor mengirim pembacaan ke pengendali, lalu sakelar mengatur kipas."><div className="flow-map"><div className="flow-node">Sensor suhu</div><div className="flow-node">Keputusan pengendali</div><div className="flow-branch"><div className="flow-node good">Kipas menyala</div><div className="flow-node bad">Kipas mati</div></div></div><p className="volume-caption">Tentukan dulu perilaku masukan dan keluaran.</p></WorkflowVolume>},
  {label:"Skematik",text:"Gambarkan jaringan (net) antar-pin. Skematik menyatakan hubungan listrik yang harus diwujudkan oleh layout.",art:<PcbLayout mode="schematic"/>},
  {label:"Seleksi komponen",text:"Pilih nilai, rating, toleransi, dan ketersediaan yang sesuai. Baca datasheet untuk orientasi dan batas operasi.",art:<Render name="ic" alt="Contoh kemasan IC dengan kaki untuk pemasangan permukaan"/>},
  {label:"Footprint",text:"Cocokkan pad, pitch, dimensi paket, dan penanda pin satu dengan komponen fisik.",art:<WorkflowVolume variant="pcb-footprint" summary="Paket IC disejajarkan dengan bantalan footprint. Posisi kaki pertama dan jarak antarpad harus cocok."><div className="footprint-scene"><div className="footprint-pads"><span>PIN 1</span></div><Render name="ic" alt=""/></div><p className="volume-caption">Paket fisik di atas footprint. Cocokkan orientasi dan pitch dengan datasheet.</p></WorkflowVolume>},
  {label:"Penempatan",text:"Atur komponen berdasarkan aliran sinyal, ruang konektor, distribusi daya, dan kebutuhan perakitan.",art:<PcbLayout mode="placement"/>},
  {label:"Routing",text:"Hubungkan pad lewat jalur dan via. Pertimbangkan lebar jalur, jarak, dan lintasan balik arus.",art:<PcbLayout mode="routing"/>},
  {label:"Bidang daya dan ground",text:"Bidang tembaga menyediakan referensi serta jalur distribusi. Sambungan dan jalur balik perlu diperiksa setelah pengisian bidang.",art:<PcbLayout mode="plane"/>},
  {label:"Pemeriksaan aturan desain",text:"DRC menemukan pelanggaran aturan seperti clearance dan sambungan yang belum lengkap. Pemeriksaan listrik dan fisik lain tetap diperlukan.",art:<PcbLayout mode="drc"/>},
  {label:"Ekspor Gerber",text:"Ekspor gambar per layer bersama data bor dan kebutuhan pabrik. Buka kembali hasilnya di viewer untuk memeriksa orientasi, outline, dan lapisan.",art:<PcbLayout mode="gerber"/>},
  {label:"Fabrikasi papan",text:"Pabrik membangun PCB sesuai stackup dan file produksi. Proses dapat mencakup pembentukan tembaga, pengeboran, pelapisan via, solder mask, dan finishing pad.",art:<Render name="pcb-bare" alt="Papan dengan solder mask, lubang via, dan pad yang terbuka"/>},
  {label:"Aplikasi pasta solder",text:"Pada perakitan SMD, pasta solder dapat ditempatkan pada pad dengan stencil. Ketebalan dan bukaan stencil memengaruhi deposit.",art:<PcbLayout mode="paste"/>},
  {label:"Pick-and-place",text:"Paket diposisikan pada pad dengan orientasi yang benar. Mesin dapat memakai fiducial dan koordinat penempatan.",art:<AssemblyComparison/>},
  {label:"Reflow",text:"Papan dengan pasta dan komponen dipanaskan melalui profil yang sesuai untuk membentuk sambungan.",art:<WorkflowVolume variant="pcb-heat" summary="Profil reflow konseptual bergerak melalui pemanasan awal, perataan suhu, puncak, dan pendinginan."><div className="reflow-chart"><svg viewBox="0 0 400 125" aria-hidden="true"><path d="M15 10v97h370"/><path className="reflow-profile" pathLength="1" d="M15 102L105 63l95-10 62-39 25 5 85 70"/></svg><div><span>Panaskan</span><span>Ratakan</span><span>Lelehkan</span><span>Dinginkan</span></div></div><p className="volume-caption">Profil suhu mengikuti pasta solder dan batas komponen.</p></WorkflowVolume>},
  {label:"Perakitan THT",text:"Kaki mencapai sisi lain melalui lubang. Metode penyolderan mengikuti volume, bahan, dan urutan perakitan.",art:<Render name="r" alt="Resistor aksial dengan kaki kawat untuk pemasangan through-hole"/>},
  {label:"Inspeksi",text:"Periksa orientasi, pasang komponen, kualitas sambungan, dan kemungkinan solder bridge.",art:<PcbLayout mode="inspection"/>},
  {label:"Pengujian listrik",text:"Periksa kontinuitas dan hubungan pendek. Setelah kondisi aman, ukur rail serta sinyal sesuai prosedur perangkat.",art:<PcbLayout mode="test"/>},
  {label:"Pemrograman firmware",text:"Jika produk memiliki pengendali yang dapat diprogram, muat versi firmware yang sesuai dan verifikasi hasil proses tulis.",art:<FirmwareFlow stage={7}/>},
  {label:"Validasi fungsi",text:"Uji masukan, keluaran, keadaan kegagalan, dan kondisi kerja yang relevan untuk memastikan papan melakukan tugasnya.",art:<div className="process-panel"><h4>Periksa perilaku papan yang telah dirakit</h4><div className="process-chain"><span>Beri masukan</span><span>Amati keluaran</span><span>Cocokkan dengan spesifikasi</span></div></div>},
];

export function PcbJourney(){
  return <><Sequence label="Perjalanan PCB" steps={steps}/><div className="pcb-layer-section"><h3>Telusuri lapisan fisik</h3><LayerConsole/></div></>;
}
