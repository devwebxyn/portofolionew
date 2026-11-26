import { useId } from "react";
import { ArtBoard } from "./Machines";
import type { ComponentKey } from "@/lib/components-catalog";

const rows=(n:number)=>Array.from({length:n},(_,i)=>i);
type Body = { kind:"axial"|"chip"|"can"|"block"|"coil"|"transformer"|"led"|"knob"|"power"|"disc"; paint:string; pins:number; mark:string; detail?:string };
const body: Record<ComponentKey,Body> = {
  r:{kind:"axial",paint:"#b69b75",pins:2,mark:"",detail:"bands"},smd:{kind:"chip",paint:"#303135",pins:2,mark:"103",detail:"ends"},
  pot:{kind:"knob",paint:"#6f7f84",pins:3,mark:"W"},ceramic:{kind:"disc",paint:"#b98362",pins:2,mark:"C",detail:"ceramic"},
  elco:{kind:"can",paint:"#343f45",pins:2,mark:"−",detail:"vent"},film:{kind:"block",paint:"#ab622f",pins:2,mark:"C · FILM"},
  coil:{kind:"coil",paint:"#b9714b",pins:2,mark:"L"},bead:{kind:"chip",paint:"#585a61",pins:2,mark:"FB",detail:"bead"},
  diode:{kind:"axial",paint:"#32333a",pins:2,mark:"",detail:"stripe"},schottky:{kind:"chip",paint:"#4e4142",pins:2,mark:"S",detail:"stripe"},
  zener:{kind:"axial",paint:"#a95e41",pins:2,mark:"",detail:"glass"},led:{kind:"led",paint:"#bf8664",pins:2,mark:"LED"},
  bjt:{kind:"disc",paint:"#393f41",pins:3,mark:"BJT",detail:"flat"},npn:{kind:"chip",paint:"#385353",pins:3,mark:"NPN",detail:"sot"},
  pnp:{kind:"can",paint:"#7e8d94",pins:3,mark:"PNP",detail:"tab"},nmos:{kind:"power",paint:"#3e464e",pins:3,mark:"N",detail:"tab"},
  pmos:{kind:"chip",paint:"#514251",pins:5,mark:"P",detail:"sot"},ic:{kind:"chip",paint:"#393e45",pins:14,mark:"IC",detail:"dip"},
  ldo:{kind:"power",paint:"#404a45",pins:3,mark:"LDO",detail:"plate"},op:{kind:"chip",paint:"#44505b",pins:8,mark:"OP",detail:"dip"},
  xfmr:{kind:"transformer",paint:"#976742",pins:4,mark:"P / S"},ct:{kind:"transformer",paint:"#aa7a54",pins:5,mark:"P / CT / S"},
  fuse:{kind:"axial",paint:"#757b80",pins:2,mark:"",detail:"fuse"},ptc:{kind:"disc",paint:"#ae8751",pins:2,mark:"PTC",detail:"flat"},
  efuse:{kind:"chip",paint:"#463b39",pins:10,mark:"eFuse",detail:"pad"},tvs:{kind:"chip",paint:"#58505b",pins:2,mark:"TVS",detail:"stripe"},
  bridge:{kind:"block",paint:"#3b4442",pins:4,mark:"~  ~  +  −"},switch:{kind:"coil",paint:"#a76e45",pins:5,mark:"SW",detail:"module"},
  power:{kind:"power",paint:"#384357",pins:3,mark:"POWER",detail:"wide"},
  mcu:{kind:"chip",paint:"#344e4f",pins:24,mark:"MCU",detail:"qfn"},memory:{kind:"chip",paint:"#45526a",pins:16,mark:"MEM",detail:"wide"},
  logic:{kind:"chip",paint:"#49464e",pins:16,mark:"LOGIC",detail:"dip"},osc:{kind:"block",paint:"#909b99",pins:4,mark:"CLK",detail:"metal"},
  crystal:{kind:"can",paint:"#a9b2b0",pins:2,mark:"XTAL",detail:"crystal"},sensor:{kind:"chip",paint:"#655e59",pins:6,mark:"SENSE",detail:"window"},
  driver:{kind:"power",paint:"#494644",pins:7,mark:"DRV",detail:"wide"},
};

function PinRow({count,y,spread=37}:{count:number;y:number;spread?:number}) {
  return <g stroke="#bdbbb0" strokeWidth="8" fill="none">{rows(count).map(i=><path key={i} d={`M${310+(i-(count-1)/2)*spread} ${y}v48l-7 15`}/>)}</g>;
}

export function SpecimenArt({id,active}:{id:ComponentKey;active:boolean}) {
  const {kind,paint,pins,mark,detail}=body[id];
  const uid=useId();
  const shaded=`url(#${uid})`;
  const banded=detail==="bands";
  const w=detail==="wide" || detail==="dip" ? 238 : detail==="ends" || detail==="bead" ? 207 : detail==="sot" ? 136 : 177;
  const left=310-w/2;
  const right=310+w/2;
  const spot=detail==="window" ? [331,152] : kind==="axial" ? [409,170] : kind==="can" ? [324,111] : kind==="transformer" ? [318,225] : kind==="knob" ? [310,66] : kind==="led" ? [282,123] : kind==="coil" ? [360,186] : [360,208];
  return <ArtBoard className={`specimen-art specimen-${kind}`}>
    <defs><linearGradient id={uid} x2=".13" y2="1"><stop stopColor="#eee1cf"/><stop offset=".25" stopColor={paint}/><stop offset=".7" stopColor={paint}/><stop offset="1" stopColor="#1c1c20"/></linearGradient></defs>
    <ellipse cx="310" cy="279" rx="207" ry="38" fill="#080a0b" opacity=".5"/>
    <g className="specimen-object">
      {kind==="axial" && <g transform="rotate(-14 310 190)">
        <path d="M47 191H573" stroke="#b9b9b6" strokeWidth="8"/><rect x="149" y="136" width="322" height="111" rx="48" fill={shaded} stroke="#d4c2ad"/>
        {banded && ["#69433b","#332c30","#9e583b","#bc9856"].map((v,i)=><path key={v} d={`M${201+i*57} 140v102`} stroke={v} strokeWidth="14"/>)}
        {["stripe","glass"].includes(detail ?? "") && <path d="M419 140v101" stroke={detail==="glass" ? "#3f3231" : "#d4d2c8"} strokeWidth="19"/>}
        {detail==="fuse" && <><rect x="188" y="149" width="244" height="84" fill="#262d35" opacity=".58"/><path d="M190 190H431" stroke="#e4b588" strokeWidth="2"/><path d="M173 150v82m274-82v82" stroke="#ccbcab" strokeWidth="30"/></>}
      </g>}
      {["chip","block","power"].includes(kind) && <>
        {kind==="power" && <><rect x="242" y="47" width="136" height="93" rx="8" fill="#858d8e" stroke="#bac4c3"/><circle cx="311" cy="79" r="17" fill="#272b2c"/></>}
        {pins>4 && kind==="chip" && <g stroke="#bbb9ae" strokeWidth={pins>=24 ? "5" : "9"}>{rows(Math.ceil(pins/2)).map(i=><path key={i} d={`M${310-w*.45+i*w*.9/Math.max(1,Math.ceil(pins/2)-1)} 109v36m0 73v37`}/>)}</g>}
        {kind!=="chip" && <PinRow count={pins} y={210} spread={kind==="power" ? 33 : 47}/>}
        {kind==="chip" && pins===3 && <><PinRow count={2} y={208}/><path d="M310 104v35" stroke="#bdbbb0" strokeWidth="9"/></>}
        {kind==="chip" && pins===2 && <path d="M${''}" fill="none"/>}
        <path d={`M${left} 139l30-25h${w}l-30 25z`} fill={paint} stroke="#a4a19b"/>
        <path d={`M${right} 139l30-25v104l-30 23z`} fill="#353838" stroke="#858785"/>
        <rect x={left} y="139" width={w} height="102" rx="1" fill={shaded} stroke="#a4a19b"/>
        <path d={`M${left+8} 147H${right-8}`} stroke="#e2d2bd" opacity=".35"/>
        {pins===2 && kind==="chip" && <path d={`M${318-w/2} 142v96m${w-16}-96v96`} stroke="#c9c3b5" strokeWidth={detail==="bead" ? "13" : "19"}/>}
        {detail==="dip" && <circle cx={326-w/2} cy="154" r="5" fill="#dfc6a8"/>}
        {detail==="window" && <circle cx="331" cy="152" r="12" fill="#d1b5a1" stroke="#f5d7b9"/>}
        {detail==="pad" && <path d="M274 222h70" stroke="#dacaaf" strokeWidth="5"/>}
      </>}
      {(kind==="can" || kind==="knob") && <>
        <PinRow count={pins} y={220} spread={45}/>
        <path d={kind==="can" && detail==="crystal" ? "M224 135H396V220Q396 247 310 247T224 220Z" : "M218 108H402V222Q402 255 310 255T218 222Z"} fill={shaded} stroke="#a09e94"/>
        <ellipse cx="310" cy={detail==="crystal" ? 135 : 108} rx="91" ry={detail==="crystal" ? 23 : 33} fill={detail==="vent" ? "#a5a5a1" : paint} stroke="#d1c8bb"/>
        {detail==="vent" && <path d="M281 98l55 19m-56 0 57-19M385 112v117" stroke="#5d6468" strokeWidth="7"/>}
        {detail==="tab" && <path d="M390 222h31v19h-32z" fill="#c4c1ba"/>}
        {kind==="knob" && <><path d="M277 64h66v40q-33 22-66 0z" fill="#b4b6ad" stroke="#747e7e"/><ellipse cx="310" cy="64" rx="33" ry="15" fill="#c1c7bf"/><path d="M282 67l48-7" stroke="#404544" strokeWidth="4"/></>}
      </>}
      {(kind==="disc" || kind==="led") && <>
        <PinRow count={pins} y={223} spread={41}/>
        <path d={kind==="led" ? "M248 215v-74a62 62 0 0 1 124 0v74l15 21H233Z" : detail==="ceramic" ? "M218 169a91 91 0 1 1 183 0 91 91 0 1 1-183 0z" : "M228 227V141a81 58 0 1 1 162 0v86Z"} fill={shaded} stroke="#ccad91" strokeWidth="2"/>
        {kind==="led" && <><path d="M280 175h57m-28 0v44m28-44 17 22v21" fill="none" stroke="#f5d1b1" strokeWidth="5"/><ellipse cx="283" cy="127" rx="15" ry="33" fill="#ffe6d3" opacity=".25" transform="rotate(29 283 127)"/></>}
      </>}
      {kind==="coil" && <>
        {detail==="module" && <path d="m130 154 324-29 39 124-324 36z" fill="#3b5152" stroke="#839187"/>}
        <PinRow count={pins} y={214} spread={43}/>
        <rect x="197" y="123" width="221" height="121" rx="31" fill="#494e52" stroke="#98999b"/>
        <g fill="none" stroke={paint} strokeWidth="12">{rows(11).map(i=><ellipse cx={225+i*16} cy="181" rx="22" ry="65" key={i}/>)}</g>
      </>}
      {kind==="transformer" && <>
        <PinRow count={pins} y={224} spread={54}/>
        <path d="M129 85h362v172H129zM171 124v98h273v-98z" fillRule="evenodd" fill="#697276" stroke="#c2c3bb" strokeWidth="2"/>
        <g stroke={paint} strokeWidth="11">{rows(21).map(i=><path key={i} d={`M${179+i*12} 122v104`}/>)}</g>
        {id==="ct" && <path d="M318 227v60h45" fill="none" stroke="#e3c587" strokeWidth="5"/>}
      </>}
      {mark && <text x="310" y={kind==="transformer" ? "187" : "193"} textAnchor="middle" className="art-label" fill="#f6e7d7">{mark}</text>}
    </g>
    {active && <g className="specimen-callout" fill="none" stroke="#eac2a0" strokeWidth="2"><circle cx={spot[0]} cy={spot[1]} r="14" /><path d={`M${spot[0]+14} ${spot[1]+3}L462 280h110`}/></g>}
  </ArtBoard>;
}

const diode="M15 42h30m0-17 34 17-34 17zM79 25v34m0-17h46";
const transistor="M15 42h39m0-22v44m0-31 48-22m-48 40 48 22";
const mosfet="M15 42h35v-22m0 22v22m17-44v44m0-41h34V9M67 63h34v12m-34-34h22";
const box="M15 42h26m0-23h58v46H41zm58 23h26";
export function Symbol({id}:{id:ComponentKey}) {
  let d=box;
  let label="";
  if (["r","smd","pot","ptc"].includes(id)) d="M15 42h25m0-12h60v24H40zm60 12h25"+(id==="pot"?"M71 82V61m-8 8 8-8 8 8":id==="ptc"?"M43 70l45-55":"");
  else if (["ceramic","elco","film"].includes(id)) {d="M15 42h43m0-21v42m18-42v42m0-21h49";if(id==="elco")label="+   −";}
  else if (["diode","schottky","zener","tvs","led"].includes(id)) d=diode+(id==="led"?"M69 21l18-14m-7 2 7-2-1 7M85 20 103 6m-7 2 7-2-1 7":id==="schottky"?"M79 25h8v9m-8 25h-8v-9":id==="zener"||id==="tvs"?"M79 25l8-6m-8 40-8 6":"");
  else if (["bjt","npn","pnp"].includes(id)) d=transistor+(id==="pnp"?"M76 61l-4-11 12 3":"M86 61l11 10-14-1");
  else if (["nmos","pmos","power"].includes(id)) {d=mosfet+(id==="pmos"?"M85 35l-8 6 8 6":"M78 35l8 6-8 6");label="G   D   S";}
  else if (["coil","bead","xfmr","ct"].includes(id)) d=["xfmr","ct"].includes(id) ? "M18 15h33q20 4 0 15 20 4 0 15 20 4 0 15h-33m51-48v53m7-53v53m50-50H94q-20 4 0 15-20 4 0 15-20 4 0 15h32"+(id==="ct"?"M94 37h32":"") : "M15 42h26q7-24 15 0 7-24 15 0 7-24 15 0 7-24 15 0h24"+(id==="bead"?"M44 65l51-49":"");
  else if (id==="fuse") d="M15 42h26m0-13h58v26H41zm0 13h84";
  else if (id==="op") {d="M15 27h30m-30 29h30m0-45 60 31-60 31zM105 42h20";label="−   +";}
  else if (id==="crystal") d="M15 42h34m0-16v32m11-39h20v46H60zm31 7v32m0-16h34";
  else if (id==="bridge") {d="M70 12 114 42 70 72 26 42zM15 42h11m88 0h11M70 3v9m0 60v9";label="~   +   −";}
  else label=body[id].mark;
  return <svg viewBox="0 0 140 103" aria-label="Simbol skematik konseptual" role="img"><path d={d} stroke="currentColor" strokeWidth="2" fill="none" /><text x="70" y="96" textAnchor="middle" fill="currentColor" fontSize="11" fontFamily="monospace">{label}</text></svg>;
}
