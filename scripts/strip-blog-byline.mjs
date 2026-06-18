// One-off: remove the leftover Squarespace author byline embedded at the end of
// blog post bodies. The blog template already renders a proper byline + author
// bio box, so this in-body `<a href="/blog?author=...">...Chris Petkau</a>` is a
// duplicate AND links to a dead /blog?author route. Run: node scripts/strip-blog-byline.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const DIR = "content/blog";
const BYLINE = /<a href="\/blog\?author=[^"]*">.*?<\/a>/gs;

let changed = 0;
for (const name of readdirSync(DIR)) {
  if (!name.endsWith(".json")) continue;
  const path = join(DIR, name);
  const json = JSON.parse(readFileSync(path, "utf8"));
  if (typeof json.content !== "string" || !json.content.includes("/blog?author")) continue;
  const before = json.content;
  // strip the byline anchor(s), then any trailing whitespace/<br> left behind
  json.content = before.replace(BYLINE, "").replace(/(?:\s|<br\s*\/?>)+$/i, "").trimEnd();
  if (json.content !== before) {
    writeFileSync(path, JSON.stringify(json, null, 2) + "\n");
    changed++;
    console.log("stripped", name);
  }
}
console.log(`\nDone. ${changed} files updated.`);
