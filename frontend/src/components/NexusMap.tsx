"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export type Persona = "recruiter" | "developer" | "client";
export type RoleKey =
  | "frontend"
  | "backend"
  | "fullstack"
  | "devops"
  | "security"
  | "lead"
  | "iot"
  | "architect";

export function NexusMap({
  persona,
  onSelectRole,
  className,
}: {
  persona: Persona;
  onSelectRole: (role: RoleKey) => void;
  className?: string;
}) {
  const accent = useMemo(() => {
    switch (persona) {
      case "recruiter":
        return { ring: "ring-amber-400/30", text: "text-amber-300", glow: "shadow-[0_0_40px_rgba(245,158,11,0.35)]" };
      case "client":
        return { ring: "ring-violet-400/30", text: "text-violet-300", glow: "shadow-[0_0_40px_rgba(167,139,250,0.35)]" };
      default:
        return { ring: "ring-cyan-400/30", text: "text-cyan-300", glow: "shadow-[0_0_40px_rgba(34,211,238,0.35)]" };
    }
  }, [persona]);

  const [openBranch, setOpenBranch] = useState<"engineering" | "leadership" | "domains" | null>("engineering");

  const branches: Array<{ key: "engineering" | "leadership" | "domains"; label: string; roles: RoleKey[] }> = [
    { key: "engineering", label: "System Architecture & Engineering", roles: ["fullstack", "frontend", "backend", "devops", "architect"] },
    { key: "leadership", label: "Leadership & Strategy", roles: ["lead", "security"] },
    { key: "domains", label: "Specialized Domains", roles: ["iot"] },
  ];

  const roleLabels: Record<RoleKey, string> = {
    frontend: "Frontend",
    backend: "Backend",
    fullstack: "Fullstack",
    devops: "DevOps",
    security: "Cyber Security",
    lead: "Lead Developer",
    iot: "IoT Engineer",
    architect: "System Architect",
  };

  return (
    <div className={cn("relative", className)}>
      <div className="mx-auto max-w-5xl">
        <div className="flex items-center justify-center">
          <div className={cn("relative rounded-full border px-6 py-3 text-sm font-semibold backdrop-blur", accent.ring)} style={{ background: "rgba(255,255,255,0.95)", color: "#0b0b0f" }}>
            Samuel’s Core
            <span className={cn("ml-2 text-xs")} style={{ color: "#0b0b0f" }}>
              {persona === "recruiter" && "Strategy-Driven"}
              {persona === "developer" && "Craftsmanship"}
              {persona === "client" && "Solution-Oriented"}
            </span>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {branches.map((b) => (
            <div key={b.key} className={cn("rounded-xl border p-5", accent.ring)} style={{ background: "rgba(255,255,255,0.92)" }}>
              <button
                className={cn("flex w-full items-center justify-between text-left", accent.text)}
                onClick={() => setOpenBranch((prev) => (prev === b.key ? null : b.key))}
              >
                <span className="text-base md:text-lg font-semibold text-black">{b.label}</span>
                <span className="ml-3 text-xs text-black/70">{openBranch === b.key ? "Tutup" : "Buka"}</span>
              </button>
              <AnimatePresence initial={false}>
                {openBranch === b.key && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="mt-4 grid grid-cols-2 gap-3"
                  >
                    {b.roles.map((r) => (
                      <li key={r}>
                        <button
                          className={cn(
                            "group w-full rounded-lg border px-3 py-2 text-sm transition",
                            "hover:scale-[1.02]",
                            accent.glow
                          )}
                          onClick={() => onSelectRole(r)}
                          style={{ background: "rgba(255,255,255,0.9)", color: "#0b0b0f" }}
                        >
                          <span className={cn("block text-black font-medium")}>{roleLabels[r]}</span>
                          <span className="block text-xs text-black/70">Jelajahi detail peran →</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
