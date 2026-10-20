"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Counter, Magnetic, Reveal, Stagger, StaggerItem, TiltCard } from "@/components/ui";
import { EASE, viewportOnce } from "@/lib/motion";

const IDENTITAS = [
  { label: "Nama", value: "Samuel Indra Bastian" },
  { label: "Sekolah", value: "SMK PGRI 3 Malang" },
  { label: "Jurusan", value: "Teknik Elektronika Industri (TEI)" },
  { label: "Kelas", value: "Kelas 2 (Semester 1)" },
  { label: "Usia", value: "17 tahun" },
  { label: "Tanggal Lahir", value: "02 Juli 2008" },
  { label: "Fokus", value: "Fullstack, IoT, Lead" },
];

const FACTS: Array<{ label: string; to?: number; suffix?: string; text?: string }> = [
  { to: 17, suffix: " tahun", label: "Usia" },
  { to: 2008, suffix: "", label: "Tanggal lahir" },
  { text: "Kelas 2", label: "Kelas" },
  { text: "TEI", label: "Jurusan SMK" },
];

const PERJALANAN = [
  {
    judul: "Awal SMP Kelas 7",
    isi: "Sekolah memperkenalkan dua hal yang membuat saya tertarik: dasar website dan infrastruktur teknologi. Saya terpikat dunia web, terinspirasi dari Facebook, membayangkan suatu hari bisa membangun seperti itu.",
  },
  {
    judul: "SMP (3 tahun)",
    isi: "Menekuni web dari UI hingga sistem dasar. Sedikit demi sedikit, saya mampu membangun antarmuka yang rapi dan sistem yang berjalan.",
  },
  {
    judul: "Masuk SMK (Jurusan TEI)",
    isi: "Arah saya sempat berbelok, namun saya sadar jurusan ini membuka jalan baru, memahami perangkat lunak dan perangkat keras sekaligus. Bukan kegagalan, melainkan perluasan peran.",
  },
];

const TIMELINE = [
  { title: "SMP Kelas 7", desc: "Tertarik dasar website & infrastruktur; terinspirasi untuk membuat seperti Facebook." },
  { title: "SMP Kelas 8–9", desc: "Menekuni web 3 tahun: UI, logika dasar, dan membangun sistem sederhana." },
  { title: "SMK Kelas 10", desc: "Masuk jurusan TEI; mulai melihat peluang lintas software & hardware." },
  { title: "SMK Kelas 11 (Semester 1)", desc: "Memperkuat pondasi: membangun UI yang rapi dan backend yang bekerja." },
];

const PENGALAMAN = [
  {
    tag: "Momen",
    isi: "Saat pertama kali berhasil menciptakan UI dan sistem backend yang benar-benar bekerja dari hasil belajar mandiri, itulah momen yang menguatkan tekad saya untuk terus melangkah lebih jauh.",
  },
  {
    tag: "Nilai",
    items: [
      "Konsistensi belajar {'>'} kecepatan sesaat",
      "Produk nyata sebagai validasi pemahaman",
      "UI rapi + backend solid = pengalaman utuh",
    ],
  },
];

export default function ProfilePage() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* ---------- HERO: nama + identity card ---------- */}
      <header className="relative mx-auto max-w-[90rem] px-5 pt-24 pb-14 sm:px-10">
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left: nama */}
          <div>
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
                <span className="text-accent">03</span>
                <span className="h-px w-8 bg-line" />
                <span>Profil · Identitas</span>
              </p>
            </Reveal>

            <h1 className="type-display relative mt-8 text-6xl font-bold tracking-[-0.03em] text-hi sm:text-7xl xl:text-8xl">
              <span className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "115%" }}
                  whileInView={{ y: "0%" }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.1 }}
                >
                  Samuel Indra
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  className="serif-accent text-gradient block"
                  initial={{ y: "115%" }}
                  whileInView={{ y: "0%" }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.75, ease: EASE, delay: 0.22 }}
                >
                  Bastian
                </motion.span>
              </span>
              <motion.span
                aria-hidden
                className="absolute -bottom-1 left-0 h-px w-full bg-accent/80"
                style={{ transformOrigin: "left", scaleX: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
              />
            </h1>

            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-hi transition-colors hover:border-accent/60 hover:bg-white/5"
                  >
                    About
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]"
                  >
                    Contact
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          {/* Right: identity card (tilt) */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
            className="flex justify-center lg:justify-end"
          >
            <TiltCard max={7} className="relative w-full max-w-md">
              <div className="relative rounded-3xl border border-line bg-panel p-7">
                <span aria-hidden className="absolute right-0 top-0 grid h-14 w-14 place-items-center bg-accent font-mono text-xs font-bold text-void">
                  ID
                </span>

                <div className="flex items-center gap-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full ring-gradient">
                    {/* Placeholder avatar: user can replace with /me.jpg later */}
                    <div className="h-full w-full bg-gradient-to-br from-accent to-accent2" />
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-[0.2em] text-mut">Identitas</div>
                    <div className="type-display mt-1 text-xl font-bold text-hi">Samuel Bastian</div>
                    <div className="font-mono text-xs text-body">Fullstack · IoT · Student</div>
                  </div>
                </div>

                <dl className="mt-6 divide-y divide-line">
                  {IDENTITAS.slice(1).map((f) => (
                    <div key={f.label} className="flex items-baseline justify-between gap-4 px-4 py-2.5">
                      <dt className="font-mono text-xs uppercase tracking-[0.15em] text-mut">{f.label}</dt>
                      <dd className="text-right font-mono text-sm text-hi">{f.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </header>

      {/* ---------- FACT STRIP (data asli, Counter) ---------- */}
      <section className="border-y border-line">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {FACTS.map((f, i) => (
            <div key={f.label} className="border-r border-line px-6 py-10 last:border-r-0 [&:nth-child(2)]:border-r-0 md:[&:nth-child(2)]:border-r sm:px-10">
              <Reveal delay={0.05 * i}>
                <div className="type-display text-4xl font-bold text-hi sm:text-5xl">
                  {typeof f.to === "number" ? <Counter to={f.to} suffix={f.suffix} /> : f.text}
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-mut">{f.label}</div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- IDENTITAS: spec sheet ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 pt-20 sm:px-10">
        <Reveal>
          <h2 className="type-display text-3xl font-bold text-hi sm:text-4xl">
            Identitas <span className="serif-accent text-gradient">utuh</span>
          </h2>
          <p className="mt-2 max-w-2xl text-body">Data utuh dalam satu kolom: sekolah, jurusan, dan perjalanan belajar.</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <dl className="divide-y divide-line rounded-3xl border border-line bg-panel">
            {IDENTITAS.map((f) => (
              <div key={f.label} className="group flex items-baseline justify-between gap-6 px-6 py-4 transition-colors hover:bg-white/[0.02] sm:px-8">
                <dt className="font-mono text-xs uppercase tracking-[0.2em] text-mut">{f.label}</dt>
                <dd className="text-right font-mono text-sm text-hi">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      {/* ---------- PERJALANAN + PENGALAMAN (split) ---------- */}
      <section className="mx-auto max-w-[90rem] px-5 pt-24 sm:px-10">
        <div className="grid items-start gap-14 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
                <span className="text-accent">Cerita</span>
                <span className="h-px w-8 bg-line" />
                <span>Perjalanan</span>
              </div>
              <h2 className="type-display mt-5 text-3xl font-bold text-hi sm:text-4xl">
                Cerita <span className="serif-accent text-gradient">belajar</span>
              </h2>
            </Reveal>

            <div className="mt-10 space-y-8">
              <Stagger gap={0.12}>
                {PERJALANAN.map((p, i) => (
                  <StaggerItem key={p.judul} className="rounded-2xl border border-line bg-panel px-6 py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-accent">0{i + 1}</span>
                      <h3 className="type-display text-lg font-bold text-hi">{p.judul}</h3>
                    </div>
                    <p className="mt-3 text-sm/relaxed text-body">{p.isi}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>

          <div>
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
                <span className="text-accent">Pengalaman</span>
                <span className="h-px w-8 bg-line" />
                <span>Terbaik</span>
              </div>
            </Reveal>

            <div className="mt-10">
              <Stagger gap={0.12}>
                {PENGALAMAN.map((p, i) => (
                  <StaggerItem key={p.tag} className="rounded-2xl border border-line bg-panel px-6 py-5">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-sm text-accent">0{i + 1}</span>
                      <h3 className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-hi">{p.tag}</h3>
                    </div>
                    {p.isi && <p className="mt-3 text-sm/relaxed text-body">{p.isi}</p>}
                    {p.items && (
                      <ul className="mt-3 space-y-1.5">
                        {p.items.map((it) => (
                          <li key={it} className="flex items-start gap-2 text-sm/relaxed text-body">
                            <span className="text-accent">-</span>
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- TIMELINE: garis ku-jalur saat scroll ---------- */}
      <section className="relative mx-auto max-w-3xl px-5 pt-24 sm:px-8">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
            <span className="text-accent">Timeline</span>
            <span className="h-px w-8 bg-line" />
            <span>Perjalanan</span>
          </div>
          <h2 className="type-display mt-5 text-3xl font-bold text-hi sm:text-4xl">
            Dari <span className="serif-accent text-gradient">nul</span> sampai sekarang
          </h2>
        </Reveal>

        <div className="relative mt-12 pl-10">
          {/* garis vertical, draw on scroll */}
          <motion.span
            aria-hidden
            className="absolute left-5 top-0 w-[2px] bg-gradient-to-b from-accent via-accent2 to-accent3"
            style={{ transformOrigin: "top", scaleY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.3, ease: EASE }}
          />

          {TIMELINE.map((it, i) => (
            <Reveal key={it.title} delay={0.1 + 0.06 * i} className="relative">
              <span className="absolute -left-[31px] top-3 grid h-4 w-4 place-items-center">
                <span className="relative h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
              <div className="rounded-2xl border border-line bg-panel px-6 py-4">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Fase 0{i + 1}</span>
                  <span className="type-display text-lg font-bold text-hi">{it.title}</span>
                </div>
                <p className="mt-2 text-sm/relaxed text-body">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- QUOTE full-width ---------- */}
      <section className="relative mx-auto max-w-[90rem] px-5 pt-28 sm:px-10">
        <motion.blockquote
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative rounded-3xl border border-line bg-panel px-8 py-12 sm:px-14"
        >
          <span aria-hidden className="font-serif text-7xl leading-none text-accent">“</span>
          <p className="type-display mt-2 text-2xl leading-[1.2] font-bold text-hi sm:text-4xl">
            Kesempatan datang pada orang yang ingin menemuinya, bukan kesempatan yang mendatangimu.
          </p>
          <p className="mt-6 text-sm text-body">
            Ingatlah: semua yang kamu inginkan bisa didapat; semuanya bergantung pada usaha dan kerja kerasmu.
          </p>
          <footer className="mt-4 text-xs text-mut">- Samuel Indra Bastian</footer>
        </motion.blockquote>
      </section>

      {/* ---------- CTA bottom ---------- */}
      <Reveal>
        <div className="mx-auto mt-20 max-w-[90rem] px-5 text-center sm:px-10">
          <Magnetic>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-sm font-semibold text-hi transition-colors hover:border-accent/60 hover:bg-white/5"
            >
              Lihat Halaman About
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}