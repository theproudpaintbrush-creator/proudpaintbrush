import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "pages", "pricing");

const PAINTER = `<img src="/images/migrated/west-houston-tx-exterior-house-painter-prep-work-96dcab.webp" alt="The Proud Paintbrush painter prepping a home exterior in West Houston, TX" width="1600" height="2133" loading="lazy">`;

function button(label = "Schedule Your Estimate") {
  return `<a href="https://theproudpaintbrush.youcanbook.me" style="display:inline-block;background:#4B83B2;color:#fff;font-weight:700;padding:0.85rem 1.9rem;border-radius:8px;text-decoration:none;margin:0.75rem 0;">${label}</a>`;
}

function videoSection(id, title, intro) {
  return (
    `<h2>${title}</h2><p>${intro}</p>` +
    `<div style="max-width:720px;margin:1.5rem auto;"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,0.15);">` +
    `<iframe src="https://www.youtube.com/embed/${id}?rel=0" title="The Proud Paintbrush customer video testimonial" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>` +
    `</div><p style="text-align:center;margin-top:1rem;"><a href="/testimonials" style="font-weight:600;">▶ Watch more customer video testimonials →</a></p></div>`
  );
}

const cardGridOpen = (min = 240) =>
  `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(${min}px,1fr));gap:1.25rem;margin:1.5rem 0;">`;
const cardOpen =
  `<div style="display:flex;flex-direction:column;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">`;
const imgCover = (h = 190) =>
  `style="display:block;width:100%;height:${h}px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;"`;

// Simple price card: one image, centered title + price
function priceCard(src, alt, w, h, title, price) {
  return (
    cardOpen +
    `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" ${imgCover(190)}>` +
    `<div style="padding:1.1rem 1.25rem;text-align:center;"><div style="font-weight:700;font-size:1.1rem;color:#1a2e44;">${title}</div>` +
    `<div style="font-weight:700;font-size:1.3rem;color:#4B83B2;margin-top:.3rem;">${price}</div></div></div>`
  );
}

// Dual-image price card: two images side-by-side, centered title + price
function dualCard(i1, a1, w1, h1, i2, a2, w2, h2, title, price) {
  return (
    cardOpen +
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:2px;">` +
    `<img src="${i1}" alt="${a1}" width="${w1}" height="${h1}" loading="lazy" ${imgCover(150)}>` +
    `<img src="${i2}" alt="${a2}" width="${w2}" height="${h2}" loading="lazy" ${imgCover(150)}>` +
    `</div>` +
    `<div style="padding:1.1rem 1.25rem;text-align:center;"><div style="font-weight:700;font-size:1.1rem;color:#1a2e44;">${title}</div>` +
    `<div style="font-weight:700;font-size:1.3rem;color:#4B83B2;margin-top:.3rem;">${price}</div></div></div>`
  );
}

function rep(html, find, replace, label) {
  if (!html.includes(find)) throw new Error("NOT FOUND: " + label);
  return html.replace(find, replace);
}
function repAll(html, find, replace, label) {
  if (!html.includes(find)) throw new Error("NOT FOUND (all): " + label);
  return html.split(find).join(replace);
}
function load(key) {
  return JSON.parse(fs.readFileSync(path.join(DIR, key + ".json"), "utf-8"));
}
function save(key, obj) {
  fs.writeFileSync(path.join(DIR, key + ".json"), JSON.stringify(obj, null, 2));
}
// remove painter from top; returns html without it (re-added at bottom later)
function pullPainter(html) {
  if (!html.includes(PAINTER)) throw new Error("painter not found");
  return html.split(PAINTER).join("");
}
// cut the trailing testimonial-quotes <ul> list and append closing content
function cutQuotesAndAppend(html, append) {
  const idx = html.lastIndexOf("<ul><li>");
  if (idx === -1) throw new Error("quotes <ul> not found");
  return html.slice(0, idx) + append;
}

/* =========================== INTERIOR =========================== */
{
  const p = load("interior-prices");
  let b = p.bodyHtml;

  // pull painter from the top (re-added at bottom)
  b = pullPainter(b);

  // Quick Interior Painting Price Breakdown -> 3 cards
  const intOld =
    `<img src="/images/migrated/color-drenched-beige-bedroom-sugar-land-tx.webp" alt="Freshly painted bedroom with color-drenched beige walls in Sugar Land, Texas" width="1600" height="1200" loading="lazy"><h3>Single Room</h3><p><strong>$500 – $1,500</strong></p><img src="/images/migrated/master-bedroom-ceiling-walls-trim-crown-rosenberg-tx.webp" alt="Freshly painted master bedroom with ceiling, walls, trim, and crown molding in Rosenberg, Texas" width="1600" height="1200" loading="lazy"><h3>Multiple Rooms</h3><p><strong>$1,500 – $5,000</strong></p><img src="/images/migrated/living-room-periwinkle-accent-gray-walls-southwest-houston-tx.webp" alt="Freshly painted living room with periwinkle accent wall and gray walls in Southwest Houston, Texas" width="640" height="480" loading="lazy"><h3>Full Interior</h3><p><strong>$3,000 – $20,000+</strong></p>`;
  const intNew =
    cardGridOpen(240) +
    priceCard("/images/migrated/color-drenched-beige-bedroom-sugar-land-tx.webp", "Freshly painted bedroom with color-drenched beige walls in Sugar Land, Texas", 1600, 1200, "Single Room", "$500 – $1,500") +
    priceCard("/images/migrated/master-bedroom-ceiling-walls-trim-crown-rosenberg-tx.webp", "Freshly painted master bedroom with ceiling, walls, trim, and crown molding in Rosenberg, Texas", 1600, 1200, "Multiple Rooms", "$1,500 – $5,000") +
    priceCard("/images/migrated/living-room-periwinkle-accent-gray-walls-southwest-houston-tx.webp", "Freshly painted living room with periwinkle accent wall and gray walls in Southwest Houston, Texas", 640, 480, "Full Interior", "$3,000 – $20,000+") +
    `</div>`;
  b = rep(b, intOld, intNew, "interior price cards");

  // Warranty -> 2 cards
  const warOld =
    `<img src="/images/migrated/happy-customer-painted-interior-proud-paintbrush.webp" alt="happy-customer-painted-interior-proud-paintbrush.jpg" width="839" height="629" loading="lazy"><h3>2-Year Workmanship Warranty</h3><p>Our standard interior painting option.</p><ul><li><p>Walls: <strong>$2.00 / sq ft</strong></p></li><li><p>Ceilings: <strong>$1.20 / sq ft</strong></p></li><li><p>Baseboards: <strong>$1.92 / linear ft</strong></p></li><li><p>Doors: <strong>$96 each</strong></p></li><li><p>Windows: <strong>$54 each</strong></p></li><li><p>Primer on walls: <strong>$1.00 / sq ft</strong></p></li></ul><p>Best for homeowners who want a high-quality interior paint job with strong prep, professional finishes, and dependable warranty coverage.</p><a href="/warranty"> Learn More About Our Warranty </a><img src="/images/migrated/happy-customer-kitchen-fulshear-tx.webp" alt="Satisfied customer holding sign in freshly painted kitchen in Fulshear, Texas" width="1352" height="1014" loading="lazy"><h3>5-Year Workmanship Warranty + Premium Package</h3><p>Our upgraded interior painting option for homeowners who want longer protection, better materials, and expert guidance.</p><ul><li><p>Walls: <strong>$2.30 / sq ft</strong></p></li><li><p>Ceilings: <strong>$1.38 / sq ft</strong></p></li><li><p>Baseboards: <strong>$2.21 / linear ft</strong></p></li><li><p>Doors: <strong>$110.40 each</strong></p></li><li><p>Windows: <strong>$62.10 each</strong></p></li><li><p>Primer on walls: <strong>$1.15 / sq ft</strong></p></li></ul><p><strong>This package includes:</strong></p><ul><li><p><strong>5-year workmanship warranty</strong></p></li><li><p><strong>Touch-up support throughout the 5-year warranty period</strong></p></li><li><p><strong>Paint upgrade for improved durability and finish quality</strong></p></li><li><p><strong>Color consultation with a professional interior designer</strong></p></li></ul><p>Most homeowners upgrading to this option do so for the added protection and professional color guidance.</p>`;
  const warNew =
    cardGridOpen(280) +
    cardOpen +
    `<img src="/images/migrated/happy-customer-painted-interior-proud-paintbrush.webp" alt="Satisfied interior painting customer of The Proud Paintbrush" width="839" height="629" loading="lazy" ${imgCover(200)}>` +
    `<div style="display:flex;flex-direction:column;flex:1;padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .5rem;">2-Year Workmanship Warranty</h3><p style="margin:0 0 .6rem;">Our standard interior painting option.</p>` +
    `<ul style="margin:0 0 .8rem;padding-left:1.1rem;"><li>Walls: <strong>$2.00 / sq ft</strong></li><li>Ceilings: <strong>$1.20 / sq ft</strong></li><li>Baseboards: <strong>$1.92 / linear ft</strong></li><li>Doors: <strong>$96 each</strong></li><li>Windows: <strong>$54 each</strong></li><li>Primer on walls: <strong>$1.00 / sq ft</strong></li></ul>` +
    `<p style="margin:0 0 .8rem;">Best for homeowners who want a high-quality interior paint job with strong prep, professional finishes, and dependable warranty coverage.</p>` +
    `<a href="/warranty" style="margin-top:auto;font-weight:600;color:#4B83B2;">Learn More About Our Warranty →</a></div></div>` +
    cardOpen +
    `<img src="/images/migrated/happy-customer-kitchen-fulshear-tx.webp" alt="Satisfied customer in a freshly painted kitchen in Fulshear, Texas" width="1352" height="1014" loading="lazy" ${imgCover(200)}>` +
    `<div style="display:flex;flex-direction:column;flex:1;padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .5rem;">5-Year Workmanship Warranty + Premium Package</h3><p style="margin:0 0 .6rem;">Our upgraded interior painting option for homeowners who want longer protection, better materials, and expert guidance.</p>` +
    `<ul style="margin:0 0 .8rem;padding-left:1.1rem;"><li>Walls: <strong>$2.30 / sq ft</strong></li><li>Ceilings: <strong>$1.38 / sq ft</strong></li><li>Baseboards: <strong>$2.21 / linear ft</strong></li><li>Doors: <strong>$110.40 each</strong></li><li>Windows: <strong>$62.10 each</strong></li><li>Primer on walls: <strong>$1.15 / sq ft</strong></li></ul>` +
    `<p style="margin:0 0 .4rem;font-weight:600;">This package includes:</p><ul style="margin:0;padding-left:1.1rem;"><li>5-year workmanship warranty</li><li>Touch-up support throughout the 5-year warranty period</li><li>Paint upgrade for improved durability and finish quality</li><li>Color consultation with a professional interior designer</li></ul></div></div>` +
    `</div><p>Most homeowners upgrading to this option do so for the added protection and professional color guidance.</p>`;
  b = rep(b, warOld, warNew, "interior warranty cards");

  // Low/High end -> 2 cards
  const lhOld =
    `<img src="/images/migrated/empty-bedroom-off-white-walls-katy-tx.webp" alt="Freshly painted bedroom with cool off-white walls and no furniture in Katy, Texas" width="407" height="305" loading="lazy"><h3>Lower End of the Range</h3><ul><li><p>Minimal repairs</p></li><li><p>Standard ceiling height</p></li><li><p>Fewer colors</p></li><li><p>Simple layouts</p></li><li><p>Empty home</p></li></ul><img src="/images/migrated/kitchen-breakfast-black-feature-wall-richmond-tx.webp" alt="Freshly painted kitchen and breakfast area with black feature wall, white walls, and white cabinets in Richmond, Texas" width="1280" height="960" loading="lazy"><h3>Higher End of the Range</h3><ul><li><p>Extensive repairs</p></li><li><p>High ceilings</p></li><li><p>Detailed trim or crown molding</p></li><li><p>Multiple colors or accent walls</p></li><li><p>Occupied home with furniture</p></li></ul>`;
  const lhNew =
    cardGridOpen(260) +
    cardOpen +
    `<img src="/images/migrated/empty-bedroom-off-white-walls-katy-tx.webp" alt="Freshly painted bedroom with cool off-white walls and no furniture in Katy, Texas" width="407" height="305" loading="lazy" ${imgCover(190)}>` +
    `<div style="padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .6rem;">Lower End of the Range</h3><ul style="margin:0;padding-left:1.1rem;"><li>Minimal repairs</li><li>Standard ceiling height</li><li>Fewer colors</li><li>Simple layouts</li><li>Empty home</li></ul></div></div>` +
    cardOpen +
    `<img src="/images/migrated/kitchen-breakfast-black-feature-wall-richmond-tx.webp" alt="Freshly painted kitchen and breakfast area with black feature wall, white walls, and white cabinets in Richmond, Texas" width="1280" height="960" loading="lazy" ${imgCover(190)}>` +
    `<div style="padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .6rem;">Higher End of the Range</h3><ul style="margin:0;padding-left:1.1rem;"><li>Extensive repairs</li><li>High ceilings</li><li>Detailed trim or crown molding</li><li>Multiple colors or accent walls</li><li>Occupied home with furniture</li></ul></div></div>` +
    `</div>`;
  b = rep(b, lhOld, lhNew, "interior low/high cards");

  // "Button:" literal -> real button
  b = rep(b, `<p><strong>Button:</strong> Schedule Your Estimate</p><a href="https://theproudpaintbrush.youcanbook.me"> Schedule My Free Painting Estimate </a>`, button(), "interior button text");
  // typo CTA -> button
  b = rep(b, `<a href="https://theproudpaintbrush.youcanbook.me"> Schedule My Free Painting Etimate </a>`, button(), "interior etimate typo");

  // remove quotes list + add video + painter at very bottom
  b = cutQuotesAndAppend(
    b,
    videoSection("gxB9xw9m34U", "Hear From Our Customers", "See what working with The Proud Paintbrush is really like — straight from a local homeowner.") + PAINTER
  );

  p.bodyHtml = b;
  save("interior-prices", p);
  console.log("interior-prices DONE");
}

/* =========================== EXTERIOR =========================== */
{
  const p = load("exterior-prices");
  let b = p.bodyHtml;

  // hero swap interior living room -> exterior
  b = rep(
    b,
    `<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy">`,
    `<img src="/images/migrated/black-white-brick-hardie-exterior-painting-missouri-city-texas.webp" alt="Freshly painted white and black brick-and-Hardie two-story home exterior in Missouri City, TX by The Proud Paintbrush" width="1280" height="960" loading="eager">`,
    "exterior hero"
  );

  // pull painter from top
  b = pullPainter(b);

  // Quick Exterior Price Breakdown -> 3 dual-image cards
  const extOld =
    `<img src="/images/migrated/small-house-exterior-painting-sugar-land-tx.webp" alt="Small house freshly painted blue with white trim in Sugar Land, Texas" width="1280" height="960" loading="lazy"><img src="/images/migrated/white-exterior-red-brick-house-painting-katy-tx.webp" alt="Freshly painted brick house with white trim in Katy, Texas" width="1280" height="960" loading="lazy"><img src="/images/migrated/medium-stucco-exterior-rosenberg-tx.webp" alt="Freshly painted medium-sized stucco exterior in Rosenberg, Texas" width="1280" height="960" loading="lazy"><img src="/images/migrated/medium-two-story-house-exterior-painting-tx.webp" alt="Medium-sized home with hardy board and brick exterior painted white in Richmond, Texas" width="1280" height="960" loading="lazy"><img src="/images/migrated/stucco-exterior-off-white-fulshear-tx.webp" alt="Freshly painted stucco exterior in off-white in Fulshear, Texas" width="1600" height="1200" loading="lazy"><h3>Small Homes / Partial Exteriors</h3><p><strong>$2,500 – $5,000</strong></p><h3>Medium Homes</h3><p><strong>$5,000 – $10,000</strong></p><h3>Large Homes / Full Repaints</h3><p><strong>$10,000 – $16,000+</strong></p><img src="/images/migrated/very-large-stucco-house-exterior-painting-missouri-city-tx.webp" alt="Large stucco house painted gray with white trim in West Houston, Texas" width="1109" height="888" loading="lazy"><p>These ranges vary based on prep work, repairs, access, and surface type.</p>`;
  const extNew =
    cardGridOpen(280) +
    dualCard(
      "/images/migrated/small-house-exterior-painting-sugar-land-tx.webp", "Small house freshly painted blue with white trim in Sugar Land, Texas", 1280, 960,
      "/images/migrated/white-exterior-red-brick-house-painting-katy-tx.webp", "Freshly painted brick house with white trim in Katy, Texas", 1280, 960,
      "Small Homes / Partial Exteriors", "$2,500 – $5,000"
    ) +
    dualCard(
      "/images/migrated/medium-two-story-house-exterior-painting-tx.webp", "Medium-sized home with hardy board and brick exterior painted white in Richmond, Texas", 1280, 960,
      "/images/migrated/medium-stucco-exterior-rosenberg-tx.webp", "Freshly painted medium-sized stucco exterior in Rosenberg, Texas", 1280, 960,
      "Medium Homes", "$5,000 – $10,000"
    ) +
    dualCard(
      "/images/migrated/very-large-stucco-house-exterior-painting-missouri-city-tx.webp", "Very large stucco house exterior freshly painted in Missouri City, Texas", 1109, 888,
      "/images/migrated/stucco-exterior-off-white-fulshear-tx.webp", "Freshly painted stucco exterior in off-white in Fulshear, Texas", 1600, 1200,
      "Large Homes / Full Repaints", "$10,000 – $16,000+"
    ) +
    `</div><p>These ranges vary based on prep work, repairs, access, and surface type.</p>`;
  b = rep(b, extOld, extNew, "exterior price cards");

  // Low/High end -> 2 cards (also removes the standalone two-painters image before the heading)
  const elhOld =
    `<img src="/images/migrated/two-painters-working-small-one-story-exterior-house.webp" alt="Two painters working on a small one-story house exterior" width="1280" height="960" loading="lazy"><h2>What Impacts Whether You’re at the Low or High End</h2><img src="/images/migrated/two-painters-stucco-exterior-richmond-tx.webp" alt="Two painters working on stucco exterior in Richmond, Texas" width="1000" height="750" loading="lazy"><h3>Lower End of the Range</h3><ul><li><p>Minimal prep needed</p></li><li><p>Single-story home</p></li><li><p>Easy access</p></li><li><p>Neutral color changes</p></li></ul><h3>Higher End of the Range</h3><ul><li><p>Extensive prep or repairs</p></li><li><p>Two-story or complex layouts</p></li><li><p>High sun exposure</p></li><li><p>Bold color changes</p></li><li><p>Detailed trim work</p></li></ul>`;
  const elhNew =
    `<h2>What Impacts Whether You’re at the Low or High End</h2>` +
    cardGridOpen(260) +
    cardOpen +
    `<img src="/images/migrated/two-painters-working-small-one-story-exterior-house.webp" alt="Two painters working on a small one-story house exterior" width="1280" height="960" loading="lazy" ${imgCover(190)}>` +
    `<div style="padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .6rem;">Lower End of the Range</h3><ul style="margin:0;padding-left:1.1rem;"><li>Minimal prep needed</li><li>Single-story home</li><li>Easy access</li><li>Neutral color changes</li></ul></div></div>` +
    cardOpen +
    `<img src="/images/migrated/two-painters-stucco-exterior-richmond-tx.webp" alt="Two painters working on stucco exterior in Richmond, Texas" width="1000" height="750" loading="lazy" ${imgCover(190)}>` +
    `<div style="padding:1.1rem 1.25rem;"><h3 style="margin:0 0 .6rem;">Higher End of the Range</h3><ul style="margin:0;padding-left:1.1rem;"><li>Extensive prep or repairs</li><li>Two-story or complex layouts</li><li>High sun exposure</li><li>Bold color changes</li><li>Detailed trim work</li></ul></div></div>` +
    `</div>`;
  b = rep(b, elhOld, elhNew, "exterior low/high cards");

  // remove quotes + add video + painter at bottom
  b = cutQuotesAndAppend(
    b,
    videoSection("LNmUGCgmTS0", "Hear From Our Customers", "Real homeowners share what it was like to have The Proud Paintbrush repaint their home’s exterior.") + PAINTER
  );

  p.bodyHtml = b;
  save("exterior-prices", p);
  console.log("exterior-prices DONE");
}

/* =========================== CABINET =========================== */
{
  const p = load("cabinet-prices");
  let b = p.bodyHtml;

  // hero swap -> cabinet + satisfied-customer combo row
  b = rep(
    b,
    `<img src="/images/migrated/missouri-city-tx-living-room-interior-painting-hardwood-floors.webp" alt="Freshly painted living room with hardwood floors by The Proud Paintbrush" width="1600" height="1200" loading="lazy">`,
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 1.5rem;"><img src="/images/migrated/cabinet-painting-sugar-land-the-proud-paintbrush-white-crisp-kitchen-cabinets.webp" alt="Freshly painted crisp white kitchen cabinets in Sugar Land by The Proud Paintbrush" width="640" height="480" loading="eager" style="display:block;width:100%;height:300px;object-fit:cover;margin:0;border-radius:12px;"><img src="/images/migrated/happy-customer-kitchen-fulshear-tx.webp" alt="Satisfied cabinet painting customer of The Proud Paintbrush in Fulshear, TX" width="1352" height="1014" loading="eager" style="display:block;width:100%;height:300px;object-fit:cover;margin:0;border-radius:12px;"></div>`,
    "cabinet hero combo"
  );

  // pull painter from top
  b = pullPainter(b);

  // remove "Primary Button:" literal text (appears twice)
  b = repAll(b, `<p><strong>Primary Button:</strong> Schedule Your Estimate</p>`, "", "cabinet primary button text");
  // convert the emoji CTA links to real buttons (appears 3x)
  b = repAll(b, `<a href="https://theproudpaintbrush.youcanbook.me"> 👉 Schedule Your Estimate </a>`, button(), "cabinet emoji CTA");

  // Cabinet price ranges -> 3 cards
  const cabOld =
    `<img src="/images/migrated/small-kitchen-cabinet-painting-sugar-land-tx.webp" alt="Freshly painted small kitchen cabinets in Sugar Land, Texas" width="1280" height="960" loading="lazy"><h3>Small Kitchen (10–20 doors/drawers)</h3><p><strong>$2,000 – $4,000</strong></p><img src="/images/migrated/medium-kitchen-white-cabinets-green-island-missouri-city-tx.webp" alt="Medium-sized kitchen with white cabinets and green accent island painted in Missouri City, Texas" width="1600" height="1200" loading="lazy"><h3>Medium Kitchen (20–40 doors/drawers)</h3><p><strong>$4,000 – $7,000</strong></p><img src="/images/migrated/large-kitchen-cabinet-painting-spray-finish-fulshear-tx.webp" alt="Freshly painted large kitchen cabinets with spray finish in Fulshear, Texas" width="1280" height="960" loading="lazy"><h3>Large Kitchen (40+ doors/drawers or complex layouts)</h3><p><strong>$7,000 – $10,000+</strong></p>`;
  const cabNew =
    cardGridOpen(240) +
    priceCard("/images/migrated/small-kitchen-cabinet-painting-sugar-land-tx.webp", "Freshly painted small kitchen cabinets in Sugar Land, Texas", 1280, 960, "Small Kitchen", "$2,000 – $4,000") +
    priceCard("/images/migrated/medium-kitchen-white-cabinets-green-island-missouri-city-tx.webp", "Medium-sized kitchen with white cabinets and green accent island in Missouri City, Texas", 1600, 1200, "Medium Kitchen", "$4,000 – $7,000") +
    priceCard("/images/migrated/large-kitchen-cabinet-painting-spray-finish-fulshear-tx.webp", "Freshly painted large kitchen cabinets with spray finish in Fulshear, Texas", 1280, 960, "Large Kitchen", "$7,000 – $10,000+") +
    `</div>`;
  b = rep(b, cabOld, cabNew, "cabinet price cards");

  // adjacent vertical photos -> side by side
  const vOld =
    `<img src="/images/migrated/green-cabinet-painting-spray-finish-west-houston-tx-angle-1.webp" alt="Freshly painted green cabinets with spray finish in West Houston, Texas" width="600" height="800" loading="lazy"><img src="/images/migrated/cabinet-painting-sugar-land-the-proud-paintbrush-bathroom-vanity-and-closet-painted.webp" alt="Freshly painted green bathroom vanity in West Houston, Texas" width="600" height="800" loading="lazy">`;
  const vNew =
    `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:1.5rem 0;"><img src="/images/migrated/green-cabinet-painting-spray-finish-west-houston-tx-angle-1.webp" alt="Freshly painted green cabinets with spray finish in West Houston, Texas" width="600" height="800" loading="lazy" style="margin:0;border-radius:12px;"><img src="/images/migrated/cabinet-painting-sugar-land-the-proud-paintbrush-bathroom-vanity-and-closet-painted.webp" alt="Freshly painted bathroom vanity and closet in West Houston, Texas" width="600" height="800" loading="lazy" style="margin:0;border-radius:12px;"></div>`;
  b = rep(b, vOld, vNew, "cabinet vertical side-by-side");

  // remove quotes + add video + painter at bottom
  b = cutQuotesAndAppend(
    b,
    videoSection("W96cOO6v1LA", "Hear From Our Customers", "Watch a local homeowner talk about their cabinet painting experience with The Proud Paintbrush.") + PAINTER
  );

  p.bodyHtml = b;
  save("cabinet-prices", p);
  console.log("cabinet-prices DONE");
}

console.log("ALL DONE");
