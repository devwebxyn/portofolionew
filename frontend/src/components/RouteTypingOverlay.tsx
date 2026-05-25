"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CodeWindow } from "@/components/CodeWindow";
import { TypeAnimation } from "react-type-animation";

export function RouteTypingOverlay() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const targetRef = useRef<string | null>(null);
  const hideTimer = useRef<number | null>(null);

  useEffect(() => {
    const start = (targetUrl?: string) => {
      if (hideTimer.current) {
        window.clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
      if (typeof targetUrl === "string") {
        try {
          const u = new URL(targetUrl, location.href);
          targetRef.current = u.pathname + (u.hash || "");
        } catch {
          targetRef.current = targetUrl;
        }
      } else {
        targetRef.current = location.pathname + location.hash;
      }
      setActive(true);
      // Safety timeout auto-hide
      hideTimer.current = window.setTimeout(() => setActive(false), 3000);
    };
    const done = () => {
      // Will be handled by pathname effect
    };

  const originalPush = history.pushState as (this: History, data: unknown, unused: string, url?: string | URL | null) => void;
    history.pushState = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ) {
      try { start(typeof url === 'string' ? url : url?.toString()); } catch {}
  const res = originalPush.call(window.history, data, unused, url);
      done();
      return res;
    } as History['pushState'];
  const originalReplace = history.replaceState as (this: History, data: unknown, unused: string, url?: string | URL | null) => void;
    history.replaceState = function (
      data: unknown,
      unused: string,
      url?: string | URL | null
    ) {
      try { start(typeof url === 'string' ? url : url?.toString()); } catch {}
  const res = originalReplace.call(window.history, data, unused, url);
      done();
      return res;
    } as History['replaceState'];
    const onPop = () => start();
    window.addEventListener("popstate", onPop);

    return () => {
      history.pushState = originalPush;
      history.replaceState = originalReplace;
      window.removeEventListener("popstate", onPop);
      if (hideTimer.current) window.clearTimeout(hideTimer.current);
    };
  }, []);

  // When the path actually updated to target, hide after a short delay
  useEffect(() => {
    if (!active) return;
    const now = pathname + (location.hash || "");
    if (targetRef.current && now.includes(targetRef.current)) {
      const t = window.setTimeout(() => setActive(false), 550);
      return () => window.clearTimeout(t);
    }
  }, [pathname, active]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/80 backdrop-blur-md"
        >
          <div className="w-[min(90vw,900px)] mx-auto px-6">
            <CodeWindow title="Navigating..." filename="loading.ts" language="ts">
              <TypeAnimation
                speed={60}
                sequence={[
                  "// Menyusun halaman tujuan...",
                  1000,
                  "const fetchData = async () => {",
                  400,
                  "\n  const res = await fetch('/api/next');",
                  400,
                  "\n  return res.json();",
                  300,
                  "\n}",
                  300,
                  "\nawait fetchData();",
                  600,
                  "\n// Siap! Memuat tampilan...",
                  800,
                ]}
                wrapper="span"
                repeat={Infinity}
                className="block text-sm"
              />
            </CodeWindow>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
