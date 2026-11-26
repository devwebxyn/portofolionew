"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArtBoard } from "./Machines";
import { SignalDiagram } from "./Diagrams";
import { channelOn, fuseState, gates, logic, ohm, protection, rc, rectified, solenoid, transformer, type Gate, type Protection } from "@/lib/circuit-models";

function Range({label,value,min,max,step=1,unit,set}:{label:string;value:number;min:number;max:number;step?:number;unit:string;set:(value:number)=>void}) {
  return <label className="lab-range"><span>{label} <output>{value} {unit}</output></span><input type="range" min={min} max={max} step={step} value={value} onChange={e=>set(Number(e.target.value))}/></label>;
}
function Toggle({on,change,children}:{on:boolean;change:()=>void;children:ReactNode}) {
  return <button type="button" className="action action-outline lab-toggle" aria-pressed={on} onClick={change}>{children}</button>;
}
function Bench({art,children,results,note,announce=true}:{art:ReactNode;children:ReactNode;results:ReactNode;note:string;announce?:boolean}) {
  return <div className="lab-bench" data-scene><div className="lab-display">{art}<span className="signal-label">Model virtual · konseptual</span></div><div className="lab-readout"><div className="lab-inputs">{children}</div><div className="lab-results" aria-live={announce ? "polite" : "off"}>{results}</div><p>{note}</p></div></div>;
}
function Circuit({voltage="5 V",label="BEBAN",on=true,extra,brightness=1}:{voltage?:string;label?:string;on?:boolean;extra?:ReactNode;brightness?:number}) {
  return <ArtBoard className="circuit-art">
    <path d="M111 219v64h397V104H111v62" fill="none" stroke="#62766e" strokeWidth="3"/>
    <path d="M78 168h66m-49 26h33" stroke="#d2c3a6" strokeWidth="3" />
    <path d="M111 194v28" stroke="#62766e" strokeWidth="3"/>
    <rect x="250" y="78" width="120" height="52" fill={on ? "#625243" : "#31353a"} stroke="#b5a694"/>
    <text x="310" y="111" textAnchor="middle" fill="#e9dac7" className="art-label">{label}</text>
    <text x="53" y="233" fill="#e9dac7" className="art-label">{voltage}</text>
    {on && <path className="current-flow" style={{opacity:brightness}} d="M111 166v-62h130m137 0h130v179H111v-76" fill="none" stroke="#eabe92" strokeWidth="4" strokeLinecap="round" strokeDasharray="3 15"/>}
    {extra}
  </ArtBoard>;
}
function Plot({curves,marker,caption}:{curves:{color:string;fn:(x:number)=>number}[];marker?:[number,number];caption:string}) {
  const coords=(x:number,y:number) => [62+x*505,194-y*104];
  return <ArtBoard className="lab-plot">
    <rect x="29" y="37" width="564" height="289" fill="#172824" stroke="#536b61"/>
    {[91,142,194,246,298].map(y=><path key={y} d={`M62 ${y}h505`} stroke="#7d9a83" strokeOpacity={y===194 ? .65 : .22}/>)}
    {[62,163,264,365,466,567].map(x=><path key={x} d={`M${x} 77v232`} stroke="#7d9a83" strokeOpacity=".22"/>)}
    {curves.map(({color,fn},i)=><polyline className="plot-curve" pathLength="1" key={i} points={Array.from({length:101},(_,i)=>coords(i/100,fn(i/100)).join(",")).join(" ")} stroke={color} strokeWidth="3" fill="none"/>)}
    {marker && <circle cx={coords(...marker)[0]} cy={coords(...marker)[1]} r="7" fill="#fbd7a9" stroke="#383a35"/>}
    <text x="57" y="62" className="art-label" fill="#d3e1d1">{caption}</text>
    <text x="515" y="350" className="art-label" fill="#d3e1d1">WAKTU</text>
  </ArtBoard>;
}
const f=(n:number,max=2)=>new Intl.NumberFormat("id-ID",{maximumFractionDigits:max}).format(n);

function Dc() {
  const [v,sv]=useState(5),[r,sr]=useState(100);
  const {amps,watts}=ohm(v,r);
  return <Bench art={<Circuit voltage={v+" V"} label={r+" Ω"} on={v>0} brightness={Math.min(1,.27+amps*4)} />} results={<><strong>{f(amps*1000)} mA</strong><span>{f(watts*1000)} mW</span></>} note="I = V/R dan P = V²/R. Model sumber DC serta resistor ideal. Skala cahaya hanya membantu membaca perubahan.">
    <Range label="Tegangan" value={v} min={0} max={12} unit="V" set={sv}/><Range label="Resistansi" value={r} min={20} max={1000} step={20} unit="Ω" set={sr}/>
  </Bench>;
}
function Rc() {
  const [r,sr]=useState(1),[c,sc]=useState(100),[time,st]=useState(0.1),[discharge,sd]=useState(false);
  const [running,setRunning]=useState(false);
  const playControl=useRef<HTMLButtonElement>(null);
  const tau=r*1000*c*1e-6;
  const windowSeconds=5*tau;
  useEffect(()=>{
    if (!running) return;
    let frame=0;
    const start=performance.now();
    const bench=playControl.current?.closest(".lab-bench");
    let last=0;
    function tick(now:number) {
      const progress=Math.min(1,(now-start)/2200);
      if (document.hidden || (bench?.hasAttribute("data-seen") && !bench.hasAttribute("data-onscreen"))) {
        setRunning(false);
        return;
      }
      if (now-last>40 || progress===1) {
        st(progress*windowSeconds);
        last=now;
      }
      if (progress<1) frame=requestAnimationFrame(tick);
      else setRunning(false);
    }
    frame=requestAnimationFrame(tick);
    return ()=>cancelAnimationFrame(frame);
  },[running,windowSeconds]);
  const position=Math.min(time,windowSeconds);
  const voltage=rc(5,position,r*1000,c*1e-6,discharge);
  return <Bench announce={!running} art={<Plot curves={[{color:"#c8ebc1",fn:x=>rc(1,x*windowSeconds,r*1000,c*1e-6,discharge)}]} marker={[position/windowSeconds,voltage/5]} caption="Vc · SKALA 0–5 V" />} results={<><strong>{f(voltage)} V</strong><span>τ = {f(tau,3)} s · {f(c*voltage**2/2)} µJ</span></>} note="Kurva ideal mengisi dari 0 V atau mengosongkan dari 5 V. Grafik mencakup 0–5τ. Geser waktu untuk melihat tegangan dan energi tersimpan.">
    <Range label="Resistansi" value={r} min={1} max={10} unit="kΩ" set={sr}/><Range label="Kapasitansi" value={c} min={100} max={500} step={100} unit="µF" set={sc}/><Range label="Waktu" value={Number(position.toFixed(4))} min={0} max={windowSeconds} step={windowSeconds/100} unit="s" set={value=>{setRunning(false);st(value);}}/><Toggle on={discharge} change={()=>{setRunning(false);sd(!discharge);st(0);}}>Pengosongan</Toggle><button ref={playControl} type="button" className="action action-solid" onClick={()=>{
      if (running) {setRunning(false);return;}
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) st(windowSeconds);
      else {st(0);setRunning(true);}
    }}>{running?"Jeda waktu":"Jalankan kurva"}</button>
  </Bench>;
}
function Coil() {
  const [current,setCurrent]=useState(.5),[turns,setTurns]=useState(60);
  const field=solenoid(current,turns,.15);
  return <Bench art={<ArtBoard className="coil-lab">
    <rect x="148" y="118" width="318" height="134" rx="45" fill="#343f47" stroke="#889d9e"/>
    {Array.from({length:9},(_,i)=><ellipse key={i} cx={165+i*33} cy="186" rx="34" ry="71" fill="none" stroke="#b17c51" strokeWidth="11"/>)}
    {field!==0 && <g className="field-lines" fill="none" stroke="#c3ebd6" strokeWidth={Math.min(4,1+Math.abs(field)*1200)}>
      <path d="M88 186h430m-23-11 23 11-23 11M492 157C508 16 113 16 125 157M125 213C115 350 507 350 490 213" transform={current<0 ? "translate(620 0) scale(-1 1)" : undefined}/>
    </g>}
    <text x="172" y="328" className="art-label" fill="#e0c8ad">KUMPARAN · INTI UDARA</text>
  </ArtBoard>} results={<strong>{f(field*1000,3)} mT</strong>} note="Pendekatan di pusat solenoid panjang berinti udara, B ≈ μ₀NI/ℓ, dengan panjang 15 cm. Garis medan ilustratif dan tidak menunjukkan distribusi spasial hasil solver.">
    <Range label="Arus bertanda" value={current} min={-2} max={2} step={.1} unit="A" set={setCurrent}/><Range label="Jumlah lilitan" value={turns} min={20} max={200} step={10} unit="lilitan" set={setTurns}/>
  </Bench>;
}
function Transformer() {
  const [turns,setTurns]=useState(50),[tap,setTap]=useState(false);
  const volts=transformer(6,100,turns,tap);
  return <Bench art={<ArtBoard className="transformer-lab">
    <path d="M125 55h370v176H125zM159 86v110h301V86z" fill="#718085" fillRule="evenodd" stroke="#a6b6b1"/>
    <g className="flux-loop" fill="none" stroke="#dce1bc" strokeWidth="3" strokeDasharray="6 8"><rect x="140" y="68" width="342" height="147" rx="6"/></g>
    {Array.from({length:12},(_,i)=><path key={i} d={`M${177+i*22} 77v128`} stroke={i<6 ? "#bb825c" : "#a08fb2"} strokeWidth="12"/>)}
    {tap && <path d="M397 206v49h67" fill="none" stroke="#eec19b" strokeWidth="3"/>}
    <path d="M49 295q25-30 50 0t50 0t50 0t50 0" stroke="#e4b784" strokeWidth="2" fill="none"/>
    <path d={`M350 295q23 ${-volts*5} 46 0t46 0t46 0t46 0`} stroke="#baa7d5" strokeWidth="2" fill="none"/>
    {tap&&<path d={`M350 295q23 ${volts*5} 46 0t46 0t46 0t46 0`} stroke="#90c7b2" strokeWidth="2" fill="none"/>}
    <g className="art-label" fill="#e0c8ad"><text x="49" y="346">PRIMER</text><text x="350" y="346">{tap?"DUA FASE TERHADAP CT":"SEKUNDER"}</text></g>
  </ArtBoard>} results={<><strong>{f(volts)} V RMS</strong><span>{tap ? "Per separuh lilitan terhadap CT" : "Tegangan sekunder penuh"}</span></>} note="Model virtual 6 V RMS dengan 100 lilitan primer. Rasio ideal Vs/Vp = Ns/Np. Tap tengah membagi tegangan sekunder penuh menjadi dua besar tegangan yang sama dan fase berlawanan.">
    <Range label="Lilitan sekunder penuh" value={turns} min={20} max={200} step={10} unit="lilitan" set={setTurns}/><Toggle on={tap} change={()=>setTap(!tap)}>Tap tengah</Toggle>
  </Bench>;
}
function BridgePath({forward,bridge,idle}:{forward:boolean;bridge:boolean;idle:boolean}) {
  const lines=bridge ? ["M93 92l144-55h145l145 55","M93 92l144 55h145l145-55"] : ["M93 92h434"];
  return <svg className="bridge-path" viewBox="0 15 620 155" aria-hidden="true">
    {lines.map((d,i)=><g key={i}><path d={d} stroke="#718579" strokeWidth="2" fill="none"/>
      {!idle && (bridge ? (forward ? i===0 : i===1) : forward) && <path className="data-sweep" d={d} stroke="#eec495" pathLength="1" strokeWidth="3" fill="none"/>}
    </g>)}
    <g fill="#cbded2" className="art-label"><text x="45" y="96">AC</text><text x="534" y="96">DC</text><text x="252" y="33">{bridge?"D1 · BEBAN · D4":"DIODA"}</text>{bridge&&<text x="250" y="144">D2 · BEBAN · D3</text>}</g>
  </svg>;
}

function Rectifier() {
  const [bridge,setBridge]=useState(true),[phase,setPhase]=useState(90);
  const rad=phase*Math.PI/180;
  const output=rectified(rad,5,bridge);
  const idle=Math.abs(Math.sin(rad))<1e-9;
  const forward=Math.sin(rad)>0;
  return <Bench art={<><BridgePath forward={forward} bridge={bridge} idle={idle}/><Plot curves={[{color:"#857aa6",fn:x=>Math.sin(x*Math.PI*4)},{color:"#bde5cc",fn:x=>rectified(x*Math.PI*4,1,bridge)}]} marker={[phase/720,output/5]} caption="MASUKAN AC · KELUARAN IDEAL" /><div className="diode-path" data-forward={forward}>{idle ? "Titik nol · arus nol" : bridge ? forward ? "Jalur D1 → beban → D4" : "Jalur D2 → beban → D3" : forward ? "Dioda bias maju" : "Dioda bias balik"}</div></>} results={<strong>{f(output)} V</strong>} note="Sumber sinus virtual 5 V puncak. Dioda ideal mengabaikan drop maju; keluaran jembatan ialah |Vin|. Label D1–D4 menunjukkan pasangan konseptual; pada zero crossing arus nol.">
    <Range label="Fase" value={phase} min={0} max={360} unit="°" set={setPhase}/><Toggle on={bridge} change={()=>setBridge(!bridge)}>Jembatan empat dioda</Toggle>
  </Bench>;
}
function Mosfet() {
  const [p,sp]=useState(false),[vg,sg]=useState(0);
  const vs=p?5:0;
  const on=channelOn(vg,vs,p);
  return <Bench art={<Circuit on={on} label={p?"KANAL P":"KANAL N"} extra={<g className="art-label" fill="#d5c8d9"><text x="188" y="91">{p?"S":"D"}</text><text x="406" y="91">{p?"D":"S"}</text><path className="gate-motion" d="M310 137v60h-54" stroke="#c5b5cc" strokeWidth="2" fill="none"/><text x="209" y="203">G</text></g>} />} results={<><strong>{on?"Kanal aktif":"Kanal mati"}</strong><span>VGS = {vg-vs} V</span></>} note="Model sakelar enhancement ideal dengan ambang contoh ±2 V. VGS ialah VG − VS. Ambang nyata menandai awal konduksi dan tidak menjamin MOSFET menghantar penuh.">
    <Range label="Tegangan gate" value={vg} min={0} max={5} unit="V" set={sg}/><Toggle on={p} change={()=>sp(!p)}>Kanal P sisi atas</Toggle>
  </Bench>;
}
const faultSteps:Protection[]=["normal","short","detect","isolate"];
function Protect() {
  const [step,setStep]=useState(0);
  const {isolated,detection,shorted,gate}=protection(faultSteps[step]);
  const captions=["Operasi normal","Hubung singkat virtual","Arus lebih terdeteksi","Beban terisolasi"];
  return <Bench art={<Circuit voltage="5 V" on={!isolated} label="P-MOSFET" extra={<g className="art-label" fill="#d9c5ad">
    <path d="M372 62h-26m-11 0h-85m85-8v16m19-16-19 8 19 8z" stroke="#edd3a3" fill="none"/><text x="257" y="46">BODY DIODE ←</text>
    <path className={detection?"fault-signal":undefined} d="M488 168H381l-75-37m182 37v65" fill="none" stroke={detection?"#f2a095":"#727e74"} strokeWidth="2"/><text x="353" y="201">SENSE · KONTROL</text>
    {shorted&&<path className="fault-signal" d="M508 188v95" stroke="#f2a095" strokeWidth="5"/>}
  </g>} />} results={<><strong>{captions[step]}</strong><span>Gate {gate} V · VGS {gate-5} V · kanal {isolated?"mati":"aktif"}</span></>} note="Sensor arus dan pengendali terpisah membaca arus lebih lalu menaikkan gate hingga setara source. Pada orientasi ini body diode dapat menghantar dari beban kembali ke catu, sehingga isolasi hanya untuk aliran maju. Reset manual mengasumsikan gangguan disingkirkan.">
    <button className="action action-solid" type="button" disabled={step===3} onClick={()=>setStep(step+1)}>{["Simulasikan hubung singkat","Deteksi arus lebih","Isolasi beban","Beban terisolasi"][step]}</button><button type="button" className="action action-outline" onClick={()=>setStep(0)}>Hilangkan gangguan dan reset</button>
  </Bench>;
}
function Fuse() {
  const [electronic,se]=useState(false),[step,ss]=useState(0);
  const {conducting,text}=fuseState(electronic?"efuse":"fuse",step>0,step===2);
  return <Bench art={<Circuit on={conducting} brightness={electronic&&step===1?.5:1} label={electronic?"eFUSE":"SEKRING"} extra={step>0?<text x="292" y="237" fill="#f2a99d" className="art-label fault-signal">{step===1?"ARUS LEBIH":"JALUR TERBUKA"}</text>:undefined}/>} results={<strong>{text}</strong>} note="Sekring meleleh sesuai hubungan arus dan waktu. eFuse contoh membatasi arus lalu mengisolasi beban. Kurva termal, batas waktu, dan skema restart bergantung pada perangkat.">
    <Toggle on={electronic} change={()=>{se(!electronic);ss(0);}}>Mode eFuse</Toggle><button className="action action-solid" type="button" disabled={step===2} onClick={()=>ss(step+1)}>{step===0?"Picu arus lebih":"Lanjut ke pemutusan"}</button><button className="action action-outline" type="button" onClick={()=>ss(0)}>{electronic?"Hilangkan gangguan dan reset":"Ganti sekring virtual"}</button>
  </Bench>;
}
function Bjt() {
  const [p,sp]=useState(false),[bias,sb]=useState(0);
  const vbe=bias/10*(p?-1:1),on=p?vbe<=-.7:vbe>=.7;
  return <Bench art={<Circuit label={p?"BJT PNP":"BJT NPN"} on={on} extra={<g stroke="#afc2c1" fill="none"><path d="M264 201h45v-60m-64 60h-32v55h61" strokeWidth={on?3:1}/><text x="284" y="245" fill="#e7d7c7" stroke="none" className="art-label">ARUS BASIS</text></g>}/>} results={<><strong>{on?"Beban aktif":"Beban mati"}</strong><span>VBE = {f(vbe)} V</span></>} note="Model sakelar sederhana untuk BJT silikon. Basis lebih positif terhadap emitor pada NPN dan lebih negatif pada PNP. Pada perangkat nyata, arus basis, arus kolektor, dan saturasi menentukan penggerakan beban.">
    <Range label="Besar bias basis" value={bias} min={0} max={9} unit="× 0,1 V" set={sb}/><Toggle on={p} change={()=>sp(!p)}>Mode PNP</Toggle>
  </Bench>;
}
function Gates() {
  const [gate,sg]=useState<Gate>("AND"),[a,sa]=useState(false),[b,sb]=useState(false);
  const out=logic(gate,a,b);
  const row=(gate==="NOT"?[[false,false],[true,false]]:[[false,false],[false,true],[true,false],[true,true]]);
  return <Bench art={<><SignalDiagram samples={gate==="NOT"?[[Number(a)],[Number(out)]]:[[Number(a)],[Number(b)],[Number(out)]]} labels={gate==="NOT"?[`A = ${Number(a)}`,`Y = ${Number(out)}`]:[`A = ${Number(a)}`,`B = ${Number(b)}`,`Y = ${Number(out)}`]} /><p className="diode-path">{gate} → {Number(out)} · level saat ini</p></>} results={<><strong>Y = {Number(out)}</strong>
    <table className="truth-table"><caption>Tabel kebenaran {gate}</caption><thead><tr><th>A</th>{gate!=="NOT"&&<th>B</th>}<th>Y</th></tr></thead><tbody>{row.map(([x,y])=><tr key={Number(x)*2+Number(y)} data-active={x===a&&(gate==="NOT"||y===b)}><td>{Number(x)}</td>{gate!=="NOT"&&<td>{Number(y)}</td>}<td>{Number(logic(gate,x,y))}</td></tr>)}</tbody></table></>} note="Perubahan input langsung menghitung keluaran Boolean. Diagram menunjukkan level saat ini. Model ini tidak menghitung delay propagasi nyata.">
    <label>Gerbang <select value={gate} onChange={e=>sg(e.target.value as Gate)}>{gates.map(g=><option key={g}>{g}</option>)}</select></label><Toggle on={a} change={()=>sa(!a)}>A = {Number(a)}</Toggle>{gate!=="NOT"&&<Toggle on={b} change={()=>sb(!b)}>B = {Number(b)}</Toggle>}
  </Bench>;
}

const stations=[
  ["DC dan hukum Ohm",Dc],["Kapasitor RC",Rc],["Medan induktor",Coil],["Transformator",Transformer],["Penyearahan",Rectifier],["MOSFET",Mosfet],["Proteksi kanal P",Protect],["Sekring dan eFuse",Fuse],["Sakelar BJT",Bjt],["Gerbang logika",Gates],
] as const;

export default function Lab() {
  const [station,setStation]=useState(0);
  const [title,Simulation]=stations[station];
  return <div className="lab-console">
    <div className="lab-stations" role="group" aria-label="Pilih simulasi">{stations.map(([label],i)=><button key={label} type="button" aria-pressed={station===i} onClick={()=>setStation(i)}><span>{String(i+1).padStart(2,"0")}</span> {label}</button>)}</div>
    <h2 className="lab-title">{title}</h2><Simulation />
  </div>;
}
