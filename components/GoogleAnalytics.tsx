import Script from "next/script";

// GA4 measurement ID (looks like "G-XXXXXXXXXX"). Read from the environment so
// the same code can run without analytics in dev/preview and with analytics in
// production. Set NEXT_PUBLIC_GA_ID in the build/hosting environment to enable.
// The value is public by nature (it ships in client JS), so it is safe to expose.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Loads Google Analytics 4 via gtag.js using next/script's afterInteractive
 * strategy, so it never competes with hydration or the LCP hero. Renders
 * nothing when NEXT_PUBLIC_GA_ID is unset (e.g. local development), which keeps
 * dev traffic out of the production property.
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
