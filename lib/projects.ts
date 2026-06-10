import fs from "node:fs";
import path from "node:path";

export type ProjectPhoto = { src: string; alt: string; caption?: string; width?: number; height?: number };

export type Project = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  neighborhood: string; // neighborhood / area name
  city: string;
  completed: string; // human month + year, e.g. "September 2025"
  date: string; // ISO yyyy-mm-dd for schema dateCreated
  services: string[];
  products: string[];
  narrative: string[]; // paragraphs
  photos: ProjectPhoto[]; // 2–4 photos
};

const projectsDir = path.join(process.cwd(), "content", "projects");

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDir)) return [];
  return fs
    .readdirSync(projectsDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getProject(slug: string): Project | null {
  const file = path.join(projectsDir, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as Project;
}

// Newest completed projects first.
export function getAllProjects(): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug))
    .filter((p): p is Project => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
