# Laboratorium pribadi Samuel Indra Bastian

Jalankan `pnpm install --frozen-lockfile` dan `pnpm dev` dari folder ini. Salin
`.env.example` ke `.env.local` untuk mengarahkan `NEXT_PUBLIC_BACKEND_URL` ke
Go API lokal dan mengatur `NEXT_PUBLIC_SITE_URL` untuk metadata.

Galeri dan detail membaca data Go API di server. URL detail memakai `$id` dari
Appwrite. Pencarian memakai judul, deskripsi, kategori, bahasa dan tag yang sudah
tersedia. Ringkasan beranda menampilkan dua proyek terbaru berdasarkan tanggal
yang tersimpan. Simpan dan ubah proyek melalui dasbor admin.

Formulir kontak mengirim JSON melalui `/api/contact-messages` ke Go API. Pesan
dapat dibuka di `/messages` pada dasbor admin. Balasan dari dasbor dibuka di
aplikasi email.

Gunakan `pnpm lint`, `pnpm build`, dan `pnpm exec tsc --noEmit` untuk memeriksa
frontend. Setelah frontend dan admin dibangun, jalankan `bash tests/run-smoke.sh`
dari root repositori untuk menguji alur publik, admin, dan Go dengan Appwrite
tiruan di loopback. Lihat [panduan deploy](../DEPLOY.md) untuk konfigurasi Vercel.
