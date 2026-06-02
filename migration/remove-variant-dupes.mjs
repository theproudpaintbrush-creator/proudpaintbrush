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
removeFigs("portfolio", ["white-crisp-kitchen-cabinets.webp", "custom-drywall-entertainment-center-sugar-land-angle-2.webp"]);
removeFigs("portfolio/interior-painting", ["custom-drywall-entertainment-center-sugar-land-angle-2.webp"]);
removeFigs("portfolio/exterior-painting", ["bright-stucco-home-painting-sugar-land-portfolio-2a1fe4.webp", "fence-staining-sugar-land-the-proud-paintbrush-2.webp", "fence-staining-sugar-land-the-proud-paintbrush-3.webp"]);
