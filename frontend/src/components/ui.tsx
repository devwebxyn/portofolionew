"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fadeUp, stagger, viewportOnce, wordReveal } from "@/lib/motion";

/* ---------- Reveal: scroll-triggered fade-up ---------- */
const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  header: motion.header,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: keyof typeof MOTION_TAGS;
}) {
  const Tag = MOTION_TAGS[as];
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={delay ? { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ---------- Stagger container + item ---------- */
export function Stagger({
  children,
  className,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={stagger(gap)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

/* ---------- Word-by-word scroll reveal ---------- */
export function WordReveal({
  text,
  className,
  accentWords = [],
}: {
  text: string;
  className?: string;
  /** words (lowercase, no punctuation) rendered with .text-gradient */
  accentWords?: string[];
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={cn("inline", className)}
      variants={stagger(0.035)}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      aria-label={text}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?;:]/g, "").toLowerCase();
        const accent = accentWords.includes(clean);
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              variants={wordReveal}
              className={cn("inline-block will-change-transform", accent && "text-gradient")}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
}

/* ---------- Editorial section heading: big number + title ---------- */
export function SectionHeading({
  index,
  title,
  sub,
  className,
  align = "left",
}: {
  index: string;
  title: ReactNode;
  sub?: ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn(align === "center" && "text-center", className)}>
      <div
        className={cn(
          "flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut",
          align === "center" && "justify-center"
        )}
      >
        <span className="text-accent">{index}</span>
        <span className="h-px w-8 bg-line" />
        <span>Section</span>
      </div>
      <h2 className="type-display mt-5 text-4xl font-bold text-hi sm:text-5xl md:text-6xl">{title}</h2>
      {sub && (
        <p className={cn("mt-5 max-w-2xl text-base text-body sm:text-lg", align === "center" && "mx-auto")}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ---------- Spotlight card: mouse-follow glow ---------- */
export function SpotlightCard({
  children,
  className,
  spotClass = "opacity-0 group-hover:opacity-100",
}: {
  children: ReactNode;
  className?: string;
  spotClass?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 30 });
  const sy = useSpring(y, { stiffness: 250, damping: 30 });
  const bg = useTransform(
    [sx, sy],
    ([px, py]) =>
      `radial-gradient(360px circle at ${px}px ${py}px, rgba(200,255,46,0.12), transparent 65%)`
  );

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
      }}
      className={cn("group relative overflow-hidden", className)}
    >
      <motion.div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-500", spotClass)}
        style={{ background: bg }}
      />
      {children}
    </div>
  );
}

/* ---------- Magnetic hover ---------- */
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- 3D tilt card ---------- */
export function TiltCard({
  children,
  className,
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d", perspective: 900 }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * max);
        ry.set(px * max);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Counter ---------- */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // Initialize at the final number so the correct value renders even when the
  // in-view observer is skipped (small screens, reduced motion, early paint).
  const mv = useMotionValue(to);
  const spring = useSpring(mv, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) {
      mv.set(0); // rewind, then animate up for the count effect
      mv.set(to);
    }
  }, [inView, to, mv]);

  const rounded = useTransform(spring, (v) => Math.round(v).toLocaleString("id-ID"));

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

/* ---------- Marquee ---------- */
export function Marquee({
  children,
  className,
  duration = 30,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  return (
    <div className={cn("marquee-mask overflow-hidden", className)}>
      <div
        className="animate-marquee flex w-max"
        style={{ animationDuration: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------- Status pill ---------- */
export function StatusPill({ label = "Open to work" }: { label?: string }) {
  return (
    <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-hi">
      <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ok" />
      {label}
    </span>
  );
}

/* ---------- Big ghost number (decorative section index) ---------- */
export function GhostIndex({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span aria-hidden className={cn("text-outline type-display select-none", className)}>
      {children}
    </span>
  );
}
