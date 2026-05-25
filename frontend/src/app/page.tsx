// /src/app/page.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { buttonVariants } from "@/components/Button";

export default function HomePage() {
  return (
    <>
      {/* Hero Section Baru dengan Animasi Ketikan */}
  <section id="home" className="flex h-screen flex-col items-center justify-center text-center">
        <div className="max-w-4xl px-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold tracking-tight text-text-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="heading-highlight">
              <span className="text-text-heading">Samuel </span>
              <span className="text-text-heading">Indra</span>
              <span className="text-text-heading"> Bastian</span>
            </span>
          </motion.h1>

          <motion.div
            className="mt-4 text-xl md:text-3xl text-text-body"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Saya seorang{" "}
            <TypeAnimation
              sequence={[
                "Fullstack Developer",
                1500,
                "Senior Web Engineer",
                1500,
                "IoT Engineer",
                1500,
                "Lead Developer",
                1500,
                "System Architect",
                1500,
              ]}
              wrapper="span"
              speed={50}
              className="font-bold text-accent-primary"
              repeat={Infinity}
            />
          </motion.div>

          <motion.p 
            className="mt-6 max-w-2xl mx-auto text-lg text-text-body/80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Arsitek jembatan antara bit dan atom. Membangun koneksi antara web dan dunia di sekitar Anda.
          </motion.p>
          
          <motion.div 
            className="mt-10 flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              href="#filosofi" 
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Lihat Filosofi Web
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "secondary", size: "lg" })}>Hubungi Saya</Link>
          </motion.div>
        </div>
      </section>

      {/* Filosofi Section menggantikan Projects */}
  <section id="filosofi" className="w-full max-w-4xl mx-auto px-8 py-24 text-center scroll-mt-28">
        <h2 className="text-4xl font-bold text-text-heading mb-8">Filosofi Pengembangan Web</h2>
        <motion.p
          className="mx-auto max-w-3xl text-xl md:text-2xl text-text-body"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <TypeAnimation
            sequence={[
              "Antarmuka cepat, responsif, dan konsisten.", 2200,
              "Aksesibilitas dan performa adalah prioritas.", 2200,
              "Desain sederhana, pengalaman jelas.", 2000,
              "HTML semantik, SEO sehat.", 2000,
              "Ukur, optimalkan, ulangi.", 2000,
              "Komponen bersih, state terprediksi.", 2200,
              "Hormati preferensi pengguna (dark mode, motion).", 2400,
            ]}
            wrapper="span"
            speed={50}
            className="font-semibold text-accent-primary"
            repeat={Infinity}
          />
        </motion.p>
      </section>
    </>
  );
}