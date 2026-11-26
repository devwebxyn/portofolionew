"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RotateCw } from "lucide-react";

export function Retry() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return <button type="button" className="action action-outline retry" disabled={pending} onClick={() => startTransition(() => router.refresh())}>
    <RotateCw size={17} aria-hidden /> {pending ? "Memuat ulang…" : "Coba lagi"}
  </button>;
}
