import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PAGES = ["portfolio", "portfolio/interior-painting", "portfolio/exterior-painting", "portfolio/cabinet-painting"];
const GRID_OPEN = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin:1.5rem 0;">`;
const THRESH = 10;

function splitGrid(body) {
  const start = body.indexOf(GRID_OPEN);
  const contentStart = start + GRID_OPEN.length;
  const close = body.indexOf("</div>", contentStart);
  const inner = body.slice(contentStart, close);
  const figures = [...inner.matchAll(/<figure[\s\S]*?<\/figure>/g)].map((m) => ({
    html: m[0],
    src: (m[0].match(/<img src="([^"]+)"/) || [])[1],
  }));
  return { before: body.slice(0, start), figures, after: body.slice(close + 6) };
}
const rebuild = (p, figs) => p.before + GRID_OPEN + figs.map((f) => f.html).join("") + "</div>" + p.after;

async function dHash(fp) {
  const buf = await sharp(fp).resize(9, 8, { fit: "fill" }).grayscale().raw().toBuffer();
  let bits = 0n;
  for (let r = 0; r < 8; r++) for (let c = 0; c < 8; c++) {
    const i = r * 9 + c;
    bits = (bits << 1n) | (buf[i] > buf[i + 1] ? 1n : 0n);
  }
  return bits;
}
const ham = (a, b) => { let x = a ^ b, c = 0; while (x) { c += Number(x & 1n); x >>= 1n; } return c; };

for (const key of PAGES) {
  const f = path.join(process.cwd(), "content", "pages", key + ".json");
  const o = JSON.parse(fs.readFileSync(f, "utf-8"));
  const parts = splitGrid(o.bodyHtml);
  const before = parts.figures.length;
  const keptHashes = [];
  const kept = [];
  const dropped = [];
  for (const fig of parts.figures) {
    let h = null;
    try { h = await dHash(path.join(process.cwd(), "public", fig.src)); } catch {}
    const dupIdx = h == null ? -1 : keptHashes.findIndex((kh) => kh != null && ham(kh, h) <= THRESH);
    if (dupIdx >= 0) { dropped.push(`${fig.src.replace(/.*\//, "")} ~ ${kept[dupIdx].src.replace(/.*\//, "")}`); continue; }
    keptHashes.push(h); kept.push(fig);
  }
  o.bodyHtml = rebuild(parts, kept);
  fs.writeFileSync(f, JSON.stringify(o, null, 2));
  console.log(`${key}: ${before} -> ${kept.length} (removed ${dropped.length})`);
  dropped.forEach((d) => console.log("   dup:", d));
}
console.log("DEDUPE DONE");
