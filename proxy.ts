import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Exact-match dead URLs with no real destination — 410 tells Google "gone,
// deindex it" rather than a 404 (which reads as "might come back") or a 301
// to an unrelated page (which just dilutes the redirect graph). Anything on
// this list that already had a real destination was left as a 301 in
// next.config.ts instead (see Sprint 1 Task 2 notes).
const GONE_PATHS = new Set([
  "/blog/cGFpbnQtaX",
  "/blog/do-bug-repellent-paint-ad=",
  "/blog/do-bug-repellent-paint-additives-ac=",
  "/=20",
  "/images=",
  "/cart",
  "/estimate/michael-test",
]);

// Known-good crawler UAs — never blocked or challenged, regardless of
// declared IP country. Matching is substring/UA-based, not IP-verified (true
// verification needs reverse-DNS on the requesting IP), so a bad actor could
// spoof one of these strings to bypass the geo block below. That's an
// accepted tradeoff for this pass — the goal is filtering low-effort
// datacenter traffic, not hardening against targeted evasion.
const CRAWLER_UA =
  /googlebot|adsbot-google|mediapartners-google|bingbot|msnbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|facebookexternalhit|twitterbot|linkedinbot/i;

// GA4: Singapore + China combined for ~35% of sessions with a 0.7-0.8s
// average engagement time and zero conversions across 8 months — datacenter
// bot traffic, not a real audience.
const BLOCKED_COUNTRIES = new Set(["SG", "CN"]);

// A single exact-pathname redirect that doesn't work as a next.config.ts
// `redirects()` rule — path-to-regexp doesn't match this literal Unicode
// right-double-quote (U+201D) character reliably, but exact string
// comparison below does.
const FAQ_TYPO_PATH = "/faq”";

export function proxy(request: NextRequest) {
  // request.nextUrl.pathname preserves percent-encoding as-is (it does NOT
  // decode "%3D" to "=" or "%E2%80%9D" to "”"), but any real browser/crawler
  // sends non-ASCII and many reserved characters percent-encoded. Decode once
  // so GONE_PATHS/FAQ_TYPO_PATH match regardless of which form arrives.
  let pathname = request.nextUrl.pathname;
  try {
    pathname = decodeURIComponent(pathname);
  } catch {
    // Malformed percent-encoding — fall through with the raw pathname.
  }

  if (pathname === FAQ_TYPO_PATH) {
    return NextResponse.redirect(new URL("/faq", request.url), 308);
  }

  if (GONE_PATHS.has(pathname) || pathname.startsWith("/blog/tag/")) {
    return new NextResponse("Gone", { status: 410 });
  }

  const userAgent = request.headers.get("user-agent") || "";
  if (!CRAWLER_UA.test(userAgent)) {
    const country = request.headers.get("x-vercel-ip-country") || "";
    if (BLOCKED_COUNTRIES.has(country)) {
      return new NextResponse("Access denied", { status: 403 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/).*)"],
};
