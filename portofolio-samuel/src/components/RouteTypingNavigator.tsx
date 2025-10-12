"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { CodeWindow } from "@/components/CodeWindow";
import { TypeAnimation } from "react-type-animation";

export function RouteTypingNavigator() {
  const router = useRouter();
  const pathname = usePathname();
  const [typing, setTyping] = useState(false);
  const navigateRef = useRef<() => void>(() => {});
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const anchor = target.closest('a') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;
      if (anchor.target === '_blank') return; // respect new tab

      // Build absolute URL to compare
      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return; // external link

      // If navigating within same pathname with hash only, let default (smooth scroll) happen
      const isSamePath = url.pathname === pathname;
      if (isSamePath && url.hash) return;

      // Intercept and show typing overlay before navigating
      e.preventDefault();
      if (typing) return; // ignore if already showing
      navigateRef.current = () => router.push(url.pathname + url.search + url.hash);
      setTyping(true);

      // Enforce ~6s loading before navigating
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        navigateRef.current?.();
        // hide overlay shortly after navigation starts
        setTimeout(() => setTyping(false), 400);
      }, 6000);
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [pathname, router, typing]);

  return (
    <AnimatePresence>
      {typing && (
        <motion.div
          key="route-typing-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-white/85 backdrop-blur-md"
        >
          <div className="w-[min(90vw,900px)] mx-auto px-6">
            <CodeWindow title="Memuat..." filename="loading.ts" language="ts">
              <TypeAnimation
                speed={55}
                cursor={true}
                repeat={0}
                sequence={[
                  "// Menyiapkan halaman...",
                  700,
                  "\nconst status = 'sebentar saja';",
                  500,
                  "\nrender('antarmuka');",
                  500,
                  "\n// Hampir selesai...",
                  800,
                  "\n// Membuka halaman",
                  700,
                ]}
                className="block text-sm"
              />
            </CodeWindow>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
