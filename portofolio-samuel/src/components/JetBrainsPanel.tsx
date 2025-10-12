// /src/components/JetBrainsPanel.tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function JetBrainsPanel({
  title,
  tabs,
  active = 0,
  children,
  className,
}: {
  title?: string;
  tabs?: string[];
  active?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "relative overflow-hidden rounded-2xl border",
        "border-white/10 bg-[#0b0b0f]/90 text-white backdrop-blur-xl",
        "shadow-sm shadow-black/30",
        className
      )}
    >
      {/* Top toolbar */}
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <div className="text-xs text-white/70">{title ?? "JetBrains Panel"}</div>
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-1">
            {tabs.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "inline-flex items-center rounded px-2 py-1 text-xs",
                  i === active ? "bg-white/15 text-white" : "text-white/70",
                  "border border-white/10"
                )}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-4 text-sm text-white/90">
        {children}
      </div>
    </motion.section>
  );
}
