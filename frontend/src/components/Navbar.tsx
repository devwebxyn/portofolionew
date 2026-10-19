"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

const LINKS = [
  { href: "/about", label: "About", index: "01" },
  { href: "/projects", label: "Projects", index: "02" },
  { href: "/profile", label: "Profile", index: "03" },
  { href: "/contact", label: "Contact", index: "04" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "border-b border-line bg-void/75 backdrop-blur-xl" : "border-b border-transparent"
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[90rem] items-center justify-between px-5 sm:px-10">
          <Link href="/" className="group flex items-center gap-2 font-mono text-sm font-semibold text-hi">
            <span className="grid h-7 w-7 place-items-center rounded-md bg-accent text-[11px] font-bold text-void transition-transform group-hover:-rotate-12">
              S
            </span>
            <span>
              sib<span className="text-accent">.dev</span>
              <span className="ml-2 hidden text-mut lg:inline">~/Samuel</span>
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "group relative px-4 py-2 font-mono text-sm transition-colors",
                    active ? "text-hi" : "text-mut hover:text-hi"
                  )}
                >
                  <span className="relative">
                    <span className="mr-1.5 text-accent">{l.index}</span>
                    {l.label}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-4 h-px bg-accent transition-all duration-300",
                      active ? "w-[calc(100%-2rem)]" : "w-0 group-hover:w-[calc(100%-2rem)]"
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            <span className="hidden items-center gap-2 font-mono text-xs text-mut xl:flex">
              <span className="animate-pulse-dot h-2 w-2 rounded-full bg-ok" />
              open to work
            </span>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-bold text-void transition-all hover:shadow-[0_0_28px_rgba(200,255,46,0.45)]"
            >
              Hire me
              <ArrowUpRight size={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen(!open)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
          >
            <div className="relative h-3.5 w-5">
              <span className={cn("absolute left-0 top-0 h-0.5 w-full bg-hi transition-all duration-300", open && "top-1.5 rotate-45")} />
              <span className={cn("absolute left-0 top-1.5 h-0.5 w-3/4 bg-hi transition-all duration-300", open && "opacity-0")} />
              <span className={cn("absolute left-0 top-3 h-0.5 w-full bg-hi transition-all duration-300", open && "top-1.5 -rotate-45")} />
            </div>
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-void/95 px-8 backdrop-blur-2xl md:hidden"
          >
            <div className="absolute right-0 top-1/3 -z-0 select-none">
              <span className="text-outline type-display text-[38vw] leading-none">SI</span>
            </div>
            <div className="space-y-1">
              {LINKS.map((l, i) => {
                const active = pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.5, ease: EASE }}
                    className="relative overflow-hidden border-b border-line pb-2"
                  >
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "type-display flex items-baseline gap-4 py-2 text-5xl font-bold transition-colors",
                        active ? "text-accent" : "text-hi"
                      )}
                    >
                      <span className="font-mono text-sm text-mut">{l.index}</span>
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10"
            >
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-bold text-void"
              >
                Hire me <ArrowUpRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
