# Indexing Guide

How to get the site's pages — especially the high-priority ones — indexed by
search engines. Indexing is ultimately the search engine's decision; our job is
to (1) keep pages technically indexable and (2) submit them so crawlers find
them fast.

## The lists (regenerate with `node scripts/list-indexable-pages.mjs`)

| File | What it is |
|---|---|
| `indexable-urls.txt` | All 189 indexable URLs (everything in `sitemap.xml`). |
| `high-priority-urls.txt` | The 36 money pages (sitemap priority ≥ 0.9). |
| `INDEXABLE-PAGES.md` | Grouped, human-readable inventory. |

**High-priority tier (36 URLs):** homepage, the 3 service hubs
(`/interior-painting`, `/exterior-painting`, `/cabinet-painting`), and all 32
city pages (interior, exterior, cabinet, and fence-staining × 8 cities).

## Technical status — clean

All high-priority pages are already indexable:

- ✅ Listed in `sitemap.xml` with correct priorities (`app/sitemap.ts`)
- ✅ Each sets a self-referencing `canonical` plus unique `title` / `description`
- ✅ No `noindex` anywhere; `robots.ts` allows all crawlers
- ✅ Internally linked from the homepage and hub pages

No code changes are needed to make these pages eligible for indexing.

## How to actually get them indexed

### 1. Google Search Console (primary) — one-time
1. Verify the `https://www.theproudpaintbrush.com` property (DNS or HTML tag).
2. **Sitemaps → add** `sitemap.xml`. This covers all 189 URLs for normal crawling.

### 2. Request indexing for the high-priority pages (fastest)
In Search Console, **URL Inspection → Request Indexing** for each URL in
`high-priority-urls.txt`. Google limits manual requests to ~10/day per property,
so work through the 36 over ~4 days (homepage + hubs first, then cities).

### 3. Bing / others — IndexNow (optional, automatable)
IndexNow lets us *push* URLs to Bing (and partners) instead of waiting for a
crawl. It needs a key file hosted at the site root and a POST per URL. Not used
by Google. Ask and I can wire this up as a script.

## Verifying what's indexed
- Spot-check with `site:theproudpaintbrush.com/interior-painting/katy` in Google.
- Use Search Console **Pages** report for coverage and any "Discovered – not
  indexed" / "Crawled – not indexed" issues to triage.

## When content changes
Re-run `node scripts/list-indexable-pages.mjs` to refresh all three lists, then
request indexing for any new high-priority URLs.
