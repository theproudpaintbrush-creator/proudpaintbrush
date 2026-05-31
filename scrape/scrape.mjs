// One-time scraper for the live Squarespace site -> faithful content source of truth.
// Saves raw HTML + extracted Markdown (with frontmatter) mirroring the URL structure.
import fs from "node:fs";
import path from "node:path";

const ORIGIN = "https://www.theproudpaintbrush.com";
const ROOT = path.resolve("scrape");
const RAW_DIR = path.join(ROOT, "raw");
const MD_DIR = path.join(ROOT, "content");
const CONCURRENCY = 5;

const urls = fs.readFileSync(path.join(ROOT, "urls-all.txt"), "utf-8")
  .split("\n").map(s => s.trim()).filter(Boolean);

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;|&lsquo;|&apos;/g, "’")
    .replace(/&quot;|&ldquo;|&rdquo;/g, '"')
    .replace(/&hellip;/g, "…").replace(/&mdash;/g, "—").replace(/&ndash;/g, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n));
}
function tag(html, re) { const m = html.match(re); return m ? decodeEntities(m[1].replace(/<[^>]+>/g, "").trim()) : ""; }

function extractContent(html) {
  let m = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let region = m ? m[1] : html;
  region = region
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, "")
    .replace(/<h1[^>]*>/gi, "\n\n# ").replace(/<h2[^>]*>/gi, "\n\n## ")
    .replace(/<h3[^>]*>/gi, "\n\n### ").replace(/<h4[^>]*>/gi, "\n\n#### ")
    .replace(/<li[^>]*>/gi, "\n- ")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(h1|h2|h3|h4|p|li|div|section|tr|blockquote)>/gi, "\n");
  return decodeEntities(region.replace(/<[^>]+>/g, ""))
    .replace(/[ \t]+/g, " ")
    .replace(/\n[ \t]+/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function safePath(urlPath) {
  if (urlPath === "/" || urlPath === "") return "index";
  return urlPath.replace(/^\//, "").replace(/\/$/, "");
}

async function scrapeOne(urlPath) {
  const full = ORIGIN + urlPath;
  const res = await fetch(full, { headers: { "User-Agent": "Mozilla/5.0 (content-migration bot; owner-authorized)" } });
  const html = await res.text();
  const title = tag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const desc = (html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["']/i) || [])[1] || "";
  const ogImg = (html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([\s\S]*?)["']/i) || [])[1] || "";
  const h1 = tag(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const content = extractContent(html);
  const words = content ? content.split(/\s+/).length : 0;

  const rel = safePath(urlPath);
  const rawFile = path.join(RAW_DIR, rel + ".html");
  const mdFile = path.join(MD_DIR, rel + ".md");
  fs.mkdirSync(path.dirname(rawFile), { recursive: true });
  fs.mkdirSync(path.dirname(mdFile), { recursive: true });
  fs.writeFileSync(rawFile, html);
  const fm = [
    "---",
    `url: ${full}`,
    `path: ${urlPath}`,
    `title: ${JSON.stringify(title)}`,
    `metaDescription: ${JSON.stringify(decodeEntities(desc))}`,
    `ogImage: ${JSON.stringify(ogImg)}`,
    `h1: ${JSON.stringify(h1)}`,
    `wordCount: ${words}`,
    `status: ${res.status}`,
    "---",
    "",
  ].join("\n");
  fs.writeFileSync(mdFile, fm + content + "\n");
  return { path: urlPath, status: res.status, title, metaDescription: decodeEntities(desc), h1, wordCount: words, rawBytes: html.length, mdFile: path.relative(ROOT, mdFile) };
}

async function run() {
  const manifest = [];
  let i = 0, done = 0;
  async function worker() {
    while (i < urls.length) {
      const idx = i++;
      const u = urls[idx];
      try {
        const r = await scrapeOne(u);
        manifest[idx] = r;
        done++;
        if (done % 10 === 0 || done === urls.length) console.log(`[${done}/${urls.length}] ok ${u} (${r.wordCount}w)`);
      } catch (e) {
        manifest[idx] = { path: u, error: String(e.message || e) };
        done++;
        console.log(`[${done}/${urls.length}] ERR ${u}: ${e.message}`);
      }
      await new Promise(r => setTimeout(r, 120 + Math.floor((idx % 7) * 30)));
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  fs.writeFileSync(path.join(ROOT, "manifest.json"), JSON.stringify(manifest, null, 2));
  const ok = manifest.filter(m => m && !m.error);
  const totWords = ok.reduce((a, m) => a + (m.wordCount || 0), 0);
  console.log(`\nDONE. ${ok.length}/${urls.length} pages. Total extracted words: ${totWords}. Manifest: scrape/manifest.json`);
}
run();
