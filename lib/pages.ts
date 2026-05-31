import fs from "node:fs";
import path from "node:path";

export type PageFaq = { q: string; a: string };
export type PageContent = {
  key: string; // URL path without leading slash, e.g. "pricing/interior-prices"
  title: string;
  metaDescription: string;
  h1: string;
  bodyHtml: string;
  faqs: PageFaq[];
  gallery?: { src: string; alt: string }[];
};

const pagesDir = path.join(process.cwd(), "content", "pages");

function walk(dir: string, base = ""): string[] {
  if (!fs.existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(path.join(dir, entry.name), rel));
    else if (entry.name.endsWith(".json")) out.push(rel.replace(/\.json$/, ""));
  }
  return out;
}

export function getAllPageKeys(): string[] {
  return walk(pagesDir);
}

export function getPage(key: string): PageContent | null {
  const file = path.join(pagesDir, `${key}.json`);
  if (!fs.existsSync(file) || !path.resolve(file).startsWith(path.resolve(pagesDir))) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as PageContent;
}
