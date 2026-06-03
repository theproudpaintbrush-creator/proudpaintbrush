// Reflow images on the 8 /service-areas/<city> pages:
//  - drop the shared "prep work" lead photo that topped every page
//  - apply per-city photo swaps (better finished shots)
//  - re-insert the remaining photos EVENLY between body sections instead of
//    clustering them at the top and bottom
//
// Run from project root:  node migration/redistribute-service-area-images.mjs
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "pages", "service-areas");
const dims = JSON.parse(fs.readFileSync(path.join(process.cwd(), "migration", "image-dims.json"), "utf-8"));

function imgTag(src, alt) {
  const d = dims[src];
  if (!d) throw new Error(`no dims for ${src}`);
  return `<img src="${src}" alt="${alt}" width="${d.w}" height="${d.h}" loading="lazy">`;
}
const M = (name) => `/images/migrated/${name}`;

// Per-city: which kept images to swap (by 0-based index AFTER the lead photo is
// dropped) → replacement {name, alt}. Indices that aren't listed are kept as-is.
const SWAPS = {
  richmond: {
    // remaining order after lead drop: 0 roofline, 1 side-view, 2 front-elevation,
    // 3 cabinet-prep-masking, 4 drywall-repair  → replace the weak last two
    3: { name: "interior-painting-richmond-open-concept-living.webp", alt: "Open-concept living room interior painting in a Richmond, TX home" },
    4: { name: "kitchen-cabinet-painting-richmond-texas.webp", alt: "Freshly painted kitchen cabinets in a Richmond, TX home" },
  },
  fulshear: {
    // remaining: 0 home-gym, 1 bedroom, 2 stucco-stone-exterior(-jpg), 3 backyard-exterior
    2: { name: "stucco-stone-limewash-exterior-fulshear-tx.webp", alt: "Limewashed stucco-and-stone home exterior in Fulshear, TX by The Proud Paintbrush" },
  },
  rosenberg: {
    // replace all four (were before/repair shots) with finished rooms
    0: { name: "rosenberg-tx-luxury-neutral-living-room-painting.webp", alt: "Neutral luxury living room repaint in a Rosenberg, TX home" },
    1: { name: "warm-off-white-kitchen-cabinets-rosenberg-tx.webp", alt: "Warm off-white kitchen cabinet painting in a Rosenberg, TX home" },
    2: { name: "master-bedroom-ceiling-walls-trim-crown-rosenberg-tx.webp", alt: "Master bedroom walls, ceiling, trim, and crown molding painted in a Rosenberg, TX home" },
    3: { name: "color-drenched-living-room-walls-ceiling-trim-rosenberg-tx.webp", alt: "Color-drenched living room with painted walls, ceiling, and trim in Rosenberg, TX" },
  },
};

const CITIES = ["sugar-land", "missouri-city", "katy", "richmond", "rosenberg", "fulshear", "west-houston", "southwest-houston"];

for (const slug of CITIES) {
  const file = path.join(dir, `${slug}.json`);
  const page = JSON.parse(fs.readFileSync(file, "utf-8"));
  let body = page.bodyHtml;

  // 1. pull out every <img> tag (in order), then strip them all from the body
  const imgTags = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  body = body.replace(/<img\b[^>]*>/g, "");
  // collapse any now-empty wrappers / doubled whitespace
  body = body.replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();

  // 2. drop the shared lead "prep work" photo (always index 0)
  let kept = imgTags.slice(1);

  // 3. apply swaps
  const swaps = SWAPS[slug] || {};
  kept = kept.map((tag, i) => (swaps[i] ? imgTag(M(swaps[i].name), swaps[i].alt) : tag));

  // 4. split body into sections at each <h2>; segment 0 is the title+intro
  const segments = body.split(/(?=<h2)/);
  // candidate insert points = before segments 1..n-1 (never before the title,
  // so we don't recreate a "top photo")
  const points = [];
  for (let i = 1; i < segments.length; i++) points.push(i);

  // 5. choose evenly-spaced points, one per kept image
  const k = kept.length;
  const chosen = [];
  for (let j = 0; j < k; j++) {
    const idx = Math.round(((j + 0.5) * points.length) / k);
    chosen.push(points[Math.min(idx, points.length - 1)]);
  }
  // de-dup collisions by nudging forward
  for (let j = 1; j < chosen.length; j++) {
    if (chosen[j] <= chosen[j - 1]) chosen[j] = Math.min(chosen[j - 1] + 1, points[points.length - 1]);
  }

  // 6. prepend the matching image to the start of each chosen segment
  chosen.forEach((segIdx, j) => {
    segments[segIdx] = kept[j] + segments[segIdx];
  });

  page.bodyHtml = segments.join("");
  fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${slug}: dropped lead, ${k} imgs across ${points.length} sections at segs [${chosen.join(", ")}]`);
}
console.log("\nDone.");
