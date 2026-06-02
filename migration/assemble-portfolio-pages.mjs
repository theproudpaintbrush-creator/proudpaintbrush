import fs from "node:fs";
import path from "node:path";

const file = (k) => path.join(process.cwd(), "content", "pages", k + ".json");
const load = (k) => JSON.parse(fs.readFileSync(file(k), "utf-8"));
const save = (k, o) => fs.writeFileSync(file(k), JSON.stringify(o, null, 2));
function rep(html, find, replace, label) {
  if (!html.includes(find)) throw new Error("NOT FOUND: " + label);
  return html.replace(find, replace);
}

function galleryGrid(items) {
  if (!items.length) return "";
  const cells = items
    .map(
      (it) =>
        `<figure style="margin:0;aspect-ratio:1/1;overflow:hidden;border-radius:8px;background:#f3f4f6;"><img src="${it.src}" alt="${it.alt.replace(/"/g, "&quot;")}" loading="lazy" style="width:100%;height:100%;object-fit:cover;margin:0;border-radius:0;box-shadow:none;"></figure>`
    )
    .join("");
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(170px,1fr));gap:10px;margin:1.5rem 0;">${cells}</div>`;
}

function videoSection(id, title, intro) {
  return (
    `<h2>${title}</h2><p>${intro}</p>` +
    `<div style="max-width:720px;margin:1.5rem auto;"><div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:12px;box-shadow:0 4px 14px rgba(0,0,0,0.15);">` +
    `<iframe src="https://www.youtube.com/embed/${id}?rel=0" title="The Proud Paintbrush customer video testimonial" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"></iframe>` +
    `</div><p style="text-align:center;margin-top:1rem;"><a href="/testimonials" style="font-weight:600;">▶ Watch more customer video testimonials →</a></p></div>`
  );
}

function hubCard(src, alt, w, h, title, desc, href, linkLabel) {
  return (
    `<a href="${href}" style="display:flex;flex-direction:column;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,0.08);">` +
    `<img src="${src}" alt="${alt}" width="${w}" height="${h}" loading="lazy" style="display:block;width:100%;height:190px;object-fit:cover;margin:0;border-radius:0;box-shadow:none;">` +
    `<div style="padding:1.1rem 1.25rem;"><div style="font-weight:700;font-size:1.15rem;color:#1a2e44;">${title}</div>` +
    `<p style="margin:.4rem 0 .7rem;color:#4b5563;font-size:.95rem;">${desc}</p>` +
    `<span style="color:#4B83B2;font-weight:600;">${linkLabel} →</span></div></a>`
  );
}

const cardGrid = (inner) =>
  `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin:1.5rem 0;">${inner}</div>`;

/* ===================== HUB ===================== */
{
  const p = load("portfolio");
  let b = p.bodyHtml;
  const gallery = p.gallery || [];

  // hero image at top
  b = rep(
    b,
    `<h2>Painting Portfolio</h2>`,
    `<img src="/images/migrated/20211006-155200-4cca24.webp" alt="Freshly repainted two-story home exterior by The Proud Paintbrush in the Sugar Land area" width="1600" height="1200" loading="eager"><h2>Painting Portfolio</h2>`,
    "hub hero"
  );

  // Explore Our Painting Work -> 3 cards
  const exploreOld =
    `<h2>Explore Our Painting Work</h2><h3>Interior Painting Portfolio</h3><p>View completed interior painting projects, including bedrooms, kitchens, living spaces, trim, accent walls, and cabinets.</p><p>Our interior painting portfolio includes projects ranging from single-room updates to full-home repaints. These projects highlight:</p><ul><li><p>Bedrooms, kitchens, bathrooms, and living areas</p></li><li><p>Trim, ceilings, and accent walls</p></li><li><p>Built-ins, cabinetry, and custom features</p></li></ul><p>Careful preparation, precise application, and clean finishes are visible throughout our interior work.</p><a href="https://portfolio/interior-painting"></a><a href="/portfolio/interior-painting"> View Interior Painting Portfolio </a><h3>Exterior Painting Portfolio</h3><p>See exterior painting projects featuring stucco, brick, siding, limewash finishes, decks, fences, and full-home repaints.</p><p>Exterior painting requires products and processes that hold up to weather, sun exposure, and moisture. Our exterior portfolio features:</p><ul><li><p>Stucco, brick, and siding painting</p></li><li><p>Limewash brick transformations</p></li><li><p>Fence and deck staining</p></li><li><p>Garage doors, patio ceilings, and exterior details</p></li></ul><p>Each project focuses on improving curb appeal while protecting surfaces for long-term durability.</p><a href="/portfolio/exterior-painting"></a><a href="/portfolio/exterior-painting"> View Exterior Painting Portfolio </a>`;
  const exploreNew =
    `<h2>Explore Our Painting Work</h2>` +
    cardGrid(
      hubCard("/images/migrated/off-white-interior-living-room-kitchen-painting-katy-tx.webp", "Interior painting project by The Proud Paintbrush", 1280, 960, "Interior Painting", "Bedrooms, kitchens, living spaces, trim, accent walls, and built-ins.", "/portfolio/interior-painting", "View Interior Portfolio") +
      hubCard("/images/migrated/stucco-exterior-off-white-fulshear-tx.webp", "Exterior painting project by The Proud Paintbrush", 1600, 1200, "Exterior Painting", "Stucco, brick, siding, limewash, fences, decks, and full repaints.", "/portfolio/exterior-painting", "View Exterior Portfolio") +
      hubCard("/images/migrated/cabinet-painting-sugar-land-the-proud-paintbrush-white-crisp-kitchen-cabinets.webp", "Cabinet painting project by The Proud Paintbrush", 640, 480, "Cabinet Painting", "Kitchen and bath cabinets sprayed to a smooth, factory-like finish.", "/portfolio/cabinet-painting", "View Cabinet Portfolio")
    );
  b = rep(b, exploreOld, exploreNew, "hub 3 cards");

  // gallery between Specialty and Why Homeowners
  b = rep(
    b,
    `<h2>Why Homeowners Choose The Proud Paintbrush</h2>`,
    `<h2>Project Gallery</h2><p>A selection of completed projects, grouped by color.</p>${galleryGrid(gallery)}<h2>Why Homeowners Choose The Proud Paintbrush</h2>`,
    "hub gallery insert"
  );

  // video at bottom
  b += videoSection("4K_j8zfo2zQ", "Hear From Our Customers", "See what working with The Proud Paintbrush is really like — straight from local homeowners.");

  p.bodyHtml = b;
  p.gallery = [];
  save("portfolio", p);
  console.log("hub DONE (gallery", gallery.length, ")");
}

/* ===================== INTERIOR ===================== */
{
  const p = load("portfolio/interior-painting");
  let b = p.bodyHtml;
  const gallery = p.gallery || [];

  // fix broken "mill" link
  b = b.split(`<a href="https://mill">,</a>`).join(",");

  // remove duplicated "Looking for More Details" block
  const block = `<h2>Looking for More Details About Interior Painting?</h2><p>If you’d like to learn more about our interior painting process, materials, or what to expect during a project, you can explore the page below.</p><p><a href="/painting-services/interior-painting">→ <strong>Explore Interior Painting Services</strong></a></p>`;
  b = rep(b, block + block, block, "interior dedup block");

  // gallery before FAQs
  b = rep(b, `<h2>Interior Portfolio FAQs</h2>`, `<h2>Project Gallery</h2><p>Completed interior projects, grouped by color.</p>${galleryGrid(gallery)}<h2>Interior Portfolio FAQs</h2>`, "interior gallery insert");

  // video at bottom
  b += videoSection("Z208PaNZY4U", "Hear From an Interior Painting Customer", "A local homeowner shares their experience with our interior painting work.");

  p.bodyHtml = b;
  p.gallery = [];
  save("portfolio/interior-painting", p);
  console.log("interior DONE (gallery", gallery.length, ")");
}

/* ===================== EXTERIOR ===================== */
{
  const p = load("portfolio/exterior-painting");
  let b = p.bodyHtml;
  const gallery = p.gallery || [];

  // fix broken "patio" link
  b = b.split(`<a href="https://patio">Patio ceilings and outdoor living spaces</a>`).join("Patio ceilings and outdoor living spaces");

  // gallery before FAQs
  b = rep(b, `<h2>Exterior Portfolio FAQs</h2>`, `<h2>Project Gallery</h2><p>Completed exterior projects, grouped by color.</p>${galleryGrid(gallery)}<h2>Exterior Portfolio FAQs</h2>`, "exterior gallery insert");

  // video at bottom
  b += videoSection("5rhZR2sQC2g", "Hear From an Exterior Painting Customer", "A local homeowner shares their experience with our exterior painting work.");

  p.bodyHtml = b;
  p.gallery = [];
  save("portfolio/exterior-painting", p);
  console.log("exterior DONE (gallery", gallery.length, ")");
}

/* ===================== CABINET ===================== */
{
  const p = load("portfolio/cabinet-painting");
  let b = p.bodyHtml; // a single intro <p>
  const gallery = p.gallery || [];

  b +=
    `<h2>Cabinet Painting Projects</h2><p>Browse real kitchen and bathroom cabinet projects completed across Sugar Land, Missouri City, Richmond, Katy, Fulshear, Rosenberg, and West Houston. Our cabinet work includes:</p>` +
    `<ul><li><a href="/pricing/cabinet-prices">Kitchen cabinet repaints</a> in white, gray, green, navy, and two-tone finishes</li><li>Bathroom vanities and built-in cabinetry</li><li>Spray-applied, factory-smooth durable finishes</li><li>Color changes from dark to light — and light to bold</li></ul>` +
    `<p>Every set is degreased, sanded, bonding-primed, and sprayed for a hard, long-lasting finish.</p>` +
    `<h2>What You’ll Notice in Our Cabinet Work</h2><ul><li>Smooth, even spray finishes with no brush marks</li><li>Clean lines at edges, hardware, and trim</li><li>Durable coatings built for daily kitchen use</li><li>Careful prep and masking for a tidy, protected workspace</li></ul>` +
    `<h2>Looking for More Details About Cabinet Painting?</h2><p>If you’d like to learn more about our cabinet painting process, finishes, and pricing, explore the pages below.</p><p><a href="/cabinet-painting">→ <strong>Explore Cabinet Painting Services</strong></a><br><a href="/pricing/cabinet-prices">→ <strong>View Cabinet Painting Pricing</strong></a></p>` +
    `<h2>Project Gallery</h2><p>Completed cabinet projects, grouped by color.</p>${galleryGrid(gallery)}` +
    `<h2>Cabinet Portfolio FAQs</h2><p><strong>What kinds of cabinets do you paint?</strong><br> Kitchen cabinets, bathroom vanities, islands, and built-ins — in a wide range of colors and finishes.</p><p><strong>How long do painted cabinets last?</strong><br> With proper prep and sprayed coatings, cabinet finishes typically last 7–10+ years.</p><p><strong>Are these photos from real projects?</strong><br> Yes. Every image shows a completed cabinet project handled by The Proud Paintbrush.</p>` +
    videoSection("N9c6vXqTht4", "Hear From a Cabinet Painting Customer", "A local homeowner shares their experience with our cabinet painting work.");

  p.bodyHtml = b;
  p.gallery = [];
  save("portfolio/cabinet-painting", p);
  console.log("cabinet DONE (gallery", gallery.length, ")");
}

console.log("ASSEMBLY DONE");
