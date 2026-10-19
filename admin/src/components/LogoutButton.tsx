"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function logout() {
    setBusy(true);
    try {
      await fetch("/api/logout", { method: "POST" });
    } finally {
      setBusy(false);
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <button
      onClick={logout}
      disabled={busy}
      aria-label="Logout"
      className="flex w-full items-center justify-center gap-3 rounded-md px-3 py-2 text-sm text-body transition-colors hover:bg-white/5 hover:text-danger md:justify-start"
    >
      <LogOut className="h-4 w-4" />
      <span className="hidden md:inline">{busy ? "Keluar…" : "Logout"}</span>
    </button>
  );
}
