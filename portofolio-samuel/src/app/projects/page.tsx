"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Project = {
  $id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  category?: string;
  language?: string;
};

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const base = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://adminsamuel.vercel.app';
        const res = await fetch(`${base}/api/projects`, { cache: "no-store" });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || "Gagal memuat data");
        setItems(json.items || []);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(msg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-block rounded-lg bg-white px-3 py-2 text-3xl font-bold text-black">Projects</motion.h1>
      {loading && <p className="mt-4 text-white/80">Memuat...</p>}
      {error && <p className="mt-4 text-red-400">{error}</p>}

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {items.map((p, idx) => (
          <motion.article key={p.$id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/90 text-black shadow-sm transition hover:shadow-lg"
          >
            {p.imageUrl && (
              <div className="w-full bg-black/5">
                <Image
                  src={p.imageUrl}
                  alt={p.title}
                  width={1200}
                  height={630}
                  className="h-auto w-full object-contain"
                  priority={idx < 2}
                  unoptimized
                />
              </div>
            )}
            <div className="p-5">
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm text-black/80">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.category && <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/70">Framework: {p.category}</span>}
                {p.language && <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/70">Language: {p.language}</span>}
                {(p.tags || []).map((t) => (
                  <span key={t} className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/70">{t}</span>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-3">
                {p.liveUrl && <Link href={p.liveUrl} target="_blank" className="rounded-md bg-black px-3 py-1.5 text-xs font-semibold text-white hover:bg-black/90">URL</Link>}
                {p.githubUrl && <Link href={p.githubUrl} target="_blank" className="rounded-md border border-black/20 px-3 py-1.5 text-xs font-semibold text-black hover:bg-black/5">GitHub</Link>}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}