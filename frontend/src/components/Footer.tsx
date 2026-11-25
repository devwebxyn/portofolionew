import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { channels } from "@/lib/site";
import { Signal } from "./Visuals";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="frame">
        <div className="footer-main">
          <div><p className="eyebrow"><Signal /> Laboratorium pribadi</p><p className="footer-name">Samuel Indra <em>Bastian.</em></p></div>
          <Link href="/contact" className="action action-outline">Mari bertukar cerita <ArrowUpRight size={17} aria-hidden /></Link>
        </div>
        <div className="footer-end"><span>Membangun bersama AI sejak Juli 2024.</span><ul>{channels.filter(({ label }) => ["GitHub", "Instagram", "Email"].includes(label)).map(({ href, label }) => <li key={href}><a href={href}>{label} <ArrowUpRight size={13} aria-hidden /></a></li>)}</ul></div>
      </div>
    </footer>
  );
}
