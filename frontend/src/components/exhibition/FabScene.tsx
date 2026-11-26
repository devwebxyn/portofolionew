import { IndustryScene } from "./IndustryScene";
import { Render } from "./Render";

const stages = [
  ["Persiapan · permukaan wafer", "Wafer silikon", "Permukaan rata dan bersih"],
  ["Deposisi · ruang proses", "Wafer bersih", "Film tipis di atas silikon"],
  ["Pelapisan · spin coater", "Wafer berfilm dan resist cair", "Film photoresist merata"],
  ["Litografi · scanner dan developer", "Wafer beresist dan pola reticle", "Bukaan pada resist setelah pengembangan"],
  ["Etching · transfer pola", "Resist berpola di atas film", "Pola berpindah ke film"],
  ["Implantasi · cabang doping", "Wilayah silikon yang dibuka untuk doping", "Dopan masuk ke daerah terpilih"],
  ["Pembersihan · kontrol kontaminasi", "Wafer dengan residu atau partikel", "Permukaan siap untuk proses berikut"],
  ["CMP · perataan permukaan", "Permukaan dengan topografi", "Permukaan rata sebelum lapisan baru"],
  ["Interkoneksi · metal dan via", "Transistor dan lapisan isolasi", "Jalur logam bertingkat dan via vertikal"],
] as const;

const images: Record<number,string> = {1:"deposition", 2:"spin-coater", 3:"lithography"};
const bars = [154,296,438];

function Section({ step }: { step:number }) {
  return <svg className="fab-section" viewBox="0 0 600 274" role="img" aria-label={stages[step][2]}>
    <path d="M85 192l62-43h364l-62 43z" fill="#73858d" stroke="#b2c0c5"/>
    <path d="M85 192h364v41H85z" fill="#394c57" stroke="#8298a3"/>
    <path d="M449 192l62-43v41l-62 43z" fill="#263944" stroke="#8298a3"/>
    <text x="102" y="217">SILIKON</text>
    {(step===1 || step===2 || step===3 || step===6 || step===7) && <path className={step===1?"fab-land":""} d="M85 176l62-43h364l-62 43v16H85z" fill="#7a9b8b" stroke="#c8dbc0"/>}
    {(step===2 || step===3) && <path className={step===2?"fab-expand":""} d="M85 163l62-43h364l-62 43v13H85z" fill="#ad769d" stroke="#efbad9"/>}
    {step===0 && <path d="M112 183l48-32M206 183l48-32M300 183l48-32M394 183l48-32" stroke="#e2f2e9" className="fab-polish"/>}
    {step===1 && <g className="fab-droplets" fill="#b7e5d7">{bars.map(x=><circle cx={x} cy="93" r="7" key={x}/>)}</g>}
    {step===2 && <ellipse className="fab-expand" cx="300" cy="138" rx="149" ry="28" fill="none" stroke="#fdb2ce" strokeWidth="3"/>}
    {step===3 && <>
      <path d="M156 39h304l-30 17H126z" fill="#8f84a9" stroke="#ded0ff"/>
      {bars.map(x=><path key={x} className="fab-expose" d={`M${x} 56v98`} stroke="#dfb9ff" strokeWidth="17" opacity=".55"/>)}
      {[186,322,407].map(x=><path key={x} d={`M${x} 166l25-17h18l-25 17v10h-18z`} fill="#a7c3a5" stroke="#e3eacf"/>)}
      <text x="320" y="31">RETICLE</text>
    </>}
    {step===4 && [100,247,402].map(x=><g key={x}>
      <path d={`M${x} 177l43-28h45l-43 28v14h-45z`} fill="#85ab98" stroke="#d5e5cf"/>
      <path className="fab-expose" d={`M${x+78} 91v59`} stroke="#ebb596" strokeWidth="7" strokeDasharray="4 7"/>
    </g>)}
    {step===5 && <>
      {[174,330].map(x=><g key={x}><ellipse cx={x} cy="184" rx="29" ry="7" fill="#af8dcc"/><path d={`M${x} 54v112`} className="fab-expose" stroke="#e1aafa" strokeWidth="6" strokeDasharray="6 9"/></g>)}
      <text x="214" y="49">BERKAS ION</text>
    </>}
    {step===6 && <g className="fab-droplets" stroke="#aee5f1" fill="none">{bars.map(x=><path key={x} d={`M${x} 83q-26 36 0 40q26-4 0-40Z`}/>)}</g>}
    {step===7 && <g className="fab-polish"><ellipse cx="298" cy="124" rx="192" ry="41" fill="#796e88" stroke="#c7b7d3"/><ellipse cx="298" cy="117" rx="192" ry="34" fill="#9689a0" stroke="#ddd0dd"/><text x="244" y="122">PAD POLES</text></g>}
    {step===8 && <>
      <path d="M85 153l62-43h364l-62 43v39H85z" fill="#385b65" fillOpacity=".9" stroke="#789ba0"/>
      <path d="M122 168h282M180 134h258M212 169v-34m129 33v-33" fill="none" stroke="#efb36c" strokeWidth="9"/>
      <path className="scope-signal" pathLength="1" d="M122 168h90v-34h226" stroke="#ffe1a5"/>
      <text x="284" y="96">LOGAM + VIA</text>
    </>}
    <text x="84" y="260">PENAMPANG KONSEPTUAL · TANPA SKALA</text>
  </svg>;
}

export function FabScene({ step }: { step:number }) {
  const [station,input,output]=stages[step];
  return <IndustryScene station={station} input={input} output={output} variant="fab-station">
    <div className="fab-workcell" data-machine={!!images[step]}>
      {images[step] && <Render name={images[step]} alt={`Ilustrasi alat ${station}`}/>}
      <Section step={step}/>
    </div>
  </IndustryScene>;
}
