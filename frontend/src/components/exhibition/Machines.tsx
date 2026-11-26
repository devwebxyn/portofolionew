import { useId, type CSSProperties, type ReactNode } from "react";
import { Slab, shape, square, trace } from "@/components/bare/Hardware";

type Part = [x:number,y:number,width:number,depth:number,height:number,label:string,material?: "metal"|"chip"|"gold"];
export type BoardName = "esp" | "s3" | "pi" | "pico" | "orange";

const boards: Record<BoardName,{ w:number; d:number; color:string; edge:string; pins:number; rails:number; pitch:number; parts:Part[] }> = {
  esp: { w:340,d:123,color:"#313839",edge:"#67584d",pins:17,rails:2,pitch:17,parts:[
    [-145,-43,111,86,20,"ESP32"],[-155,-43,27,86,9,"RF","gold"],[123,-28,49,56,19,"USB","metal"],[57,14,33,24,10,"LDO"],[53,-29,39,27,12,"UART"],[105,-49,15,15,12,"BOOT"],
  ] },
  s3: { w:374,d:150,color:"#3b3532",edge:"#8a675c",pins:19,rails:2,pitch:17,parts:[
    [-158,-49,140,97,25,"ESP32-S3","metal"],[-180,-48,39,94,10,"RF","gold"],[137,-55,52,39,19,"USB","metal"],[137,14,52,39,19,"UART","metal"],[42,-39,36,28,14,"LDO"],[12,22,39,23,9,"E/S"],[99,24,12,15,11,"RGB","gold"],
  ] },
  pi: { w:355,d:240,color:"#354d3c",edge:"#53765b",pins:20,rails:2,pitch:12,parts:[
    [-132,-45,73,76,20,"SoC"],[-44,-24,53,103,16,"RAM"],[104,-95,72,72,54,"LAN","metal"],[110,-11,66,56,45,"USB","metal"],[108,53,68,49,45,"USB","metal"],[-127,82,40,37,18,"DAYA","metal"],[-72,87,34,32,16,"VIDEO","metal"],[-14,87,34,33,16,"VIDEO","metal"],[30,76,48,26,11,"SD"],
  ] },
  pico: { w:353,d:99,color:"#486354",edge:"#7a8b59",pins:20,rails:2,pitch:16,parts:[
    [-174,-28,55,56,17,"USB","metal"],[-61,-28,59,56,13,"RP2040"],[29,7,41,26,11,"FLASH"],[80,-23,23,23,10,"BOOT"],[117,-17,32,34,6,"SWD","gold"],[-103,-34,18,32,10,"LDO"],
  ] },
  orange: { w:410,d:210,color:"#293b47",edge:"#92755a",pins:13,rails:1,pitch:16,parts:[
    [-26,-49,98,96,25,"SoC"],[-137,-50,73,57,16,"RAM"],[-138,18,74,54,19,"eMMC"],[131,-94,69,60,52,"LAN","metal"],[137,-23,66,54,46,"USB","metal"],[144,49,59,48,26,"VIDEO","metal"],[-202,13,50,45,15,"DAYA","metal"],
  ] },
};

function Mark({x,y,z,label, color = "#efe0ca"}:{x:number;y:number;z:number;label:string;color?:string}) {
  return <text transform={`matrix(.88 .43 -.88 .43 ${400+(x-y)*.88} ${269+(x+y)*.43-z})`} fontFamily="monospace" fontSize="14" dominantBaseline="middle" textAnchor="middle" fill={color}>{label}</text>;
}

function Pins({w,d,pins,rails,pitch,inset=11}:{w:number;d:number;pins:number;rails:number;pitch:number;inset?:number}) {
  return <g fill="#cfaf79" stroke="#2e231f" strokeWidth=".8">
    {Array.from({length:pins},(_,i) => (rails===2 ? [-d/2+inset,d/2-inset-7] : [-d/2+inset]).map((y,j)=><polygon key={i+"-"+j} points={shape(square(Math.max(-w/2+10,-pins*pitch/2)+i*pitch,y,7,7,4))} />))}
  </g>;
}

export function BoardModel({board}:{board:BoardName}) {
  const model=boards[board];
  const {w,d,color,edge,parts}=model;
  const uid=useId();
  return <svg viewBox="0 58 800 445" className={`dev-board dev-${board}`} aria-hidden="true">
    <defs><linearGradient id={uid}><stop stopColor="#cfcfc6"/><stop offset=".43" stopColor="#7d8182"/><stop offset=".58" stopColor="#abaeaa"/><stop offset="1" stopColor="#585b5e"/></linearGradient></defs>
    <ellipse cx="407" cy="386" rx="255" ry="64" fill="#070b0d" opacity=".3"/>
    <g className="dev-geometry">
      <Slab x={-w/2} y={-d/2} w={w} d={d} z={0} depth={12} top={color} side={edge} />
      <g stroke="#c1976d" fill="none" opacity=".78">
        {Array.from({length:9},(_,i) => <path key={i} className={i < 3 ? "dev-trace" : undefined} d={trace([[-w/2+22,-d/2+20+i*7,1],[-60,-d/2+20+i*7,1],[-30,i*6-20,1],[80,i*6-20,1],[w/2-20,-d/2+26+i*8,1]])} />)}
      </g>
      <Pins {...model} />
      {parts.map(([x,y,w,d,h,label,mat="chip"]) => <g key={label+"-"+x}>
        <Slab x={x} y={y} w={w} d={d} z={h} depth={h} top={mat==="metal" ? `url(#${uid})` : mat==="gold" ? "#9c7950" : "#24282c"} side={mat==="metal" ? "#4c5051" : "#191c1d"} />
        <Mark x={x+w*.5} y={y+d*.5} z={h+.5} label={label} color={mat==="metal" ? "#272421" : undefined}/>
      </g>)}
      {board==="pico" && <path d={trace([[25,28,2],[40,28,2],[82,42,2],[143,42,2]])} fill="none" stroke="#c9cca1" strokeDasharray="2 5"/>}
      {(board==="esp" || board==="s3") && <path d={trace(board==="esp"
        ? [[-151,-37,10],[-151,-24,10],[-141,-24,10],[-141,-11,10],[-151,-11,10],[-151,6,10],[-141,6,10],[-141,19,10],[-151,19,10],[-151,37,10]]
        : [[-175,-40,11],[-175,-29,11],[-162,-29,11],[-162,-14,11],[-175,-14,11],[-175,3,11],[-162,3,11],[-162,19,11],[-175,19,11],[-175,38,11]])} fill="none" stroke="#e8c391" strokeWidth="2"/>}
      {(board==="esp" || board==="s3") && <g className="radio-wave" fill="none" stroke="#e1b887" strokeWidth="2">
        <path d="M218 178q-31-19-63 0M230 161q-42-32-86 0M241 144q-54-47-108 0"/>
      </g>}
    </g>
    <g className="art-label" fill="#dcbfa4" stroke="#a38b76" strokeWidth="1">
      <path d="M570 196h56l21-25h75M221 327h-72l-20 21H72" fill="none"/>
      <text x="649" y="160" stroke="none">GPIO / E/S</text>
      <text x="72" y="369" stroke="none">{board==="pi" || board==="orange" ? "PAPAN LINUX" : "FIRMWARE"}</text>
    </g>
  </svg>;
}

export function Gpu() {
  const uid=useId();
  return <svg viewBox="0 -28 800 562" className="gpu-art" aria-hidden="true">
    <defs><linearGradient id={uid}><stop stopColor="#515b60"/><stop offset=".5" stopColor="#a0a5a0"/><stop offset=".57" stopColor="#6b7679"/><stop offset="1" stopColor="#454849"/></linearGradient></defs>
    <g className="gpu-board">
      <Slab x={-226} y={-113} w={450} d={220} z={-76} depth={12} top="#303d38" side="#785942"/>
      <g stroke="#9b8968" fill="none">{Array.from({length:12},(_,i)=><path key={i} d={trace([[-213,i*16-95,-75],[-105,i*16-95,-75],[-58,i*8-48,-75],[92,i*8-48,-75],[172,i*16-95,-75],[207,i*16-95,-75]])} />)}</g>
      <Slab x={-63} y={-48} w={115} d={102} z={-52} depth={28} top="#857f78" side="#222729"/>
      <Slab x={-33} y={-28} w={57} d={60} z={-47} depth={5} top="#7e9f9c" side="#394a48"/><Mark x={-6} y={0} z={-46} label="GPU"/>
      {[-126,78].flatMap(x=>[-67,-25,22,67].map(y=><Slab key={x+":"+y} x={x} y={y} w={34} d={26} z={-60} depth={16} top="#293338" side="#1c2022"/>))}
      {Array.from({length:8},(_,i)=><Slab key={i} x={110+i*12} y={69} w={9} d={17} z={-64} depth={10} top="#b2946e" side="#685439"/>)}
    </g>
    <g className="gpu-sink">
      <Slab x={-203} y={-95} w={406} d={189} z={40} depth={12} top="#62676b" side="#343b40"/>
      {Array.from({length:25},(_,i)=><Slab key={i} x={-199+i*16} y={-92} w={6} d={185} z={57} depth={24} top={`url(#${uid})`} side="#454e55"/>)}
    </g>
    <g className="gpu-cooler">
      <Slab x={-205} y={-97} w={410} d={194} z={144} depth={17} top="#30393f" side="#1c262c"/>
      {[-100,100].map(x=><g key={x} transform={`matrix(.88 .43 -.88 .43 ${400+x*.88} ${125+x*.43})`}>
        <circle r="77" fill="#111b1f" stroke="#81908e" strokeWidth="4"/>
        <g className="gpu-fan">{Array.from({length:9},(_,i)=><path key={i} transform={`rotate(${i*40})`} d="M0-18Q-41-41-15-69Q35-77 19-20Z" fill={`url(#${uid})`} stroke="#4e6065"/>)}</g>
        <circle r="22" fill="#414f53" stroke="#8c9a91"/>
      </g>)}
    </g>
    <g className="art-label" fill="#bacfc9"><text x="650" y="104">PENDINGIN</text><text x="650" y="215">HEATSINK</text><text x="650" y="339">PCB / DAYA</text><path d="M630 100h-52l-36 25m86 86h-52l-26 16m82 108h-54l-35 19" fill="none" stroke="currentColor"/></g>
  </svg>;
}

export function CrystalArt() {
  return <svg viewBox="0 0 620 400" className="crystal-art" aria-hidden="true">
    <g transform="translate(115 48)">
      {Array.from({length:35},(_,i) => {
        const x=(i%7)*57 + (Math.floor(i/7)%2)*27, y=Math.floor(i/7)*48;
        return <g key={i} className="atom-node" style={{"--n":i%7} as CSSProperties}>
          {i%7<6 && <path d={`M${x} ${y}h57l-29 48`} stroke="#8f9d99" opacity=".65" fill="none"/>}
          <circle cx={x} cy={y} r="9" fill={i===17 ? "#ecc492" : "#5e8b89"} stroke="#d6e5db" strokeWidth="1"/>
        </g>;
      })}
    </g>
    <path d="M315 196l36 88h132l42-36h42" fill="none" stroke="#dbac85"/>
    <text className="art-label" x="385" y="310" fill="#e7bd9c">DOPAN · PEMBAWA MUATAN</text>
  </svg>;
}

export function TransistorCutaway() {
  return <svg viewBox="0 50 800 440" className="transistor-cutaway" aria-hidden="true">
    <Slab x={-188} y={-109} w={376} d={218} z={-4} depth={72} top="#4f5870" side="#323a58" />
    <Slab x={-170} y={-81} w={96} d={162} z={5} depth={26} top="#77b1ac" side="#4d7f7a" />
    <Slab x={74} y={-81} w={96} d={162} z={5} depth={26} top="#77b1ac" side="#4d7f7a" />
    <polygon className="channel-flow" points={shape(square(-73,-36,146,72,6))} fill="#d2f7db" opacity=".75"/>
    <g className="gate-cap">
      <Slab x={-61} y={-84} w={122} d={168} z={27} depth={9} top="#e4c9a0" side="#ad8e62"/>
      <Slab x={-61} y={-84} w={122} d={168} z={64} depth={37} top="#b291b8" side="#5d527e"/>
      <Mark x={0} y={0} z={65} label="GATE"/>
    </g>
    <Mark x={-110} y={7} z={6} label="SOURCE" /><Mark x={121} y={7} z={6} label="DRAIN" />
    <path d="M251 403h157l46-30h128" fill="none" stroke="#ceb1da" strokeDasharray="4 6"/><text className="art-label" x="255" y="427" fill="#d6c0e4">PENAMPANG MOSFET · KONSEPTUAL</text>
  </svg>;
}

export function ArtBoard({children,className=""}:{children:ReactNode;className?:string}) {
  return <svg className={`diagram-board ${className}`} viewBox="0 0 620 375" aria-hidden="true">{children}</svg>;
}
