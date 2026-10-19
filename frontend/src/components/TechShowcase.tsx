"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Stagger, StaggerItem } from "@/components/ui";

type Kind = "framework" | "language";
type Item = { key: string; kind: Kind; name: string; color: string };

function Badge({ item, onClick }: { item: Item; onClick: (it: Item) => void }) {
  return (
    <button
      onClick={() => onClick(item)}
      className={cn(
        "group flex w-full items-center gap-4 rounded-2xl border border-line bg-panel px-4 py-4 text-left transition-all duration-300",
        "hover:-translate-y-1 hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      )}
    >
      <div className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-xl bg-white/5" aria-hidden>
        <img src={`/logos/${item.key}.svg`} alt="" className="h-8 w-8 object-contain" />
      </div>
      <div className="min-w-0">
        <div className="truncate font-semibold text-hi">{item.name}</div>
        <div className="font-mono text-xs text-mut uppercase">{item.kind}</div>
      </div>
    </button>
  );
}

type Info = { pengertian: string; kegunaan: string; sejarah: string; pembuat: string };

const INFO_FRAMEWORK: Record<string, Info> = {
  laravel: {
    pengertian: "Laravel adalah framework PHP modern berarsitektur MVC dengan sintaks elegan dan ekosistem kaya.",
    kegunaan: "Membangun aplikasi web backend cepat: routing, ORM (Eloquent), auth, queue, job, dan artisan CLI.",
    sejarah: "Dirilis 2011, berkembang pesat dengan rilis LTS dan ekosistem seperti Forge, Vapor, dan Nova.",
    pembuat: "Taylor Otwell (AS).",
  },
  next: {
    pengertian: "Next.js adalah framework React untuk aplikasi web full‑stack dengan SSR, SSG, ISR, dan routing modern.",
    kegunaan: "Membangun web cepat dengan SEO kuat, image optimization, API routes, dan server actions.",
    sejarah: "Diluncurkan oleh Vercel (2016), berevolusi dari Pages Router ke App Router dan React Server Components.",
    pembuat: "Tim Vercel (Guillermo Rauch dan kontributor).",
  },
  svelte: {
    pengertian: "Svelte adalah compiler UI yang mengubah komponen menjadi JavaScript murni tanpa runtime besar.",
    kegunaan: "Aplikasi front‑end ringan, responsif, dengan bundle minimal dan reaktivitas deklaratif.",
    sejarah: "Dimulai sekitar 2016; SvelteKit hadir untuk mendukung routing dan rendering server.",
    pembuat: "Rich Harris dan komunitas.",
  },
  spring: {
    pengertian: "Spring Boot memudahkan pembangunan layanan Java dengan konfigurasi 'starter' dan auto‑configuration.",
    kegunaan: "Microservices, REST API, integrasi enterprise, observability, dan production‑ready features.",
    sejarah: "Rilis 2014 di ekosistem Spring untuk menyederhanakan setup Spring tradisional.",
    pembuat: "Pivotal/VMware Tanzu dan komunitas Spring.",
  },
  express: {
    pengertian: "Express.js adalah framework minimalis untuk Node.js yang menyediakan routing dan middleware.",
    kegunaan: "REST API cepat, proxy, BFF layer, dan layanan ringan dengan ekosistem middleware luas.",
    sejarah: "Dirilis 2010; menjadi fondasi banyak framework Node.js lain.",
    pembuat: "TJ Holowaychuk (awalnya), dipelihara komunitas Express.",
  },
  nestjs: {
    pengertian: "NestJS adalah framework Node.js berbasis TypeScript dengan pola modular dan inspirasi dari Angular.",
    kegunaan: "Aplikasi backend terstruktur, dependency injection, testing yang rapi, dan integrasi GraphQL/gRPC.",
    sejarah: "Dirilis sekitar 2017; tumbuh cepat di komunitas TypeScript enterprise.",
    pembuat: "Kamil Myśliwiec dan kontributor.",
  },
};

const INFO_LANGUAGE: Record<string, Info> = {
  javascript: {
    pengertian: "Bahasa pemrograman dinamis untuk web yang berjalan di browser dan server (Node.js).",
    kegunaan: "Interaktivitas UI, aplikasi web, server‑side, tooling, dan scripting lintas platform.",
    sejarah: "Dibuat 1995; berevolusi melalui ECMAScript dengan fitur modern seperti async/await.",
    pembuat: "Brendan Eich (Netscape).",
  },
  typescript: {
    pengertian: "Superset JavaScript berpengetikan statis yang dikompilasi ke JavaScript.",
    kegunaan: "Aplikasi berskala besar, memperkuat tooling, refactor aman, dan dokumentasi tipe.",
    sejarah: "Dirilis 2012; diadopsi luas oleh ekosistem JS modern.",
    pembuat: "Microsoft (Anders Hejlsberg dan tim).",
  },
  php: {
    pengertian: "Bahasa scripting sisi server yang umum untuk pengembangan web.",
    kegunaan: "Backend web, CMS, dan aplikasi server yang cepat dikembangkan.",
    sejarah: "Dirilis 1995; menguat dengan PHP 7/8 dalam kinerja dan fitur modern.",
    pembuat: "Rasmus Lerdorf; dikembangkan komunitas PHP.",
  },
  cpp: {
    pengertian: "Bahasa tingkat menengah berorientasi objek dengan kontrol memori yang kuat.",
    kegunaan: "Sistem, game, embedded, dan performa tinggi.",
    sejarah: "Berkembang dari C sejak 1980‑an; standar modern C++11/14/17/20 membawa fitur kuat.",
    pembuat: "Bjarne Stroustrup.",
  },
  java: {
    pengertian: "Bahasa berorientasi objek yang portabel (tulis sekali, jalankan di mana saja) dengan JVM.",
    kegunaan: "Aplikasi enterprise, Android, layanan backend skala besar.",
    sejarah: "Dirilis 1995 oleh Sun Microsystems; kini di Oracle dan komunitas OpenJDK.",
    pembuat: "James Gosling dan tim Sun Microsystems.",
  },
  csharp: {
    pengertian: "Bahasa modern pada .NET dengan paradigma multiparadigma dan tooling kuat.",
    kegunaan: "Aplikasi desktop, web, game (Unity), dan layanan cloud.",
    sejarah: "Dirilis awal 2000‑an; berevolusi cepat dengan .NET Core dan .NET 5+.",
    pembuat: "Microsoft (Anders Hejlsberg dan tim).",
  },
};

function DetailsModal({ item, onClose }: { item: Item & { info: Info }; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const sections: Array<{ label: string; body: string }> = [
    { label: "Pengertian", body: item.info.pengertian },
    { label: "Kegunaan", body: item.info.kegunaan },
    { label: "Sejarah", body: item.info.sejarah },
    { label: "Pembuat", body: item.info.pembuat },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9000] grid place-items-center bg-void/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 24, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 24, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-line bg-elev"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Detail ${item.name}`}
        >
          {/* glow hairline */}
          <div aria-hidden className="glow-lime absolute inset-x-0 top-0 h-px bg-accent/70" />

          {/* header */}
          <div className="relative flex items-center justify-between gap-4 border-b border-line bg-panel px-5 py-5 sm:px-7">
            <div className="flex items-center gap-4">
              <div className="relative grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10">
                <img src={`/logos/${item.key}.svg`} alt="" className="h-10 w-10 object-contain" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(200,255,46,0.12),transparent_70%)]"
                />
              </div>
              <div>
                <h4 className="type-display text-2xl font-bold text-hi">{item.name}</h4>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-mut">{item.kind}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              aria-label="Tutup"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white/4 text-mut transition hover:border-accent/50 hover:text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <X size={16} />
            </button>
          </div>

          {/* content */}
          <div className="max-h-[65vh] overflow-y-auto px-5 py-6 sm:px-7">
            {sections.map((s, i) => (
              <div
                key={s.label}
                className={i > 0 ? "mt-6 border-t border-line pt-6" : ""}
              >
                <h5 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-mut">
                  <span className="text-accent">0{i + 1}</span>
                  {s.label}
                </h5>
                <p className="mt-2.5 text-sm leading-relaxed text-body sm:text-[15px]">{s.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function TechShowcase() {
  const [selected, setSelected] = useState<(Item & { info: Info }) | null>(null);

  const frameworks: Item[] = [
    { key: "laravel", kind: "framework", name: "Laravel", color: "#FF2D20" },
    { key: "next", kind: "framework", name: "Next.js", color: "#000000" },
    { key: "svelte", kind: "framework", name: "Svelte", color: "#FF3E00" },
    { key: "spring", kind: "framework", name: "Spring Boot", color: "#6DB33F" },
    { key: "express", kind: "framework", name: "Express.js", color: "#404040" },
    { key: "nestjs", kind: "framework", name: "NestJS", color: "#E0234E" },
  ];

  const languages: Item[] = [
    { key: "javascript", kind: "language", name: "JavaScript", color: "#F7DF1E" },
    { key: "typescript", kind: "language", name: "TypeScript", color: "#3178C6" },
    { key: "php", kind: "language", name: "PHP", color: "#777BB3" },
    { key: "cpp", kind: "language", name: "C++", color: "#00599C" },
    { key: "java", kind: "language", name: "Java", color: "#EA2D2E" },
    { key: "csharp", kind: "language", name: "C#", color: "#68217A" },
  ];

  const open = (it: Item) => {
    const info = it.kind === "framework" ? INFO_FRAMEWORK[it.key] : INFO_LANGUAGE[it.key];
    if (!info) return;
    setSelected({ ...it, info });
  };

  return (
    <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 sm:px-8">
      <div className="relative mb-12">
        {/* ghost index */}
        <span
          aria-hidden
          className="text-outline type-display pointer-events-none absolute -top-8 right-0 select-none text-[8rem] leading-none sm:text-[11rem]"
        >
          02
        </span>
        <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
          <span className="text-accent">02 · Teknologi</span>
          <span className="h-px w-8 bg-line" />
        </p>
        <h3 className="type-display mt-5 text-4xl font-bold text-hi sm:text-5xl md:text-6xl">
          Framework & bahasa yang <span className="serif-accent text-gradient">kukuasai</span>
        </h3>
      </div>

      <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
        <span className="text-accent">A.</span>
        <span>Framework</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <Stagger gap={0.07} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {frameworks.map((f) => (
          <StaggerItem key={f.key}>
            <Badge item={f} onClick={open} />
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mb-5 mt-12 flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
        <span className="text-accent">B.</span>
        <span>Bahasa pemrograman</span>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </div>
      <Stagger gap={0.07} className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {languages.map((l) => (
          <StaggerItem key={l.key}>
            <Badge item={l} onClick={open} />
          </StaggerItem>
        ))}
      </Stagger>

      {selected && <DetailsModal item={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
