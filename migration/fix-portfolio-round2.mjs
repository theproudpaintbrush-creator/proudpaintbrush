import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const file = (k) => path.join(process.cwd(), "content", "pages", k + ".json");
const load = (k) => JSON.parse(fs.readFileSync(file(k), "utf-8"));
const save = (k, o) => fs.writeFileSync(file(k), JSON.stringify(o, null, 2));

const GRID_OPEN = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin:1.5rem 0;">`;

// returns {before, figures:[{html,src}], after}
function splitGrid(body) {
  const start = body.indexOf(GRID_OPEN);
  if (start === -1) throw new Error("grid not found");
  const contentStart = start + GRID_OPEN.length;
  const close = body.indexOf("</div>", contentStart);
  const inner = body.slice(contentStart, close);
  const figures = [...inner.matchAll(/<figure[\s\S]*?<\/figure>/g)].map((m) => ({
    html: m[0],
    src: (m[0].match(/<img src="([^"]+)"/) || [])[1],
  }));
  return {
    before: body.slice(0, start),
    figures,
    after: body.slice(close + "</div>".length),
  };
}
function rebuild(parts, figures) {
  return parts.before + GRID_OPEN + figures.map((f) => f.html).join("") + "</div>" + parts.after;
}

async function dHash(fp) {
  const buf = await sharp(fp).resize(9, 8, { fit: "fill" }).grayscale().raw().toBuffer();
  let bits = 0n;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const i = r * 9 + c;
      bits = (bits << 1n) | (buf[i] > buf[i + 1] ? 1n : 0n);
    }
  }
  return bits;
}
const ham = (a, b) => { let x = a ^ b, c = 0; while (x) { c += Number(x & 1n); x >>= 1n; } return c; };

/* ---------- INTERIOR: hero + drop painter/og ---------- */
{
  const p = load("portfolio/interior-painting");
  let b = p.bodyHtml;
  b = b.replace(
    `<h2>Interior Painting Portfolio</h2>`,
    `<img src="/images/migrated/color-drenched-living-room-walls-ceiling-trim-rosenberg-tx.webp" alt="Freshly painted living room with color-drenched walls, ceiling, and trim in Rosenberg, Texas" width="1600" height="1200" loading="eager"><h2>Interior Painting Portfolio</h2>`
  );
  const parts = splitGrid(b);
  const before = parts.figures.length;
  const figs = parts.figures.filter((f) => !/painter|meet-our|\/og-|-og-/i.test(f.src));
  b = rebuild(parts, figs);
  p.bodyHtml = b;
  save("portfolio/interior-painting", p);
  console.log(`interior: hero added, gallery ${before} -> ${figs.length}`);
}

/* ---------- EXTERIOR: hero + drop painter/customer/og ---------- */
{
  const p = load("portfolio/exterior-painting");
  let b = p.bodyHtml;
  b = b.replace(
    `<h2>Exterior Painting Portfolio</h2>`,
    `<img src="/images/migrated/bright-stucco-home-painting-sugar-land-portfolio.webp" alt="Freshly painted crisp white and black two-story stucco home exterior in Sugar Land by The Proud Paintbrush" width="1000" height="750" loading="eager"><h2>Exterior Painting Portfolio</h2>`
  );
  const parts = splitGrid(b);
  const before = parts.figures.length;
  const figs = parts.figures.filter((f) => !/painter|customer|homeowner|happy|satisfied|couple|meet-our|\/og-|-og-/i.test(f.src));
  b = rebuild(parts, figs);
  p.bodyHtml = b;
  save("portfolio/exterior-painting", p);
  console.log(`exterior: hero added, gallery ${before} -> ${figs.length}`);
}

/* ---------- CABINET: remove near-duplicates + last photo ---------- */
{
  const p = load("portfolio/cabinet-painting");
  let b = p.bodyHtml;
  const parts = splitGrid(b);
  const before = parts.figures.length;
  // compute dHash per figure
  const hashes = [];
  for (const f of parts.figures) {
    const fp = path.join(process.cwd(), "public", f.src);
    try { hashes.push(await dHash(fp)); } catch { hashes.push(null); }
  }
  const kept = [];
  const keptHashes = [];
  let removedDup = 0;
  for (let i = 0; i < parts.figures.length; i++) {
    const h = hashes[i];
    const dup = h != null && keptHashes.some((kh) => kh != null && ham(kh, h) <= 6);
    if (dup) { removedDup++; continue; }
    kept.push(parts.figures[i]);
    keptHashes.push(h);
  }
  // remove last photo
  const removedLast = kept.length ? kept.pop() : null;
  b = rebuild(parts, kept);
  p.bodyHtml = b;
  save("portfolio/cabinet-painting", p);
  console.log(`cabinet: gallery ${before} -> ${kept.length} (near-dupes removed: ${removedDup}, last removed: ${removedLast ? removedLast.src.replace(/.*\//, "") : "none"})`);
}

console.log("ROUND2 DONE");
