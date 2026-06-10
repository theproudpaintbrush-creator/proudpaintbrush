// Single source of truth for cross-cutting site constants. Importing from here
// (instead of re-declaring a `const BOOKING_URL` in each file) means a value can
// be swapped in ONE place when an external dependency changes (DNS, GBP, etc.).
//
// Brand facts that govern copy live in /content/brand-facts.md.

export const SITE_URL = "https://www.theproudpaintbrush.com";

// Online booking (YouCanBook.me). When the book.theproudpaintbrush.com CNAME is
// live (external task), change ONLY this constant — every CTA picks it up.
// TODO(booking-subdomain): swap to "https://book.theproudpaintbrush.com" once DNS resolves.
export const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";

// The booking embed iframe needs the chrome-stripping query string. Derived from
// BOOKING_URL so it tracks the subdomain swap automatically.
export const BOOKING_EMBED_URL = `${BOOKING_URL}/?noframe=true&skipHeaderFooter=true`;

// Direct Google Maps reviews URL. The header/testimonials links currently use a
// share.google short link, which 302-redirects (bad for crawlers and slow for
// users). Paste the canonical Maps "?...&reviews" URL from the GBP dashboard.
// TODO(review-link): replace with the direct Google Maps reviews URL from GBP.
export const REVIEW_URL = "https://share.google/03zEeHzRVJW7NvE2Z";

// Phone — display form for humans, tel: form for the href.
export const PHONE_DISPLAY = "(832) 605-0493";
export const PHONE_TEL = "+18326050493";

export const EMAIL = "info@theproudpaintbrush.com";

// Review aggregate. 5.0★ rating; the count is the live Google Business Profile
// total (larger than the attributable reviews kept in content/reviews.json).
// Update REVIEW_COUNT when the GBP total changes.
export const RATING_VALUE = "5.0";
export const REVIEW_COUNT = 113;
