// Follow-up tweaks: financing "Common Projects" -> service cards,
// remove a services photo, swap warranty cabinet photo for a nicer one.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, "content", "pages");
const dims = JSON.parse(fs.readFileSync(path.join(__dirname, "image-dims.json"), "utf8"));

function imgMeta(file) {
  const src = `/images/migrated/${file}`;
  if (!fs.existsSync(path.join(ROOT, "public", "images", "migrated", file)))
    throw new Error(`Image missing on disk: ${file}`);
  if (!dims[src]) throw new Error(`No dimensions for ${file}`);
  return { src, w: dims[src].w, h: dims[src].h };
}
function img(file, alt) {
  const m = imgMeta(file);
  return `<img src="${m.src}" alt="${alt}" width="${m.w}" height="${m.h}" loading="lazy">`;
}
function load(key) {
  const p = path.join(PAGES, `${key}.json`);
  return { p, data: JSON.parse(fs.readFileSync(p, "utf8")) };
}
function save(p, data) {
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}
function replaceOnce(html, find, repl, label) {
  const i = html.indexOf(find);
  if (i === -1) throw new Error(`[${label}] anchor not found`);
  if (html.indexOf(find, i + find.length) !== -1) throw new Error(`[${label}] anchor not unique`);
  return html.slice(0, i) + repl + html.slice(i + find.length);
}

const GRID_OPEN =
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:1.5rem;margin:2.5rem 0;">';
const GRID_CLOSE = "</div>";

// compact service card (small picture + description + button)
function miniCard({ file, alt, desc, href, cta }) {
  const m = imgMeta(file);
  return (
    '<div style="border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);display:flex;flex-direction:column;">' +
    `<img src="${m.src}" alt="${alt}" width="${m.w}" height="${m.h}" loading="lazy" style="width:100%;height:150px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;">` +
    '<div style="padding:1.25rem;display:flex;flex-direction:column;flex:1;">' +
    `<p style="font-size:0.95rem;line-height:1.55;color:#4b5563;margin:0 0 1.25rem;flex:1;">${desc}</p>` +
    `<a href="${href}" style="display:inline-block;text-align:center;background:#4B83B2;color:#fff;font-weight:600;padding:0.7rem 1rem;border-radius:0.5rem;text-decoration:none;margin-top:auto;">${cta}</a>` +
    "</div></div>"
  );
}

/* -------- FINANCING: Common Projects -> cards -------- */
{
  const { p, data } = load("financing");
  let h = data.bodyHtml;
  const start = '<img src="/images/migrated/sugar-land-tx-premium-interior-painting-bedroom.webp"';
  const endMarker = '<a href="/interior-painting/drywall-repair"> Learn More About Drywall Services </a>';
  const s = h.indexOf(start);
  const e = h.indexOf(endMarker);
  if (s === -1 || e === -1) throw new Error("[fin-common] block not found");
  const grid =
    "<h2>Common Projects Homeowners Finance</h2>" +
    GRID_OPEN +
    miniCard({
      file: "sugar-land-tx-premium-interior-painting-bedroom.webp",
      alt: "Freshly painted bedroom in Sugar Land, TX by The Proud Paintbrush",
      desc: "Whole-home repaints, wall color changes, ceilings, trim, doors, and occupied-home updates.",
      href: "/painting-services/interior-painting", cta: "Learn More About Interior Painting",
    }) +
    miniCard({
      file: "richmond-tx-spanish-style-exterior-house-painting.webp",
      alt: "Freshly painted luxury exterior home in Richmond, TX by The Proud Paintbrush",
      desc: "Pressure washing, prep work, caulking, priming, stucco painting, brick painting, and weather-resistant coatings.",
      href: "/painting-services/exterior-painting", cta: "Learn More About Exterior Painting",
    }) +
    miniCard({
      file: "sugar-land-tx-kitchen-cabinet-painting.webp",
      alt: "Freshly painted kitchen cabinets in Sugar Land, TX by The Proud Paintbrush",
      desc: "Factory-style cabinet finishes for kitchens, bathrooms, built-ins, and storage spaces.",
      href: "/painting-services/cabinet-painting", cta: "Learn More About Cabinet Painting",
    }) +
    miniCard({
      file: "sugar-land-tx-drywall-repair-texture-finishing.webp",
      alt: "Drywall repair and texture finishing in Sugar Land, TX by The Proud Paintbrush",
      desc: "Texture matching, seam repairs, water damage repairs, and paint-ready finishing.",
      href: "/interior-painting/drywall-repair", cta: "Learn More About Drywall Services",
    }) +
    GRID_CLOSE;
  h = h.slice(0, s) + grid + h.slice(e + endMarker.length);
  data.bodyHtml = h;
  save(p, data);
  console.log("financing.json updated (common-projects cards)");
}

/* -------- SERVICES: remove one photo -------- */
{
  const { p, data } = load("services");
  let h = data.bodyHtml;
  h = replaceOnce(
    h,
    '<img src="/images/migrated/img-20240325-070958-794.webp" alt="Painting project by The Proud Paintbrush in Sugar Land, TX" width="1280" height="960" loading="lazy">',
    "",
    "svc-remove-photo"
  );
  data.bodyHtml = h;
  save(p, data);
  console.log("services.json updated (removed photo)");
}

/* -------- WARRANTY: swap cabinet photo -------- */
{
  const { p, data } = load("warranty");
  let h = data.bodyHtml;
  h = replaceOnce(
    h,
    '<img src="/images/migrated/cabinet-painting-sugar-land-the-proud-paintbrush-two-tone-white-green-kitchen-cabinets.webp" alt="Two-tone white and green kitchen cabinets freshly painted in Sugar Land, TX by The Proud Paintbrush" width="600" height="800" loading="lazy">',
    img("painted-kitchen-cabinets-sugar-land-portfolio.webp", "Beautifully finished white kitchen cabinets with marble island in Sugar Land, TX by The Proud Paintbrush"),
    "war-cabinet-swap"
  );
  data.bodyHtml = h;
  save(p, data);
  console.log("warranty.json updated (cabinet photo swap)");
}

console.log("Follow-up tweaks applied successfully.");
