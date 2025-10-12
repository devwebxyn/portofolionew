// /src/components/NoSQLInfoPanel.tsx
"use client";

import { motion } from "framer-motion";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

export type NoSQLField = { key: string; type: string; value: string | number | boolean };
export type NoSQLIndex = { name: string; fields: string[]; type?: "unique" | "text" | "compound" | "sparse" | "ttl"; };

export function NoSQLInfoPanel({
  collection = "profile",
  fields,
  indexes,
  className,
}: {
  collection?: string;
  fields: NoSQLField[];
  indexes: NoSQLIndex[];
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
        "bg-gradient-to-br from-white/96 to-white/80 text-black",
        "border-black/10 shadow-sm shadow-black/10",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/10 px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <span className="inline-flex items-center gap-2 rounded-md bg-black/5 px-2 py-1 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Cluster
          </span>
          <span className="text-black/60">/</span>
          <span className="inline-flex items-center gap-2 rounded-md bg-black/5 px-2 py-1 font-semibold">{collection}</span>
        </div>
        <div className="text-xs text-black/60">NoSQL Inspector • Readonly</div>
      </div>

      {/* Indexes */}
      <div className="px-4 py-3">
        <div className="mb-2 text-xs font-semibold text-black/70">Indexes</div>
        <div className="flex flex-wrap gap-2">
          {indexes.map((idx, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-md border border-black/10 bg-white/80 px-2 py-1 text-xs font-medium shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
              {idx.name}
              <span className="text-black/50">•</span>
              <span className="text-black/70">{idx.fields.join(", ")}</span>
              {idx.type && (
                <span className="ml-1 rounded bg-black/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-black/70">{idx.type}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Fields grid */}
      <div className="px-4 pb-4">
        <div className="grid grid-cols-3 rounded-lg border border-black/10 bg-white/70 text-sm">
          <div className="col-span-1 border-b border-black/10 px-3 py-2 font-semibold">Field</div>
          <div className="col-span-1 border-b border-black/10 px-3 py-2 font-semibold">Type</div>
          <div className="col-span-1 border-b border-black/10 px-3 py-2 font-semibold">Value</div>
          {fields.map((f) => (
            <Fragment key={f.key}>
              <div className="col-span-1 border-t border-black/5 px-3 py-2 font-mono">{f.key}</div>
              <div className="col-span-1 border-t border-black/5 px-3 py-2">
                <span className="rounded bg-black/5 px-1.5 py-0.5 text-xs text-black/70">{f.type}</span>
              </div>
              <div className="col-span-1 border-t border-black/5 px-3 py-2 font-mono text-black/80 break-words">{String(f.value)}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
