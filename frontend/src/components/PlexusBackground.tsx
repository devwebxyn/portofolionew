"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Point = { x: number; y: number; vx: number; vy: number };

// Deterministic PRNG (Mulberry32) to avoid SSR/CSR hydration mismatch
function mulberry32(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), t | 1);
    r ^= r + Math.imul(r ^ (r >>> 7), r | 61);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function seededRand(rng: () => number, min: number, max: number) {
  return rng() * (max - min) + min;
}

export function PlexusBackground({
  nodes = 26,
  accent = "#22d3ee",
  className = "",
}: {
  nodes?: number;
  accent?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 800, h: 600 });
  const pts = useMemo<Point[]>(() => {
    // Use a constant seed plus nodes to keep output stable across server and client
    const rng = mulberry32(1337 + nodes);
    return Array.from({ length: nodes }).map(() => ({
      x: seededRand(rng, 0, 800),
      y: seededRand(rng, 0, 600),
      vx: seededRand(rng, -0.3, 0.3),
      vy: seededRand(rng, -0.3, 0.3),
    }));
  }, [nodes]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const cr = e.contentRect;
        setSize({ w: cr.width, h: cr.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > size.w) p.vx *= -1;
        if (p.y < 0 || p.y > size.h) p.vy *= -1;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [pts, size.w, size.h]);

  // Build edges based on distance threshold
  const threshold = Math.min(size.w, size.h) * 0.12;
  const edges: Array<[Point, Point, number]> = [];
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i];
      const b = pts[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const d = Math.hypot(dx, dy);
      if (d < threshold) {
        edges.push([a, b, 1 - d / threshold]);
      }
    }
  }

  return (
    <div ref={ref} className={`absolute inset-0 ${className}`} aria-hidden>
      <svg width={size.w} height={size.h} className="block w-full h-full">
        <defs>
          <radialGradient id="plexusGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accent} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Edges */}
        {edges.map(([a, b, op], idx) => (
          <line
            key={idx}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={accent}
            strokeOpacity={0.22 * op}
            strokeWidth={1}
          />
        ))}

        {/* Nodes */}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={2.2} fill={accent} fillOpacity={0.8} />
            <circle cx={p.x} cy={p.y} r={10} fill="url(#plexusGlow)" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
