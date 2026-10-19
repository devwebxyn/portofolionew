// /src/components/CodeWindow.tsx
import * as React from "react";
import { cn } from "@/lib/utils";

type CodeWindowProps = {
  title?: string;
  filename?: string;
  language?: string;
  code?: string;
  className?: string;
  children?: React.ReactNode; // optional custom content instead of code string
};

export function CodeWindow({ title = "VSCode", filename = "profile.ts", language = "ts", code, className, children }: CodeWindowProps) {
  return (
    <div className={cn("overflow-hidden rounded-3xl border border-line bg-panel", className)}>
      {/* Title bar */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-white/4 px-5 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="font-mono text-xs text-hi">{title}</div>
        <div className="font-mono text-xs text-mut">{filename}</div>
      </div>
      {/* Content */}
      <div className="relative">
        <pre className="m-0 overflow-auto whitespace-pre-wrap p-5 font-mono text-sm leading-6 text-body">
          <code className={`language-${language}`}>
            {children ? children : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
