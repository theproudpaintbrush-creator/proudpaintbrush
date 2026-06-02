import fs from "node:fs";
import path from "node:path";

function removeFigs(key, names) {
  const f = path.join(process.cwd(), "content", "pages", key + ".json");
  const o = JSON.parse(fs.readFileSync(f, "utf-8"));
  let b = o.bodyHtml, removed = 0;
  for (const n of names) {
    const figs = [...b.matchAll(/<figure [\s\S]*?<\/figure>/g)];
    const hit = figs.find((m) => m[0].includes(n));
    if (hit) { b = b.replace(hit[0], ""); removed++; }
    else console.log("  MISS:", n);
  }
  o.bodyHtml = b;
  fs.writeFileSync(f, JSON.stringify(o, null, 2));
  const left = [...b.matchAll(/<figure /g)].length;
  console.log(`${key}: removed ${removed}, gallery now ${left}`);
}

removeFigs("portfolio/interior-painting", [
  "20250403-104500.webp",
  "photo-2023-05-26-07-30-31.webp",
  "popcorn-ceiling-removal-sugar-land-portfolio.webp",
  "door-trim-detail-painting-sugar-land-portfolio.webp",
  "img-20240422-072849-711.webp",
  "photo-2023-12-19-09-05-50.webp",
  "323903862-872687037411537-1257918806402882429-n-172287.webp",
  "20230809-153251.webp",
]);

removeFigs("portfolio/exterior-painting", [
  "20220427-143527-169531.webp",
  "20251002-182140.webp",
  "img-20240319-083111-854.webp",
  "photo-2023-12-19-09-16-44.webp",
  "img-20240416-111015-828-78d32c.webp",
  "whatsapp-image-2025-07-21-at-07-22-43-7fc7946c.webp",
  "photo-2025-05-28-14-14-12-768be4.webp",
  "paint-it-forward-sugar-land-6.webp",
  "photo-2024-10-24-16-32-14.webp",
  "img-20230601-094920-413.webp",
  "photo-2023-10-21-15-29-22.webp",
  "photo-2024-10-11-12-20-51.webp",
]);
