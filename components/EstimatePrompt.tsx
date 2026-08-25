"use client";

import { useEffect, useState } from "react";
import BookingButton from "@/components/BookingButton";

const DISMISS_KEY = "tpp:estimate-prompt-dismissed";

/**
 * A single tasteful slide-in card that appears once the visitor has scrolled
 * ~60% down a service or sub-service page — the point where they've shown real
 * intent. It is:
 *   - desktop-only (hidden below xl): on mobile the sticky MobileCTABar already
 *     occupies the bottom of the screen, so a second floating CTA would be noise.
 *   - dismissible, and the dismissal is remembered for the rest of the browser
 *     session (sessionStorage), so it never nags on every page.
 */
export default function EstimatePrompt() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true); // assume dismissed until we check

  useEffect(() => {
    // Respect a prior dismissal for this session.
    if (sessionStorage.getItem(DISMISS_KEY)) return;
    setDismissed(false);

    function onScroll() {
      const scrolled = window.scrollY + window.innerHeight;
      const depth = scrolled / document.documentElement.scrollHeight;
      if (depth >= 0.6) {
        setVisible(true);
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // handle short pages already past 60%
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function dismiss() {
    setVisible(false);
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  }

  if (dismissed) return null;

  return (
    <div
      aria-hidden={!visible}
      className={`hidden xl:block fixed bottom-6 right-6 z-40 w-80 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative bg-white shadow-2xl ring-1 ring-black/10 rounded-xl p-6">
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss estimate prompt"
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl leading-none"
        >
          &times;
        </button>
        <h3 className="text-lg font-bold text-[#1a2e44] mb-2 pr-4">Ready for an exact quote?</h3>
        <p className="text-sm text-gray-600 mb-4">Free 30&ndash;40 minute on-site estimate. No pressure.</p>
        <BookingButton
          label={<>Book My Free Estimate &rarr;</>}
          className="inline-block w-full text-center bg-[#4B83B2] text-white hover:bg-[#1a2e44] font-semibold px-5 py-3 rounded-lg transition-colors"
        />
      </div>
    </div>
  );
}
