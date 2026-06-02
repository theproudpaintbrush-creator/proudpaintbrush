import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const OUT = path.join(process.cwd(), "migration", "sheets");
fs.mkdirSync(OUT, { recursive: true });

const PAGES = process.argv.slice(2);
const TILE = 240, GAP = 6, COLS = 5, PER = 15;

function labelSvg(i) {
  return Buffer.from(
    `<svg width="40" height="22"><rect width="40" height="22" rx="4" fill="black" fill-opacity="0.72"/><text x="20" y="16" font-size="14" fill="white" text-anchor="middle" font-family="Arial">${i}</text></svg>`
  );
}

for (const key of PAGES) {
  const p = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "pages", key + ".json"), "utf-8"));
  const srcs = [...p.bodyHtml.matchAll(/<figure [^>]*><img src="([^"]+)"/g)].map((m) => m[1]);
  const safe = key.replace(/\//g, "_");
  const mapping = [];
  let sheet = 0;
  for (let off = 0; off < srcs.length; off += PER, sheet++) {
    const chunk = srcs.slice(off, off + PER);
    const rows = Math.ceil(chunk.length / COLS);
    const W = COLS * (TILE + GAP) + GAP;
    const H = rows * (TILE + GAP) + GAP;
    const tiles = [];
    for (let j = 0; j < chunk.length; j++) {
      const idx = off + j;
      const fp = path.join(process.cwd(), "public", chunk[j]);
      const r = Math.floor(j / COLS), c = j % COLS;
      try {
        const buf = await sharp(fp).resize(TILE, TILE, { fit: "cover" }).composite([{ input: labelSvg(idx), top: 3, left: 3 }]).png().toBuffer();
        tiles.push({ input: buf, top: GAP + r * (TILE + GAP), left: GAP + c * (TILE + GAP) });
      } catch {}
      mapping.push(`${idx}\t${chunk[j].replace(/.*\//, "")}`);
    }
    const file = path.join(OUT, `${safe}-${sheet}.png`);
    await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(tiles).png().toFile(file);
    console.log("wrote", file, `(idx ${off}-${off + chunk.length - 1})`);
  }
  fs.writeFileSync(path.join(OUT, `${safe}-map.tsv`), mapping.join("\n"));
}
console.log("SHEETS DONE");
