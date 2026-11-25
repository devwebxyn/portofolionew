"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { navigation } from "@/lib/site";
import { Signal } from "./Visuals";

export function Navbar() {
  const pathname = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const open = pathname === openedAt;

  return (
    <header className="site-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpenedAt(null);
        toggle.current?.focus();
      }
    }}>
      <div className="frame header-inner">
        <Link className="brand" href="/" onClick={() => setOpenedAt(null)}>
          <Signal /><span>Samuel<span className="brand-detail"> Indra Bastian</span></span>
        </Link>
        <button type="button" ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigasi" onClick={() => setOpenedAt(open ? null : pathname)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}{open ? "Tutup" : "Menu"}
        </button>
        <nav aria-label="Navigasi utama" id="navigasi" className={open ? "navigation is-open" : "navigation"}>
          {navigation.map(({ href, label }) => {
            const exact = pathname === href;
            const active = exact || (href !== "/" && pathname.startsWith(`${href}/`));
            return <Link key={href} href={href} className={active ? "nav-active" : undefined} aria-current={exact ? "page" : active ? "location" : undefined}
              onClick={() => setOpenedAt(null)}>
              {label}{href === "/contact" && <ArrowUpRight size={14} aria-hidden />}
            </Link>;
          })}
        </nav>
      </div>
    </header>
  );
}
