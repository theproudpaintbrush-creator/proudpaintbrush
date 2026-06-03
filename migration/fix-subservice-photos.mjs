// Owner-review corrections (round 2) for the sub-service page photos.
// - kitchen: replace a BEFORE shot with a finished kitchen
// - exterior brick: both inline were not-brick / had a ladder -> real painted brick
// - fiber-cement: middle photo was vinyl -> Hardie/fiber-cement
// - stucco-maintenance: feature + inline1 were the same house; inline2 had a sign -> 2 clean stucco homes
// - vinyl: both inline weren't vinyl -> the vinyl panel home owner identified + a matching vinyl home
// - door-refinishing: portrait photos rendered badly -> stitch into landscape composites incl. a real before/after
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const MIG = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");
const dims = JSON.parse(fs.readFileSync(dimsFile, "utf-8"));

const CITY_NAMES = {
  "southwest-houston": "Southwest Houston", "west-houston": "West Houston", "sugar-land": "Sugar Land",
  "missouri-city": "Missouri City", "katy": "Katy", "richmond": "Richmond", "rosenberg": "Rosenberg", "fulshear": "Fulshear",
};
function altFor(file) {
  let s = file.replace(/\.(webp|jpe?g|png)$/i, "").replace(/-(jpg|og-1200x630|1200x630|portfolio)\b/gi, "");
  let city = "";
  for (const [slug, name] of Object.entries(CITY_NAMES)) {
    if (s.includes(slug)) { city = name; s = s.replace(new RegExp(`-?${slug}(-tx)?`), ""); break; }
  }
  s = s.replace(/-tx\b/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return `${s}${city ? ` in ${city}, TX` : ""} by The Proud Paintbrush`;
}

const meta = {}; // file -> {w,h,alt}
async function ensureSrc(folder, file, altOverride) {
  const from = path.join(SRC, folder, file);
  const to = path.join(MIG, file);
  if (!fs.existsSync(from)) throw new Error(`missing source: ${from}`);
  if (!fs.existsSync(to)) fs.copyFileSync(from, to);
  const m = await sharp(to).metadata();
  dims[`/images/migrated/${file}`] = { w: m.width, h: m.height };
  meta[file] = { w: m.width, h: m.height, alt: altOverride || altFor(file) };
  return file;
}

// stitch two portrait photos side-by-side on white -> one landscape webp
async function composite2(folder, leftFile, rightFile, outName, alt, labels) {
  const CELL_W = 600, CELL_H = 780, GAP = 16, PAD = 16;
  const W = CELL_W * 2 + GAP + PAD * 2, H = CELL_H + PAD * 2;
  const left = await sharp(path.join(SRC, folder, leftFile)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer();
  const right = await sharp(path.join(SRC, folder, rightFile)).resize(CELL_W, CELL_H, { fit: "cover" }).toBuffer();
  const comps = [
    { input: left, top: PAD, left: PAD },
    { input: right, top: PAD, left: PAD + CELL_W + GAP },
  ];
  if (labels) {
    const badge = (txt) => Buffer.from(
      `<svg width="170" height="44"><rect width="170" height="44" rx="6" fill="#1a2e44" opacity="0.9"/><text x="85" y="30" font-size="23" font-family="Arial" fill="white" font-weight="bold" text-anchor="middle">${txt}</text></svg>`
    );
    comps.push({ input: badge(labels[0]), top: PAD + 14, left: PAD + 14 });
    comps.push({ input: badge(labels[1]), top: PAD + 14, left: PAD + CELL_W + GAP + 14 });
  }
  const out = path.join(MIG, outName);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).webp({ quality: 82 }).toFile(out);
  dims[`/images/migrated/${outName}`] = { w: W, h: H };
  meta[outName] = { w: W, h: H, alt };
  return outName;
}

// build door composites
const dFeat = await composite2(
  "door-refinishing", "front-door-refinishing-before-rosenberg-tx-jpg.webp", "after-double-door-refinish-dark-walnut-katy-tx.webp",
  "door-refinishing-before-after-the-proud-paintbrush.webp",
  "Front door refinishing before and after — bare, worn wood restored to a rich stained finish by The Proud Paintbrush",
  ["BEFORE", "AFTER"]
);
const dGal1 = await composite2(
  "door-refinishing", "mahogany-front-door-refinishing-katy-tx.webp", "red-mahogany-front-door-staining-sugar-land-tx.webp",
  "door-refinishing-mahogany-doors-katy-sugar-land.webp",
  "Refinished mahogany front doors in Katy and Sugar Land, TX by The Proud Paintbrush"
);
const dGal2 = await composite2(
  "door-refinishing", "stained-wood-double-front-door-missouri-city-tx.webp", "after-double-door-refinish-dark-walnut-katy-tx.webp",
  "door-refinishing-stained-double-doors-missouri-city-katy.webp",
  "Restained wood double front doors in Missouri City and Katy, TX by The Proud Paintbrush"
);

// corrections: feature (optional) + the 2 inline body images
const CORRECTIONS = [
  { parent: "interior", slug: "kitchen-painting",
    inline: [["interior", "kitchen-black-feature-wall-painting-katy-tx.webp"], ["interior", "great-room-kitchen-neutral-walls-richmond-tx.webp"]] },
  { parent: "exterior", slug: "brick-painting",
    inline: [["exterior", "gray-brick-exterior-repaint-west-houston-tx.webp"], ["exterior", "brick-house-painted-trim-sugar-land-portfolio.webp"]] },
  { parent: "exterior", slug: "fiber-cement-siding-painting",
    inline: [["exterior", "white-modern-farmhouse-exterior-sugar-land-tx.webp"], ["exterior", "white-siding-exterior-repaint-fulshear-tx.webp"]] },
  { parent: "exterior", slug: "stucco-maintenance",
    inline: [["exterior", "stucco-exterior-off-white-fulshear-tx.webp"], ["exterior", "tan-stucco-luxury-home-exterior-repaint-west-houston-tx.webp"]] },
  { parent: "exterior", slug: "vinyl-siding-painting",
    inline: [["exterior", "green-wood-siding-exterior-sugar-land-tx.webp"], ["exterior", "teal-mobile-home-exterior-repaint-richmond-tx.webp"]] },
  { parent: "exterior", slug: "door-refinishing", featureMig: dFeat,
    inlineMig: [dGal1, dGal2] },
];

// ensure all plain source files
for (const c of CORRECTIONS) {
  for (const pick of (c.inline || [])) await ensureSrc(...pick);
}
fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => {
  const m = meta[file];
  return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`;
};

for (const c of CORRECTIONS) {
  const f = path.join(process.cwd(), "content", "services", c.parent, `${c.slug}.json`);
  const page = JSON.parse(fs.readFileSync(f, "utf-8"));
  if (c.featureMig) page.ogImage = `/images/migrated/${c.featureMig}`;
  const files = c.inlineMig ? c.inlineMig : c.inline.map(([, file]) => file);

  let body = page.bodyHtml.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = body.split(/(?=<h2)/);
  const points = [];
  for (let i = 1; i < segs.length; i++) points.push(i);
  const imgs = files.map((file) => tag(file));
  const chosen = imgs.map((_, j) => points[Math.min(Math.round(((j + 0.5) * points.length) / imgs.length), points.length - 1)]);
  for (let j = 1; j < chosen.length; j++) if (chosen[j] <= chosen[j - 1]) chosen[j] = Math.min(chosen[j - 1] + 1, points[points.length - 1]);
  chosen.forEach((segIdx, j) => { segs[segIdx] = imgs[j] + segs[segIdx]; });
  page.bodyHtml = segs.join("");
  fs.writeFileSync(f, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${c.parent}/${c.slug}${c.featureMig ? " [feature=before/after composite]" : ""}: ${files.join(" , ")}`);
}
console.log("\nCorrections applied.");
