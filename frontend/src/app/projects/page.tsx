import { Suspense } from "react";
import { PageIntro } from "@/components/Editorial";
import { ProjectShowcase, ProjectSkeleton } from "@/components/ProjectShowcase";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("/projects", "Proyek", "Arsip proyek Samuel Indra Bastian, dari ide yang dikerjakan bersama AI hingga eksplorasi sistem dan perangkat keras.");

async function Results({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  return <ProjectShowcase query={typeof q === "string" ? q.trim().slice(0, 120) : ""} />;
}

export default function ProjectsPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  return <>
    <PageIntro label="Arsip proyek" title={<>Dari ide menjadi <em>proyek.</em></>}>Kumpulan hal yang saya buat dan uji selama menjelajahi perangkat lunak, sistem komputer, dan elektronika.</PageIntro>
    <div className="frame section-compact project-list-section">
      <Suspense fallback={<ProjectSkeleton />}><Results searchParams={searchParams} /></Suspense>
    </div>
  </>;
}
