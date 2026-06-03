// Round-3 owner-review corrections. Each affected page is rebuilt from an
// explicit final image list (feature + ordered inline array). Images are
// resolved from public/images/migrated (already there) or copied from the
// Downloads source folders; door images are re-stitched into landscape composites.
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

const meta = {}; // file -> {w,h,alt}
function register(file, w, h, alt) { dims[`/images/migrated/${file}`] = { w, h }; meta[file] = { w, h, alt: alt || altFor(file) }; }

// resolve a plain filename: ensure it's in MIG (copy from a SRC folder if needed), record dims+alt
async function resolve(file, altOverride) {
  let to = path.join(MIG, file);
  if (!fs.existsSync(to)) {
    let from = null;
    for (const f of SRC_FOLDERS) { const p = path.join(SRC, f, file); if (fs.existsSync(p)) { from = p; break; } }
    if (!from) throw new Error(`cannot find source for ${file}`);
    fs.copyFileSync(from, to);
  }
  const m = await sharp(to).metadata();
  register(file, m.width, m.height, altOverride);
  return file;
}

// stitch two portrait photos side-by-side on white -> landscape webp
async function composite2(folder, leftFile, rightFile, outName, alt, labels) {
  const CELL_W = 600, CELL_H = 780, GAP = 16, PAD = 16;
  const W = CELL_W * 2 + GAP + PAD * 2, H = CELL_H + PAD * 2;
  const left = await sharp(path.join(SRC, folder, leftFile)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer();
  const right = await sharp(path.join(SRC, folder, rightFile)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer();
  const comps = [{ input: left, top: PAD, left: PAD }, { input: right, top: PAD, left: PAD + CELL_W + GAP }];
  if (labels) {
    const badge = (t) => Buffer.from(`<svg width="170" height="44"><rect width="170" height="44" rx="6" fill="#1a2e44" opacity="0.9"/><text x="85" y="30" font-size="23" font-family="Arial" fill="white" font-weight="bold" text-anchor="middle">${t}</text></svg>`);
    comps.push({ input: badge(labels[0]), top: PAD + 14, left: PAD + 14 });
    comps.push({ input: badge(labels[1]), top: PAD + 14, left: PAD + CELL_W + GAP + 14 });
  }
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).webp({ quality: 82 }).toFile(path.join(MIG, outName));
  register(outName, W, H, alt);
  return outName;
}

// single portrait door centered on a white landscape canvas (no crop)
async function composite1(folder, file, outName, alt) {
  const W = 1248, H = 812, DOOR_H = 760;
  const door = await sharp(path.join(SRC, folder, file)).resize({ height: DOOR_H }).toBuffer();
  const dm = await sharp(door).metadata();
  const left = Math.round((W - dm.width) / 2), top = Math.round((H - dm.height) / 2);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite([{ input: door, top, left }]).webp({ quality: 84 }).toFile(path.join(MIG, outName));
  register(outName, W, H, alt);
  return outName;
}

// door composites
const dFeat = await composite2("door-refinishing",
  "front-door-refinishing-before-rosenberg-tx-jpg.webp", "stained-wood-double-front-door-missouri-city-tx.webp",
  "door-refinishing-before-after-stained-doors.webp",
  "Front door refinishing before and after — bare, worn wood restored to a rich stained double-door finish by The Proud Paintbrush",
  ["BEFORE", "AFTER"]);
const dWalnut = await composite1("door-refinishing", "after-double-door-refinish-dark-walnut-katy-tx.webp",
  "door-refinishing-dark-walnut-double-doors-katy.webp",
  "Refinished dark walnut double front doors in Katy, TX by The Proud Paintbrush");
await resolve("door-refinishing-mahogany-doors-katy-sugar-land.webp",
  "Refinished mahogany front doors in Katy and Sugar Land, TX by The Proud Paintbrush"); // existing composite

// final per-page image lists: feature + ordered inline[]
const PAGES = [
  { parent: "exterior", slug: "brick-painting", feature: "two-story-exterior-house-painting-sugar-land-0cd199.webp",
    inline: ["gray-brick-exterior-repaint-west-houston-tx.webp", "gray-brick-exterior-repaint-southwest-houston-tx.webp"] },
  { parent: "exterior", slug: "door-refinishing", feature: dFeat, inline: ["door-refinishing-mahogany-doors-katy-sugar-land.webp", dWalnut] },
  { parent: "exterior", slug: "fence-staining", feature: "fence-staining-sugar-land-the-proud-paintbrush-3.webp",
    inline: ["stained-wood-privacy-fence-west-houston-tx.webp", "staining-dark-wood-privacy-fence-sugar-land-tx.webp"] },
  { parent: "exterior", slug: "fiber-cement-siding-painting", feature: "white-modern-farmhouse-exterior-missouri-city-tx.webp",
    inline: ["white-modern-farmhouse-exterior-sugar-land-tx.webp", "white-siding-exterior-repaint-fulshear-tx.webp"] },
  { parent: "interior", slug: "bathroom-painting", feature: "cabinet-painting-sugar-land-the-proud-paintbrush-bathroom-vanity-dark-navy.webp",
    inline: ["freshly-painted-off-white-bathroom-west-houston-tx-interior-painter.webp", "sugar-land-tx-freshly-painted-bathroom-interior.webp"] },
  { parent: "interior", slug: "brick-painting", feature: "limewash-fireplace-final-sugar-land-tx-1.webp",
    inline: ["white-brick-fireplace-repaint-sugar-land-tx.webp"] }, // removed 3rd photo
  { parent: "interior", slug: "ceiling-painting", feature: "interior-painting-missouri-city-crown-molding.webp",
    inline: ["cream-ceiling-crown-molding-paint-sugar-land-tx.webp", "gray-vaulted-ceiling-painting-katy-tx.webp"] },
  { parent: "interior", slug: "drywall-repair", feature: "custom-drywall-entertainment-center-sugar-land-angle-1.webp",
    inline: ["richmond-drywall-repair-bathroom-painting-jpg.webp", "sugar-land-tx-drywall-repair-texture-finishing.webp"] },
  { parent: "interior", slug: "hallway-and-staircase-painting", feature: "interior-staircase-painting-sugar-land-portfolio.webp",
    inline: ["two-story-staircase-wall-repaint-rosenberg-tx.webp", "two-story-foyer-repaint-richmond-tx.webp"] },
  { parent: "interior", slug: "millwork-painting", feature: "fireplace-mantle-painting-sugar-land-portfolio.webp",
    inline: ["interior-crown-molding-painting-southwest-houston.webp", "hallway-mudroom-trim-paint-sugar-land-tx.webp"] },
  { parent: "interior", slug: "nursery-painting", feature: "nursery-green-accent-wall-painting-sugar-land.webp",
    inline: ["interior-painting-sugar-land-nursery-1.webp", "sugar-land-tx-bedroom-painting.webp"] },
  { parent: "interior", slug: "wall-painting", feature: "interior-painting-katy-tx.webp",
    inline: ["high-ceiling-window-wall-painting-west-houston-tx.webp", "gray-living-room-repaint-southwest-houston-tx.webp"] },
];

// resolve every referenced image (composites already registered)
for (const p of PAGES) {
  for (const f of [p.feature, ...p.inline]) if (!meta[f]) await resolve(f);
}
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
  console.log(`✓ ${p.parent}/${p.slug}: feature=${p.feature.slice(0, 40)} | ${p.inline.length} inline`);
}
console.log("\nRound-3 corrections applied.");
