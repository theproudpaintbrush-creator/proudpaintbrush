// Build a review montage: one labeled row per sub-service page showing its
// feature image + 2 inline body photos, so the owner can eyeball all 29 picks.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const MIG = path.join(ROOT, "public", "images", "migrated");
const OUT = path.join("C:", "Users", "Chris", "Documents", "SEO", "tmp");

function imgsFor(parent, slug) {
  const page = JSON.parse(fs.readFileSync(path.join(ROOT, "content", "services", parent, `${slug}.json`), "utf-8"));
  const feature = page.ogImage.replace("/images/migrated/", "");
  const inline = [...page.bodyHtml.matchAll(/\/images\/migrated\/([^"\\]+)/g)].map((m) => m[1]);
  return [feature, ...inline.slice(0, 2)];
}

const parents = ["exterior", "interior"];
const TW = 300, TH = 200, GAP = 4, LBL = 150, COLS = 3;
const rowH = TH + GAP;
const pagesPerSheet = 15;

for (const parent of parents) {
  const slugs = fs.readdirSync(path.join(ROOT, "content", "services", parent)).filter((f) => f.endsWith(".json")).map((f) => f.replace(".json", "")).sort();
  for (let s = 0; s * pagesPerSheet < slugs.length; s++) {
    const slice = slugs.slice(s * pagesPerSheet, s * pagesPerSheet + pagesPerSheet);
    const W = LBL + COLS * TW + (COLS + 1) * GAP;
    const H = slice.length * rowH + GAP;
    const comps = [];
    for (let r = 0; r < slice.length; r++) {
      const slug = slice[r];
      const top = GAP + r * rowH;
      const lbl = Buffer.from(
        `<svg width="${LBL}" height="${TH}"><rect width="${LBL}" height="${TH}" fill="#1a2e44"/><text x="8" y="${TH / 2}" font-size="15" font-family="Arial" fill="white" font-weight="bold">${slug.replace(/-/g, " ")}</text></svg>`
      );
      comps.push({ input: lbl, top, left: 0 });
      const files = imgsFor(parent, slug);
      for (let c = 0; c < files.length; c++) {
        const fp = path.join(MIG, files[c]);
        if (!fs.existsSync(fp)) continue;
        const buf = await sharp(fp).resize(TW, TH, { fit: "cover" }).toBuffer();
        const tagTxt = c === 0 ? "FEATURE" : `inline ${c}`;
        const tag = Buffer.from(`<svg width="${TW}" height="22"><rect width="${TW}" height="22" fill="black" opacity="0.6"/><text x="5" y="16" font-size="13" font-family="Arial" fill="white">${tagTxt}</text></svg>`);
        const labeled = await sharp(buf).composite([{ input: tag, top: 0, left: 0 }]).toBuffer();
        comps.push({ input: labeled, top, left: LBL + GAP + c * (TW + GAP) });
      }
    }
    const out = path.join(OUT, `review-${parent}-${s}.png`);
    await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).png().toFile(out);
    console.log(`WROTE ${path.basename(out)} (${slice.length} pages)`);
  }
}
