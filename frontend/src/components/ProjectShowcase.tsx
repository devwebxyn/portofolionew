import Form from "next/form";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { getProjects, projectPath, projectTechnologies, type Project } from "@/lib/projects";
import { ProjectImage } from "./ProjectImage";
import { Retry } from "./Retry";
import { Connection } from "./bare/Computing";

export function ProjectCard({ project }: { project: Project }) {
  const technologies = projectTechnologies(project).slice(0, 4);
  return (
    <article className="project-card">
      <Link className="project-card-link" href={projectPath(project.id)} prefetch={false}>
        <ProjectImage key={project.imageUrl} src={project.imageUrl} title={project.title} />
        <div className="project-card-copy">
          {technologies.length > 0 && <p className="eyebrow">{technologies.join(" / ")}</p>}
          <h3>{project.title} <ArrowUpRight size={25} aria-hidden /></h3>
          {project.description && <p className="project-excerpt">{project.description}</p>}
        </div>
      </Link>
    </article>
  );
}

export function ProjectSkeleton({ compact = false }: { compact?: boolean }) {
  return <div className={`project-skeleton ${compact ? "project-skeleton-compact" : ""}`} role="status" aria-busy="true">
    <span className="sr-only">Memuat proyek…</span><div aria-hidden="true" /><div aria-hidden="true" />
  </div>;
}

export function ProjectState({ state }: { state: "error" | "empty" | "search" }) {
  const content = {
    error: ["Proyek belum tersedia.", "Arsip proyek gagal dimuat. Coba lagi untuk memeriksa sambungan."],
    empty: ["Belum ada proyek yang terbit.", "Proyek yang saya terbitkan akan muncul di halaman ini."],
    search: ["Proyek tidak ditemukan.", "Coba kata kunci lain atau lihat seluruh proyek."],
  }[state];

  return <div className="project-state" data-scene>
    <div>
      <h2>{content[0]}</h2><p>{content[1]}</p>
      {state === "error" && <Retry />}
      {state === "search" && <Link className="action action-outline" href="/projects">Hapus pencarian</Link>}
    </div>
    {state !== "search" && <Connection />}
  </div>;
}

export async function ProjectShowcase({ preview = false, query = "", tech = "" }: { preview?: boolean; query?: string; tech?: string }) {
  const projects = await getProjects();
  if (projects === null) return <ProjectState state="error" />;
  if (!projects.length) return <ProjectState state="empty" />;

  const options = [...new Set(projects.flatMap(projectTechnologies))].sort((a, b) => a.localeCompare(b, "id"));
  const selected = options.includes(tech) ? tech : "";
  const tokens = query.toLocaleLowerCase("id-ID").split(/\s+/).filter(Boolean);
  const matches = preview ? projects.slice(0, 2) : projects.filter((project) => {
    const searchable = [project.title, project.description, ...projectTechnologies(project)].join(" ").toLocaleLowerCase("id-ID");
    return tokens.every((token) => searchable.includes(token)) && (!selected || projectTechnologies(project).includes(selected));
  });

  return <>
    {!preview && <Form action="/projects" className="project-search" role="search">
      <div><label htmlFor="kata-kunci">Cari proyek</label><input id="kata-kunci" key={query} type="search" defaultValue={query} name="q" maxLength={120} placeholder="Nama proyek atau teknologi" /></div>
      <div><label htmlFor="teknologi">Teknologi</label><select id="teknologi" key={selected} name="tech" defaultValue={selected}><option value="">Semua teknologi</option>{options.map(option => <option key={option} value={option}>{option}</option>)}</select></div>
      <button type="submit" className="action action-solid"><Search size={18} aria-hidden /> Cari</button>
    </Form>}
    {!matches.length ? <ProjectState state="search" /> :
      <div className={`project-layout ${preview ? "project-preview-layout" : ""}`}>
        {!preview && <h2 className="sr-only">{(query || selected) ? "Hasil pencarian" : "Daftar proyek"}</h2>}
        {matches.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>}
  </>;
}
