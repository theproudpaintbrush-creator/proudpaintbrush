// Migrate scraped info/trust/pricing/service-area pages -> content/pages/<key>.json
// Faithful migration (preserve facts), body from <main>, cleaned to safe HTML
// (tables kept for pricing). Fixes the /preperation-process spelling in the new key.
import fs from "node:fs";
import path from "node:path";

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

const ALLOWED = new Set(["h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "blockquote", "br", "a", "table", "thead", "tbody", "tr", "th", "td"]);
const CRUFT = /^(book my free estimate|more (interior|exterior) services|learn more|get started today|schedule[^<]*|take pride in your home|our fabulous crew.*|previous|next|home|interior painting|exterior painting|cabinet painting)$/i;

function cleanHtml(raw) {
  let s = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "").replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<img[^>]*>/gi, "").replace(/<!--[\s\S]*?-->/g, "");
  s = s.replace(/<(\/?)([a-z0-9]+)([^>]*)>/gi, (full, slash, tagRaw, attrs) => {
    let tag = tagRaw.toLowerCase();
    if (tag === "h1") tag = "h2";
    if (tag === "b") tag = "strong";
    if (tag === "i") tag = "em";
    if (!ALLOWED.has(tag)) return "";
    if (slash) return `</${tag}>`;
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
  const body = cleanHtml(mainMatch ? mainMatch[1] : html);
  const titleCase = key.split("/").pop().replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const rawTitle = (fm.title || titleCase).replace(/\s*[—-]\s*The Proud Paintbrush.*$/i, "").trim();
  const h1 = fm.h1 || rawTitle || titleCase;
  const title = clampTitle(rawTitle, h1);
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  const rec = { key, title, metaDescription: clampMeta(fm.metaDescription || ""), h1, bodyHtml: body, faqs: [] };
  fs.mkdirSync(path.dirname(`content/pages/${key}.json`), { recursive: true });
  fs.writeFileSync(`content/pages/${key}.json`, JSON.stringify(rec, null, 2));
  written++;
  report.push({ key, words, titleLen: title.length, metaLen: rec.metaDescription.length });
}

fs.writeFileSync("migration/page-migration-report.json", JSON.stringify(report, null, 2));
console.log(`Wrote ${written}/${PAGES.length} content pages.`);
report.forEach((r) => console.log(r.error ? `  ERR ${r.key}: ${r.error}` : `  ${r.key.padEnd(34)} ${r.words}w  title=${r.titleLen} meta=${r.metaLen}`));
