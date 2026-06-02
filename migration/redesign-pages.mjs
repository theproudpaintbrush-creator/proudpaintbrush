// One-off transform: redesign /financing, /services, /warranty content pages
// per client feedback (hero swaps, image removals, process/service cards,
// remove bottom testimonial grids). Run: node migration/redesign-pages.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PAGES = path.join(ROOT, "content", "pages");
const dims = JSON.parse(fs.readFileSync(path.join(__dirname, "image-dims.json"), "utf8"));

function imgMeta(file) {
  const key = `/images/migrated/${file}`;
  const d = dims[key];
  if (!fs.existsSync(path.join(ROOT, "public", "images", "migrated", file))) {
    throw new Error(`Image file missing on disk: ${file}`);
  }
  if (!d) throw new Error(`No dimensions for ${file}`);
  return { src: key, w: d.w, h: d.h };
}

function img(file, alt, opts = {}) {
  const m = imgMeta(file);
  return `<img src="${m.src}" alt="${alt}" width="${m.w}" height="${m.h}" loading="lazy">`;
}

// ---- card builders (inline styles: bodyHtml is not scanned by Tailwind) ----
const GRID_OPEN =
  '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:1.5rem;margin:2.5rem 0;">';
const GRID_CLOSE = "</div>";

function processCard({ file, alt, step, title, desc }) {
  const m = imgMeta(file);
  return (
    '<div style="border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);display:flex;flex-direction:column;">' +
    `<img src="${m.src}" alt="${alt}" width="${m.w}" height="${m.h}" loading="lazy" style="width:100%;height:180px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;">` +
    '<div style="padding:1.25rem;">' +
    `<div style="font-size:0.75rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#4B83B2;margin-bottom:0.35rem;">${step}</div>` +
    `<h3 style="font-size:1.15rem;font-weight:700;color:#1a2e44;margin:0 0 0.5rem;">${title}</h3>` +
    `<p style="font-size:0.95rem;line-height:1.55;color:#4b5563;margin:0;">${desc}</p>` +
    "</div></div>"
  );
}

function serviceCard({ file, alt, title, desc, href, cta }) {
  const m = imgMeta(file);
  return (
    '<div style="border:1px solid #e5e7eb;border-radius:0.75rem;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);display:flex;flex-direction:column;">' +
    `<img src="${m.src}" alt="${alt}" width="${m.w}" height="${m.h}" loading="lazy" style="width:100%;height:190px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;">` +
    '<div style="padding:1.25rem;display:flex;flex-direction:column;flex:1;">' +
    `<h3 style="font-size:1.15rem;font-weight:700;color:#1a2e44;margin:0 0 0.5rem;">${title}</h3>` +
    `<p style="font-size:0.95rem;line-height:1.55;color:#4b5563;margin:0 0 1.25rem;flex:1;">${desc}</p>` +
    `<a href="${href}" style="display:inline-block;text-align:center;background:#4B83B2;color:#fff;font-weight:600;padding:0.7rem 1rem;border-radius:0.5rem;text-decoration:none;margin-top:auto;">${cta}</a>` +
    "</div></div>"
  );
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
  if (html.indexOf(find, i + find.length) !== -1)
    throw new Error(`[${label}] anchor not unique`);
  return html.slice(0, i) + repl + html.slice(i + find.length);
}
function cutFromTo(html, startMarker, endMarkerExclusive, label) {
  const s = html.indexOf(startMarker);
  if (s === -1) throw new Error(`[${label}] start not found`);
  const e = html.indexOf(endMarkerExclusive, s);
  if (e === -1) throw new Error(`[${label}] end not found`);
  return html.slice(0, s) + html.slice(e);
}
function cutToEnd(html, startMarker, label) {
  const s = html.indexOf(startMarker);
  if (s === -1) throw new Error(`[${label}] start not found`);
  return html.slice(0, s);
}

/* ============================ FINANCING ============================ */
{
  const { p, data } = load("financing");
  let h = data.bodyHtml;

  // 1. Hero image swap (first img)
  h = replaceOnce(
    h,
    '<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy">',
    img("exterior-painting-richmond-stucco-home.webp", "Beautifully repainted stucco home in Richmond, TX by The Proud Paintbrush"),
    "fin-hero"
  );

  // 2. Remove painter prep/thumbs-up photo (3rd from top)
  h = replaceOnce(
    h,
    '<img src="/images/migrated/west-houston-tx-exterior-house-painter-prep-work-96dcab.webp" alt="The Proud Paintbrush painter prepping a home exterior in West Houston, TX" width="1600" height="2133" loading="lazy">',
    "",
    "fin-remove-painter"
  );

  // 3. Cabinet photo: vertical -> horizontal
  h = replaceOnce(
    h,
    '<img src="/images/migrated/west-houston-tx-white-kitchen-cabinet-painting.webp" alt="Freshly painted white kitchen cabinets with island in West Houston, TX cabinet painting project by The Proud Paintbrush." width="600" height="800" loading="lazy">',
    img("cabinet-painting-sugar-land-the-proud-paintbrush-white-modern-kitchen-cabinets.webp", "Freshly painted white modern kitchen cabinets in Sugar Land, TX by The Proud Paintbrush"),
    "fin-cabinet"
  );

  // 4. Step 1-4 -> cards
  const stepStart = '<img src="/images/migrated/richmond-tx-large-exterior-house-painting-e2e9be.webp"';
  const stepEnd = '<p>Detailed prep. Clean execution. Long-term durability.</p>';
  const sIdx = h.indexOf(stepStart);
  const eIdx = h.indexOf(stepEnd);
  if (sIdx === -1 || eIdx === -1) throw new Error("[fin-steps] step block not found");
  const cards =
    GRID_OPEN +
    processCard({
      file: "richmond-tx-large-exterior-house-painting-e2e9be.webp",
      alt: "Painting estimate consultation for a Richmond, TX home by The Proud Paintbrush",
      step: "Step One", title: "Schedule Your Estimate",
      desc: "Meet with our team and receive a detailed proposal outlining scope, products, and pricing.",
    }) +
    processCard({
      file: "west-houston-tx-modern-home-office-painting.webp",
      alt: "Modern home office painted by The Proud Paintbrush in West Houston, TX",
      step: "Step Two", title: "Review Financing Options",
      desc: "Explore flexible payment options and choose the plan that best fits your budget and project goals.",
    }) +
    processCard({
      file: "richmond-tx-large-exterior-house-painting.webp",
      alt: "Freshly painted two-story exterior home in Richmond, TX by The Proud Paintbrush",
      step: "Step Three", title: "Apply in Minutes",
      desc: "Submit a quick application. Approvals are often returned fast, depending on the financing provider.",
    }) +
    processCard({
      file: "katy-tx-soft-neutral-bedroom-painting-016dec.webp",
      alt: "Soft neutral bedroom freshly painted by The Proud Paintbrush in Katy, TX",
      step: "Step Four", title: "Enjoy Your Updated Space",
      desc: "Once approved and scheduled, we complete your project with detailed prep, clean execution, and lasting durability.",
    }) +
    GRID_CLOSE;
  h = h.slice(0, sIdx) + cards + h.slice(eIdx + stepEnd.length);

  // 5. Remove bottom homeowner quote photos (final testimonial <ul>)
  h = cutToEnd(h, '<ul><li><img src="/images/migrated/satisfied-customer-katy-exterior-painting.webp"', "fin-testimonials");

  data.bodyHtml = h;
  save(p, data);
  console.log("financing.json updated");
}

/* ============================ SERVICES ============================ */
{
  const { p, data } = load("services");
  let h = data.bodyHtml;

  // 1. Hero swap (first img) + 2. remove the second top image
  h = replaceOnce(
    h,
    '<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy"><img src="/images/migrated/photo-2024-10-24-16-32-14-608122.webp" alt="Homeowner standing proudly outside his house after a successful interior painting project completed by The Proud Paintbrush in Sugar Land, Texas." width="1280" height="960" loading="lazy">',
    img("color-drenched-living-room-walls-ceiling-trim-rosenberg-tx.webp", "Color-drenched living room with freshly painted walls, ceiling, and trim by The Proud Paintbrush"),
    "svc-hero-and-top"
  );

  // 3 + 4. Replace the 4 plain img+link service rows with a 5-card grid
  const blockStart = '<img src="/images/migrated/bedroom-interior-painting-southwest-houston-jpg.webp"';
  const blockEndMarker = '<a href="/interior-painting/drywall-repair"> Learn More About Drywall Services </a>';
  const bs = h.indexOf(blockStart);
  const be = h.indexOf(blockEndMarker);
  if (bs === -1 || be === -1) throw new Error("[svc-cards] service link block not found");
  const cards =
    GRID_OPEN +
    serviceCard({
      file: "bedroom-interior-painting-southwest-houston-jpg.webp",
      alt: "Interior bedroom painting project by The Proud Paintbrush",
      title: "Interior Painting",
      desc: "Walls, ceilings, trim, and full-room repaints with smooth finishes and meticulous prep.",
      href: "/painting-services/interior-painting", cta: "Learn About Interior Painting",
    }) +
    serviceCard({
      file: "exterior-house-painting-sugar-land-texas-jpg-d4c168.webp",
      alt: "Exterior house painting project in Sugar Land, TX by The Proud Paintbrush",
      title: "Exterior Painting",
      desc: "Durable, weather-resistant exterior coatings that protect your home from Texas heat and moisture.",
      href: "/painting-services/exterior-painting", cta: "Learn About Exterior Painting",
    }) +
    serviceCard({
      file: "kitchen-cabinet-painting-richmond-texas.webp",
      alt: "Freshly painted kitchen cabinets in Richmond, TX by The Proud Paintbrush",
      title: "Cabinet Painting",
      desc: "Smooth, factory-style cabinet finishes built to hold up to daily kitchen and bath use.",
      href: "/painting-services/cabinet-painting", cta: "Learn About Cabinet Painting",
    }) +
    serviceCard({
      file: "richmond-drywall-repair-bathroom-painting-jpg.webp",
      alt: "Drywall repair and bathroom painting in Richmond, TX by The Proud Paintbrush",
      title: "Drywall Services",
      desc: "Patching, texture matching, and seamless surface prep so your final paint looks flawless.",
      href: "/interior-painting/drywall-repair", cta: "Learn About Drywall Services",
    }) +
    serviceCard({
      file: "freshly-stained-wooden-fence-sugar-land-portfolio.webp",
      alt: "Freshly stained wooden fence in Sugar Land, TX by The Proud Paintbrush",
      title: "Fence Staining",
      desc: "Rich, protective stain that revives weathered wood and extends the life of your fence.",
      href: "/exterior-painting/fence-staining", cta: "Learn About Fence Staining",
    }) +
    GRID_CLOSE;
  h = h.slice(0, bs) + cards + h.slice(be + blockEndMarker.length);

  // 5. Remove service area map image
  h = replaceOnce(
    h,
    '<img src="/images/migrated/fort-bend-county-painting-service-areas.webp" alt="Fort bend county painting service areas" width="656" height="492" loading="lazy">',
    "",
    "svc-map"
  );

  // 6. Remove bottom photos + homeowner quote section
  h = cutToEnd(h, '<ul><li><h2>Excellent Work On My Interior and Exterior!</h2><p>Jeff</p></li>', "svc-testimonials");

  data.bodyHtml = h;
  save(p, data);
  console.log("services.json updated");
}

/* ============================ WARRANTY ============================ */
{
  const { p, data } = load("warranty");
  let h = data.bodyHtml;

  // 1. Hero swap (first img) -> stronger photo
  h = replaceOnce(
    h,
    '<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy">',
    img("freshly-painted-exterior-house-front-sugar-land.webp", "Freshly painted home exterior in Sugar Land, TX by The Proud Paintbrush"),
    "war-hero"
  );

  // 2. Preparation Process section: delete the photo ABOVE the prep link
  h = replaceOnce(
    h,
    '<img src="/images/migrated/richmond-tx-exterior-house-painting-prep-process.webp" alt="Large freshly painted two-story home in Richmond, TX during exterior painting preparation process by The Proud Paintbrush." width="1280" height="960" loading="lazy">',
    "",
    "war-prep-above"
  );

  // 3. Cabinet photo -> nicer vertical image
  h = replaceOnce(
    h,
    '<img src="/images/migrated/west-houston-tx-white-kitchen-cabinet-painting.webp" alt="Freshly painted white kitchen cabinets with island in West Houston, TX cabinet painting project by The Proud Paintbrush." width="600" height="800" loading="lazy">',
    img("cabinet-painting-sugar-land-the-proud-paintbrush-two-tone-white-green-kitchen-cabinets.webp", "Two-tone white and green kitchen cabinets freshly painted in Sugar Land, TX by The Proud Paintbrush"),
    "war-cabinet"
  );

  // 4. What to Expect photo -> different photo
  h = replaceOnce(
    h,
    '<img src="/images/migrated/core-values-happy-customer-office-sugar-land-painters-01.webp" alt="Happy customer standing inside commercial space in Southwest Houston, TX after a painting project completed by The Proud Paintbrush." width="1600" height="1200" loading="lazy">',
    img("color-drenched-beige-bedroom-sugar-land-tx.webp", "Warm beige bedroom with freshly painted walls and trim in Sugar Land, TX by The Proud Paintbrush"),
    "war-expect"
  );

  // 5a. Remove duplicate painter prep image in the final schedule section
  h = replaceOnce(
    h,
    '<img src="/images/migrated/west-houston-tx-exterior-house-painter-prep-work-96dcab.webp" alt="Professional painter performing exterior prep and trim painting on home in West Houston, TX for The Proud Paintbrush." width="1600" height="2133" loading="lazy">',
    "",
    "war-dup-painter"
  );

  // 5b. Remove the bottom testimonial grid (keeps the blog section after it)
  h = cutFromTo(
    h,
    '<ul><li><h2>Excellent Work On My Interior and Exterior!</h2><p>Jeff</p></li>',
    '<h4>Our Latest Exterior Painting Blog Posts</h4>',
    "war-testimonials"
  );

  data.bodyHtml = h;
  save(p, data);
  console.log("warranty.json updated");
}

console.log("All pages updated successfully.");
