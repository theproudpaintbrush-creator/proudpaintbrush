import { getReviews, type Review } from "@/lib/reviews";

// Shared editorial city -> review-author mapping. Originally built for the
// cabinet-city pages (content/cabinet-cities); reused as-is for the exterior
// and interior city templates so all three service types show the same
// customer per city instead of three different, unrelated review sets.
// Catherine Harter (cabinet) leads every city; the other two rotate.
export const CITY_REVIEW_AUTHORS: Record<string, string[]> = {
  "fulshear": ["Catherine Harter", "Jeff Deurlein", "Morgan Fritchie"],
  "katy": ["Catherine Harter", "Joshua D. Randall", "Dr. Jamie Russell Sr."],
  "missouri-city": ["Catherine Harter", "Jeff Deurlein", "Joshua D. Randall"],
  "richmond": ["Catherine Harter", "Morgan Fritchie", "Dr. Jamie Russell Sr."],
  "rosenberg": ["Catherine Harter", "Jeff Deurlein", "Dr. Jamie Russell Sr."],
  "southwest-houston": ["Catherine Harter", "Morgan Fritchie", "Joshua D. Randall"],
  "sugar-land": ["Catherine Harter", "Jeff Deurlein", "Morgan Fritchie"],
  "west-houston": ["Catherine Harter", "Joshua D. Randall", "Dr. Jamie Russell Sr."],
};

export function getReviewsForCity(slug: string): Review[] {
  const all = getReviews();
  return (CITY_REVIEW_AUTHORS[slug] ?? [])
    .map((author) => all.find((r) => r.author === author))
    .filter((r): r is Review => Boolean(r));
}
