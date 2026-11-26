import { useId } from "react";
import type { CSSProperties } from "react";

type Point = [number, number, number];
export const project = ([x, y, z]: Point) => [(400 + (x - y) * .88).toFixed(1), (269 + (x + y) * .43 - z).toFixed(1)];
export const shape = (points: Point[]) => points.map((p) => project(p).join(",")).join(" ");
export const square = (x: number, y: number, w: number, d: number, z: number): Point[] =>
  [[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]];
export const trace = (points: Point[]) => "M" + points.map((p) => project(p).join(",")).join("L");

export function Slab({ x, y, w, d, z, depth, top, side, edge = "#fff4" }: {
  x: number; y: number; w: number; d: number; z: number; depth: number; top: string; side: string; edge?: string;
}) {
  const t = square(x,y,w,d,z);
  const b = square(x,y,w,d,z-depth);
  return <g stroke={edge} strokeWidth=".85" strokeLinejoin="round">
    <polygon points={shape([t[3],t[2],b[2],b[3]])} fill={side} />
    <polygon points={shape([t[1],t[2],b[2],b[1]])} fill={side} style={{ filter: "brightness(.62)" }} />
    <polygon points={shape(t)} fill={top} />
  </g>;
}

const steps = Array.from({length: 15}, (_, i) => i);
const plane = (z: number, angle = 0, x = 0) => ({ "--z": `${z}px`, "--angle": `${angle}deg`, "--x": `${x}px` } as CSSProperties);

export function Processor() {
  const uid = useId();
  const fill = (name: string) => `url(#${uid}-${name})`;
  return <svg className="processor-art" viewBox="0 0 800 520" aria-hidden="true">
    <defs>
      <linearGradient id={uid + "-metal"} x2=".85" y2="1"><stop stopColor="#e7ded2"/><stop offset=".27" stopColor="#95918a"/><stop offset=".53" stopColor="#565653"/><stop offset=".78" stopColor="#aaa59b"/><stop offset="1" stopColor="#ccc1ad"/></linearGradient>
      <linearGradient id={uid + "-side"} x2="1" y2="0"><stop stopColor="#5c5955"/><stop offset=".5" stopColor="#9f9684"/><stop offset="1" stopColor="#4c4741"/></linearGradient>
      <linearGradient id={uid + "-wafer"} x2="1" y2="1"><stop stopColor="#a2c1ba"/><stop offset=".43" stopColor="#47524f"/><stop offset=".65" stopColor="#383e50"/><stop offset="1" stopColor="#b78e80"/></linearGradient>
      <linearGradient id={uid + "-board"} x2="0" y2="1"><stop stopColor="#474f41"/><stop offset="1" stopColor="#20271f"/></linearGradient>
      <radialGradient id={uid + "-light"}><stop stopColor="#ce8958" stopOpacity=".24"/><stop offset="1" stopColor="#111" stopOpacity="0"/></radialGradient>
    </defs>
    <ellipse cx="405" cy="345" rx="370" ry="163" fill={fill("light")} />
    <g opacity=".33" fill="none" stroke="#bd9580" strokeWidth=".7">
      {[1,1.23,1.45].map((s) => <polygon key={s} points={shape(square(-160*s,-160*s,320*s,320*s,-78))} />)}
      <path d={trace([[-290,0,-78],[290,0,-78]])}/><path d={trace([[0,-290,-78],[0,290,-78]])}/>
    </g>
    <g className="cpu-layer cpu-contacts" style={plane(43, -2)}>
      <Slab x={-148} y={-148} w={296} d={296} z={-38} depth={9} top="#4d443d" side="#40352d" />
      {steps.flatMap((i) => steps.map((j) => (i < 4 || i > 10 || j < 4 || j > 10) &&
        <polygon key={i*15+j} points={shape(square(-134+i*18,-134+j*18,9,9,-37))} fill={(i+j)%3 ? "#bd986b" : "#8e694c"} />))}
    </g>
    <g className="cpu-layer" style={plane(15, 1)}>
      <Slab x={-155} y={-155} w={310} d={310} z={-9} depth={12} top={fill("board")} side="#6b6650" />
      {steps.map((i) => <g key={i} fill="none" stroke={i%3 ? "#a58a5e" : "#ddad75"} strokeWidth="1" opacity=".77">
        <path d={trace([[-140,-135+i*19,-8],[-115,-135+i*19,-8],[-60,-64+i*9,-8],[64,-64+i*9,-8],[117,-135+i*19,-8],[140,-135+i*19,-8]])}/>
        <path d={trace([[-130+i*19,-140,-8],[-130+i*19,-108,-8],[-65+i*9,-51,-8],[-65+i*9,51,-8],[-130+i*19,108,-8],[-130+i*19,140,-8]])}/>
      </g>)}
      {[-141,127].flatMap((x) => [-141,127].map((y) => <polygon key={x+","+y} points={shape(square(x,y,14,14,-7))} fill="#b48556" />))}
    </g>
    <g className="cpu-layer" style={plane(-51, -4, 86)}>
      <Slab x={-81} y={-72} w={162} d={144} z={4} depth={7} top="#514640" side="#573e31"/>
      <Slab x={-69} y={-59} w={138} d={118} z={11} depth={7} top={fill("wafer")} side="#394745"/>
      {Array.from({length: 8}, (_, i) => <g key={i} stroke="#d7e6db" strokeOpacity=".45" strokeWidth=".55">
        <path d={trace([[-61,-49+i*14,11],[61,-49+i*14,11]])}/>
        <path d={trace([[-61+i*17,-49,11],[-61+i*17,49,11]])}/>
      </g>)}
    </g>
    <g className="cpu-layer cpu-lid" style={plane(-106, 4, -45)}>
      <Slab x={-141} y={-141} w={282} d={282} z={22} depth={18} top={fill("side")} side="#675a4c"/>
      <Slab x={-128} y={-128} w={256} d={256} z={42} depth={20} top={fill("metal")} side={fill("side")}/>
      <polygon points={shape(square(-120,-120,240,240,42.3))} stroke="#e8d8bd" strokeOpacity=".6" fill="none" />
      {Array.from({length: 40}, (_, i) => <path key={i} d={trace([[-122,-117+i*6,42.5],[122,-117+i*6,42.5]])} stroke={i%3 ? "#f8e6cf" : "#373531"} opacity=".14" strokeWidth=".6"/>)}
      <g transform="matrix(.88 .43 -.88 .43 400 227)" fill="#282623">
        <text x="-95" y="-34" fontSize="12" letterSpacing="3">SAMUEL / KOMPUTASI</text>
        <text x="-99" y="19" fontWeight="700" fontSize="42" letterSpacing="-2">BARE METAL</text>
        <path d="M-95 35H96" stroke="#322c25" strokeWidth="1"/>
        <text x="-95" y="61" fontSize="11" letterSpacing="3">ARSITEKTUR KONSEPTUAL</text>
      </g>
    </g>
    <g className="cpu-labels" fill="#e5c9b5" stroke="#be9c84" strokeWidth=".75">
      <path d="M508 154h69l25-19h69M552 241h43l21-18h55M525 328h82l14-16h50M526 406h81l16-14h48" fill="none"/>
      <g stroke="none" fontFamily="monospace" fontSize="13" letterSpacing="1">
        <text x="674" y="139">PENUTUP</text><text x="674" y="227">DIE</text>
        <text x="674" y="316">SUBSTRAT</text><text x="674" y="396">KONTAK</text>
      </g>
    </g>
  </svg>;
}

export function Wafer() {
  const uid = useId();
  return <svg className="wafer-art" viewBox="0 0 650 550" aria-hidden="true">
    <defs>
      <linearGradient id={uid+"-metal"} x1="0" y1=".1" x2="1" y2=".9"><stop stopColor="#39464a"/><stop offset=".24" stopColor="#899b9a"/><stop offset=".42" stopColor="#554754"/><stop offset=".66" stopColor="#b08365"/><stop offset=".78" stopColor="#d9a683"/><stop offset="1" stopColor="#463f50"/></linearGradient>
      <pattern id={uid+"-dies"} width="23" height="23" patternUnits="userSpaceOnUse"><path d="M.5 23V.5H23" fill="none" stroke="#1b2324" opacity=".8"/><path d="M3 3h7v17H3zM13 3h7v8h-7zM13 14h7v6h-7z" fill="#eee4d5" opacity=".14"/></pattern>
      <linearGradient id={uid+"-shine"}><stop stopColor="#fff" stopOpacity="0"/><stop offset=".48" stopColor="#fff" stopOpacity=".06"/><stop offset=".62" stopColor="#fff" stopOpacity=".45"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></linearGradient>
    </defs>
    <path d="M65 432h520M325 60v435" stroke="#fff" strokeOpacity=".12" strokeDasharray="3 8" />
    <g transform="translate(320 260) rotate(-22) scale(1 .74)">
      <g className="wafer-disc">
      <circle cy="12" r="217" fill="#655d55"/>
      <circle r="217" fill={`url(#${uid}-metal)`} stroke="#beac95" strokeWidth="2"/>
      <circle r="209" fill={`url(#${uid}-dies)`}/>
      <circle className="wafer-shine" r="207" fill={`url(#${uid}-shine)`}/>
      <circle r="211" fill="none" stroke="#f7dcbc" strokeOpacity=".6"/>
      <path d="M-15 215q15-12 30 0" fill="#171819" stroke="#dbc0a3"/>
      </g>
    </g>
    <path d="M435 139h62l32-28h62M158 350h-37l-29 28H31" fill="none" stroke="#c49978"/>
    <g fill="#ddbd9f" fontSize="13" fontFamily="monospace"><text x="517" y="101">POLA DIE</text><text x="31" y="399">WAFER SILIKON</text></g>
  </svg>;
}

export function Board() {
  const uid = useId();
  return <svg className="board-art" viewBox="0 0 800 520" aria-hidden="true">
    <defs><linearGradient id={uid}><stop stopColor="#526050"/><stop offset="1" stopColor="#192c25"/></linearGradient></defs>
    <polygon points={shape(square(-203,-147,410,284,-69))} fill="#c38b61" opacity=".08" />
    <g className="board-layer board-base">
      <Slab x={-204} y={-141} w={408} d={282} z={-42} depth={12} top="#615543" side="#bc875e"/>
      <Slab x={-204} y={-141} w={408} d={282} z={-27} depth={8} top="#926744" side="#7e5838"/>
    </g>
    <g className="board-layer">
      <Slab x={-204} y={-141} w={408} d={282} z={-13} depth={9} top={`url(#${uid})`} side="#4a614e"/>
      {Array.from({ length: 12 }, (_, i) => <g key={i} stroke="#bc8c64" opacity={.55 + i%3 * .15} fill="none">
        <path className="board-trace" d={trace([[-189,-109+i*19,-12],[-129,-109+i*19,-12],[-71,-70+i*11,-12],[65,-70+i*11,-12],[139,-111+i*17,-12],[186,-111+i*17,-12]])} />
        <path d={trace([[-176+i*30,-127,-12],[-176+i*30,-80,-12],[-70+i*10,-29,-12],[-70+i*10,57,-12],[-176+i*30,104,-12],[-176+i*30,128,-12]])}/>
      </g>)}
      {[-190,180].flatMap((x) => [-127,116].map(y => <polygon key={x+","+y} points={shape(square(x,y,11,11,-11))} fill="#ded2a9" stroke="#2b352b"/>))}
    </g>
    <g className="board-parts">
      {steps.slice(0,10).flatMap((i) => [-69,61].map(y => <polygon key={i+","+y} points={shape(square(-66+i*14,y,6,17,-5))} fill="#b6aea1" />))}
      {steps.slice(0,8).flatMap((i) => [-78,62].map(x => <polygon key={i+","+x} points={shape(square(x,-56+i*14,17,6,-5))} fill="#b6aea1" />))}
      <Slab x={-64} y={-61} w={128} d={122} z={7} depth={16} top="#373735" side="#292825" />
      <polygon points={shape(square(-55,-52,110,104,7.5))} fill="none" stroke="#777165" />
      <text transform="matrix(.88 .43 -.88 .43 400 261)" x="-37" y="6" fill="#d6c4b3" fontSize="20" fontFamily="monospace">MCU</text>
      {[-149,105].flatMap(x => [-92,-58,35,69].map((y,i) => <g key={x+","+y}>
        <Slab x={x} y={y} w={26} d={15} z={3+i%2*5} depth={13} top={i%2 ? "#b9a187" : "#44464b"} side="#594e40"/>
        <polygon points={shape(square(x,y,5,15,3.4+i%2*5))} fill="#acaaa1"/>
        <polygon points={shape(square(x+21,y,5,15,3.4+i%2*5))} fill="#acaaa1"/>
      </g>))}
      <Slab x={130} y={-92} w={51} d={164} z={19} depth={28} top="#585752" side="#232523"/>
      {steps.slice(0,8).map((i) => <polygon key={i} points={shape(square(141,-82+19*i,29,8,19.5))} fill="#c5ab7b"/>)}
    </g>
  </svg>;
}

export function ComponentsArt({ throughHole = false }: { throughHole?: boolean }) {
  return <svg viewBox="0 90 800 350" aria-hidden="true">
    <path d={trace([[-190,-112,-42],[190,-112,-42],[190,112,-42],[-190,112,-42],[-190,-112,-42]])} stroke="#8f897d" fill="none" strokeDasharray="4 7"/>
    {throughHole ? <>
      {[-47,46].map(x => <path className="through-lead" key={x} d={trace([[x,0,63],[x*2,0,63],[x*2,0,-72]])} fill="none" stroke="#c8beba" strokeWidth="7" />)}
      <Slab x={-52} y={-25} w={104} d={50} z={89} depth={41} top="#c19c79" side="#956d52"/>
      {[-36,-16,9,35].map((x,i) => <polygon key={x} points={shape(square(x,-25,6,50,89.4))} fill={["#994b3c","#605148","#5b4237","#c7a569"][i]}/>)}
    </> : <>
      {[-107,65].map(x => <Slab key={x} x={x} y={-39} w={42} d={78} z={-39} depth={3} top="#b78a5b" side="#866137" />)}
      <g className="smd-body"><Slab x={-98} y={-41} w={196} d={82} z={41} depth={37} top="#484746" side="#2c2b2a"/>
        {[-98,68].map(x => <Slab key={x} x={x} y={-41} w={30} d={82} z={42} depth={38} top="#bfbbb1" side="#898477" />)}
        <text transform="matrix(.88 .43 -.88 .43 400 226)" x="-28" y="6" fill="#e0d8c9" fontSize="28" fontFamily="monospace">102</text>
      </g>
    </>}
  </svg>;
}

export function Microcontroller() {
  return <svg viewBox="0 55 800 445" aria-hidden="true">
    {steps.slice(0,11).map((i) => <g key={i} fill={i%3 ? "#918b80" : "#cba47e"} stroke="#ded0be" strokeWidth=".55">
      <polygon points={shape(square(-112+i*21,-150,8,64,-2))}/><polygon points={shape(square(-112+i*21,86,8,64,-2))}/>
      <polygon points={shape(square(-150,-112+i*21,64,8,-2))}/><polygon points={shape(square(86,-112+i*21,64,8,-2))}/>
    </g>)}
    <Slab x={-116} y={-116} w={232} d={232} z={38} depth={40} top="#3b3a35" side="#24221e" />
    <polygon points={shape(square(-109,-109,218,218,38.2))} stroke="#9b9485" fill="none"/>
    <polygon points={shape(square(-95,-95,14,14,39))} fill="#c8b29c" />
    <g transform="matrix(.88 .43 -.88 .43 400 231)" fill="#ddc5ad" fontFamily="monospace"><text x="-72" y="3" fontSize="38">µCONTROL</text><text x="-73" y="34" fontSize="13" letterSpacing="2">I/O · BUS · TIMER</text></g>
    <g className="mcu-signals" fill="none" stroke="#ecbb8f" strokeWidth="1.5">
      <path d={trace([[150,-70,-2],[206,-70,-2],[221,-24,-2]])}/><path d={trace([[-61,150,-2],[-61,209,-2],[-24,226,-2]])}/><path d={trace([[-150,-69,-2],[-197,-69,-2],[-214,-101,-2]])}/>
    </g>
  </svg>;
}
