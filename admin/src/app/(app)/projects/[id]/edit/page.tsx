import { redirect } from "next/navigation";
import { proxy } from "@/lib/proxy";
import type { Project } from "@/lib/types";
import { ProjectForm } from "@/components/ProjectForm";

export const dynamic = "force-dynamic";

export const metadata = { title: "Edit Project" };

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { status, body } = await proxy("/api/admin/projects");
  if (status === 401) redirect("/login");
  const project: Project | undefined = ((body?.items as Project[] | undefined) ?? []).find(
    (p) => p.$id === id
  );
  if (!project) redirect("/");

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="mt-1 text-sm text-body">{project.title}</p>
      </div>
      <div className="glass rounded-xl p-6">
        <ProjectForm mode="edit" initial={project} />
      </div>
    </div>
  );
}
