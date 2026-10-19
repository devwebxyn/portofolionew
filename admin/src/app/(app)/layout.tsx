"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { LogoutButton } from "@/components/LogoutButton";

const nav = [{ href: "/", label: "Dashboard", icon: LayoutDashboard }];

export default function AppLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="fixed inset-x-0 top-0 z-20 flex h-14 items-center justify-between border-b border-line bg-panel px-4 md:inset-y-0 md:left-0 md:h-auto md:w-56 md:flex-col md:justify-start md:border-r md:border-b-0 md:px-0">
        <div className="flex items-center gap-2 md:px-5 md:py-5">
          <div className="h-2 w-2 rounded-full bg-accent" />
          <span className="font-display text-sm font-bold tracking-tight text-hi">Admin</span>
        </div>
        <nav className="flex items-center gap-1 md:w-full md:flex-col md:items-stretch md:gap-0 md:space-y-1 md:px-3">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-full items-center gap-3 rounded-md px-2.5 text-sm transition-colors md:h-auto md:px-3 md:py-2 ${
                  active
                    ? "bg-white/[0.07] text-hi md:shadow-[inset_2px_0_0_0_var(--color-accent)]"
                    : "text-body hover:bg-white/5 hover:text-hi"
                }`}
              >
                <item.icon className={`h-4 w-4 ${active ? "text-accent" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="md:w-full md:border-t md:border-line md:p-3">
          <LogoutButton />
        </div>
      </aside>
      <main className="flex-1 px-4 pb-8 pt-20 md:ml-56 md:px-8 md:py-8">{children}</main>
    </div>
  );
}
