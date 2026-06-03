// Round-4 owner-review corrections.
//  - swap pages rebuilt from explicit feature+inline lists
//  - door-refinishing gets an interactive before/after SLIDER (beforeAfter field)
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
  let s = file.replace(/\.(webp|jpe?g|png)$/i, "").replace(/-(jpg|og-1200x630|1200x630|portfolio|1)\b/gi, "");
  let city = "";
  for (const [slug, name] of Object.entries(CITY_NAMES)) {
    if (s.includes(slug)) { city = name; s = s.replace(new RegExp(`-?${slug}(-tx)?`), ""); break; }
  }
  s = s.replace(/-tx\b/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return `${s}${city ? ` in ${city}, TX` : ""} by The Proud Paintbrush`;
}

const meta = {};
async function resolve(file, altOverride) {
  let to = path.join(MIG, file);
  if (!fs.existsSync(to)) {
    let from = null;
    for (const f of SRC_FOLDERS) { const p = path.join(SRC, f, file); if (fs.existsSync(p)) { from = p; break; } }
    if (!from) throw new Error(`cannot find source for ${file}`);
    fs.copyFileSync(from, to);
  }
  const m = await sharp(to).metadata();
  dims[`/images/migrated/${file}`] = { w: m.width, h: m.height };
  meta[file] = { w: m.width, h: m.height, alt: altOverride || altFor(file) };
  return file;
}

const PAGES = [
  { parent: "exterior", slug: "fiber-cement-siding-painting", feature: "brick-siding-two-story-exterior-west-houston-tx.webp",
    inline: ["white-modern-farmhouse-exterior-sugar-land-tx.webp", "white-siding-exterior-repaint-fulshear-tx.webp"] },
  { parent: "exterior", slug: "brick-painting", feature: "two-story-exterior-house-painting-sugar-land-0cd199.webp",
    inline: ["brick-exterior-house-painting-front-sugar-land.webp", "gray-brick-exterior-repaint-southwest-houston-tx.webp"] },
  { parent: "interior", slug: "bathroom-painting", feature: "cabinet-painting-sugar-land-the-proud-paintbrush-bathroom-vanity-dark-navy.webp",
    inline: ["sugar-land-bathroom-interior-paint-ceiling.webp", "dark-blue-gray-bathroom-walls-missouri-city-tx.webp"] },
  { parent: "exterior", slug: "fence-staining", feature: "fence-staining-sugar-land-the-proud-paintbrush-3.webp",
    inline: ["stained-wood-privacy-fence-west-houston-tx.webp", "stained-cedar-gate-fence-west-houston-tx.webp"] },
];

for (const p of PAGES) for (const f of [p.feature, ...p.inline]) if (!meta[f]) await resolve(f);

// door before/after slider images (kept full-size individual photos)
const baBefore = await resolve("front-door-refinishing-before-rosenberg-tx-jpg.webp",
  "Worn, unfinished wood front door before refinishing in Rosenberg, TX by The Proud Paintbrush");
const baAfter = await resolve("stained-wood-double-front-door-missouri-city-tx.webp",
  "Richly stained wood double front door after refinishing in Missouri City, TX by The Proud Paintbrush");

fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => { const m = meta[file]; return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`; };

for (const p of PAGES) {
  const f = path.join(process.cwd(), "content", "services", p.parent, `${p.slug}.json`);
  const page = JSON.parse(fs.readFileSync(f, "utf-8"));
  page.ogImage = `/images/migrated/${p.feature}`;
  let body = page.bodyHtml.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = body.split(/(?=<h2)/);
  const points = [];
  for (let i = 1; i < segs.length; i++) points.push(i);
  const imgs = p.inline.map(tag);
  const chosen = imgs.map((_, j) => points[Math.min(Math.round(((j + 0.5) * points.length) / imgs.length), points.length - 1)]);
  for (let j = 1; j < chosen.length; j++) if (chosen[j] <= chosen[j - 1]) chosen[j] = Math.min(chosen[j - 1] + 1, points[points.length - 1]);
  chosen.forEach((segIdx, j) => { segs[segIdx] = imgs[j] + segs[segIdx]; });
  page.bodyHtml = segs.join("");
  fs.writeFileSync(f, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${p.parent}/${p.slug}: feature + ${p.inline.length} inline`);
}

// door-refinishing: add the before/after slider (keeps existing inline + ogImage composite)
const doorFile = path.join(process.cwd(), "content", "services", "exterior", "door-refinishing.json");
const door = JSON.parse(fs.readFileSync(doorFile, "utf-8"));
door.beforeAfter = {
  before: { src: `/images/migrated/${baBefore}`, alt: meta[baBefore].alt },
  after: { src: `/images/migrated/${baAfter}`, alt: meta[baAfter].alt },
};
fs.writeFileSync(doorFile, JSON.stringify(door, null, 2) + "\n");
console.log("✓ exterior/door-refinishing: before/after slider added");
console.log("\nRound-4 corrections applied.");
