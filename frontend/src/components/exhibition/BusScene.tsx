import { IndustryScene } from "./IndustryScene";

type Lane = { name: string; direction: string; levels: number[] };
const bits = [1, 0, 1, 0, 0, 1, 0, 1];
const twice = (values: number[]) => values.flatMap(value => [value, value]);
const i2cBits = [1, 0, 1, 0, 0, 0, 0, 0, 0]; // Address 0x50, write, ACK.
const signals: { source: string; target: string; output: string; lanes: Lane[]; notes: string[] }[] = [
  { source:"MCU · TX", target:"USB–UART · RX", output:"Penerima membaca 0x96", lanes:[{name:"TX",direction:"→",levels:[1,0,0,1,1,0,1,0,0,1,1,1]}], notes:["Idle tinggi", "Start rendah", "8 bit, LSB dulu", "Stop tinggi"] },
  { source:"MCU · controller", target:"Periferal SPI", output:"Dua byte ditukar serentak", lanes:[
    {name:"CS",direction:"→",levels:[1,...Array(16).fill(0),1]},
    {name:"SCLK",direction:"→",levels:[0,...bits.flatMap(()=>[0,1]),0]},
    {name:"MOSI",direction:"→",levels:[0,...twice(bits),0]},
    {name:"MISO",direction:"←",levels:[0,...twice([0,0,1,1,1,1,0,0]),0]},
  ], notes:["Contoh mode 0", "CS rendah sepanjang transfer", "Sampel pada tepi naik"] },
  { source:"MCU · controller", target:"Target · 0x50", output:"Target menarik SDA rendah untuk ACK", lanes:[
    {name:"SCL",direction:"→",levels:[1,1,...i2cBits.flatMap(()=>[0,1,1]),0,1,1]},
    {name:"SDA",direction:"↔",levels:[1,0,...i2cBits.flatMap(bit=>[bit,bit,bit]),0,0,1]},
  ], notes:["START saat SCL tinggi", "Alamat 0x50 + tulis", "ACK rendah di clock ke-9", "STOP"] },
  { source:"MCU · pin keluaran", target:"Masukan digital", output:"Penerima membaca level logika", lanes:[{name:"GPIO",direction:"→",levels:[0,0,1,1,1,0,0,1]}], notes:["Level rendah", "Peralihan", "Level tinggi"] },
  { source:"Timer MCU", target:"Driver LED", output:"Contoh duty cycle 25% pada dua periode", lanes:[{name:"PWM",direction:"→",levels:[1,0,0,0,1,0,0,0]}], notes:["1 bagian aktif", "3 bagian nonaktif", "Periode berulang"] },
  { source:"Periferal · IRQ", target:"Core CPU", output:"Handler merespons setelah IRQ terdeteksi", lanes:[
    {name:"IRQ",direction:"→",levels:[0,0,1,1,1,0,0,0]},
    {name:"Handler",direction:"→",levels:[0,0,0,0,1,1,1,0]},
  ], notes:["Permintaan", "Latensi", "Eksekusi handler"] },
  { source:"Sumber clock", target:"Timer · pembanding", output:"Compare match saat pencacah mencapai nilai target", lanes:[
    {name:"Clock",direction:"→",levels:[0,1,0,1,0,1,0,1,0,1,0,1]},
    {name:"Match",direction:"→",levels:[0,0,0,0,0,1,1,0,0,0,0,0]},
  ], notes:["Hitung tepi clock", "Bandingkan nilai", "Tandai kecocokan"] },
  { source:"Sensor analog", target:"ADC mikrokontroler", output:"Setiap sampel dipetakan ke kode diskret", lanes:[], notes:["Sinyal kontinu", "Titik sampel", "Hasil kuantisasi"] },
  { source:"Keluaran driver", target:"Masukan logika", output:"Rentang rendah dan tinggi dibaca sebagai 0 dan 1", lanes:[], notes:["Rendah", "Daerah transisi", "Tinggi"] },
];

function Scope({ index, lanes }: { index: number; lanes: Lane[] }) {
  return <svg viewBox="0 0 540 198" className="bus-scope" role="img" aria-label="Diagram waktu sinyal, dibaca dari kiri ke kanan">
    <path d="M98 21V174H518" stroke="#5c827b" fill="none"/>
    {Array.from({length:13},(_,i)=><path key={i} d={`M${100+i*34} 19V174`} stroke="#2a4c4b"/>)}
    {lanes.map(({name,levels},row)=>{
      const y=47+row*(118/Math.max(1,lanes.length-1));
      const width=414/levels.length;
      const d=levels.map((level,i)=>
        `${i===0?`M100 ${y-level*17}`:`V${y-level*17}`}h${width}`
      ).join("");
      return <g key={name}><text x="12" y={y-4}>{name}</text><path className="scope-signal" pathLength="1" d={d}/></g>;
    })}
    {index===7 && <g><text x="12" y="71">Analog</text><text x="12" y="153">Kode</text><path className="scope-signal" pathLength="1" d="M100 83Q185 8 270 43T514 76"/><path d="M100 158H171V137H235V125H298V138H361V157H426V165H514" className="scope-secondary"/>{[171,235,298,361,426].map(x=><path key={x} d={`M${x} 19V174`} stroke="#edbb8b" strokeDasharray="3 5"/>)}</g>}
    {index===8 && <g><text x="12" y="125">Level</text><path d="M100 64H514M100 116H514" stroke="#c58b6b" strokeDasharray="4 6"/><path className="scope-signal" pathLength="1" d="M100 148H220Q248 148 274 93T327 38H514"/><text x="436" y="54">HIGH</text><text x="115" y="144">LOW</text></g>}
    {index===2 && <g className="scope-markers">
      <path d="M113 17V174M449 17V174M501 17V174"/>
      <text x="117" y="17">START</text><text x="453" y="17">ACK</text><text x="482" y="193">STOP</text>
    </g>}
    {index!==2 && <text x="444" y="193">waktu →</text>}
  </svg>;
}

export function BusScene({ index }: { index: number }) {
  const signal = signals[index];
  return <IndustryScene station="Bangku ukur · diagram waktu konseptual" input={signal.source} output={signal.output} variant="instrument-scene">
    <div className="bus-rig">
      <div className="bus-device"><i/>{signal.source}</div>
      <div className="bus-traces" aria-label="Jalur dan arah data">{(signal.lanes.length ? signal.lanes : [{name:index===7?"Analog":"Level", direction:"→"}]).map(lane=><div key={lane.name} data-direction={lane.direction}><span>{lane.direction} {lane.name}</span></div>)}</div>
      <div className="bus-device"><i/>{signal.target}</div>
    </div>
    <Scope index={index} lanes={signal.lanes}/>
    <div className="scope-notes">{signal.notes.map(note=><span key={note}>{note}</span>)}</div>
  </IndustryScene>;
}
