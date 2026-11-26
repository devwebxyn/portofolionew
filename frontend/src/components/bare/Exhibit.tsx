import type { ReactNode } from "react";
import { Action } from "@/components/Editorial";

export function Chapter({ id, label }: { id: string; label: string }) {
  return <div className="chapter"><span>{id} / {label}</span><i /><span aria-hidden="true">+</span></div>;
}

export function Scene({ art, label, className = "" }: { art: ReactNode; label: string; className?: string }) {
  return <figure className={`scene ${className}`} data-scene>
    <div className="scene-visual">{art}</div><figcaption><span>{label}</span><span>Ilustrasi konseptual</span></figcaption>
  </figure>;
}

export function NextChapter({ href, title, children }: { href: string; title: string; children: ReactNode }) {
  return <section className="next-chapter"><div className="frame"><h2>{title}</h2><Action href={href}>{children}</Action></div></section>;
}
