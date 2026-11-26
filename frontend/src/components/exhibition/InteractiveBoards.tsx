"use client";

import { useRef, useState, type ReactNode } from "react";
import { PcbStackArt } from "./Diagrams";

export function LayerConsole() {
  const labels=["Substrat","Tembaga","Solder mask","Silkscreen","Pad","Via","Komponen"];
  const [visible,setVisible]=useState(labels.map(()=>true));
  const [exploded,setExploded]=useState(true);
  return <div className="layer-console" data-scene>
    <div className="layer-art"><PcbStackArt visible={visible} exploded={exploded} /></div>
    <fieldset><legend>Lapisan yang ditampilkan</legend>
      {labels.map((label,i)=><label key={label}><input type="checkbox" checked={visible[i]} onChange={event=>setVisible(prev=>prev.map((value,j)=>i===j ? event.target.checked : value))}/>{label}</label>)}
      <button className="action action-outline" type="button" aria-pressed={exploded} onClick={()=>setExploded(!exploded)}>{exploded ? "Rakit papan" : "Pisahkan lapisan"}</button>
    </fieldset>
  </div>;
}

export function Workload() {
  const [size,setSize]=useState(8);
  const [parallel,setParallel]=useState(true);
  const [run,setRun]=useState(0);
  const lanes=parallel?4:1;
  return <div className="workload" data-scene>
    <div className="work-lanes" key={run} aria-hidden="true">
      {Array.from({length:4},(_,i)=><div className="work-lane" key={i} data-idle={i>=lanes}><span>UNIT {i+1}</span><div>{Array.from({length:Math.ceil((size-i)/lanes)},(_,j)=>i<lanes && <i key={j} style={{animationDelay:`${j*95}ms`}}>{(j*lanes+i+1).toString().padStart(2,"0")}</i>)}</div></div>)}
    </div>
    <div className="workload-controls">
      <label>Item <input value={size} type="range" min="4" max="16" onChange={e=>setSize(Number(e.target.value))} /> <output>{size}</output></label>
      <button className="action action-outline" type="button" aria-pressed={parallel} onClick={()=>setParallel(!parallel)}>Empat unit paralel</button>
      <button className="action action-solid" type="button" onClick={()=>setRun(run+1)}>Kirim pekerjaan</button>
      <p aria-live="polite">{size} item, {lanes} unit, {Math.ceil(size/lanes)} putaran ideal.</p>
    </div>
  </div>;
}

export function Turntable({children,label}:{children:ReactNode;label:string}) {
  const [angle,setAngle]=useState(0);
  const drag=useRef<{x:number;angle:number}|null>(null);
  return <div className="turntable" data-scene>
    <div className="turntable-model" style={{transform:`rotateY(${angle}deg)`}}
      onPointerDown={e=>{
        if (!e.isPrimary || e.button!==0) return;
        drag.current={x:e.clientX,angle};
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={e=>{
        const start=drag.current;
        if (!start || !e.isPrimary) return;
        setAngle(Math.max(-38,Math.min(38,Math.round(start.angle+(e.clientX-start.x)*.28))));
      }}
      onLostPointerCapture={()=>{drag.current=null;}}
    >{children}</div>
    <label>{label} <input type="range" min="-38" max="38" value={angle} onChange={e=>setAngle(Number(e.target.value))}/></label>
  </div>;
}
