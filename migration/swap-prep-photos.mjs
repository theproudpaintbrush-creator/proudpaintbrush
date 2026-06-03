// Swap photo positions on the prep hub + exterior prep page (owner review).
import fs from "node:fs";
import path from "node:path";

const dir = path.join(process.cwd(), "content", "pages");
function reorder(key, swaps) {
  const file = path.join(dir, `${key}.json`);
  const page = JSON.parse(fs.readFileSync(file, "utf-8"));
  const tags = page.bodyHtml.match(/<img\b[^>]*>/g) || [];
  const parts = page.bodyHtml.split(/<img\b[^>]*>/); // length = tags.length + 1
  const order = tags.slice();
  for (const [a, b] of swaps) { const t = order[a]; order[a] = order[b]; order[b] = t; }
  let out = parts[0];
  for (let k = 0; k < order.length; k++) out += order[k] + parts[k + 1];
  page.bodyHtml = out;
  fs.writeFileSync(file, JSON.stringify(page, null, 2) + "\n");
  const first = (out.match(/<img src="\/images\/migrated\/([^"]+)"/) || [])[1];
  console.log(`✓ ${key}: swapped ${JSON.stringify(swaps)} (now ${tags.length} imgs)`);
}

// hub: swap photo 1 and 6  (indices 0 and 5)
reorder("preparation-process", [[0, 5]]);
// exterior: swap photo 2 and 5 (indices 1,4); swap photo 6 and 8 (indices 5,7)
reorder("preparation-process/exterior", [[1, 4], [5, 7]]);
console.log("done");
