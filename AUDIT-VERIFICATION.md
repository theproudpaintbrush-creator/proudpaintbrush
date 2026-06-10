# TPP Website Audit — Verification Report

Generated after a full `next build` and a crawl of all **191** prerendered pages
in `.next/server/app`. Checked against `/content/brand-facts.md`.

## Build
- `next build` completes successfully. No type errors, no missing modules.

## Schema coverage (pages emitting each type)
| Schema type | Pages |
|---|---|
| LocalBusiness + PaintingContractor (sitewide) | 190 |
| Person — founder Chris Petkau (`@id` resolved sitewide) | 190 |
| AggregateRating | 190 |
| BreadcrumbList | 181 |
| WebPage (content pages) | 113 |
| FAQPage | 96 |
| Article + author attribution (blog) | 78 |
| ImageObject | 81 |
| Service | 64 |
| CreativeWork (projects) | 3 |
| ItemList (projects index + hubs) | 3 |
| Review | 29 |

## Title / canonical / description
- **Titles:** no literal `<br/>`, no double pipes, no trailing whitespace on any page.
  (`&amp;` / `&#x27;` in titles are correct HTML entity encoding, not artifacts.)
- **Canonicals:** every public page emits an absolute canonical on the
  `https://www.theproudpaintbrush.com` host with the correct path. The only pages
  without a canonical are Next's internal `/_not-found` and `/_global-error`
  (correct — those should not be canonicalized).
- **Meta descriptions:** present on every public page.

## Brand-fact compliance
- **Warranty phrase:** every customer-facing headline/badge renders
  **"2 & 5-Year Written Warranty"**. No `2 & 5-Year Warranty` (missing "Written"),
  no `2-5 year`. Detailed pages still explain the underlying 2-year-standard /
  5-year-upgrade structure, which is accurate.
- **"Licensed":** no page claims the company is licensed. The only occurrences are
  intentional transparency statements (credentials page + an FAQ) explaining that
  **Texas does not license residential painters** — which reinforces the brand
  position rather than violating it.
- **Insurance:** rendered as "Fully Insured · $1M Liability".
- **Founder:** Chris Petkau, moved to the US in 2007, founded TPP in Sugar Land in 2020.
- **Apex → www** permanent redirect configured in `next.config.ts`.

## New pages added
- `/pricing/drywall-prices` (confirmed figures; sheetrock-replacement pricing omitted on purpose)
- `/pricing/fence-staining-prices` (full structure, all `$` figures left as clearly-marked `$X–$Y` / TODO placeholders — no invented numbers)
- `/credentials` (insured, warranty, Sherwin-Williams, background-checked, locally owned)
- `/projects` index + `/projects/[slug]` detail with ImageObject + project metadata
  (CreativeWork). Seeded: Joanne (Sugar Land exterior), Gail (West Houston exterior
  wood repair), Gail (West Houston interior restoration).

## Items already satisfied in this repo (no change needed)
- Homepage testimonial carousel renders each of 15 photos once (no duplication).
- Migrated pages contain no stranded Squarespace blog copy
  (the "n the vibrant community of Sugar Land…" orphan is not present in this repo).
- Title `<br/>` bug on exterior/our-vision is not present here (titles are clean).

## Flags for the owner to reconcile (outside code scope)
- **Exterior & cabinet cost pages — reconciled with audit figures.** The broad
  exterior whole-project span (`$2,500–$16,000+`) is kept on purpose: Texas homes
  range ~1,800 → 7,000–8,000 sq ft, so it does not conflict with the audit anchor.
  Added the confirmed **typical 2,000 sq ft → $5,000–$8,000** and
  **whole-home $4,500–$15,000+** figures (body + FAQ + meta). Cabinet pricing was
  updated to the confirmed per-unit figures: **doors $120–$145**, **drawers
  $110–$135**, **$650 minimum**, **vanity $650–$1,200**, **typical kitchen
  $4,100–$5,000**, **large kitchen + island $5,500–$7,500+**.
- **Review count (113)** is centralized in `lib/site.ts` (`REVIEW_COUNT`) for the
  LocalBusiness schema, but several display strings still hardcode "113 Google
  reviews"; update `REVIEW_COUNT` and those strings together when the GBP total changes.
- **TODO constants** in `lib/site.ts`: `BOOKING_URL` (swap to
  `book.theproudpaintbrush.com` after DNS) and `REVIEW_URL` (paste the direct
  Google Maps reviews URL). GA4 measurement ID is already live (`G-3VBQEW7TD7`).
- **Fence-staining cost figures** remain TODO placeholders pending the proposal data.
