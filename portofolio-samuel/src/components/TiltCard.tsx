"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  description: string;
  icon: React.ReactNode;
  accent?: "gold" | "cyan" | "purple";
  onClick?: () => void;
  className?: string;
};

const accentMap = {
  gold: {
    glow: "#f59e0b",
    ring: "ring-amber-400/40",
    text: "text-amber-300",
    grad: "from-amber-500/20 to-amber-300/5",
  },
  cyan: {
    glow: "#22d3ee",
    ring: "ring-cyan-400/40",
    text: "text-cyan-300",
    grad: "from-cyan-500/20 to-cyan-300/5",
  },
  purple: {
    glow: "#a78bfa",
    ring: "ring-violet-400/40",
    text: "text-violet-300",
    grad: "from-violet-500/20 to-violet-300/5",
  },
};

export function TiltCard({ title, description, icon, accent = "cyan", onClick, className }: Props) {
  const cardRef = useRef<HTMLButtonElement | null>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const config = accentMap[accent];
  const shadow = useMotionTemplate`0px 10px 30px rgba(0,0,0,0.25), 0 0 40px ${config.glow}`;

  const onMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rX = (0.5 - py) * 12; // tilt range
    const rY = (px - 0.5) * 12;
    rotateX.set(rX);
    rotateY.set(rY);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.button
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, boxShadow: shadow, transformStyle: "preserve-3d" }}
      className={cn(
        "group relative w-full rounded-2xl border border-white/10 bg-gradient-to-br p-5 text-left transition will-change-transform",
        "hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2",
        config.ring,
        config.grad,
        className
      )}
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-[radial-gradient(120px_120px_at_var(--x,50%)_var(--y,0%),_rgba(255,255,255,0.08),_transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="flex items-start gap-4" style={{ transform: "translateZ(24px)" }}>
        <div className={cn("grid h-12 w-12 place-items-center rounded-xl border", config.ring)} style={{ background: "rgba(255,255,255,0.9)" }}>
          <span className={cn("text-2xl text-black")}>{icon}</span>
        </div>
        <div>
          <h3 className={cn("inline-block rounded-md px-2 py-1 text-xl font-semibold text-black shadow-sm", config.ring)} style={{ background: "rgba(255,255,255,0.95)" }}>
            {title}
          </h3>
          <p className="mt-2 inline-block rounded-md px-2 py-1 text-sm text-black" style={{ background: "rgba(255,255,255,0.85)" }}>
            {description}
          </p>
        </div>
      </div>
    </motion.button>
  );
}
