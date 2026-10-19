// /src/app/about/page.tsx
"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { NexusMap } from "@/components/NexusMap";
import { RoleDossier } from "@/components/RoleDossier";
import { TechShowcase } from "@/components/TechShowcase";
import { Reveal } from "@/components/ui";

export default function AboutPage() {
  const [role, setRole] = useState<import("@/components/NexusMap").RoleKey | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Header intro */}
      <header className="relative mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
            <span className="text-accent">01 · Peran</span>
            <span className="h-px w-8 bg-line" />
            <span>About</span>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="type-display mt-6 max-w-4xl text-5xl font-bold text-hi sm:text-6xl md:text-7xl">
            Satu kanvas, <span className="serif-accent text-gradient">banyak peran</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-base text-body sm:text-lg">
            Saya bergerak lintas peran: Frontend, Backend, Fullstack, DevOps, Cyber Security, Lead Developer, IoT Engineer, dan System Architect. Tujuan saya sederhana — merancang, membangun, dan merawat solusi end-to-end yang elegan, aman, dan berdampak nyata bagi bisnis.
          </p>
        </Reveal>

        {/* ghost index */}
        <span
          aria-hidden
          className="text-outline type-display pointer-events-none absolute top-2 right-2 select-none text-[10rem] leading-none sm:right-8 sm:text-[14rem]"
        >
          01
        </span>
      </header>

      {/* Nexus Map */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <NexusMap persona="developer" onSelectRole={(r) => setRole(r)} />
      </section>

      {/* Role Dossier */}
      <AnimatePresence>
        {role && <RoleDossier role={role} onClose={() => setRole(null)} />}
      </AnimatePresence>

      {/* Tech Showcase */}
      <TechShowcase />

      {/* CTA */}
      <footer className="border-t border-line">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <Reveal className="flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h3 className="type-display text-3xl font-bold text-hi">Ada proyek yang menarik?</h3>
              <p className="mt-1 text-sm text-mut">Diskusi arsitektur, konsultasi teknis, atau sekadar bertukar ide — saya terbuka untuk ngobrol.</p>
            </div>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]"
            >
              Hubungi Saya
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
