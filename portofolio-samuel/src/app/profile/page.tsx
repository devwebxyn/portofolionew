"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PlexusBackground } from "@/components/PlexusBackground";
import { NoSQLInfoPanel } from "@/components/NoSQLInfoPanel";
import { JetBrainsPanel } from "@/components/JetBrainsPanel";
import { CodeWindow } from "@/components/CodeWindow";

// removed unused 'cn' and 'fade'

export default function ProfilePage() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden">
      <PlexusBackground className="opacity-40" nodes={36} accent="#22d3ee" />

      {/* Hero */}
      <header className="relative mx-auto max-w-5xl px-6 pt-16 pb-6">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-white/60 shadow-sm shadow-black/10">
              {/* Placeholder avatar: user can replace with /me.jpg later */}
              <div className="h-full w-full bg-gradient-to-br from-cyan-400 to-violet-500" />
            </div>
            <div>
              <motion.h1 className="inline-block rounded-lg bg-white px-3 py-2 text-3xl font-bold text-black md:text-4xl" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                Samuel Indra Bastian
              </motion.h1>
              <motion.p className="mt-2 inline-flex flex-wrap items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <span className="rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-black">SMK PGRI 3 Malang</span>
                <span className="rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-black">Kelas 2 (Semester 1)</span>
                <span className="rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-black">17 tahun</span>
                <span className="rounded-md bg-white/95 px-2 py-1 text-xs font-medium text-black">Lahir 02 Juli 2008</span>
              </motion.p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/about" className="rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20">About</Link>
            <Link href="/contact" className="rounded-lg bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-white/90">Contact</Link>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Informasi Diri - NoSQL Column & Indexes style */}
          <NoSQLInfoPanel
            fields={[
              { key: "_id", type: "ObjectId", value: "samuel-indra-bastian" },
              { key: "nama", type: "string", value: "Samuel Indra Bastian" },
              { key: "sekolah", type: "string", value: "SMK PGRI 3 Malang" },
              { key: "kelas", type: "string", value: "Kelas 2 (Semester 1)" },
              { key: "usia", type: "number", value: 17 },
              { key: "lahir", type: "date", value: "2008-07-02" },
              { key: "role", type: "string[]", value: "fullstack, iot, lead" },
            ]}
            indexes={[
              { name: "pk_id", fields: ["_id"], type: "unique" },
              { name: "by_nama", fields: ["nama"], type: "text" },
              { name: "by_sekolah_kelas", fields: ["sekolah", "kelas"], type: "compound" },
            ]}
            className="h-full"
          />

          {/* Perjalanan - JetBrains styled panel */}
          <JetBrainsPanel title="Perjalanan" tabs={["Timeline", "Catatan"]} active={0}>
            <ul className="space-y-2 text-sm/relaxed">
              <li>
                <span className="font-medium text-white">Awal SMP Kelas 7:</span> Sekolah memperkenalkan dua hal yang membuat saya tertarik: dasar website dan infrastruktur teknologi. Saya terpikat dunia web—terinspirasi dari Facebook—membayangkan suatu hari bisa membangun seperti itu.
              </li>
              <li>
                <span className="font-medium text-white">SMP (3 tahun):</span> Menekuni web dari UI hingga sistem dasar. Sedikit demi sedikit, saya mampu membangun antarmuka yang rapi dan sistem yang berjalan.
              </li>
              <li>
                <span className="font-medium text-white">Masuk SMK (Jurusan TEI):</span> Arah saya sempat berbelok, namun saya sadar jurusan ini membuka jalan baru—memahami perangkat lunak dan perangkat keras sekaligus. Bukan kegagalan, melainkan perluasan peran.
              </li>
            </ul>
          </JetBrainsPanel>

          {/* Pengalaman Terbaik - VS Code style window */}
          <CodeWindow title="Pengalaman Terbaik" filename="best-experience.md" language="md" className="h-full">
            <div>
              <span className="inline-block rounded bg-black/10 px-1.5 py-0.5 text-xs font-semibold text-black">Momen</span>
              <p className="mt-2 text-black">Saat pertama kali berhasil menciptakan UI dan sistem backend yang benar‑benar bekerja dari hasil belajar mandiri—itulah momen yang menguatkan tekad saya untuk terus melangkah lebih jauh.</p>
              <span className="mt-4 inline-block rounded bg-black/10 px-1.5 py-0.5 text-xs font-semibold text-black">Nilai</span>
              <ul className="mt-1 list-disc pl-6 text-black/90">
                <li>Konsistensi belajar {'>'} kecepatan sesaat</li>
                <li>Produk nyata sebagai validasi pemahaman</li>
                <li>UI rapi + backend solid = pengalaman utuh</li>
              </ul>
            </div>
          </CodeWindow>

          {/* Kata-kata - JetBrains styled quote */}
          <JetBrainsPanel title="Kata-kata" tabs={["Quote"]}>
            <blockquote className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm/relaxed text-white/90">
              “Kesempatan datang pada orang yang ingin menemuinya—bukan kesempatan yang mendatangimu. Ingatlah: semua yang kamu inginkan bisa didapat; semuanya bergantung pada usaha dan kerja kerasmu.”
            </blockquote>
            <div className="mt-3 text-xs text-white/70">— Samuel Indra Bastian</div>
          </JetBrainsPanel>
        </div>
        {/* Timeline visual */}
        <section className="relative mx-auto mt-12 max-w-3xl">
          <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block rounded-md bg-white px-2 py-1 text-black">
            Timeline Perjalanan
          </motion.h3>
          <div className="relative mt-6 pl-8">
            {/* vertical line with soft glow */}
            <div className="pointer-events-none absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-cyan-400/70 via-violet-400/70 to-amber-400/70">
              <div className="absolute inset-0 -translate-x-1/2 blur-[6px]" style={{ background: 'linear-gradient(to bottom, rgba(34,211,238,0.35), rgba(167,139,250,0.35), rgba(245,158,11,0.35))' }} />
            </div>

            {/* items with staggered reveal */}
            <motion.ul
              className="space-y-8"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-20% 0px' }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.12 } },
              }}
            >
              {[
                { title: 'SMP Kelas 7', desc: 'Tertarik dasar website & infrastruktur; terinspirasi untuk membuat seperti Facebook.' },
                { title: 'SMP Kelas 8–9', desc: 'Menekuni web 3 tahun: UI, logika dasar, dan membangun sistem sederhana.' },
                { title: 'SMK Kelas 10', desc: 'Masuk jurusan TEI; mulai melihat peluang lintas software & hardware.' },
                { title: 'SMK Kelas 11 (Semester 1)', desc: 'Memperkuat pondasi: membangun UI yang rapi dan backend yang bekerja.' },
              ].map((it, i) => (
                <motion.li
                  key={i}
                  className="relative"
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } }}
                >
                  <span className="absolute -left-[22px] top-1 grid h-4 w-4 place-items-center">
                    <span className="relative h-2 w-2 rounded-full bg-white">
                      <span className="absolute inset-0 -m-1 rounded-full bg-cyan-400/40 blur-[2px]" aria-hidden />
                    </span>
                  </span>
                  <div className="rounded-lg border border-white/10 bg-slate-900/70 p-4 text-white/90 shadow-sm shadow-black/20">
                    <div className="text-sm font-semibold text-white">{it.title}</div>
                    <div className="text-sm">{it.desc}</div>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* Link kembali */}
        <div className="mt-10 text-center">
          <Link href="/about" className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10">
            Lihat Halaman About
          </Link>
        </div>
      </main>
    </div>
  );
}
