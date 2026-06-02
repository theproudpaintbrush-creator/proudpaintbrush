import fs from "node:fs";
import path from "node:path";

const PAGES = ["portfolio/interior-painting", "portfolio/exterior-painting", "portfolio/cabinet-painting", "portfolio"];

function ts(name) {
  let m;
  if ((m = name.match(/(\d{4})(\d{2})(\d{2})-(\d{2})(\d{2})(\d{2})/)))
    return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) / 1000;
  if ((m = name.match(/(\d{4})-(\d{2})-(\d{2})-(\d{2})-(\d{2})-(\d{2})/)))
    return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) / 1000;
  if ((m = name.match(/(\d{4})-(\d{2})-(\d{2})-at-(\d{2})-(\d{2})-(\d{2})/)))
    return Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6]) / 1000;
  return null;
}

for (const key of PAGES) {
  const b = JSON.parse(fs.readFileSync(path.join(process.cwd(), "content", "pages", key + ".json"), "utf-8")).bodyHtml;
  const srcs = [...b.matchAll(/<figure [^>]*><img src="([^"]+)"/g)].map((m) => m[1].replace(/.*\//, ""));
  const withTs = srcs.map((s) => ({ s, t: ts(s) })).filter((x) => x.t != null).sort((a, b) => a.t - b.t);
  const clusters = [];
  let cur = [];
  for (let i = 0; i < withTs.length; i++) {
    if (cur.length && withTs[i].t - cur[cur.length - 1].t <= 180) cur.push(withTs[i]);
    else { if (cur.length > 1) clusters.push(cur); cur = [withTs[i]]; }
  }
  if (cur.length > 1) clusters.push(cur);
  console.log(`=== ${key} (${srcs.length} imgs, ${withTs.length} timestamped) ===`);
  clusters.forEach((c) => console.log("  CLUSTER:", c.map((x) => x.s).join("  |  ")));
  if (!clusters.length) console.log("  (no timestamp clusters)");
}
