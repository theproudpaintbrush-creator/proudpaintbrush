# Redirect Reconciliation — Pre-Cutover Checklist

_Generated 2026-06-03. Source of equity inventory: `migration/gsc/Pages.csv` (last-12-mo GSC) + live `sitemap.xml` (`migration/live-sitemap-urls.txt`)._

## Live-platform check

`https://www.theproudpaintbrush.com/` returns **`Server: Vercel`**, `X-Nextjs-Prerender: 1`, 225 `/_next/` asset refs. **Production is already serving this Next.js build (deployed on Vercel), not Squarespace.** This is a *deploy* of pending changes, not a platform migration.

## Summary

- Equity URLs evaluated: **192**
- live route: **118**
- redirected: **72**
- NEWLY ADDED: **2**
- NEEDS DECISION: **0**

**Reverse diff (will anything currently indexed break on deploy?):** of 182 live sitemap URLs, **0 would 404** after deploying the local changes; **13** (the consolidated blog posts) correctly become 301s. No indexed URL is dropped without a redirect.

## ⚠️ NEEDS DECISION

_None. Every equity URL resolves as a live route or a 301._

Optional call: the two `/employees/*` pages below are internal employee resources now **301'd to `/careers`**. If you'd rather they not pass any signal, change them to a **410 Gone** instead. Default (301→/careers) is fine.

## ✅ NEWLY ADDED this pass

| Old URL | Clicks | Impr | New 301 target |
|---|---|---|---|
| `/employees/forms` | 1 | 6 | `/careers (via /employees/:slug*)` |
| `/employees/training` | 0 | 11 | `/careers (via /employees/:slug*)` |

## 301 Redirected (existing)

| Old URL | Clicks | Impr | → Destination |
|---|---|---|---|
| `/blog/ev5rl48r6sewhkhx3n6l9ycvlqiore` | 132 | 9378 | `/blog/best-exterior-paint-texas` |
| `/blog/-whats-the-best-paint-brand-for-cabinets` | 81 | 33722 | `/blog/whats-the-best-paint-brand-for-cabinets` |
| `/blog/hll1sta1kz9wkoq5kv4p81vkfla0sf` | 43 | 5333 | `/blog/is-behr-paint-good` |
| `/blog/blog-post-title-four-xhrcm` | 42 | 26030 | `/blog/cost-to-paint-bathroom` |
| `/brick-painting` | 19 | 1576 | `/exterior-painting/brick-painting` |
| `/employees` | 15 | 433 | `/careers` |
| `/staining-lacquering-sealing` | 14 | 872 | `/interior-painting/staining-lacquering-sealing` |
| `/paint-garage-doors` | 10 | 2582 | `/exterior-painting/garage-door-painting` |
| `/preperation-process` | 10 | 27 | `/preparation-process` |
| `/fence-staining` | 8 | 13251 | `/exterior-painting/fence-staining` |
| `/exterior-brick` | 6 | 1123 | `/exterior-painting/brick-painting` |
| `/painting-services/exterior-painting` | 6 | 307 | `/exterior-painting` |
| `/our-team` | 5 | 341 | `/our-story` |
| `/painting-services/service-areas` | 4 | 7434 | `/service-areas` |
| `/blog/-whats-the-best-paint-for-cabinets` | 4 | 384 | `/blog/whats-the-best-paint-brand-for-cabinets` |
| `/exterior-painting/stucco-maintenance/stucco-repairs` | 3 | 1136 | `/exterior-painting/stucco-repairs` |
| `/painting-services/interior-painting` | 3 | 188 | `/interior-painting` |
| `/painting-services/portfolio` | 2 | 1045 | `/portfolio` |
| `/exterior-painting/exterior-painters` | 2 | 482 | `/exterior-painting` |
| `/paintitforward` | 2 | 146 | `/paint-it-forward` |
| `/blog/why-professional-painters-dont-choose-paint-the-same-way-homeowners-do-1` | 2 | 28 | `/blog/why-professional-painters-dont-choose-paint-the-same-way-homeowners-do` |
| `/exterior-painting/stucco-maintenance/stucco-painting` | 1 | 1586 | `/exterior-painting/stucco-painting` |
| `/prep` | 1 | 1095 | `/preparation-process` |
| `/painting-services` | 1 | 286 | `/services` |
| `/painting-services/cabinet-painting` | 1 | 247 | `/cabinet-painting` |
| `/exterior-painting/prep` | 1 | 195 | `/preparation-process/exterior` |
| `/commercial-portfolio` | 1 | 181 | `/portfolio` |
| `/patio-sealing` | 1 | 44 | `/exterior-painting/deck-painting-and-staining` |
| `/painting-services/portfolio/interior-painting` | 1 | 34 | `/portfolio/interior-painting` |
| `/blog/exterior-painting-prices` | 0 | 1066 | `/pricing/exterior-prices` |
| `/blog/tag/houston painter` | 0 | 364 | `/blog (via /blog/tag/:slug*)` |
| `/railings` | 0 | 275 | `/exterior-painting/railings` |
| `/painting-vinyl-siding` | 0 | 261 | `/exterior-painting/vinyl-siding-painting` |
| `/our-team-1` | 0 | 218 | `/our-story` |
| `/painting-services/residential-painters` | 0 | 211 | `/services` |
| `/exterior-painters-sugar-land` | 0 | 192 | `/exterior-painting` |
| `/blog/re0coari0bpmqn5bkrghkaq6n53ix6` | 0 | 165 | `/blog/how-much-do-painting-companies-charge` |
| `/painting-services/portfolio/exterior-painting` | 0 | 155 | `/portfolio/exterior-painting` |
| `/exterior-painting/exterior-house-painters` | 0 | 153 | `/exterior-painting` |
| `/blog/this-is-why-your-paint-is-fading` | 0 | 153 | `/blog/why-paint-jobs-fail-after-23-years-and-how-to-avoid-it` |
| `/stucco-maintenance` | 0 | 131 | `/exterior-painting/stucco-maintenance` |
| `/pressure-washing` | 0 | 128 | `/exterior-painting/pressure-washing` |
| `/interior-prices` | 0 | 122 | `/pricing/interior-prices` |
| `/corevalues` | 0 | 115 | `/core-values` |
| `/residential-painters` | 0 | 110 | `/services` |
| `/sitemap` | 0 | 94 | `/` |
| `/blog/when-is-the-best-time-to-paint-my-interior` | 0 | 89 | `/blog/when-is-the-best-time-to-paint-my-exterior` |
| `/blog/how-much-should-you-really-pay-for-bedroom-painting` | 0 | 73 | `/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land` |
| `/exterior-house-painter` | 0 | 67 | `/exterior-painting` |
| `/preperation-process/exterior` | 0 | 58 | `/preparation-process/exterior` |
| `/blog/tag/interior painting` | 0 | 50 | `/blog (via /blog/tag/:slug*)` |
| `/blog/the-truth-about-interior-painting-prices` | 0 | 46 | `/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land` |
| `/preperation-process/interior` | 0 | 44 | `/preparation-process/interior` |
| `/blog/qtzdhzuvu422ivwrb8v6jqa41989nu` | 0 | 40 | `/blog/little-known-hoa-requirements-for-exterior-painting` |
| `/wall-painting` | 0 | 36 | `/interior-painting/wall-painting` |
| `/blog/blog-post-title-three-dtyfg` | 0 | 32 | `/blog/is-it-time-to-update-your-fireplace` |
| `/blog/what-really-drives-the-cost-of-interior-painting-without-talking-prices` | 0 | 23 | `/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land` |
| `/blog/66tvq5hwbxr26tk5zafy5zc2dxqt0s` | 0 | 23 | `/blog/interior-and-exterior-painting-in-fort-bend` |
| `/blog/f5o7v4ayzmbn2dcyewyv6ciuone5hx` | 0 | 21 | `/blog/what-your-walls-say-about-you` |
| `/blog/exterior-painting-its-all-about-prep` | 0 | 17 | `/blog/what-matters-more-paint-brand-or-prep-work` |
| `/blog/rfsxbwm1wuox5icg7tco32z3zgzgux` | 0 | 16 | `/blog/do-painters-negotiate-on-price-in-sugar-land` |
| `/blog/should-you-paint-yourself-or-hire-a-pro-a-clear-decision-guide` | 0 | 12 | `/blog/diy-vs-professional-painting-when-to-hire-a-pro` |
| `/blog/this-is-why-your-paint-failed` | 0 | 10 | `/blog/why-paint-jobs-fail-after-23-years-and-how-to-avoid-it` |
| `/blog/the-ultimate-guide-for-when-to-paint` | 0 | 8 | `/blog/when-is-the-best-time-to-paint-my-exterior` |
| `/blog/the-ultimate-guide-to-price-painting-your-home` | 0 | 7 | `/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land` |
| `/blog/tag/houston local business` | 0 | 6 | `/blog (via /blog/tag/:slug*)` |
| `/blog/cicpzh2q9ju9mp7a9ybdj823fk24zn` | 0 | 6 | `/blog/we-love-serving-fort-bend` |
| `/blog/tag/hosuton painter` | 0 | 3 | `/blog (via /blog/tag/:slug*)` |
| `/blog/tag/locally owned and operated` | 0 | 3 | `/blog (via /blog/tag/:slug*)` |
| `/blog/prepitright` | 0 | 2 | `/blog/what-matters-more-paint-brand-or-prep-work` |
| `/blog/tag/sugar land painter` | 0 | 2 | `/blog (via /blog/tag/:slug*)` |
| `/blog/who-owns-behr-paint-company` | 0 | 1 | `/blog/-who-owns-behr-paint-company` |

## Live routes (200) — no redirect needed

| URL | Clicks | Impr |
|---|---|---|
| `/` | 361 | 11187 |
| `/blog/-who-owns-behr-paint-company` | 300 | 105909 |
| `/blog/who-owns-benjamin-moore-paint-company` | 254 | 68183 |
| `/blog/is-behr-paint-good` | 142 | 10324 |
| `/blog/oil-or-latex-how-to-identify-your-trims-paint-like-a-pro` | 132 | 30709 |
| `/blog/which-exterior-paint-color-fades-the-fastest` | 91 | 9669 |
| `/blog/cost-to-paint-bathroom` | 46 | 14036 |
| `/exterior-painting/door-refinishing` | 42 | 2739 |
| `/pricing` | 40 | 8376 |
| `/blog/how-to-tell-if-paint-is-oil-based-or-latex-without-guessing` | 31 | 11306 |
| `/blog/best-exterior-paint-texas` | 30 | 2696 |
| `/blog/painting-vs-flooring-which-should-come-first-in-your-renovation` | 19 | 8250 |
| `/financing` | 16 | 3647 |
| `/careers` | 16 | 1175 |
| `/exterior-painting/brick-painting` | 15 | 1190 |
| `/our-story` | 14 | 2065 |
| `/color-consultation` | 14 | 2018 |
| `/paint-it-forward` | 14 | 907 |
| `/pricing/exterior-prices` | 10 | 2527 |
| `/budget` | 9 | 630 |
| `/blog/lrv` | 8 | 1066 |
| `/exterior-painting/garage-door-painting` | 7 | 961 |
| `/testimonials` | 7 | 646 |
| `/faq` | 6 | 396 |
| `/blog/crafting-harmony-exploring-warm-and-cool-interior-paint-colors` | 6 | 333 |
| `/blog/oh-no-rust-what-to-do-before-you-paint-over-rust` | 4 | 1842 |
| `/interior-painting/drywall-repair` | 4 | 1144 |
| `/blog/franchise-painters-vs-local-painters-in-sugar-land-the-real-customer-experience` | 4 | 937 |
| `/blog/should-you-paint-your-ceiling-the-same-color-as-the-walls` | 4 | 491 |
| `/interior-painting/staining-lacquering-sealing` | 4 | 244 |
| `/interior-painting/finish-carpentry` | 4 | 198 |
| `/project-expectations` | 4 | 45 |
| `/service-areas/sugar-land` | 3 | 1050 |
| `/core-values` | 3 | 994 |
| `/exterior-painting/fence-staining` | 3 | 579 |
| `/blog/5-red-flags-when-comparing-painting-companies-in-sugar-land` | 3 | 139 |
| `/blog/how-often-should-i-pay-my-interior` | 2 | 1827 |
| `/cabinet-painting` | 2 | 1701 |
| `/blog/when-is-the-best-time-to-paint-my-exterior` | 2 | 1307 |
| `/interior-painting/living-room-painting` | 2 | 565 |
| `/exterior-painting/stucco-maintenance` | 2 | 464 |
| `/warranty` | 2 | 420 |
| `/service-areas/richmond` | 2 | 252 |
| `/blog/why-you-should-paint-your-stucco-before-its-too-late` | 2 | 221 |
| `/service-areas/rosenberg` | 2 | 125 |
| `/checklist` | 2 | 55 |
| `/portfolio/interior-painting` | 2 | 14 |
| `/services` | 1 | 3413 |
| `/blog/the-one-paint-brand-that-never-lets-me-down` | 1 | 2128 |
| `/our-vision` | 1 | 1916 |
| `/exterior-painting/vinyl-siding-painting` | 1 | 1346 |
| `/service-areas/fulshear` | 1 | 916 |
| `/blog/painting-companies-with-over-20-video-testimonials-in-sugar-land-amp-greater-houston` | 1 | 708 |
| `/service-areas/katy` | 1 | 696 |
| `/interior-painting` | 1 | 557 |
| `/pricing/interior-prices` | 1 | 431 |
| `/portfolio` | 1 | 248 |
| `/blog/which-sugar-land-painter-has-the-best-warranty` | 1 | 232 |
| `/blog/what-is-a-normal-time-frame-for-interior-painting-projects` | 1 | 230 |
| `/interior-painting/accent-wall-painting` | 1 | 218 |
| `/blog/how-long-a-professional-paint-job-should-actually-last` | 1 | 209 |
| `/blog/why-paint-jobs-fail-after-23-years-and-how-to-avoid-it` | 1 | 182 |
| `/blog/spray-or-brush-everything-you-need-to-know` | 1 | 174 |
| `/blog/what-matters-more-paint-brand-or-prep-work` | 1 | 165 |
| `/service-areas/missouri-city` | 1 | 100 |
| `/blog/is-painting-before-selling-your-home-actually-worth-it` | 1 | 94 |
| `/blog/why-professional-painters-dont-choose-paint-the-same-way-homeowners-do` | 1 | 87 |
| `/blog/should-i-buy-the-paint-myself` | 1 | 65 |
| `/blog/heres-a-quick-way-to-sell-your-house-for-5000-more` | 1 | 58 |
| `/blog/stucco-vs-brick` | 1 | 51 |
| `/blog/when-hiring-a-professional-painter-in-houston-consider-the-following-factors` | 1 | 32 |
| `/blog/paint-it-forward-a-community-painting-project-in-sugar-land` | 1 | 5 |
| `/exterior-painting` | 0 | 785 |
| `/blog` | 0 | 675 |
| `/blog/paint-my-fence` | 0 | 500 |
| `/service-areas/southwest-houston` | 0 | 460 |
| `/blog/to-prime-or-not-to-prime` | 0 | 444 |
| `/interior-painting/office-painting` | 0 | 415 |
| `/interior-painting/kitchen-painting` | 0 | 415 |
| `/exterior-painting/fiber-cement-siding-painting` | 0 | 355 |
| `/interior-painting/wall-painting` | 0 | 350 |
| `/service-areas` | 0 | 306 |
| `/blog/the-heartfelt-story-behind-the-proud-paintbrush` | 0 | 260 |
| `/interior-painting/bedroom-painting` | 0 | 256 |
| `/exterior-painting/deck-painting-and-staining` | 0 | 218 |
| `/service-areas/west-houston` | 0 | 169 |
| `/blog/what-happens-if-you-skip-primer` | 0 | 155 |
| `/blog/how-to-hurricane-proof-your-exterior` | 0 | 154 |
| `/interior-painting/millwork-painting` | 0 | 141 |
| `/interior-painting/ceiling-painting` | 0 | 135 |
| `/blog/proper-paint-disposal-a-guide-for-responsible-homeowners` | 0 | 115 |
| `/interior-painting/hallway-and-staircase-painting` | 0 | 107 |
| `/exterior-painting/pressure-washing` | 0 | 99 |
| `/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land` | 0 | 93 |
| `/interior-painting/bathroom-painting` | 0 | 92 |
| `/blog/understanding-undertones` | 0 | 83 |
| `/blog/should-you-paint-trim-the-same-color-as-the-walls` | 0 | 65 |
| `/interior-painting/dining-room-painting` | 0 | 58 |
| `/pricing/cabinet-prices` | 0 | 54 |
| `/blog/unlocking-the-5-color-psychology-secrets` | 0 | 39 |
| `/blog/what-questions-should-i-be-asking-my-painting-contractor` | 0 | 38 |
| `/blog/diy-vs-professional-painting-when-to-hire-a-pro` | 0 | 34 |
| `/blog/10-things-professional-painters-should-do-on-every-interior-but-many-dont` | 0 | 33 |
| `/blog/here-is-a-quick-way-to-understand-paint-sheens` | 0 | 31 |
| `/portfolio/exterior-painting` | 0 | 25 |
| `/interior-painting/nursery-painting` | 0 | 21 |
| `/interior-painting/brick-painting` | 0 | 20 |
| `/exterior-painting/railings` | 0 | 18 |
| `/blog/the-power-of-strategic-color-in-each-room` | 0 | 14 |
| `/interior-painting/kids-room-painting` | 0 | 13 |
| `/blog/warning-not-all-quotes-are-created-equal` | 0 | 12 |
| `/blog/have-a-professional-interior-paint-job-you-can-be-proud-of` | 0 | 11 |
| `/blog/the-secret-to-a-cohesive-beautiful-home-a-pro-color-consult` | 0 | 8 |
| `/blog/say-goodbye-to-grains-aqua-coats-jaw-dropping-transformation-of-cabinets` | 0 | 6 |
| `/blog/stop-before-you-paint-your-exterior-read-this` | 0 | 4 |
| `/blog/honoring-homes-painting-with-respect` | 0 | 2 |
| `/blog/9-keys-to-a-perfect-accent-wall` | 0 | 1 |
| `/blog/colors-to-paint-your-house-for-2023` | 0 | 1 |

## Host/protocol note

191 equity URLs were indexed under a non-canonical host (http:// or non-www). The canonical host is enforced by Next `metadataBase` + Vercel; these resolve to the same path above. Highest-traffic example: `/` (indexed as non-www,http).
