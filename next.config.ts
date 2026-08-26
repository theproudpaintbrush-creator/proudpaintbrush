import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the local network IP so the dev server is reachable from a phone
  // on the same WiFi (Next 16 blocks cross-origin LAN dev access by default).
  allowedDevOrigins: ["192.168.254.68"],
  images: {
    // Serve AVIF first (≈20-30% smaller than WebP), then WebP, then the original.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for a year so /_next/image stops revalidating on
    // every view — big repeat-visit LCP win.
    minimumCacheTTL: 31536000,
    // Image quality values used across the site (default is [75]).
    qualities: [75, 80, 85, 90],
    // Cap the largest generated width at 1920 (full-bleed hero max). The Next
    // default includes 2048 and 3840, which made full-bleed `fill` images on 4K
    // displays request a 3840px transform of source art that is never larger
    // than ~1920 — wasted bytes with no visual gain. Removing them guarantees no
    // image is ever requested at w=3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.squarespace-cdn.com",
        pathname: "/**",
      },
      {
        // YouTube video thumbnails for click-to-play testimonial facades
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    // Baseline security headers applied to every route. A strict Content-Security-
    // Policy is intentionally omitted for now because the site embeds several
    // third parties (routemize.com, YouTube, Google, squarespace-cdn) and a CSP
    // needs per-source testing before it can be enabled without breaking them.
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Permissions-Policy", value: "geolocation=(), microphone=(), camera=()" },
        ],
      },
      {
        // Static images in /public are served with no cache by default; pin them
        // to a year (filenames are stable/content-specific) so repeat views and
        // raw <img> assets don't re-download every navigation.
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
  async redirects() {
    return [
      // Canonical host consolidation: force the apex (non-www) host to www so the
      // site is only ever indexed under one origin. Evaluated first; only fires
      // when the request host is the bare apex, then the path-specific redirects
      // below apply on the resulting www request.
      {
        source: "/:path*",
        has: [{ type: "host", value: "theproudpaintbrush.com" }],
        destination: "https://www.theproudpaintbrush.com/:path*",
        permanent: true,
      },
      { source: "/blog/rfsxbwm1wuox5icg7tco32z3zgzgux", destination: "/blog/do-painters-negotiate-on-price-in-sugar-land", permanent: true },
      { source: "/blog/bbz6d1fi1tpw2dc54r4aj7one4ip49", destination: "/blog/behr-vs-sherwin-williams", permanent: true },
      { source: "/blog/re0coari0bpmqn5bkrghkaq6n53ix6", destination: "/blog/how-much-do-painting-companies-charge", permanent: true },
      { source: "/blog/blog-post-title-one-p29ft", destination: "/blog/painting-your-cabinets-the-step-by-step-guide", permanent: true },
      { source: "/blog/blog-post-title-three-dtyfg", destination: "/blog/is-it-time-to-update-your-fireplace", permanent: true },
      { source: "/blog/why-professional-painters-dont-choose-paint-the-same-way-homeowners-do-1", destination: "/blog/why-professional-painters-dont-choose-paint-the-same-way-homeowners-do", permanent: true },
      { source: "/blog/66tvq5hwbxr26tk5zafy5zc2dxqt0s", destination: "/blog/interior-and-exterior-painting-in-fort-bend", permanent: true },
      { source: "/blog/f5o7v4ayzmbn2dcyewyv6ciuone5hx", destination: "/blog/what-your-walls-say-about-you", permanent: true },
      { source: "/blog/cicpzh2q9ju9mp7a9ybdj823fk24zn", destination: "/blog/we-love-serving-fort-bend", permanent: true },
      { source: "/blog/qtzdhzuvu422ivwrb8v6jqa41989nu", destination: "/blog/little-known-hoa-requirements-for-exterior-painting", permanent: true },
      // ---- Phase 4: cannibalization consolidation (fold weak posts into cluster pillars) ----
      // Pricing cluster -> local pillar (Sugar Land room-cost); strongest posts kept live & cross-linked
      { source: "/blog/the-truth-about-interior-painting-prices", destination: "/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land", permanent: true },
      { source: "/blog/the-ultimate-guide-to-price-painting-your-home", destination: "/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land", permanent: true },
      { source: "/blog/what-really-drives-the-cost-of-interior-painting-without-talking-prices", destination: "/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land", permanent: true },
      { source: "/blog/how-much-should-you-really-pay-for-bedroom-painting", destination: "/blog/everything-you-need-to-know-about-how-much-it-costs-to-paint-a-room-in-sugar-land", permanent: true },
      // Exterior-prices blog post -> exterior pricing money page (deliberate blog->money consolidation)
      { source: "/blog/exterior-painting-prices", destination: "/pricing/exterior-prices", permanent: true },
      // Prep cluster -> "what matters more: paint brand or prep" pillar (best ranker)
      { source: "/blog/exterior-painting-its-all-about-prep", destination: "/blog/what-matters-more-paint-brand-or-prep-work", permanent: true },
      { source: "/blog/prepitright", destination: "/blog/what-matters-more-paint-brand-or-prep-work", permanent: true },
      { source: "/blog/what-proper-prep-really-means-and-why-most-quotes-skip-it", destination: "/blog/what-matters-more-paint-brand-or-prep-work", permanent: true },
      // Paint-failure cluster -> "why paint jobs fail" pillar (the strong fade post is kept live, not merged)
      { source: "/blog/this-is-why-your-paint-failed", destination: "/blog/why-paint-jobs-fail-after-23-years-and-how-to-avoid-it", permanent: true },
      { source: "/blog/this-is-why-your-paint-is-fading", destination: "/blog/why-paint-jobs-fail-after-23-years-and-how-to-avoid-it", permanent: true },
      // DIY-vs-hire: fold the clear duplicate into the better-ranking decision guide
      { source: "/blog/should-you-paint-yourself-or-hire-a-pro-a-clear-decision-guide", destination: "/blog/diy-vs-professional-painting-when-to-hire-a-pro", permanent: true },
      // When-to-paint cluster -> exterior post promoted to climate pillar
      { source: "/blog/when-is-the-best-time-to-paint-my-interior", destination: "/blog/when-is-the-best-time-to-paint-my-exterior", permanent: true },
      { source: "/blog/the-ultimate-guide-for-when-to-paint", destination: "/blog/when-is-the-best-time-to-paint-my-exterior", permanent: true },
      { source: "/painting-services/interior-painting", destination: "/interior-painting", permanent: true },
      { source: "/painting-services/exterior-painting", destination: "/exterior-painting", permanent: true },
      { source: "/painting-services/cabinet-painting", destination: "/cabinet-painting", permanent: true },
      { source: "/drywall-repair", destination: "/interior-painting/drywall-repair", permanent: true },
      { source: "/fence-staining", destination: "/exterior-painting/fence-staining", permanent: true },
      { source: "/the-proud-paintbrush", destination: "/", permanent: true },
      { source: "/painting-services", destination: "/services", permanent: true },
      { source: "/sitemap", destination: "/", permanent: true },
      { source: "/painting-services/residential-painters", destination: "/services", permanent: true },
      { source: "/exterior-painting/exterior-house-painters", destination: "/exterior-painting", permanent: true },
      { source: "/exterior-painting/exterior-painters", destination: "/exterior-painting", permanent: true },
      { source: "/exterior-painting/stucco-maintenance/stucco-painting", destination: "/exterior-painting/stucco-painting", permanent: true },
      { source: "/exterior-painting/stucco-maintenance/stucco-repairs", destination: "/exterior-painting/stucco-repairs", permanent: true },
      { source: "/painting-services/portfolio/interior-painting", destination: "/portfolio/interior-painting", permanent: true },
      { source: "/painting-services/portfolio/exterior-painting", destination: "/portfolio/exterior-painting", permanent: true },
      { source: "/preperation-process", destination: "/preparation-process", permanent: true },
      { source: "/preperation-process/interior", destination: "/preparation-process/interior", permanent: true },
      { source: "/preperation-process/exterior", destination: "/preparation-process/exterior", permanent: true },
      { source: "/blog/ev5rl48r6sewhkhx3n6l9ycvlqiore", destination: "/blog/best-exterior-paint-texas", permanent: true },
      { source: "/blog/hll1sta1kz9wkoq5kv4p81vkfla0sf", destination: "/blog/is-behr-paint-good", permanent: true },
      { source: "/blog/blog-post-title-four-xhrcm", destination: "/blog/cost-to-paint-bathroom", permanent: true },
      { source: "/blog/-whats-the-best-paint-for-cabinets", destination: "/blog/whats-the-best-paint-brand-for-cabinets", permanent: true },
      { source: "/blog/-whats-the-best-paint-brand-for-cabinets", destination: "/blog/whats-the-best-paint-brand-for-cabinets", permanent: true },
      { source: "/blog/title-painting-and-health-understanding-low-voc-and-zero-voc-paints", destination: "/blog/painting-and-health-understanding-low-voc-and-zero-voc-paints", permanent: true },
      { source: "/blog/-who-owns-behr-paint-company", destination: "/blog/who-owns-behr-paint-company", permanent: true },
      { source: "/staining-lacquering-sealing", destination: "/interior-painting/staining-lacquering-sealing", permanent: true },
      { source: "/painting-services/service-areas", destination: "/service-areas", permanent: true },
      { source: "/painting-services/portfolio", destination: "/portfolio", permanent: true },
      { source: "/prep", destination: "/preparation-process", permanent: true },
      { source: "/exterior-painting/prep", destination: "/preparation-process/exterior", permanent: true },
      { source: "/interior-prices", destination: "/pricing/interior-prices", permanent: true },
      { source: "/corevalues", destination: "/core-values", permanent: true },
      { source: "/wall-painting", destination: "/interior-painting/wall-painting", permanent: true },
      { source: "/stucco-maintenance", destination: "/exterior-painting/stucco-maintenance", permanent: true },
      { source: "/pressure-washing", destination: "/exterior-painting/pressure-washing", permanent: true },
      { source: "/railings", destination: "/exterior-painting/railings", permanent: true },
      { source: "/painting-vinyl-siding", destination: "/exterior-painting/vinyl-siding-painting", permanent: true },
      { source: "/residential-painters", destination: "/services", permanent: true },
      { source: "/brick-painting", destination: "/exterior-painting/brick-painting", permanent: true },
      { source: "/exterior-brick", destination: "/exterior-painting/brick-painting", permanent: true },
      { source: "/paint-garage-doors", destination: "/exterior-painting/garage-door-painting", permanent: true },
      { source: "/our-team", destination: "/our-story", permanent: true },
      { source: "/our-team-1", destination: "/our-story", permanent: true },
      { source: "/paintitforward", destination: "/paint-it-forward", permanent: true },
      { source: "/commercial-portfolio", destination: "/portfolio", permanent: true },
      { source: "/patio-sealing", destination: "/exterior-painting/deck-painting-and-staining", permanent: true },
      { source: "/exterior-painters-sugar-land", destination: "/exterior-painting", permanent: true },
      { source: "/exterior-house-painter", destination: "/exterior-painting", permanent: true },
      { source: "/kitchen-painting", destination: "/interior-painting/kitchen-painting", permanent: true },
      { source: "/bathroom-painting", destination: "/interior-painting/bathroom-painting", permanent: true },
      { source: "/bedroom-painting", destination: "/interior-painting/bedroom-painting", permanent: true },
      { source: "/living-room-painting", destination: "/interior-painting/living-room-painting", permanent: true },
      { source: "/dining-room-painting", destination: "/interior-painting/dining-room-painting", permanent: true },
      { source: "/ceiling-painting", destination: "/interior-painting/ceiling-painting", permanent: true },
      { source: "/hallway-and-staircase-painting", destination: "/interior-painting/hallway-and-staircase-painting", permanent: true },
      { source: "/kids-room-painting", destination: "/interior-painting/kids-room-painting", permanent: true },
      { source: "/millwork-painting", destination: "/interior-painting/millwork-painting", permanent: true },
      { source: "/finish-carpentry", destination: "/interior-painting/finish-carpentry", permanent: true },
      { source: "/accent-wall-painting", destination: "/interior-painting/accent-wall-painting", permanent: true },
      { source: "/office-room-painting", destination: "/interior-painting/office-painting", permanent: true },
      { source: "/nursery-room-painting", destination: "/interior-painting/nursery-painting", permanent: true },
      { source: "/media-room-painting", destination: "/interior-painting", permanent: true },
      { source: "/wallpaper-services", destination: "/interior-painting", permanent: true },
      { source: "/deck-painting-and-staining", destination: "/exterior-painting/deck-painting-and-staining", permanent: true },
      { source: "/stucco-painting", destination: "/exterior-painting/stucco-painting", permanent: true },
      { source: "/stucco-repairs", destination: "/exterior-painting/stucco-repairs", permanent: true },
      { source: "/garage-door-painting", destination: "/exterior-painting/garage-door-painting", permanent: true },
      { source: "/door-refinishing", destination: "/exterior-painting/door-refinishing", permanent: true },
      { source: "/fiber-cement-siding-painting", destination: "/exterior-painting/fiber-cement-siding-painting", permanent: true },
      { source: "/vinyl-siding-painting", destination: "/exterior-painting/vinyl-siding-painting", permanent: true },
      { source: "/exterior-prices", destination: "/pricing/exterior-prices", permanent: true },
      { source: "/cabinet-prices", destination: "/pricing/cabinet-prices", permanent: true },
      { source: "/employees", destination: "/careers", permanent: true },
      { source: "/employees/:slug*", destination: "/careers", permanent: true },
      // /blog/tag/* is handled as a 410 in middleware.ts, not redirected — a
      // zero-value taxonomy URL shouldn't 301 into an unrelated page.
      // ---- Sprint 1, Task 3: typo/duplicate/alias cleanup ----
      { source: "/fence-staini", destination: "/exterior-painting/fence-staining", permanent: true },
      { source: "/frence-paint", destination: "/exterior-painting/fence-staining", permanent: true },
      { source: "/service-areas/null", destination: "/service-areas", permanent: true },
      { source: "/service-areas/richmond-tx", destination: "/service-areas/richmond", permanent: true },
      // NOTE: a "/Testimonials" -> "/testimonials" rule used to live here. Next's
      // redirect source matching is case-insensitive, so it also matched the
      // canonical lowercase path and sent /testimonials into an infinite
      // self-redirect loop — the real, deployed reviews page was completely
      // unreachable in production. Removed; the near-zero legacy capitalized
      // traffic isn't worth re-breaking the live page over.
      { source: "/projectexpectations", destination: "/project-expectations", permanent: true },
      { source: "/warranty-1", destination: "/warranty", permanent: true },
      { source: "/pricing/cabinet-pricing", destination: "/pricing/cabinet-prices", permanent: true },
      { source: "/pricing/interior-pricing", destination: "/pricing/interior-prices", permanent: true },
      { source: "/pricing/exterior", destination: "/pricing/exterior-prices", permanent: true },
      { source: "/color-tips", destination: "/color-consultation", permanent: true },
    ];
  },
};

export default nextConfig;
