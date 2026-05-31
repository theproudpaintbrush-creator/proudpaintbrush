// Migrate scraped Squarespace blog posts -> content/blog/<slug>.json (faithful,
// preserves ranking content). Body is pulled from the .blog-item-content container,
// cleaned to safe semantic HTML. Skips junk auto-slugs we redirect, and never
// overwrites a hand-authored post that already exists.
import fs from "node:fs";
import path from "node:path";

const RAW_DIR = "scrape/raw/blog";
const OUT_DIR = "content/blog";
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---- build skip set: redirect sources + existing posts ----
const skip = new Set();
const nextcfg = fs.readFileSync("next.config.ts", "utf8");
for (const m of nextcfg.matchAll(/source:\s*"\/blog\/([^"]+)"/g)) skip.add(m[1]);
if (fs.existsSync("migration/redirects.json")) {
  for (const r of JSON.parse(fs.readFileSync("migration/redirects.json", "utf8")))
    if (r.source.startsWith("/blog/")) skip.add(r.source.replace("/blog/", ""));
}
for (const f of fs.readdirSync(OUT_DIR)) if (f.endsWith(".json")) skip.add(f.replace(/\.json$/, "")); // don't overwrite existing

const dec = (s) => (s || "")
  .replace(/&amp;/g, "&").replace(/&#39;|&rsquo;|&lsquo;|&apos;/g, "’").replace(/&quot;|&ldquo;|&rdquo;/g, '"')
  .replace(/&mdash;/g, "—").replace(/&ndash;/g, "–").replace(/&hellip;/g, "…").replace(/&nbsp;/g, " ")
  .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));

// extract inner HTML of the first <div class="...blog-item-content..."> via depth matching
function extractBody(html) {
  const anchor = html.search(/<div[^>]*class="[^"]*blog-item-content[^"]*"/i);
  if (anchor < 0) return "";
  // find end of the opening tag
  let i = html.indexOf(">", anchor) + 1;
  const start = i;
  let depth = 1;
  const tagRe = /<(\/?)div\b[^>]*>/gi;
  tagRe.lastIndex = i;
  let m;
  while ((m = tagRe.exec(html))) {
    depth += m[1] ? -1 : 1;
    if (depth === 0) return html.slice(start, m.index);
  }
  return html.slice(start);
}

const ALLOWED = new Set(["h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "blockquote", "br", "a"]);
function cleanHtml(raw) {
  let s = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<img[^>]*>/gi, "")            // drop images (lazy-load placeholders)
    .replace(/<!--[\s\S]*?-->/g, "");
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
  // tidy
  s = s.replace(/<p>\s*<\/p>/g, "").replace(/<li>\s*<\/li>/g, "")
       .replace(/\s+/g, " ").replace(/>\s+</g, "><").trim();
  return s;
}

const firstMatch = (h, re) => (h.match(re) || [])[1] || "";

let written = 0, skipped = 0;
const report = [];
for (const file of fs.readdirSync(RAW_DIR).filter((f) => f.endsWith(".html"))) {
  const slug = file.replace(/\.html$/, "");
  if (skip.has(slug)) { skipped++; continue; }
  const html = fs.readFileSync(path.join(RAW_DIR, file), "utf8");
  const title = dec(firstMatch(html, /<title[^>]*>([\s\S]*?)<\/title>/i)).replace(/\s*[—-]\s*The Proud Paintbrush.*$/i, "").trim();
  const description = dec(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i));
  const date = (firstMatch(html, /"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/) || "2024-01-01");
  const author = dec(firstMatch(html, /"author"\s*:\s*\{[^}]*"name"\s*:\s*"([^"]+)"/)) || "The Proud Paintbrush Team";
  const content = cleanHtml(extractBody(html));
  const words = content.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 80) { skipped++; report.push({ slug, skipped: "thin", words }); continue; }
  const rec = { slug, title, description, date, author, readTime: Math.max(1, Math.ceil(words / 200)), content };
  fs.writeFileSync(path.join(OUT_DIR, slug + ".json"), JSON.stringify(rec, null, 2));
  written++;
  report.push({ slug, words, date, title: title.slice(0, 50) });
}

fs.writeFileSync("migration/blog-migration-report.json", JSON.stringify(report, null, 2));
console.log(`Wrote ${written} posts, skipped ${skipped} (redirected/existing/thin).`);
const thin = report.filter((r) => r.skipped === "thin");
if (thin.length) console.log("Thin (skipped):", thin.map((t) => `${t.slug}(${t.words}w)`).join(", "));
const dates = report.filter((r) => !r.skipped).map((r) => r.date).sort();
console.log("date range:", dates[0], "->", dates[dates.length - 1]);
