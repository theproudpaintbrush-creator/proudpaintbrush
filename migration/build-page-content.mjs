// Migrate scraped info/trust/pricing/service-area pages -> content/pages/<key>.json
// Faithful migration (preserve facts), body from <main>, cleaned to safe HTML
// (tables kept for pricing). Fixes the /preperation-process spelling in the new key.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

// Gallery images display small in a grid — serve ~720px thumbnails instead of full 1600px.
async function ensureThumb(src) {
  const name = src.split("/").pop();
  const thumbRel = `/images/migrated/thumbs/${name}`;
  const out = "public" + thumbRel;
  if (!fs.existsSync(out)) {
    fs.mkdirSync("public/images/migrated/thumbs", { recursive: true });
    try { await sharp("public" + src).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 72 }).toFile(out); }
    catch { return src; }
  }
  return thumbRel;
}

// hash a local image's bytes so the same photo saved under different filenames dedupes
const _hashCache = new Map();
function fileHash(src) {
  if (_hashCache.has(src)) return _hashCache.get(src);
  let h = src;
  try { h = crypto.createHash("md5").update(fs.readFileSync("public" + src)).digest("hex"); } catch {}
  _hashCache.set(src, h);
  return h;
}

const CITIES = ["sugar-land", "missouri-city", "richmond", "katy", "fulshear", "rosenberg", "west-houston", "southwest-houston"];

// [outputKey, scrapeSourcePath]
const PAGES = [
  ["warranty", "warranty"],
  ["financing", "financing"],
  ["color-consultation", "color-consultation"],
  ["project-expectations", "project-expectations"],
  ["budget", "budget"],
  ["checklist", "checklist"],
  ["careers", "careers"],
  ["paint-it-forward", "paint-it-forward"],
  ["services", "painting-services"],
  ["pricing", "pricing"],
  ["pricing/interior-prices", "pricing/interior-prices"],
  ["pricing/exterior-prices", "pricing/exterior-prices"],
  ["pricing/cabinet-prices", "pricing/cabinet-prices"],
  ["preparation-process", "preperation-process"],
  ["preparation-process/interior", "preperation-process/interior"],
  ["preparation-process/exterior", "preperation-process/exterior"],
  ["portfolio", "portfolio"],
  ["portfolio/interior-painting", "portfolio/interior-painting"],
  ["portfolio/exterior-painting", "portfolio/exterior-painting"],
  ["service-areas", "service-areas"],
  ...CITIES.map((c) => [`service-areas/${c}`, `service-areas/${c}`]),
];

const dec = (s) => (s || "")
  .replace(/&amp;/g, "&").replace(/&#39;|&rsquo;|&lsquo;|&apos;/g, "’").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
  .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&hellip;/g, "…").replace(/&nbsp;/g, " ")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

function frontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---/);
  const fm = {};
  if (m) for (const ln of m[1].split("\n")) { const x = ln.match(/^(\w+):\s*(.*)$/); if (x) { try { fm[x[1]] = JSON.parse(x[2]); } catch { fm[x[1]] = x[2]; } } }
  return fm;
}

const IMG = JSON.parse(fs.readFileSync("migration/image-map.json", "utf8"));
const DIMS = JSON.parse(fs.readFileSync("migration/image-dims.json", "utf8"));
const imgUrl = (attrs) => ((attrs.match(/data-image="([^"]+)"/i) || attrs.match(/data-src="([^"]+)"/i) || attrs.match(/\ssrc="([^"]+)"/i) || [])[1] || "").split("?")[0];
function altText(src) {
  const base = src.split("/").pop().replace(/\.webp$/, "").replace(/-[a-z0-9]{6}$/, "");
  if (/^(photo|img|image|unsplash|screenshot|dsc|pxl|thirdparty|\d)/i.test(base) || base.length < 6)
    return "Painting project by The Proud Paintbrush in Sugar Land, TX";
  const w = base.replace(/[-_]+/g, " ").trim();
  return (w.charAt(0).toUpperCase() + w.slice(1)).replace(/\b(tx|usa|hoa|diy)\b/gi, (x) => x.toUpperCase());
}
// Pull FAQ pairs from question-style headings (text ends in "?") + following content,
// for FAQPage schema. Content stays visible in the body (Google-compliant).
function extractPageFaqs(html) {
  const faqs = [];
  const re = /<(h2|h3|h4)>([^<]*\?)<\/\1>([\s\S]*?)(?=<h2>|<h3>|<h4>|$)/g;
  let m;
  while ((m = re.exec(html)) && faqs.length < 12) {
    const q = m[2].replace(/&amp;/g, "&").trim();
    const a = m[3].replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
    if (q.length > 8 && a.length > 40) faqs.push({ q, a: a.length > 320 ? a.slice(0, 317).replace(/\s+\S*$/, "") + "…" : a });
  }
  return faqs;
}
const ALLOWED = new Set(["h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "blockquote", "br", "a", "img", "table", "thead", "tbody", "tr", "th", "td"]);

// Portfolio galleries: merge the sparse /portfolio page with the image-rich
// /painting-services/portfolio page (which we 301 away but whose photos we keep).
const PORTFOLIO_SOURCES = {
  "portfolio/interior-painting": ["portfolio/interior-painting", "painting-services/portfolio/interior-painting"],
  "portfolio/exterior-painting": ["portfolio/exterior-painting", "painting-services/portfolio/exterior-painting"],
  "portfolio": ["painting-services/portfolio/interior-painting", "painting-services/portfolio/exterior-painting", "portfolio"],
};
function galleryFrom(html) {
  const out = [];
  for (const tag of html.match(/<img[^>]*>/gi) || []) {
    const local = IMG[imgUrl(tag)];
    if (!local || /unsplash|logo|favicon|icon/i.test(local)) continue;
    const alt = (((tag.match(/alt="([^"]*)"/i) || [])[1] || "").trim()) || altText(local);
    out.push({ src: local, alt });
  }
  return out;
}
const CRUFT = /^(book my free estimate|more (interior|exterior) services|learn more|get started today|schedule[^<]*|take pride in your home|our fabulous crew.*|previous|next|home|interior painting|exterior painting|cabinet painting)$/i;

function cleanHtml(raw) {
  let s = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (full, slash, tagRaw, attrs) => {
    let tag = tagRaw.toLowerCase();
    if (tag === "h1") tag = "h2";
    if (tag === "b") tag = "strong";
    if (tag === "i") tag = "em";
    if (!ALLOWED.has(tag)) return "";
    if (slash) return tag === "img" ? "" : `</${tag}>`;
    if (tag === "img") {
      const local = IMG[imgUrl(attrs)];
      if (!local) return "";
      const alt = (((attrs.match(/alt="([^"]*)"/i) || [])[1] || "").trim()) || altText(local);
      const d = DIMS[local];
      const dim = d ? ` width="${d.w}" height="${d.h}"` : "";
      return `<img src="${local}" alt="${alt.replace(/"/g, "")}"${dim} loading="lazy">`;
    }
    if (tag === "a") {
      const href = (attrs.match(/href\s*=\s*"([^"]*)"/i) || [])[1] || "";
      if (!href || /^javascript:/i.test(href)) return "";
      return `<a href="${href}">`;
    }
    if (tag === "br") return "<br>";
    return `<${tag}>`;
  });
  // strip cruft anchors/paragraphs/headings by inner text
  s = s.replace(/<(p|h2|h3|h4|a)>([\s\S]*?)<\/\1>/gi, (m, tag, inner) => {
    const txt = dec(inner.replace(/<[^>]+>/g, "")).trim();
    return CRUFT.test(txt) ? "" : m;
  });
  s = s.replace(/<p>\s*<\/p>/g, "").replace(/<li>\s*<\/li>/g, "").replace(/<(h2|h3|h4)>\s*<\/\1>/g, "")
       .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
  return s;
}

function clampMeta(m) {
  if (!m) return "";
  if (m.length <= 160) return m;
  const cut = m.slice(0, 158);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "").trim();
}
function clampTitle(title, h1) {
  if (title.length <= 60) return title;
  let base = (h1 || title).replace(/\s*[—-]\s*The Proud.*/i, "").trim();
  if (base.length > 40) base = base.slice(0, 40).replace(/\s+\S*$/, "").trim();
  for (const brand of [" | The Proud Paintbrush", " | Proud Paintbrush", ""]) {
    if ((base + brand).length <= 59) return base + brand;
  }
  return base.slice(0, 59);
}

let written = 0;
const report = [];
for (const [key, src] of PAGES) {
  const mdFile = `scrape/content/${src}.md`;
  const rawFile = `scrape/raw/${src}.html`;
  if (!fs.existsSync(rawFile)) { report.push({ key, error: "no raw: " + rawFile }); continue; }
  const fm = fs.existsSync(mdFile) ? frontmatter(fs.readFileSync(mdFile, "utf8")) : {};
  const html = fs.readFileSync(rawFile, "utf8");
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let body = cleanHtml(mainMatch ? mainMatch[1] : html);
  { const seenImg = new Set(); body = body.replace(/<img src="([^"]+)"[^>]*>/g, (mm, src) => { const h = fileHash(src); return seenImg.has(h) ? "" : (seenImg.add(h), mm); }); }
  let gallery = [];
  if (key.startsWith("portfolio")) {
    const seen = new Set();
    for (const s of PORTFOLIO_SOURCES[key] || [src]) {
      const sf = `scrape/raw/${s}.html`;
      if (!fs.existsSync(sf)) continue;
      for (const g of galleryFrom(fs.readFileSync(sf, "utf8"))) {
        const h = fileHash(g.src);
        if (!seen.has(h)) { seen.add(h); gallery.push(g); }
      }
    }
    if (key === "portfolio") gallery = gallery.slice(0, 36); // hub: curated preview, full sets on sub-pages
    for (const g of gallery) g.src = await ensureThumb(g.src); // serve lightweight thumbnails in the grid
    body = body.replace(/<img[^>]*>/g, ""); // images shown as grid, not inline
  }
  const titleCase = key.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const rawTitle = (fm.title || titleCase).replace(/\s*[—-]\s*The Proud Paintbrush.*$/i, "").trim();
  const h1 = fm.h1 || rawTitle || titleCase;
  const title = clampTitle(rawTitle, h1);
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const rec = { key, title, metaDescription: clampMeta(fm.metaDescription || ""), h1, bodyHtml: body, faqs: key.startsWith("portfolio") ? [] : extractPageFaqs(body), gallery };
  fs.mkdirSync(path.dirname(`content/pages/${key}.json`), { recursive: true });
  fs.writeFileSync(`content/pages/${key}.json`, JSON.stringify(rec, null, 2));
  written++;
  report.push({ key, words, titleLen: title.length, metaLen: rec.metaDescription.length });
}

fs.writeFileSync("migration/page-migration-report.json", JSON.stringify(report, null, 2));
console.log(`Wrote ${written}/${PAGES.length} content pages.`);
report.forEach((r) => console.log(r.error ? `  ERR ${r.key}: ${r.error}` : `  ${r.key.padEnd(34)} ${r.words}w  title=${r.titleLen} meta=${r.metaLen}`));
