// Precompute intrinsic width/height for every local image so generators can
// bake them into <img> tags (eliminates Cumulative Layout Shift / improves CWV).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const out = {};

async function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, e.name);
    if (e.isDirectory()) { await walk(abs); continue; }
    if (!/\.(webp|jpg|jpeg|png)$/i.test(e.name)) continue;
    const rel = "/" + path.relative("public", abs).replace(/\\/g, "/");
    try {
      const m = await sharp(abs).metadata();
      if (m.width && m.height) out[rel] = { w: m.width, h: m.height };
    } catch {}
  }
}

await walk(ROOT);
fs.writeFileSync("migration/image-dims.json", JSON.stringify(out));
console.log(`measured ${Object.keys(out).length} images -> migration/image-dims.json`);
