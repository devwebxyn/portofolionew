"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Instagram as InstagramIcon, Mail, ShieldCheck, Sparkles, MessageSquare, Clock } from "lucide-react";

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
    <div className="mx-auto max-w-5xl px-6 py-16">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-slate-800 to-slate-900 p-10 text-white">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-extrabold">Kami Siap Membantu Anda</motion.h1>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="mt-2 max-w-2xl text-white/80">
          Punya pertanyaan, kritik, atau saran? Jangan ragu untuk menghubungi kami. Tim kami akan segera merespons Anda.
        </motion.p>
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 -bottom-16 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

        {/* CTA */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-8">
          <button onClick={() => setOpenPicker(true)} className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-black shadow hover:bg-white/90">Hubungi Kami Sekarang</button>
        </motion.div>
      </div>

      {/* Intro copy */}
      <div className="mx-auto mt-12 max-w-3xl text-center">
        <motion.h2 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-2xl font-bold text-black">
          Pilih Cara Menghubungi Kami
        </motion.h2>
        <motion.p initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="mt-2 text-black/70">
          Kami menyediakan beberapa kanal agar Anda bisa terhubung dengan nyaman. Pilih yang paling sesuai bagi Anda.
        </motion.p>
      </div>

      {/* Method cards */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {/* WhatsApp */}
        <motion.a
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          href="https://wa.me/62882019494158" target="_blank"
          className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm transition hover:shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-emerald-700">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">WhatsApp</h3>
              <p className="mt-1 text-sm text-black/70">Chat cepat & praktis. Kami merespons sesegera mungkin.</p>
              <span className="mt-3 inline-block rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-black/90">Chat WhatsApp</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-emerald-400/10 blur-2xl" />
        </motion.a>

        {/* Instagram */}
        <motion.a
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          href="https://www.instagram.com/xynoos/" target="_blank"
          className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm transition hover:shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-pink-200 bg-pink-50 p-3 text-pink-700">
              <InstagramIcon size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">Instagram</h3>
              <p className="mt-1 text-sm text-black/70">DM Instagram untuk pertanyaan singkat & update terbaru.</p>
              <span className="mt-3 inline-block rounded-lg border border-black/20 px-3 py-1.5 text-xs font-semibold text-black group-hover:bg-black/5">Buka Instagram</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-pink-400/10 blur-2xl" />
        </motion.a>

        {/* Email */}
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          onClick={() => setOpenEmail(true)}
          className="group relative overflow-hidden rounded-2xl border border-black/10 bg-white p-6 text-left text-black shadow-sm transition hover:shadow-lg"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-indigo-700">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold">Email</h3>
              <p className="mt-1 text-sm text-black/70">Kirim pesan lebih panjang & detail langsung dari situs ini.</p>
              <span className="mt-3 inline-block rounded-lg bg-black px-3 py-1.5 text-xs font-semibold text-white group-hover:bg-black/90">Tulis Email</span>
            </div>
          </div>
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-400/10 blur-2xl" />
        </motion.button>
      </div>

      {/* Value props / highlights */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-emerald-100 p-2 text-emerald-700"><Clock size={18} /></div>
            <div>
              <h4 className="text-sm font-bold">Respon Cepat</h4>
              <p className="mt-1 text-sm text-black/70">Kami berupaya merespons sesegera mungkin sesuai jam kerja.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-blue-100 p-2 text-blue-700"><ShieldCheck size={18} /></div>
            <div>
              <h4 className="text-sm font-bold">Privasi & Keamanan</h4>
              <p className="mt-1 text-sm text-black/70">Pesan Anda diproses dengan aman, hanya untuk kebutuhan komunikasi.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-purple-100 p-2 text-purple-700"><MessageSquare size={18} /></div>
            <div>
              <h4 className="text-sm font-bold">Solusi yang Relevan</h4>
              <p className="mt-1 text-sm text-black/70">Kami berusaha memahami konteks Anda untuk memberi masukan yang tepat.</p>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-2xl border border-black/10 bg-white p-6 text-black shadow-sm">
          <div className="flex items-start gap-3">
            <div className="rounded-lg bg-amber-100 p-2 text-amber-700"><Sparkles size={18} /></div>
            <div>
              <h4 className="text-sm font-bold">Pendekatan Ramah</h4>
              <p className="mt-1 text-sm text-black/70">Bahasa yang sederhana, interaksi yang menyenangkan.</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal #1: Picker */}
      <AnimatePresence>
        {openPicker && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-black">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Pilih Metode Kontak</h3>
                <button onClick={() => setOpenPicker(false)} className="text-black/60">✕</button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <a className="rounded-lg border border-black/10 bg-black/5 p-4 text-center hover:bg-black/10" target="_blank" href="https://wa.me/62882019494158">WhatsApp</a>
                <a className="rounded-lg border border-black/10 bg-black/5 p-4 text-center hover:bg-black/10" target="_blank" href="https://www.instagram.com/xynoos/">Instagram</a>
                <button className="rounded-lg border border-black/10 bg-black/5 p-4 text-center hover:bg-black/10" onClick={() => { setOpenPicker(false); setOpenEmail(true); }}>Email</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal #2: Email form */}
      <AnimatePresence>
        {openEmail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <motion.form onSubmit={submit} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="w-full max-w-md rounded-2xl border border-white/10 bg-white p-6 text-black">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">Kirim Pesan Anda</h3>
                <button type="button" onClick={() => setOpenEmail(false)} className="text-black/60">✕</button>
              </div>
              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs text-black/60">Judul Pesan</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} required className="mt-1 w-full rounded-lg border border-black/10 bg-black/5 px-3 py-2" />
                </div>
                <div>
                  <label className="text-xs text-black/60">Email Anda</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 w-full rounded-lg border border-black/10 bg-black/5 px-3 py-2" />
                </div>
                <div>
                  <label className="text-xs text-black/60">Isi Pesan</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="mt-1 w-full resize-y rounded-lg border border-black/10 bg-black/5 px-3 py-2" />
                </div>
              </div>
              {feedback && <p className="mt-3 text-sm text-black/70">{feedback}</p>}
              <div className="mt-4 flex justify-end gap-2">
                <button type="button" onClick={() => setOpenEmail(false)} className="rounded-lg border border-black/20 px-4 py-2 text-sm">Batal</button>
                <button disabled={loading} className="rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white hover:bg-black/90 disabled:opacity-60">
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
