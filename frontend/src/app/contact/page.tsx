"use client";

import { Phone, Mail, Instagram as InstagramIcon, ShieldCheck, Sparkles, MessageSquare, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem, SpotlightCard, TiltCard } from "@/components/ui";

const CONTACT_EMAIL = "contact@samuelindrabastian.my.id";

const CHANNELS = [
  {
    icon: Phone,
    index: "01",
    title: "WhatsApp",
    desc: "Chat cepat & praktis. Aku cek tiap hari dan coba balas secepatnya.",
    href: "https://wa.me/62882019494158",
    cta: "Chat WhatsApp",
    primary: true,
  },
  {
    icon: InstagramIcon,
    index: "02",
    title: "Instagram",
    desc: "DM Instagram untuk pertanyaan singkat atau sekadar kenalan.",
    href: "https://www.instagram.com/samuelindrabastian/",
    cta: "Buka Instagram",
    primary: false,
  },
];

const PROPS = [
  { icon: Clock, title: "Respon Cepat", desc: "Aku cek chat tiap hari dan berusaha membalas sesegera mungkin." },
  { icon: ShieldCheck, title: "Langsung ke Aku", desc: "Ngobrol langsung di WhatsApp atau Instagram, tanpa perantara." },
  { icon: MessageSquare, title: "Jawaban Relevan", desc: "Aku baca dulu konteksmu, baru kasih jawaban yang benar-benar membantu." },
  { icon: Sparkles, title: "Pendekatan Santai", desc: "Bahasa sederhana, tanpa basa-basi. Ngobrol aja santai." },
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-20 sm:px-10">
      {/* Header */}
      <Reveal className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-8 right-0 select-none">
          <span className="text-outline type-display text-[10rem] leading-none sm:text-[13rem]">03</span>
        </div>
        <div className="relative">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-mut">
            <span className="text-accent">03</span>
            <span className="h-px w-8 bg-line" />
            <span>Kontak</span>
          </div>
          <h1 className="type-display mt-5 text-5xl font-bold text-hi sm:text-6xl md:text-7xl">
            Mari <span className="serif-accent text-gradient">ngobrol</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-body sm:text-lg">
            Punya pertanyaan, kritik, atau ide? Pilih kanal yang paling nyaman, langsung nyambung ke aku.
          </p>
        </div>
      </Reveal>

      {/* Channel cards */}
      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2" gap={0.1}>
        {CHANNELS.map((c) => (
          <StaggerItem key={c.title} className="h-full">
            <TiltCard max={6} className="h-full">
              <SpotlightCard className="group h-full rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent/40">
                <div className="relative flex h-full flex-col">
                  <div aria-hidden className="pointer-events-none absolute top-0 right-0 select-none">
                    <span className="text-outline type-display text-5xl">{c.index}</span>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <c.icon size={24} />
                  </div>
                  <h3 className="type-display mt-6 text-xl font-bold text-hi">{c.title}</h3>
                  <p className="mt-2 text-body">{c.desc}</p>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={
                      c.primary
                        ? "group/btn mt-8 inline-flex w-fit items-center gap-2 self-start rounded-full bg-accent px-5 py-2.5 font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]"
                        : "group/btn mt-8 inline-flex w-fit items-center gap-2 self-start rounded-full border border-line px-5 py-2.5 font-bold text-hi transition-all hover:border-accent/60 hover:bg-white/5"
                    }
                  >
                    {c.cta}
                    {c.primary ? (
                      <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    ) : (
                      <ArrowUpRight size={16} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    )}
                  </a>
                </div>
              </SpotlightCard>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Email panel: full-width, the one channel that sends mail */}
      <Reveal className="mt-14">
        <div className="group relative overflow-hidden rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent/40">
          <div aria-hidden className="pointer-events-none absolute top-0 right-0 select-none">
            <span className="text-outline type-display text-5xl">03</span>
          </div>
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-6">
              <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent/12 text-accent">
                <Mail size={26} />
              </div>
              <div className="min-w-0">
                <h3 className="type-display text-xl font-bold text-hi sm:text-2xl">Email</h3>
                <p className="mt-1.5 max-w-xl text-body">
                  Untuk pesan normal atau detail: bakat proyek, kritik, atau kolaborasi.
                </p>
              </div>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </Reveal>

      {/* Value props */}
      <Stagger className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2" gap={0.08}>
        {PROPS.map((p) => (
          <StaggerItem key={p.title}>
            <div className="flex items-start gap-4 rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-accent/40">
              <div className="rounded-lg bg-accent/10 p-2 text-accent"><p.icon size={18} /></div>
              <div>
                <h4 className="text-sm font-semibold text-hi">{p.title}</h4>
                <p className="mt-1 text-sm text-body">{p.desc}</p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
