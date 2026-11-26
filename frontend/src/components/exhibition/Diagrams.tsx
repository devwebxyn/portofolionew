import type { CSSProperties } from "react";
import { ArtBoard } from "./Machines";
import { Slab, shape, square, trace } from "@/components/bare/Hardware";

const n=(length:number)=>Array.from({length},(_,i)=>i);
const wave=(left:number,top:number,count=6)=>"M"+left+" "+top+n(count).map((_,i)=> i%2 ? "v24h29" : "v-24h29").join("");
const stageStyle=(i:number)=>({"--n":i} as CSSProperties);

export function SignalDiagram({labels, pattern = "clock", samples}:{labels:string[];pattern?:"clock"|"serial"|"edge"|"analog"|"analog-edge";samples?:number[][]}) {
  return <ArtBoard className="signal-diagram">
    <rect x="22" y="29" width="576" height="315" rx="6" fill="#202a2b" stroke="#66746e"/>
    {n(18).map(i=><path key={i} d={`M${171+i*22} 53v265`} stroke="#8aa492" opacity=".12"/>)}
    {labels.map((label,i)=>{
      const y=200-(labels.length-1)*30+i*60;
      const levels=samples?.[i];
      const digital=levels?.map((bit,index)=>`${index ? "V" : "M170 "}${y-bit*24}h${365/levels.length}`).join("");
      const path=digital ?? (pattern==="analog" ? `M170 ${y}q55-55 110 0t110 0t110 0 h36` :
        pattern==="analog-edge" && i===0 ? `M170 ${y} q88-60 160-26t170 26 h36` :
        pattern==="edge" ? `M170 ${y} h105v-24h${i===0?197:94}v24H536` : wave(170+i*17,y,11));
      return <g key={label}><text className="art-label" x="44" y={y-7} fill="#dedac9">{label}</text><path d={path} fill="none" stroke={i%2 ? "#b59fc8" : "#a4c8b0"} strokeWidth="2"/><path className="data-sweep" pathLength="1" d={path} fill="none" stroke="#f5cf9f" strokeWidth="3"/></g>;
    })}
  </ArtBoard>;
}

export function TransferArt({from,to,units=["2A","B5","0F","7E"],code}:{from:string;to:string;units?:string[];code?:string}) {
  return <ArtBoard className="transfer-art">
    <path d="m64 135 114-46 98 43-114 52zM64 135l98 49 114-52v58l-114 52-98-49z" fill="#435050" stroke="#a9ada1"/>
    <path d="m349 164 113-46 97 43-113 52zM349 164l97 49 113-52v58l-113 52-97-49z" fill="#4d4349" stroke="#bcac9e"/>
    <path d="M162 208h117l81 34h86M166 219h102l85 35h93" fill="none" stroke="#967c65"/>
    <path className="data-sweep" pathLength="1" d="M162 208h117l81 34h86" fill="none" stroke="#f3c899" strokeWidth="3"/>
    <g fill="#efe0cc" className="art-label"><text x="64" y="282">{from}</text><text x="414" y="306">{to}</text></g>
    {units.map((part,i)=><g className="data-packet" key={part+i} style={stageStyle(i)} transform={`translate(${187+i*57} ${169+i*9})`}><rect width="47" height="28" rx="1" fill="#b39273"/><text x="23.5" y="19" textAnchor="middle" className="art-label" fill="#191919">{part}</text></g>)}
    {code && <text x="57" y="61" className="art-label" fill="#d0c7d4">{code}</text>}
  </ArtBoard>;
}

export function Floorplan({routed=false}:{routed?:boolean}) {
  return <ArtBoard className="floorplan">
    <path d="m65 93 390-46 111 62-391 49v166L65 255zM175 324l391-49V109l-391 49z" stroke="#88938e" fill="#35404a"/>
    <g transform="matrix(1 -.12 .39 .7 69 102)">
      <rect width="360" height="220" fill="#282d38" stroke="#a6a7b3"/>
      {[[18,18,132,65],[174,18,165,65],[18,107,91,95],[128,107,92,95],[239,107,99,95]].map(([x,y,w,h],i)=><g key={`${x}-${y}`} className="floor-cell" style={stageStyle(i)}><rect x={x} y={y} width={w} height={h} fill={["#a7806c","#6c8b94","#7d7996","#9b8767","#608377"][i]} stroke="#e9d1ae"/><text x={x+8} y={y+24} className="art-label" fill="#15191a">{["CACHE","INTI","I/O","CLOCK","BUS"][i]}</text></g>)}
      {routed && <g stroke="#f2d1a1" strokeWidth="2" fill="none">{n(7).map(i=><path className="data-sweep" pathLength="1" key={i} d={`M${38+i*15} 63v${29+i%2*5}h${205-i*13}v${44+i*5}`}/>)}</g>}
    </g>
  </ArtBoard>;
}

export function CrossSection({stage}:{stage:"bare"|"film"|"resist"|"exposure"|"etch"|"implant"|"clean"|"cmp"|"metal"}) {
  return <ArtBoard className="cross-section">
    <path d="m57 216 345-62 162 64-344 65v49L57 264zM220 332l344-65v-49l-344 65z" fill="#42475c" stroke="#8c9dae"/>
    <path d="m57 216 345-62 162 64-344 65z" fill="#7a8ea6" stroke="#b0bfd1"/>
    {stage!=="bare" && <path className="film-deposit" d="m57 204 345-62 162 64-344 65v12l344-65v-12l-344 65-163-67z" fill="#aebea8" stroke="#d5d9c2" />}
    {["resist","exposure"].includes(stage) && <path className="resist-coat" d="m57 192 345-62 162 64-344 65z" fill="#87658e" stroke="#cbb0c7"/>}
    {stage==="exposure" && <g className="mask-beam"><path d="m172 100 215-48 105 31-214 49z" fill="#e0c08c" opacity=".6"/><path d="M172 100v90l106 30V132zM387 52v106l105 30V83z" fill="#eac099" opacity=".26"/></g>}
    {["etch","implant","clean","cmp","metal"].includes(stage) && <g className="etch-trench" stroke="#bec8d3" fill="#394f61">
      <path d="m172 178 59-10 155 64-61 12zM300 156l49-9 156 62-52 10z" />
    </g>}
    {stage==="implant" && <g className="ion-beam" fill="#ffd7a0">{n(13).map(i=><circle style={stageStyle(i)} key={i} cx={230+i*15} cy={114+i%3*23} r="4"/>)}</g>}
    {stage==="clean" && <path className="clean-sweep" d="m242 143 172 67-52 11-170-68z" fill="#d4ebeb" opacity=".8"/>}
    {stage==="cmp" && <ellipse className="polish-ring" cx="302" cy="167" rx="178" ry="44" fill="#98a798" opacity=".65" stroke="#ced9c8"/>}
    {stage==="metal" && <g className="metal-routes" fill="#c89672" stroke="#efc5a1"><path d="m122 176 59-10 153 61-63 11zM218 159l53-11 156 62-56 10zM323 139l56-10 156 60-61 11z"/></g>}
    <text x="58" y="346" className="art-label" fill="#ded5e6">PENAMPANG LAPISAN · KONSEPTUAL</text>
  </ArtBoard>;
}

export function TestStation({mode}:{mode:"probe"|"dicing"|"final"|"mask"}) {
  if (mode==="mask") return <ArtBoard className="mask-art">
    <path d="M120 71l323-24 63 233-335 45z" fill="#546e75" stroke="#97bebc" strokeWidth="2"/>
    <path d="M140 89l287-23 58 195-298 35z" fill="#292f3d" stroke="#c0d1d1"/>
    <g className="mask-lines" fill="none" stroke="#b3c5ba">{n(13).map(i=><path key={i} d={`M${162+i*17} 100l15 58 38 19 19 74m-70-${i%3+8}l194-18`}/>)}</g>
    <text x="23" y="325" fill="#dbc39f" className="art-label">DATA PABRIKASI</text>
  </ArtBoard>;
  if (mode==="final") return <ArtBoard className="test-station">
    <rect x="75" y="58" width="470" height="244" rx="6" fill="#2c323c" stroke="#7a8c9a"/>
    <rect x="114" y="103" width="187" height="76" fill="#243238" stroke="#809588"/>
    <path className="data-sweep" pathLength="1" d={wave(135,150,5)} fill="none" stroke="#bae8d0" strokeWidth="3"/>
    <path d="M345 121h139m-139 37h139m-139 37h139" stroke="#7d8379"/>
    {["FUNGSI","LISTRIK","SKRINING"].map((v,i)=><text key={v} x="354" y={113+i*37} className="art-label" fill="#cfd6c2">{v}</text>)}
    <path d="M129 228h169v34H129z" fill="#424952" stroke="#7b8385"/><path d="M152 245h126" stroke="#c39976" strokeDasharray="5 5"/>
  </ArtBoard>;
  return <ArtBoard className={mode==="probe" ? "probe-art" : "dicing-art"}>
    <ellipse cx="316" cy="224" rx="221" ry="107" fill="#4d696b" stroke="#bdd2cd"/>
    <g transform="translate(160 154) skewX(-12)">{n(24).map(i=><rect className={`die-tile ${i===14 ? "die-focus" : ""}`} key={i} x={i%6*53} y={Math.floor(i/6)*34} width="48" height="29" fill={i%3===2 ? "#a58783" : "#789c99"} stroke="#252932"/>)}</g>
    {mode==="probe" ? <g className="probe-tip" stroke="#d5b188" strokeWidth="4" fill="none"><path d="M112 40l72 44 100 121M214 34l43 41 77 118M324 39v57l40 99"/></g> :
      <path className="dice-line" d="M83 89L544 315m-16-208L117 313" fill="none" stroke="#fbd4a2" strokeDasharray="7 7"/>}
  </ArtBoard>;
}

export function PcbLayout({mode="routing"}:{mode?:"schematic"|"placement"|"routing"|"plane"|"drc"|"gerber"|"paste"|"inspection"|"test"}) {
  return <ArtBoard className={`pcb-layout pcb-${mode}`}>
    {mode==="schematic" ? <><path d="M111 260V118h96l8-11 11 22 11-22 11 22 11-11h199v142H111m0-98h-28m28 17H89m369-39v38m-23 0h44m-44 14h44" fill="none" stroke="#d7c8a5" strokeWidth="3"/><text x="225" y="90" fill="#efd3aa" className="art-label">R1</text><text x="478" y="184" fill="#efd3aa" className="art-label">C1</text></> : <>
      <rect x="60" y="66" width="500" height="238" rx="10" fill={mode==="gerber" ? "#282b29" : "#2a463b"} stroke="#93a18c"/>
      {mode==="plane" && <path d="M76 82H540V287H76z" fill="#897e51" opacity=".54"/>}
      {n(10).map(i=><g key={i} fill="#c6a273"><rect x={94+i*41} y="90" width="12" height="14"/><rect x={94+i*41} y="267" width="12" height="14"/></g>)}
      <rect className="floor-cell" x="253" y="143" width="110" height="83" fill="#29292b" stroke="#d2c0a9"/><text className="art-label" x="289" y="192" fill="#e9ccaf">U1</text>
      {mode!=="placement" && <g fill="none" stroke={mode==="paste" ? "#e3e5db" : "#c19c6d"}>{n(7).map(i=><path className="data-sweep" pathLength="1" key={i} d={`M${99+i*41} 104v18l${i<4?33:-21} ${21+i*3}h${i<4?78:32}m-33 ${59-i*2}v24l-27 24`}/>)}</g>}
      {["drc","inspection","test"].includes(mode) && <circle className="inspection-spot" cx="310" cy="185" r="72" fill="none" stroke="#efc198" strokeWidth="2" strokeDasharray="4 6"/>}
      {mode==="paste" && <path className="clean-sweep" d="M118 122h386l-48 30H74z" fill="#ced0cd" opacity=".65"/>}
    </>}
    <text x="63" y="338" fill="#bbc3ac" className="art-label">{mode==="schematic" ? "NET · SKEMATIK" : "PAD · JALUR · BIDANG REFERENSI"}</text>
  </ArtBoard>;
}

export function PcbStackArt({visible=[true,true,true,true,true,true,true], exploded=true}:{visible?:boolean[];exploded?:boolean}) {
  const parts=[
    <Slab key="substrat" x={-172} y={-119} w={344} d={238} z={0} depth={18} top="#8c775a" side="#6e5941"/>,
    <g key="copper" stroke="#dbae7f" fill="none">{n(13).map(i=><path key={i} className="data-sweep" pathLength="1" d={trace([[-162,-96+i*15,1],[-80,-96+i*15,1],[-42,-40+i*6,1],[123,-40+i*6,1],[156,-86+i*15,1]])}/>)}</g>,
    <polygon key="mask" points={shape(square(-171,-118,342,236,2))} fill="#375644" opacity=".67" stroke="#759076"/>,
    <g key="silk" stroke="#d9e1d1" fill="none">{[[-134,-78],[41,37],[103,-84]].map(([x,y])=><polygon key={x} points={shape(square(x,y,42,38,3))}/>)}</g>,
    <g key="pads" fill="#d4ac76">{n(13).map(i=><polygon key={i} points={shape(square(-147+i*22,72,14,13,4))}/>)}</g>,
    <g key="vias" fill="#242220" stroke="#d3aa78">{n(8).map(i=><polygon key={i} points={shape(square(-128+i*36,-40+i%3*12,7,7,5))}/>)}</g>,
    <g key="components"><Slab x={-64} y={-49} w={113} d={93} z={29} depth={21} top="#48474a" side="#282627"/><Slab x={75} y={-72} w={48} d={132} z={39} depth={31} top="#797a7a" side="#4f514f"/><Slab x={-137} y={39} w={33} d={51} z={23} depth={17} top="#a28870" side="#5f5043"/></g>,
  ];
  return <svg viewBox="0 5 800 535" aria-hidden="true" className="pcb-stack" data-exploded={exploded}>
    {parts.map((part,i)=><g key={i} className="pcb-stratum" data-visible={visible[i]} style={{"--rise":`${79-i*25}px`,"--slide":`${(i%3-1)*15}px`} as CSSProperties}>{part}</g>)}
    <text x="73" y="476" fill="#ddc7ac" className="art-label">PERAKITAN · LAPISAN TIDAK BERSKALA</text>
  </svg>;
}

export function GateNet() {
  return <ArtBoard className="gate-net">
    <path d="m56 72 455-20 57 39-455 28zM113 119l455-28v227l-455 30z" fill="#2c343d" stroke="#7d9190"/>
    <g stroke="#818d80" strokeWidth="2" fill="none"><path d="M67 161h105m-105 53h105m91-25h64v51h83m-83-51v-46h82m73 47h79M452 141v-38h80"/></g>
    <path d="M172 134h49a54 54 0 0 1 0 108h-49z" fill="#6d8d73" stroke="#afc3a4"/>
    <rect x="408" y="136" width="75" height="104" fill="#765f81" stroke="#bbaac7"/>
    <path className="data-sweep" d="M67 161h105m91 28h64v51h83m73-50h79" pathLength="1" fill="none" stroke="#e9c49a" strokeWidth="2"/>
    <g className="art-label" fill="#e4ded3"><text x="60" y="147">A</text><text x="60" y="239">B</text><text x="183" y="198">AND</text><text x="422" y="193">DFF</text><text x="535" y="181">Q</text></g>
  </ArtBoard>;
}

export function BoardProcess({mode}:{mode:"fab"|"place"|"heat"|"test"}) {
  const border=mode==="fab" ? "#739c8b" : "#bda483";
  return <svg className={`board-process board-process-${mode}`} viewBox="0 25 800 475" aria-hidden="true">
    <Slab x={-170} y={-119} w={340} d={238} z={-14} depth={16} top="#41594d" side="#685745" edge={border}/>
    <g fill="none" stroke="#c2986b">{n(12).map(i=><path className="data-sweep" pathLength="1" key={i} d={trace([[-158,-97+i*16,-13],[-85,-97+i*16,-13],[-55,-36+i*6,-13],[91,-36+i*6,-13],[152,-97+i*16,-13]])}/>)}</g>
    {mode!=="fab" && <g className={mode==="place"?"pick-head":undefined}>
      <Slab x={-58} y={-60} w={118} d={120} z={14} depth={25} top="#535354" side="#282b2b"/>
      <polygon points={shape(square(-46,-48,93,96,15))} fill="none" stroke="#a7a18e"/>
      {mode==="place" && <><path d="M399 55v151" stroke="#b9b3a5" strokeWidth="15"/><ellipse cx="399" cy="55" rx="23" ry="9" fill="#848f91"/></>}
    </g>}
    {mode==="heat" && <g className="reflow-heat" fill="none" stroke="#dfa77c" strokeWidth="3">{[330,400,470].map(x=><path d={`M${x} 189q-15-24 0-48t0-48`} key={x}/>)}</g>}
    {mode==="test" && <><path className="probe-tip" d="m240 80 74 42 52 115m194-135-70 36-28 99" fill="none" stroke="#d9cbb2" strokeWidth="4"/><path className="data-sweep" pathLength="1" d="M132 388h59v-22h59v22h59v-22h59" stroke="#bdddc4" fill="none" strokeWidth="3"/></>}
    <text className="art-label" x="75" y="458" fill="#e2cfb7">{{fab:"FABRIKASI · LAPISAN TEMBAGA",place:"PENEMPATAN · ORIENTASI",heat:"REFLOW · PROFIL PANAS",test:"VALIDASI · RESPONS SINYAL"}[mode]}</text>
  </svg>;
}
