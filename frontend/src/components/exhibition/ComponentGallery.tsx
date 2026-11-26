"use client";

import { useState } from "react";
import { catalog, type ComponentKey, type Family } from "@/lib/components-catalog";
import { Symbol } from "./SpecimenArt";
import { Render } from "./Render";

const families=Object.keys(catalog) as Family[];

const packageArt: Record<ComponentKey, string> = {
  r: "r", smd: "smd", pot: "pot", ceramic: "ceramic", elco: "elco", film: "film",
  coil: "coil", bead: "smd", diode: "diode", schottky: "diode", zener: "glass-diode",
  led: "led", bjt: "bjt", npn: "bjt", pnp: "bjt", nmos: "mosfet", pmos: "mosfet",
  ic: "ic", ldo: "mosfet", op: "dip", xfmr: "xfmr", ct: "xfmr", fuse: "fuse",
  ptc: "ptc", efuse: "ic", tvs: "diode", bridge: "bridge", switch: "switch",
  power: "mosfet", mcu: "mcu", memory: "memory", logic: "dip", osc: "osc",
  crystal: "crystal", sensor: "sensor", driver: "ic",
};

export default function ComponentGallery() {
  const [family,setFamily]=useState<Family>("Pasif");
  const [id,setId]=useState<ComponentKey>("r");
  const [zoom,setZoom]=useState(false);
  const [show,setShow]=useState(false);
  const list=catalog[family];
  const [key,label,role,text,use,spot,spotText]=list.find(row=>row[0]===id) ?? list[0];
  return <div className="specimen-console" data-scene>
    <div className="specimen-categories" role="group" aria-label="Kategori komponen">{families.map(category=><button type="button" key={category} aria-pressed={category===family} onClick={()=>{setFamily(category);setZoom(false);setShow(false);}}>{category}</button>)}</div>
    <div className="specimen-body">
      <div className="specimen-model">
        <div key={key} className="specimen-cutout" data-zoom={zoom}><Render name={packageArt[key]} alt={`Ilustrasi contoh kemasan ${label}`}/></div>
        <div className="specimen-controls">
          <button type="button" className="action action-outline" aria-pressed={zoom} onClick={()=>setZoom(!zoom)}>{zoom ? "Kecilkan gambar" : "Perbesar gambar"}</button>
          <button type="button" className="action action-outline" aria-pressed={show} onClick={()=>setShow(!show)}>Detail {spot.toLocaleLowerCase("id-ID")}</button>
        </div>
      </div>
      <div className="specimen-description">
        <label htmlFor="komponen">Pilih komponen</label>
        <select id="komponen" value={key} onChange={e=>{setId(e.target.value as ComponentKey);setZoom(false);setShow(false);}}>{list.map(([id,label])=><option value={id} key={id}>{label}</option>)}</select>
        <div aria-live="polite"><h3>{label}</h3><p>{role} {text}</p><p><strong>Contoh</strong> {use}.</p>{show && <p className="spot-note"><strong>{spot}</strong> {spotText}</p>}</div>
        <Symbol id={key}/>
        <p className="reference">Render generatif memperlihatkan contoh kemasan. Komponen berbeda dapat memiliki bentuk luar yang sama.</p>
      </div>
    </div>
  </div>;
}
