// Rebuild the Color Tips (color-consultation) page into a card-based layout.
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const file = path.join(process.cwd(), "content", "pages", "color-consultation.json");
const MIG = path.join(process.cwd(), "public", "images", "migrated");
const page = JSON.parse(fs.readFileSync(file, "utf-8"));

// dims: parse from the OLD body, fall back to sharp for new images
const dimMap = {};
for (const m of page.bodyHtml.matchAll(/<img src="\/images\/migrated\/([^"]+)"[^>]*width="(\d+)"[^>]*height="(\d+)"/g)) {
  dimMap[m[1]] = { w: +m[2], h: +m[3] };
}
async function dims(f) {
  if (dimMap[f]) return dimMap[f];
  const m = await sharp(path.join(MIG, f)).metadata();
  return (dimMap[f] = { w: m.width, h: m.height });
}

// ---- HTML helpers (inline styles so they don't depend on Tailwind scanning JSON) ----
const GRID = 'style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:1.25rem;margin:1.75rem 0"';
const CARD = 'style="border:1px solid #e5e7eb;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,0.08);display:flex;flex-direction:column"';
const IMG = (w, h) => `style="margin:0;width:100%;height:210px;object-fit:cover;display:block" width="${w}" height="${h}"`;
const PAD = 'style="padding:1rem 1.25rem"';
const H3 = 'style="margin-top:0;margin-bottom:0.5rem"';

async function card(img, alt, heading, inner) {
  const d = await dims(img);
  return `<div ${CARD}><img src="/images/migrated/${img}" alt="${alt}" ${IMG(d.w, d.h)} loading="lazy"><div ${PAD}><h3 ${H3}>${heading}</h3>${inner}</div></div>`;
}
const ul = (items) => `<ul style="margin:0;padding-left:1.1rem">${items.map((i) => `<li>${i}</li>`).join("")}</ul>`;
async function grid(cards) { return `<div ${GRID}>${(await Promise.all(cards)).join("")}</div>`; }

// blog cards
const BLOG_GRID = 'style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin:1.5rem 0"';
const BLOG_IMG = (w, h) => `style="margin:0;width:100%;height:150px;object-fit:cover;display:block" width="${w}" height="${h}"`;
async function blogCard(href, img, alt, title) {
  const d = await dims(img);
  return `<a href="${href}" style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;background:#fff;text-decoration:none;display:flex;flex-direction:column"><img src="/images/migrated/${img}" alt="${alt}" ${BLOG_IMG(d.w, d.h)} loading="lazy"><span style="display:block;padding:0.75rem 1rem;font-weight:600;color:#1a2e44;font-size:0.95rem;line-height:1.3">${title}</span></a>`;
}

const SCHEDULE = '<p><a href="https://theproudpaintbrush.youcanbook.me">Schedule Your Free Painting Estimate</a></p>';

const b = [];
// HERO + intro
const hero = "sugar-land-tx-open-concept-kitchen-living-room-painting.webp";
const hd = await dims(hero);
b.push(`<img src="/images/migrated/${hero}" alt="Freshly painted open-concept kitchen and living room with warm neutral colors in Sugar Land, TX by The Proud Paintbrush" width="${hd.w}" height="${hd.h}" loading="lazy">`);
b.push(`<h2>How to Choose the Right Paint Colors for Your Home in Sugar Land &amp; Houston</h2>`);
b.push(`<p>The color has to be right. Before the prep work begins, before the first wall gets covered, before the final walkthrough — there's one decision that shapes the entire feeling of your home: what color should you choose?</p>`);
b.push(`<p>At The Proud Paintbrush, we believe a beautiful paint job is about more than smooth walls and crisp lines. The right paint color changes the atmosphere of a space — it affects mood, lighting, flow, warmth, energy, and even how large or small a room feels. That's why we guide homeowners through the color selection process, not just the painting process.</p>`);
b.push(SCHEDULE);

// WHY COLOR MATTERS (prose)
b.push(`<h2>Why Paint Color Matters More Than Most Homeowners Realize</h2>`);
b.push(`<p>Paint color is one of the largest visual elements inside your home. It influences how bright a room feels, whether a space feels calm or energetic, how connected your home feels, and how flooring, cabinets, countertops, and furniture work together.</p>`);
b.push(`<p>In Sugar Land and the greater Houston area, natural light plays a huge role too. Texas sunlight can warm up cool colors, wash out subtle undertones, intensify brightness, and dramatically shift how a color feels from morning to evening — which is why choosing colors from tiny swatches or online photos often leads to disappointment.</p>`);

// NARROWING DOWN (4 cards)
b.push(`<h2>Start by Narrowing Down Your Direction</h2>`);
b.push(`<p>One of the biggest mistakes homeowners make is trying to choose from thousands of colors all at once. Start by narrowing the field, then build from there.</p>`);
b.push(await grid([
  card("paint-color-palette-selection-tips-sugar-land-tx.webp", "Neutral and blue paint color palette samples for color selection in Sugar Land, TX by The Proud Paintbrush", "First, narrow things down to:", ul(["2 or 3 color families", "a general mood", "a style direction"])),
  card("fulshear-tx-warm-inviting-living-room-painting.webp", "Warm and inviting living room with neutral paint colors in Fulshear, TX by The Proud Paintbrush", "For example:", ul(["Warm and cozy", "Bright and airy", "Modern and dramatic", "Soft and calming", "Earthy and natural", "Timeless and neutral"])),
  card("great-room-kitchen-neutral-walls-richmond-tx.webp", "Great room and kitchen with neutral painted walls in Richmond, TX by The Proud Paintbrush", "At that point, we can start exploring:", ul(["Monochromatic palettes", "Coordinating trim colors", "Complementary accent colors", "Cabinet combinations", "Designer-recommended pairings", "Undertones &amp; lighting behavior"])),
  card("bedroom-interior-painting-southwest-houston-jpg.webp", "Freshly painted dark blue bedroom with tray ceiling in Southwest Houston, TX by The Proud Paintbrush", "Always test paint samples first", `<p style="margin:0 0 0.5rem">Paint rarely looks the same on your wall as it does on a swatch, a screen, or in a store. Test 2&ndash;3 samples on your actual walls and view them:</p>${ul(["Morning, afternoon &amp; evening", "With the lights on and off"])}`),
]));

// COLOR DRENCHING (prose intro + 3 cards)
b.push(`<h2>Monochromatic Palettes &amp; Color Drenching</h2>`);
b.push(`<p>A monochromatic palette uses multiple shades and tones from the same color family throughout the home, so each space feels calmer, more connected, and more intentional. <strong>Color drenching</strong> takes the idea further — painting the walls, trim, ceilings, and sometimes cabinetry in the same or closely related shades.</p>`);
b.push(await grid([
  card("katy-tx-dark-blue-color-drenching-bedroom.webp", "Dark blue color-drenched bedroom with matching trim in Katy, TX by The Proud Paintbrush", "This technique involves painting:", ul(["Walls", "Trim", "Ceilings", "Doors", "Sometimes even cabinetry"])),
  card("missouri-city-tx-color-drenching-bedroom-design.webp", "Warm neutral color-drenched bedroom in Missouri City, TX by The Proud Paintbrush", "The result creates:", ul(["Softer transitions", "Richer atmosphere", "Stronger mood", "More architectural depth", "Designer-inspired cohesion"])),
  card("sugar-land-tx-monochromatic-bedroom-paint-colors.webp", "Bedroom with a soft green monochromatic palette in Sugar Land, TX by The Proud Paintbrush", "It works especially well in:", ul(["Dining rooms", "Offices", "Powder bathrooms", "Bedrooms", "Cozy living spaces"])),
]));

// FLOORS (prose)
b.push(`<h2>Your Floors Matter More Than You Think</h2>`);
b.push(`<p>Your floors are one of the largest visual surfaces in your home and usually stay in place far longer than paint. Your color has to work with wood, tile, stone, countertops, cabinets, and fixed finishes — and undertones matter tremendously. Warm wood floors pair best with warmer whites and greiges, while cooler gray flooring works better with cleaner neutrals. It's one big reason a professional color consultation saves homeowners from expensive mistakes.</p>`);

// FLOW (prose intro + 2 cards)
b.push(`<h2>Think About Flow Throughout the Home</h2>`);
b.push(`<p>In open-concept homes especially, color flow matters. Too many disconnected colors make a home feel chopped up.</p>`);
b.push(await grid([
  card("rosenberg-tx-open-concept-living-room-painting.webp", "Open-concept living room with tall windows and freshly painted walls in Rosenberg, TX by The Proud Paintbrush", "Instead, many homeowners today prefer:", ul(["Connected palettes", "Subtle transitions", "Layered neutrals", "Repeating tones", "Complementary shades"])),
  card("fulshear-tx-modern-living-room-interior-painting.webp", "Modern living room with bright neutral walls in Fulshear, TX by The Proud Paintbrush", "This creates:", ul(["Better visual harmony", "Smoother transitions between rooms", "A more intentional design feel", "Stronger resale appeal"])),
]));

// MOOD (3 cards)
b.push(`<h2>Use Color to Shape the Mood of Your Space</h2>`);
b.push(`<p>Different colors create different emotional responses. Here's how we help homeowners match color to the feeling they want in each room.</p>`);
b.push(await grid([
  card("katy-tx-soft-neutral-bedroom-painting.webp", "Soft neutral bedroom with calming wall colors in Katy, TX by The Proud Paintbrush", "Soft &amp; Relaxing", `<p style="margin:0 0 0.5rem"><strong>Great for:</strong> bedrooms, bathrooms, reading spaces.</p>${ul(["Soft sage", "Muted blue", "Warm off-whites", "Dusty green"])}`),
  card("rosenberg-tx-luxury-neutral-living-room-painting.webp", "Luxury living room with warm neutral paint colors in Rosenberg, TX by The Proud Paintbrush", "Warm &amp; Inviting", `<p style="margin:0 0 0.5rem"><strong>Great for:</strong> living rooms, kitchens, gathering spaces.</p>${ul(["Greige", "Warm whites", "Clay tones", "Earthy neutrals"])}`),
  card("richmond-tx-bold-fireplace-accent-wall-painting.webp", "Bold fireplace accent wall in Richmond, TX by The Proud Paintbrush", "Bold &amp; Dramatic", `<p style="margin:0 0 0.5rem"><strong>Great for:</strong> accent walls, dining rooms, offices, powder baths.</p>${ul(["Charcoal", "Deep navy", "Forest green", "Black accents"])}`),
]));

// NEUTRAL (prose)
b.push(`<h2>Neutral Doesn't Mean Boring</h2>`);
b.push(`<p>Neutrals remain the most popular choice in Sugar Land and Houston homes, but great neutrals are rarely "plain." The secret is layering undertones, textures, sheens, contrast, and lighting so a neutral palette can feel warm, luxurious, bright, modern, and timeless all at once.</p>`);

// ACCENT WALLS (prose intro + 3 cards)
b.push(`<h2>Accent Walls Done Right</h2>`);
b.push(`<p>Accent walls work best when they feel intentional — not random.</p>`);
b.push(await grid([
  card("sugar-land-tx-purple-accent-wall-living-room.webp", "Living room with a bold purple accent wall in Sugar Land, TX by The Proud Paintbrush", "A good accent wall:", ul(["Creates focus", "Adds depth", "Supports the architecture", "Enhances the room's mood"])),
  card("west-houston-tx-modern-accent-wall-design.webp", "Modern dark blue accent wall with geometric trim in West Houston, TX by The Proud Paintbrush", "Popular accent wall colors include:", ul(["Dark blue", "Black", "Deep green", "Warm charcoal", "Muted terracotta"])),
  card("richmond-tx-black-accent-wall-dining-room.webp", "Dining area with a black accent wall and statement lighting in Richmond, TX by The Proud Paintbrush", "Accent walls often work best:", ul(["Behind beds", "Around fireplaces", "In dining rooms", "In offices", "In recessed architectural spaces"])),
]));

// TRENDS (prose)
b.push(`<h2>Popular Color Trends in Sugar Land &amp; Houston Homes</h2>`);
b.push(`<p>Trends we see most include warm whites, earthy neutrals, greige tones, muted greens, soft organic palettes, dark moody accent rooms, monochromatic interiors, and black trim accents. The best choices balance personal style, current design trends, and long-term livability.</p>`);

// WORKING WITH TPP (2 cards)
b.push(`<h2>Working With The Proud Paintbrush</h2>`);
b.push(`<p>We don't believe homeowners should feel overwhelmed by color selection.</p>`);
b.push(await grid([
  card("west-houston-tx-modern-home-office-painting.webp", "Modern home office with soft gray walls in West Houston, TX by The Proud Paintbrush", "Our goal is to guide you through the process with:", ul(["Real-world experience", "Lighting awareness", "Undertone understanding", "Design-flow considerations", "Practical application knowledge"])),
  card("sugar-land-tx-home-gym-interior-painting.webp", "Freshly painted home gym in Sugar Land, TX by The Proud Paintbrush", "We help homeowners think through:", ul(["Flooring &amp; lighting", "Cabinet colors", "Trim pairings", "Transitions between rooms", "Long-term satisfaction &amp; resale"])),
]));
b.push(SCHEDULE);

// SERVICE AREAS (internal linked)
const CITY_LINKS = [
  ["Sugar Land", "sugar-land"], ["Missouri City", "missouri-city"], ["Richmond", "richmond"], ["Katy", "katy"],
  ["Rosenberg", "rosenberg"], ["Fulshear", "fulshear"], ["West Houston", "west-houston"], ["Southwest Houston", "southwest-houston"],
];
b.push(`<h2>Serving Sugar Land &amp; the Greater Houston Area</h2>`);
b.push(`<p>We proudly help homeowners throughout ${CITY_LINKS.map(([n, s]) => `<a href="/service-areas/${s}">${n}</a>`).join(", ")}, plus Stafford, Pearland, and surrounding Fort Bend County communities. <a href="/service-areas">See all service areas</a>.</p>`);

// FAQ (prose; schema comes from faqs[])
b.push(`<h2>Frequently Asked Questions</h2>`);
const FAQ = [
  ["What paint colors make rooms feel larger?", "Lighter colors typically reflect more natural light and create a more open, airy feeling. Warm whites, soft grays, and light neutrals are popular choices."],
  ["What is color drenching in interior painting?", "Color drenching is the technique of painting walls, trim, ceilings, and sometimes doors in the same or similar shades to create a more immersive and cohesive look."],
  ["Should flooring affect paint color choices?", "Absolutely. Flooring has a major impact on how paint colors appear because wood, tile, stone, and carpet all contain undertones that influence surrounding colors."],
  ["Should every room in my home be a different color?", "Not necessarily. Many modern homes use connected palettes and subtle transitions to create better flow and visual harmony."],
  ["Why do paint colors look different in my house?", "Lighting, flooring, surrounding finishes, and undertones all affect how paint colors appear throughout the day."],
  ["What colors are best for resale value?", "Neutral colors like warm whites, greige, soft beige, and muted earth tones tend to appeal to the widest range of buyers while still feeling modern and inviting."],
];
for (const [q, a] of FAQ) b.push(`<h3>${q}</h3><p>${a}</p>`);
page.faqs = FAQ.map(([q, a]) => ({ q, a }));

// BLOG CARDS (7 small cards)
b.push(`<h2>More Color Tips From Our Blog</h2>`);
b.push(await grid([
  blogCard("/blog/here-is-a-quick-way-to-understand-paint-sheens", "painter-rolling-ceiling-interior-missouri-city-tx.webp", "Painter rolling a freshly painted ceiling in Missouri City, TX", "Perfect Finish: How to Choose Paint Finishes"),
  blogCard("/blog/9-keys-to-a-perfect-accent-wall", "blue-accent-wall-gold-accents-interior-katy-tx.webp", "Blue feature wall with gold accents in Katy, TX", "Accentuate With Accent Wall Paint Colors"),
  blogCard("/blog/crafting-harmony-exploring-warm-and-cool-interior-paint-colors", "two-story-hallway-off-white-interior-richmond-tx.webp", "Two-story hallway in a cool off-white in Richmond, TX", "The Impacts of Warm &amp; Cool Spaces"),
  blogCard("/blog/unlocking-the-5-color-psychology-secrets", "periwinkle-accent-wall-living-room-painting-west-houston-tx.webp", "Living room with a periwinkle accent wall in West Houston, TX", "Unlocking 5 Secrets of Color Psychology"),
  blogCard("/blog/lrv", "white-brick-exterior-black-accents-house-painting-missouri-city-tx.webp", "White brick exterior with black accents in Missouri City, TX", "LRV: The Secret Tool for Choosing Your Shade"),
  blogCard("/blog/colors-to-paint-your-house-for-2023", "kitchen-black-accent-wall-interior-painting-katy-tx.webp", "Kitchen with a black accent wall in Katy, TX", "What Everybody Ought to Know About Paint Colors"),
  blogCard("/blog/understanding-undertones", "blue-bedroom-interior-painting-west-houston-tx.webp", "Bedroom with light blue walls in West Houston, TX", "Common Mistakes: Understanding Undertones"),
]));

// CLOSING CTA
b.push(`<h2>Need Help Choosing the Right Paint Colors?</h2>`);
b.push(`<p>At The Proud Paintbrush, we help homeowners create spaces that feel intentional, timeless, and beautiful — not overwhelming. If you're planning an interior painting project in Sugar Land or the surrounding Houston area, we'd love to help guide you through the color selection process.</p>`);
b.push(SCHEDULE);

page.bodyHtml = b.join("");
page.metaDescription = page.metaDescription.replace(/\s+$/g, "").trim();
fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
console.log(`✓ color-consultation rebuilt: ${(page.bodyHtml.match(/<img/g) || []).length} imgs, ${(page.bodyHtml.match(/grid-template-columns/g) || []).length} grids, ${page.faqs.length} FAQs, meta(${page.metaDescription.length})`);
