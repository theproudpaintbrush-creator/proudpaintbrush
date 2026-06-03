// One-shot optimizer for the 8 /service-areas/<city> content pages.
// - Fixes stale /painting-services/* internal links (they only 301-redirect today)
// - Fixes the youcabook.me booking typo and a stray /exterior-painting/exterior-painters link
// - Rewrites a handful of filename-style image alts
// - Strips the duplicate "customer sign" <ul> photo grid that trails every page
// - Injects: complete metaDescription, FAQs (mirroring the visible inline Q&A),
//   trustRow, a hand-picked real-review set, a pricing teaser, and funnel-down
//   relatedLinks to the rich /interior|exterior|cabinet-painting/<city> pages.
//
// Run from project root:  node migration/optimize-service-areas.mjs
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "pages", "service-areas");

const PRICE_NOTE = (city) =>
  `Most ${city} projects land in this range depending on home size, surfaces, and prep. Interior repaints, full exterior repaints, and cabinet refinishing are all quoted in writing after a free on-site walkthrough — no surprises, no pressure.`;

function relatedLinks(name, slug) {
  return {
    heading: `Explore Our ${name} Painting Services`,
    intro: `Looking for something specific? These pages go deeper on the work we do in ${name} — climate-specific prep, neighborhoods we know, and real finished-project photos.`,
    links: [
      {
        href: `/interior-painting/${slug}`,
        label: `Interior Painting in ${name}`,
        description: "Walls, ceilings, trim, doors, and cabinets — prepped and finished clean for Gulf Coast homes.",
      },
      {
        href: `/exterior-painting/${slug}`,
        label: `Exterior Painting in ${name}`,
        description: "HOA-ready color, Texas-grade surface prep, and coatings built for our heat and humidity.",
      },
      {
        href: `/cabinet-painting/${slug}`,
        label: `Cabinet Painting in ${name}`,
        description: "Factory-smooth sprayed cabinet finishes that update a kitchen without the cost of replacement.",
      },
      {
        href: "/portfolio",
        label: "See Our Finished Work",
        description: "Browse completed interior, exterior, and cabinet painting projects across Fort Bend County.",
      },
      {
        href: "/testimonials",
        label: "Read & Watch Reviews",
        description: "113 five-star reviews and unscripted video testimonials from local homeowners.",
      },
    ],
  };
}

function priceTeaser(name) {
  return {
    heading: `What House Painting Costs in ${name}`,
    range: "$2,500–$20,000+",
    note: PRICE_NOTE(name),
    href: "/pricing",
    linkLabel: "See Detailed Pricing",
  };
}

// Per-city bespoke data. faqs mirror the Q&A already visible in each body so the
// FAQPage schema reflects on-page content. reviewAuthors are all REAL reviews
// from content/reviews.json, varied per city so no two pages are identical.
const CITIES = {
  "sugar-land": {
    name: "Sugar Land",
    meta:
      "Trusted house painters in Sugar Land, TX. The Proud Paintbrush provides interior, exterior and cabinet painting plus drywall repair. 5.0★, free estimates.",
    reviewAuthors: ["Travis Phillips", "Derrick McCain", "Brooke Lebowitz"],
    faqs: [
      { q: "How often should homes in Sugar Land be repainted?", a: "Most interiors benefit from repainting every 5–7 years, depending on use. Exterior repaint cycles vary based on sun exposure and HOA requirements." },
      { q: "Is drywall repair usually needed before painting?", a: "Yes. Minor cracks, nail pops, and previous patching are common in Sugar Land homes and are best addressed before repainting." },
      { q: "Do you help with HOA requirements?", a: "We're familiar with HOA expectations throughout Sugar Land and help homeowners stay compliant during exterior projects." },
      { q: "Do you work in occupied homes?", a: "Yes. Our process is designed to minimize disruption and keep job sites orderly." },
    ],
  },
  "missouri-city": {
    name: "Missouri City",
    meta:
      "Reliable house painters in Missouri City, TX. Interior, exterior and cabinet painting plus drywall repair from a local Fort Bend crew. 5.0★, free estimates.",
    reviewAuthors: ["Satrice Morris", "Morgan Fritchie", "Joe B."],
    faqs: [
      { q: "Is repainting worth it in a busy family home?", a: "Yes. Fresh paint can dramatically improve how a home feels and functions, even when kids and pets are part of daily life." },
      { q: "Do you work while families are living in the home?", a: "Yes. Most of our Missouri City projects are completed in occupied homes, with a focus on safety and cleanliness." },
      { q: "Can projects be done in phases?", a: "Absolutely. Many families choose to tackle rooms over time, and we plan accordingly." },
    ],
  },
  "katy": {
    name: "Katy",
    meta:
      "Trusted Katy, TX house painters for interior, exterior and cabinet painting plus drywall repair. Cinco Ranch HOA and Hardie siding experts. 5.0★ rated.",
    reviewAuthors: ["Catherine Harter", "Jason Ceyanes", "Indy Chen"],
    faqs: [
      { q: "When should a newer home in Katy be repainted?", a: "Many homeowners repaint interiors within a few years to improve durability and appearance beyond builder-grade finishes." },
      { q: "Do you help with HOA requirements?", a: "Yes. We're familiar with HOA expectations throughout Katy and help homeowners plan projects that stay compliant." },
      { q: "Is cabinet painting a good option?", a: "In many Katy homes, cabinet painting is a cost-effective way to upgrade kitchens and bathrooms without full replacement." },
    ],
  },
  "richmond": {
    name: "Richmond",
    meta:
      "Local Richmond, TX house painters for interior, exterior and cabinet painting plus drywall repair. Dependable crews from Pecan Grove to Aliana. 5.0★ rated.",
    reviewAuthors: ["Kyle Phillips", "Joey D'Eramo", "Mary C."],
    faqs: [
      { q: "Do you focus more on exterior painting in Richmond?", a: "Exterior maintenance is a common need in Richmond, but we also handle interior projects depending on the home and timing." },
      { q: "Are you a local company?", a: "Yes. We work regularly in Richmond neighborhoods and focus on staying visible and accessible to our clients." },
      { q: "Can you help with ongoing maintenance painting?", a: "Absolutely. Many Richmond homeowners prefer a long-term maintenance approach rather than waiting for major repaint cycles." },
    ],
  },
  "rosenberg": {
    name: "Rosenberg",
    meta:
      "Rosenberg, TX house painters for interior, exterior and cabinet painting plus drywall repair. Older homes and new builds, honest pricing. 5.0★, free quotes.",
    reviewAuthors: ["Hassan Thomas", "Steve H.", "Lisa"],
    faqs: [
      { q: "Is repainting worth it for older homes?", a: "Yes. Proper prep and quality paint can significantly extend the life and appearance of older homes." },
      { q: "Do you handle both interior and exterior work?", a: "Yes. We regularly complete both interior and exterior painting projects in Rosenberg." },
      { q: "Can projects be done in phases?", a: "Absolutely. Many homeowners choose to complete projects over time, and we plan accordingly." },
    ],
  },
  "fulshear": {
    name: "Fulshear",
    meta:
      "Fulshear, TX house painters for interior, exterior and cabinet painting plus drywall repair. Trusted local crews for growing communities. 5.0★, free quotes.",
    reviewAuthors: ["Jeff Deurlein", "Megan Scott", "Joshua D. Randall"],
    faqs: [
      { q: "When should a newer home in Fulshear be repainted?", a: "Many homeowners repaint interiors within a few years to improve durability and appearance beyond builder-grade finishes." },
      { q: "Do you help with HOA requirements?", a: "Yes. We're familiar with HOA expectations throughout Fulshear and help homeowners plan projects that stay compliant." },
      { q: "Is cabinet painting a good option in newer homes?", a: "In many Fulshear homes, cabinet painting is a cost-effective way to upgrade finishes without full replacement." },
    ],
  },
  "west-houston": {
    name: "West Houston",
    meta:
      "West Houston house painters for interior, exterior and cabinet painting plus drywall repair. Memorial to Energy Corridor, dependable crews. 5.0★ rated.",
    reviewAuthors: ["Derrick McCain", "Mary C.", "Hassan Thomas"],
    faqs: [
      { q: "Do you work on larger or more complex homes?", a: "Yes. Many West Houston homes have multiple elevations, unique layouts, and detailed trim that require experience and planning." },
      { q: "Can you handle drywall repair as part of a repaint?", a: "Absolutely. We regularly include drywall repair in West Houston repaint projects." },
      { q: "Do you work while families are living in the home?", a: "Yes. Most of our projects are completed in occupied homes with careful protection and cleanup." },
    ],
  },
  "southwest-houston": {
    name: "Southwest Houston",
    meta:
      "Southwest Houston house painters for interior, exterior and cabinet painting plus drywall repair. Trusted with established homes. 5.0★, free estimates.",
    reviewAuthors: ["Dr. Jamie Russell Sr.", "Steve H.", "Joey D'Eramo"],
    faqs: [
      { q: "Do you work on older homes?", a: "Yes. Many of the homes we work on in Southwest Houston are older and require careful prep, repair, and planning." },
      { q: "Can you handle drywall repair and painting together?", a: "Absolutely. We regularly handle drywall repair as part of larger repaint projects." },
      { q: "Do you work while homeowners are living in the home?", a: "Yes. Most of our Southwest Houston projects are completed in occupied homes, with a focus on cleanliness and safety." },
    ],
  },
};

// global link/typo fixes applied to every body
const LINK_FIXES = [
  ["/painting-services/interior-painting", "/interior-painting"],
  ["/painting-services/exterior-painting", "/exterior-painting"],
  ["/painting-services/cabinet-painting", "/cabinet-painting"],
  ["/exterior-painting/exterior-painters", "/exterior-painting"],
  ['"/painting-services"', '"/services"'],
  ["youcabook.me", "youcanbook.me"],
];

// filename-style alts → descriptive (only applied if present)
const ALT_FIXES = [
  ["Interior wall painting high ceilings katy TX jpg", "Interior wall painting with high ceilings in a Katy, TX home"],
  ["West houston exterior house painting garage view jpg", "Exterior house painting with garage view on a West Houston home"],
  ["Exterior house painting brick home southwest houston jpg", "Exterior brick home house painting in Southwest Houston"],
  ["Interior painting living room missouri city TX jpg", "Interior living room painting in a Missouri City, TX home"],
  ["Front door refinishing after rosenberg TX jpg", "Front door after refinishing in a Rosenberg, TX home"],
];

// The trailing duplicate "customer sign" grid starts here on every page.
const GRID_ANCHOR = '<ul><li><img src="/images/migrated/photo-2024-10-24-08-55-37.webp"';

let changed = 0;
for (const [slug, data] of Object.entries(CITIES)) {
  const file = path.join(dir, `${slug}.json`);
  const page = JSON.parse(fs.readFileSync(file, "utf-8"));
  let body = page.bodyHtml;

  for (const [from, to] of LINK_FIXES) body = body.split(from).join(to);
  for (const [from, to] of ALT_FIXES) body = body.split(from).join(to);

  const gridIdx = body.indexOf(GRID_ANCHOR);
  if (gridIdx !== -1) body = body.slice(0, gridIdx).trimEnd();

  page.bodyHtml = body;
  page.metaDescription = data.meta;
  page.faqs = data.faqs;
  page.trustRow = true;
  page.reviews = {
    heading: `What ${data.name} Homeowners Say`,
    intro: "Real, verified five-star reviews from Proud Paintbrush customers.",
    authors: data.reviewAuthors,
  };
  page.relatedLinks = relatedLinks(data.name, slug);
  page.priceTeaser = priceTeaser(data.name);

  fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${slug}  (meta ${data.meta.length} chars, ${data.faqs.length} faqs, grid ${gridIdx !== -1 ? "removed" : "absent"})`);
  changed++;
}
console.log(`\nDone: ${changed} city pages updated.`);
