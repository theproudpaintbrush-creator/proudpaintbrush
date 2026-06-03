// Optimize 3 info content-pages: careers, checklist, preparation-process/interior.
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "pages");
const read = (k) => JSON.parse(fs.readFileSync(path.join(dir, `${k}.json`), "utf-8"));
const write = (k, o) => fs.writeFileSync(path.join(dir, `${k}.json`), JSON.stringify(o, null, 2) + "\n");
// remove any <ul> that contains an <img> (the "100% satisfied" customer-sign photo grids)
const stripSignGrid = (html) => html.replace(/<ul>(?:(?!<\/ul>)[\s\S])*?<img[\s\S]*?<\/ul>/g, "");

// ---------- CAREERS ----------
{
  const p = read("careers");
  p.title = "Painting Jobs & Careers in Sugar Land, TX | Proud Paintbrush";
  p.metaDescription = "Now hiring painters, apprentices, and crew leads across Sugar Land, Katy, Richmond, and the greater Houston area. Competitive pay, year-round work, real growth.";
  p.h1 = "Painting Jobs & Careers in Sugar Land and Greater Houston";
  p.bodyHtml = p.bodyHtml
    .replace("_932fppcCfVbI/edit", "_932fppcCfVbI/viewform")
    .replace(/<h3>See What It.s Like to Work With Us<\/h3>/, "");
  p.faqs = [
    { q: "How do I apply for a painting job with The Proud Paintbrush?", a: "Fill out the short application form on this page or email us your resume. We hire painters, apprentices, and crew leads across Sugar Land, Katy, Richmond, Missouri City, Rosenberg, Fulshear, Southwest Houston, and West Houston." },
    { q: "Do I need experience to be hired as a painter?", a: "Experience is preferred for our residential painter roles but not required. Our apprenticeship lets you start your painting career and learn industry-leading techniques from our experienced team while earning a steady income." },
    { q: "What does The Proud Paintbrush offer its team?", a: "Competitive pay, steady year-round work, hands-on training, and clear paths to grow into crew lead or project manager roles, plus a positive, community-focused culture through programs like Paint It Forward." },
  ];
  write("careers", p);
  console.log("✓ careers: title/h1/meta fixed, apply link -> viewform, empty heading removed, 3 real FAQs");
}

// ---------- CHECKLIST ----------
{
  const p = read("checklist");
  let b = p.bodyHtml;
  b = b.replace("<h2>Pre-Appointment Painting Checklist</h2><h2>Prepare For Your Painting Estimate With Confidence</h2>", "<h2>Prepare For Your Painting Estimate With Confidence</h2>");
  b = b.replace("<p><strong>Button:</strong> Book My Free Estimate</p>", "");
  b = b.replace(
    "<p>✓ Your project goals<br>✓ Areas you want included<br>✓ Repairs or problem spots<br>✓ Color ideas and inspiration<br>✓ Desired timeline<br>✓ Access, pets, parking, and HOA items<br>✓ Finish and performance preferences</p>",
    "<ul><li>Your project goals</li><li>Areas you want included</li><li>Repairs or problem spots</li><li>Color ideas and inspiration</li><li>Desired timeline</li><li>Access, pets, parking, and HOA items</li><li>Finish and performance preferences</li></ul>"
  );
  b = stripSignGrid(b);
  p.bodyHtml = b;
  p.faqs = [
    { q: "How long does a painting estimate take?", a: "Most in-home estimates take about 30–45 minutes depending on the size of your home and how many areas you want included. We walk the project with you, talk through options, and provide a clear, written quote." },
    { q: "Do I need to be home for the painting estimate?", a: "Yes, we recommend it. Being present lets us understand your goals, point out repairs or problem spots together, and tailor recommendations to exactly what you want, which makes the quote more accurate." },
    { q: "Do I need to move furniture or prep anything before the estimate?", a: "No. You don't need to prepare anything for the estimate itself, just think through your goals, priorities, and any problem areas. Our crew handles all surface protection and preparation once the project begins." },
  ];
  write("checklist", p);
  console.log("✓ checklist: removed Button text + duplicate H2, list-ified checklist, removed sign-photo grid, 3 FAQs");
}

// ---------- PREPARATION-PROCESS/INTERIOR ----------
{
  const p = read("preparation-process/interior");
  p.metaDescription = "Learn how proper interior paint prep prevents peeling, flashing, and uneven finishes — our step-by-step Sugar Land prep process delivers a smooth, lasting finish.";
  let b = p.bodyHtml;
  // swap mismatched EXTERIOR prep photo for an INTERIOR prep photo
  b = b.replace(
    '<img src="/images/migrated/west-houston-tx-exterior-house-painter-prep-work-96dcab.webp" alt="The Proud Paintbrush painter prepping a home exterior in West Houston, TX" width="1600" height="2133" loading="lazy">',
    '<img src="/images/migrated/sugar-land-tx-interior-painting-preparation-masking.webp" alt="Interior walls and floors masked and prepped before painting in Sugar Land, TX by The Proud Paintbrush" width="1600" height="2133" loading="lazy">'
  );
  // canonicalize stale /painting-services/* links (were 308-redirecting)
  b = b.replace('href="/painting-services/interior-painting"', 'href="/interior-painting"');
  b = b.replace('href="/painting-services/portfolio/interior-painting"', 'href="/portfolio/interior-painting"');
  b = stripSignGrid(b);
  p.bodyHtml = b;
  // drop the junk "Want to See This Process in Action?" FAQ (it's a CTA, not a Q&A)
  p.faqs = p.faqs.filter((f) => !/Want to See This Process/i.test(f.q));
  write("preparation-process/interior", p);
  console.log("✓ prep/interior: meta completed, exterior photo -> interior, links canonicalized, sign grid removed, junk FAQ dropped");
}
console.log("\nInfo-page optimization done.");
