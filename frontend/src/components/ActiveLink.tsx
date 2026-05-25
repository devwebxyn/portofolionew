"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ActiveLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link href={href} className={`${className ?? ''} ${active ? 'underline underline-offset-8 decoration-2' : ''}`}>
      {children}
    </Link>
  );
}
