"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

function supportsPointerMotion(event: PointerEvent<HTMLElement>) {
  return event.pointerType === "mouse" && matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches;
}

export function HeroStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const bounds = useRef<DOMRect | null>(null);

  useEffect(() => {
    const node = stage.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      node.dataset.motion = entry.isIntersecting ? "active" : "paused";
    }, { threshold: .15 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return <div className="hero-stage" ref={stage}
    onPointerEnter={(event) => {
      if (supportsPointerMotion(event)) bounds.current = event.currentTarget.getBoundingClientRect();
    }}
    onPointerMove={(event) => {
      if (!bounds.current || event.pointerType !== "mouse") return;
      const { clientX, currentTarget } = event;
      const offset = Math.min(1, Math.max(-1, (clientX - bounds.current.left) / bounds.current.width * 2 - 1));
      currentTarget.style.setProperty("--look", `${offset * 5}px`);
      currentTarget.style.setProperty("--tilt", `${offset * 3}deg`);
    }}
    onPointerLeave={(event) => {
      bounds.current = null;
      event.currentTarget.style.removeProperty("--look");
      event.currentTarget.style.removeProperty("--tilt");
    }}>
    {children}
  </div>;
}

export function HeroProjectLink() {
  const bounds = useRef<DOMRect | null>(null);
  return <Link className="action action-solid" href="/projects"
    onPointerEnter={(event) => {
      if (supportsPointerMotion(event)) bounds.current = event.currentTarget.getBoundingClientRect();
    }}
    onPointerMove={({ clientX, clientY, currentTarget }) => {
      if (!bounds.current) return;
      const { left, top, width, height } = bounds.current;
      currentTarget.style.setProperty("--magnet-x", `${(clientX - left - width / 2) * .075}px`);
      currentTarget.style.setProperty("--magnet-y", `${(clientY - top - height / 2) * .12}px`);
    }}
    onPointerLeave={({ currentTarget }) => {
      bounds.current = null;
      currentTarget.style.removeProperty("--magnet-x");
      currentTarget.style.removeProperty("--magnet-y");
    }}>
    Jelajahi proyek <ArrowUpRight size={17} aria-hidden />
  </Link>;
}
