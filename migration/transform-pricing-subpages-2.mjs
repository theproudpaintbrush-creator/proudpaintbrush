import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "pages", "pricing");
const PAINTER = `<img src="/images/migrated/west-houston-tx-exterior-house-painter-prep-work-96dcab.webp" alt="The Proud Paintbrush painter prepping a home exterior in West Houston, TX" width="1600" height="2133" loading="lazy">`;

const cardOpen = `<div style="display:flex;flex-direction:column;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">`;
const imgCover = (h = 200) => `style="display:block;width:100%;height:${h}px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;"`;

function rep(html, find, replace, label) {
  if (!html.includes(find)) throw new Error("NOT FOUND: " + label);
  return html.replace(find, replace);
}
function removeStr(html, find, label) {
  if (!html.includes(find)) throw new Error("NOT FOUND (remove): " + label);
  return html.replace(find, "");
}
const load = (k) => JSON.parse(fs.readFileSync(path.join(DIR, k + ".json"), "utf-8"));
const save = (k, o) => fs.writeFileSync(path.join(DIR, k + ".json"), JSON.stringify(o, null, 2));

/* ---------------- INTERIOR ---------------- */
{
  const p = load("interior-prices");
  let b = p.bodyHtml;
  // hero -> dark green bedroom
  b = rep(
    b,
    `<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy">`,
    `<img src="/images/migrated/dark-green-bedroom-wallpaper-sugar-land-tx.webp" alt="Color-drenched dark green bedroom with a bold wallpaper feature wall in Sugar Land, Texas" width="1600" height="1200" loading="eager">`,
    "interior hero -> dark green"
  );
  // remove the duplicate dark-green from the body
  b = removeStr(
    b,
    `<img src="/images/migrated/dark-green-bedroom-wallpaper-sugar-land-tx.webp" alt="Color-drenched dark green bedroom with wallpaper in Sugar Land, Texas" width="1600" height="1200" loading="lazy">`,
    "interior dark-green body dup"
  );
  // remove painter from the bottom
  b = removeStr(b, PAINTER, "interior bottom painter");
  p.bodyHtml = b;
  save("interior-prices", p);
  console.log("interior-prices DONE");
}

/* ---------------- EXTERIOR ---------------- */
{
  const p = load("exterior-prices");
  let b = p.bodyHtml;

  // center price cards: flex-wrap + justify-center container, give dual cards a flex-basis
  b = rep(
    b,
    `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:1.25rem;margin:1.5rem 0;">`,
    `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1.25rem;margin:1.5rem 0;">`,
    "exterior price card container -> flex center"
  );
  b = b.split(
    `<div style="display:flex;flex-direction:column;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;">`
  ).join(
    `<div style="display:flex;flex-direction:column;flex:1 1 280px;max-width:360px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);"><div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;">`
  );

  // remove standalone images that move into warranty cards
  b = removeStr(b, `<img src="/images/migrated/brick-house-blue-shutters-homeowner-rosenberg-tx.webp" alt="Freshly painted brick house with blue shutters and satisfied homeowner in Rosenberg, Texas" width="840" height="630" loading="lazy">`, "ext brick-house-blue-shutters standalone");
  b = removeStr(b, `<img src="/images/migrated/white-black-exterior-homeowner-missouri-city-tx.webp" alt="Freshly painted hardy board and brick exterior in white and black with satisfied homeowner in Missouri City, Texas" width="1280" height="960" loading="lazy">`, "ext white-black-exterior-homeowner standalone");

  // warranty -> 2 cards (consumes the painter-working-stucco image + warranty link)
  const warOld =
    `<h2>Choose the Warranty Option That Fits Your Home</h2><h3>2-Year Workmanship Warranty</h3><p>Our standard exterior painting option.</p><p>Built for homeowners who want a professional exterior repaint with proper prep and dependable coverage.</p><h3>5-Year Workmanship Warranty + Premium Package</h3><p>Our upgraded exterior option for homeowners who want longer protection and better performance.</p><p><strong>This package includes:</strong></p><ul><li><p><strong>5-year workmanship warranty</strong></p></li><li><p><strong>Touch-up support throughout the warranty period</strong></p></li><li><p><strong>Paint upgrade for improved durability and fade resistance</strong></p></li></ul><p>Best for homeowners dealing with:</p><ul><li><p>heavy sun exposure</p></li><li><p>fading colors</p></li><li><p>high-wear surfaces</p></li></ul><img src="/images/migrated/painter-working-stucco-exterior-sugar-land-tx.webp" alt="Painter working on stucco exterior in Sugar Land, Texas" width="1280" height="960" loading="lazy"><a href="/warranty"> Learn More About Our Warranty </a>`;
  const warNew =
    `<h2>Choose the Warranty Option That Fits Your Home</h2>` +
    `<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:1.25rem;margin:1.5rem 0;">` +
    `<div style="display:flex;flex-direction:column;flex:1 1 280px;max-width:420px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">` +
    `<img src="/images/migrated/white-black-exterior-homeowner-missouri-city-tx.webp" alt="Satisfied homeowner in front of a freshly painted white and black exterior in Missouri City, Texas" width="1280" height="960" loading="lazy" ${imgCover(200)}>` +
    `<div style="display:flex;flex-direction:column;flex:1;padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .5rem;">2-Year Workmanship Warranty</h3><p style="margin:0 0 .6rem;">Our standard exterior painting option.</p><p style="margin:0 0 .8rem;">Built for homeowners who want a professional exterior repaint with proper prep and dependable coverage.</p><a href="/warranty" style="margin-top:auto;font-weight:600;color:#4B83B2;">Learn More About Our Warranty →</a></div></div>` +
    `<div style="display:flex;flex-direction:column;flex:1 1 280px;max-width:420px;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">` +
    `<img src="/images/migrated/brick-house-blue-shutters-homeowner-rosenberg-tx.webp" alt="Satisfied homeowner with a freshly painted brick home and blue shutters in Rosenberg, Texas" width="840" height="630" loading="lazy" ${imgCover(200)}>` +
    `<div style="display:flex;flex-direction:column;flex:1;padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .5rem;">5-Year Workmanship Warranty + Premium Package</h3><p style="margin:0 0 .6rem;">Our upgraded exterior option for homeowners who want longer protection and better performance.</p><p style="margin:0 0 .4rem;font-weight:600;">This package includes:</p><ul style="margin:0 0 .8rem;padding-left:1.1rem;"><li>5-year workmanship warranty</li><li>Touch-up support throughout the warranty period</li><li>Paint upgrade for improved durability and fade resistance</li></ul><p style="margin:0 0 .4rem;font-weight:600;">Best for homeowners dealing with:</p><ul style="margin:0;padding-left:1.1rem;"><li>heavy sun exposure</li><li>fading colors</li><li>high-wear surfaces</li></ul></div></div>` +
    `</div>`;
  b = rep(b, warOld, warNew, "exterior warranty cards");

  // swap brick-hardy (used elsewhere) for the painter-working-stucco image
  b = rep(
    b,
    `<img src="/images/migrated/brick-hardy-white-black-exterior-southwest-houston-tx.webp" alt="Freshly painted brick and hardy board house in white and black in Southwest Houston, Texas" width="1280" height="960" loading="lazy">`,
    `<img src="/images/migrated/painter-working-stucco-exterior-sugar-land-tx.webp" alt="Painter working on a stucco exterior in Sugar Land, Texas" width="1280" height="960" loading="lazy">`,
    "exterior brick-hardy -> painter-working-stucco"
  );

  // remove the standalone stucco-home-satisfied-homeowners (it moves down to replace the other photo)
  b = removeStr(b, `<img src="/images/migrated/stucco-home-satisfied-homeowners-southwest-houston-tx.webp" alt="Freshly painted stucco exterior with satisfied homeowners holding sign in Southwest Houston, Texas" width="1600" height="1200" loading="lazy">`, "ext stucco-home-satisfied standalone");
  // swap stucco-exterior-homeowner-satisfied for stucco-home-satisfied-homeowners
  b = rep(
    b,
    `<img src="/images/migrated/stucco-exterior-homeowner-satisfied-sugar-land-tx.webp" alt="Freshly painted stucco exterior with satisfied homeowner holding sign in Sugar Land, Texas" width="1280" height="960" loading="lazy">`,
    `<img src="/images/migrated/stucco-home-satisfied-homeowners-southwest-houston-tx.webp" alt="Freshly painted stucco exterior with satisfied homeowners holding a sign in Southwest Houston, Texas" width="1600" height="1200" loading="lazy">`,
    "exterior satisfied-homeowner swap"
  );

  // remove painter from the bottom
  b = removeStr(b, PAINTER, "exterior bottom painter");

  p.bodyHtml = b;
  save("exterior-prices", p);
  console.log("exterior-prices DONE");
}

/* ---------------- CABINET ---------------- */
{
  const p = load("cabinet-prices");
  let b = p.bodyHtml;

  // hero satisfied-customer half -> cabinet painting testimonial
  b = rep(
    b,
    `<img src="/images/migrated/happy-customer-kitchen-fulshear-tx.webp" alt="Satisfied cabinet painting customer of The Proud Paintbrush in Fulshear, TX" width="1352" height="1014" loading="eager" style="display:block;width:100%;height:300px;object-fit:cover;margin:0;border-radius:12px;">`,
    `<img src="/images/migrated/satisfied-customer-missouri-city-cabinet-painting.webp" alt="Satisfied cabinet painting customer of The Proud Paintbrush in Missouri City, TX" width="960" height="1280" loading="eager" style="display:block;width:100%;height:300px;object-fit:cover;margin:0;border-radius:12px;">`,
    "cabinet hero -> cabinet testimonial"
  );

  // remove warm off-white cabinets photo
  b = removeStr(b, `<img src="/images/migrated/warm-off-white-kitchen-cabinets-rosenberg-tx.webp" alt="Freshly painted warm off-white kitchen cabinets in Rosenberg, Texas" width="1280" height="960" loading="lazy">`, "cabinet warm off-white");

  // C4: remove masking-topcoat standalone, then swap angle-2 for masking-topcoat
  b = removeStr(b, `<img src="/images/migrated/cabinet-painting-process-masking-topcoat-katy-tx.webp" alt="Freshly painted kitchen cabinets with masking still in place and top coat applied in Katy, Texas" width="768" height="1024" loading="lazy">`, "cabinet masking-topcoat standalone");
  b = rep(
    b,
    `<img src="/images/migrated/white-cabinets-green-island-kitchen-west-houston-tx-angle-2.webp" alt="Kitchen with white cabinets and green accent island painted in West Houston, Texas" width="600" height="800" loading="lazy">`,
    `<img src="/images/migrated/cabinet-painting-process-masking-topcoat-katy-tx.webp" alt="Freshly painted kitchen cabinets with masking still in place and top coat applied in Katy, Texas" width="768" height="1024" loading="lazy">`,
    "cabinet angle-2 -> masking-topcoat"
  );

  // remove painter from the bottom
  b = removeStr(b, PAINTER, "cabinet bottom painter");

  p.bodyHtml = b;
  save("cabinet-prices", p);
  console.log("cabinet-prices DONE");
}

console.log("ALL DONE");
