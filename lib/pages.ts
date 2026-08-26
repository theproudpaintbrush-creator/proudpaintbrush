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
// Opt-in rich blocks added for the "definitive city page" pattern (piloted on
// /service-areas/fulshear) — each renders only when present so existing plain
// content pages are unaffected.
export type PageServiceSectionItem = { heading: string; body: string; href?: string; linkLabel?: string };
export type PageServiceSections = { heading?: string; intro?: string; items: PageServiceSectionItem[] };
export type PageMechanismSection = { heading: string; body: string };
export type PageCostTableRow = { area: string; median: string; low?: string; high?: string; sample: string };
export type PageCostTable = { heading: string; intro?: string; rows: PageCostTableRow[]; note?: string };
export type PageNeighborhoodGrid = { heading?: string; intro?: string; neighborhoods: string[] };
export type PageBeforeAfterPlaceholder = { heading?: string; note: string };
// Optional Service structured-data block. When present, the route emits a
// schema.org/Service JSON-LD node (provider = the global business @id) with
// areaServed. Used by service-style pages like /commercial-painting so they
// rank as a service, not just a WebPage.
// NOTE: no aggregateRating here — Service is not a Google-supported
// review-snippet type (it triggers "Invalid object type for field
// '<parent_node>'"). The rating lives on the LocalBusiness node in layout.tsx.
export type PageServiceSchema = {
  name: string;
  serviceType?: string;
  areaServed?: string[];
};

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
  // Opt-in interactive calculator rendered after the body (currently only the
  // fence-staining cost page uses "fence").
  calculator?: "fence";
  serviceSchema?: PageServiceSchema;
  // Optional custom call-to-action that REPLACES the default estimate CTA at the
  // bottom of the page (e.g. a prominent "Apply" button on the careers page).
  cta?: { heading?: string; note?: string; label: string; href: string };
  // Dual CTA (book + call) rendered directly under the H1, above the fold —
  // matches the treatment on service-detail pages instead of only appearing
  // at the bottom of the page.
  heroCta?: boolean;
  // Per-service scope breakdown (e.g. interior/exterior/cabinets/fence on a
  // city hub page) so a single page can cover multiple services with real
  // detail instead of one generic blob.
  serviceSections?: PageServiceSections;
  // Single "why this is hard here" explainer (climate, mechanism, etc.).
  mechanismSection?: PageMechanismSection;
  // Scannable cost table, structured for AI Overview extraction.
  costTable?: PageCostTable;
  // Named neighborhood chips.
  neighborhoodGrid?: PageNeighborhoodGrid;
  // Clearly-marked placeholder for a future before/after slider.
  beforeAfterPlaceholder?: PageBeforeAfterPlaceholder;
  // Render `faqs` as a visible Q&A section (in addition to the FAQPage schema
  // the route already emits from the same array).
  showFaqs?: boolean;
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
