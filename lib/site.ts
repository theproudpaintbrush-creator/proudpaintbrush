// Single source of truth for cross-cutting site constants. Importing from here
// (instead of re-declaring a `const BOOKING_URL` in each file) means a value can
// be swapped in ONE place when an external dependency changes (DNS, GBP, etc.).
//
// Brand facts that govern copy live in /content/brand-facts.md.

export const SITE_URL = "https://www.theproudpaintbrush.com";

// Online booking (Routemize). Change ONLY this constant when the link changes —
// every CTA site-wide picks it up.
export const BOOKING_URL = "https://theproudpaintbrush.routemize.com/e/sales-appointment-copy";

// The Routemize form page already renders chrome-free (no site header/nav), so
// the embed iframe just points at the same URL as the plain link.
export const BOOKING_EMBED_URL = BOOKING_URL;

// Routemize's conversational booking flow, used by the floating chat bubble
// (components/ChatWidget.tsx). The conversion variant skips the intro screen
// and drops straight into the first qualifying question.
export const CHATBOT_URL = "https://theproudpaintbrush.routemize.com/chatbot/sales-appointment-copy?variant=conversion";

// Direct Google reviews URL — the canonical g.page link used by the testimonials
// and contact pages. Standardized here so every review CTA is redirect-free
// (the old share.google short link 302-redirected).
export const REVIEW_URL = "https://g.page/r/CaafH5ZU7h7cEBM/review";

// Phone — display form for humans, tel: form for the href.
export const PHONE_DISPLAY = "(832) 605-0493";
export const PHONE_TEL = "+18326050493";

export const EMAIL = "info@theproudpaintbrush.com";

// Web3Forms access key for the /contact lead form. Create a free key (tied to
// the inbox you want leads in) at https://web3forms.com — it's safe to commit
// (it only authorizes sending TO your email; spam-protected). The lead form on
// /contact stays hidden until this is set to a real key.
// TODO(web3forms): paste the access key from web3forms.com here.
export const WEB3FORMS_ACCESS_KEY = "3e961faa-6e6b-4ef0-adaf-4b8f1aa434c3";

// Review aggregate. 5.0★ rating; the count is the live Google Business Profile
// total (larger than the attributable reviews kept in content/reviews.json).
// Update REVIEW_COUNT when the GBP total changes.
export const RATING_VALUE = "5.0";
export const REVIEW_COUNT = 124;
