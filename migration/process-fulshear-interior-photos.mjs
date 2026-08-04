import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "/root/.claude/uploads/286dcb9d-777c-5225-96b5-4dd0af38caa6";
const DEST = path.join(process.cwd(), "public", "images", "migrated");
const dimsFile = path.join(process.cwd(), "migration", "image-dims.json");

const FILES = {
  "0e5f31b2-1000038238.jpg": "primary-bedroom-before-repaint-move-in-day-fulshear-tx.webp",
  "baaadf69-1000038240.jpg": "open-concept-kitchen-builder-white-before-repaint-fulshear-tx.webp",
  "35943ec6-1000038241.jpg": "empty-bedroom-moving-boxes-before-repaint-fulshear-tx.webp",
  "47670292-1000038239.jpg": "primary-bathroom-before-repaint-fulshear-tx.webp",
  "20f029c7-1000038245.jpg": "home-office-dark-accent-wall-before-repaint-fulshear-tx.webp",
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
