// Migrate scraped Squarespace blog posts -> content/blog/<slug>.json (faithful,
// preserves ranking content). Body is pulled from the .blog-item-content container,
// cleaned to safe semantic HTML. Skips junk auto-slugs we redirect, and never
// overwrites a hand-authored post that already exists.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const _hashCache = new Map();
function fileHash(src) {
  if (_hashCache.has(src)) return _hashCache.get(src);
  let h = src;
  try { h = crypto.createHash("md5").update(fs.readFileSync("public" + src)).digest("hex"); } catch {}
  _hashCache.set(src, h);
  return h;
}

const RAW_DIR = "scrape/raw/blog";
const OUT_DIR = "content/blog";
fs.mkdirSync(OUT_DIR, { recursive: true });
const IMG = JSON.parse(fs.readFileSync("migration/image-map.json", "utf8")); // CDN URL -> local path

function clampMeta(m) {
  if (!m) return "";
  if (m.length <= 160) return m;
  return m.slice(0, 158).replace(/\s+\S*$/, "").replace(/[,;:\s]+$/, "");
}
function altText(src) {
  const base = src.split("/").pop().replace(/\.webp$/, "").replace(/-[a-z0-9]{6}$/, "");
  if (/^(photo|img|image|unsplash|screenshot|dsc|pxl|thirdparty|\d)/i.test(base) || base.length < 6)
    return "Painting project by The Proud Paintbrush in Sugar Land, TX";
  const w = base.replace(/[-_]+/g, " ").trim();
  return (w.charAt(0).toUpperCase() + w.slice(1)).replace(/\b(tx|usa|hoa|diy)\b/gi, (x) => x.toUpperCase());
}

// ---- build skip set: redirect sources + existing posts ----
const skip = new Set();
const nextcfg = fs.readFileSync("next.config.ts", "utf8");
for (const m of nextcfg.matchAll(/source:\s*"\/blog\/([^"]+)"/g)) skip.add(m[1]);
if (fs.existsSync("migration/redirects.json")) {
  for (const r of JSON.parse(fs.readFileSync("migration/redirects.json", "utf8")))
    if (r.source.startsWith("/blog/")) skip.add(r.source.replace("/blog/", ""));
}
// (regenerating all from scrape this pass to add images; junk auto-slugs still skipped above)

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

const ALLOWED = new Set(["h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "blockquote", "br", "a", "img"]);
const imgUrl = (attrs) => ((attrs.match(/data-image="([^"]+)"/i) || attrs.match(/data-src="([^"]+)"/i) || attrs.match(/\ssrc="([^"]+)"/i) || [])[1] || "").split("?")[0];
function cleanHtml(raw) {
  let s = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
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
      if (!local || /avatar|thirdpartymember|logo|favicon/i.test(local)) return "";
      const alt = (((attrs.match(/alt="([^"]*)"/i) || [])[1] || "").trim()) || altText(local);
      return `<img src="${local}" alt="${alt.replace(/"/g, "")}" loading="lazy">`;
    }
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
  const description = clampMeta(dec(firstMatch(html, /<meta[^>]+name="description"[^>]+content="([^"]*)"/i)));
  const date = (firstMatch(html, /"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})/) || "2024-01-01");
  const author = dec(firstMatch(html, /class="blog-author-name"[^>]*>([^<]+)/)) || dec(firstMatch(html, /"author":"([^"]+)"/)) || "The Proud Paintbrush Team";
  let content = cleanHtml(extractBody(html));
  { const seenImg = new Set(); content = content.replace(/<img src="([^"]+)"[^>]*>/g, (mm, src) => { const h = fileHash(src); return seenImg.has(h) ? "" : (seenImg.add(h), mm); }); }
  const ogImg = firstMatch(html, /<meta[^>]+property="og:image"[^>]+content="([^"]+)"/i).split("?")[0];
  const firstBody = (content.match(/<img src="([^"]+)"/) || [])[1] || "";
  const image = IMG[ogImg] || firstBody || "";
  // if the feature image is also the first body image, drop the body copy (shown as hero)
  const body = image && firstBody === image ? content.replace(/<img\s[^>]*>/i, "") : content;
  const words = body.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
  if (words < 80) { skipped++; report.push({ slug, skipped: "thin", words }); continue; }
  const rec = { slug, title, description, date, author, readTime: Math.max(1, Math.ceil(words / 200)), image, content: body };
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
