import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Action({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <Link href={href} className={`action ${outline ? "action-outline" : "action-solid"}`}>{children}<ArrowUpRight size={17} aria-hidden /></Link>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-link">{children}<ArrowRight size={17} aria-hidden /></Link>;
}

export function PageIntro({ label, title, children, art, className = "" }: { label: string; title: ReactNode; children: ReactNode; art?: ReactNode; className?: string }) {
  return (
    <section className={`page-intro ${art ? "split-intro" : ""} ${className}`}>
      <div className="frame intro-layout">
        <div className="intro-text entrance">
          <p className="eyebrow">{label}</p>
          <h1>{title}</h1>
          <p className="lead">{children}</p>
        </div>
        {art && <div className="intro-art">{art}</div>}
      </div>
    </section>
  );
}
