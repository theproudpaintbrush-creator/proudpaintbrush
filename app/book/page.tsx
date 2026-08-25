import type { Metadata } from "next";
import Link from "next/link";
import { BOOKING_EMBED_URL, BOOKING_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/site";

const BASE_URL = "https://www.theproudpaintbrush.com";

export const metadata: Metadata = {
  title: "Book a Free Estimate | The Proud Paintbrush",
  description:
    "Schedule your free painting estimate with The Proud Paintbrush online in minutes — Sugar Land & Fort Bend County, fully insured, locally owned since 2020.",
  alternates: { canonical: `${BASE_URL}/book` },
  openGraph: {
    title: "Book a Free Estimate | The Proud Paintbrush",
    description: "Schedule your free painting estimate online in minutes — Sugar Land & Fort Bend County.",
    url: `${BASE_URL}/book`,
    type: "website",
    images: [{ url: `${BASE_URL}/images/hero-stucco-richmond.webp` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Free Estimate | The Proud Paintbrush",
    description: "Schedule your free painting estimate online in minutes — Sugar Land & Fort Bend County.",
    images: [`${BASE_URL}/images/hero-stucco-richmond.webp`],
  },
};

// A short, dedicated booking landing page — the link we hand out on Google
// Business Profile, Local Services Ads, and email signatures, separate from
// /contact so those channels get their own clean page_location in GA4.
export default function BookPage() {
  return (
    <>
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Book Your Free Estimate</h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Pick a time below — fully insured and locally owned since 2020. Every estimate is honest, detailed, and
            no-pressure. Prefer to talk first?{" "}
            <a href={`tel:${PHONE_TEL}`} className="underline hover:text-white">
              Call {PHONE_DISPLAY}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <iframe
            title="Book a free painting estimate with The Proud Paintbrush"
            src={BOOKING_EMBED_URL}
            className="w-full"
            style={{ minHeight: "780px", border: 0 }}
            loading="lazy"
          />
        </div>
        <p className="text-center text-sm text-gray-500 mt-4">
          Prefer a new tab?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[#3A6A96] font-medium hover:underline">
            Open the scheduler &rarr;
          </a>{" "}
          &middot; Have a question first?{" "}
          <Link href="/contact" className="text-[#3A6A96] font-medium hover:underline">
            Contact us &rarr;
          </Link>
        </p>
      </section>
    </>
  );
}
