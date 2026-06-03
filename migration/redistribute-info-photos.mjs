// Reorder/swap/remove photos on checklist + prep/interior, then spread them
// evenly across the page (one image before evenly-spaced headings).
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const MIG = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");
const dims = JSON.parse(fs.readFileSync(dimsFile, "utf-8"));
const SRC_FOLDERS = ["exterior", "interior", "cabinets", "door-refinishing", "fences", "drywall"];

const CITY_NAMES = {
  "southwest-houston": "Southwest Houston", "west-houston": "West Houston", "sugar-land": "Sugar Land",
  "missouri-city": "Missouri City", "katy": "Katy", "richmond": "Richmond", "rosenberg": "Rosenberg", "fulshear": "Fulshear",
};
function altFor(file) {
  let s = file.replace(/\.(webp|jpe?g|png)$/i, "").replace(/-(jpg|og-1200x630|1200x630|portfolio|1|96dcab|3cd46f)\b/gi, "");
  let city = "";
  for (const [slug, name] of Object.entries(CITY_NAMES)) {
    if (s.includes(slug)) { city = name; s = s.replace(new RegExp(`-?${slug}(-tx)?`), ""); break; }
  }
  s = s.replace(/-tx\b/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return `${s}${city ? ` in ${city}, TX` : ""} by The Proud Paintbrush`;
}

const meta = {};
async function resolve(file) {
  let to = path.join(MIG, file);
  if (!fs.existsSync(to)) {
    let from = null;
    for (const f of SRC_FOLDERS) { const p = path.join(SRC, f, file); if (fs.existsSync(p)) { from = p; break; } }
    if (!from) throw new Error(`cannot find source for ${file}`);
    fs.copyFileSync(from, to);
  }
  const m = await sharp(to).metadata();
  dims[`/images/migrated/${file}`] = { w: m.width, h: m.height };
  meta[file] = { w: m.width, h: m.height, alt: altFor(file) };
  return file;
}

// final ordered image lists (last entry = last photo on the page)
const PAGES = {
  "checklist": [
    "brick-stone-home-garage-door-repaint-southwest-houston-tx.jpg",
    "missouri-city-tx-happy-homeowner-interior-painting-testimonial.webp",
    "fulshear-tx-modern-living-room-interior-painting.webp",
  ],
  "preparation-process/interior": [
    "sugar-land-tx-interior-painting-preparation-masking.webp",
    "interior-masked-ready-for-baseboard-stair-spraying-katy-tx.webp",
    "painter-rolling-ceiling-interior-missouri-city-tx-3cd46f.webp",
    "happy-homeowners-100-percent-satisfied-proud-paintbrush-west-houston-tx.webp",
  ],
};

for (const list of Object.values(PAGES)) for (const f of list) if (!meta[f]) await resolve(f);
fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => { const m = meta[file]; return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`; };

for (const [key, list] of Object.entries(PAGES)) {
  const file = path.join(process.cwd(), "content", "pages", `${key}.json`);
  const page = JSON.parse(fs.readFileSync(file, "utf-8"));
  let body = page.bodyHtml.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = body.split(/(?=<h2|<h3)/);
  const imgs = list.map(tag);
  const n = imgs.length;
  // insertion slots over [0 .. segs.length]; slot 0 = top (hero), slot segs.length = end.
  // span the full range so the first photo leads and the LAST photo ends the page.
  const slots = imgs.map((_, j) => (n === 1 ? Math.round(segs.length / 2) : Math.round((j * segs.length) / (n - 1))));
  for (let j = 1; j < slots.length; j++) if (slots[j] <= slots[j - 1]) slots[j] = Math.min(slots[j - 1] + 1, segs.length);
  let out = "";
  for (let i = 0; i <= segs.length; i++) {
    slots.forEach((s, j) => { if (s === i) out += imgs[j]; });
    if (i < segs.length) out += segs[i];
  }
  page.bodyHtml = out;
  fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${key}: ${imgs.length} photos spread at slots [${slots.join(", ")}] of ${segs.length}`);
}
console.log("\nInfo-photo redistribution done.");
