import fs from "node:fs";
import path from "node:path";

function removeFigs(key, names) {
  const f = path.join(process.cwd(), "content", "pages", key + ".json");
  const o = JSON.parse(fs.readFileSync(f, "utf-8"));
  let b = o.bodyHtml, removed = 0;
  for (const n of names) {
    const figs = [...b.matchAll(/<figure [\s\S]*?<\/figure>/g)];
    const hit = figs.find((m) => m[0].includes(n));
    if (hit) { b = b.replace(hit[0], ""); removed++; } else console.log("  MISS:", n);
  }
  o.bodyHtml = b;
  fs.writeFileSync(f, JSON.stringify(o, null, 2));
  console.log(`${key}: removed ${removed}, gallery now ${[...b.matchAll(/<figure /g)].length}`);
}

removeFigs("portfolio/interior-painting", [
  "img-20240127-101446-128.webp",
  "img-20240424-092249-947.webp",
  "img-20240506-061409-258.webp",
  "img-20240506-061419-121-171560.webp",
  "20240524-135938.webp",
  "20240524-135945.webp",
  "20240524-140030.webp",
  "20240524-140038.webp",
  "whatsapp-image-2025-07-21-at-07-22-49-00d9068e.webp",
]);

removeFigs("portfolio/exterior-painting", [
  "photo-2023-03-29-17-46-24.webp",
  "photo-2023-03-29-17-50-01-169531.webp",
  "img-20240702-082031-158.webp",
]);
