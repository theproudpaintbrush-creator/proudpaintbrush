import fs from "node:fs";
import path from "node:path";

export type PageFaq = { q: string; a: string };

// Optional rich-content blocks. They render in ContentPage ONLY when present,
// so the ~20 plain content pages that omit them are completely unaffected.
// Used by the service-areas pages to match the depth of the service hubs.
export type PageReviewSpec = {
  heading?: string;
  intro?: string;
  // pick specific reviews by author (in order); falls back to service/limit
  authors?: string[];
  service?: "interior" | "exterior" | "cabinet";
  limit?: number;
};
export type PageRelatedLink = { href: string; label: string; description?: string };
export type PageRelatedLinks = { heading?: string; intro?: string; links: PageRelatedLink[] };
export type PageCityCard = {
  href: string;
  label: string;
  description?: string;
  image: { src: string; alt: string; width: number; height: number };
};
export type PageCityCards = { heading?: string; intro?: string; cards: PageCityCard[] };
export type PagePriceTeaser = { heading: string; range: string; note: string; href: string; linkLabel: string };

export type PageContent = {
  key: string; // URL path without leading slash, e.g. "pricing/interior-prices"
  title: string;
  metaDescription: string;
  h1: string;
  bodyHtml: string;
  faqs: PageFaq[];
  gallery?: { src: string; alt: string }[];
  // optional rich blocks (service-areas pages opt in)
  trustRow?: boolean;
  reviews?: PageReviewSpec;
  relatedLinks?: PageRelatedLinks;
  cityCards?: PageCityCards;
  priceTeaser?: PagePriceTeaser;
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
