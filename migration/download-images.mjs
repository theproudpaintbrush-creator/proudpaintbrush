// Download every original Squarespace content image locally, resize to max
// 1600px WebP, and write a URL->local-path manifest used to re-wire pages.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = "public/images/migrated";
fs.mkdirSync(OUT, { recursive: true });
const MANIFEST = "migration/image-map.json";
const existing = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

function walk(d) { let o = []; for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = d + "/" + e.name; if (e.isDirectory()) o.push(...walk(p)); else if (e.name.endsWith(".html")) o.push(p); } return o; }

// collect unique content-image URLs (strip query, skip logos/icons/svg)
const urls = new Set();
for (const f of walk("scrape/raw")) {
  const h = fs.readFileSync(f, "utf8");
  for (const m of h.matchAll(/(?:data-src|data-image|src)="(https:\/\/images\.squarespace-cdn\.com\/[^"]+)"/g)) {
    const u = m[1].split("?")[0];
    if (/logo|favicon|icon|\.svg$/i.test(u)) continue;
    urls.add(u);
  }
}
const list = [...urls];
console.log("unique content images to fetch:", list.length);

// build collision-safe local names from the SEO filename + a short id from the GUID segment
const nameUsed = new Map();
function localName(u) {
  const parts = u.split("/");
  const file = decodeURIComponent(parts.pop());
  const guid = parts.pop() || "";
  const base = file.replace(/\.[a-z0-9]+$/i, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "image";
  let name = base;
  if (nameUsed.has(name) && nameUsed.get(name) !== u) name = `${base}-${guid.slice(0, 6).toLowerCase().replace(/[^a-z0-9]/g, "")}`;
  nameUsed.set(name, u);
  return name + ".webp";
}

let done = 0, ok = 0, fail = 0, skip = 0;
const cap = 6;
let i = 0;
async function worker() {
  while (i < list.length) {
    const idx = i++;
    const u = list[idx];
    done++;
    if (existing[u] && fs.existsSync("public" + existing[u].replace(/^\/images/, "/images"))) { skip++; continue; }
    const name = localName(u);
    const outPath = path.join(OUT, name);
    try {
      const res = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0 (content-migration; owner-authorized)" } });
      if (!res.ok) { fail++; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(outPath);
      existing[u] = `/images/migrated/${name}`;
      ok++;
      if (ok % 25 === 0) { fs.writeFileSync(MANIFEST, JSON.stringify(existing, null, 2)); console.log(`  ${done}/${list.length} (ok ${ok}, fail ${fail})`); }
    } catch (e) { fail++; }
    await new Promise((r) => setTimeout(r, 60));
  }
}
await Promise.all(Array.from({ length: cap }, worker));
fs.writeFileSync(MANIFEST, JSON.stringify(existing, null, 2));
console.log(`DONE. mapped ${Object.keys(existing).length} images (ok ${ok}, skipped ${skip}, failed ${fail}). Manifest: ${MANIFEST}`);
