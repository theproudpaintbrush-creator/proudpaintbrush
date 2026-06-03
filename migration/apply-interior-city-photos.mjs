// Replace the interior customerPhotos on each city page (lib/cities.ts) with
// curated finished-INTERIOR photos corresponding to the service-areas sister
// page. Also update the grid heading on the interior city template.
import fs from "node:fs";
import path from "node:path";

const citiesFile = path.join(process.cwd(), "lib", "cities.ts");
let src = fs.readFileSync(citiesFile, "utf-8");

const M = (f, alt) => `        { src: "/images/migrated/${f}", alt: "${alt}" },`;
const block = (lines) => `      customerPhotos: [\n${lines.join("\n")}\n      ],`;

const reps = [
  // SUGAR LAND (interior)
  [
    `      customerPhotos: [\n        { src: "/images/interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy interior painting customer in Sugar Land TX holding 100% satisfied sign" },\n        { src: "/images/interior-painting-project-happy-customer-sugar-land-tx.jpg", alt: "Freshly painted interior project in a Sugar Land TX home" },\n        { src: "/images/commercial-interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Satisfied Sugar Land TX customer after interior painting project" },\n      ],`,
    block([
      M("arched-window-living-room-repaint-sugar-land-tx.webp", "Living room with arched windows freshly painted in Sugar Land, TX by The Proud Paintbrush"),
      M("white-kitchen-marble-island-repaint-sugar-land-tx.webp", "Bright kitchen with white cabinets and marble island painted in Sugar Land, TX by The Proud Paintbrush"),
      M("white-brick-fireplace-repaint-sugar-land-tx.webp", "Whitewashed brick fireplace painted in a Sugar Land, TX home by The Proud Paintbrush"),
    ]),
  ],
  // MISSOURI CITY (interior)
  [
    `      customerPhotos: [\n        { src: "/images/customer-satisfied-interior.jpg", alt: "Satisfied Missouri City TX homeowner after interior painting" },\n        { src: "/images/interior-crown-molding.jpg", alt: "Freshly painted crown molding and ceiling in a Missouri City TX home" },\n        { src: "/images/closet-interior.jpg", alt: "Freshly painted interior closet in a Missouri City TX home" },\n      ],`,
    block([
      M("white-living-room-marble-floor-repaint-missouri-city-tx.webp", "White living room with marble floors freshly painted in Missouri City, TX by The Proud Paintbrush"),
      M("cream-formal-living-room-repaint-missouri-city-tx.webp", "Cream formal living room repainted in a Missouri City, TX home by The Proud Paintbrush"),
      M("gray-media-room-striped-accent-wall-missouri-city-tx.webp", "Media room with gray striped accent wall painted in Missouri City, TX by The Proud Paintbrush"),
    ]),
  ],
  // KATY (interior)
  [
    `      customerPhotos: [\n        { src: "/images/happy-customer-cabinet-painting-katy-tx.jpg", alt: "Happy Katy TX customer after kitchen cabinet painting" },\n        { src: "/images/service-cabinet.jpg", alt: "Freshly painted kitchen cabinets in a Katy TX home" },\n        { src: "/images/pricing-interior.jpg", alt: "Interior walls and trim painted in a Katy TX home" },\n      ],`,
    block([
      M("greige-living-room-tray-ceiling-repaint-katy-tx.webp", "Living room with greige walls and tray ceiling painted in Katy, TX by The Proud Paintbrush"),
      M("cream-living-room-fireplace-repaint-katy-tx.jpg", "Cream living room with fireplace repainted in a Katy, TX home by The Proud Paintbrush"),
      M("gray-blue-kitchen-cabinet-repaint-katy-tx.webp", "Kitchen with gray-blue painted cabinets in Katy, TX by The Proud Paintbrush"),
    ]),
  ],
  // ROSENBERG (interior)
  [
    `      customerPhotos: [\n        { src: "/images/warranty-white-cabinets.jpg", alt: "Crisp white cabinets after interior painting in a Rosenberg TX home" },\n        { src: "/images/service-interior.jpg", alt: "Interior wall and trim painting in a Rosenberg TX home" },\n        { src: "/images/customer-satisfied-interior.jpg", alt: "Satisfied Rosenberg TX homeowner after interior painting" },\n      ],`,
    block([
      M("rosenberg-tx-luxury-neutral-living-room-painting.webp", "Neutral luxury living room repainted in a Rosenberg, TX home by The Proud Paintbrush"),
      M("master-bedroom-ceiling-walls-trim-crown-rosenberg-tx.webp", "Master bedroom walls, ceiling, trim, and crown molding painted in Rosenberg, TX by The Proud Paintbrush"),
      M("color-drenched-living-room-walls-ceiling-trim-rosenberg-tx.webp", "Color-drenched living room with painted walls, ceiling, and trim in Rosenberg, TX by The Proud Paintbrush"),
    ]),
  ],
  // RICHMOND (interior)
  [
    `      customerPhotos: [\n        { src: "/images/cabinet-kitchen-richmond.jpg", alt: "Freshly painted kitchen cabinets in a Richmond TX home" },\n        { src: "/images/warranty-white-cabinets.jpg", alt: "Crisp white cabinets after interior painting in a Richmond TX home" },\n        { src: "/images/service-drywall.jpg", alt: "Drywall repair and interior wall painting in a Richmond TX home" },\n      ],`,
    block([
      M("great-room-kitchen-neutral-walls-richmond-tx.webp", "Great room and kitchen with neutral walls painted in Richmond, TX by The Proud Paintbrush"),
      M("gray-two-story-living-room-repaint-richmond-tx.webp", "Two-story living room with gray walls repainted in Richmond, TX by The Proud Paintbrush"),
      M("cream-dining-room-vaulted-ceiling-repaint-richmond-tx.webp", "Cream dining room with vaulted ceiling repainted in Richmond, TX by The Proud Paintbrush"),
    ]),
  ],
  // FULSHEAR (interior)
  [
    `      customerPhotos: [\n        { src: "/images/cabinet-fulshear.webp", alt: "Freshly painted kitchen cabinets in a Fulshear TX home" },\n        { src: "/images/pricing-cabinets.jpg", alt: "Cabinet painting project in a Fulshear TX kitchen" },\n        { src: "/images/closet-interior-2.jpg", alt: "Freshly painted interior closet in a Fulshear TX home" },\n      ],`,
    block([
      M("fulshear-tx-warm-inviting-living-room-painting.webp", "Warm, inviting living room freshly painted in Fulshear, TX by The Proud Paintbrush"),
      M("game-room-pool-table-fulshear-tx.webp", "Game room with pool table freshly painted in Fulshear, TX by The Proud Paintbrush"),
      M("white-shiplap-fireplace-vaulted-ceiling-fulshear-tx.webp", "White shiplap fireplace with vaulted ceiling painted in Fulshear, TX by The Proud Paintbrush"),
    ]),
  ],
  // WEST HOUSTON (interior)
  [
    `      customerPhotos: [\n        { src: "/images/commerical-interior-painting-happy-customer-west-houston.jpg", alt: "Happy West Houston TX customer after interior painting project" },\n        { src: "/images/interior-crown-molding.jpg", alt: "Hand-painted crown molding detail in a West Houston TX home" },\n        { src: "/images/pricing-interior.jpg", alt: "Interior wall and trim painting in a West Houston TX home" },\n      ],`,
    block([
      M("taupe-dining-room-wall-repaint-west-houston-tx.jpg", "Dining room with taupe walls repainted in West Houston, TX by The Proud Paintbrush"),
      M("living-room-brick-fireplace-repaint-west-houston-tx.webp", "Living room with brick fireplace and built-ins painted in West Houston, TX by The Proud Paintbrush"),
      M("upstairs-game-loft-painted-west-houston-tx.webp", "Upstairs game loft freshly painted in a West Houston, TX home by The Proud Paintbrush"),
    ]),
  ],
  // SOUTHWEST HOUSTON (interior)
  [
    `      customerPhotos: [\n        { src: "/images/interior-crown-molding.jpg", alt: "Hand-painted crown molding in a Southwest Houston TX character home" },\n        { src: "/images/closet-interior-2.jpg", alt: "Freshly painted interior closet in a Southwest Houston TX home" },\n        { src: "/images/customer-satisfied-interior.jpg", alt: "Satisfied Southwest Houston TX homeowner after interior painting" },\n      ],`,
    block([
      M("open-concept-living-dining-room-southwest-houston-tx.webp", "Open-concept living and dining room freshly painted in Southwest Houston, TX by The Proud Paintbrush"),
      M("curved-staircase-foyer-repaint-southwest-houston-tx.webp", "Curved staircase foyer repainted in a Southwest Houston, TX home by The Proud Paintbrush"),
      M("gray-living-room-repaint-southwest-houston-tx.webp", "Living room with gray accent walls repainted in Southwest Houston, TX by The Proud Paintbrush"),
    ]),
  ],
];

let applied = 0;
for (const [oldStr, newStr] of reps) {
  if (!src.includes(oldStr)) {
    console.error("NOT FOUND:\n" + oldStr.split("\n")[1]);
    process.exit(1);
  }
  src = src.replace(oldStr, newStr);
  applied++;
}
fs.writeFileSync(citiesFile, src);
console.log(`cities.ts: replaced ${applied}/8 interior customerPhotos blocks`);

const pageFile = path.join(process.cwd(), "app", "interior-painting", "[city]", "page.tsx");
let page = fs.readFileSync(pageFile, "utf-8");
const oldHead = "          heading={`Real ${city.name} Customers, Real Finished Interiors`}\n          subheading={`Every job ends the same way — a homeowner happy with a freshly painted home. Here are a few from ${city.name}.`}";
const newHead = "          heading={`Freshly Painted ${city.name} Interiors`}\n          subheading={`A look at interior repaints we have completed across ${city.name}.`}";
if (!page.includes(oldHead)) { console.error("page heading not found"); process.exit(1); }
page = page.replace(oldHead, newHead);
fs.writeFileSync(pageFile, page);
console.log("interior page.tsx: grid heading updated");
