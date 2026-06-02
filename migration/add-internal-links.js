/*
 * Adds contextual in-body internal links to under-linked blog posts.
 * - Only modifies the `content` field.
 * - Each edit: replace an EXISTING phrase with a linked version.
 * - Refuses to run an edit if the `find` phrase is absent or appears != 1 time
 *   (unless `count` given), so we never silently mangle content.
 * - Skips a link if its target already appears anywhere in the post's content.
 * - Verifies JSON round-trips.
 */
const fs = require('fs');
const path = require('path');

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog');
const DRY = process.argv.includes('--dry');

// Per-slug edit lists. Each edit: { find, href, anchorIn (optional substring of find to wrap) }
// If anchorIn omitted, the entire `find` becomes the anchor text.
// `count` optional: expected occurrences of find (default 1).
const EDITS = require('./link-edits.js');

function applyEdits(slug, content, edits) {
  const log = [];
  let out = content;
  for (const e of edits) {
    const target = e.href;
    // Skip if target already present in current content
    if (new RegExp(`href="${target.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`).test(out)) {
      log.push(`  SKIP (target present): ${target}`);
      continue;
    }
    const phrase = e.find;
    const occ = out.split(phrase).length - 1;
    const expected = e.count || 1;
    if (occ === 0) { log.push(`  ERROR (phrase not found): "${phrase}"`); continue; }
    if (occ !== expected) { log.push(`  ERROR (phrase x${occ}, expected ${expected}): "${phrase}"`); continue; }
    const anchorText = e.anchorIn || phrase;
    if (!phrase.includes(anchorText)) { log.push(`  ERROR (anchorIn not in find): "${anchorText}"`); continue; }
    const linked = phrase.replace(anchorText, `<a href="${target}">${anchorText}</a>`);
    out = out.replace(phrase, linked);
    log.push(`  OK -> ${target}  [${anchorText}]`);
  }
  return { out, log };
}

function main() {
  let modified = 0;
  const summary = [];
  for (const slug of Object.keys(EDITS)) {
    const file = path.join(BLOG_DIR, slug + '.json');
    if (!fs.existsSync(file)) { console.log(`MISSING FILE: ${slug}`); continue; }
    const raw = fs.readFileSync(file, 'utf8');
    const data = JSON.parse(raw);
    const before = (data.content.match(/<a\s+href="\/(?!blog\?|blog\/tag)/g) || []).length;
    const { out, log } = applyEdits(slug, data.content, EDITS[slug]);
    const changed = out !== data.content;
    console.log(`\n== ${slug} ==`);
    log.forEach(l => console.log(l));
    if (changed && !DRY) {
      data.content = out;
      // Preserve all other fields; stringify with 2-space indent, no trailing newline.
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
      // Verify round-trip
      JSON.parse(fs.readFileSync(file, 'utf8'));
      modified++;
    } else if (changed) {
      modified++;
    }
    const after = (out.match(/<a\s+href="\/(?!blog\?|blog\/tag)/g) || []).length;
    summary.push({ slug, before, after });
  }
  console.log('\n\n===== SUMMARY =====');
  console.log('slug | before | after');
  summary.forEach(s => console.log(`${s.slug} | ${s.before} | ${s.after}`));
  console.log(`\nPosts modified: ${modified}${DRY ? ' (DRY RUN)' : ''}`);
}
main();
