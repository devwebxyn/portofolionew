import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectImage } from "@/components/ProjectImage";
import { ProjectState } from "@/components/ProjectShowcase";
import { getProjects, projectPath, projectTechnologies, validProjectId } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

type Props = { params: Promise<{ identifier: string }> };

async function findProject(params: Props["params"]) {
  const { identifier } = await params;
  if (!validProjectId(identifier)) notFound();
  const projects = await getProjects();
  if (!projects) return null;
  const project = projects.find((item) => item.id === identifier);
  if (!project) notFound();
  return project;
}

export async function generateMetadata({ params }: Props) {
  const project = await findProject(params);
  if (!project) return { title: "Proyek belum bisa dimuat", robots: { index: false } };
  const description = project.description.replace(/\s+/g, " ").trim().slice(0, 155) || `${project.title}, proyek di laboratorium digital Samuel Indra Bastian.`;
  return pageMetadata(projectPath(project.id), project.title, description, project.imageUrl);
}

export default async function ProjectDetail({ params }: Props) {
  const project = await findProject(params);
  if (!project) return <div className="frame section"><h1 className="sr-only">Detail proyek</h1><ProjectState state="error" /></div>;
  const technologies = projectTechnologies(project);
  const date = project.published !== undefined ? new Date(project.published) : null;

  return <article className="frame detail-page">
    <Link className="text-link" href="/projects"><ArrowLeft size={17} aria-hidden /> Semua proyek</Link>
    <header className="detail-heading entrance">
      <p className="eyebrow">Arsip proyek{date && <> / <time dateTime={date.toISOString()}>{new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Jakarta" }).format(date)}</time></>}</p>
      <h1>{project.title}</h1>
      {technologies.length > 0 && <ul className="tags" aria-label="Teknologi yang digunakan">{technologies.map((tech) => <li key={tech}>{tech}</li>)}</ul>}
    </header>
    <ProjectImage key={project.imageUrl} src={project.imageUrl} title={project.title} detail />
    <div className="detail-content">
      <section>
        <h2>Tentang proyek</h2>
        <p className="project-description">{project.description || "Belum ada catatan tentang proyek ini."}</p>
      </section>
      {(project.githubUrl || project.liveUrl) && <aside>
        <h2>Tautan proyek</h2>
        {project.liveUrl && <a className="action action-solid" href={project.liveUrl}>Lihat demo <ArrowUpRight size={17} aria-hidden /></a>}
        {project.githubUrl && <a className="action action-outline" href={project.githubUrl}>Buka repositori <ArrowUpRight size={17} aria-hidden /></a>}
      </aside>}
    </div>
  </article>;
}
