import { ProjectForm } from "@/components/ProjectForm";

export const metadata = { title: "Project Baru" };

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight">Tambah Project</h1>
        <p className="mt-1 text-sm text-body">Isi detail project baru.</p>
      </div>
      <div className="glass rounded-xl p-6">
        <ProjectForm mode="new" />
      </div>
    </div>
  );
}
