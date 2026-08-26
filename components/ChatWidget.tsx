"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { CHATBOT_URL } from "@/lib/site";

// Site-wide floating chat launcher. Bottom-LEFT (not bottom-right) so it never
// collides with EstimatePrompt's desktop slide-in card (bottom-6 right-6 on
// service pages) or the mobile MobileCTABar (full-width bar at the very
// bottom — the launcher sits above it via the bottom-[76px] offset). Skips
// /contact and /book, which already put the booking form front and center.
export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (pathname === "/contact" || pathname === "/book") return null;

  function toggle() {
    setOpen((v) => !v);
  }

  function close() {
    setOpen(false);
    setLoaded(false);
  }

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-label="Chat with The Proud Paintbrush"
          className="fixed z-50 bottom-[136px] left-4 xl:bottom-24 xl:left-6 w-[calc(100vw-2rem)] max-w-[380px] h-[70vh] max-h-[600px] rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between bg-[#1a2e44] px-4 py-3">
            <span className="text-white font-semibold text-sm">Chat with us</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close chat"
              className="text-white/80 hover:text-white text-xl leading-none"
            >
              &times;
            </button>
          </div>
          <div className="relative flex-1">
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#3A6A96]" />
              </div>
            )}
            <iframe
              src={CHATBOT_URL}
              title="Chat with The Proud Paintbrush"
              onLoad={() => setLoaded(true)}
              className={`w-full h-full border-0 ${loaded ? "" : "invisible"}`}
            />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={open ? "Close chat" : "Chat with us"}
        className="fixed z-50 bottom-[76px] left-4 xl:bottom-6 xl:left-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#3A6A96] text-white shadow-lg hover:bg-[#2D5479] transition-colors"
      >
        {open ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
