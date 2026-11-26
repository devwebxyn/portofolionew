import { Suspense } from "react";
import { Chapter } from "@/components/bare/Exhibit";
import { ProjectShowcase, ProjectSkeleton } from "@/components/ProjectShowcase";
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
    <header className="archive-title entrance"><h1>Sebuah arsip <em>eksperimen.</em></h1><p className="lead">Perangkat lunak, sistem, dan elektronika yang saya bangun dan terbitkan.</p></header>
    <Suspense fallback={<ProjectSkeleton />}><Results searchParams={searchParams} /></Suspense>
  </section>;
}
