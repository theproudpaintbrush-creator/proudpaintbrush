# The Proud Paintbrush — Open Action Items

Snapshot of everything outstanding as of the rebuild. The site is **content-complete and
launch-ready** (181 pages, 89 redirects, clean build, 13 commits). Nothing below blocks deployment.

---

## 1. Deploy (when ready)
- [ ] Follow **HANDOFF.md** / **DEPLOYMENT.md**: GitHub → Vercel → DNS cutover.
- [ ] When changing DNS, change only A/CNAME (website) — **leave MX (email) records alone**.
- [ ] Keep Squarespace published ~1–2 weeks after launch as a rollback.

## 2. Off-site local SEO — YOURS to do (biggest impact, bigger than any site change)
- [ ] **Google Business Profile**: claim/optimize it and actively request Google reviews. This
      drives the Map Pack and is where most competitors get their leads.
- [ ] **Directory listings** with identical name/address/phone: Yelp, Thumbtack, Angi,
      HomeAdvisor, BBB. These rank on page 1 for "painters sugar land."
- [ ] After launch: submit `sitemap.xml` to Google Search Console; monitor 404s for ~2 weeks.

## 3. Content placeholders to fill (graceful now, but should be replaced)
- [ ] **City-page videos** — 50 `TODO_*_VIDEO_ID` placeholders in `lib/cities.ts` (featured +
      authentic). Replace with real YouTube IDs; they currently render placeholder boxes.
- [ ] **City before/after photos** — 16 `TODO_*_BEFORE_*` placeholders in `lib/cities.ts`
      ("after" images are real; only the "before" shots are placeholders).

## 4. Decisions for you (business, not code)
- [ ] Provide your **Google Business Profile URL** — the header rating strip and "5.0★" links
      currently point to `/testimonials`; they can point straight to your Google reviews instead.
- [ ] Consider matching a competitor's **5-year cabinet guarantee** as a marketing angle
      (you currently offer 2- and 4-year workmanship warranties).
- [ ] Confirm the **5.0★ / 87 reviews** figure used sitewide is accurate, or update it.

## 5. Optional polish (nice-to-have, low impact)
- [ ] 6 source images failed to download (decorative color swatches) — not real project photos.
- [ ] 6 `/blog/tag/...` redirects in `next.config.ts` contain literal spaces (harmless, 0-traffic).
- [ ] An `/about` hub page tying together our-story / our-vision / core-values.
- [ ] Net-new blog posts targeting topics competitors rank for.

---

## How the site is built (orientation for any future work)
- **Pages from data**: city pages in `lib/cities.ts`; sub-services in `content/services/`;
  info/pricing/etc. in `content/pages/` (rendered by the `app/[...slug]` catch-all);
  hubs in `content/hubs/`; cabinet city pages in `content/cabinet-cities/`; blog in `content/blog/`.
- **Migration scripts** that (re)generate content live in `migration/*.mjs`. If you re-run them,
  they read the original scrape in `scrape/` and the image maps in `migration/`.
- **Redirects** (89) are in `next.config.ts`. **Sitemap** auto-includes everything via `app/sitemap.ts`.
- **Always build/run in the background** (foreground builds have frozen sessions).
