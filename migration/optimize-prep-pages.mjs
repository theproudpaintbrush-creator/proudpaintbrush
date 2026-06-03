// Optimize the prep hub + exterior prep page: fix meta/links, swap mismatched
// lead photo, remove customer-sign grids, extract hub FAQs, spread photos evenly.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "pages");
const read = (k) => JSON.parse(fs.readFileSync(path.join(dir, `${k}.json`), "utf-8"));
const write = (k, o) => fs.writeFileSync(path.join(dir, `${k}.json`), JSON.stringify(o, null, 2) + "\n");
const stripSignGrid = (html) => html.replace(/<ul>(?:(?!<\/ul>)[\s\S])*?<img[\s\S]*?<\/ul>/g, "");

// re-inject a list of full <img> tags evenly across the body (top + headings + end)
function spread(body, tags) {
  let b = body.replace(/<img\b[^>]*>/g, "").replace(/<p>\s*<\/p>/g, "").replace(/\s{2,}/g, " ").trim();
  const segs = b.split(/(?=<h2|<h3)/);
  const n = tags.length;
  const slots = tags.map((_, j) => (n === 1 ? Math.round(segs.length / 2) : Math.round((j * segs.length) / (n - 1))));
  for (let j = 1; j < slots.length; j++) if (slots[j] <= slots[j - 1]) slots[j] = Math.min(slots[j - 1] + 1, segs.length);
  let out = "";
  for (let i = 0; i <= segs.length; i++) {
    slots.forEach((s, j) => { if (s === i) out += tags[j]; });
    if (i < segs.length) out += segs[i];
  }
  return out;
}

// ---------- HUB: /preparation-process ----------
{
  const p = read("preparation-process");
  p.metaDescription = p.metaDescription.replace(/\s+$/g, "").trim();
  let b = stripSignGrid(p.bodyHtml)
    .replace(/\/preperation-process\/interior/g, "/preparation-process/interior")
    .replace(/\/preperation-process\/exterior/g, "/preparation-process/exterior");
  const tags = b.match(/<img\b[^>]*>/g) || [];
  p.bodyHtml = spread(b, tags);
  p.faqs = [
    { q: "Why does preparation take time before painting begins?", a: "Preparation ensures surfaces are clean, stable, and ready to accept paint. Skipping or rushing prep often leads to peeling, uneven finishes, and early repainting." },
    { q: "Is preparation different for interior and exterior painting?", a: "Yes. Interior preparation focuses on smooth surfaces and protecting living spaces, while exterior preparation focuses on moisture control, surface stability, and weather exposure." },
    { q: "Can preparation steps be skipped to lower the cost?", a: "Skipping preparation often results in paint failure and additional repairs later. Proper preparation protects your investment and reduces long-term costs." },
    { q: "How do I know what preparation my project needs?", a: "Preparation requirements depend on surface condition, location, and scope. We evaluate this during the consultation and explain what is required before work begins." },
  ];
  write("preparation-process", p);
  console.log(`✓ hub: meta trimmed, preperation-typo links fixed, sign grid removed, 4 FAQs added, ${tags.length} photos spread`);
}

// ---------- EXTERIOR: /preparation-process/exterior ----------
{
  const p = read("preparation-process/exterior");
  p.metaDescription = p.metaDescription.replace(/\s+$/g, "").trim();
  let b = stripSignGrid(p.bodyHtml).replace('href="/painting-services/exterior-painting"', 'href="/exterior-painting"');
  // build a proper EXTERIOR lead photo and swap it for the mismatched interior living-room
  const lead = "richmond-tx-exterior-house-painting-prep-process.webp";
  const m = await sharp(path.join(process.cwd(), "public", "images", "migrated", lead)).metadata();
  const leadTag = `<img src="/images/migrated/${lead}" alt="Exterior house painting preparation and surface prep in Richmond, TX by The Proud Paintbrush" width="${m.width}" height="${m.height}" loading="lazy">`;
  const tags = b.match(/<img\b[^>]*>/g) || [];
  // replace the first (interior living-room) tag with the exterior lead
  if (tags.length) tags[0] = leadTag;
  p.bodyHtml = spread(b, tags);
  write("preparation-process/exterior", p);
  console.log(`✓ exterior: meta trimmed, lead photo -> exterior, /painting-services link fixed, sign grid removed, ${tags.length} photos spread`);
}
console.log("\nPrep-page optimization done.");
