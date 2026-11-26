"use client";

import { useState } from "react";
import { catalog, type ComponentKey, type Family } from "@/lib/components-catalog";
import { SpecimenArt, Symbol } from "./SpecimenArt";

const families=Object.keys(catalog) as Family[];

export default function ComponentGallery() {
  const [family,setFamily]=useState<Family>("Pasif");
  const [id,setId]=useState<ComponentKey>("r");
  const [angle,setAngle]=useState(0);
  const [show,setShow]=useState(false);
  const list=catalog[family];
  const [key,label,role,text,use,spot,spotText]=list.find(row=>row[0]===id) ?? list[0];
  return <div className="specimen-console" data-scene>
    <div className="specimen-categories" role="group" aria-label="Kategori komponen">{families.map(category=><button type="button" key={category} aria-pressed={category===family} onClick={()=>{setFamily(category);setAngle(0);setShow(false);}}>{category}</button>)}</div>
    <div className="specimen-body">
      <div className="specimen-model">
        <div key={key} className="specimen-perspective"><div style={{transform:`rotateY(${angle}deg)`}}><SpecimenArt id={key} active={show}/></div></div>
        <div className="specimen-controls">
          <label>Sudut <input type="range" value={angle} min="-38" max="38" onChange={e=>setAngle(Number(e.target.value))}/></label>
          <button type="button" className="action action-outline" aria-pressed={show} onClick={()=>setShow(!show)}>Tandai {spot.toLocaleLowerCase("id-ID")}</button>
        </div>
      </div>
      <div className="specimen-description">
        <label htmlFor="komponen">Pilih komponen</label>
        <select id="komponen" value={key} onChange={e=>{setId(e.target.value as ComponentKey);setAngle(0);setShow(false);}}>{list.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select>
        <div aria-live="polite"><h3>{label}</h3><p>{role} {text}</p><p><strong>Contoh</strong> {use}.</p>{show && <p className="spot-note"><strong>{spot}</strong> {spotText}</p>}</div>
        <Symbol id={key}/>
      </div>
    </div>
  </div>;
}
