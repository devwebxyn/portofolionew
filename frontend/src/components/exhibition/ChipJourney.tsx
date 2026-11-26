import { IndustryScene } from "./IndustryScene";
import { Floorplan, GateNet, SignalDiagram, TestStation } from "./Diagrams";
import { FabScene } from "./FabScene";
import { Render } from "./Render";

const stations = [
  {station:"Arsitektur", input:"Target fungsi, area dan daya", output:"Diagram blok dan spesifikasi antarmuka",
    art:<div className="chip-architect"><div>DATA MASUK</div><div><b>DATAPATH</b><span>Logika → register</span></div><div>DATA KELUAR</div></div>},
  {station:"Desain RTL", input:"Diagram blok dan kontrak waktu", output:"Deskripsi register dalam Verilog",
    art:<div className="chip-rtl"><code>always @(posedge clk) q &lt;= d &amp; enable;</code><div className="chip-architect"><div>D</div><div><b>REGISTER</b><span>↑ clock</span></div><div>Q</div></div></div>},
  {station:"Verifikasi", input:"RTL dan stimulus testbench", output:"Respons Q dibandingkan dengan ekspektasi",
    art:<SignalDiagram labels={["CLK","D ∧ EN","Q"]} samples={[[0,1,0,1,0,1,0,1],[1,1,0,0,1,1,0,0],[0,1,1,0,0,1,1,0]]}/>},
  {station:"Sintesis", input:"RTL dan pustaka sel", output:"Netlist hasil pemetaan",
    art:<GateNet/>},
  {station:"Desain fisik", input:"Netlist, aturan proses dan batasan timing", output:"Layout dengan sel dan jalur logam",
    art:<Floorplan routed/>},
  {station:"Tape-out", input:"Layout yang telah melalui sign-off", output:"Data layout untuk persiapan mask",
    art:<TestStation mode="mask"/>},
  {station:"Wafer", input:"Silikon yang dipoles dan dibersihkan", output:"Substrat tempat pola banyak die dibentuk",
    art:<Render name="wafer" alt="Ilustrasi wafer dengan pola die setelah pemrosesan"/>},
  {station:"Fabrikasi", input:"Wafer, mask, dan urutan proses", output:"Lapisan transistor dan interkoneksi terbentuk",
    art:<FabScene step={8}/>},
  {station:"Probe dan dicing", input:"Wafer yang sudah diproses", output:"Peta hasil uji dan die terpisah",
    art:<div className="chip-probe"><Render name="probe-station" alt="Ilustrasi probe station"/><TestStation mode="dicing"/></div>},
  {station:"Pengemasan", input:"Die terpilih dan substrat paket", output:"Die terhubung ke terminal luar",
    art:<Render name="chip" alt="Ilustrasi die, substrat dan kontak paket yang dipisahkan"/>},
  {station:"Uji akhir", input:"Chip yang telah dikemas", output:"Hasil ukur untuk klasifikasi dan skrining",
    art:<TestStation mode="final"/>},
  {station:"Integrasi", input:"Chip lolos uji dan PCB", output:"Komponen terhubung ke sistem",
    art:<Render name="pcb-populated" alt="Ilustrasi chip terpasang pada PCB"/>},
] as const;

export function ChipJourney({ step }: { step: number }) {
  if(step===7) return <FabScene step={8}/>;
  const {station,input,output,art} = stations[step];
  return <IndustryScene station={station} input={input} output={output} variant="chip-station">{art}</IndustryScene>;
}
