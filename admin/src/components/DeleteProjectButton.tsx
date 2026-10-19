"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export function DeleteProjectButton({ id }: { id: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onDelete() {
    if (!window.confirm("Hapus project ini? Tindakan tidak bisa dibatalkan.")) return;
    setBusy(true);
    const res = await fetch("/api/projects/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!data?.ok) {
      window.alert(data?.error || "Gagal menghapus project.");
      return;
    }
    router.refresh();
  }

  return (
    <button
      onClick={onDelete}
      disabled={busy}
      aria-label="Hapus project"
      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-body transition-colors hover:border-danger/40 hover:text-danger"
    >
      <Trash2 className="h-3.5 w-3.5" />
      {busy ? "…" : "Hapus"}
    </button>
  );
}
