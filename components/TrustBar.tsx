import Link from "next/link";

const BADGES = [
  "Fully Insured",
  "2 & 5-Year Written Warranty",
  "Sherwin-Williams Pro",
  "5.0★ · 113 Reviews",
  "Locally Owned Since 2020",
];

export default function TrustBar() {
  return (
    <section className="bg-[#1a2e44] text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium">
        {BADGES.map((b) => (
          <span key={b} className="flex items-center gap-2">
            <span className="text-[#3A6A96]" aria-hidden>✓</span>
            {b}
          </span>
        ))}
        <Link href="/financing" className="flex items-center gap-2 hover:text-white/80">
          <span className="text-[#3A6A96]" aria-hidden>✓</span>
          <span className="underline">Financing Available</span>
        </Link>
      </div>
    </section>
  );
}
