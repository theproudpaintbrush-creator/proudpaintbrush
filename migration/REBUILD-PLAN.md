# The Proud Paintbrush — Rebuild IA & Redirect Map

_Generated from the live-site scrape (76 non-blog pages + 110 blog posts). Strategy: **clean structure + complete 301 redirects**, decisions content-informed (refine with Search Console data when available)._

## Coverage check
- Live non-blog pages: **76** — all classified: **YES ✅ (nothing will 404)**
- Redirects generated: **16** → `migration/redirects.json`


## Proposed information architecture
```
/                                 Home
/services                         Services overview (← /painting-services)
/interior-painting                Interior hub
  /interior-painting/<sub>        17 sub-services (kitchen, bath, ceiling, …)  [preserved]
  /interior-painting/<city>       8 service×city pages  [NEW, already built]
/exterior-painting                Exterior hub
  /exterior-painting/<sub>        ~12 sub-services (brick, deck, stucco, …)    [preserved]
  /exterior-painting/<city>       8 service×city pages  [NEW, already built]
/cabinet-painting                 Cabinet hub (← /painting-services/cabinet-painting)
/service-areas                    City hub
  /service-areas/<city>           8 combined city pages  [preserved, rank]
/pricing  /pricing/<svc>-prices   4 pages  [preserved]
/portfolio  /portfolio/<svc>      3 pages  [consolidated from 5]
/preparation-process/<svc>        3 pages  [typo fixed via redirect]
/warranty /financing /color-consultation /project-expectations
/checklist /budget /paint-it-forward /careers /faq /testimonials /our-story /our-vision /core-values
/blog  /blog/<slug>               ~103 posts  [migrate]
/employees/*                      internal, noindex
```

## Cannibalization consolidations (fewer, stronger pages)
1. **Two "exterior painters" pages** (`/exterior-painting/exterior-painters` + `/exterior-house-painters`) target the same query → fold into the `/exterior-painting` hub.
2. **Five portfolio pages** (two parallel sets) → consolidate to 3 under `/portfolio`.
3. **`/the-proud-paintbrush`** duplicates the homepage → 301 to `/`.
4. **`/painting-services/residential-painters`** overlaps the services overview → fold into `/services`.
5. Differentiate near-duplicates kept on purpose: `wall-painting` vs `accent-wall-painting`; `finish-carpentry` vs `millwork-painting`.

## Current-build reconciliation
- Current top-level `/drywall-repair` & `/fence-staining` collide with the ranking Squarespace URLs `/interior-painting/drywall-repair` & `/exterior-painting/fence-staining`. **Keep the Squarespace paths as canonical**; point the current-build pages there.
- `/cabinet-painting` is promoted to a top-level pillar (old `/painting-services/cabinet-painting` 301s in).
- The 16 `/interior-painting/[city]` & `/exterior-painting/[city]` pages are NEW (not on Squarespace) — keep as the granular service×city local-SEO layer alongside the broader `/service-areas/<city>` pages; interlink them.

### ✅ Preserve (same URL) (58)

| Live URL | Words | Action | Note |
|---|---|---|---|
| `/` | ?w | ✅ keep URL | Homepage |
| `/interior-painting/accent-wall-painting` | 650w | ✅ keep URL |  |
| `/interior-painting/bathroom-painting` | 626w | ✅ keep URL |  |
| `/interior-painting/bedroom-painting` | 555w | ✅ keep URL |  |
| `/interior-painting/brick-painting` | 953w | ✅ keep URL | Interior brick/limewash — distinct from exterior brick. |
| `/interior-painting/ceiling-painting` | 577w | ✅ keep URL |  |
| `/interior-painting/dining-room-painting` | 746w | ✅ keep URL |  |
| `/interior-painting/drywall-repair` | 608w | ✅ keep URL | CANONICAL drywall page (current build's top-level /drywall-repair should point here). |
| `/interior-painting/finish-carpentry` | 724w | ✅ keep URL | Overlaps millwork — differentiate copy. |
| `/interior-painting/hallway-and-staircase-painting` | 716w | ✅ keep URL |  |
| `/interior-painting/kids-room-painting` | 680w | ✅ keep URL |  |
| `/interior-painting/kitchen-painting` | 690w | ✅ keep URL |  |
| `/interior-painting/living-room-painting` | 540w | ✅ keep URL |  |
| `/interior-painting/millwork-painting` | 689w | ✅ keep URL | Overlaps finish-carpentry — differentiate copy. |
| `/interior-painting/nursery-painting` | 667w | ✅ keep URL |  |
| `/interior-painting/office-painting` | 1013w | ✅ keep URL |  |
| `/interior-painting/staining-lacquering-sealing` | 875w | ✅ keep URL |  |
| `/interior-painting/wall-painting` | 752w | ✅ keep URL | Overlaps accent-wall — differentiate (whole-room vs accent). |
| `/exterior-painting/brick-painting` | 621w | ✅ keep URL |  |
| `/exterior-painting/deck-painting-and-staining` | 600w | ✅ keep URL |  |
| `/exterior-painting/door-refinishing` | 855w | ✅ keep URL |  |
| `/exterior-painting/fence-staining` | 655w | ✅ keep URL | CANONICAL fence page (current build's /fence-staining should point here). |
| `/exterior-painting/fiber-cement-siding-painting` | 730w | ✅ keep URL |  |
| `/exterior-painting/garage-door-painting` | 631w | ✅ keep URL |  |
| `/exterior-painting/pressure-washing` | 593w | ✅ keep URL |  |
| `/exterior-painting/railings` | 600w | ✅ keep URL |  |
| `/exterior-painting/stucco-maintenance` | 700w | ✅ keep URL | Stucco hub. |
| `/exterior-painting/vinyl-siding-painting` | 741w | ✅ keep URL |  |
| `/service-areas` | 448w | ✅ keep URL | City hub. |
| `/service-areas/sugar-land` | 895w | ✅ keep URL | Combined city page (all services). |
| `/service-areas/missouri-city` | 825w | ✅ keep URL |  |
| `/service-areas/richmond` | 795w | ✅ keep URL |  |
| `/service-areas/katy` | 789w | ✅ keep URL |  |
| `/service-areas/fulshear` | 768w | ✅ keep URL |  |
| `/service-areas/rosenberg` | 761w | ✅ keep URL |  |
| `/service-areas/west-houston` | 822w | ✅ keep URL |  |
| `/service-areas/southwest-houston` | 840w | ✅ keep URL |  |
| `/portfolio` | 469w | ✅ keep URL | Portfolio hub. |
| `/portfolio/interior-painting` | 335w | ✅ keep URL |  |
| `/portfolio/exterior-painting` | 303w | ✅ keep URL |  |
| `/pricing` | 1112w | ✅ keep URL |  |
| `/pricing/interior-prices` | 950w | ✅ keep URL |  |
| `/pricing/exterior-prices` | 919w | ✅ keep URL |  |
| `/pricing/cabinet-prices` | 831w | ✅ keep URL |  |
| `/our-story` | 797w | ✅ keep URL |  |
| `/our-vision` | 705w | ✅ keep URL |  |
| `/core-values` | 1459w | ✅ keep URL |  |
| `/warranty` | 1648w | ✅ keep URL |  |
| `/financing` | 841w | ✅ keep URL |  |
| `/color-consultation` | 2161w | ✅ keep URL |  |
| `/project-expectations` | 662w | ✅ keep URL |  |
| `/checklist` | 233w | ✅ keep URL |  |
| `/budget` | 739w | ✅ keep URL |  |
| `/paint-it-forward` | 1146w | ✅ keep URL |  |
| `/careers` | 391w | ✅ keep URL |  |
| `/faq` | 837w | ✅ keep URL |  |
| `/testimonials` | 2007w | ✅ keep URL |  |
| `/blog` | 2061w | ✅ keep URL | Blog index. |


### ↪ Redirect (301, structural) (12)

| Live URL | Words | Action | Note |
|---|---|---|---|
| `/painting-services` | 916w | ↪ 301 → `/services` | Services overview → /services (3 pillar hubs live beneath it). |
| `/sitemap` | 189w | ↪ 301 → `/` | Squarespace HTML sitemap; replaced by generated sitemap.xml. |
| `/painting-services/interior-painting` | 1062w | ↪ 301 → `/interior-painting` | Interior hub promoted to top level. |
| `/painting-services/exterior-painting` | 1462w | ↪ 301 → `/exterior-painting` | Exterior hub promoted to top level. |
| `/painting-services/cabinet-painting` | 698w | ↪ 301 → `/cabinet-painting` | Cabinet promoted to pillar service. |
| `/exterior-painting/stucco-maintenance/stucco-painting` | 692w | ↪ 301 → `/exterior-painting/stucco-painting` | Flatten 3-level depth to 2. |
| `/exterior-painting/stucco-maintenance/stucco-repairs` | 625w | ↪ 301 → `/exterior-painting/stucco-repairs` | Flatten 3-level depth to 2. |
| `/painting-services/portfolio/interior-painting` | 569w | ↪ 301 → `/portfolio/interior-painting` | Duplicate portfolio path. |
| `/painting-services/portfolio/exterior-painting` | 578w | ↪ 301 → `/portfolio/exterior-painting` | Duplicate portfolio path. |
| `/preperation-process` | 597w | ↪ 301 → `/preparation-process` | Fix misspelling 'preperation'. |
| `/preperation-process/interior` | 797w | ↪ 301 → `/preparation-process/interior` | Fix misspelling. |
| `/preperation-process/exterior` | 694w | ↪ 301 → `/preparation-process/exterior` | Fix misspelling. |


### ⚠ Consolidate (301 + merge content) (4)

| Live URL | Words | Action | Note |
|---|---|---|---|
| `/the-proud-paintbrush` | 693w | ⚠ consolidate → `/` | Homepage-variant 'painting contractor' page — cannibalizes Home. 301 to /. |
| `/painting-services/residential-painters` | 507w | ⚠ consolidate → `/services` | Overlaps Home/Services overview. |
| `/exterior-painting/exterior-house-painters` | 547w | ⚠ consolidate → `/exterior-painting` | Duplicate-intent with /exterior-painters → fold into hub. |
| `/exterior-painting/exterior-painters` | 754w | ⚠ consolidate → `/exterior-painting` | Duplicate-intent with /exterior-house-painters → fold into hub. |


### 🔒 Internal (noindex) (3)

| Live URL | Words | Action | Note |
|---|---|---|---|
| `/employees` | 80w | 🔒 internal/noindex | Staff area — noindex. |
| `/employees/training` | 486w | 🔒 internal/noindex | Staff area — noindex. |
| `/employees/forms` | 46w | 🔒 internal/noindex | Staff area — noindex (gated form, thin). |

