"use client";

import Link from "next/link";
import { ArrowUpRight, Github, Instagram, Mail } from "lucide-react";
import { Magnetic, Marquee } from "@/components/ui";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden">
      {/* CTA marquee band */}
      <Marquee duration={22} className="border-y border-line py-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="mx-8 type-display text-4xl font-bold uppercase text-hi sm:text-6xl">
            Let&apos;s build <span className="text-gradient">something great</span>{" "}
            <span className="mx-2 align-middle text-accent">✦</span>
          </span>
        ))}
      </Marquee>

      {/* CTA block */}
      <div className="mx-auto max-w-[90rem] px-5 pt-20 sm:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-panel px-6 py-16 sm:px-12 sm:py-24">
          <div aria-hidden className="aurora -top-24 left-1/3 h-80 w-80 bg-accent/16" />
          <div aria-hidden className="aurora -bottom-24 right-0 h-72 w-72 bg-accent2/12" />
          <div className="stripes pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative">
            <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase">Punya proyek menarik?</p>
            <h2 className="type-display mt-5 max-w-3xl text-5xl font-bold text-hi sm:text-7xl">
              Jangan cuma <span className="serif-accent text-gradient">dipandangi</span> — wujudkan.
            </h2>
            <p className="mt-6 max-w-xl text-body sm:text-lg">
              Dari landing page yang memukau hingga sistem IoT end-to-end. Ceritakan idemu — aku bantu bikin jadi produk nyata.
            </p>
            <Magnetic className="mt-9" strength={0.2}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-bold text-void transition-all hover:shadow-[0_0_36px_rgba(200,255,46,0.5)]"
              >
                Mulai percakapan
                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-[90rem] px-5 py-8 sm:px-10">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-line pt-8 text-sm text-mut sm:flex-row">
          <p>© {year} Samuel Indra Bastian — dirancang & dibangun dari nol.</p>
          <p className="font-mono text-xs">
            <span className="text-hi">Next.js</span> · <span className="text-hi">Tailwind</span> · design system VOID
          </p>
          <div className="flex items-center gap-2">
            {[
              { href: "https://github.com/samuelindra123", icon: Github, label: "GitHub" },
              { href: "https://www.instagram.com/samuelindrabastian/", icon: Instagram, label: "Instagram" },
              { href: "mailto:hello@samuel.dev", icon: Mail, label: "Email" },
            ].map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-mut transition-all hover:border-accent hover:text-accent hover:shadow-[0_0_16px_rgba(200,255,46,0.3)]"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
