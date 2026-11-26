import { Suspense } from "react";
import { Chapter } from "@/components/bare/Exhibit";
import { ProjectShowcase, ProjectSkeleton } from "@/components/ProjectShowcase";
import { ResearchFocus } from "@/components/ResearchFocus";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/projects", "Proyek", "Arsip proyek Samuel Indra Bastian di bidang perangkat lunak, sistem komputer, dan elektronika.");

type Props = { searchParams: Promise<{ q?: string | string[]; tech?: string | string[] }> };
const param = (value: string | string[] | undefined) => typeof value === "string" ? value.trim().slice(0, 120) : "";

async function Results({ searchParams }: Props) {
  const { q, tech } = await searchParams;
  return <ProjectShowcase query={param(q)} tech={param(tech)} />;
}

export default function ProjectsPage({ searchParams }: Props) {
  return <section className="frame page-top archive-page">
    <Chapter id="ARSIP" label="Proyek terbit" />
    <header className="archive-title entrance"><h1>Sebuah arsip <em>eksperimen.</em></h1><p className="lead">Di sini saya mengarsipkan karya yang sudah saya terbitkan. Buka detail untuk melihat teknologi, catatan, dan tautan yang tersedia pada setiap proyek.</p></header>
    <ResearchFocus />
    <h2>Arsip proyek terbit</h2>
    <Suspense fallback={<ProjectSkeleton />}><Results searchParams={searchParams} /></Suspense>
  </section>;
}
