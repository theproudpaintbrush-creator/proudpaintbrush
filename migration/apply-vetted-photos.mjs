// Apply hand-vetted (actually-viewed) photos from Downloads/proudpaintbrush-photos
// to the 8 /service-areas/<city> pages and the hub city cards.
//  - copies each chosen source file into public/images/migrated
//  - computes + records its dimensions (image-dims.json)
//  - rebuilds each city page's gallery to 4 vetted shots, spaced evenly
//  - upgrades each hub city-card to a vetted exterior
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const MIG = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");
const dims = JSON.parse(fs.readFileSync(dimsFile, "utf-8"));
const pagesDir = path.join(process.cwd(), "content", "pages", "service-areas");

const CITY_NAMES = {
  "southwest-houston": "Southwest Houston", "west-houston": "West Houston", "sugar-land": "Sugar Land",
  "missouri-city": "Missouri City", "katy": "Katy", "richmond": "Richmond", "rosenberg": "Rosenberg", "fulshear": "Fulshear",
};
function altFor(file) {
  let s = file.replace(/\.(webp|jpg|jpeg|png)$/i, "");
  let city = "";
  for (const [slug, name] of Object.entries(CITY_NAMES)) {
    if (s.includes(slug)) { city = name; s = s.replace(new RegExp(`-?${slug}(-tx)?`), ""); break; }
  }
  s = s.replace(/-/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase());
  return `${s}${city ? ` in ${city}, TX` : ""} by The Proud Paintbrush`;
}

// chosen photos per city: [folder, filename]; first entry is also the hub-card exterior
const PICKS = {
  "sugar-land": [
    ["exterior", "white-modern-farmhouse-exterior-sugar-land-tx.webp"],
    ["interior", "arched-window-living-room-repaint-sugar-land-tx.webp"],
    ["interior", "white-kitchen-marble-island-repaint-sugar-land-tx.webp"],
    ["cabinets", "gray-kitchen-cabinet-repaint-sugar-land-tx.webp"],
  ],
  "missouri-city": [
    ["exterior", "white-modern-farmhouse-exterior-missouri-city-tx.webp"],
    ["exterior", "stucco-stone-home-exterior-missouri-city-tx.webp"],
    ["interior", "white-living-room-marble-floor-repaint-missouri-city-tx.webp"],
    ["interior", "gray-media-room-striped-accent-wall-missouri-city-tx.webp"],
  ],
  "katy": [
    ["exterior", "white-brick-two-story-exterior-katy-tx.webp"],
    ["exterior", "stucco-courtyard-tile-patio-katy-tx.webp"],
    ["interior", "greige-living-room-tray-ceiling-repaint-katy-tx.webp"],
    ["cabinets", "gray-blue-kitchen-cabinet-repaint-katy-tx.webp"],
  ],
  "richmond": [
    ["exterior", "backyard-pool-home-exterior-richmond-tx.webp"],
    ["interior", "great-room-kitchen-neutral-walls-richmond-tx.webp"],
    ["interior", "gray-two-story-living-room-repaint-richmond-tx.webp"],
    ["cabinets", "white-kitchen-cabinet-repaint-marble-richmond-tx.jpg"],
  ],
  "rosenberg": [
    ["exterior", "modern-stone-exterior-pool-patio-rosenberg-tx.webp"],
    ["exterior", "brick-stone-home-exterior-rosenberg-tx.webp"],
    ["interior", "master-bedroom-painted-walls-rosenberg-tx.webp"],
    ["cabinets", "gray-kitchen-cabinet-repaint-rosenberg-tx.webp"],
  ],
  "fulshear": [
    ["exterior", "tan-stucco-two-story-home-exterior-fulshear-tx.webp"],
    ["interior", "game-room-pool-table-fulshear-tx.webp"],
    ["interior", "white-shiplap-fireplace-vaulted-ceiling-fulshear-tx.webp"],
    ["cabinets", "white-kitchen-cabinet-repaint-island-fulshear-tx.webp"],
  ],
  "west-houston": [
    ["exterior", "tan-stucco-luxury-home-exterior-repaint-west-houston-tx.webp"],
    ["exterior", "brick-home-backyard-pool-patio-west-houston-tx.webp"],
    ["interior", "taupe-dining-room-wall-repaint-west-houston-tx.jpg"],
    ["cabinets", "navy-bathroom-vanity-cabinet-repaint-west-houston-tx.webp"],
  ],
  "southwest-houston": [
    ["exterior", "white-stucco-exterior-two-story-home-southwest-houston-tx.webp"],
    ["interior", "open-concept-living-dining-room-southwest-houston-tx.webp"],
    ["interior", "curved-staircase-foyer-repaint-southwest-houston-tx.webp"],
    ["cabinets", "gray-bathroom-vanity-wood-accent-wall-southwest-houston-tx.webp"],
  ],
};

// 1. copy + measure every chosen file
const meta = {}; // file -> {w,h,alt}
for (const picks of Object.values(PICKS)) {
  for (const [folder, file] of picks) {
    const from = path.join(SRC, folder, file);
    const to = path.join(MIG, file);
    if (!fs.existsSync(from)) throw new Error(`missing source: ${from}`);
    if (!fs.existsSync(to)) fs.copyFileSync(from, to);
    const m = await sharp(to).metadata();
    const rec = { w: m.width, h: m.height };
    dims[`/images/migrated/${file}`] = rec;
    meta[file] = { ...rec, alt: altFor(file) };
  }
}
fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));

const tag = (file) => {
  const m = meta[file];
  return `<img src="/images/migrated/${file}" alt="${m.alt}" width="${m.w}" height="${m.h}" loading="lazy">`;
};

// 2. rebuild each city page gallery (remove all imgs, insert 4 evenly)
for (const [slug, picks] of Object.entries(PICKS)) {
  const f = path.join(pagesDir, `${slug}.json`);
  const page = JSON.parse(fs.readFileSync(f, "utf-8"));
  let body = page.bodyHtml.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = body.split(/(?=<h2)/);
  const points = [];
  for (let i = 1; i < segs.length; i++) points.push(i);
  const imgs = picks.map(([, file]) => tag(file));
  const chosen = imgs.map((_, j) => points[Math.min(Math.round(((j + 0.5) * points.length) / imgs.length), points.length - 1)]);
  for (let j = 1; j < chosen.length; j++) if (chosen[j] <= chosen[j - 1]) chosen[j] = Math.min(chosen[j - 1] + 1, points[points.length - 1]);
  chosen.forEach((segIdx, j) => { segs[segIdx] = imgs[j] + segs[segIdx]; });
  page.bodyHtml = segs.join("");
  fs.writeFileSync(f, JSON.stringify(page, null, 2) + "\n");
  console.log(`✓ ${slug}: ${imgs.length} vetted photos at segs [${chosen.join(", ")}]`);
}

// 3. upgrade hub city-card exteriors (first pick per city)
const hubFile = path.join(process.cwd(), "content", "pages", "service-areas.json");
const hub = JSON.parse(fs.readFileSync(hubFile, "utf-8"));
for (const card of hub.cityCards.cards) {
  const slug = card.href.replace("/service-areas/", "");
  const file = PICKS[slug][0][1];
  card.image = { src: `/images/migrated/${file}`, alt: meta[file].alt, width: meta[file].w, height: meta[file].h };
}
fs.writeFileSync(hubFile, JSON.stringify(hub, null, 2) + "\n");
console.log("✓ hub: 8 city-card exteriors upgraded");
