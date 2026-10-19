"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Gauge,
  Layers,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
} from "lucide-react";
import { HeroCartoon } from "@/components/HeroCartoon";
import {
  Counter,
  Magnetic,
  Marquee,
  Reveal,
  SectionHeading,
  SpotlightCard,
  StatusPill,
  Stagger,
  StaggerItem,
  WordReveal,
} from "@/components/ui";
import { EASE } from "@/lib/motion";

const ROLES = ["Fullstack Developer", "IoT Engineer", "System Architect", "UI/UX Engineer"];

const STATS = [
  { to: 15, suffix: "+", label: "proyek & eksperimen" },
  { to: 12, suffix: "+", label: "teknologi dikuasai" },
  { to: 6, suffix: "+", label: "tahun berkarya" },
  { to: 8, suffix: "", label: "peran yang dijalani" },
];

const SERVICES = [
  {
    icon: Layers,
    title: "Fullstack Development",
    desc: "Dari database hingga pixel terakhir. Produk utuh yang cepat, konsisten, dan mudah dirawat.",
    span: "lg:col-span-2",
    big: true,
  },
  {
    icon: Cpu,
    title: "IoT Engineering",
    desc: "Dunia fisik → data → dashboard. Andal di jaringan yang fluktuatif.",
    span: "",
    big: false,
  },
  {
    icon: Gauge,
    title: "DevOps & Otomasi",
    desc: "Pipeline yang membosankan dalam arti baik: rilis stabil, observability sejak hari pertama.",
    span: "",
    big: false,
  },
  {
    icon: ShieldCheck,
    title: "Keamanan Aplikasi",
    desc: "Validasi ketat, default-deny, audit dependensi. Aman sejak awal, bukan setelah celaka.",
    span: "",
    big: false,
  },
  {
    icon: TerminalSquare,
    title: "Arsitektur Sistem",
    desc: "Desain untuk berubah. Batas konteks jelas, kontrak stabil, tanpa over-engineering.",
    span: "",
    big: false,
  },
  {
    icon: Sparkles,
    title: "UI Craft & Motion",
    desc: "Antarmuka yang terasa hidup — mikro-interaksi bermakna, bukan hiasan semata.",
    span: "lg:col-span-2",
    big: true,
  },
];

const MARQUEE = [
  "Laravel", "Next.js", "React", "TypeScript", "Tailwind", "Node.js",
  "Express", "NestJS", "Svelte", "ESP32", "Firebase", "PostgreSQL",
];

const PRINCIPLES = [
  "Performa diukur, bukan diasumsikan",
  "Sederhana lebih tahan lama",
  "Desain halus, sistem kokoh",
  "Hormati preferensi pengguna",
  "Produk nyata = validasi pemahaman",
];

export default function HomePage() {
  const roleIndex = useRotatingIndex(ROLES.length, 2400);

  return (
    <>
      {/* ---------- HERO ---------- */}
      <section className="relative flex min-h-svh items-center overflow-hidden px-5 sm:px-10">
        {/* ghost backdrop */}
        <div aria-hidden className="pointer-events-none absolute -top-10 right-0 select-none">
          <span className="text-outline type-display text-[40vw] leading-none sm:text-[34vw]">SIB</span>
        </div>
        <div aria-hidden className="grid-lines absolute inset-0" />

        <div className="relative mx-auto grid w-full max-w-[90rem] items-center gap-14 pt-24 pb-16 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left: copy */}
          <div>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
              <StatusPill />
            </motion.div>

            <h1 className="type-display mt-7 text-6xl font-bold text-hi sm:text-8xl xl:text-9xl">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
                >
                  Samuel Indra
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="text-gradient block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.22 }}
                >
                  Bastian<span className="text-accent">.</span>
                </motion.span>
              </span>
            </h1>

            <motion.div
              className="mt-6 flex items-center gap-3 font-mono text-sm text-mut sm:text-base"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.34 }}
            >
              <span className="text-accent">~/</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="text-hi"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>

            <motion.p
              className="mt-6 max-w-xl text-lg text-body sm:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.42 }}
            >
              Aku membangun produk digital <span className="text-hi">end-to-end</span> — antarmuka yang
              terasa hidup, sistem di belakang yang <span className="text-hi">kokoh, cepat, dan aman</span>.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.5 }}
            >
              <Magnetic>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-void transition-all hover:shadow-[0_0_36px_rgba(200,255,46,0.5)]"
                >
                  Lihat karya
                  <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-base font-semibold text-hi transition-all hover:border-accent/60 hover:bg-white/5"
                >
                  Ajak ngobrol
                  <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Magnetic>
            </motion.div>
          </div>

          {/* Right: 16:9 premium motion scene */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          >
            <HeroCartoon className="w-full max-w-3xl" />
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          <a href="#stats" className="flex flex-col items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-mut uppercase">
            <ArrowDown size={14} className="animate-bounce text-accent" />
            scroll
          </a>
        </motion.div>
      </section>

      {/* ---------- STATS ---------- */}
      <section id="stats" className="relative border-y border-line">
        <Stagger className="mx-auto grid max-w-[90rem] grid-cols-2 md:grid-cols-4" gap={0.05}>
          {STATS.map((s) => (
            <StaggerItem key={s.label} className="border-r border-line last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r">
              <div className="px-6 py-10 sm:px-10">
                <div className="type-display text-5xl font-bold text-gradient sm:text-7xl">
                  <Counter to={s.to} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mut">{s.label}</div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------- WHAT I DO (bento) ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 py-24 sm:px-10">
        <Reveal>
          <SectionHeading
            index="01"
            title={
              <>
                Yang bisa <span className="serif-accent text-gradient">kukerjakan</span>
              </>
            }
            sub="Bukan sekadar menulis kode — merancang solusi utuh dari permukaan hingga fondasi."
          />
        </Reveal>

        <Stagger className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {SERVICES.map((s) => (
            <StaggerItem key={s.title} className={s.span}>
              <SpotlightCard className="glass glass-hover h-full rounded-3xl p-7">
                <div className="relative h-full">
                  <div className="flex items-center justify-between">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent">
                      <s.icon size={22} />
                    </div>
                    <span className="font-mono text-xs text-mut">0{SERVICES.indexOf(s) + 1}</span>
                  </div>
                  <h3 className="type-display mt-6 text-2xl font-bold text-hi">{s.title}</h3>
                  <p className="mt-3 max-w-md text-body">{s.desc}</p>
                  {s.big && (
                    <div aria-hidden className="stripes pointer-events-none absolute -right-6 -bottom-6 h-24 w-40 opacity-40" />
                  )}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ---------- TECH MARQUEE ---------- */}
      <section className="border-y border-line py-6">
        <Marquee duration={26}>
          {MARQUEE.map((t) => (
            <span key={t} className="mx-7 flex items-center gap-7 type-display text-3xl font-bold text-mut transition-colors hover:text-hi sm:text-4xl">
              {t}
              <span className="text-accent">✦</span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* ---------- PHILOSOPHY ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 py-28 sm:px-10">
        <Reveal>
          <SectionHeading index="02" title={<>Filosofi <span className="serif-accent text-gradient">kerjaku</span></>} />
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <p className="type-display max-w-5xl text-3xl font-bold leading-[1.15] text-hi sm:text-5xl">
            <WordReveal
              text="Kecepatan itu empati. Konsistensi itu kepercayaan. Dan aksesibilitas adalah hak semua orang."
              accentWords={["empati.", "kepercayaan."]}
            />
          </p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-12 flex flex-wrap gap-3">
            {PRINCIPLES.map((p, i) => (
              <span key={p} className="glass inline-flex items-center gap-3 rounded-full px-5 py-2.5 text-sm text-body transition-colors hover:border-accent/50 hover:text-hi">
                <span className="font-mono text-xs text-accent">0{i + 1}</span>
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

function useRotatingIndex(length: number, interval: number) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % length), interval);
    return () => clearInterval(id);
  }, [length, interval]);
  return i;
}
