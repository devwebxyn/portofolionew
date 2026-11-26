"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Layers3, MoveUpRight } from "lucide-react";

export function SceneObserver() {
  useEffect(() => {
    const main = document.querySelector("main");
    if (!main || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (isIntersecting) target.setAttribute("data-seen", "");
        target.toggleAttribute("data-onscreen", isIntersecting);
      }
    }, { rootMargin: "0px 0px -3% 0px" });
    function updateScenes(node: Node, added: boolean) {
      if (!(node instanceof Element)) return;
      const scenes = node.matches("[data-scene]") ? [node, ...node.querySelectorAll("[data-scene]")] : node.querySelectorAll("[data-scene]");
      scenes.forEach(scene => added ? observer.observe(scene) : observer.unobserve(scene));
    }
    updateScenes(main, true);
    const updates = new MutationObserver(records => {
      for (const record of records) {
        record.removedNodes.forEach(node => updateScenes(node, false));
        record.addedNodes.forEach(node => updateScenes(node, true));
      }
    });
    updates.observe(main, { childList: true, subtree: true });
    return () => { updates.disconnect(); observer.disconnect(); };
  }, []);
  return null;
}

export function ProcessorStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const pointerBounds = useRef<DOMRect | null>(null);

  useEffect(() => {
    const el = stage.current;
    const opening = el?.closest(".opening");
    if (!el || !opening || !("IntersectionObserver" in window)) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let active = true;
    function update() {
      frame = 0;
      if (!el || !opening || !active || motion.matches || document.hidden) return;
      const progress = Math.min(1, Math.max(0, -opening.getBoundingClientRect().top / 310));
      el.style.setProperty("--split", String(progress));
    }
    function schedule() { if (!frame && active && !motion.matches && !document.hidden) frame = requestAnimationFrame(update); }
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      schedule();
    });
    observer.observe(el);
    window.addEventListener("scroll", schedule, { passive: true });
    document.addEventListener("visibilitychange", schedule);
    motion.addEventListener("change", schedule);
    schedule();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      document.removeEventListener("visibilitychange", schedule);
      motion.removeEventListener("change", schedule);
    };
  }, []);

  return <div ref={stage} className="processor-stage" data-exploded={open} data-scene
    onPointerEnter={(event) => {
      if (event.pointerType === "mouse") pointerBounds.current = event.currentTarget.getBoundingClientRect();
    }}
    onPointerMove={(event) => {
      const bounds = pointerBounds.current;
      if (!bounds || event.pointerType !== "mouse" || !matchMedia("(prefers-reduced-motion: no-preference)").matches) return;
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      event.currentTarget.style.setProperty("--yaw", `${x * 8}deg`);
      event.currentTarget.style.setProperty("--pitch", `${y * -7}deg`);
      event.currentTarget.style.setProperty("--light-x", `${x * 24}px`);
    }}
    onPointerLeave={(event) => {
      pointerBounds.current = null;
      for (const key of ["--yaw", "--pitch", "--light-x"]) event.currentTarget.style.removeProperty(key);
    }}>
    <div className="stage-header"><span><i /> Model prosesor</span><span>ISOMETRI / 01</span></div>
    <div className="processor-camera">{children}</div>
    <p className="sr-only">Ilustrasi konseptual. Dari atas ke bawah, prosesor terdiri dari penutup logam, die silikon, substrat, dan pad kontak.</p>
    <div className="stage-footer">
      <label className="view-angle"><span>Sudut pandang</span><input type="range" min="-22" max="22" defaultValue="0"
        onChange={(event) => stage.current?.style.setProperty("--view-angle", `${event.currentTarget.value}deg`)} /></label>
      <button type="button" aria-pressed={open} className="inspect" onClick={() => setOpen(!open)}><Layers3 size={16} aria-hidden /> Pisahkan lapisan</button>
    </div>
  </div>;
}

export type Selection = { label: string; title: string; text: string; art: ReactNode };

export function Explorer({ label, views, className = "" }: { label: string; views: Selection[]; className?: string }) {
  const [active, setActive] = useState(0);
  const view = views[active];
  return <div className={`explorer ${className}`} data-scene>
    <div className="explorer-art" key={view.label}>{view.art}</div>
    <div className="explorer-controls">
      <div className="selector" role="group" aria-label={label}>
        {views.map(({label}, i) => <button key={label} type="button" aria-pressed={i === active} onClick={() => setActive(i)}>
          <span>{label}</span><MoveUpRight size={15} aria-hidden />
        </button>)}
      </div>
      <div className="explorer-caption" aria-live="polite">
        <h3>{view.title}</h3><p>{view.text}</p>
      </div>
    </div>
  </div>;
}
