import { ComponentsArt } from "@/components/bare/Hardware";
import { BoardProcess, PcbLayout, TransferArt } from "./Diagrams";
import { LayerConsole } from "./InteractiveBoards";
import { Sequence, type Step } from "./Sequence";

const steps:Step[]=[
  {label:"Konsep rangkaian",text:"Tentukan fungsi, kondisi masukan, keluaran, kebutuhan daya, dan batas fisik sebelum memilih susunan komponen.",art:<PcbLayout mode="schematic"/>},
  {label:"Skematik",text:"Gambarkan jaringan (net) antar-pin. Skematik menyatakan hubungan listrik yang harus diwujudkan oleh layout.",art:<PcbLayout mode="schematic"/>},
  {label:"Seleksi komponen",text:"Pilih nilai, rating, toleransi, dan ketersediaan yang sesuai. Baca datasheet untuk orientasi dan batas operasi.",art:<ComponentsArt/>},
  {label:"Footprint",text:"Cocokkan pad, pitch, dimensi paket, dan penanda pin satu dengan komponen fisik.",art:<PcbLayout mode="placement"/>},
  {label:"Penempatan",text:"Atur komponen berdasarkan aliran sinyal, ruang konektor, distribusi daya, dan kebutuhan perakitan.",art:<PcbLayout mode="placement"/>},
  {label:"Routing",text:"Hubungkan pad lewat jalur dan via. Pertimbangkan lebar jalur, jarak, dan lintasan balik arus.",art:<PcbLayout mode="routing"/>},
  {label:"Bidang daya dan ground",text:"Bidang tembaga menyediakan referensi serta jalur distribusi. Sambungan dan jalur balik perlu diperiksa setelah pengisian bidang.",art:<PcbLayout mode="plane"/>},
  {label:"Pemeriksaan aturan desain",text:"DRC menemukan pelanggaran aturan seperti clearance dan sambungan yang belum lengkap. Pemeriksaan listrik dan fisik lain tetap diperlukan.",art:<PcbLayout mode="drc"/>},
  {label:"Ekspor Gerber",text:"Ekspor gambar per layer bersama data bor dan kebutuhan pabrik. Buka kembali hasilnya di viewer untuk memeriksa orientasi, outline, dan lapisan.",art:<PcbLayout mode="gerber"/>},
  {label:"Fabrikasi papan",text:"Pabrik membangun PCB sesuai stackup dan file produksi. Proses dapat mencakup pembentukan tembaga, pengeboran, pelapisan via, solder mask, dan finishing pad.",art:<BoardProcess mode="fab"/>},
  {label:"Aplikasi pasta solder",text:"Pada perakitan SMD, pasta solder dapat ditempatkan pada pad dengan stencil. Ketebalan dan bukaan stencil memengaruhi deposit.",art:<PcbLayout mode="paste"/>},
  {label:"Pick-and-place",text:"Paket diposisikan pada pad dengan orientasi yang benar. Mesin dapat memakai fiducial dan koordinat penempatan.",art:<BoardProcess mode="place"/>},
  {label:"Reflow",text:"Papan dengan pasta dan komponen dipanaskan melalui profil yang sesuai untuk membentuk sambungan.",art:<BoardProcess mode="heat"/>},
  {label:"Perakitan THT",text:"Kaki mencapai sisi lain melalui lubang. Metode penyolderan mengikuti volume, bahan, dan urutan perakitan.",art:<ComponentsArt throughHole/>},
  {label:"Inspeksi",text:"Periksa orientasi, pasang komponen, kualitas sambungan, dan kemungkinan solder bridge.",art:<PcbLayout mode="inspection"/>},
  {label:"Pengujian listrik",text:"Periksa kontinuitas dan hubungan pendek. Setelah kondisi aman, ukur rail serta sinyal sesuai prosedur perangkat.",art:<PcbLayout mode="test"/>},
  {label:"Pemrograman firmware",text:"Jika produk memiliki pengendali yang dapat diprogram, muat versi firmware yang sesuai dan verifikasi hasil proses tulis.",art:<TransferArt from="CITRA" to="FLASH"/>},
  {label:"Validasi fungsi",text:"Uji masukan, keluaran, keadaan kegagalan, dan kondisi kerja yang relevan untuk memastikan papan melakukan tugasnya.",art:<BoardProcess mode="test"/>},
];

export function PcbJourney(){
  return <><Sequence label="Perjalanan PCB" steps={steps}/><div className="pcb-layer-section"><h3>Telusuri lapisan fisik</h3><LayerConsole/></div></>;
}
