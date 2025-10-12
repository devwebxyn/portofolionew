// /src/components/CodeWindow.tsx
import * as React from "react";

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
    <div className={"rounded-xl border border-border-subtle bg-background-subtle overflow-hidden " + (className ?? "") }>
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-subtle bg-background-dark/70">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-xs text-text-body">{title}</div>
        <div className="text-xs text-text-body">{filename}</div>
      </div>
      {/* Content */}
      <div className="relative">
        <pre className="m-0 p-4 text-sm leading-6 overflow-auto whitespace-pre-wrap font-mono text-text-body/90">
          <code className={`language-${language}`}>
            {children ? children : code}
          </code>
        </pre>
      </div>
    </div>
  );
}
