import { ArrowUpRight, Cpu } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return <footer className="site-footer"><div className="frame">
    <div className="footer-main"><Link className="brand" href="/"><Cpu size={26} aria-hidden /><span>Samuel Indra Bastian</span></Link><p>Pemrograman low-level, sistem Linux, dan elektronika.</p></div>
    <div className="footer-end"><span>Dirancang oleh Samuel Indra Bastian</span><ul>
      <li><a href="https://github.com/devwebxyn">GitHub <ArrowUpRight size={13} aria-hidden /></a></li>
      <li><Link href="/contact">Kontak <ArrowUpRight size={13} aria-hidden /></Link></li>
    </ul></div>
  </div></footer>;
}
