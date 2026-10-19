// /src/components/JetBrainsPanel.tsx
"use client";

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
    <section className={cn("relative overflow-hidden rounded-3xl border border-line bg-panel", className)}>
      {/* Top toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-white/4 px-5 py-3">
        <div className="font-mono text-sm text-hi">{title ?? "JetBrains Panel"}</div>
        {tabs && tabs.length > 0 && (
          <div className="flex items-center gap-1">
            {tabs.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "inline-flex items-center rounded px-2.5 py-1 font-mono text-xs",
                  i === active ? "bg-accent/15 text-accent" : "text-mut"
                )}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5 text-sm text-body">{children}</div>
    </section>
  );
}
