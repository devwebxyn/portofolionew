"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { RoleKey } from "./NexusMap";

const roleTitles: Record<RoleKey, string> = {
  frontend: "Frontend Engineer",
  backend: "Backend Engineer",
  fullstack: "Fullstack Engineer",
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
      "Frontend bagi saya adalah panggung utama tempat interaksi manusia dan mesin bertemu. Ibarat seorang kurator pengalaman di museum interaktif, tugas saya adalah menuntun perhatian, mengurangi gesekan, dan membuat setiap keputusan pengguna terasa intuitif.",
      "Filosofi yang saya pegang: kecepatan itu empati, konsistensi itu kepercayaan, dan aksesibilitas adalah hak semua pengguna. Animasi bukan kembang api, melainkan bahasa tubuh antarmuka yang mengkomunikasikan konteks dan niat.",
    ],
    kompetensiNaratif: [
      "Saya membangun UI yang reaktif dan ringan, meminimalkan re-render, dan memastikan state mengalir jelas. Design system membantu saya menjaga skala: satu sumber kebenaran untuk warna, spacing, dan komponen.",
      "Saya menguji dari perspektif manusia: fokus, keyboard nav, kontras, preferensi gerak. Teknologi adalah alat; tujuan akhirnya adalah rasa tenang saat pengguna mencapai tujuan dengan usaha paling kecil.",
    ],
    metodeNaratif: [
      "Saya memulai dari sketsa interaksi dan aliran perhatian. Saya pecah antarmuka jadi potongan kecil dengan kontrak prop yang jelas, lalu saya sambungkan dengan state management seperlunya.",
      "Saya ukur. Time-to-interactive, LCP, CLS, dan metrik aksesibilitas. Iterasi terjadi di tempat yang memberi dampak paling tinggi pada pengalaman nyata pengguna.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa visual yang indah belum tentu usable; dan sebaliknya, usable belum tentu menyenangkan. Kuncinya menyeimbangkan. Saat UI menjadi 'tak terlihat', itulah keberhasilan.",
      "Kolaborasi desain–engineering mengajarkan kompromi: ketika desain ingin 'lebih dalam', saya sediakan batasan yang sehat agar performa dan maintainability tetap terjaga.",
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
      "Backend adalah jantung yang memompa data—tenang, konsisten, bisa diandalkan. Ibarat pengatur lalu lintas di pusat kendali, ia memastikan setiap permintaan mendapat jawaban yang tepat waktu dan akurat.",
      "Filosofi saya: sederhana lebih tahan lama. Kontrak yang jelas mengurangi asumsi. Observability bukan pelengkap, tetapi indera peraba untuk memahami denyut sistem.",
    ],
    kompetensiNaratif: [
      "Saya merancang endpoint yang eksplisit, validasi yang ketat, dan struktur data yang mudah dievolusi. Saya lebih suka pola yang menyeimbangkan keterbacaan dengan kinerja.",
      "Penyimpanan bukan sekadar 'menaruh data', melainkan memilih bentuk yang mewakili pertanyaan yang paling sering ditanyakan oleh bisnis.",
    ],
    metodeNaratif: [
      "Mulai dari bahasa domain: siapa aktor, apa tindakan, apa aturan. Saya buat kontrak API yang dapat diuji dan disepakati tim lain.",
      "Saya bangun jalur observability (log, metrics, trace) sejak hari pertama, supaya setiap anomali bisa dilacak seperti mengikuti jejak roti di hutan.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa kegagalan itu normal, maka sistem harus antisipatif: timeouts, retry, idempotency. Ketenangan datang dari disiplin mengelola kegagalan.",
      "Menyadari pentingnya komunikasi antar tim—API bukan hanya untuk mesin, tapi juga untuk manusia yang mengembangkan fitur di atasnya.",
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
      "Fullstack adalah jembatan dua pulau—antarmuka dan logika. Seperti insinyur jembatan, saya memastikan pondasi kuat di dua sisi dan sambungan di tengahnya lentur namun kokoh.",
      "Filosofi: hindari over-orkestrasi. Pilih batas yang jelas agar iterasi cepat tanpa saling menghambat. Shared types adalah kontrak yang menenangkan." ,
    ],
    kompetensiNaratif: [
      "Saya mereduksi gesekan antar sisi dengan kontrak yang sama: tipe data bersama, skema validasi yang konsisten.",
      "Trade-off selalu eksplisit: kapan tarik ke frontend demi responsif, kapan tahan di backend demi konsistensi dan keamanan.",
    ],
    metodeNaratif: [
      "Mulai dari journey pengguna, lalu memetakan titik keputusan yang butuh data. Dari situ kontrak disusun dan dirapikan." ,
      "Siklus build–measure–learn dilakukan ujung ke ujung: UI diuji dampaknya, API diuji stabilitasnya.",
    ],
    dampakPembelajaran: [
      "Belajar mengukur beban mental tim—terlalu banyak context switching melelahkan. Alat dan pola harus mengurangi kompleksitas, bukan menambah." ,
      "Setiap kompromi dicatat: keputusan saat ini tidak sakral; harus mudah ditinjau ulang.",
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
      "DevOps adalah logistik dan infrastruktur—seperti sistem metro kota yang harus tepat waktu, aman, dan elastis. Pengguna tidak melihat relnya, tapi merasakan manfaatnya setiap hari.",
      "Filosofi: otomatisasi untuk mengurangi pekerjaan berulang, observability untuk mengurangi tebak-tebakan, dan budaya kolaboratif untuk mempercepat pembelajaran kolektif.",
    ],
    kompetensiNaratif: [
      "Saya membangun pipeline yang dapat dipercaya, mengisolasi lingkungan dengan kontainer, dan mendefinisikan infrastruktur sebagai kode untuk konsistensi." ,
      "Rilis harus membosankan—inilah pujian tertinggi bagi pipeline yang stabil.",
    ],
    metodeNaratif: [
      "Saya mulai dari peta alur rilis: dari commit ke produksi. Saya tempatkan pengaman di titik rawan: test, scan, dan approval yang proporsional." ,
      "Rollback dan observability bukan opsi, melainkan syarat mutlak—sampai yakin, saya anggap rilis belum selesai.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa kecepatan tanpa pengaman adalah ilusi. Kepercayaan tim tumbuh ketika proses transparan dan hasil dapat diprediksi." ,
      "Insiden adalah guru terbaik bila dikelola dengan postmortem yang jujur dan non-blaming.",
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
      "Keamanan adalah pagar hidup—fleksibel, menyesuaikan lanskap ancaman. Seperti penjaga gerbang yang sopan tapi waspada, tujuannya menjaga aliran tanpa menghalangi yang benar.",
      "Filosofi: default-deny untuk hal sensitif, minimalkan permukaan serangan, dan selalu asumsikan input bisa berbahaya.",
    ],
    kompetensiNaratif: [
      "Saya menanamkan kontrol dari awal: validasi, sanitasi, kebijakan header, dan manajemen rahasia. Rantai pasokan juga dijaga lewat audit dependensi.",
      "Keamanan adalah proses, bukan produk; siklusnya berulang dan perlu empati pada developer agar kontrol tidak menjadi beban.",
    ],
    metodeNaratif: [
      "Mulai dari threat modeling ringan: aset, aktor, vektor. Lalu pilih kontrol yang proporsional dan mudah dirawat.",
      "Latih tim: cheat-sheet, template, dan guardrail di pipeline supaya praktik aman terjadi otomatis.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa 'friksi' keamanan harus dikelola—tujuannya menjaga laju tanpa kompromi pada hal-hal prinsipal." ,
      "Insiden kecil mengajarkan kerendahan hati: log bagus, bukti forensik, dan transparansi adalah sahabat.",
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
      "Lead Developer adalah dirigen orkestra: tidak memainkan semua alat, tetapi memastikan harmoni, tempo, dan interpretasi menyatu menjadi musik yang utuh.",
      "Filosofi: kejelasan lebih penting daripada kecerdasan sesaat. Proses sehat mengalahkan heroics. Dua hal kunci—feedback cepat dan psychological safety.",
    ],
    kompetensiNaratif: [
      "Saya menulis standar yang ringan tapi tegas: ukuran PR, definisi selesai, panduan review. Tujuannya mengurangi ambiguitas, bukan menambah birokrasi.",
      "Mentoring adalah investasi kompaun; dokumentasi yang hidup mengurangi ketergantungan pada individu.",
    ],
    metodeNaratif: [
      "Saya memulai dari tujuan bisnis, menerjemahkan ke peta teknis. Risiko awal diekspos, rute alternatif disiapkan. Komunikasi konsisten—ritme sinkronisasi jelas.",
      "Ritualnya sederhana: design review singkat, pairing saat perlu, dan retrospektif tanpa menyalahkan untuk terus membaik.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa keputusan yang lambat seringkali lebih mahal daripada keputusan yang kurang sempurna tapi bisa diperbaiki." ,
      "Kepercayaan dibangun dari konsistensi kecil setiap hari, bukan pidato besar sesekali.",
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
      "IoT adalah menghubungkan denyut dunia fisik ke sistem digital—seperti menerjemahkan detak jantung ke notasi musik yang bisa dianalisis dan dinikmati.",
      "Filosofi: keandalan sinyal mengalahkan kemewahan fitur. Protokol ringan, data hemat, dan toleransi gangguan adalah pondasi.",
    ],
    kompetensiNaratif: [
      "Saya merancang aliran data dari sensor hingga dashboard, meminimalkan overhead, dan memilih format yang efisien." ,
      "Manajemen perangkat—provisioning, pembaruan, dan keamanan—dipikirkan sejak awal untuk mencegah penumpukan utang teknis.",
    ],
    metodeNaratif: [
      "Mulai dari ketersediaan listrik dan jaringan. Saya desain ulang agar tetap berguna meski koneksi goyah—buffering, retry, dan kompresi." ,
      "Saya pastikan jalur observasi dari lapangan ke server jelas, supaya anomali bisa cepat diisolasi.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa batasan hardware memaksa kreativitas. Keputusan kecil soal ukuran paket atau jeda pengiriman menentukan umur baterai." ,
      "Keamanan fisik sama pentingnya dengan logika aplikasi: akses perangkat, firmware, dan kredensial harus dijaga.",
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
      "Arsitek Sistem adalah perancang kota digital: menetapkan zona, jalur utama, dan ruang hijau agar kota tumbuh tertib tanpa kehilangan kehidupan.",
      "Filosofi: desain untuk berubah. Batas konteks yang jelas, kontrak yang stabil, dan kapabilitas yang dapat diganti tanpa mengguncang seluruh sistem.",
    ],
    kompetensiNaratif: [
      "Saya menyusun peta konteks agar tim paham wilayah kewenangannya. Saya mengutamakan observability agar keputusan bisa dievaluasi berdasarkan data." ,
      "Saya memilih kesederhanaan progresif: mulai monolit rapi bila cocok, bercabang ketika benar-benar diperlukan.",
    ],
    metodeNaratif: [
      "Saya mulai dari bahasa domain dan aliran nilai. Saya tandai coupling yang berbahaya dan mencari cara memutuskannya secara bertahap." ,
      "Saya bawa eksperimen kecil ke lingkungan nyata—spike, canary—supaya opini dibuktikan data, bukan volume suara.",
    ],
    dampakPembelajaran: [
      "Belajar bahwa ketahanan lahir dari kemampuan menerima perubahan, bukan dari rencana yang 'sempurna'." ,
      "Komunikasi visual (peta sederhana) sering lebih efektif daripada paragraf panjang dokumentasi.",
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

export function RoleDossier({ role, onClose, className }: { role: RoleKey; onClose: () => void; className?: string }) {
  const c = content[role];

  return (
    <motion.aside
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed right-0 top-0 z-[9000] h-full w-full max-w-xl border-l border-white/10 bg-[#0b0b0f]/95 backdrop-blur-xl",
        className
      )}
    >
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4" style={{ background: "rgba(255,255,255,0.95)" }}>
        <h3 className="text-lg font-semibold text-black">{roleTitles[role]} — Dossier</h3>
        <button onClick={onClose} className="rounded-md border px-3 py-1 text-sm text-black hover:bg-black/5" style={{ background: "rgba(255,255,255,0.9)", borderColor: "rgba(0,0,0,0.1)" }}>
          Tutup
        </button>
      </div>

      <div className="h-[calc(100%-56px)] overflow-y-auto p-5 space-y-6">
        {/* 1. Analogi & Filosofi */}
        <section>
          <h4 className="inline-block rounded-md bg-white px-2 py-1 text-base font-semibold text-black">1. Analogi & Filosofi</h4>
          <div className="mt-2 space-y-2 text-sm text-white/90">
            {c.analogiFilosofi.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 2. Kompetensi Inti (Naratif) */}
        <section>
          <h4 className="inline-block rounded-md bg-white px-2 py-1 text-base font-semibold text-black">2. Kompetensi Inti</h4>
          <div className="mt-2 space-y-2 text-sm text-white/90">
            {c.kompetensiNaratif.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 3. Metodologi & Cara Kerja (Naratif) */}
        <section>
          <h4 className="inline-block rounded-md bg-white px-2 py-1 text-base font-semibold text-black">3. Metodologi & Cara Kerja</h4>
          <div className="mt-2 space-y-2 text-sm text-white/90">
            {c.metodeNaratif.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 4. Dampak & Pembelajaran */}
        <section>
          <h4 className="inline-block rounded-md bg-white px-2 py-1 text-base font-semibold text-black">4. Dampak & Pembelajaran</h4>
          <div className="mt-2 space-y-2 text-sm text-white/90">
            {c.dampakPembelajaran.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* 5. Perjalanan Waktu (Kelas 7 SMP → Kelas 2 SMK Semester 1) */}
        <section>
          <h4 className="inline-block rounded-md bg-white px-2 py-1 text-base font-semibold text-black">5. Perjalanan Waktu</h4>
          <ul className="mt-2 space-y-2 text-sm text-white/90">
            {c.timeline.map((t, i) => (
              <li key={i}>
                <span className="font-medium text-white">{t.tahap}: </span>
                <span className="text-white/90">{t.isi}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </motion.aside>
  );
}
