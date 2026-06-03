// Phase 3.1 — flatten internal links so none resolve through a 3xx redirect.
// Reads the redirect map straight from next.config.ts (source -> destination),
// then rewrites every internal href in content/**/*.json:
//   1. absolute theproudpaintbrush.com / non-www / http links -> root-relative
//   2. any path that is a redirect SOURCE -> its destination (one hop, no chains)
// External links (youcanbook.me, google, etc.) are left untouched.
// Run with `--write` to apply; default is a dry run that only reports.
import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const ROOT = process.cwd();

// ---- 1. build the redirect map from next.config.ts ----
const cfg = fs.readFileSync(path.join(ROOT, "next.config.ts"), "utf8");
const redirects = new Map();
const re = /source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"/g;
let m;
while ((m = re.exec(cfg))) {
  const [, src, dest] = m;
  if (src.includes(":")) continue; // skip wildcard (/blog/tag/:slug*)
  redirects.set(src, dest);
}

// internal hosts we normalise to root-relative
const HOST_RE = /^https?:\/\/(www\.)?theproudpaintbrush\.com/i;

function canonicalize(url) {
  // returns the rewritten href, or the same url if nothing to do
  let href = url;
  let changed = false;
  // strip internal host -> root-relative
  if (HOST_RE.test(href)) {
    href = href.replace(HOST_RE, "");
    if (href === "") href = "/";
    changed = true;
  }
  // only touch root-relative internal paths
  if (!href.startsWith("/")) return { href: url, changed: false };
  // split off fragment / query
  const mm = href.match(/^([^?#]*)([?#].*)?$/);
  let pathPart = mm[1];
  const tail = mm[2] || "";
  // resolve one redirect hop (and a second only if the first dest is itself a source — guard against loops)
  const seen = new Set();
  while (redirects.has(pathPart) && !seen.has(pathPart)) {
    seen.add(pathPart);
    pathPart = redirects.get(pathPart);
    changed = true;
  }
  return { href: pathPart + tail, changed };
}

const HREF_RE = /href="([^"]+)"/g;
let filesChanged = 0;
let linksChanged = 0;
const report = [];

function processString(s) {
  return s.replace(HREF_RE, (full, url) => {
    const { href, changed } = canonicalize(url);
    if (changed) {
      linksChanged++;
      report.push(`${url}  ->  ${href}`);
      return `href="${href}"`;
    }
    return full;
  });
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name.endsWith(".json")) processFile(p);
  }
}

function processFile(file) {
  const raw = fs.readFileSync(file, "utf8");
  let json;
  try { json = JSON.parse(raw); } catch { return; }
  const before = linksChanged;
  const recurse = (v) => {
    if (typeof v === "string") return processString(v);
    if (Array.isArray(v)) return v.map(recurse);
    if (v && typeof v === "object") {
      for (const k of Object.keys(v)) v[k] = recurse(v[k]);
      return v;
    }
    return v;
  };
  const out = recurse(json);
  if (linksChanged > before) {
    filesChanged++;
    if (WRITE) fs.writeFileSync(file, JSON.stringify(out, null, 2) + "\n");
  }
}

walk(path.join(ROOT, "content"));

// summarise
const counts = {};
for (const line of report) counts[line] = (counts[line] || 0) + 1;
const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
console.log(`${WRITE ? "APPLIED" : "DRY RUN"} — ${linksChanged} internal links across ${filesChanged} files\n`);
for (const [line, n] of sorted) console.log(`  ${n}×  ${line}`);
