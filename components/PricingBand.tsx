import Link from "next/link";
import { BOOKING_URL } from "@/lib/site";

const CREDENTIALS = [
  "Fully Insured · $1M Liability",
  "2 & 5-Year Written Warranty",
  "Premium Sherwin-Williams Coatings",
  "Free On-Site Estimate",
];

// "Investment & Guarantee" band: real price range + credentials + financing +
// CTA. Drives the "how much does it cost" searcher and reinforces trust without
// duplicating the thin top TrustBar.
export default function PricingBand({
  heading,
  range,
  note,
  href,
  linkLabel,
}: {
  heading: string;
  range: string;
  note: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <section className="bg-[#1a2e44] text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">{heading}</h2>
        <p className="text-5xl sm:text-6xl font-extrabold text-[#7fb0d8] mb-3">{range}</p>
        <p className="text-white/75 max-w-2xl mx-auto mb-8">{note}</p>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm font-medium mb-9">
          {CREDENTIALS.map((c) => (
            <span key={c} className="flex items-center gap-1.5">
              <span className="text-[#7fb0d8]" aria-hidden>✓</span>
              {c}
            </span>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-[#1a2e44] hover:bg-[#7fb0d8] font-semibold px-8 py-4 transition-colors"
          >
            Get Your Exact Quote &rarr;
          </a>
          <Link
            href={href}
            className="inline-block border-2 border-white/60 text-white hover:bg-white hover:text-[#1a2e44] font-semibold px-8 py-4 transition-colors"
          >
            {linkLabel}
          </Link>
        </div>
        <p className="text-white/75 text-sm mt-6">
          Flexible financing available —{" "}
          <Link href="/financing" className="underline hover:text-white">see options</Link>.
        </p>
      </div>
    </section>
  );
}
