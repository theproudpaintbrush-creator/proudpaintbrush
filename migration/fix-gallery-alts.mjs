// One-off: rewrite filename-style gallery alt text into descriptive, accessible alt.
// Derives alt from the (descriptive) image slug; falls back to a generic, accurate
// per-page label for camera/social dumps that carry no descriptive filename.
// Usage: node migration/fix-gallery-alts.mjs [--write]
import fs from "node:fs";
import path from "node:path";

const WRITE = process.argv.includes("--write");
const PAGES_DIR = path.join(process.cwd(), "content", "pages");

const SMALL = new Set(["and", "or", "the", "in", "of", "a", "to", "with", "for", "on"]);
const DROP = new Set([
  "og", "whatsapp", "image", "img", "at", "screenshot", "photo", "pxl", "dsc",
  "mvimg", "n", "final", "edited", "copy", "thumb", "thumbs",
]);

function looksLikeFilename(alt, src) {
  if (/\.(jpe?g|png|webp|gif)$/i.test(alt)) return true;       // ends in extension
  if (!/\s/.test(alt) && /[-_]/.test(alt)) return true;         // no spaces, has separators
  return false;
}

function genericFor(key) {
  if (key.includes("interior")) return "Interior painting project by The Proud Paintbrush in Fort Bend County, TX";
  if (key.includes("exterior")) return "Exterior painting project by The Proud Paintbrush in Fort Bend County, TX";
  if (key.includes("cabinet")) return "Cabinet painting project by The Proud Paintbrush in Fort Bend County, TX";
  return "Painting project by The Proud Paintbrush in Fort Bend County, TX";
}

function cleanAlt(src, key, idx) {
  let base = src.split("/").pop().replace(/\.(jpe?g|png|webp|gif)$/i, "");
  base = base.replace(/\((\d+)\)/g, " "); // drop "(1)"
  let tokens = base.split(/[-_]+/).filter(Boolean).filter((t) => {
    const l = t.toLowerCase();
    if (DROP.has(l)) return false;
    if (/^\d+$/.test(t)) return false;                 // pure numbers (IDs, dates, times)
    if (/^\d+x\d+$/.test(t)) return false;             // dimensions 1200x630
    if (/^[0-9a-f]{6,}$/i.test(t) && /[a-f]/i.test(t) && /\d/.test(t)) return false; // hex hashes
    return true;
  });
  const alphaWords = tokens.filter((t) => /[a-z]/i.test(t) && t.length >= 2);
  if (alphaWords.length < 2) return genericFor(key);   // no usable description -> generic
  const words = tokens.map((t, i) => {
    const l = t.toLowerCase();
    if (l === "tx") return "TX";
    if (i > 0 && SMALL.has(l)) return l;
    return t.charAt(0).toUpperCase() + t.slice(1);
  });
  let out = words.join(" ").replace(/\s+/g, " ").trim();
  // Light touch: ensure brand/location reads naturally if present as tokens
  out = out.replace(/\bThe Proud Paintbrush\b/gi, "The Proud Paintbrush");
  return out;
}

function walk(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...walk(p));
    else if (e.name.endsWith(".json")) out.push(p);
  }
  return out;
}

let totalChanged = 0;
const samples = [];
for (const file of walk(PAGES_DIR)) {
  const data = JSON.parse(fs.readFileSync(file, "utf-8"));
  if (!Array.isArray(data.gallery) || data.gallery.length === 0) continue;
  let changed = 0;
  data.gallery.forEach((g, i) => {
    if (!g.src || !g.alt) return;
    if (!looksLikeFilename(g.alt, g.src)) return;
    const next = cleanAlt(g.src, data.key, i);
    if (next && next !== g.alt) {
      if (samples.length < 30) samples.push(`  [${data.key}] "${g.alt}"\n      -> "${next}"`);
      g.alt = next;
      changed++;
    }
  });
  if (changed) {
    totalChanged += changed;
    console.log(`${data.key}: ${changed} alts rewritten`);
    if (WRITE) fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  }
}
console.log(`\nTotal alts rewritten: ${totalChanged} (${WRITE ? "WRITTEN" : "DRY RUN"})`);
console.log("\nSample:");
console.log(samples.join("\n"));
