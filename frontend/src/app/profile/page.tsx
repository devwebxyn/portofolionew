"use client";

import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/ui";

const IDENTITAS = [
  { label: "Nama", value: "Samuel Indra Bastian" },
  { label: "Sekolah", value: "SMK PGRI 3 Malang" },
  { label: "Jurusan", value: "Teknik Elektronika Industri (TEI)" },
  { label: "Kelas", value: "Kelas 2 (Semester 1)" },
  { label: "Usia", value: "17 tahun" },
  { label: "Tanggal Lahir", value: "02 Juli 2008" },
  { label: "Fokus", value: "Fullstack, IoT, Lead" },
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

export default function ProfilePage() {
  return (
    <div className="relative w-full min-h-[100svh] overflow-hidden">
      {/* ghost backdrop */}
      <div aria-hidden className="pointer-events-none absolute -top-6 right-0 select-none">
        <span className="text-outline type-display text-[38vw] leading-none sm:text-[30vw]">SIB</span>
      </div>

      {/* Hero */}
      <header className="relative mx-auto max-w-6xl px-5 pt-16 pb-6 sm:px-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Reveal>
              <div className="relative h-24 w-24 overflow-hidden rounded-full ring-gradient">
                {/* Placeholder avatar: user can replace with /me.jpg later */}
                <div className="h-full w-full bg-gradient-to-br from-accent to-accent2" />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
                  Profil <span className="text-accent">· Identitas</span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="type-display mt-3 text-5xl font-bold text-hi sm:text-6xl">
                  Samuel Indra{" "}
                  <span className="serif-accent text-gradient">Bastian</span>
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="glass rounded-full px-3 py-1.5 font-mono text-xs text-body">SMK PGRI 3 Malang</span>
                  <span className="glass rounded-full px-3 py-1.5 font-mono text-xs text-body">Kelas 2 (Semester 1)</span>
                  <span className="glass rounded-full px-3 py-1.5 font-mono text-xs text-body">17 tahun</span>
                  <span className="glass rounded-full px-3 py-1.5 font-mono text-xs text-body">Lahir 02 Juli 2008</span>
                </div>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.2}>
            <div className="flex items-center gap-3">
              <Link href="/about" className="rounded-full border border-line px-5 py-2.5 text-sm text-hi transition-colors hover:border-accent/60 hover:bg-white/5">About</Link>
              <Link href="/contact" className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]">Contact</Link>
            </div>
          </Reveal>
        </div>
      </header>

      <main className="relative mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Stagger className="grid grid-cols-1 gap-6 md:grid-cols-2" gap={0.1}>
          {/* Identitas */}
          <StaggerItem className="md:col-span-2">
            <section className="h-full rounded-3xl border border-line bg-panel transition-colors hover:border-accent/40">
              <div className="border-b border-line bg-white/4 px-5 py-3">
                <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
                  Identitas <span className="text-accent">· Data Diri</span>
                </div>
              </div>
              <dl className="divide-y divide-line">
                {IDENTITAS.map((f) => (
                  <div key={f.label} className="flex flex-col gap-1 px-5 py-3.5 sm:flex-row sm:items-baseline sm:gap-6">
                    <dt className="w-36 shrink-0 font-mono text-xs uppercase tracking-[0.2em] text-mut">{f.label}</dt>
                    <dd className="text-sm text-hi">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </StaggerItem>

          {/* Perjalanan */}
          <StaggerItem>
            <section className="flex h-full flex-col rounded-3xl border border-line bg-panel p-6 transition-colors hover:border-accent/40">
              <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
                Perjalanan <span className="text-accent">· Cerita</span>
              </div>
              <div className="mt-4 space-y-4 text-sm/relaxed text-body">
                {PERJALANAN.map((p) => (
                  <p key={p.judul}>
                    <span className="font-medium text-hi">{p.judul}: </span>
                    {p.isi}
                  </p>
                ))}
              </div>
            </section>
          </StaggerItem>

          {/* Pengalaman Terbaik */}
          <StaggerItem>
            <section className="flex h-full flex-col rounded-3xl border border-line bg-panel p-6 transition-colors hover:border-accent/40">
              <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
                Pengalaman <span className="text-accent">· Terbaik</span>
              </div>
              <div className="mt-4">
                <span className="inline-block rounded bg-white/4 px-2 py-0.5 font-mono text-xs text-accent">Momen</span>
                <p className="mt-2 text-sm/relaxed text-body">
                  Saat pertama kali berhasil menciptakan UI dan sistem backend yang benar-benar bekerja dari hasil belajar mandiri, itulah momen yang menguatkan tekad saya untuk terus melangkah lebih jauh.
                </p>
                <span className="mt-5 inline-block rounded bg-white/4 px-2 py-0.5 font-mono text-xs text-accent">Nilai</span>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm/relaxed text-body">
                  <li>Konsistensi belajar {'>'} kecepatan sesaat</li>
                  <li>Produk nyata sebagai validasi pemahaman</li>
                  <li>UI rapi + backend solid = pengalaman utuh</li>
                </ul>
              </div>
            </section>
          </StaggerItem>

          {/* Kata-kata */}
          <StaggerItem className="md:col-span-2">
            <section className="rounded-3xl border border-line bg-panel p-6 transition-colors hover:border-accent/40 sm:p-8">
              <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
                Kata-kata <span className="text-accent">· Quote</span>
              </div>
              <blockquote className="mt-4 text-base/relaxed text-body sm:text-lg">
                <span className="font-mono text-accent">“</span>
                Kesempatan datang pada orang yang ingin menemuinya, bukan kesempatan yang mendatangimu. Ingatlah: semua yang kamu inginkan bisa didapat; semuanya bergantung pada usaha dan kerja kerasmu.
              </blockquote>
              <div className="mt-3 text-xs text-mut">- Samuel Indra Bastian</div>
            </section>
          </StaggerItem>
        </Stagger>

        {/* Timeline visual */}
        <section className="relative mx-auto mt-20 max-w-3xl">
          <Reveal>
            <div className="font-mono text-xs tracking-[0.25em] uppercase text-mut">
              Perjalanan <span className="text-accent">· Timeline</span>
            </div>
            <h2 className="type-display mt-3 text-3xl font-bold text-hi sm:text-4xl">
              Timeline <span className="serif-accent text-gradient">Perjalanan</span>
            </h2>
          </Reveal>

          <div className="relative mt-10 pl-10">
            {/* vertical line with soft glow */}
            <div className="pointer-events-none absolute top-0 bottom-0 left-5 w-[2px] bg-gradient-to-b from-accent via-accent2 to-accent3">
              <div className="absolute inset-0 -translate-x-1/2 blur-[6px] bg-gradient-to-b from-accent/40 via-accent2/40 to-accent3/40" />
            </div>

            {/* items with staggered reveal */}
            <Stagger gap={0.12} className="space-y-8">
              {TIMELINE.map((it, i) => (
                <StaggerItem key={it.title} className="relative">
                  <span className="absolute -left-[31px] top-1.5 grid h-4 w-4 place-items-center">
                    <span className="glow-lime relative h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <div className="rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-accent/40">
                    <div className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Fase 0{i + 1}</div>
                    <div className="type-display mt-1 text-lg font-bold text-hi">{it.title}</div>
                    <div className="mt-1.5 text-sm text-body">{it.desc}</div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Link kembali */}
        <Reveal>
          <div className="mt-14 text-center">
            <Link href="/about" className="group inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm text-hi transition-colors hover:border-accent/60 hover:bg-white/5">
              Lihat Halaman About
              <span className="text-accent transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </Reveal>
      </main>
    </div>
  );
}
