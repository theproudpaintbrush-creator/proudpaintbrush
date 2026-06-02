import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const PAGES = [
  "portfolio",
  "portfolio/interior-painting",
  "portfolio/exterior-painting",
  "portfolio/cabinet-painting",
];

// filename substrings that mark people / customer / process / non-finished shots
const DROP = [
  "satisfied-customer", "happy-customer", "happy-couple", "happy-customers", "homeowner",
  "core-values-happy", "house-painters-og", "-og-1200", "og-212922", "-og-", "-og.",
  "painter-working", "painters-working", "two-painters", "painter-teal", "-painter-",
  "customer", "testimonial", "-sign", "before-", "masking", "primer", "primed",
  "spray-booth", "spraying", "degreas", "prep-", "-prep",
];

function rgb2hsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0; const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
  }
  return { h, s, l };
}

// family rank for rainbow ordering; neutrals last
function family(h, s, l) {
  if (s < 0.12 || l > 0.92 || l < 0.08) return { rank: 8, name: "neutral" };
  if (h >= 345 || h < 15) return { rank: 0, name: "red" };
  if (h < 45) return { rank: 1, name: "orange" };
  if (h < 65) return { rank: 2, name: "yellow" };
  if (h < 160) return { rank: 3, name: "green" };
  if (h < 195) return { rank: 4, name: "teal" };
  if (h < 255) return { rank: 5, name: "blue" };
  if (h < 290) return { rank: 6, name: "violet" };
  return { rank: 7, name: "pink" };
}

const file = (k) => path.join(process.cwd(), "content", "pages", k + ".json");

for (const key of PAGES) {
  const p = JSON.parse(fs.readFileSync(file(key), "utf-8"));
  const gallery = p.gallery || [];
  const seenHash = new Set();
  const kept = [];
  let dropFilter = 0, dropDup = 0, dropMissing = 0;

  for (const item of gallery) {
    const name = item.src.toLowerCase();
    if (DROP.some((k) => name.includes(k))) { dropFilter++; continue; }
    const fp = path.join(process.cwd(), "public", item.src);
    if (!fs.existsSync(fp)) { dropMissing++; continue; }
    const buf = fs.readFileSync(fp);
    const hash = crypto.createHash("md5").update(buf).digest("hex");
    if (seenHash.has(hash)) { dropDup++; continue; }
    seenHash.add(hash);
    let fam = { rank: 8, name: "neutral" }, hue = 0;
    try {
      const st = await sharp(buf).stats();
      const d = st.dominant;
      const { h, s, l } = rgb2hsl(d.r, d.g, d.b);
      hue = h; fam = family(h, s, l);
    } catch {}
    kept.push({ ...item, _rank: fam.rank, _fam: fam.name, _hue: hue });
  }

  // sort by color family (rainbow), then hue within family
  kept.sort((a, b) => a._rank - b._rank || a._hue - b._hue);

  // interior portfolio: cap cabinet-named photos (they have their own page)
  let final = kept;
  if (key === "portfolio/interior-painting") {
    let cab = 0;
    final = kept.filter((x) => {
      if (x.src.toLowerCase().includes("cabinet")) { cab++; return cab <= 4; }
      return true;
    });
  }

  const dist = {};
  final.forEach((x) => { dist[x._fam] = (dist[x._fam] || 0) + 1; });

  console.log(`=== ${key} ===`);
  console.log(`  in:${gallery.length}  kept:${final.length}  (dropped filter:${dropFilter} dup:${dropDup} missing:${dropMissing}${key.includes("interior") ? " +cabinet-cap" : ""})`);
  console.log(`  color dist:`, JSON.stringify(dist));

  // write curated gallery back (strip helper fields)
  p.gallery = final.map(({ src, alt }) => ({ src, alt }));
  fs.writeFileSync(file(key), JSON.stringify(p, null, 2));
}
console.log("CURATION DONE");
