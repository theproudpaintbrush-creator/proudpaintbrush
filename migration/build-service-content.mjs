// Convert scraped sub-service Markdown -> content/services/<parent>/<slug>.json
// (cleaned bodyHtml + extracted FAQs + meta). Faithful to the owner's real copy:
// only nav/boilerplate cruft is stripped; wording is preserved.
import fs from "node:fs";
import path from "node:path";

const SUBSERVICES = {
  interior: [
    "accent-wall-painting","bathroom-painting","bedroom-painting","brick-painting","ceiling-painting",
    "dining-room-painting","drywall-repair","finish-carpentry","hallway-and-staircase-painting",
    "kids-room-painting","kitchen-painting","living-room-painting","millwork-painting","nursery-painting",
    "office-painting","staining-lacquering-sealing","wall-painting",
  ],
  exterior: [
    "brick-painting","deck-painting-and-staining","door-refinishing","fence-staining",
    "fiber-cement-siding-painting","garage-door-painting","pressure-washing","railings","vinyl-siding-painting",
  ],
};
// flattened stucco children (were /exterior-painting/stucco-maintenance/<x>)
const FLATTENED = [
  { parent: "exterior", slug: "stucco-painting", src: "exterior-painting/stucco-maintenance/stucco-painting" },
  { parent: "exterior", slug: "stucco-repairs", src: "exterior-painting/stucco-maintenance/stucco-repairs" },
  { parent: "exterior", slug: "stucco-maintenance", src: "exterior-painting/stucco-maintenance" },
];

const CRUFT = [
  /^book my free estimate$/i, /^more interior services$/i, /^more exterior services$/i,
  /^internal links:?$/i, /^people also ask/i, /^paa /i, /^\(paa\)/i, /^main content$/i,
  /^quick answer$/i, /^our fabulous crew/i, /^take pride in your home$/i,
  /^interior services$/i, /^interior painting services$/i, /^exterior painting services$/i,
  /^learn more$/i, /^get started today$/i, /^service areas$/i,
  /^painting services in houston/i,
];
const isCruft = (line) => CRUFT.some((re) => re.test(line.trim()));

function splitFrontmatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { fm: {}, body: md };
  const fm = {};
  for (const ln of m[1].split("\n")) {
    const mm = ln.match(/^(\w+):\s*(.*)$/);
    if (mm) { try { fm[mm[1]] = JSON.parse(mm[2]); } catch { fm[mm[1]] = mm[2]; } }
  }
  return { fm, body: m[2] };
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Extract FAQ Q/A pairs from anywhere in the body (Q:/Qn:/Question + A:/Answer).
function extractFaqs(lines) {
  const faqs = [];
  for (let i = 0; i < lines.length; i++) {
    const q = lines[i].match(/^Q\d*[:.]?\s*(.+)/i) || lines[i].match(/^Question[:.]?\s*(.+)/i);
    if (q) {
      // answer is the next non-empty line, optionally prefixed A:/Answer:
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      if (j < lines.length) {
        const a = lines[j].replace(/^A\d*[:.]?\s*/i, "").replace(/^Answer[:.]?\s*/i, "").trim();
        const question = q[1].replace(/\?+$/, "").trim() + "?";
        if (a && a.length > 10) { faqs.push({ q: question.replace(/\?\?$/, "?"), a }); i = j; }
      }
    }
  }
  return faqs;
}

function toHtml(body) {
  const rawLines = body.split("\n");
  const faqs = extractFaqs(rawLines);
  const faqLineSet = new Set();
  // mark Q/A lines so they are not duplicated in the prose body
  for (let i = 0; i < rawLines.length; i++) {
    if (/^Q\d*[:.]?\s/i.test(rawLines[i]) || /^A\d*[:.]?\s/i.test(rawLines[i]) ||
        /^Question[:.]?/i.test(rawLines[i]) || /^Answer[:.]?/i.test(rawLines[i])) faqLineSet.add(i);
  }
  const out = [];
  let listBuf = [];
  const flush = () => { if (listBuf.length) { out.push("<ul>" + listBuf.map((t) => `<li>${t}</li>`).join("") + "</ul>"); listBuf = []; } };
  let sawH1 = false;
  for (let i = 0; i < rawLines.length; i++) {
    let ln = rawLines[i].replace(/\s+$/, "");
    const t = ln.trim();
    if (!t) { flush(); continue; }
    if (/^#{1,6}\s*$/.test(t)) { flush(); continue; }      // stray empty-heading markers
    if (faqLineSet.has(i)) { flush(); continue; }          // FAQs handled separately
    if (isCruft(t)) { flush(); continue; }
    const h = t.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      flush();
      const text = h[2].trim();
      if (!text) continue;
      if (h[1] === "#") { if (!sawH1) { sawH1 = true; continue; } continue; } // drop duplicate H1
      if (isCruft(text)) continue;
      const tag = h[1].length <= 2 ? "h2" : "h2"; // ## and ### -> section h2; #### -> h3
      out.push(`<${h[1].length >= 4 ? "h3" : "h2"}>${esc(text)}</${h[1].length >= 4 ? "h3" : "h2"}>`);
      continue;
    }
    if (/^-\s+/.test(t)) { listBuf.push(esc(t.replace(/^-\s+/, ""))); continue; }
    flush();
    out.push(`<p>${esc(t)}</p>`);
  }
  flush();
  return { html: out.join("\n"), faqs };
}

function build(parent, slug, srcRel) {
  const srcFile = path.join("scrape/content", srcRel + ".md");
  if (!fs.existsSync(srcFile)) return { slug, error: "no source: " + srcFile };
  const { fm, body } = splitFrontmatter(fs.readFileSync(srcFile, "utf8"));
  const { html, faqs } = toHtml(body);
  const name = (fm.h1 || slug).replace(/\s+–.*$/, "").replace(/ in Sugar Land.*$/i, "").trim();
  const rec = {
    slug, parent, name,
    title: (fm.title || "").replace(/ — The Proud Paintbrush.*$/,"").trim(),
    metaDescription: fm.metaDescription || "",
    h1: fm.h1 || name,
    ogImage: fm.ogImage || "",
    sourceUrl: fm.url || "",
    bodyHtml: html,
    faqs,
    wordCount: html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length,
  };
  const outDir = path.join("content/services", parent);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, slug + ".json"), JSON.stringify(rec, null, 2));
  return { slug: `${parent}/${slug}`, words: rec.wordCount, faqs: faqs.length };
}

const results = [];
for (const [parent, slugs] of Object.entries(SUBSERVICES))
  for (const slug of slugs) results.push(build(parent, slug, `${parent}-painting/${slug}`));
for (const f of FLATTENED) results.push(build(f.parent, f.slug, f.src));
// cabinet pillar
results.push(build("cabinet", "cabinet-painting", "painting-services/cabinet-painting"));

for (const r of results) console.log(r.error ? `  ERR ${r.slug || ""} ${r.error}` : `  ${r.slug.padEnd(40)} ${r.words}w  ${r.faqs} faqs`);
console.log(`\n${results.filter(r=>!r.error).length} service pages written to content/services/`);
