"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING_URL, BOOKING_EMBED_URL } from "@/lib/site";

// If the iframe's onLoad hasn't fired by this point, treat it as failed
// (slow network, blocked request, YCBM outage) and bail to the full /book
// page rather than leaving the visitor staring at a blank box. Note this
// can't catch every failure mode: onLoad fires once the iframe's document
// loads even if its content is empty (e.g. Safari ITP / third-party-cookie
// blocking inside the frame) — cross-origin iframes can't be inspected from
// the parent to detect that case. The always-visible manual link below covers
// that gap for anyone who sees a blank/broken widget despite onLoad firing.
const IFRAME_TIMEOUT_MS = 6000;

/**
 * Reusable booking CTA. Renders a real <a href={BOOKING_URL}> so the existing
 * AnalyticsEvents delegated click listener (document-level, capture phase)
 * still fires booking_click exactly as before — it reads the href before our
 * onClick's preventDefault ever runs. If JS hasn't hydrated yet, the anchor
 * still works as a plain new-tab link to BOOKING_URL (progressive enhancement).
 *
 * className/label are passed in per call site so existing button styling and
 * copy are preserved exactly; this component only adds the popup behavior.
 */
export default function BookingButton({
  label = "Book My Free Estimate",
  className = "inline-block bg-[#3A6A96] hover:bg-[#2D5479] text-white font-semibold px-7 py-3 rounded-lg transition-colors",
}: {
  label?: React.ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    timeoutRef.current = setTimeout(() => {
      window.location.href = "/book";
    }, IFRAME_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open]);

  function closeModal() {
    setOpen(false);
    setLoaded(false);
  }

  return (
    <>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
        className={className}
      >
        {label}
      </a>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Book your free estimate"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-3 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close booking dialog"
              className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-xl leading-none text-gray-500 shadow hover:text-gray-900"
            >
              &times;
            </button>
            {!loaded && (
              <div className="flex items-center justify-center" style={{ minHeight: "640px" }}>
                <div className="text-center text-sm text-gray-500">
                  <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#3A6A96]" />
                  Loading the scheduler&hellip;
                </div>
              </div>
            )}
            <iframe
              src={BOOKING_EMBED_URL}
              title="Book your free painting estimate — The Proud Paintbrush"
              onLoad={() => {
                setLoaded(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              className={`w-full rounded-lg overflow-hidden ${loaded ? "" : "hidden"}`}
              style={{ minHeight: "640px", border: "none" }}
            />
            <p className="mt-3 text-center text-xs text-gray-400">
              Scheduler not loading?{" "}
              <a href="/book" className="text-[#3A6A96] font-medium hover:underline">
                Open the full booking page &rarr;
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
