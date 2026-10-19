"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { GhostIndex, SpotlightCard, Stagger, StaggerItem } from "@/components/ui";

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
        const res = await fetch(`/api/projects`, { cache: "no-store" });
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
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      {/* ---------- HEADER ---------- */}
      <div className="relative">
        <span
          aria-hidden
          className="text-outline type-display pointer-events-none absolute -top-10 right-0 select-none text-[8rem] leading-none sm:text-[10rem]"
        >
          02
        </span>
        <div className="relative flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-mut">
          <span className="text-accent">02</span>
          <span className="h-px w-8 bg-line" />
          <span>Karya</span>
        </div>
        <h1 className="type-display relative mt-5 text-5xl font-bold text-hi sm:text-6xl md:text-7xl">
          Yang pernah <span className="serif-accent text-gradient">kubangun</span>
        </h1>
        <p className="relative mt-5 max-w-2xl text-base text-body sm:text-lg">
          Karya nyata dari ide sampai rilis: diuji, diukur, dan benar-benar dipakai.
        </p>
      </div>

      {/* ---------- LOADING ---------- */}
      {loading && (
        <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse rounded-3xl border border-line bg-white/5">
              <div className="aspect-video w-full bg-white/5" />
              <div className="space-y-3 p-6 sm:p-7">
                <div className="h-4 w-1/3 rounded bg-white/5" />
                <div className="h-7 w-2/3 rounded bg-white/5" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-4/5 rounded bg-white/5" />
                <div className="h-8 w-1/2 rounded-full bg-white/5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ---------- ERROR ---------- */}
      {error && (
        <div className="mt-14 rounded-3xl border border-line bg-panel p-10">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-red-400">Terjadi kesalahan</p>
          <p className="mt-3 text-body">Gagal memuat karya. Coba muat ulang halaman.</p>
          <p className="mt-1 font-mono text-xs text-mut">{error}</p>
        </div>
      )}

      {/* ---------- EMPTY ---------- */}
      {!loading && !error && items.length === 0 && (
        <div className="mt-14 rounded-3xl border border-line bg-panel p-10 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mut">Kosong</p>
          <p className="mt-3 text-body">Belum ada karya yang bisa kutampilkan. Kembali lagi nanti.</p>
        </div>
      )}

      {/* ---------- GRID ---------- */}
      {!loading && !error && items.length > 0 && (
        <Stagger className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-2">
          {items.map((p, i) => (
            <StaggerItem key={p.$id}>
              <SpotlightCard className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel">
                {/* media */}
                <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-line">
                  {p.imageUrl ? (
                    <Image
                      src={p.imageUrl}
                      alt={p.title}
                      width={1200}
                      height={630}
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority={false}
                      unoptimized
                    />
                  ) : (
                    <div className="grid h-full w-full place-items-center bg-elev">
                      <GhostIndex className="text-6xl">0{i + 1}</GhostIndex>
                    </div>
                  )}
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  {p.category && (
                    <span className="absolute top-4 right-4 rounded-full bg-accent px-3 py-1 font-mono text-xs font-semibold text-void">
                      {p.category}
                    </span>
                  )}
                </div>

                {/* body */}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* meta row */}
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-accent">0{i + 1}</span>
                    <span aria-hidden className="h-px w-5 bg-line" />
                    {p.language && (
                      <span className="rounded-full border border-line bg-white/4 px-2.5 py-1 text-mut">
                        {p.language}
                      </span>
                    )}
                  </div>

                  <h3 className="type-display mt-4 text-2xl font-bold text-hi transition-colors duration-300 group-hover:text-accent">
                    {p.title}
                  </h3>

                  <p className="mt-3 leading-relaxed text-body">{p.description}</p>

                  {/* tags */}
                  {(p.tags || []).length > 0 && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      {(p.tags || []).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-line bg-white/4 px-3 py-1 font-mono text-xs text-mut"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* actions */}
                  {(p.liveUrl || p.githubUrl) && (
                    <div className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                      {p.liveUrl && (
                        <Link
                          href={p.liveUrl}
                          target="_blank"
                          className="rounded-full border border-line px-4 py-2 text-sm text-hi transition-colors hover:border-accent/60"
                        >
                          URL
                        </Link>
                      )}
                      {p.githubUrl && (
                        <Link
                          href={p.githubUrl}
                          target="_blank"
                          className="rounded-full border border-line px-4 py-2 text-sm text-hi transition-colors hover:border-accent/60"
                        >
                          GitHub
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
