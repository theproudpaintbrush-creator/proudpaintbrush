// One-off image optimizer. Re-encodes large raster images in public/images IN
// PLACE (same filename/path, so no code references change), capping dimensions
// and quality. JPGs are the main offenders (110MB across 128 files). Run with:
//   npm install --no-save sharp && node scripts/compress-images.mjs
import { readdirSync, statSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const ROOT = "public/images";
const MAX_DIM = 2000;        // cap longest side
const JPG_Q = 80;
const PNG_MIN = 1_000_000;   // only touch pngs over 1MB
const JPG_MIN = 400_000;     // only touch jpgs over 400KB

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) yield* walk(p);
    else yield [p, st.size];
  }
}

let before = 0, after = 0, count = 0;
for (const [file, size] of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  const isJpg = ext === ".jpg" || ext === ".jpeg";
  const isPng = ext === ".png";
  if (!isJpg && !isPng) continue;
  if (isJpg && size < JPG_MIN) continue;
  if (isPng && size < PNG_MIN) continue;
  try {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();
    let pipe = img.rotate();
    if (Math.max(meta.width || 0, meta.height || 0) > MAX_DIM) {
      pipe = pipe.resize({ width: MAX_DIM, height: MAX_DIM, fit: "inside", withoutEnlargement: true });
    }
    const buf = isJpg
      ? await pipe.jpeg({ quality: JPG_Q, mozjpeg: true }).toBuffer()
      : await pipe.png({ compressionLevel: 9, palette: true }).toBuffer();
    if (buf.length < size) {
      const { writeFileSync } = await import("node:fs");
      writeFileSync(file, buf);
      before += size; after += buf.length; count++;
      console.log(`${(size/1048576).toFixed(2)}MB -> ${(buf.length/1048576).toFixed(2)}MB  ${file}`);
    }
  } catch (e) {
    console.warn("skip", file, e.message);
  }
}
console.log(`\nDone. ${count} files. ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(1)}MB (saved ${((before-after)/1048576).toFixed(1)}MB)`);
