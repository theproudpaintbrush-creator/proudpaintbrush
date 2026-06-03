# Hand-off: Optimize the `/service-areas` pages (same treatment as the service pages)

**Goal:** Apply the same "make it 10/10" optimization we just shipped for the 4 key service pages to the **service-areas** pages. Make them appealing to visitors, strong for local SEO, well-internally-linked, and CWV-clean.

**Target URLs (9):**
- `/service-areas` (hub)
- `/service-areas/fulshear`
- `/service-areas/katy`
- `/service-areas/missouri-city`
- `/service-areas/richmond`
- `/service-areas/rosenberg`
- `/service-areas/southwest-houston`
- `/service-areas/sugar-land`
- `/service-areas/west-houston`

Project root: `C:\Users\Chris\Documents\proudpaintbrush` (Next.js 16 + React 19 + Tailwind v4, App Router, TS). Site is **live** on Vercel at https://www.theproudpaintbrush.com (auto-deploys from GitHub `main`).

---

## 1. CRITICAL: how these pages are built (different from the service pages)

The service pages we optimized (`/interior-painting`, `/exterior-painting`, `/cabinet-painting`) use the **rich `components/ServiceHub.tsx`** component. **The service-areas pages do NOT.**

- They are **generic content pages**: route `app/[...slug]/page.tsx` (catch-all) → `lib/pages.ts` (`getPage`) → **`components/ContentPage.tsx`**, fed by JSON in:
  - `content/pages/service-areas.json` (the hub, key `service-areas`)
  - `content/pages/service-areas/<city>.json` (8 cities, key `service-areas/<city>`)
- `ContentPage.tsx` renders only: **navy hero** (breadcrumb + h1) → **prose body** (`bodyHtml`, `dangerouslySetInnerHTML`) → optional **square gallery grid** (`page.gallery`) → **blue CTA**. That's it. No review cards, no pricing band, no trust row, no video.
- `PageContent` fields (see `lib/pages.ts`): `key, title, metaDescription, h1, bodyHtml, faqs[], gallery[]`.
- **FAQ schema** is emitted in `app/[...slug]/page.tsx` from `page.faqs` (no visible FAQ section — Q&A is expected to live inline in `bodyHtml`). **All 9 service-areas pages currently have `faqs: []`** → zero FAQ schema. Big easy win.
- The **sitewide video strip** (`components/GlobalVideoTestimonials.tsx`, mounted in `app/layout.tsx`) DOES appear at the bottom of these pages, but since the path starts with `/service-areas` (not `/interior|exterior|cabinet-painting`), it shows the **default mixed set**, not an area-matched one.

**Current state (measured):** hub = ~421 body words, 0 FAQs, has gallery. `sugar-land` = ~836 words, 0 FAQs, has gallery. Others similar.

### First architectural decision the next session must make
The optimization elements (reviews, pricing band, trust row, area-matched video) don't exist in `ContentPage`. Choose one:
- **(A) Enhance `ContentPage.tsx`** with new OPTIONAL fields (e.g. `priceTeaser`, `reviews`, `relatedLinks`, `trustRow`) that render only when present. Lowest-risk if gated on presence (won't affect the other ~20 content pages that lack those fields). **Recommended.**
- **(B) Build a dedicated `app/service-areas/...` route + template** (like ServiceHub) reading the same JSON. More work, more control, risk of diverging from catch-all redirects.

Either way, **inject FAQs + richer body content into the JSON**, and reuse the components below.

⚠️ **Watch for content cannibalization:** `/service-areas/<city>` overlaps with the existing rich city pages `/interior-painting/<city>` and `/exterior-painting/<city>` (these use `ServiceDetail` + `lib/cities.ts`). The service-areas page should be the **general "house painters in <city>"** pillar that **links down** to the interior/exterior/cabinet city pages — not duplicate them. Cross-link, differentiate, set canonicals carefully.

---

## 2. The playbook we applied to the 4 service pages (replicate this)

What "10/10" meant, element by element:

1. **Project photo galleries** — real finished-work photos with descriptive, **geo-tagged alt text** + hover captions. Owner curates picks (very particular — see §5). Component: `components/ProjectGallery.tsx`.
2. **In-hero trust row** — `★★★★★ 5.0 · 113 Google reviews · Licensed & Insured · Locally Owned Since 2020` above the fold.
3. **Real written reviews + `Review` schema** — from `content/reviews.json` via `lib/reviews.ts`. Component: `components/ReviewCards.tsx` (has `masonry` + `columns` + `dark` props).
4. **"Investment & Guarantee" pricing band** — real price ranges + credentials + financing + CTA. Component: `components/PricingBand.tsx`.
5. **Area/service-matched video testimonials** — `components/GlobalVideoTestimonials.tsx` + `lib/testimonialVideos.ts`.
6. **Expanded FAQs (People-Also-Ask)** — feeds FAQPage schema.
7. **Cross-linking** — link hubs↔siblings↔testimonials↔pricing↔city pages with keyword anchors.
8. **Sticky mobile CTA bar** — already sitewide (`components/MobileCTABar.tsx`); nothing to do.
9. **CWV** — every image needs `width`/`height` (no layout shift).
10. **Meta/title audit** — unique, keyword-rich, title <60ch, meta 150–160ch.

---

## 3. Reusable assets (exact paths — REUSE, don't rebuild)

**Components** (`components/`):
- `ProjectGallery.tsx` — props `{heading, intro?, items:[{src,alt,caption?}]}`. `next/image` fill + fixed aspect = no CLS. (Note: this is what the *service hubs* use; the content-page gallery in `ContentPage.tsx` is a separate, simpler raw-`<img>` grid that lacks dims — see CWV note.)
- `ReviewCards.tsx` — props `{reviews, heading?, intro?, columns?:2|3, dark?, masonry?}`. Renders nothing if `reviews` empty.
- `PricingBand.tsx` — props `{heading, range, note, href, linkLabel}`. Dark navy band, real credentials baked in.
- `GlobalVideoTestimonials.tsx` — sitewide strip; **service detection is by pathname prefix**. To make `/service-areas` show area-relevant videos, extend the `service` logic here (currently only matches `/interior|exterior|cabinet-painting`).
- `MobileCTABar.tsx` — sitewide; done.

**Libs / data:**
- `lib/reviews.ts` — `getReviews()`, `getReviewsForService(parent, limit=2)` (tops up thin services with shortest general reviews), `buildReviewSchema(reviews)`.
- `content/reviews.json` — **20 REAL Google reviews** (5.0★), tagged `service: interior|exterior|cabinet` (9 ext / 2 int / 1 cab / 8 general). **Only real, attributable reviews — never fabricate; fake `Review` schema is a Google penalty risk.** Reviews don't currently carry a `city` field; the owner could supply per-review cities to power area-matched review cards.
- `lib/testimonialVideos.ts` — `TESTIMONIAL_VIDEOS` (full list), `SERVICE_STRIP_VIDEOS` (interior/exterior/cabinet trios), `STRIP_VIDEOS` (default mix). Video→project-type classification came from **`scrape/content/testimonials.md`** (the authoritative source — more reliable than `lib/cities.ts` placement). That file also has per-customer **cities** (e.g. Avan=Katy, Mrs. McMillan=Sienna/Missouri City, Mrs. Phillips=The Heights/Houston) — useful for area-matched video on service-areas pages.
- `migration/image-dims.json` — **1,062 entries** `{ "/path": {w,h} }`. Use to inject `width`/`height` into raw `<img>` (CWV). See the pattern below.
- `lib/serviceSchema.ts` — `buildServiceSchemas` / `buildHubSchemas`. Global `LocalBusiness #business` node (aggregateRating 5.0/113) is in `app/layout.tsx`; reference it by `@id`, don't duplicate.
- Photo library: `public/images/` and `public/images/migrated/` (~745 WebP; `/thumbs/` are small — **use the full-size, not the thumb, in large tiles**).

**Constants:** booking `https://theproudpaintbrush.youcanbook.me` · phone `(832) 605-0493` / `+18326050493` · brand colors navy `#1a2e44`, blue `#4B83B2`. Real prices (from `content/pages/pricing/*`): interior **$3,000–$20,000+**, exterior **$2,500–$16,000+**, cabinet **$2,000–$10,000+**.

---

## 4. Recommended work for the service-areas pages (concrete)

**Per CITY page (`/service-areas/<city>`):**
- Add a **trust row** near the top (stars/reviews/licensed/since-2020).
- Add **2–4 real FAQs** to the JSON `faqs[]` (also put the Q&A inline in `bodyHtml` so it's visible) — e.g. "Do you serve all of <city>?", "How much does painting cost in <city>?", "Are you licensed and insured?". → fills the FAQ-schema gap.
- Add **area-matched written reviews** (ReviewCards) if/when reviews get city tags; otherwise show 2 general 5.0★ reviews.
- Add a **pricing teaser** linking to `/pricing/*`.
- **Cross-link** to that city's `/interior-painting/<city>`, `/exterior-painting/<city>`, and `/cabinet-painting/<city>` (these exist and are rich) + `/testimonials` + `/portfolio`. This is the biggest SEO lever — the service-areas city page should be a hub that funnels to the service×city pages.
- **Gallery**: confirm real, well-cropped photos with geo alt (not filename alts). Owner will likely want to curate.
- **Body depth**: hub is thin (421 words) — expand with neighborhoods, "why local", what-we-paint, climate notes (mirror the voice in `lib/cities.ts` city content, which is excellent and already written per city — reuse facts, don't copy verbatim).

**HUB page (`/service-areas`):**
- Make it a true **directory**: card grid linking to all 9 city pages with a sentence each.
- Trust row, FAQs, a map or coverage statement, CTA. Cross-link to service hubs.

**Video strip:** extend `GlobalVideoTestimonials.tsx` so `/service-areas*` shows a relevant set (general mix is fine, or area-matched using the city data in `scrape/content/testimonials.md`).

**CWV (do for every page touched):** any raw `<img>` in `bodyHtml` OR in the `ContentPage` gallery grid that lacks `width`/`height` causes layout shift. The `ContentPage` gallery currently renders `<img ... loading="lazy">` with **no dims**. Fix by adding dims from `migration/image-dims.json`. Pattern we used (Node, run from project root):
```js
// for raw <img> in bodyHtml: regex each <img>, look up src in image-dims.json, inject width/height
// see how we fixed 119 imgs in the last session (commit 0346c21)
```

**Meta audit:** check all 9 titles <60ch / metas 150–160ch, unique + keyword-rich (e.g. "<City> House Painters | The Proud Paintbrush").

---

## 5. Gotchas & workflow (learned the hard way)

- **ALWAYS run `npm run build` and `next dev` in the BACKGROUND** (`run_in_background: true`). Foreground builds have frozen sessions on this machine.
- **`next/font` Poppins fetch flakes**: the build sometimes fails with `Failed to fetch Poppins from Google Fonts` — it's a transient network error, just **re-run**. (Candidate fix: self-host the font.)
- **Dev server**: likely already running on port 3000. `curl "http://localhost:3000/<path>?t=$(date +%s)"` to verify changes (cache-bust with the query). Content/JSON changes hot-reload; `lib`/component changes recompile.
- **sharp paths**: use Windows-style (`C:/Users/...`) not git-bash `/c/Users/...` (Node won't find the latter). sharp is available. For ICO/Next, embedded PNGs must be **RGBA** (`.ensureAlpha()`), and `extract`+`trim` must be in **separate pipelines**.
- **Owner is non-technical** and **very particular about images** — they review live and say "use this one" with a `localhost:3000/images/...` URL or a Downloads path. Don't bulk-swap images without showing/confirming. They believe the site is still Squarespace (it's Next/Vercel now) — all edits are in code.
- **Image files**: owner saved one as `brandmark.png` but it landed as `brandmark.png.jpg` (double extension) with an old mtime — search broadly (`find -iname`), don't rely on recency.
- **CRLF warnings** on `git add` are harmless (line-ending normalization).
- **JSON in bodyHtml**: content is HTML strings inside JSON — escape `"` and watch `&`→`&amp;` when grepping rendered output.

## 6. Deploy process (this project)
1. `git` is on branch **`main`**; Vercel **auto-deploys** from `main`. Branching does NOT deploy.
2. Commit only the intended files (use explicit `git add <paths>`; build logs are gitignored). Plain commit messages (no `&`, `->`, quotes). End with `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.
3. **`git push` requires the owner's GitHub token** (PAT) — a credential dialog pops up and **the owner pastes it** (the assistant is blocked from handling the raw token). Generate a new classic PAT (repo scope) if needed.
4. **Pushing to `main` deploys to production** — the auto-mode classifier will (correctly) block an unauthorized push. Get explicit "go"/"deploy" from the owner before pushing.
5. Verify live: poll `https://www.theproudpaintbrush.com/<path>` for a content marker, or compare file sizes. Vercel builds in ~20–45s. Rollback = Vercel dashboard "Promote to Production" on the prior deploy.

## 7. Verification checklist (per page)
- [ ] Build passes (background, retry on font flake)
- [ ] FAQs present + FAQPage schema emitted
- [ ] Trust row + reviews (real only) + pricing teaser render
- [ ] Cross-links to `/interior|exterior|cabinet-painting/<city>` + testimonials + pricing
- [ ] All images have width/height (no CLS); alts are descriptive + geo-tagged (no filenames)
- [ ] Title <60ch, meta 150–160ch, unique
- [ ] Canonical correct; no duplicate-content collision with the service×city pages
- [ ] Verified live via curl after deploy

---

*Reference: the service-page optimization shipped in commits `0346c21` (pages) and the favicon work after. See `deployment-progress.md` memory for the full project history.*
