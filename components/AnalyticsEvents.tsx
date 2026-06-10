"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Fires GA4 events for the two actions that matter most for a lead-gen site:
 * tapping a phone number and opening the online booking tool. Uses a single
 * delegated click listener so every current and future tel:/booking link is
 * covered without editing each one. No-ops when gtag isn't present (e.g. local
 * dev, where GoogleAnalytics renders nothing), so it never errors.
 *
 * Resulting GA4 events — mark these as "key events" in the GA4 admin:
 *   - phone_call_click
 *   - booking_click   (includes a page_location param)
 *   - form_submit
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const el = e.target as HTMLElement | null;
      const link = el?.closest?.("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";

      if (href.startsWith("tel:")) {
        window.gtag?.("event", "phone_call_click", { link_url: href });
      } else if (
        href.includes("youcanbook.me") ||
        href.includes("book.theproudpaintbrush.com")
      ) {
        // page_location lets us see WHICH page drove each booking click in GA4.
        window.gtag?.("event", "booking_click", {
          link_url: href,
          page_location: window.location.href,
        });
      }
    }

    function onSubmit(e: SubmitEvent) {
      const form = e.target as HTMLFormElement | null;
      if (!form || form.tagName !== "FORM") return;
      window.gtag?.("event", "form_submit", {
        form_id: form.id || undefined,
        page_location: window.location.href,
      });
    }

    // Capture phase so the event still fires even if a handler stops propagation.
    document.addEventListener("click", onClick, true);
    document.addEventListener("submit", onSubmit, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("submit", onSubmit, true);
    };
  }, []);

  return null;
}
