"use client";

import { usePathname } from "next/navigation";
import { AuthenticVideoGrid } from "@/components/VideoTestimonial";
import { STRIP_VIDEOS, SERVICE_STRIP_VIDEOS } from "@/lib/testimonialVideos";
import { BOOKING_URL, REVIEW_URL } from "@/lib/site";

const SERVICE_HEADING: Record<string, string> = {
  interior: "Hear From Our Interior Painting Customers",
  exterior: "Hear From Our Exterior Painting Customers",
  cabinet: "Hear From Our Cabinet Painting Customers",
};

// Sitewide social-proof strip rendered at the bottom of every page EXCEPT the
// /testimonials page itself (which already has the full video library). On the
// interior/exterior/cabinet hubs and city pages it shows service-matched videos.
export default function GlobalVideoTestimonials() {
  const pathname = usePathname();
  if (pathname === "/testimonials") return null;

  // The interior/exterior city pages (e.g. /exterior-painting/sugar-land) show a
  // single featured testimonial of their own, so the sitewide strip is suppressed
  // there to keep one testimonial per page.
  const CITY_SLUGS = [
    "sugar-land", "missouri-city", "katy", "richmond",
    "rosenberg", "fulshear", "west-houston", "southwest-houston",
  ];
  const parts = pathname.split("/");
  if (
    (parts[1] === "exterior-painting" || parts[1] === "interior-painting" || parts[1] === "cabinet-painting") &&
    CITY_SLUGS.includes(parts[2])
  )
    return null;

  const service = pathname.startsWith("/interior-painting")
    ? "interior"
    : pathname.startsWith("/exterior-painting")
      ? "exterior"
      : pathname.startsWith("/cabinet-painting")
        ? "cabinet"
        : null;
  const videos = service ? SERVICE_STRIP_VIDEOS[service] : STRIP_VIDEOS;
  const heading = service ? SERVICE_HEADING[service] : "Hear It From Fort Bend County Homeowners";

  return (
    <section className="bg-[#111111] text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#7fb0d8] mb-3">
            Real Customers, Real Reviews
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            {heading}
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Short, unscripted video reviews from real Proud Paintbrush customers across Sugar Land,
            Missouri City, Katy, and Richmond. Tap any thumbnail to play.
          </p>
        </div>

        <AuthenticVideoGrid videos={videos} city="Sugar Land" />

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#111111] hover:bg-[#4B83B2] hover:text-white font-semibold px-8 py-3 transition-colors"
          >
            See all 113 five-star reviews &rarr;
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white/70 text-white hover:bg-white hover:text-[#111111] font-semibold px-8 py-3 transition-colors"
          >
            Get Your Free Estimate
          </a>
        </div>
      </div>
    </section>
  );
}
