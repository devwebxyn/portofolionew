import type { ReactNode } from "react";
import { IndustryScene } from "./IndustryScene";
import { Render } from "./Render";

const stations = [
  ["Definisi fungsi", "Sinyal analog yang perlu difilter", "Spesifikasi filter RC sebelum ADC"],
  ["Skematik", "Fungsi dan nilai R/C", "Net IN, OUT, dan GND"],
  ["Pemilihan komponen", "Nilai, toleransi, dan batas tegangan", "BOM dan paket fisik"],
  ["Pemetaan footprint", "Paket fisik dan datasheet", "Pad cocok dengan terminal komponen"],
  ["Penempatan", "Outline, footprint dan net", "Posisi R1 dan C1 dekat jalur sinyal"],
  ["Routing", "Posisi pad dan net yang sama", "Copper menghubungkan pad"],
  ["Bidang tembaga", "Jalur sinyal dan net GND", "Bidang dengan sambungan dan clearance"],
  ["DRC", "Layout dan aturan produksi", "Daftar pelanggaran untuk diperbaiki"],
  ["Ekspor untuk fabrikasi", "Layout yang sudah diperiksa", "Berkas Gerber dan data bor"],
  ["Fabrikasi", "Data layer dan stackup", "PCB dengan pad terbuka dan via"],
  ["Cetak pasta", "PCB kosong, stencil dan pasta", "Deposit pasta pada pad SMD"],
  ["Pick-and-place", "PCB berpasta, feeder dan data posisi", "Komponen terletak pada pad"],
  ["Reflow", "PCB dengan komponen di atas pasta", "Sambungan solder terbentuk"],
  ["Perakitan through-hole", "Konektor berkaki dan lubang PCB", "Kaki disolder pada sisi seberang"],
  ["Inspeksi optik", "Papan selesai dirakit", "Temuan posisi, orientasi dan sambungan"],
  ["Tes listrik", "Jaringan PCB dan titik uji", "Hasil kontinuitas dan isolasi"],
  ["Pemrograman", "Citra dan antarmuka pemrograman", "Flash terisi dan terverifikasi"],
  ["Validasi fungsi", "Papan dan kriteria filter", "Sinyal OUT diperiksa terhadap spesifikasi"],
] as const;

const machines: Record<number,string> = {10:"stencil",11:"smt-machine",12:"reflow-oven",14:"aoi"};
const machineActions: Record<number,string> = {
  10:"Squeegee mendorong pasta melalui bukaan stencil. Stencil diangkat, deposit tetap di pad.",
  11:"Nozel mengambil komponen dari feeder, menyesuaikan orientasi, lalu meletakkannya pada pasta solder.",
  12:"Konveyor membawa papan melewati zona dengan suhu yang dikendalikan, lalu ke pendinginan.",
  14:"Kamera memeriksa letak komponen dan tampilan sambungan. Uji listrik dilakukan pada stasiun terpisah.",
};

function RcDrawing({ step }: {step:number}) {
  return <svg className="rc-drawing" viewBox="0 0 540 268" role="img" aria-label="Contoh filter RC yang sama dari skematik ke layout">
    {step===1 ? <g className="rc-schematic">
      <path d="M64 105h107l10-11 11 22 11-22 11 22 11-22 12 11h235m-143 0v47m-19 0h38m-38 12h38m-19 0v39m-16 0h32m-25 7h18m-13 7h9"/>
      <circle cx="329" cy="105" r="4"/>
      <text x="64" y="89">IN</text><text x="183" y="83">R1</text><text x="351" y="162">C1</text><text x="424" y="89">OUT</text><text x="359" y="211">GND</text>
    </g> : <g transform="translate(20 21)">
      <path d="M60 30h388v185H60z" fill="#203d31" stroke="#719981"/>
      {step===6 && <path className="pcb-fill" fill="#669e76" fillRule="evenodd" d="M64 34h380v177H64zM88 66v62h324V66zM267 128v33h59v-33z"/>}
      <g fill="#d3a35c" stroke="#f2cf8f">
        <circle cx="104" cy="98" r="12"/><circle cx="401" cy="98" r="12"/><circle cx="295" cy="185" r="12"/>
        <rect x="183" y="89" width="17" height="18"/><rect x="236" y="89" width="17" height="18"/>
        <rect x="286" y="124" width="18" height="17"/><rect x="286" y="151" width="18" height="17"/>
      </g>
      {step===4 && <path d="M104 98h87m55 0h155m-106 0v30m0 35v22" stroke="#b9e5da" strokeDasharray="3 5" fill="none"/>}
      {step>=5 && <path className="scope-signal" pathLength="1" d="M104 98h89m51 0h157m-106 0v32m0 32v23" stroke="#f8c683" strokeWidth={step===7?9:4} fill="none"/>}
      <rect x="192" y="92" width="51" height="12" rx="2" fill="#14191b" stroke="#a3a7a4"/><rect x="288" y="132" width="14" height="28" fill="#7d6b54" stroke="#bca292"/>
      {step===7 && <g><circle cx="296" cy="128" r="30" fill="none" stroke="#ff8f79" strokeDasharray="4 4"/><text x="314" y="142">PERIKSA JARAK</text></g>}
      <text x="93" y="77">IN</text><text x="203" y="77">R1</text><text x="309" y="159">C1</text><text x="384" y="77">OUT</text><text x="308" y="196">GND</text>
    </g>}
  </svg>;
}

export function PcbIndustry({step, children}: {step:number; children:ReactNode}) {
  const [station,input,output]=stations[step];
  const machine=machines[step];
  const rc=step===1 || (step>=4 && step<=7);
  return <IndustryScene station={station} input={input} output={output} variant="pcb-station">
    {rc ? <RcDrawing step={step}/> : step===2 || step===3 ? (
      <div className="rc-parts" data-footprint={step===3}>
        <div><b>R1 · RESISTOR</b><div className="rc-package"><i/><span/><i/></div></div>
        <div><b>C1 · KAPASITOR</b><div className="rc-package"><i/><span/><i/></div></div>
        <p>{step===2 ? "Nilai dan toleransi menentukan respons filter. Paket menentukan ukuran di PCB." : "Terminal logam jatuh di atas dua pad. Ukuran pad mengikuti paket dan pedoman pabrikan."}</p>
      </div>
    ) : machine ? (
      <div className="pcb-workcell" data-workcell={machine}>
        <Render name={machine} alt={`Ilustrasi konseptual mesin untuk ${station}`}/>
        <div className="workcell-detail" aria-hidden="true">
          <div className="workcell-bed"><i/><i/><i/></div>
          <div className="workcell-tool"/>
        </div>
        <p>{machineActions[step]}</p>
      </div>
    ) : children}
  </IndustryScene>;
}
