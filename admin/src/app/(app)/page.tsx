import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Folder, Inbox, Mail, Pencil, Plus } from "lucide-react";
import { proxy } from "@/lib/proxy";
import type { Message, Project } from "@/lib/types";
import { DeleteProjectButton } from "@/components/DeleteProjectButton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [projectsRes, messagesRes] = await Promise.all([
    proxy("/api/admin/projects"),
    proxy("/api/admin/messages"),
  ]);
  if (projectsRes.status === 401 || messagesRes.status === 401) redirect("/login");

  const projects: Project[] = (projectsRes.body?.items as Project[] | undefined) ?? [];
  const messages: Message[] = (messagesRes.body?.items as Message[] | undefined) ?? [];
  const unread = messages.filter((m) => m.status === "unread").length;

  const stats = [
    { label: "Total Project", value: projects.length, icon: Folder, accent: false },
    { label: "Total Pesan", value: messages.length, icon: Mail, accent: false },
    { label: "Belum Dibaca", value: unread, icon: Inbox, accent: true },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Tambah Project
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`glass rounded-xl p-5 ${s.accent ? "border-accent/40" : ""}`}
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-body">{s.label}</p>
              <s.icon className={`h-4 w-4 ${s.accent ? "text-accent" : "text-body"}`} />
            </div>
            <p
              className={`mt-2 font-display text-3xl font-bold ${
                s.accent ? "text-accent" : "text-hi"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="glass overflow-x-auto rounded-xl">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-body">
              <th className="px-4 py-3 font-medium">Thumbnail</th>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Language</th>
              <th className="px-4 py-3 font-medium">Tags</th>
              <th className="px-4 py-3 text-right font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-body">
                  Belum ada project.{" "}
                  <Link href="/projects/new" className="text-accent hover:underline">
                    Tambah project pertama
                  </Link>
                </td>
              </tr>
            )}
            {projects.map((p) => (
              <tr key={p.$id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <div className="relative h-12 w-16 overflow-hidden rounded-md border border-line bg-elev">
                    {p.imageUrl ? (
                      <Image
                        src={p.imageUrl}
                        alt={p.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-body">
                        —
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-hi">{p.title}</td>
                <td className="px-4 py-3 text-body">{p.category || "—"}</td>
                <td className="px-4 py-3 text-body">{p.language || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(p.tags ?? []).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-line bg-elev px-2 py-0.5 text-[11px] text-body"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/projects/${p.$id}/edit`}
                      aria-label={`Edit ${p.title}`}
                      className="inline-flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1.5 text-xs text-body transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                    <DeleteProjectButton id={p.$id} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
