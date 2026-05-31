import fs from "node:fs";
import path from "node:path";

let cache: Record<string, { w: number; h: number }> | null = null;

// Intrinsic width/height for a local image path (e.g. "/images/foo.webp"),
// used to set width/height attributes and prevent layout shift (CLS).
export function imageDims(src: string | undefined): { w: number; h: number } | undefined {
  if (!src) return undefined;
  if (!cache) {
    try {
      cache = JSON.parse(fs.readFileSync(path.join(process.cwd(), "migration", "image-dims.json"), "utf8"));
    } catch {
      cache = {};
    }
  }
  return cache![src];
}
