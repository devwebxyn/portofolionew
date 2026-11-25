import type { MetadataRoute } from "next";
import { navigation, siteUrl } from "@/lib/site";
import { getProjects, projectPath } from "@/lib/projects";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects();
  return [
    ...navigation.map(({ href }) => ({ url: `${siteUrl}${href}` })),
    ...((projects ?? []).map((item) => ({ url: `${siteUrl}${projectPath(item.id)}` }))),
  ];
}
