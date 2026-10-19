"use client";

import { useState } from "react";
import { Mail, Reply, Send } from "lucide-react";
import type { Message } from "@/lib/types";

const statusColor: Record<string, string> = {
  unread: "border-accent/40 bg-accent/10 text-accent",
  read: "border-line bg-elev text-body",
  replied: "border-accent3/40 bg-accent3/10 text-accent3",
};

function fmtDate(iso?: string) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function MessagesView({ messages }: { messages: Message[] }) {
  const [items, setItems] = useState(messages);
  const [selectedId, setSelectedId] = useState<string | null>(messages[0]?.$id ?? null);
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selected = items.find((m) => m.$id === selectedId) ?? null;

  async function markRead(m: Message) {
    if (m.status === "unread") {
      await fetch("/api/messages/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: m.$id }),
      }).catch(() => {});
      setItems((prev) => prev.map((x) => (x.$id === m.$id ? { ...x, status: "read" } : x)));
    }
  }

  async function sendReply() {
    if (!selected || !reply.trim()) return;
    setBusy(true);
    setError(null);
    const res = await fetch("/api/messages/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ originalMessageId: selected.$id, replyContent: reply.trim() }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data?.ok) {
      setError(data?.error || "Gagal mengirim balasan.");
      setBusy(false);
      return;
    }
    setItems((prev) =>
      prev.map((x) =>
        x.$id === selected.$id ? { ...x, status: "replied", replyContent: reply.trim() } : x
      )
    );
    setReply("");
    setBusy(false);
  }

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="glass overflow-hidden rounded-xl">
        <div className="border-b border-line px-4 py-3 text-sm font-medium text-hi">Inbox</div>
        <ul className="max-h-[70vh] divide-y divide-line overflow-y-auto">
          {items.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-body">Belum ada pesan.</li>
          )}
          {items.map((m) => (
            <li key={m.$id}>
              <button
                onClick={() => {
                  setSelectedId(m.$id);
                  markRead(m);
                }}
                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.03] ${
                  selectedId === m.$id ? "bg-white/[0.04]" : ""
                }`}
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-body" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-hi">{m.subject}</span>
                  <span className="block truncate text-xs text-body">{m.senderEmail}</span>
                </span>
                <span
                  className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] capitalize ${
                    statusColor[m.status ?? "read"] ?? statusColor.read
                  }`}
                >
                  {m.status ?? "read"}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="glass rounded-xl p-6">
        {!selected ? (
          <p className="text-center text-sm text-body">Pilih pesan untuk melihat detail.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-display text-lg font-bold tracking-tight text-hi">
                  {selected.subject}
                </h2>
                <p className="text-xs text-body">
                  {selected.senderEmail} · {fmtDate(selected.createdAt)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2 py-0.5 text-[11px] capitalize ${
                  statusColor[selected.status ?? "read"] ?? statusColor.read
                }`}
              >
                {selected.status ?? "read"}
              </span>
            </div>

            <p className="whitespace-pre-wrap rounded-md border border-line bg-panel p-4 text-sm leading-relaxed text-hi/90">
              {selected.body}
            </p>

            {selected.replyContent && (
              <div className="rounded-md border border-accent3/30 bg-accent3/5 p-4">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-accent3">
                  <Reply className="h-3.5 w-3.5" /> Balasan dicatat
                </p>
                <p className="whitespace-pre-wrap text-sm text-hi/80">{selected.replyContent}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="reply" className="block text-sm text-body">
                Balasan
              </label>
              <textarea
                id="reply"
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Tulis balasan… (dicatat di admin, tidak dikirim email)"
                className="w-full rounded-md border border-line bg-panel px-3 py-2 text-sm text-hi placeholder:text-body/40 focus:border-accent focus:outline-none"
              />
              {error && (
                <p role="alert" className="rounded-md border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
                  {error}
                </p>
              )}
              <button
                onClick={sendReply}
                disabled={busy || !reply.trim()}
                className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {busy ? "Menyimpan…" : "Simpan Balasan"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
