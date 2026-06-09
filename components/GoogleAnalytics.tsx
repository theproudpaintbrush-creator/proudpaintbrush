import Script from "next/script";

// GA4 measurement ID (looks like "G-XXXXXXXXXX"). Resolution order:
//   1. NEXT_PUBLIC_GA_ID env var (lets a staging/preview build point at a
//      separate property, or disable analytics by setting it empty), else
//   2. the production property default below — but only in production builds,
//      so `next dev` never sends local traffic to the live property.
// The ID is public by nature (it ships in client JS), so committing it is safe.
const GA_PRODUCTION_ID = "G-3VBQEW7TD7";
const GA_ID =
  process.env.NEXT_PUBLIC_GA_ID ||
  (process.env.NODE_ENV === "production" ? GA_PRODUCTION_ID : undefined);

/**
 * Loads Google Analytics 4 via gtag.js using next/script's afterInteractive
 * strategy, so it never competes with hydration or the LCP hero. Renders
 * nothing when no ID resolves (e.g. local development), which keeps dev traffic
 * out of the production property.
 *
 * SPA route changes are captured by GA4 "Enhanced Measurement" (page changes
 * based on browser history events), which is on by default for new properties.
 */
export default function GoogleAnalytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
