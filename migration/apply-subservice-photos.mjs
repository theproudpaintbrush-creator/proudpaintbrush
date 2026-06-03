// Curate photos onto the 29 interior/exterior SUB-SERVICE pages.
// Picks were made by VIEWING contact sheets (migration/build-service-sheets.mjs),
// not filename-guessing. For each page:
//   - copy chosen source files into public/images/migrated (+ record dims)
//   - swap the feature image (ogImage) where flagged
//   - inject 2 inline <img> evenly between the body's <h2> sections
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const MIG = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");
const dims = JSON.parse(fs.readFileSync(dimsFile, "utf-8"));

const CITY_NAMES = {
  "southwest-houston": "Southwest Houston", "west-houston": "West Houston", "sugar-land": "Sugar Land",
  "missouri-city": "Missouri City", "katy": "Katy", "richmond": "Richmond", "rosenberg": "Rosenberg",
  "fulshear": "Fulshear", "sugarland": "Sugar Land",
};
function altFor(file) {
  let s = file.replace(/\.(webp|jpe?g|png)$/i, "").replace(/-(jpg|og-1200x630|1200x630)\b/gi, "");
  let city = "";
  for (const [slug, name] of Object.entries(CITY_NAMES)) {
    if (s.includes(slug)) { city = name; s = s.replace(new RegExp(`-?${slug}(-tx)?`), ""); break; }
  }
  s = s.replace(/-tx\b/g, "").replace(/\bthe proud paintbrush\b/i, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
  s = s.replace(/\b\w/g, (c) => c.toUpperCase());
  return `${s}${city ? ` in ${city}, TX` : ""} by The Proud Paintbrush`;
}

// parent/slug → optional feature swap [folder,file] + 2 inline [folder,file]
const PICKS = [
  // ---------- EXTERIOR (12) ----------
  { parent: "exterior", slug: "brick-painting", inline: [["exterior", "brick-exterior-house-repaint-sugar-land-tx.webp"], ["exterior", "black-and-white-painted-brick-house-missouri-city-tx.webp"]] },
  { parent: "exterior", slug: "deck-painting-and-staining", inline: [["exterior", "stained-wood-deck-patio-cover-southwest-houston-tx.webp"], ["exterior", "yellow-home-exterior-deck-repaint-katy-tx.jpg"]] },
  { parent: "exterior", slug: "door-refinishing", inline: [["door-refinishing", "mahogany-front-door-refinishing-katy-tx.webp"], ["door-refinishing", "red-mahogany-front-door-staining-sugar-land-tx.webp"]] },
  { parent: "exterior", slug: "fence-staining", inline: [["fences", "stained-cedar-privacy-fence-missouri-city-tx.webp"], ["fences", "staining-dark-wood-privacy-fence-sugar-land-tx.webp"]] },
  { parent: "exterior", slug: "fiber-cement-siding-painting", inline: [["exterior", "green-wood-siding-exterior-sugar-land-tx.webp"], ["exterior", "white-siding-exterior-repaint-fulshear-tx.webp"]] },
  { parent: "exterior", slug: "garage-door-painting", inline: [["exterior", "modern-garage-door-painting-sugar-land-tx-the-proud-paintbrush.webp"], ["exterior", "cream-garage-door-exterior-repaint-sugar-land-tx.webp"]] },
  { parent: "exterior", slug: "pressure-washing", inline: [["exterior", "brick-exterior-house-painting-front-sugar-land.webp"], ["exterior", "white-brick-home-exterior-repaint-katy-tx.webp"]] },
  { parent: "exterior", slug: "railings", feature: ["exterior", "white-porch-railing-brick-exterior-richmond-tx.webp"], inline: [["exterior", "white-balcony-railing-gold-stucco-ceiling-rosenberg-tx.webp"], ["interior", "living-room-stair-railing-repaint-fulshear-tx.jpg"]] },
  { parent: "exterior", slug: "stucco-maintenance", inline: [["exterior", "tan-stucco-exterior-repaint-sugar-land-tx.webp"], ["exterior", "white-stucco-home-exterior-repaint-richmond-tx.webp"]] },
  { parent: "exterior", slug: "stucco-painting", inline: [["exterior", "exterior-stucco-tower-painting-richmond-tx.webp"], ["exterior", "gray-stucco-exterior-repaint-southwest-houston-tx.webp"]] },
  { parent: "exterior", slug: "stucco-repairs", inline: [["exterior", "brown-stucco-stone-exterior-repaint-rosenberg-tx.webp"], ["exterior", "tan-stucco-stone-exterior-repaint-missouri-city-tx.webp"]] },
  { parent: "exterior", slug: "vinyl-siding-painting", inline: [["exterior", "white-brick-siding-exterior-repaint-west-houston-tx.jpg"], ["exterior", "yellow-exterior-siding-repaint-southwest-houston-tx.jpg"]] },

  // ---------- INTERIOR (17) ----------
  { parent: "interior", slug: "accent-wall-painting", feature: ["interior", "blue-gold-geometric-accent-wall-richmond-tx.webp"], inline: [["interior", "green-board-batten-accent-wall-katy-tx.jpg"], ["interior", "dark-gray-accent-wall-living-room-repaint-west-houston-tx.jpg"]] },
  { parent: "interior", slug: "bathroom-painting", inline: [["interior", "freshly-painted-off-white-bathroom-west-houston-tx-interior-painter.webp"], ["interior", "dark-blue-gray-bathroom-walls-missouri-city-tx.webp"]] },
  { parent: "interior", slug: "bedroom-painting", inline: [["interior", "master-bedroom-painted-walls-rosenberg-tx.webp"], ["interior", "bedroom-dark-gray-interior-painting-sugar-land.webp"]] },
  { parent: "interior", slug: "brick-painting", inline: [["interior", "white-brick-fireplace-repaint-sugar-land-tx.webp"], ["interior", "whitewashed-brick-fireplace-finished-katy-tx.webp"]] },
  { parent: "interior", slug: "ceiling-painting", inline: [["interior", "cream-ceiling-crown-molding-paint-sugar-land-tx.webp"], ["interior", "gray-vaulted-ceiling-painting-katy-tx.webp"]] },
  { parent: "interior", slug: "dining-room-painting", feature: ["interior", "cream-dining-room-vaulted-ceiling-repaint-richmond-tx.webp"], inline: [["interior", "olive-dining-room-crown-molding-repaint-west-houston-tx.jpg"], ["interior", "missouri-city-dining-room-traditional-elegant-1.webp"]] },
  { parent: "interior", slug: "drywall-repair", inline: [["drywall", "custom-drywall-entertainment-center-sugar-land-angle-2.webp"], ["drywall", "sugar-land-tx-drywall-repair-texture-finishing.webp"]] },
  { parent: "interior", slug: "finish-carpentry", inline: [["interior", "white-built-in-bookshelves-repaint-katy-tx.webp"], ["interior", "white-built-in-shelving-repaint-sugar-land-tx.webp"]] },
  { parent: "interior", slug: "hallway-and-staircase-painting", inline: [["interior", "two-story-staircase-wall-repaint-rosenberg-tx.webp"], ["interior", "curved-staircase-foyer-repaint-southwest-houston-tx.webp"]] },
  { parent: "interior", slug: "kids-room-painting", inline: [["interior", "unicorn-mural-kids-bedroom-richmond-tx.webp"], ["interior", "kids-pink-purple-accent-wall-fulshear-tx.webp"]] },
  { parent: "interior", slug: "kitchen-painting", inline: [["interior", "sugar-land-modern-kitchen-walls-painting.webp"], ["interior", "great-room-kitchen-neutral-walls-richmond-tx.webp"]] },
  { parent: "interior", slug: "living-room-painting", inline: [["interior", "fulshear-tx-modern-living-room-interior-painting.webp"], ["interior", "gray-two-story-living-room-repaint-richmond-tx.webp"]] },
  { parent: "interior", slug: "millwork-painting", inline: [["interior", "interior-crown-molding-painting-southwest-houston.webp"], ["interior", "white-fireplace-mantel-spray-painting-west-houston-tx.webp"]] },
  { parent: "interior", slug: "nursery-painting", inline: [["interior", "interior-painting-sugar-land-nursery-1.webp"], ["interior", "bedroom-neutral-painted-walls-katy-tx.webp"]] },
  { parent: "interior", slug: "office-painting", inline: [["interior", "beige-home-office-repaint-katy-tx.webp"], ["interior", "green-home-office-interior-repaint-katy-tx.jpg"]] },
  { parent: "interior", slug: "staining-lacquering-sealing", inline: [["cabinets", "finish-carpentry-cedar-closet-shelving-stained-sugar-land.webp"], ["door-refinishing", "stained-wood-double-front-door-missouri-city-tx.webp"]] },
  { parent: "interior", slug: "wall-painting", feature: ["interior", "gray-walls-trim-painting-richmond-tx.webp"], inline: [["interior", "high-ceiling-window-wall-painting-west-houston-tx.webp"], ["interior", "gray-living-room-repaint-southwest-houston-tx.webp"]] },
];

// 1. copy + measure every source file referenced (feature + inline)
const meta = {}; // file -> {w,h,alt}
async function ensure(folder, file) {
  const from = path.join(SRC, folder, file);
  const to = path.join(MIG, file);
  if (!fs.existsSync(from)) throw new Error(`missing source: ${from}`);
  if (!fs.existsSync(to)) fs.copyFileSync(from, to);
  if (!meta[file]) {
    const m = await sharp(to).metadata();
    const rec = { w: m.width, h: m.height };
    dims[`/images/migrated/${file}`] = rec;
    meta[file] = { ...rec, alt: altFor(file) };
  }
}
for (const p of PICKS) {
  if (p.feature) await ensure(...p.feature);
  for (const pick of p.inline) await ensure(...pick);
}
fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => {
  const m = meta[file];
  return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`;
};

// 2. apply to each page json
let n = 0;
for (const p of PICKS) {
  const f = path.join(process.cwd(), "content", "services", p.parent, `${p.slug}.json`);
  const page = JSON.parse(fs.readFileSync(f, "utf-8"));

  if (p.feature) page.ogImage = `/images/migrated/${p.feature[1]}`;

  // strip any pre-existing inline imgs, then inject 2 evenly between <h2> blocks
  let body = page.bodyHtml.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = body.split(/(?=<h2)/);
  const points = [];
  for (let i = 1; i < segs.length; i++) points.push(i);
  const imgs = p.inline.map(([, file]) => tag(file));
  // place ~1/3 and ~2/3 through the h2 sections
  const chosen = imgs.map((_, j) => points[Math.min(Math.round(((j + 0.5) * points.length) / imgs.length), points.length - 1)]);
  for (let j = 1; j < chosen.length; j++) if (chosen[j] <= chosen[j - 1]) chosen[j] = Math.min(chosen[j - 1] + 1, points[points.length - 1]);
  chosen.forEach((segIdx, j) => { segs[segIdx] = imgs[j] + segs[segIdx]; });
  page.bodyHtml = segs.join("");

  fs.writeFileSync(f, JSON.stringify(page, null, 2) + "\n");
  n++;
  console.log(`✓ ${p.parent}/${p.slug}${p.feature ? " [feature swapped]" : ""}: 2 inline at segs [${chosen.join(", ")}]`);
}
console.log(`\nDone: ${n} pages updated.`);
