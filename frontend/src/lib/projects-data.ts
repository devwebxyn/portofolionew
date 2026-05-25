// /src/lib/projects-data.ts

// Definisikan tipe data untuk setiap proyek agar type-safe
export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string; // Tanda tanya (?) berarti properti ini opsional
  githubUrl?: string;
}

// Buat array yang berisi semua data proyek Anda
export const projectsData: Project[] = [
  {
    title: "Sistem Monitoring IoT Cerdas",
    description:
      "Platform web real-time untuk memvisualisasikan data dari sensor suhu dan kelembaban, dibangun dengan Next.js dan terhubung ke perangkat ESP32.",
    tags: ["React", "Next.js", "TypeScript", "IoT", "ESP32", "Firebase"],
    imageUrl: "https://via.placeholder.com/800x600/111111/FFFFFF?text=IoT+Dashboard",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Aplikasi E-Commerce Furnitur",
    description:
      "Sebuah toko online modern dengan manajemen state menggunakan Redux Toolkit dan integrasi pembayaran.",
    tags: ["React", "Vite", "Redux", "Node.js", "Stripe"],
    imageUrl: "https://via.placeholder.com/800x600/111111/FFFFFF?text=E-Commerce",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "Company Profile Interaktif",
    description:
      "Website profil perusahaan dengan animasi canggih menggunakan Framer Motion dan desain yang berfokus pada pengalaman pengguna.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    imageUrl: "https://via.placeholder.com/800x600/111111/FFFFFF?text=Company+Profile",
    liveUrl: "#",
    githubUrl: "#",
  },
];