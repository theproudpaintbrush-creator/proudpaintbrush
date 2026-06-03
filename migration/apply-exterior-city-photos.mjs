// Replace the exterior customerPhotos on each city page (lib/cities.ts) with
// curated finished-EXTERIOR photos that correspond to the service-areas sister
// page (interior/cabinet/sign shots swapped for exterior shots). Also update the
// grid heading on the exterior city template to match finished-home photos.
import fs from "node:fs";
import path from "node:path";

const citiesFile = path.join(process.cwd(), "lib", "cities.ts");
let src = fs.readFileSync(citiesFile, "utf-8");

const M = (f, alt) => `        { src: "/images/migrated/${f}", alt: "${alt}" },`;
const block = (lines) => `      customerPhotos: [\n${lines.join("\n")}\n      ],`;

// [oldExactBlock, newBlock]
const reps = [
  // SUGAR LAND
  [
    `      customerPhotos: [\n        { src: "/images/exterior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer in front of freshly painted Sugar Land TX home holding 100% satisfied sign" },\n        { src: "/images/exterior-home-painting-happy-customers-sugar-land-tx.jpg", alt: "Satisfied homeowners after exterior painting in Sugar Land TX" },\n        { src: "/images/exterior-house-painting-happy-customer-sugar-land-tx.jpg", alt: "Sugar Land TX exterior painting customer with 100% satisfied sign" },\n      ],`,
    block([
      M("white-modern-farmhouse-exterior-sugar-land-tx.webp", "White modern farmhouse exterior freshly painted in Sugar Land, TX by The Proud Paintbrush"),
      M("tan-stucco-exterior-repaint-sugar-land-tx.webp", "Large tan stucco home exterior repainted in Sugar Land, TX by The Proud Paintbrush"),
      M("brick-ranch-home-exterior-sugar-land-tx.webp", "Brick ranch home exterior with fresh trim paint in Sugar Land, TX by The Proud Paintbrush"),
    ]),
  ],
  // MISSOURI CITY
  [
    `      customerPhotos: [\n        { src: "/images/customer-missouri-city.webp", alt: "Missouri City TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/TODO_MISSOURI_CITY_CUSTOMER_2.jpg", alt: "Happy Missouri City TX homeowner after exterior repaint" },\n      ],`,
    block([
      M("white-modern-farmhouse-exterior-missouri-city-tx.webp", "White modern farmhouse exterior freshly painted in Missouri City, TX by The Proud Paintbrush"),
      M("stucco-stone-home-exterior-missouri-city-tx.webp", "Stucco and stone home exterior repainted in Missouri City, TX by The Proud Paintbrush"),
      M("white-black-stucco-exterior-repaint-missouri-city-tx.webp", "White and black stucco two-story home exterior in Missouri City, TX by The Proud Paintbrush"),
    ]),
  ],
  // KATY
  [
    `      customerPhotos: [\n        { src: "/images/ext-customer-katy.jpg", alt: "Katy TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/happy-customer-exterior-brick-painting-katy-tc.jpg", alt: "Happy Katy TX homeowner after brick exterior repainting" },\n        { src: "/images/happy-customer-cabinet-painting-katy-tx.jpg", alt: "Satisfied Katy TX customer after exterior project" },\n      ],`,
    block([
      M("white-brick-two-story-exterior-katy-tx.webp", "White painted brick two-story home exterior in Katy, TX by The Proud Paintbrush"),
      M("two-story-brick-home-exterior-katy-tx.webp", "Two-story brick home exterior freshly painted in Katy, TX by The Proud Paintbrush"),
      M("stucco-courtyard-tile-patio-katy-tx.webp", "Stucco home with courtyard and tile patio painted in Katy, TX by The Proud Paintbrush"),
    ]),
  ],
  // ROSENBERG
  [
    `      customerPhotos: [\n        { src: "/images/customer-happy-home.jpg", alt: "Rosenberg TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/customer-happy-2.jpg", alt: "Happy Rosenberg TX homeowner after exterior repaint" },\n      ],`,
    block([
      M("modern-stone-exterior-pool-patio-rosenberg-tx.webp", "Modern stone home exterior with pool patio in Rosenberg, TX by The Proud Paintbrush"),
      M("brick-stone-home-exterior-rosenberg-tx.webp", "Brick and stone two-story home exterior in Rosenberg, TX by The Proud Paintbrush"),
      M("white-stucco-exterior-repaint-rosenberg-tx.webp", "White stucco home exterior with stone base repainted in Rosenberg, TX by The Proud Paintbrush"),
    ]),
  ],
  // RICHMOND
  [
    `      customerPhotos: [\n        { src: "/images/exterior-painting-happy-customer-richmond-tx.jpg", alt: "Richmond TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/warranty-customer-richmond.jpg", alt: "Happy Richmond TX homeowner after exterior repaint" },\n      ],`,
    block([
      M("richmond-tx-spanish-style-exterior-house-painting.webp", "Spanish-style stucco home exterior freshly painted in Richmond, TX by The Proud Paintbrush"),
      M("backyard-pool-home-exterior-richmond-tx.webp", "Brick home exterior with backyard pool in Richmond, TX by The Proud Paintbrush"),
      M("richmond-tx-large-exterior-house-painting.webp", "Large home exterior repainted in Richmond, TX by The Proud Paintbrush"),
    ]),
  ],
  // FULSHEAR
  [
    `      customerPhotos: [\n        { src: "/images/happy-customer-fulshear-tx-door-refinishing.jpg", alt: "Fulshear TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/cabinet-fulshear.webp", alt: "Happy Fulshear TX homeowner after exterior project" },\n      ],`,
    block([
      M("tan-stucco-two-story-home-exterior-fulshear-tx.webp", "Tan stucco two-story home exterior freshly painted in Fulshear, TX by The Proud Paintbrush"),
      M("stucco-stone-limewash-exterior-fulshear-tx.webp", "Limewashed stucco and stone home exterior in Fulshear, TX by The Proud Paintbrush"),
      M("brick-two-story-home-exterior-fulshear-tx.webp", "Brick two-story home exterior repainted in Fulshear, TX by The Proud Paintbrush"),
    ]),
  ],
  // WEST HOUSTON
  [
    `      customerPhotos: [\n        { src: "/images/commerical-interior-painting-happy-customer-west-houston.jpg", alt: "West Houston TX painting customer holding 100% satisfied sign" },\n        { src: "/images/exterior-west-houston.jpg", alt: "Happy West Houston TX homeowner after exterior repaint" },\n      ],`,
    block([
      M("tan-stucco-luxury-home-exterior-repaint-west-houston-tx.webp", "Tan stucco luxury home exterior repainted in West Houston, TX by The Proud Paintbrush"),
      M("gray-brick-exterior-repaint-west-houston-tx.webp", "Gray painted brick two-story home exterior in West Houston, TX by The Proud Paintbrush"),
      M("brick-home-backyard-pool-patio-west-houston-tx.webp", "Brick home exterior with backyard pool patio in West Houston, TX by The Proud Paintbrush"),
    ]),
  ],
  // SOUTHWEST HOUSTON
  [
    `      customerPhotos: [\n        { src: "/images/ext-sw-houston.jpg", alt: "Southwest Houston TX exterior painting customer holding 100% satisfied sign" },\n        { src: "/images/commercial-interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy Southwest Houston TX homeowner after exterior repaint" },\n      ],`,
    block([
      M("white-stucco-exterior-two-story-home-southwest-houston-tx.webp", "White stucco two-story home exterior freshly painted in Southwest Houston, TX by The Proud Paintbrush"),
      M("red-brick-house-black-shutters-southwest-houston-tx.webp", "Red brick home with black shutters in Southwest Houston, TX by The Proud Paintbrush"),
      M("tan-two-story-home-exterior-southwest-houston-tx.webp", "Tan two-story home exterior repainted in Southwest Houston, TX by The Proud Paintbrush"),
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
console.log(`cities.ts: replaced ${applied}/8 exterior customerPhotos blocks`);

// Update the grid heading/subheading on the exterior city template
const pageFile = path.join(process.cwd(), "app", "exterior-painting", "[city]", "page.tsx");
let page = fs.readFileSync(pageFile, "utf-8");
const oldHead = "          heading={`Real ${city.name} Customers, Real Finished Homes`}\n          subheading={`Every job ends the same way — a homeowner standing in front of a freshly painted home. Here are a few from ${city.name}.`}";
const newHead = "          heading={`Freshly Painted ${city.name} Exteriors`}\n          subheading={`A look at exterior repaints we have completed across ${city.name}.`}";
if (!page.includes(oldHead)) { console.error("page heading not found"); process.exit(1); }
page = page.replace(oldHead, newHead);
fs.writeFileSync(pageFile, page);
console.log("page.tsx: grid heading updated");
