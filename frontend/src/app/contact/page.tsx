"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram as InstagramIcon, Mail, ShieldCheck, Sparkles, MessageSquare, Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem, SpotlightCard, TiltCard } from "@/components/ui";

const CHANNELS = [
  {
    icon: Phone,
    index: "01",
    title: "WhatsApp",
    desc: "Chat cepat & praktis. Aku merespons sesegera mungkin.",
    href: "https://wa.me/62882019494158",
    cta: "Chat WhatsApp",
    primary: true,
  },
  {
    icon: InstagramIcon,
    index: "02",
    title: "Instagram",
    desc: "DM Instagram untuk pertanyaan singkat & update terbaru.",
    href: "https://www.instagram.com/samuelindrabastian/",
    cta: "Buka Instagram",
    primary: false,
  },
];

const PROPS = [
  { icon: Clock, title: "Respon Cepat", desc: "Aku berupaya merespons sesegera mungkin sesuai jam kerja." },
  { icon: ShieldCheck, title: "Privasi & Keamanan", desc: "Pesanmu diproses dengan aman, hanya untuk kebutuhan komunikasi." },
  { icon: MessageSquare, title: "Solusi yang Relevan", desc: "Aku berusaha memahami konteksmu untuk memberi masukan yang tepat." },
  { icon: Sparkles, title: "Pendekatan Ramah", desc: "Bahasa yang sederhana, interaksi yang menyenangkan." },
];

export default function ContactPage() {
  const [openPicker, setOpenPicker] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const backend = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !email || !message) {
      setFeedback("Semua field wajib diisi");
      return;
    }
    // basic email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFeedback("Format email tidak valid");
      return;
    }
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`${backend}/api/contact-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject, senderEmail: email, message }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Gagal mengirim");
      setFeedback("Pesan Anda telah terkirim! Terima kasih.");
      setTimeout(() => {
        setOpenEmail(false);
        setSubject("");
        setEmail("");
        setMessage("");
      }, 1400);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setFeedback(msg || "Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

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
            Punya pertanyaan, kritik, atau ide? Pilih kanal yang paling nyaman — aku merespons sesegera mungkin.
          </p>
        </div>
      </Reveal>

      {/* Channel cards */}
      <Stagger className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.1}>
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

        {/* Email card */}
        <StaggerItem className="h-full">
          <TiltCard max={6} className="h-full">
            <SpotlightCard className="group h-full rounded-3xl border border-line bg-panel p-8 transition-colors hover:border-accent/40">
              <button type="button" onClick={() => setOpenEmail(true)} className="flex h-full w-full flex-col text-left">
                <div className="relative flex h-full flex-col">
                  <div aria-hidden className="pointer-events-none absolute top-0 right-0 select-none">
                    <span className="text-outline type-display text-5xl">03</span>
                  </div>
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/12 text-accent">
                    <Mail size={24} />
                  </div>
                  <h3 className="type-display mt-6 text-xl font-bold text-hi">Email</h3>
                  <p className="mt-2 text-body">Kirim pesan lebih panjang & detail langsung dari situs ini.</p>
                  <span className="group/btn mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]">
                    Tulis Email
                    <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                  </span>
                </div>
              </button>
            </SpotlightCard>
          </TiltCard>
        </StaggerItem>
      </Stagger>

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

      {/* Modal #1: Picker */}
      <AnimatePresence>
        {openPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-line bg-elev p-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="type-display text-xl font-bold text-hi">Pilih Metode Kontak</h3>
                <button onClick={() => setOpenPicker(false)} aria-label="Tutup" className="text-mut transition hover:text-hi">✕</button>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <a className="rounded-xl border border-line bg-white/4 p-4 text-center font-semibold text-hi transition hover:border-accent/50" target="_blank" rel="noopener noreferrer" href="https://wa.me/62882019494158">WhatsApp</a>
                <a className="rounded-xl border border-line bg-white/4 p-4 text-center font-semibold text-hi transition hover:border-accent/50" target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/xynoos/">Instagram</a>
                <button className="rounded-xl border border-line bg-white/4 p-4 text-center font-semibold text-hi transition hover:border-accent/50" onClick={() => { setOpenPicker(false); setOpenEmail(true); }}>Email</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal #2: Email form */}
      <AnimatePresence>
        {openEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 p-4 backdrop-blur-sm"
          >
            <motion.form
              onSubmit={submit}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl border border-line bg-elev p-8"
            >
              <div className="flex items-center justify-between">
                <h3 className="type-display text-xl font-bold text-hi">Kirim Pesan Anda</h3>
                <button type="button" onClick={() => setOpenEmail(false)} aria-label="Tutup" className="text-mut transition hover:text-hi">✕</button>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <label className="font-mono text-xs text-mut">Judul Pesan</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} required placeholder="Ringkasan singkat" className="mt-1.5 w-full rounded-xl border border-line bg-void/60 px-3.5 py-3 text-hi placeholder:text-mut focus:border-accent focus:ring-1 focus:ring-accent/40 focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-mut">Email Anda</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="nama@email.com" className="mt-1.5 w-full rounded-xl border border-line bg-void/60 px-3.5 py-3 text-hi placeholder:text-mut focus:border-accent focus:ring-1 focus:ring-accent/40 focus:outline-none" />
                </div>
                <div>
                  <label className="font-mono text-xs text-mut">Isi Pesan</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} placeholder="Tulis pesanmu di sini..." className="mt-1.5 w-full resize-y rounded-xl border border-line bg-void/60 px-3.5 py-3 text-hi placeholder:text-mut focus:border-accent focus:ring-1 focus:ring-accent/40 focus:outline-none" />
                </div>
              </div>
              {feedback && (
                <p className={`mt-4 text-sm ${feedback.includes("terkirim") ? "text-ok" : "text-red-400"}`}>{feedback}</p>
              )}
              <div className="mt-6 flex justify-end gap-2">
                <button type="button" onClick={() => setOpenEmail(false)} className="rounded-full border border-line bg-white/4 px-5 py-2.5 text-sm font-semibold text-hi transition hover:border-accent/50">Batal</button>
                <button disabled={loading} className="rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)] disabled:opacity-60">
                  {loading ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
