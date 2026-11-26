"use client";

import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useState, type ReactNode } from "react";

export type Step = { label: string; text: string; art: ReactNode; detail?: string };

export function Sequence({ label, steps }: { label: string; steps: Step[] }) {
  const [index,setIndex] = useState(0);
  const [replay, setReplay] = useState(0);
  const step = steps[index];
  return <div className="sequence" data-scene>
    <div className="sequence-visual" key={`${index}-${replay}`}>{step.art}</div>
    <div className="sequence-readout">
      <p className="eyebrow">{label} · {index+1} / {steps.length}</p>
      <div aria-live="polite"><h3>{step.label}</h3><p>{step.text}</p>{step.detail && <details className="hotspot"><summary>Lihat detail teknis</summary><p>{step.detail}</p></details>}</div>
      <div className="sequence-controls">
        <button type="button" aria-label="Tahap sebelumnya" disabled={!index} onClick={()=>setIndex(index-1)}><ArrowLeft size={18} /></button>
        <label className="sr-only" htmlFor={`step-${label.replace(/\W/g,"-")}`}>Tahap {label}</label>
        <select id={`step-${label.replace(/\W/g,"-")}`} value={index} onChange={event=>setIndex(Number(event.target.value))}>
          {steps.map(({label},i)=><option value={i} key={label}>{i+1}. {label}</option>)}
        </select>
        <button type="button" aria-label="Tahap berikutnya" disabled={index===steps.length-1} onClick={()=>setIndex(index+1)}><ArrowRight size={18} /></button>
      </div>
      <button className="sequence-replay action action-outline" type="button" onClick={()=>setReplay(value=>value+1)}><RotateCcw size={15} aria-hidden="true"/> Putar ulang adegan</button>
      <progress aria-label={`Progres ${label}`} value={index+1} max={steps.length} />
    </div>
  </div>;
}
