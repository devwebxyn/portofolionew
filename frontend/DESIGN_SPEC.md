# Design System "VOID" — hitam pekat + aksen lime/cyan, editorial, berani

Redesign 4 halaman (About, Projects, Profile, Contact) ke bahasa desain VOID. JANGAN ubah: `globals.css`, `layout.tsx`, `ui.tsx`, `motion.ts`, `Navbar.tsx`, `Footer.tsx`, `Avatar.tsx`, `page.tsx` (sudah final — baca sebagai referensi gaya).

## Tokens (class Tailwind siap)

- Warna: `bg-void` `#030304` (dasar), `bg-panel` `#0a0b0e`, `bg-elev` `#12141a`, `text-hi` `#f2f4f8`, `text-body` `#a7adb8`, `text-mut` `#6b7280`, `text-accent` (LIME `#c8ff2e`), `accent2` (cyan `#22e0ff`), `accent3` (violet `#a78bfa`), `ok` `#34d399`, `border-line` = `rgba(255,255,255,0.09)`, `bg-accent/12`, `text-void`.
- Font: `type-display` (Space Grotesk, judul besar, tracking ketat), `serif-accent` (italic serif — untuk SATU kata aksen), `font-mono` (label kode).
- Utilitas: `.text-gradient` (lime→cyan), `.text-outline` (ghost text), `.glass`, `.ring-gradient`, `.aurora`, `.grain`, `.stripes`, `.animate-marquee`, `.animate-pulse-dot`, `.glow-lime`.

## Gaya inti VOID (WAJIB)

1. **Semua gelap hitam pekat.** Tidak ada `bg-white`, `text-black`, inline `rgba(255,255,255,0.9x)` untuk panel. Panel = `bg-panel`/`bg-elev` + `border-line` atau `.glass`.
2. **Tipografi editorial & berani**: judul `type-display font-bold text-hi text-5xl sm:text-6xl md:text-7xl`, SATU kata aksen pakai `serif-accent text-gradient`. Label mono: `font-mono text-xs tracking-[0.25em] uppercase text-mut` dengan index `text-accent`. Angka besar dekoratif pakai `text-outline type-display`.
3. **Layout asimetris / bento**, bukan grid simetris membosankan. Oversized elemen, angka index besar, ghost text dekoratif di belakang (`text-outline`, absolute, select-none), overflow konten.
4. **Tombol**: primary `rounded-full bg-accent px-6 py-3 font-bold text-void hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]`; secondary `rounded-full border border-line px-6 py-3 text-hi hover:border-accent/60 hover:bg-white/5`.
5. **Kartu**: `bg-panel border border-line rounded-3xl` atau `.glass`, hover `hover:border-accent/40`. Ikon: `grid h-12 w-12 place-items-center rounded-2xl bg-accent/12 text-accent`.
6. **Animasi**: hanya via `ui.tsx` → `Reveal`, `Stagger`/`StaggerItem`, `WordReveal`, `TiltCard`, `Magnetic`, `SpotlightCard`, `Marquee`, `Counter`, `StatusPill`, `GhostIndex`. Jangan bikin variants sendiri. Hover: zoom image, arrow slide, underline sweep `w-0 group-hover:w-full bg-accent`.
7. `prefers-reduced-motion` sudah global. Bahasa Indonesia konsisten, percaya diri, ringkas. No emoji (boleh `✦` dekoratif).

---

## Task 1 — About

File: `src/app/about/page.tsx`, `src/components/NexusMap.tsx`, `src/components/RoleDossier.tsx`, `src/components/TechShowcase.tsx`

Push lebih jauh ke editorial (file sudah pernah di-restyle glass; rombak lagi ke VOID):

1. **Header About**: mono label `01 · Peran`. Judul raksasa: `Satu kanvas,` + `serif-accent text-gradient` "banyak peran" + ghost `01` besar di kanan belakang. Paragraf `text-body`.
2. **NexusMap** (peta peran): ganti jadi daftar peran editorial bernomor. 3 branch → section bertumpuk: header branch `type-display text-2xl font-bold` + angka besar `text-outline` (01, 02, 03). Role jadi baris tombol: nomor `font-mono text-accent`, nama role `type-display text-xl sm:text-2xl font-bold text-hi`, panah `→` slide di hover, hover `text-accent`. Satu aksen lime saja. Panjang baris naik-turun via AnimatePresence (pertahankan interaksi).
3. **RoleDossier** (side panel): `bg-void/95 backdrop-blur-2xl border-l border-line`. Header: `bg-panel border-line`, judul role + tombol tutup ghost. Konten: judul seksi `font-mono text-xs uppercase text-mut` + angka `text-accent`, paragraf `text-body`, timeline `text-hi`. Glow lime di atas.
4. **TechShowcase**: header `02 · Teknologi` + judul raksasa `Framework & bahasa yang kukuasai`. Badge jadi kartu: logo di well `bg-white/5 rounded-xl h-10 w-10`, nama `font-semibold text-hi`, kind `font-mono text-xs text-mut uppercase`, hover `border-accent/40` + lift. Modal: `bg-elev border-line rounded-3xl`, label mono, konten `text-body`. **Pertahankan data** `INFO_*`, daftar tech, `/logos/*.svg`.
5. CTA bawah: `border-t border-line`, headline `type-display` + tombol primary lime.

JANGAN ubah file lain. Data naratif RoleDossier & TechShowcase utuh.

## Task 2 — Projects

File: `src/app/projects/page.tsx` saja.

1. **Header**: mono `02 · Karya` + judul raksasa `Yang pernah <span class="serif-accent text-gradient">kubangun</span>` + ghost `02` dekoratif.
2. **Kartu proyek** (grid `md:grid-cols-2`, gap 5): `bg-panel border border-line rounded-3xl overflow-hidden group`. Gambar `aspect-video object-cover` + `group-hover:scale-105 transition-transform duration-700`, overlay gradien `from-void/80 via-transparent` muncul di hover, badge kategori `bg-accent text-void font-mono text-xs` di pojok. Konten: nomor index `text-outline type-display text-6xl` dekoratif, judul `type-display text-2xl font-bold text-hi group-hover:text-accent transition-colors`, deskripsi `text-body`, tag `border-line bg-white/4 font-mono text-xs text-mut rounded-full`. Tombol URL/GitHub secondary pill.
3. **Loading**: skeleton `animate-pulse bg-white/5 rounded-3xl` (beberapa blok + blok gambar `aspect-video`).
4. **Empty/error**: pesan Indonesia rapi di kartu `bg-panel border-line rounded-3xl p-10`.
5. Pakai `Stagger`/`StaggerItem`, `SpotlightCard`.

JANGAN ubah logika fetch/type/state.

## Task 3 — Profile

File: `src/app/profile/page.tsx`, `src/components/NoSQLInfoPanel.tsx`, `src/components/JetBrainsPanel.tsx`, `src/components/CodeWindow.tsx`

1. **Header**: avatar lingkaran gradien `from-accent to-accent2` (bisa pakai `Avatar` dari `@/components/Avatar` ukuran `w-20 h-20` jika mau), nama `type-display text-5xl sm:text-6xl font-bold text-hi` + `serif-accent text-gradient` pada "Bastian", chips `glass rounded-full font-mono text-xs text-body` (sekolah, kelas, usia).
2. **Panel** restyle ke VOID: `bg-panel border border-line rounded-3xl`, header `bg-white/4 border-line px-5 py-3`, judul `font-mono text-sm text-hi`, teks `text-body`.
   - NoSQLInfoPanel: index chips `border-line bg-white/4`, field grid `font-mono text-body`, badge type `bg-accent/10 text-accent font-mono text-[11px]`.
   - JetBrainsPanel: tab aktif `bg-accent/15 text-accent`, non `text-mut`.
   - CodeWindow: title bar `bg-white/4 border-line`, dot `bg-red-500 / bg-yellow-500 / bg-green-500`, kode `font-mono text-body`.
3. **Timeline**: editorial. Garis `bg-gradient-to-b from-accent via-accent2 to-accent3` + glow, dot `bg-accent` glow lime, tahun/tahap `font-mono text-accent`, judul `type-display text-lg font-bold text-hi`, kartu `bg-panel border-line rounded-2xl`. **Pertahankan data timeline.**
4. Layout asimetris: grid `md:grid-cols-2` dengan satu panel `md:col-span-2` bila perlu. Ghost text `SIB` dekoratif.

JANGAN ubah data (fields, timeline, quote, pengalaman). JANGAN ubah file lain.

## Task 4 — Contact

File: `src/app/contact/page.tsx` saja.

1. **Header**: mono `03 · Kontak` + judul raksasa `Mari <span class="serif-accent text-gradient">ngobrol</span>` + ghost `03`. Paragraf `text-body`.
2. **3 kartu kanal** (asimetris, `lg:grid-cols-3`): `bg-panel border border-line rounded-3xl p-8 group hover:border-accent/40`. Ikon `grid h-14 w-14 place-items-center rounded-2xl bg-accent/12 text-accent`. Nomor `text-outline type-display text-5xl` pojok. Judul `type-display text-xl font-bold text-hi`, deskripsi `text-body`, tombol: WhatsApp/Email primary lime, Instagram secondary. Arrow slide di hover. `SpotlightCard` + `TiltCard` ringan.
3. **Value props**: 4 kartu `bg-panel border-line rounded-2xl p-5`, ikon `rounded-lg bg-accent/10 text-accent p-2`, `Stagger`.
4. **Modal email**: backdrop `bg-void/70 backdrop-blur-sm`, panel `bg-elev border border-line rounded-3xl p-8`, input `w-full rounded-xl border border-line bg-void/60 px-3.5 py-3 text-hi placeholder:text-mut focus:border-accent focus:ring-1 focus:ring-accent/40 focus:outline-none`, label `text-xs text-mut font-mono`, tombol primary lime, feedback `text-ok` / `text-red-400`.
5. **Modal picker**: `bg-elev border-line`, opsi `rounded-xl border border-line bg-white/4 p-4 text-hi hover:border-accent/50`.

JANGAN ubah logika form, `NEXT_PUBLIC_BACKEND_URL`, state, validasi.

## Deliverables
- `cd /home/samuel/Documents/portofolionew/frontend && CI=1 pnpm lint` — tidak boleh error baru dari file-mu.
- Lapor: file diubah + ringkasan.
