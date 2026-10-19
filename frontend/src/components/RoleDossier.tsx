"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { RoleKey } from "./NexusMap";

const roleTitles: Record<RoleKey, string> = {
  frontend: "Frontend",
  backend: "Backend",
  fullstack: "Fullstack",
  devops: "DevOps",
  security: "Cyber Security",
  lead: "Lead Developer",
  iot: "IoT Engineer",
  architect: "System Architect",
};

type SectionContent = {
  analogiFilosofi: string[];
  kompetensiNaratif: string[];
  metodeNaratif: string[];
  dampakPembelajaran: string[];
  timeline: { tahap: string; isi: string }[];
};

const content: Record<RoleKey, SectionContent> = {
  frontend: {
    analogiFilosofi: [
      "Frontend itu yang pertama kali dilihat orang. Ibarat etalase, dia yang bikin pengunjung betah atau langsung pergi. Aku belajar ini dari nol, mulai dari meniru tampilan website yang kusuka, sampai akhirnya bisa bikin sendiri.",
      "Filosofiku sederhana: jangan sampai orang bingung lihat halamanku. Kalau tombol jelas, teks kebaca, dan tidak lemot, itu sudah cukup buatku.",
    ],
    kompetensiNaratif: [
      "Aku terbiasa menyusun halaman dari HTML dan CSS, lalu menghidupkannya dengan JavaScript. Awalnya cuma dari YouTube dan tutorial, lalu mencoba bikin ulang tampilan yang kusuka biar paham caranya.",
      "Sekarang aku mulai pakai framework modern biar rapi dan gampang dirawat. Masih banyak yang kupelajari, tapi yang penting dasar-dasarnya sudah nempel dulu.",
    ],
    metodeNaratif: [
      "Aku biasanya mulai dari meniru lalu membedah: kenapa tombol di sini, kenapa warna ini, gimana bikin responsif. Dari situ baru kubuat versiku sendiri.",
      "Aku cek tampilannya di HP dan laptop, perhatikan jarak, ukuran huruf, dan warna biar nyaman dibaca. Kadang masih berantakan, dan itu wajar, namanya juga belajar.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau tampilan bagus tidak cukup kalau tidak kebaca atau tidak nyaman. Justru yang simpel dan jelas sering lebih baik daripada yang ramai.",
      "Bikin UI itu melatih kesabaran. Satu jarak yang bergeser sedikit saja bisa bikin semuanya keliatan beda.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Mengenal HTML/CSS dasar; membuat halaman profil sederhana. Rasa takjub melihat perubahan warna hanya dari satu baris CSS." },
      { tahap: "SMP Kelas 8", isi: "Mulai JavaScript: manipulasi DOM, event, dan efek transisi kecil. Mencoba membuat navigasi yang halus." },
      { tahap: "SMP Kelas 9", isi: "Belajar komponenisasi: menyalin pola UI berulang, memahami DRY di sisi UI. Mulai peduli aksesibilitas dan kontras." },
      { tahap: "SMK Kelas 10", isi: "Masuk ke framework modern. Menyusun design tokens, tipografi, spacing system, dan animasi mikro bermakna." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Refaktor untuk performa. Mengukur metrik Web Vitals, menerapkan teknik lazy/streaming, dan mengasah UX detail seperti focus ring dan prefer-reduced-motion." },
    ],
  },
  backend: {
    analogiFilosofi: [
      "Kalau frontend itu etalase, backend itu dapurnya. Pengunjung tidak melihatnya, tapi kalau dapurnya rusak, semua ikut kacau. Aku mulai belajar dari pengen tahu gimana data bisa masuk, disimpan, lalu muncul lagi.",
      "Prinsipku: data harus aman dan tidak gampang hilang. Sebelum menambah fitur, pastikan yang menyimpan data sudah benar.",
    ],
    kompetensiNaratif: [
      "Aku belajar bikin API sederhana: terima request, simpan data, kasih balasan. Mulai dari file JSON, terus pindah ke database sungguhan. Buatku, bisa bikin CRUD yang jalan itu pencapaian.",
      "Aku paham konsep dasar request dan response, validasi input, dan gimana menyimpan data dengan rapi. Masih tahap belajar, tapi dasar-dasarnya mulai nempel.",
    ],
    metodeNaratif: [
      "Cara belajarku: bikin proyek kecil dulu. Misalnya form yang datanya masuk ke database, lalu bisa ditampilkan dan dihapus. Dari situ aku paham alurnya.",
      "Kalau ada error, aku baca pesannya, cari di internet, coba-coba sampai jalan. Tidak jarang buntu, tapi justru di situ aku belajar paling banyak.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau satu kesalahan kecil di backend bisa bikin data kacau. Makanya aku mulai rajin validasi dan berpikir dua kali sebelum mengubah sesuatu.",
      "Backend mengajari aku sabar dan teliti. Error kadang tidak langsung ketahuan, dan tidak ada yang bisa menolong selain diriku sendiri.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Memahami konsep request/response dan apa itu server lewat analogi pelayan restoran." },
      { tahap: "SMP Kelas 8", isi: "Eksperimen API sederhana; menyimpan data di file, belajar struktur JSON." },
      { tahap: "SMP Kelas 9", isi: "Mengenal database; merancang tabel sederhana, mencoba query dasar dan relasi." },
      { tahap: "SMK Kelas 10", isi: "Membangun layanan kecil dengan prinsip REST yang jelas, menambah validasi dan auth dasar." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Memperdalam observability dan hardening: batasan rate, kebijakan error, dan desain untuk skalabilitas bertahap." },
    ],
  },
  fullstack: {
    analogiFilosofi: [
      "Fullstack buatku artinya bisa mengurus dua sisi: tampilan dan datanya. Aku suka karena bisa melihat sendiri gimana sebuah fitur jalan dari halaman depan sampai ke database.",
      "Aku sadar tidak perlu jago banget di dua-duanya dulu. Yang penting paham alurnya: data dari mana, ke mana, dan gimana ditampilkan.",
    ],
    kompetensiNaratif: [
      "Aku bisa bikin halaman yang nyambung ke database: form, daftar data, edit, dan hapus. Semua dari hasil belajar otodidak dan tugas sekolah.",
      "Aku mulai paham gimana menyambungkan frontend dan backend biar datanya konsisten. Sering masih kucoba-coba, tapi alurnya sudah kebayang.",
    ],
    metodeNaratif: [
      "Belajarku selalu lewat proyek kecil ujung ke ujung: bikin satu fitur lengkap dari nol. Dari situ aku melihat sendiri bagian mana yang sulit dan kenapa.",
      "Aku catat apa yang bikin buntu, terus cari solusinya. Biasanya jawabannya ada di dokumentasi atau video tutorial.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau bikin fitur itu bukan cuma soal kode, tapi juga memikirkan orang yang memakainya. Fitur canggih tidak ada gunanya kalau bikin bingung.",
      "Fullstack mengajari aku melihat gambaran besar. Sekarang kalau ada masalah, aku bisa menebak kira-kira di sisi mana.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Menyambungkan form sederhana ke penyimpanan data 'improvisasi'." },
      { tahap: "SMP Kelas 8", isi: "Mencoba konsep template di sisi server dan menampilkannya di UI." },
      { tahap: "SMP Kelas 9", isi: "Mengenalkan routing di UI dan routing di server; melihat kesamaannya." },
      { tahap: "SMK Kelas 10", isi: "Membuat produk kecil ujung ke ujung: autentikasi, dashboard, dan CRUD yang rapi." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menambah ketahanan: cache, fallback, dan loading states yang elegan." },
    ],
  },
  devops: {
    analogiFilosofi: [
      "DevOps buatku artinya bikin proses rilis yang rapi biar tidak ribet tiap mau update. Aku belajar dari pengalaman manual: upload file satu-satu, sering lupa, sering error.",
      "Prinsipku: kalau ada pekerjaan yang berulang, cari cara biar otomatis. Tidak harus canggih, yang penting bikin hidup lebih gampang.",
    ],
    kompetensiNaratif: [
      "Aku bisa pakai Git untuk menyimpan dan mengatur versi kode, dan mulai paham deploy sederhana. Dari yang tadinya copy-paste file, sekarang pakai cara yang lebih rapi.",
      "Aku juga belajar bikin skrip kecil untuk otomatisasi tugas yang berulang. Masih sederhana, tapi lumayan mengurangi lupa.",
    ],
    metodeNaratif: [
      "Aku belajar dengan mencoba deploy proyek kecil sendiri dan melihat gimana prosesnya. Setiap error kucatat biar lain kali tidak mengulang.",
      "Mulai dari yang paling simpel: menyimpan kode di Git, terus bikin langkah deploy yang jelas. Baru nanti kalau sudah nyaman, baru otomatisasi.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau proses yang rapi itu menenangkan. Waktu proyekku bisa jalan tanpa drama tiap mau update, rasanya lega banget.",
      "Kesalahan kecil pas deploy mengajari aku buat cek ulang. Sekarang aku lebih teliti sebelum memberikan perubahan.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Manual deploy 'copy paste' file ke server lokal—merasakan rawan error." },
      { tahap: "SMP Kelas 8", isi: "Menulis skrip kecil untuk otomatisasi tugas berulang." },
      { tahap: "SMP Kelas 9", isi: "Mengenal control version dan pentingnya build reproducible." },
      { tahap: "SMK Kelas 10", isi: "Masuk ke container; pipeline CI sederhana dengan test dasar." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menambah monitoring dan alarm; deployment bertahap dan strategi rollback." },
    ],
  },
  security: {
    analogiFilosofi: [
      "Security buatku mulai dari kesadaran: jangan asal menyimpan data orang, jangan gampang percaya input dari user. Aku belajar ini karena pengen aplikasiku tidak gampang dijebol.",
      "Prinsip sederhanaku: perlakukan semua input sebagai sesuatu yang bisa berbahaya, sampai terbukti aman.",
    ],
    kompetensiNaratif: [
      "Aku paham dasar keamanan web: validasi input, password yang baik, dan gimana data sensitif disimpan. Aku juga mulai kenal istilah seperti XSS dan CSRF dari membaca artikel.",
      "Buatku ini masih tahap pengenalan. Tapi aku sudah terbiasa memikirkan keamanan sejak awal pas bikin fitur, bukan menambahkannya belakangan.",
    ],
    metodeNaratif: [
      "Cara belajarku: baca, coba, dan tanya. Aku baca artikel keamanan sederhana, coba praktikkan di proyek kecil, kalau buntu tanya di komunitas.",
      "Aku biasakan diri buat tidak pernah menyimpan password asli, selalu validasi input, dan tidak menampilkan data sensitif sembarangan.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau keamanan itu kebiasaan, bukan fitur. Lebih gampang menjaganya dari awal daripada menambal setelah kebobolan.",
      "Satu pelajaran penting: jangan pernah meremehkan data orang. Walaupun cuma proyek kecil, tetap harus dijaga.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Paham konsep password kuat dan risiko berbagi kredensial." },
      { tahap: "SMP Kelas 8", isi: "Memvalidasi input form dan memahami XSS dasar." },
      { tahap: "SMP Kelas 9", isi: "Mengenal auth dan sesi; menyadari resiko CSRF dan penyimpanan token." },
      { tahap: "SMK Kelas 10", isi: "Menerapkan kebijakan header dan audit dependensi rutin." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menetapkan standar keamanan dasar di proyek dan review rutin." },
    ],
  },
  lead: {
    analogiFilosofi: [
      "Lead buatku bukan soal nyuruh-nyuruh, tapi bantu teman satu tim biar kerjaannya jalan. Aku belajar ini dari tugas kelompok di sekolah.",
      "Prinsipku: kalau aku bisa bikin orang lain ngerti, berarti aku juga paham. Berbagi itu cara terbaik buat belajar.",
    ],
    kompetensiNaratif: [
      "Aku bisa membagi tugas, bikin checklist, dan merangkum langkah kerja biar tim tidak bingung. Ini sering kupakai di proyek kelas.",
      "Aku mulai terbiasa membantu teman yang kesulitan: menunjukkan caranya, bukan mengerjakan semuanya. Lumayan melatih kesabaran.",
    ],
    metodeNaratif: [
      "Cara kerjaku: pastikan semua paham tujuannya dulu, baru membagi tugas. Aku catat progresnya biar tidak ada yang terlewat.",
      "Kalau ada masalah, aku ajak diskusi kecil dulu daripada langsung ambil keputusan sendiri. Kadang jawabannya muncul dari teman.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau ngomong jelas itu penting. Banyak salah paham di tim gara-gara instruksi yang tidak jelas.",
      "Pernah mikir jadi pemimpin itu soal paling pintar, ternyata bukan. Justru soal bikin semua orang bisa bekerja dengan nyaman.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Belajar kerja tim kecil di tugas sekolah dan membagi peran sederhana." },
      { tahap: "SMP Kelas 8", isi: "Mulai merangkum langkah kerja agar teman bisa mengikuti." },
      { tahap: "SMP Kelas 9", isi: "Memimpin mini-proyek kelas; mencoba membuat checklist dan tenggat." },
      { tahap: "SMK Kelas 10", isi: "Membuat guideline sederhana untuk PR dan review di proyek sekolah." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menginisiasi diskusi arsitektur kecil dan membantu teman memperbaiki test serta naming." },
    ],
  },
  iot: {
    analogiFilosofi: [
      "IoT buatku menarik karena menyambungkan dunia nyata sama komputer. Dari jurusan TEI, aku belajar merakit dan merancang hardware, dan itu kerasa seru banget.",
      "Prinsipku: sensor boleh murah, tapi datanya harus benar. Tidak ada gunanya alat canggih kalau bacaannya ngaco.",
    ],
    kompetensiNaratif: [
      "Aku belajar Arduino dan ESP32: nyalain LED, baca sensor, sampai ngirim data. Ini yang paling seru buatku karena langsung kelihatan hasilnya.",
      "Aku juga mulai paham gimana data dari sensor dikirim ke komputer atau server, walaupun masih sering kucoba-coba.",
    ],
    metodeNaratif: [
      "Aku belajar dengan nyoba langsung: rakit, upload kode, lihat hasilnya. Kalau tidak jalan, cek kabel, cek kode, cari di internet.",
      "Biasanya aku mulai dari proyek kecil: sensor suhu, lampu otomatis, terus naik level pelan-pelan.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau hardware itu tidak kenal ampun: kalau salah sambung, langsung tidak jalan. Makanya aku jadi lebih teliti.",
      "IoT mengajari aku buat sabar dan sistematis. Satu kabel lepas saja bisa bikin semua error, dan itu bagian serunya.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Menyusun rangkaian sederhana; menyalakan LED dan membaca sensor dasar." },
      { tahap: "SMP Kelas 8", isi: "Mengirim data sensor ke komputer; mencoba serial dan format data sederhana." },
      { tahap: "SMP Kelas 9", isi: "Eksperimen koneksi nirkabel dan protokol ringan; memahami pentingnya latency." },
      { tahap: "SMK Kelas 10", isi: "Menguji MQTT end-to-end: perangkat → broker → backend kecil." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menstabilkan pengiriman data dan memikirkan pengamanan kredensial perangkat." },
    ],
  },
  architect: {
    analogiFilosofi: [
      "Architect buatku bukan soal bikin rencana rumit, tapi memikirkan struktur dulu sebelum nulis kode. Aku belajar dari pengalaman: dulu langsung nulis tanpa rencana, ujung-ujungnya pusing sendiri.",
      "Prinsipku: atur kode biar rapi dan gampang dicari. Struktur yang jelas bikin aku dan orang lain tidak bingung pas mau mengembangkan.",
    ],
    kompetensiNaratif: [
      "Aku mulai paham cara menyusun folder dan file biar rapi, memisahkan bagian-bagian biar tidak numpuk di satu tempat.",
      "Aku juga belajar berpikir ke depan: kalau nanti fiturnya ditambah, masih gampang tidak mengubahnya? Ini masih terus kulatih.",
    ],
    metodeNaratif: [
      "Cara belajarku: bikin proyek kecil, lihat mana yang berantakan, terus rapikan. Dari situ aku ngerti pentingnya struktur.",
      "Aku suka bikin catatan sederhana soal keputusan yang kuambil, biar nanti tidak lupa kenapa milih cara ini.",
    ],
    dampakPembelajaran: [
      "Aku belajar kalau merencanakan sedikit di awal itu menghemat banyak waktu di akhir. Dulu sering nulis ulang gara-gara tidak mikir dulu.",
      "Bikin struktur itu kayak merapikan kamar: tidak kelihatan penting, tapi bikin semua lebih gampang ditemukan.",
    ],
    timeline: [
      { tahap: "SMP Kelas 7", isi: "Memikirkan struktur folder proyek kecil agar mudah dipahami." },
      { tahap: "SMP Kelas 8", isi: "Mencoba memisahkan bagian aplikasi sesuai tanggung jawabnya." },
      { tahap: "SMP Kelas 9", isi: "Mengenal pola arsitektur; memahami kapan memecah, kapan menyatukan." },
      { tahap: "SMK Kelas 10", isi: "Membuat peta sistem sederhana dan menandai aliran data utama." },
      { tahap: "SMK Kelas 11 (Semester 1)", isi: "Menguji desain dengan beban nyata kecil dan menulis catatan trade-off." },
    ],
  },
};

const SECTIONS: Array<{ label: string; items: (c: SectionContent) => string[] }> = [
  { label: "Analogi & Filosofi", items: (c) => c.analogiFilosofi },
  { label: "Kompetensi", items: (c) => c.kompetensiNaratif },
  { label: "Metode", items: (c) => c.metodeNaratif },
  { label: "Dampak & Pembelajaran", items: (c) => c.dampakPembelajaran },
];

export function RoleDossier({ role, onClose, className }: { role: RoleKey; onClose: () => void; className?: string }) {
  const c = content[role];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.aside
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      role="dialog"
      aria-modal="true"
      aria-label={`Dossier ${roleTitles[role]}`}
      className={cn(
        "fixed right-0 top-0 z-[9000] h-full w-full max-w-xl border-l border-line bg-void/95 backdrop-blur-2xl",
        className
      )}
    >
      {/* glow lime di atas */}
      <div aria-hidden className="glow-lime absolute inset-x-0 top-0 h-px bg-accent/70" />

      <div className="flex items-center justify-between gap-3 border-b border-line bg-panel px-5 py-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-mut">Dossier Peran</div>
          <h3 className="type-display mt-0.5 text-lg font-bold text-hi">{roleTitles[role]}</h3>
        </div>
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Tutup dossier"
          className="rounded-full border border-line bg-transparent px-4 py-2 font-mono text-xs text-mut transition hover:border-accent/50 hover:text-hi focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Tutup
        </button>
      </div>

      <div className="h-[calc(100%-68px)] space-y-8 overflow-y-auto p-5 sm:p-7">
        {SECTIONS.map((s, si) => (
          <section key={s.label}>
            <h4 className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
              <span className="text-accent">{si + 1}.</span>
              {s.label}
              <span aria-hidden className="h-px flex-1 bg-line" />
            </h4>
            <div className="mt-3 space-y-3 text-sm/relaxed text-body">
              {s.items(c).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        {/* 5. Perjalanan Waktu (Kelas 7 SMP → Kelas 2 SMK Semester 1) */}
        <section>
          <h4 className="flex items-center gap-3 font-mono text-xs tracking-[0.25em] uppercase text-mut">
            <span className="text-accent">5.</span>
            Perjalanan Waktu
            <span aria-hidden className="h-px flex-1 bg-line" />
          </h4>
          <ul className="mt-3 space-y-3 text-sm/relaxed text-body">
            {c.timeline.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                <span>
                  <span className="font-medium text-hi">{t.tahap}: </span>
                  <span>{t.isi}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.aside>
  );
}
