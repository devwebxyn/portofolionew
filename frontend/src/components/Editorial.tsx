import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

export function Action({ href, children, outline = false }: { href: string; children: ReactNode; outline?: boolean }) {
  return <Link href={href} className={`action ${outline ? "action-outline" : "action-solid"}`}>{children}<ArrowUpRight size={17} aria-hidden /></Link>;
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="text-link">{children}<ArrowRight size={17} aria-hidden /></Link>;
}
