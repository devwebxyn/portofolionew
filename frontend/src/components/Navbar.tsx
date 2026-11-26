"use client";

import { ArrowUpRight, ChevronDown, Cpu, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation, worlds } from "@/lib/site";

const primary = navigation.filter(item => !worlds.includes(item) && item.href !== "/");
const matches = (href: string, path: string) => href === path || path.startsWith(href + "/");

export function Navbar() {
  const path = usePathname();
  const [openedAt, setOpenedAt] = useState<string | null>(null);
  const [worldAt, setWorldAt] = useState<string | null>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const worldToggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const open = path === openedAt;
  const worldOpen = path === worldAt;
  const close = () => { setOpenedAt(null); setWorldAt(null); };
  useEffect(() => {
    const sync = () => header.current?.toggleAttribute("data-solid", window.scrollY > 28);
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpenedAt(null);
        setWorldAt(null);
      }
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    document.addEventListener("pointerdown", outside);
    return () => {
      window.removeEventListener("scroll", sync);
      document.removeEventListener("pointerdown", outside);
    };
  }, []);
  function link({href,label}: (typeof navigation)[number]) {
    return <Link key={href} href={href} className={matches(href,path) ? "nav-active" : undefined} aria-current={href === path ? "page" : undefined} onClick={close}>
      {label}{href === "/contact" && <ArrowUpRight size={14} aria-hidden />}
    </Link>;
  }

  return <header ref={header} className="site-header" onKeyDown={event => {
    if (event.key !== "Escape") return;
    if (worldOpen) { setWorldAt(null); worldToggle.current?.focus(); }
    else if (open) { close(); toggle.current?.focus(); }
  }}>
    <div className="frame header-inner">
      <Link className="brand" href="/" onClick={close} aria-label="Samuel Indra Bastian, beranda"><Cpu size={22} aria-hidden /><span>Samuel Indra Bastian</span></Link>
      <button type="button" ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="navigasi" onClick={() => open ? close() : setOpenedAt(path)}>
        {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}{open ? "Tutup" : "Menu"}
      </button>
      <nav aria-label="Navigasi utama" id="navigasi" className={open ? "navigation is-open" : "navigation"}>
        {primary.slice(0,2).map(link)}
        <div className="world-menu">
          <button type="button" ref={worldToggle} className={worlds.some(({href})=>matches(href,path)) ? "world-current" : undefined} aria-expanded={worldOpen} aria-controls="ruang-teknologi" onClick={() => setWorldAt(worldOpen ? null : path)}>Eksplorasi <ChevronDown size={16} aria-hidden /></button>
          <div id="ruang-teknologi" className="world-panel" data-open={worldOpen}>{worlds.map(link)}</div>
        </div>
        {primary.slice(2).map(link)}
      </nav>
    </div>
  </header>;
}
