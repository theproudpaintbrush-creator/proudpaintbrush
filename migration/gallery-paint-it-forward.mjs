// Paint It Forward: turn the big stacked photo groups into compact gallery grids,
// fix the /preperation-process typo link, trim meta, add FAQ schema.
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "pages", "paint-it-forward.json");
const p = JSON.parse(fs.readFileSync(file, "utf-8"));

p.metaDescription = p.metaDescription.replace(/\s+$/g, "").trim();

let b = p.bodyHtml.replace(/\/preperation-process/g, "/preparation-process");

// wrap any run of 2+ consecutive <img> tags into a responsive thumbnail grid
let groups = 0;
b = b.replace(/(?:<img\b[^>]*>\s*){2,}/g, (run) => {
  const imgs = run.match(/<img\b[^>]*>/g) || [];
  groups++;
  const styled = imgs.map((t) =>
    t.replace(/^<img /, '<img style="margin:0;height:200px;width:100%;object-fit:cover;border-radius:8px" ')
  );
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px;margin:1.5rem 0">${styled.join("")}</div>`;
});
p.bodyHtml = b;

p.faqs = [
  { q: "What is the Paint It Forward program?", a: "Paint It Forward is a community initiative by The Proud Paintbrush in Sugar Land, TX, providing free painting services to people or organizations in need." },
  { q: "Who can I nominate for Paint It Forward?", a: "You can nominate anyone — a neighbor, family member, nonprofit, or community space — that would benefit from a refreshed, newly painted space." },
  { q: "How are Paint It Forward recipients chosen?", a: "Recipients are chosen based on need, community impact, and how much a paint refresh can help improve their living or working environment." },
  { q: "How often does The Proud Paintbrush do Paint It Forward projects?", a: "Typically once or twice per year, depending on resources, nominations, and community involvement." },
];

fs.writeFileSync(file, JSON.stringify(p, null, 2) + "\n");
console.log(`✓ paint-it-forward: ${groups} photo groups wrapped into galleries, typo link fixed, meta trimmed, ${p.faqs.length} FAQs added`);
console.log(`  total imgs: ${(p.bodyHtml.match(/<img/g) || []).length} | gallery divs: ${(p.bodyHtml.match(/grid-template-columns/g) || []).length}`);
