// Round-5 owner-review corrections.
//  - door before/after: crop the AFTER tighter on the doors to match the BEFORE framing
//  - fence feature, bathroom 2&3, office middle, hallway bottom swaps
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

// 1. crop the AFTER door tighter on the doors (source 1600x2133, 3:4) to match BEFORE
const afterCrop = "door-refinishing-after-stained-double-cropped.webp";
await sharp(path.join(SRC, "door-refinishing", "stained-wood-double-front-door-missouri-city-tx.webp"))
  .extract({ left: 164, top: 115, width: 1200, height: 1600 })
  .webp({ quality: 86 })
  .toFile(path.join(MIG, afterCrop));
dims[`/images/migrated/${afterCrop}`] = { w: 1200, h: 1600 };
meta[afterCrop] = { w: 1200, h: 1600, alt: "Richly stained wood double front door after refinishing in Missouri City, TX by The Proud Paintbrush" };

// 2. page swaps (feature omitted = keep current ogImage)
const PAGES = [
  { parent: "exterior", slug: "fence-staining", feature: "katy-tx-fence-staining-project.webp",
    inline: ["stained-wood-privacy-fence-west-houston-tx.webp", "stained-cedar-gate-fence-west-houston-tx.webp"] },
  { parent: "interior", slug: "bathroom-painting",
    inline: ["gray-bathroom-vanity-wood-accent-wall-southwest-houston-tx.webp", "interior-painting-fulshear-powder-room.webp"] },
  { parent: "interior", slug: "office-painting",
    inline: ["west-houston-interior-office-painting-jpg.webp", "green-home-office-interior-repaint-katy-tx.jpg"] },
  { parent: "interior", slug: "hallway-and-staircase-painting",
    inline: ["two-story-staircase-wall-repaint-rosenberg-tx.webp", "interior-hallway-repaint-west-houston-tx.webp"] },
];

for (const p of PAGES) {
  if (p.feature) await resolve(p.feature);
  for (const f of p.inline) if (!meta[f]) await resolve(f);
}
fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => { const m = meta[file]; return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`; };

for (const p of PAGES) {
  const f = path.join(process.cwd(), "content", "services", p.parent, `${p.slug}.json`);
  const page = JSON.parse(fs.readFileSync(f, "utf-8"));
  if (p.feature) page.ogImage = `/images/migrated/${p.feature}`;
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
  console.log(`✓ ${p.parent}/${p.slug}${p.feature ? " [feature swapped]" : ""}`);
}

// 3. update door before/after slider to use the cropped after
const doorFile = path.join(process.cwd(), "content", "services", "exterior", "door-refinishing.json");
const door = JSON.parse(fs.readFileSync(doorFile, "utf-8"));
door.beforeAfter.after = { src: `/images/migrated/${afterCrop}`, alt: meta[afterCrop].alt };
fs.writeFileSync(doorFile, JSON.stringify(door, null, 2) + "\n");
console.log("✓ door-refinishing: after photo cropped/zoomed to match before");
console.log("\nRound-5 corrections applied.");
