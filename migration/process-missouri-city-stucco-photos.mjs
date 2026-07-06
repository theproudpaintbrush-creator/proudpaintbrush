import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "C:\\Users\\Chris\\Pictures\\proudpaintbrush-photos\\exterior\\before-after";
const DEST = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");

const FILES = {
  "tan-stucco-front-entry-exterior-before-repaint-missouri-city-tx-02.jpg": "tan-stucco-front-entry-exterior-before-repaint-missouri-city-tx.webp",
  "charcoal-stucco-front-entry-exterior-after-repaint-missouri-city-tx-01.jpg": "charcoal-stucco-front-entry-exterior-after-repaint-missouri-city-tx.webp",
  "tan-stucco-garage-exterior-before-repaint-missouri-city-tx-01.jpg": "tan-stucco-garage-exterior-before-repaint-missouri-city-tx.webp",
  "charcoal-stucco-garage-exterior-after-repaint-missouri-city-tx-02.jpg": "charcoal-stucco-garage-exterior-after-repaint-missouri-city-tx.webp",
  "tan-stucco-double-garage-exterior-before-repaint-missouri-city-tx-03.jpg": "tan-stucco-double-garage-exterior-before-repaint-missouri-city-tx.webp",
  "charcoal-stucco-double-garage-exterior-after-repaint-missouri-city-tx-03.jpg": "charcoal-stucco-double-garage-exterior-after-repaint-missouri-city-tx.webp",
  "charcoal-stucco-backyard-exterior-after-repaint-missouri-city-tx-05.jpg": "charcoal-stucco-backyard-exterior-after-repaint-missouri-city-tx.webp",
};

const dims = JSON.parse(fs.readFileSync(dimsFile, "utf-8"));
const results = {};

for (const [srcName, destName] of Object.entries(FILES)) {
  const srcPath = path.join(SRC, srcName);
  const destPath = path.join(DEST, destName);
  if (!fs.existsSync(srcPath)) throw new Error(`missing source: ${srcPath}`);

  const img = sharp(srcPath).rotate();
  const meta = await img.metadata();
  const targetWidth = Math.min(1600, meta.width);

  await img
    .resize({ width: targetWidth })
    .webp({ quality: 82 })
    .toFile(destPath);

  const outMeta = await sharp(destPath).metadata();
  results[destName] = { w: outMeta.width, h: outMeta.height };
  dims[`/images/migrated/${destName}`] = { w: outMeta.width, h: outMeta.height };
  console.log(`${destName}: ${outMeta.width}x${outMeta.height}, ${Math.round(fs.statSync(destPath).size / 1024)}KB`);
}

fs.writeFileSync(dimsFile, JSON.stringify(dims, null, 0));
console.log("image-dims.json updated");
console.log(JSON.stringify(results, null, 2));
