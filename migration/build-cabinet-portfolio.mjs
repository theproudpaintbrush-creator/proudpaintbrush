// Build /portfolio/cabinet-painting from all cabinet/kitchen photos on disk
// (no scrape source exists for it). Dedupe by content hash, thumbnail to 720px.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const SRC_DIRS = ["public/images/migrated", "public/images"];
const KEYWORDS = /(cabinet|kitchen|vanity)/i;
const EXCLUDE = /(thumbs|logo|favicon|icon|og-|1200x630|unsplash)/i;

function altText(file) {
  const base = file.replace(/\.[a-z0-9]+$/i, "").replace(/-[a-z0-9]{6}$/, "");
  if (/^(photo|img|image|dsc|pxl|\d)/i.test(base) || base.length < 6) return "Kitchen cabinet painting by The Proud Paintbrush in Sugar Land, TX";
  const w = base.replace(/[-_]+/g, " ").trim();
  return (w.charAt(0).toUpperCase() + w.slice(1)).replace(/\b(tx|usa|hoa)\b/gi, (x) => x.toUpperCase());
}

const found = [];
for (const dir of SRC_DIRS) {
  if (!fs.existsSync(dir)) continue;
  for (const f of fs.readdirSync(dir)) {
    if (!/\.(webp|jpg|jpeg|png)$/i.test(f)) continue;
    if (!KEYWORDS.test(f) || EXCLUDE.test(f)) continue;
    found.push({ abs: path.join(dir, f), rel: "/" + dir.replace("public/", "") + "/" + f, file: f });
  }
}

// dedupe by content hash
const seen = new Set();
const unique = [];
for (const img of found) {
  try {
    const h = crypto.createHash("md5").update(fs.readFileSync(img.abs)).digest("hex");
    if (seen.has(h)) continue;
    seen.add(h);
    unique.push(img);
  } catch {}
}

fs.mkdirSync("public/images/migrated/thumbs", { recursive: true });
const gallery = [];
for (const img of unique) {
  const name = img.file.replace(/\.[a-z0-9]+$/i, "") + ".webp";
  const thumbRel = `/images/migrated/thumbs/${name}`;
  const out = "public" + thumbRel;
  if (!fs.existsSync(out)) {
    try { await sharp(img.abs).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out); }
    catch { continue; }
  }
  gallery.push({ src: thumbRel, alt: altText(img.file) });
}

const rec = {
  key: "portfolio/cabinet-painting",
  title: "Cabinet Painting Portfolio | Sugar Land, TX | Proud Paintbrush",
  metaDescription: "Real cabinet painting projects by The Proud Paintbrush across Sugar Land & Fort Bend County — kitchen and bath cabinets refinished to a factory-smooth finish.",
  h1: "Cabinet Painting Portfolio",
  bodyHtml: "<p>A look at real kitchen and bath cabinet projects we've completed across Sugar Land and Fort Bend County. Every set was degreased, sanded, bonding-primed, and sprayed to a hard, factory-smooth finish. See our full <a href=\"/cabinet-painting\">cabinet painting</a> service, browse <a href=\"/pricing/cabinet-prices\">cabinet pricing</a>, or <a href=\"/contact\">request a free estimate</a>.</p>",
  faqs: [],
  gallery,
};
fs.mkdirSync("content/pages/portfolio", { recursive: true });
fs.writeFileSync("content/pages/portfolio/cabinet-painting.json", JSON.stringify(rec, null, 2));
console.log(`cabinet portfolio: ${gallery.length} unique photos (from ${found.length} matches, ${unique.length} deduped)`);
