// Merge migration/redirects.json into next.config.ts's redirects() block,
// deduping by source (existing entries win). Rewrites the return array in place.
import fs from "node:fs";

const CFG = "next.config.ts";
let text = fs.readFileSync(CFG, "utf8");

// 1. extract existing redirect entries from the file
const existing = [];
const seen = new Set();
const re = /source:\s*"([^"]+)"\s*,\s*destination:\s*"([^"]+)"\s*,\s*permanent:\s*(true|false)/g;
let m;
while ((m = re.exec(text))) {
  existing.push({ source: m[1], destination: m[2], permanent: m[3] === "true" });
  seen.add(m[1]);
}

// 2. merge in redirects.json (skip sources already present)
const incoming = JSON.parse(fs.readFileSync("migration/redirects.json", "utf8"));
let added = 0;
const merged = [...existing];
for (const r of incoming) {
  if (seen.has(r.source)) continue;
  // guard: never redirect a path to itself
  if (r.source === r.destination) continue;
  merged.push({ source: r.source, destination: r.destination, permanent: r.permanent !== false });
  seen.add(r.source);
  added++;
}

// 3. detect redirect chains (a destination that is also a source) — flag, don't auto-fix
const sourceSet = new Set(merged.map((r) => r.source));
const chains = merged.filter((r) => sourceSet.has(r.destination));

// 4. rebuild the redirects() return array
const entries = merged
  .map((r) => `      { source: ${JSON.stringify(r.source)}, destination: ${JSON.stringify(r.destination)}, permanent: ${r.permanent} },`)
  .join("\n");
const block = `async redirects() {\n    return [\n${entries}\n    ];\n  }`;
const newText = text.replace(/async redirects\(\)\s*\{\s*return \[[\s\S]*?\];\s*\}/, block);
if (newText === text) { console.error("ERROR: could not locate redirects() block"); process.exit(1); }
fs.writeFileSync(CFG, newText);

console.log(`Existing: ${existing.length} | added from redirects.json: ${added} | total: ${merged.length}`);
if (chains.length) {
  console.log(`\n⚠ ${chains.length} redirect CHAINS (source → destination that is itself a source):`);
  chains.forEach((c) => console.log(`  ${c.source} → ${c.destination} (which also redirects)`));
}
