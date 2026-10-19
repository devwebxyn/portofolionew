"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Stagger, StaggerItem } from "@/components/ui";

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
  const [openBranch, setOpenBranch] = useState<"engineering" | "leadership" | "domains" | null>("engineering");

  const personaLabel: Record<Persona, string> = {
    recruiter: "Strategy-Driven",
    developer: "Craftsmanship",
    client: "Solution-Oriented",
  };

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
      {/* meta header */}
      <div className="mb-12 flex items-center justify-between font-mono text-xs tracking-[0.25em] uppercase text-mut">
        <span className="text-accent">Peta peran</span>
        <span>{personaLabel[persona]}</span>
      </div>

      {/* Branch sections */}
      <Stagger gap={0.1} className="space-y-16">
        {branches.map((b, bi) => (
          <StaggerItem key={b.key}>
            <section className="relative border-t border-line pt-8">
              {/* ghost branch index */}
              <span
                aria-hidden
                className="text-outline type-display pointer-events-none absolute -top-4 right-0 select-none text-[6rem] leading-none sm:text-[8rem]"
              >
                0{bi + 1}
              </span>

              {/* branch header (toggle) */}
              <button
                className="group relative z-10 flex w-full items-center justify-between gap-3 text-left"
                onClick={() => setOpenBranch((prev) => (prev === b.key ? null : b.key))}
                aria-expanded={openBranch === b.key}
              >
                <span className="type-display text-2xl font-bold text-hi">{b.label}</span>
                <span className="shrink-0 font-mono text-xs text-mut transition-colors group-hover:text-accent">
                  {openBranch === b.key ? "Tutup" : "Buka"}
                </span>
              </button>

              {/* role list (expandable) */}
              <AnimatePresence initial={false}>
                {openBranch === b.key && (
                  <motion.ul
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-6 overflow-hidden"
                  >
                    {b.roles.map((r, ri) => (
                      <li key={r} className="border-t border-line">
                        <button
                          onClick={() => onSelectRole(r)}
                          className="group flex w-full items-center justify-between gap-4 py-4 text-left"
                        >
                          <span className="flex items-baseline gap-4">
                            <span className="font-mono text-xs text-accent sm:text-sm">
                              {String(ri + 1).padStart(2, "0")}
                            </span>
                            <span className="type-display text-xl font-bold text-hi transition-colors group-hover:text-accent sm:text-2xl">
                              {roleLabels[r]}
                            </span>
                          </span>
                          <span
                            aria-hidden
                            className="shrink-0 -translate-x-1 font-mono text-sm text-accent opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                          >
                            →
                          </span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </section>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
