# Laboratorium digital

Portofolio menampilkan Samuel Indra Bastian sebagai Vibe Coder sejak Juli 2024,
pelajar elektronika industri, dan penggemar teknologi. Narasi proyek memakai data
yang diterbitkan pemilik. Halaman editorial menjelaskan proses belajar dan peran AI.

## Sistem visual

- `src/app/globals.css` mendefinisikan permukaan grafit, kertas kehijauan, aksen
  lime dan lavender, skala spasi, garis, fokus, serta durasi gerak.
- Space Grotesk dan Instrument Serif dimuat lokal dengan lisensi OFL di
  `src/app/fonts/`. Teks isi memakai font sistem dan label teknik memakai monospace.
- `Visuals.tsx` berisi maskot monitor, papan isometrik, pendamping AI dan diagram.
  Visual elektronika dan komputasi bersifat konseptual.
- Komponen `Editorial.tsx` dipakai untuk judul halaman dan tindakan dalam teks.
  Permukaan lebar memberi ruang bagi komposisi editorial dan ilustrasi. Tata letak
  kolom berubah menjadi alur vertikal di layar kecil.
- Gerak memakai CSS, SVG, dan respons penunjuk pada ilustrasi beranda.
  Animasi berulang berjalan dengan jumlah pengulangan terbatas. Pengaturan
  `prefers-reduced-motion` menampilkan komposisi statis.
