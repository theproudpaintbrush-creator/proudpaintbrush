"use client";

import { usePathname } from "next/navigation";
import BookingButton from "@/components/BookingButton";
const PHONE_TEL = "+18326050493";

// Fixed bottom call/estimate bar for mobile. Hidden on xl+ (desktop has the
// sticky header CTA). The matching bottom padding lives on <body> so the bar
// never covers footer content.
export default function MobileCTABar() {
  const pathname = usePathname();
  // Avoid double CTAs on the contact page (it's already a booking page).
  if (pathname === "/contact") return null;

  return (
    <div className="xl:hidden fixed bottom-0 inset-x-0 z-40 grid grid-cols-2 border-t border-white/10 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex items-center justify-center gap-2 bg-[#1a2e44] text-white font-semibold py-4 text-sm"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path d="M6.62 10.79a15.15 15.15 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.36 11.36 0 003.56.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.56 1 1 0 01-.24 1.02l-2.21 2.21z" />
        </svg>
        Call Now
      </a>
      <BookingButton
        label={<>Free Estimate &rarr;</>}
        className="flex items-center justify-center gap-2 bg-[#3A6A96] text-white font-semibold py-4 text-sm"
      />
    </div>
  );
}
