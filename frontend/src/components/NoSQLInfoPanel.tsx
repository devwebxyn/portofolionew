// /src/components/NoSQLInfoPanel.tsx
"use client";

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
    <section className={cn("relative overflow-hidden rounded-3xl border border-line bg-panel", className)}>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white/4 px-5 py-3">
        <div className="flex items-center gap-2 font-mono text-sm text-hi">
          <span className="inline-flex items-center gap-2 rounded-md bg-white/4 px-2 py-1 text-hi">
            <span className="h-2 w-2 rounded-full bg-ok" />
            Cluster
          </span>
          <span className="text-mut">/</span>
          <span className="inline-flex items-center gap-2 rounded-md bg-white/4 px-2 py-1 text-accent">{collection}</span>
        </div>
        <div className="font-mono text-xs text-mut">NoSQL Inspector • Readonly</div>
      </div>

      {/* Indexes */}
      <div className="px-5 py-4">
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.25em] text-mut">
          Indexes <span className="text-accent">{indexes.length}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {indexes.map((idx, i) => (
            <span key={i} className="inline-flex items-center gap-2 rounded-full border border-line bg-white/4 px-3 py-1.5 font-mono text-xs text-body">
              <span className="h-1.5 w-1.5 rounded-full bg-accent2" />
              {idx.name}
              <span className="text-mut">•</span>
              <span>{idx.fields.join(", ")}</span>
              {idx.type && (
                <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] uppercase tracking-wide text-accent">{idx.type}</span>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Fields grid */}
      <div className="px-5 pb-5">
        <div className="grid grid-cols-3 overflow-hidden rounded-xl border border-line text-sm">
          <div className="col-span-1 bg-white/4 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-mut">Field</div>
          <div className="col-span-1 bg-white/4 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-mut">Type</div>
          <div className="col-span-1 bg-white/4 px-3 py-2 font-mono text-xs uppercase tracking-[0.2em] text-mut">Value</div>
          {fields.map((f) => (
            <Fragment key={f.key}>
              <div className="col-span-1 border-t border-line px-3 py-2 font-mono text-accent">{f.key}</div>
              <div className="col-span-1 border-t border-line px-3 py-2">
                <span className="rounded bg-accent/10 px-1.5 py-0.5 font-mono text-[11px] text-accent">{f.type}</span>
              </div>
              <div className="col-span-1 break-words border-t border-line px-3 py-2 font-mono text-body">{String(f.value)}</div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
