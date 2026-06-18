// One-off: convert selected real commercial job photos from the owner's
// Pictures folder into optimized WebP under public/images/commercial/.
// Run: node scripts/convert-commercial-photos.mjs
import { mkdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const SRC = "C:/Users/Chris/Pictures/proudpaintbrush-photos/commercial";
const OUT = "public/images/commercial";
const MAX_W = 1600;
const Q = 80;

// source filename (in SRC) -> output slug (in OUT, .webp appended)
const FILES = [
  ["commercial-building-exterior-repaint-street-view.jpg", "commercial-building-exterior-repaint-street-view"],
  ["chamber-of-commerce-lobby-interior-repaint.jpg", "chamber-of-commerce-lobby-interior-repaint"],
  ["commercial-building-facade-painting.jpg", "commercial-building-facade-painting"],
  ["commercial-conference-room-accent-wall-repaint.jpg", "commercial-conference-room-accent-wall-repaint"],
  ["commercial-office-corridor-repaint.jpg", "commercial-office-corridor-repaint"],
  ["commercial-gym-interior-repaint-1.jpg", "commercial-gym-interior-repaint"],
  ["commercial-hallway-glass-partition-repaint.jpg", "commercial-hallway-glass-partition-repaint"],
  ["commercial-retail-store-interior-painting.jpeg", "commercial-retail-store-interior-painting"],
  ["warehouse-stay-clear-floor-marking.jpeg", "warehouse-stay-clear-floor-marking"],
  ["painter-spraying-commercial-building-sign-west-houston-tx.jpg", "painter-spraying-commercial-building-sign-west-houston-tx"],
];

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

for (const [src, slug] of FILES) {
  const inPath = join(SRC, src);
  const outPath = join(OUT, `${slug}.webp`);
  try {
    const pipe = sharp(inPath, { failOn: "none" }).rotate().resize({ width: MAX_W, withoutEnlargement: true });
    const buf = await pipe.webp({ quality: Q }).toBuffer();
    const meta = await sharp(buf).metadata();
    const { writeFileSync } = await import("node:fs");
    writeFileSync(outPath, buf);
    console.log(`${slug}.webp  ${meta.width}x${meta.height}  ${(buf.length / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.warn("FAIL", src, e.message);
  }
}
console.log("done");
