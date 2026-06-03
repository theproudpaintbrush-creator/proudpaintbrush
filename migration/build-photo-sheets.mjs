// Build per-city contact sheets of UNUSED, finished interior/exterior/cabinet
// photos from Downloads/proudpaintbrush-photos so they can be eyeballed at once.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = path.join("C:", "Users", "Chris", "Downloads", "proudpaintbrush-photos");
const OUT = path.join("C:", "Users", "Chris", "Documents", "SEO", "tmp");
const mig = new Set(
  fs.readdirSync(path.join(process.cwd(), "public", "images", "migrated")).map((f) => f.replace(/\.(webp|jpg|jpeg|png)$/i, ""))
);
const EXCLUDE = /(before|prep|in-progress|ladder|masked|damaged|repair|washing|caulking|booth|primed|soffit|vent|second-coat|spray-prep|carport|drawers|og-1200x630)/i;
const CITIES = [
  ["southwest-houston", "SW Houston"],
  ["west-houston", "West Houston"],
  ["sugar-land", "Sugar Land"],
  ["missouri-city", "Missouri City"],
  ["katy", "Katy"],
  ["richmond", "Richmond"],
  ["rosenberg", "Rosenberg"],
  ["fulshear", "Fulshear"],
];
const cats = { interior: "I", exterior: "E", cabinets: "C" };
const cityOf = (name) => CITIES.find(([s]) => name.includes(s))?.[0] || null;

const pool = Object.fromEntries(CITIES.map(([s]) => [s, []]));
for (const folder of Object.keys(cats)) {
  for (const f of fs.readdirSync(path.join(SRC, folder))) {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(f)) continue;
    if (mig.has(f.replace(/\.(webp|jpg|jpeg|png)$/i, ""))) continue;
    if (EXCLUDE.test(f)) continue;
    const c = cityOf(f);
    if (!c) continue;
    pool[c].push({ folder, f, cat: cats[folder] });
  }
}

const legend = {};
for (const [slug] of CITIES) {
  const items = pool[slug].sort((a, b) => a.cat.localeCompare(b.cat) || a.f.localeCompare(b.f));
  if (!items.length) continue;
  const TW = 300, TH = 225, GAP = 6, COLS = 5;
  const rows = Math.ceil(items.length / COLS);
  const W = COLS * TW + (COLS + 1) * GAP, H = rows * TH + (rows + 1) * GAP;
  const comps = [];
  legend[slug] = [];
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const buf = await sharp(path.join(SRC, it.folder, it.f)).resize(TW, TH, { fit: "cover" }).toBuffer();
    const lbl = `#${i + 1} ${it.cat}`;
    const svg = Buffer.from(
      `<svg width="${TW}" height="${TH}"><rect x="0" y="0" width="76" height="26" fill="black" opacity="0.7"/><text x="6" y="19" font-size="18" font-family="Arial" fill="white" font-weight="bold">${lbl}</text></svg>`
    );
    const labeled = await sharp(buf).composite([{ input: svg, top: 0, left: 0 }]).toBuffer();
    const r = Math.floor(i / COLS), c = i % COLS;
    comps.push({ input: labeled, top: GAP + r * (TH + GAP), left: GAP + c * (TW + GAP) });
    legend[slug].push(`${i + 1}[${it.cat}] ${it.f}`);
  }
  const outFile = path.join(OUT, `sheet-${slug}.png`);
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).png().toFile(outFile);
  console.log(`WROTE ${outFile} (${items.length} imgs)`);
}
fs.writeFileSync(path.join(OUT, "legend.json"), JSON.stringify(legend, null, 1));
console.log("legend written");
