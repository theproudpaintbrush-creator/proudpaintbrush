# Hand-off: City-page photo & testimonial overhaul (service-areas + interior/exterior/cabinet)

**Status: COMPLETE and DEPLOYED to production (2026-06-02).** This doc is the record of what was
done and what's still open, so a fresh session can continue cold.

Project root: `C:\Users\Chris\Documents\proudpaintbrush` (Next.js 16 + React 19 + Tailwind v4, App
Router, TS). Live on Vercel at https://www.theproudpaintbrush.com (auto-deploys from GitHub `main`).
The empty `SEO` working dir is NOT the repo. Owner = Chris Petkau (non-technical, particular about
images; he reviews live on his phone).

---

## 1. What shipped this session (all live)

Commits on `main`, in order:

| Commit | What |
|---|---|
| `f2c0c78` | **Service-areas optimization** — all 9 `/service-areas` pages got rich blocks (trust row, FAQs+schema, real review cards, pricing band, funnel-down links) + 4 hand-vetted photos each; hub got 8 city photo-cards + new hero. Fixed stale `/painting-services` links, `youcabook` typo, broken alt, duplicate sign-grid. |
| `516fdc1` | West Houston hub card → distinct gray-brick exterior |
| `c4c2d86` | Missouri City hub card → white-black-stucco; SW Houston → brick-stone |
| `a623b6b` | SW Houston hub card → red-brick (owner caught brick-stone was a BEFORE photo) |
| `a8d480f` | **Exterior city pages** (`/exterior-painting/<city>`) — replaced sign/mismatched shots in `exterior.customerPhotos` with 3 finished-exterior photos each; grid heading → "Freshly Painted <City> Exteriors" |
| `e973551` | **Interior city pages** (`/interior-painting/<city>`) — same with finished-interior photos; heading → "Freshly Painted <City> Interiors" |
| `f594631` | **Exterior pages → 1 featured testimonial** — removed authentic-video grid + suppressed sitewide video strip; fixed MC/WH featured videos that were cabinet/interior jobs |
| `db86939` | Owner-picked the 5 exterior featured videos (kept Fulshear/MC/WH) |
| `f5e410f` | **Interior pages → 1 featured testimonial** (same treatment) |
| `ca82a6a` | Owner-picked all 8 interior featured videos |
| `c1db6f0` | **Cabinet city pages** (`/cabinet-painting/<city>`) → 3 written Google reviews instead of video strip |
| `7b63435` | 5 cabinet feature photos swapped to owner-picked kitchens |

Net result, per city, across the three services:
- **Exterior** city page: finished-exterior photo grid + **1** owner-picked featured video.
- **Interior** city page: finished-interior photo grid + **1** owner-picked featured video.
- **Cabinet** city page: **3** written Google reviews (cabinet/interior-tagged) + an owner-picked
  kitchen feature image. No video testimonials.

---

## 2. Architecture — where each page type lives (IMPORTANT, they differ)

There are **three different renderers** for the city pages. Don't assume they share code.

1. **`/service-areas` + `/service-areas/<city>`** → generic content pages.
   Route `app/[...slug]/page.tsx` → `lib/pages.ts` (`getPage`) → **`components/ContentPage.tsx`**,
   fed by `content/pages/service-areas.json` (hub) + `content/pages/service-areas/<city>.json`.
   `ContentPage` was extended this session with optional, gated-on-presence fields in
   `PageContent` (`lib/pages.ts`): `trustRow`, `reviews` (`{heading,intro,authors[],service?,limit?}`),
   `relatedLinks`, `cityCards` (photo-card grid, used by the hub), `priceTeaser`. Render order:
   hero → trustRow → body → cityCards → relatedLinks → ReviewCards → PricingBand → gallery → CTA.

2. **`/interior-painting/<city>` + `/exterior-painting/<city>`** → rich `cities.ts`-driven template.
   Routes `app/{interior,exterior}-painting/[city]/page.tsx` read **`lib/cities.ts`** (the `CITIES`
   array; each city has `interior` + `exterior` `CityServiceContent` with `hero`, `customerPhotos`,
   `beforeAfterPhotos`, `featuredVideo`, `authenticVideos`, climate/neighborhood/faq sections).
   Photos shown = the **`customerPhotos`** grid (via `components/CustomerPhotoGrid.tsx`, next/image
   fill, no dims needed) + the **featuredVideo** (via `components/VideoTestimonial.tsx`). The
   authentic-video grid section was REMOVED from both templates this session.

3. **`/cabinet-painting/<city>`** → `ServiceDetail`.
   Route `app/cabinet-painting/[city]/page.tsx` reads `content/cabinet-cities/<slug>.json`
   (`ServiceContent` type) → **`components/ServiceDetail.tsx`**. The page's big photo = `ogImage`
   (also the social OG image). `ServiceDetail` now takes an optional `reviews?: Review[]` prop and
   renders a `ReviewCards` section before the CTA (gated — sub-service pages that don't pass it are
   unaffected). The cabinet route picks 3 reviews/city via `CABINET_REVIEW_AUTHORS` + emits Review
   schema.

**Sitewide video strip:** `components/GlobalVideoTestimonials.tsx` (mounted in `app/layout.tsx`)
shows on every page except `/testimonials`. It is now ALSO suppressed on all `interior-painting`,
`exterior-painting`, AND `cabinet-painting` **city** pages (hardcoded `CITY_SLUGS` check). Hubs and
sub-service pages still show it.

---

## 3. The owner-curated testimonial videos (cities.ts `featuredVideo`)

All distinct. If asked to change one: edit `lib/cities.ts`, match on the unique
`customerName: "Featured <City> [interior] customer"` line (the youtubeId is the line above it).

- **Exterior featured:** Sugar Land `6P4_4GHaYP8` · Katy `B3mAxVXwDoM` · Richmond `gN2iVF5ig_8` ·
  Rosenberg `jF9-nlPZAYE` · SW Houston `sbTOOc-S7nE` · Fulshear `LNmUGCgmTS0` ·
  Missouri City `E_GicxQ676A` · West Houston `3rIAxmF9ow0`.
- **Interior featured:** Fulshear `4K_j8zfo2zQ` · Katy `JqY3L7IJOOY` · Missouri City `yrbeE2EwCcA` ·
  Richmond `Z208PaNZY4U` · Rosenberg `gY1VnnU308o` · SW Houston `zT_z3yxJcL0` ·
  Sugar Land `shzynACJsEw` · West Houston `tLfUJtXRwss`.

`lib/testimonialVideos.ts` has the full 29-video list with name labels; `scrape/content/testimonials.md`
is the authoritative job-type record. Only ~3 videos are firmly exterior-tagged, so the original
exterior "featured" placements were trusted — but the owner has since hand-picked all 16, so that's moot.

---

## 4. Reviews (cabinet pages + service-areas/hubs)

`content/reviews.json` = **20 real 5.0★ Google reviews**, tagged `service: interior|exterior|cabinet`.
Loaded by `lib/reviews.ts` (`getReviews`, `getReviewsForService`, `getReviewsForPage(spec)`,
`buildReviewSchema`). **Never fabricate reviews — fake Review schema is a Google penalty.**

Cabinet pages need reviews that mention cabinet OR interior work. Only ~5 qualify:
**Catherine Harter** (cabinet — on all 8 cabinet pages), **Jeff Deurlein**, **Morgan Fritchie**,
**Joshua D. Randall**, **Dr. Jamie Russell Sr.** (interior). They rotate 3/page via
`CABINET_REVIEW_AUTHORS` in `app/cabinet-painting/[city]/page.tsx`. **If the owner supplies more
cabinet-specific Google reviews, add them to `content/reviews.json` (with `service:"cabinet"`) so the
cabinet pages get more variety** — currently they repeat.

---

## 5. The photo workflow (KEY learning — you CAN see the photos)

Source library: `C:\Users\Chris\Downloads\proudpaintbrush-photos\{interior,exterior,cabinets,...}`
(~200 finished photos NOT all in the repo). The repo's served images live in
`public/images/migrated/` (~750+ webp/jpg).

**The Read tool renders local image files visually** — so unlike the migrated library (filename-only),
you can actually LOOK at these and judge quality. Workflow that worked:
1. `migration/build-photo-sheets.mjs` builds per-city labeled contact sheets (sharp montages) →
   `C:\Users\Chris\Documents\SEO\tmp\sheet-<city>.png` + `legend.json` (number→filename map). Read
   those to review ~20 photos at once cheaply. (Resize to JPG before sending to the user — 3MB PNGs
   don't preview inline; ~130KB JPGs do.)
2. Pick finished shots — **exclude** anything named/looking like before / prep / in-progress / ladder
   / masked / worker / repair. **CAUTION:** "repaint" in a filename does NOT guarantee an "after"
   shot — the owner caught `brick-stone-home-garage-door-repaint-southwest-houston` as a BEFORE.
   Brick/stone homes are hard to tell before/after; lean on the owner to confirm.
3. Copy chosen files into `public/images/migrated/`, record dims in `migration/image-dims.json`
   (sharp `.metadata()`), then reference them.

Scripts that applied photos this session (re-runnable, in `migration/`):
`optimize-service-areas.mjs`, `redistribute-service-area-images.mjs`, `apply-vetted-photos.mjs`,
`apply-exterior-city-photos.mjs`, `apply-interior-city-photos.mjs`, `build-photo-sheets.mjs`.

Image dims: `migration/image-dims.json` (`{ "/path": {w,h} }`) → `lib/imageDims.ts`. `next/image`
fill (CustomerPhotoGrid) needs no dims; raw `<img>` (ContentPage gallery, ServiceDetail feature) do.

---

## 6. Deploy process (this project)

1. On branch **`main`**; Vercel auto-deploys from `main`. Build all-local first.
2. **ALWAYS run `npm run build` and `next dev` with `run_in_background: true`** — foreground builds
   have frozen sessions on this machine. Dev server is usually already on :3000 (also reachable from
   the owner's phone at `http://192.168.254.68:3000` — bound `0.0.0.0`, IP is in `allowedDevOrigins`).
3. Stage only intended files (explicit `git add`). Plain commit messages (no `&`, `->`, quotes — they
   break PowerShell; use a `-F` message file). End with
   `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
4. `git push origin main` triggers a **GitHub credential dialog the OWNER must fill** with a PAT
   (classic, repo scope) — the assistant is blocked from handling the raw token. Get explicit "go".
5. Verify live by polling `https://www.theproudpaintbrush.com/<path>`. **CDN edge caching is
   inconsistent for ~30-60s** — poll until N consecutive checks agree, don't trust a single curl.
   Vercel builds in ~16-45s.

Gotchas: CRLF warnings on `git add` are harmless. Live HTML is minified to one line, so
multi-word `grep -c` gives false negatives — grep distinctive single tokens or use `grep -o ... | wc -l`.
`next/font` Poppins fetch can flake the build (transient — retry). sharp wants Windows paths
(`C:/Users/...` forward slashes OK; `\t` in a bash-embedded node string becomes a tab — write a
`.mjs` file instead of `node -e` for anything with paths).

---

## 7. Open / candidate work (nothing blocking)

- **Heroes + OG images on the interior/exterior `[city]` pages are still the OLD shots.** Only the
  `customerPhotos` grids + featured videos were refreshed. Upgrading `city.hero` and `city.ogImage`
  in `lib/cities.ts` to the new photography is the obvious next polish.
- **Cabinet review variety** — only Catherine Harter is a true cabinet review; she's on all 8 pages.
  Add more cabinet reviews to `content/reviews.json` when the owner supplies them.
- **Missouri City cabinet feature photo** (`white-kitchen-cabinets-west-houston-tx-angle-1.webp`) is a
  small 600×800 portrait — looks softer stretched full-width than the others. Owner may want a swap.
- **Interior pages** currently keep their own interior featured videos (owner-picked); a couple reuse
  a video that also appears on an exterior page (harmless, different pages).
- Older site-wide candidates from `deployment-progress.md`: real Core Web Vitals run (PSI),
  per-review `city` tags for area-matched review cards, the duplicate Squarespace author byline in 87
  blog bodies, 16 city "before" photos for before/after sliders.

---

## 8. Reference

Full project history: `deployment-progress.md` and `proudpaintbrush-project.md` (auto-memory).
Earlier service-areas runbook (now done): `HANDOFF-service-areas.md`.
Constants: booking `https://theproudpaintbrush.youcanbook.me` · phone `(832) 605-0493` /
`+18326050493` · navy `#1a2e44`, blue `#4B83B2` · 5.0★ / 113 reviews · licensed & insured / since 2020.
