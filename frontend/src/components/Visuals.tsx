import { useId } from "react";

export function Signal() {
  return <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true"><rect x=".5" y=".5" width="25" height="25" rx="5" stroke="currentColor" opacity=".55"/><path d="M4 13h4l3-6 4 12 3-6h4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round"/></svg>;
}

type Pose = "home" | "about" | "journey" | "electronics" | "systems" | "ai" | "contact" | "empty";
const captions: Record<Pose, string> = {
  home: "Ilustrasi meja kerja dengan maskot bermonitor, papan rangkaian, dan pendamping AI.",
  about: "Maskot laboratorium menyapa dari meja kerja.",
  journey: "Maskot melambaikan tangan di atas papan rangkaian.",
  electronics: "Maskot memegang besi solder di atas papan rangkaian.",
  systems: "Maskot mengamati lapisan chip yang terangkat dari papan.",
  ai: "Maskot mengamati pendamping AI yang melayang di dekatnya.",
  contact: "Maskot melambaikan tangan di samping ikon pesan.",
  empty: "Maskot laboratorium sedang menunggu.",
};

const vias = [[147,354],[175,372],[197,397],[322,453],[355,453],[374,445],[499,375],[517,359],[541,337],[499,319],[466,301],[434,290],[130,345],[159,335],[323,296],[347,302],[217,404],[243,415]];
const tracks = [
  "125 344 166 344 225 375 287 375 322 395 364 395 398 414 440 392 475 392 516 367",
  "154 361 177 361 226 387 275 387 321 411 361 411 399 431 479 387 500 387",
  "189 380 212 380 248 403 277 403 321 425 350 425 381 442",
  "239 412 273 412 319 436 346 436 366 448",
  "169 338 233 338 273 313 317 313 350 295 379 295 410 311 456 311 492 331 536 331",
  "372 305 391 319 440 319 482 342 552 342",
  "402 328 434 328 466 352 515 352 542 368",
  "286 363 347 363 367 351 418 351 448 370 501 370",
  "226 357 278 357 300 338 338 338",
];

function Star({ x, y, size = 11 }: { x: number; y: number; size?: number }) {
  return <path d={`M${x - size} ${y}h${2 * size}m${-size} ${-size}v${2 * size}`} />;
}

export function Workbench({ pose = "home" }: { pose?: Pose }) {
  const id = useId();
  const ref = (part: string) => `url(#${id}-${part})`;
  const wave = ["contact", "about", "journey"].includes(pose);
  const ai = ["home", "ai", "about"].includes(pose);

  return (
    <div className={`workbench workbench-${pose}`}>
      <svg viewBox="0 0 640 510" role="img" aria-label={captions[pose]} className="workbench-svg">
        <defs>
          <linearGradient id={id + "-board"} x2=".7" y2="1">
            <stop stopColor="#516d45"/><stop offset=".55" stopColor="#2b4738"/><stop offset="1" stopColor="#20362e"/>
          </linearGradient>
          <linearGradient id={id + "-shell"} x2=".75" y2="1">
            <stop stopColor="#e8eadb"/><stop offset=".49" stopColor="#a8b5a0"/><stop offset="1" stopColor="#64786c"/>
          </linearGradient>
          <linearGradient id={id + "-depth"} x2=".65" y2="1">
            <stop stopColor="#8ea68c"/><stop offset="1" stopColor="#455c50"/>
          </linearGradient>
          <linearGradient id={id + "-glass"} x2=".8" y2="1">
            <stop stopColor="#294233"/><stop offset=".6" stopColor="#152a23"/><stop offset="1" stopColor="#0e1916"/>
          </linearGradient>
          <linearGradient id={id + "-puck"} x2=".45" y2="1">
            <stop stopColor="#ddd0ff"/><stop offset="1" stopColor="#645787"/>
          </linearGradient>
          <pattern id={id + "-grid"} width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0v28" fill="none" stroke="#a4b69c" strokeOpacity=".11"/>
          </pattern>
          <radialGradient id={id + "-halo"}>
            <stop stopColor="#849d72" stopOpacity=".27"/><stop offset="1" stopColor="#849d72" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <rect x="21" y="24" width="598" height="447" fill={ref("grid")}/>
        <ellipse cx="344" cy="282" rx="311" ry="235" fill={ref("halo")}/>
        <g fill="none" stroke="#899888" strokeWidth="1" opacity=".55">
          <path d="M23 72V24h48m500 0h48v48M23 424v47h48m500 0h48v-47"/>
          <path d="M51 298h48l36-36h52m348-35h37l24-24v-26M155 412l-31 23H68m435-81h68l23 24"/>
          <circle cx="51" cy="298" r="3"/><circle cx="68" cy="435" r="3"/><circle cx="595" cy="378" r="3"/>
          <circle cx="339" cy="231" r="154" strokeDasharray="3 6"/><circle cx="339" cy="231" r="189" strokeDasharray="1 9"/>
        </g>
        <g stroke="#d9f695" strokeWidth="1.4" fill="none">
          <Star x={174} y={139} size={14}/><Star x={558} y={238} size={8}/><Star x={111} y={235} size={7}/>
          <circle cx="183" cy="82" r="3"/><circle cx="512" cy="63" r="2"/>
        </g>
        <g fill="#abb6a3" fontFamily="monospace" fontSize="12" letterSpacing="1.7">
          <text x="38" y="48">MEJA KERJA</text>
          <text x="38" y="459">SIB / PCB</text><text x="601" y="459" textAnchor="end">TAMPAK ISOMETRIK</text>
        </g>
        <path d="M97 368 307 255l261 80 30 43-210 110-79 4z" fill="#090f0c" opacity=".45"/>
        <path d="M77 341v24l300 116 198-108v-24L279 242z" fill="#192923" stroke="#70836b" strokeWidth="1.5"/>
        <path d="m77 341 300 117v23L77 365z" fill="#31473d" stroke="#82977c"/>
        <path d="m377 458 198-109v24L377 481z" fill="#263733" stroke="#596f60"/>
        <path d="M77 341 278 234l297 115-198 109z" fill={ref("board")} stroke="#a9bb91" strokeWidth="2"/>
        <path d="m92 341 187-98 279 107-181 99z" fill="none" stroke="#9cb58a" strokeOpacity=".54"/>
        <g fill="none" stroke="#a5be77" strokeWidth="1.6" opacity=".65">{tracks.map((points) => <polyline key={points} points={points}/>)}</g>
        <g fill="none" stroke="#e5fd94" strokeWidth="2.1" strokeLinecap="round">
          <polyline className="circuit-pulse" points={tracks[0]} pathLength="100"/>
          <polyline className="circuit-pulse circuit-delay" points={tracks[4]} pathLength="100"/>
        </g>
        <g fill="#293934" stroke="#ccdc9b" strokeWidth="1.3">
          {vias.map(([x,y]) => <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="3.8" ry="2.2"/>)}
          {[[106,343],[278,249],[548,349],[376,441]].map(([x,y]) => <ellipse key={x} cx={x} cy={y} rx="8" ry="4.6"/>)}
        </g>
        <g transform="translate(415 340)">
          <path d="m-14 19 59-29 65 24-57 31z" fill="#18251f" opacity=".75"/>
          <path d="m0 12 43-23 57 21-43 24z" fill="#607362" stroke="#b8c7a6"/>
          <path d="m9 10 36-19 46 17-35 20z" fill="#333f39" stroke="#c2c6a7"/>
          <path d="m23 9 23-12 28 10-22 13z" fill="#86977b" stroke="#c9d3ae"/>
          <path d="M25 22l-8 5m19-1-8 5m19-1-8 5m19-1-8 5m15-10 12 4m-3-9 12 4m-3-9 12 4m-3-9 12 4" stroke="#c3c6a6" strokeWidth="2.6"/>
        </g>
        <g fill="#bbc4a4" stroke="#273930" strokeWidth="2">
          <path d="m160 330 13-7 23 8-13 7z"/><path d="m179 320 13-7 23 8-13 7z"/>
          <path d="m198 310 13-7 23 8-13 7z"/><path d="m209 350 12-7 23 8-12 7z"/>
        </g>
        <g className="mascot-shift">
          <ellipse cx="315" cy="359" rx="108" ry="35" fill="#16251f" opacity=".65"/>
          <path d="M240 335c-14 4-23 13-20 24 3 9 19 12 39 8l39-11-11-25z" fill="#879b83" stroke="#d1d9bf" strokeWidth="2"/>
          <path d="M330 340c-8 10-5 23 4 30 8 6 24 6 43 0l19-6c11-5 10-16-1-23l-22-15z" fill="#667e70" stroke="#b7c8ab" strokeWidth="2"/>
          <path d="M242 260 304 247l86 30-1 46c-2 18-10 26-25 30l-71 16c-20 4-46-6-52-20z" fill={ref("depth")} stroke="#c8d6b8" strokeWidth="2"/>
          <path d="m251 273 96 11 6 53-64 17-35-13z" fill={ref("shell")} stroke="#c8d6b8"/>
          <path d="M278 311h8l6-9 8 15 6-8h13" stroke="#324b40" strokeWidth="2.7" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M362 310c18 20 31 24 46 15" fill="none" stroke="#161f1b" strokeWidth="19" strokeLinecap="round"/>
          <path d="M362 310c18 20 31 24 46 15" fill="none" stroke="#adbfaa" strokeWidth="13" strokeLinecap="round"/>
          <circle cx="409" cy="324" r="10" fill="#d1d6bd" stroke="#4c6557" strokeWidth="3"/>
          {wave ? <g className="mascot-wave" transform="rotate(0 249 303)">
            <path d="M253 307c-28 5-57-12-64-41" stroke="#182a23" strokeWidth="19" fill="none" strokeLinecap="round"/>
            <path d="M253 307c-28 5-57-12-64-41" stroke="#adc0a4" strokeWidth="13" fill="none" strokeLinecap="round"/>
            <path d="m181 263-10-13m14 10-3-17m6 16 6-14" stroke="#d3dcc4" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="187" cy="264" r="8" fill="#c5d4b9"/>
          </g> : <g>
            <path d="M245 305c-20 16-26 22-39 25" stroke="#182a23" strokeWidth="19" fill="none" strokeLinecap="round"/>
            <path d="M245 305c-20 16-26 22-39 25" stroke="#adc0a4" strokeWidth="13" fill="none" strokeLinecap="round"/>
            <circle cx="202" cy="331" r="10" fill="#ced8be" stroke="#53685d" strokeWidth="3"/>
            {pose === "electronics" && <path d="m193 313 24 41-3 14-25-38z" fill="#dafa8c" stroke="#17241d" strokeWidth="3"/>}
          </g>}
          <g transform="rotate(-18 358 118)" stroke="#ccdbbe" strokeWidth="3">
            <path d="M358 121V88" /><circle cx="358" cy="85" r="6" fill="#e6f8a0" />
          </g>
          <path d="M226 131 310 111q13-3 29 2l58 23q16 6 15 27l-3 77q0 19-14 26l-38 21-116-17z" fill={ref("depth")} stroke="#ccdabd" strokeWidth="2"/>
          <path d="m241 127 78-15 76 25-59 14z" fill="#c4d1b6" stroke="#dce6ca"/>
          <path d="m358 154 49-14-2 26-43 17z" fill="#8da490"/>
          <path d="M225 133q-27 4-26 36l5 76q2 24 25 31l103 18q35 6 39-25l4-89q2-30-24-37z" fill={ref("shell")} stroke="#e2e8d1" strokeWidth="2.5"/>
          <path d="M228 154q-17 3-16 21l5 62q1 18 20 23l95 17q23 4 25-17l4-76q1-17-18-22z" fill="#374a40" stroke="#748d78" strokeWidth="2"/>
          <path d="M231 161q-13 2-12 16l4 58q1 14 17 17l90 17q17 3 19-14l4-67q1-14-15-18z" fill={ref("glass")} stroke="#172d25" strokeWidth="2"/>
          <path d="M227 181l116 10m-115 6 114 12m-113 6 112 13m-110 6 109 16" stroke="#d8f696" strokeWidth="1" opacity=".1"/>
          <g className="mascot-eyes" stroke="#e0fb95" strokeWidth="6" strokeLinecap="round" fill="none">
            {pose === "empty" ? <path d="m246 206 16 2m44 6 16 2"/> : <path d="M247 207q8-16 17 2m41 6q9-16 18 2"/>}
          </g>
          <path d="M277 223q9 11 19 2" fill="none" stroke="#e0fb95" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="m382 193 13-7m-13 15 13-7m-13 15 13-7m-13 15 13-7m-13 15 13-7" stroke="#3a5147" strokeWidth="2.6" strokeLinecap="round"/>
          <circle cx="228" cy="259" r="2" fill="#d9fa8e"/>
        </g>
        {ai && <g className="companion-orbit">
          <ellipse cx="476" cy="136" rx="72" ry="29" transform="rotate(-26 476 136)" fill="none" stroke="#baacec" strokeOpacity=".65"/>
          <ellipse cx="476" cy="136" rx="60" ry="53" fill="#b29deb" fillOpacity=".10" stroke="#bcadeb" strokeDasharray="3 6" strokeOpacity=".55"/>
          <circle cx="476" cy="136" r="35" fill={ref("puck")} stroke="#e4daff" strokeWidth="1.6"/>
          <circle cx="476" cy="136" r="26" fill="#2a253a" stroke="#e4daff" strokeWidth="1.4"/>
          <path d="M461 138h6l5-10 6 15 4-7h8" fill="none" stroke="#d8caff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="530" cy="113" r="4.5" fill="#dfd0ff"/>
          <path d="M508 154q26-11 38-38" fill="none" stroke="#dfd0ff" strokeOpacity=".5"/>
        </g>}
        {pose === "contact" && <g transform="translate(452 116)" fill="none" stroke="#ddcef9" strokeWidth="2"><rect width="66" height="45" rx="7" fill="#393148"/><path d="m2 5 31 22L64 5"/><Star x={73} y={-9} size={8}/></g>}
        {pose === "systems" && <g className="companion-orbit" transform="translate(440 230)" stroke="#c8b6f1" strokeWidth="1.6" fill="#393346"><path d="m0 31 38-21 51 18-38 22z" /><path d="m0 12 38-21 51 18-38 22z"/><path d="m0-7 38-21L89-10 51 12z"/></g>}
      </svg>
    </div>
  );
}

export function BoardDiagram({ active = 0 }: { active?: number }) {
  const positions = [[104,104],[294,96],[203,192],[365,190]];
  return <svg viewBox="0 0 460 285" role="img" aria-label="Ilustrasi konseptual PCB dengan empat area kerja">
    <rect x="22" y="20" width="416" height="245" rx="12" fill="#263d34" stroke="#86a184" strokeWidth="2"/>
    <g fill="#15241e" stroke="#bac9a2" strokeWidth="2">
      {[[43,41],[417,41],[43,244],[417,244]].map(([x,y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="7"/>)}
    </g>
    <g fill="none" stroke="#9ab982" strokeWidth="2">
      <path d="M70 118h93l28 28h66l37-37h87v60m-306-25h79l29 28h97l29-30h50m-277-59h83l42 37h46l35-38h75m-282 122h55l31-31m69 38h53l24-24h60"/>
      <path d="M55 182h85l24-24m79 97v-40l37-30h88l38 42"/>
    </g>
    <g fill="#dad5b3" stroke="#11251c" strokeWidth="2">
      <path d="M81 92h49v28H81zM275 78h39v36h-39zM173 169h61v44h-61zM342 174h46v35h-46z"/>
      <path d="M88 62h17v12H88zm28 0h17v12h-17zm46 21h13v14h-13zm151 140h34v8h-34zM62 152h20v13H62z"/>
    </g>
    <g fill="#38493b" stroke="#e4dfbc" strokeWidth="1.3"><rect x="180" y="176" width="47" height="30" rx="2"/><path d="M288 86v19m10-19v19m9-19v19m44 77h28m-28 8h28m-28 8h28"/></g>
    {positions.map(([x,y],i) => <g className={active === i ? "diagram-point diagram-active" : "diagram-point"} key={x}>
      <circle cx={x} cy={y} r="26" fill="#dcfa91" fillOpacity=".15" stroke="#dcfa91" strokeWidth="1.5"/>
      <circle cx={x} cy={y} r="14" fill="#dcfa91"/><text x={x} y={y + 4} textAnchor="middle" fontFamily="monospace" fontSize="12" fontWeight="bold" fill="#17221b">{i + 1}</text>
    </g>)}
  </svg>;
}

export function ChipDiagram({ active = 0 }: { active?: number }) {
  const labels = ["Aplikasi", "Sistem operasi", "Memori", "Perangkat keras"];
  const fills = ["#b4a4d4", "#8276a0", "#526d63", "#314b40"];
  return <svg viewBox="0 0 480 320" role="img" aria-label="Ilustrasi berlapis dari aplikasi hingga perangkat keras">
    <path d="M110 32v220m108-170v219m108-251v213" stroke="#8f9d87" strokeDasharray="4 7" fill="none"/>
    {[...labels].reverse().map((label, index) => {
      const i = labels.length - 1 - index;
      return <g className={i === active ? "chip-layer chip-active" : "chip-layer"} transform={`translate(0 ${i * 57})`} key={label}>
        <path d="M109 49v8l109 48 110-49v-7l-110-47z" fill="#202d28" stroke="#889984"/>
        <path d="m110 49 108-47 109 47-109 48z" fill={fills[i]} stroke="#d6d8bb" strokeWidth="1.5"/>
        <path d="m160 49 58-25 59 25-59 26z" fill="none" stroke="#171c19" strokeOpacity=".75" strokeWidth="1.6"/>
        <path d="m180 49 38-16 39 16-39 17z" fill="#242e2a" fillOpacity=".75"/>
        <path d="m327 49 21-11h104" fill="none" stroke="#b6c5a6"/>
        <text x="355" y="28" fill="#e2e6d7" fontFamily="monospace" fontSize="11">{label}</text>
      </g>;
    })}
  </svg>;
}
