// /src/app/about/page.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NexusMap } from "@/components/NexusMap";
import { RoleDossier } from "@/components/RoleDossier";
import { TechShowcase } from "@/components/TechShowcase";

export default function AboutPage() {
  const [role, setRole] = useState<import("@/components/NexusMap").RoleKey | null>(null);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Hero Section */}
      <header className="mx-auto max-w-5xl px-6 py-16">
        <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-sm text-black" style={{ background: "rgba(255,255,255,0.9)", display: "inline-block", padding: "4px 8px", borderRadius: 8 }}>
          About / Nexus Journey V3
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-2 text-3xl md:text-5xl font-bold text-black inline-block" style={{ background: "rgba(255,255,255,0.95)", padding: "8px 12px", borderRadius: 12 }}>
          Engineer Serba Bisa — Satu Kanvas, Banyak Peran
        </motion.h2>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="mt-3 max-w-3xl text-black" style={{ background: "rgba(255,255,255,0.88)", padding: "8px 12px", borderRadius: 12 }}>
          Saya bergerak lintas peran: Frontend, Backend, Fullstack, DevOps, Cyber Security, Lead Developer, IoT Engineer, dan System Architect. Tujuan saya sederhana: merancang–membangun–merawat solusi end‑to‑end yang elegan, aman, dan berdampak nyata bagi bisnis.
        </motion.p>
      </header>

      {/* Nexus Map */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <NexusMap persona={"developer"} onSelectRole={(r) => setRole(r)} />
      </section>

      {/* Role Dossier */}
      <AnimatePresence>
        {role && <RoleDossier role={role} onClose={() => setRole(null)} />}
      </AnimatePresence>

      {/* Tech Showcase */}
      <TechShowcase />
      
      {/* CTA */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h3 className="text-xl font-semibold text-white">Intrigued? Let’s Talk Tech.</h3>
              <p className="mt-1 text-sm text-white/70">Hubungi saya untuk demo, diskusi arsitektur, atau studi kasus yang relevan.</p>
            </div>
            <a href="/contact" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
              Kirim Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
