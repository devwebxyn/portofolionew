"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const Lab=dynamic(()=>import("./Lab"), {loading:()=> <p role="status">Memuat meja simulasi…</p>});
const Gallery=dynamic(()=>import("./ComponentGallery"), {loading:()=> <p role="status">Memuat galeri komponen…</p>});

export function LazyExhibit({kind}:{kind:"lab"|"gallery"}) {
  const [open,setOpen]=useState(false);
  const ref=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const node=ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer=new IntersectionObserver(([entry])=>{
      if (entry.isIntersecting) {setOpen(true);observer.disconnect();}
    },{rootMargin:"200px"});
    observer.observe(node);
    return ()=>observer.disconnect();
  },[]);
  return <div ref={ref} className="lazy-exhibit">
    {open ? kind==="lab" ? <Lab/> : <Gallery/> : <button className="action action-outline" type="button" onClick={()=>setOpen(true)}>{kind==="lab" ? "Buka meja simulasi" : "Buka galeri komponen"}</button>}
  </div>;
}
