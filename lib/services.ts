import fs from "node:fs";
import path from "node:path";

export type ServiceFaq = { q: string; a: string };
export type ServiceParent = "interior" | "exterior" | "cabinet";

export type ServiceContent = {
  slug: string;
  parent: ServiceParent;
  name: string;
  title: string;
  metaDescription: string;
  h1: string;
  ogImage: string;
  sourceUrl: string;
  bodyHtml: string;
  faqs: ServiceFaq[];
  wordCount: number;
};

const servicesDir = path.join(process.cwd(), "content", "services");

export function getServiceSlugs(parent: ServiceParent): string[] {
  const dir = path.join(servicesDir, parent);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".json")).map((f) => f.replace(/\.json$/, ""));
}

export function getService(parent: ServiceParent, slug: string): ServiceContent | null {
  const file = path.join(servicesDir, parent, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as ServiceContent;
}

export function getServicesByParent(parent: ServiceParent): ServiceContent[] {
  return getServiceSlugs(parent)
    .map((slug) => getService(parent, slug))
    .filter((s): s is ServiceContent => s !== null)
    .sort((a, b) => a.name.localeCompare(b.name));
}

export type HubContent = {
  parent: ServiceParent;
  title: string;
  metaDescription: string;
  h1: string;
  heroImage: string;
  heroAlt: string;
  intro: string[];
  servicesHeading: string;
  servicesIntro: string;
  whyHeading: string;
  whyCards: { title: string; desc: string }[];
  processHeading: string;
  process: { title: string; desc: string }[];
  faqs: ServiceFaq[];
  relatedLinks?: { href: string; label: string }[];
  galleryHeading?: string;
  galleryIntro?: string;
  gallery?: { src: string; alt: string; caption?: string }[];
  priceTeaser?: { heading: string; range: string; note: string; href: string; linkLabel: string };
  // Optional extra prose section rendered after the intro (used by the cabinet
  // hub to expand thin content with spray-vs-brush / repaint-vs-replace copy).
  sections?: { heading: string; body: string[] }[];
};

export function getHub(parent: ServiceParent): HubContent | null {
  const file = path.join(process.cwd(), "content", "hubs", `${parent}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8")) as HubContent;
}
