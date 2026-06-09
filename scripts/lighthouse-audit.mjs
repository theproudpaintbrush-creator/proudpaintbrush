// Lighthouse audit via the Google PageSpeed Insights API (the same engine as
// pagespeed.web.dev; its Accessibility category is powered by axe-core).
//
// Setup (one-time, free):
//   1. Go to https://console.cloud.google.com/ and create/select any project.
//   2. Enable the "PageSpeed Insights API".
//   3. APIs & Services -> Credentials -> Create credentials -> API key, copy it.
//   4. Run:  PSI_API_KEY=your_key node scripts/lighthouse-audit.mjs
//
// Optional: pass URLs as args to override the default set, and STRATEGY=desktop.
//   PSI_API_KEY=... node scripts/lighthouse-audit.mjs https://www.theproudpaintbrush.com/

const API_KEY = process.env.PSI_API_KEY;
const STRATEGY = process.env.STRATEGY || "mobile";

const DEFAULT_URLS = [
  "https://www.theproudpaintbrush.com/",
  "https://www.theproudpaintbrush.com/interior-painting",
  "https://www.theproudpaintbrush.com/interior-painting/sugar-land",
  "https://www.theproudpaintbrush.com/contact",
  "https://www.theproudpaintbrush.com/blog",
];

const urls = process.argv.slice(2).length ? process.argv.slice(2) : DEFAULT_URLS;
const CATS = ["performance", "accessibility", "best-practices", "seo"];

if (!API_KEY) {
  console.error("Missing PSI_API_KEY. See setup notes at the top of this file.");
  process.exit(1);
}

function pct(score) {
  return score == null ? "  -" : String(Math.round(score * 100)).padStart(3);
}

async function audit(url) {
  const params = new URLSearchParams({ url, strategy: STRATEGY, key: API_KEY });
  for (const c of CATS) params.append("category", c);
  const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${params}`);
  if (!res.ok) throw new Error(`${res.status} ${(await res.text()).slice(0, 120)}`);
  const data = await res.json();
  const cats = data.lighthouseResult.categories;
  const scores = Object.fromEntries(CATS.map((c) => [c, cats[c]?.score]));

  // Pull failing accessibility audits (axe-core findings) for the detail report.
  const audits = data.lighthouseResult.audits;
  const a11yRefs = cats.accessibility?.auditRefs || [];
  const failing = a11yRefs
    .map((r) => audits[r.id])
    .filter((a) => a && a.score !== null && a.score < 1)
    .map((a) => a.title);

  return { scores, failing };
}

const totals = Object.fromEntries(CATS.map((c) => [c, []]));
console.log(`\nLighthouse (${STRATEGY}) — via PageSpeed Insights\n`);
console.log("PERF  A11Y  BP   SEO   URL");
for (const url of urls) {
  try {
    const { scores, failing } = await audit(url);
    CATS.forEach((c) => scores[c] != null && totals[c].push(scores[c]));
    console.log(
      `${pct(scores.performance)}  ${pct(scores.accessibility)}  ${pct(scores["best-practices"])}  ${pct(scores.seo)}   ${url}`
    );
    if (failing.length) console.log(`        a11y issues: ${failing.join("; ")}`);
  } catch (e) {
    console.log(`  err   err   err   err   ${url}  (${e.message})`);
  }
}

const avg = (a) => (a.length ? Math.round((a.reduce((s, n) => s + n, 0) / a.length) * 100) : "-");
console.log(`\nAverages — Performance ${avg(totals.performance)}, Accessibility ${avg(totals.accessibility)}, Best Practices ${avg(totals["best-practices"])}, SEO ${avg(totals.seo)}`);
