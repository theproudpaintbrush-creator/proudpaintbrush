// Generates the rebuild IA + redirect map from explicit decisions, validated
// against the scrape manifest so EVERY live URL is accounted for (no orphan 404s).
import fs from "node:fs";
import path from "node:path";

const manifest = JSON.parse(fs.readFileSync("scrape/manifest.json", "utf8")).filter(x => x && !x.error);
const livePaths = manifest.map(x => x.path);
const wc = Object.fromEntries(manifest.map(x => [x.path, x.wordCount || 0]));

// action: keep | redirect | consolidate | internal
// Each decision: [oldPath, action, target(or null), note]
const D = [
  // ---- Core / brand ----
  ["/", "keep", null, "Homepage"],
  ["/the-proud-paintbrush", "consolidate", "/", "Homepage-variant 'painting contractor' page — cannibalizes Home. 301 to /."],
  ["/painting-services", "redirect", "/services", "Services overview → /services (3 pillar hubs live beneath it)."],
  ["/sitemap", "redirect", "/", "Squarespace HTML sitemap; replaced by generated sitemap.xml."],

  // ---- Service pillars (promote to clean top-level) ----
  ["/painting-services/interior-painting", "redirect", "/interior-painting", "Interior hub promoted to top level."],
  ["/painting-services/exterior-painting", "redirect", "/exterior-painting", "Exterior hub promoted to top level."],
  ["/painting-services/cabinet-painting", "redirect", "/cabinet-painting", "Cabinet promoted to pillar service."],
  ["/painting-services/residential-painters", "consolidate", "/services", "Overlaps Home/Services overview."],

  // ---- Interior sub-services (PRESERVE — they rank) ----
  ["/interior-painting/accent-wall-painting", "keep", null, ""],
  ["/interior-painting/bathroom-painting", "keep", null, ""],
  ["/interior-painting/bedroom-painting", "keep", null, ""],
  ["/interior-painting/brick-painting", "keep", null, "Interior brick/limewash — distinct from exterior brick."],
  ["/interior-painting/ceiling-painting", "keep", null, ""],
  ["/interior-painting/dining-room-painting", "keep", null, ""],
  ["/interior-painting/drywall-repair", "keep", null, "CANONICAL drywall page (current build's top-level /drywall-repair should point here)."],
  ["/interior-painting/finish-carpentry", "keep", null, "Overlaps millwork — differentiate copy."],
  ["/interior-painting/hallway-and-staircase-painting", "keep", null, ""],
  ["/interior-painting/kids-room-painting", "keep", null, ""],
  ["/interior-painting/kitchen-painting", "keep", null, ""],
  ["/interior-painting/living-room-painting", "keep", null, ""],
  ["/interior-painting/millwork-painting", "keep", null, "Overlaps finish-carpentry — differentiate copy."],
  ["/interior-painting/nursery-painting", "keep", null, ""],
  ["/interior-painting/office-painting", "keep", null, ""],
  ["/interior-painting/staining-lacquering-sealing", "keep", null, ""],
  ["/interior-painting/wall-painting", "keep", null, "Overlaps accent-wall — differentiate (whole-room vs accent)."],

  // ---- Exterior sub-services (PRESERVE) ----
  ["/exterior-painting/brick-painting", "keep", null, ""],
  ["/exterior-painting/deck-painting-and-staining", "keep", null, ""],
  ["/exterior-painting/door-refinishing", "keep", null, ""],
  ["/exterior-painting/exterior-house-painters", "consolidate", "/exterior-painting", "Duplicate-intent with /exterior-painters → fold into hub."],
  ["/exterior-painting/exterior-painters", "consolidate", "/exterior-painting", "Duplicate-intent with /exterior-house-painters → fold into hub."],
  ["/exterior-painting/fence-staining", "keep", null, "CANONICAL fence page (current build's /fence-staining should point here)."],
  ["/exterior-painting/fiber-cement-siding-painting", "keep", null, ""],
  ["/exterior-painting/garage-door-painting", "keep", null, ""],
  ["/exterior-painting/pressure-washing", "keep", null, ""],
  ["/exterior-painting/railings", "keep", null, ""],
  ["/exterior-painting/stucco-maintenance", "keep", null, "Stucco hub."],
  ["/exterior-painting/stucco-maintenance/stucco-painting", "redirect", "/exterior-painting/stucco-painting", "Flatten 3-level depth to 2."],
  ["/exterior-painting/stucco-maintenance/stucco-repairs", "redirect", "/exterior-painting/stucco-repairs", "Flatten 3-level depth to 2."],
  ["/exterior-painting/vinyl-siding-painting", "keep", null, ""],

  // ---- Locations (PRESERVE the ranking combined city pages) ----
  ["/service-areas", "keep", null, "City hub."],
  ["/service-areas/sugar-land", "keep", null, "Combined city page (all services)."],
  ["/service-areas/missouri-city", "keep", null, ""],
  ["/service-areas/richmond", "keep", null, ""],
  ["/service-areas/katy", "keep", null, ""],
  ["/service-areas/fulshear", "keep", null, ""],
  ["/service-areas/rosenberg", "keep", null, ""],
  ["/service-areas/west-houston", "keep", null, ""],
  ["/service-areas/southwest-houston", "keep", null, ""],

  // ---- Portfolio (consolidate 5 → 3) ----
  ["/portfolio", "keep", null, "Portfolio hub."],
  ["/portfolio/interior-painting", "keep", null, ""],
  ["/portfolio/exterior-painting", "keep", null, ""],
  ["/painting-services/portfolio/interior-painting", "redirect", "/portfolio/interior-painting", "Duplicate portfolio path."],
  ["/painting-services/portfolio/exterior-painting", "redirect", "/portfolio/exterior-painting", "Duplicate portfolio path."],

  // ---- Pricing (PRESERVE) ----
  ["/pricing", "keep", null, ""],
  ["/pricing/interior-prices", "keep", null, ""],
  ["/pricing/exterior-prices", "keep", null, ""],
  ["/pricing/cabinet-prices", "keep", null, ""],

  // ---- Prep process (fix typo, keep equity via redirect) ----
  ["/preperation-process", "redirect", "/preparation-process", "Fix misspelling 'preperation'."],
  ["/preperation-process/interior", "redirect", "/preparation-process/interior", "Fix misspelling."],
  ["/preperation-process/exterior", "redirect", "/preparation-process/exterior", "Fix misspelling."],

  // ---- Trust / ops / about (PRESERVE) ----
  ["/our-story", "keep", null, ""],
  ["/our-vision", "keep", null, ""],
  ["/core-values", "keep", null, ""],
  ["/warranty", "keep", null, ""],
  ["/financing", "keep", null, ""],
  ["/color-consultation", "keep", null, ""],
  ["/project-expectations", "keep", null, ""],
  ["/checklist", "keep", null, ""],
  ["/budget", "keep", null, ""],
  ["/paint-it-forward", "keep", null, ""],
  ["/careers", "keep", null, ""],
  ["/faq", "keep", null, ""],
  ["/testimonials", "keep", null, ""],
  ["/blog", "keep", null, "Blog index."],

  // ---- Internal (migrate behind noindex/auth, not marketing) ----
  ["/employees", "internal", null, "Staff area — noindex."],
  ["/employees/training", "internal", null, "Staff area — noindex."],
  ["/employees/forms", "internal", null, "Staff area — noindex (gated form, thin)."],
];

// ---- Validate coverage: every live non-blog path must have a decision ----
const decided = new Set(D.map(d => d[0]));
const nonBlogLive = livePaths.filter(p => !p.startsWith("/blog/"));
const missing = nonBlogLive.filter(p => !decided.has(p) && p !== "/");
const phantom = [...decided].filter(p => p !== "/" && p !== "/services" && !livePaths.includes(p));

// ---- Emit redirects array for next.config.ts ----
const redirects = D.filter(d => d[1] === "redirect" || d[1] === "consolidate")
  .map(d => ({ source: d[0], destination: d[2], permanent: true }));
fs.writeFileSync("migration/redirects.json", JSON.stringify(redirects, null, 2));

// ---- Emit human-readable plan ----
const byAction = a => D.filter(d => d[1] === a);
const row = d => `| \`${d[0]}\` | ${wc[d[0]] ?? "?"}w | ${d[1] === "keep" ? "✅ keep URL" : d[1] === "redirect" ? "↪ 301 → \`" + d[2] + "\`" : d[1] === "consolidate" ? "⚠ consolidate → \`" + d[2] + "\`" : "🔒 internal/noindex"} | ${d[3]} |`;
const section = (title, arr) => arr.length ? `\n### ${title} (${arr.length})\n\n| Live URL | Words | Action | Note |\n|---|---|---|---|\n${arr.map(row).join("\n")}\n` : "";

const md = `# The Proud Paintbrush — Rebuild IA & Redirect Map

_Generated from the live-site scrape (${nonBlogLive.length} non-blog pages + ${livePaths.filter(p=>p.startsWith("/blog/")).length} blog posts). Strategy: **clean structure + complete 301 redirects**, decisions content-informed (refine with Search Console data when available)._

## Coverage check
- Live non-blog pages: **${nonBlogLive.length}** — all classified: **${missing.length === 0 ? "YES ✅ (nothing will 404)" : "MISSING: " + missing.join(", ")}**
- Redirects generated: **${redirects.length}** → \`migration/redirects.json\`
${phantom.length ? "- ⚠ phantom targets (new pages to build): " + phantom.join(", ") : ""}

## Proposed information architecture
\`\`\`
/                                 Home
/services                         Services overview (← /painting-services)
/interior-painting                Interior hub
  /interior-painting/<sub>        17 sub-services (kitchen, bath, ceiling, …)  [preserved]
  /interior-painting/<city>       8 service×city pages  [NEW, already built]
/exterior-painting                Exterior hub
  /exterior-painting/<sub>        ~12 sub-services (brick, deck, stucco, …)    [preserved]
  /exterior-painting/<city>       8 service×city pages  [NEW, already built]
/cabinet-painting                 Cabinet hub (← /painting-services/cabinet-painting)
/service-areas                    City hub
  /service-areas/<city>           8 combined city pages  [preserved, rank]
/pricing  /pricing/<svc>-prices   4 pages  [preserved]
/portfolio  /portfolio/<svc>      3 pages  [consolidated from 5]
/preparation-process/<svc>        3 pages  [typo fixed via redirect]
/warranty /financing /color-consultation /project-expectations
/checklist /budget /paint-it-forward /careers /faq /testimonials /our-story /our-vision /core-values
/blog  /blog/<slug>               ~103 posts  [migrate]
/employees/*                      internal, noindex
\`\`\`

## Cannibalization consolidations (fewer, stronger pages)
1. **Two "exterior painters" pages** (\`/exterior-painting/exterior-painters\` + \`/exterior-house-painters\`) target the same query → fold into the \`/exterior-painting\` hub.
2. **Five portfolio pages** (two parallel sets) → consolidate to 3 under \`/portfolio\`.
3. **\`/the-proud-paintbrush\`** duplicates the homepage → 301 to \`/\`.
4. **\`/painting-services/residential-painters\`** overlaps the services overview → fold into \`/services\`.
5. Differentiate near-duplicates kept on purpose: \`wall-painting\` vs \`accent-wall-painting\`; \`finish-carpentry\` vs \`millwork-painting\`.

## Current-build reconciliation
- Current top-level \`/drywall-repair\` & \`/fence-staining\` collide with the ranking Squarespace URLs \`/interior-painting/drywall-repair\` & \`/exterior-painting/fence-staining\`. **Keep the Squarespace paths as canonical**; point the current-build pages there.
- \`/cabinet-painting\` is promoted to a top-level pillar (old \`/painting-services/cabinet-painting\` 301s in).
- The 16 \`/interior-painting/[city]\` & \`/exterior-painting/[city]\` pages are NEW (not on Squarespace) — keep as the granular service×city local-SEO layer alongside the broader \`/service-areas/<city>\` pages; interlink them.
${section("✅ Preserve (same URL)", byAction("keep"))}
${section("↪ Redirect (301, structural)", byAction("redirect"))}
${section("⚠ Consolidate (301 + merge content)", byAction("consolidate"))}
${section("🔒 Internal (noindex)", byAction("internal"))}
`;

fs.writeFileSync("migration/REBUILD-PLAN.md", md);
console.log(md.split("## Proposed")[0]);
console.log("...(full plan written to migration/REBUILD-PLAN.md, redirects to migration/redirects.json)");
console.log("\nCOVERAGE:", missing.length === 0 ? "all " + nonBlogLive.length + " pages classified ✅" : "MISSING " + missing.length + ": " + missing.join(", "));
console.log("REDIRECTS:", redirects.length);
