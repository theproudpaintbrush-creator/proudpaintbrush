// Real customer video testimonials (YouTube IDs scraped from the live site).
// Shared by the /testimonials page (full grid) and the sitewide
// VideoTestimonialStrip that appears at the bottom of every other page.
// Named customers are labeled where the name is known.

export type TestimonialVideo = {
  youtubeId: string;
  customerNeighborhood?: string;
};

export const TESTIMONIAL_VIDEOS: TestimonialVideo[] = [
  { youtubeId: "N9c6vXqTht4", customerNeighborhood: "Cabinet Painting" },
  { youtubeId: "4K_j8zfo2zQ", customerNeighborhood: "The Olsons" },
  { youtubeId: "gxB9xw9m34U", customerNeighborhood: "The Lopezs" },
  { youtubeId: "LNmUGCgmTS0", customerNeighborhood: "Avan" },
  { youtubeId: "sbTOOc-S7nE", customerNeighborhood: "Edwin" },
  { youtubeId: "W96cOO6v1LA", customerNeighborhood: "Mei" },
  { youtubeId: "zT_z3yxJcL0", customerNeighborhood: "Karmyn" },
  { youtubeId: "bzbgrgyHxow", customerNeighborhood: "Clemment" },
  { youtubeId: "E_GicxQ676A", customerNeighborhood: "Mrs. Phillips" },
  { youtubeId: "shzynACJsEw", customerNeighborhood: "Kerry" },
  { youtubeId: "3rIAxmF9ow0" },
  { youtubeId: "5rhZR2sQC2g" },
  { youtubeId: "AnJpFabDhOw" },
  { youtubeId: "gY1VnnU308o" },
  { youtubeId: "jF9-nlPZAYE" },
  { youtubeId: "SItjnyqD0o8" },
  { youtubeId: "tLfUJtXRwss" },
  { youtubeId: "XHhGMUESFL8" },
  { youtubeId: "yrbeE2EwCcA" },
  { youtubeId: "6P4_4GHaYP8" },
  { youtubeId: "a20JwINRrNc" },
  { youtubeId: "B3mAxVXwDoM" },
  { youtubeId: "-bnDu_8HApE" },
  { youtubeId: "dzUzGhht6F8" },
  { youtubeId: "gN2iVF5ig_8" },
  { youtubeId: "gzCLxCBP1o0" },
  { youtubeId: "JqY3L7IJOOY" },
  { youtubeId: "xHFK54C4mc0" },
  { youtubeId: "Z208PaNZY4U" },
];

// Curated 3-up subset for the sitewide strip on non-service pages (home, blog,
// about, etc.) — all named customers, mixed project types for broad proof.
export const STRIP_VIDEOS: TestimonialVideo[] = [
  { youtubeId: "LNmUGCgmTS0", customerNeighborhood: "Avan · Exterior" },
  { youtubeId: "shzynACJsEw", customerNeighborhood: "Kerry · Interior" },
  { youtubeId: "N9c6vXqTht4", customerNeighborhood: "Cabinet Painting" },
];

// Service-matched video sets for the strip on each service hub / city page.
// Project type sourced from the scraped Squarespace testimonials page
// (scrape/content/testimonials.md), the authoritative record of what each
// customer's job actually was — NOT the looser placement in cities.ts.
export const SERVICE_STRIP_VIDEOS: Record<"interior" | "exterior" | "cabinet", TestimonialVideo[]> = {
  interior: [
    { youtubeId: "zT_z3yxJcL0", customerNeighborhood: "Karmyn · Interior Repaint" },
    { youtubeId: "shzynACJsEw", customerNeighborhood: "Kerry · Full Interior" },
    { youtubeId: "4K_j8zfo2zQ", customerNeighborhood: "The Olsons · Interior" },
  ],
  exterior: [
    { youtubeId: "LNmUGCgmTS0", customerNeighborhood: "Avan · Exterior" },
    { youtubeId: "E_GicxQ676A", customerNeighborhood: "Mrs. Phillips · Limewash" },
    { youtubeId: "3rIAxmF9ow0", customerNeighborhood: "Exterior Painting" },
  ],
  cabinet: [
    { youtubeId: "N9c6vXqTht4", customerNeighborhood: "Cabinet Painting" },
    { youtubeId: "bzbgrgyHxow", customerNeighborhood: "Clement · Cabinets" },
  ],
};
