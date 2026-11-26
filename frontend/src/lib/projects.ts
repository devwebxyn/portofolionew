import { cache } from "react";
import { publicApi } from "./public-api";

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  language?: string;
  category?: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  published?: number;
};

export const validProjectId = (id: string) => /^[a-z0-9][a-z0-9._-]{0,35}$/i.test(id);
export const projectPath = (id: string) => `/projects/${encodeURIComponent(id)}`;

function text(value: unknown) {
  return typeof value === "string" && value.trim() ? value : undefined;
}

function httpUrl(value: unknown) {
  const input = text(value);
  if (!input) return;
  try {
    const url = new URL(input);
    if ((url.protocol === "http:" || url.protocol === "https:") && !url.username && !url.password) return url.href;
  } catch {
    return;
  }
}

function normalizeProject(input: unknown): Project | null {
  if (!input || typeof input !== "object") return null;
  const record = input as Record<string, unknown>;
  const id = text(record.$id);
  const title = text(record.title);
  if (!id || !validProjectId(id) || !title) return null;

  const published = Date.parse(text(record.createdAt) ?? text(record.$createdAt) ?? "");
  return {
    id, title,
    description: text(record.description) ?? "",
    tags: Array.isArray(record.tags) ? record.tags.flatMap((tag) => text(tag) ?? []) : [],
    category: text(record.category),
    language: text(record.language),
    imageUrl: httpUrl(record.imageUrl),
    githubUrl: httpUrl(record.githubUrl),
    liveUrl: httpUrl(record.liveUrl),
    published: Number.isFinite(published) ? published : undefined,
  };
}

export function projectTechnologies(project: Project) {
  return [...new Set([project.category, project.language, ...project.tags].filter((value): value is string => Boolean(value)))];
}

// Deduplikasikan pengambilan data antara metadata dan halaman detail dalam permintaan yang sama.
export const getProjects = cache(async (): Promise<Project[] | null> => {
  try {
    const response = await publicApi("/api/projects", { headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    const result: unknown = await response.json();
    if (!result || typeof result !== "object" || !("ok" in result) || result.ok !== true || !("items" in result)) return null;
    // Go dapat mengodekan slice kosong sebagai null.
    if (result.items === null) return [];
    if (!Array.isArray(result.items)) return null;

    const projects = new Map<string, Project>();
    for (const item of result.items) {
      const project = normalizeProject(item);
      if (project) projects.set(project.id, project);
    }
    if (result.items.length && !projects.size) return null;
    return [...projects.values()].sort((first, second) => (second.published ?? 0) - (first.published ?? 0));
  } catch {
    return null;
  }
});
