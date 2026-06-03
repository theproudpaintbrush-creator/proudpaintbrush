import fs from "node:fs";
import path from "node:path";
import type { ServiceParent } from "@/lib/services";

const BASE_URL = "https://www.theproudpaintbrush.com";
const BUSINESS_ID = `${BASE_URL}/#business`;

export type Review = {
  author: string;
  rating: number; // 1-5
  text: string;
  // optional metadata used for filtering + display
  service?: ServiceParent | string;
  city?: string;
  neighborhood?: string;
  date?: string; // ISO yyyy-mm-dd if known
};

// IMPORTANT: only real, attributable customer reviews belong in reviews.json.
// Fabricated reviews in Review schema are a Google policy violation.
export function getReviews(): Review[] {
  const file = path.join(process.cwd(), "content", "reviews.json");
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as Review[];
  } catch {
    return [];
  }
}

// Reviews relevant to a given service hub: service-specific first, then topped
// up with general (untagged) company-wide reviews so the section is never thin.
export function getReviewsForService(parent: ServiceParent, limit = 2): Review[] {
  const all = getReviews();
  const matched = all.filter((r) => r.service === parent);
  if (matched.length >= limit) return matched.slice(0, limit);
  // Top up with the shortest general reviews so a 2-column hub layout stays
  // balanced (no wall-of-text card next to a two-line one).
  const general = all
    .filter((r) => !r.service)
    .sort((a, b) => a.text.length - b.text.length);
  return [...matched, ...general].slice(0, limit);
}

// Reviews selected for a generic content page (e.g. the service-areas pages),
// driven by the optional `reviews` spec in the page JSON. Lets each city page
// show a hand-picked, varied set of real reviews (by author) so no two pages
// render an identical block, while still falling back to service/limit logic.
export function getReviewsForPage(spec?: {
  authors?: string[];
  service?: ServiceParent | string;
  limit?: number;
}): Review[] {
  if (!spec) return [];
  const all = getReviews();
  if (spec.authors?.length) {
    return spec.authors
      .map((name) => all.find((r) => r.author === name))
      .filter((r): r is Review => Boolean(r));
  }
  if (spec.service) return getReviewsForService(spec.service as ServiceParent, spec.limit ?? 3);
  return all.slice(0, spec.limit ?? 3);
}

// JSON-LD Review[] objects attached to the LocalBusiness node by @id.
export function buildReviewSchema(reviews: Review[]) {
  return reviews.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: { "@id": BUSINESS_ID },
    author: { "@type": "Person", name: r.author },
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5", worstRating: "1" },
    ...(r.date ? { datePublished: r.date } : {}),
    reviewBody: r.text,
  }));
}
