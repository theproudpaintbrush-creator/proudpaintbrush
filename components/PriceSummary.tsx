import Link from "next/link";

// One card per pricing page. Figures are copied from the pricing pages in
// content/pages/pricing/*.json — update both together when prices change.
const SERVICES = [
  {
    name: "Interior Painting",
    range: "$3,000 – $20,000+",
    rangeLabel: "full interior",
    details: ["Single room: $500 – $1,500", "Walls: $2.00 / sq ft", "Ceilings: $1.20 / sq ft · Doors: $96 each"],
    href: "/pricing/interior-prices",
  },
  {
    name: "Exterior Painting",
    range: "$2,500 – $16,000+",
    rangeLabel: "whole home",
    details: ["Typical 2,000 sq ft home: $5,000 – $8,000", "Walls: $2.00 – $2.50 / sq ft", "Trim: $1.75 – $2.50 / linear ft"],
    href: "/pricing/exterior-prices",
  },
  {
    name: "Cabinet Painting",
    range: "$650 – $7,500+",
    rangeLabel: "vanity to large kitchen",
    details: ["Typical kitchen: $4,100 – $5,000", "Doors: $120 – $145 each", "Drawers: $110 – $135 each"],
    href: "/pricing/cabinet-prices",
  },
  {
    name: "Drywall Repair",
    range: "$95 – $259",
    rangeLabel: "per repair",
    details: ["Nail pops & cracks: $95 – $160", "Holes 4–8 sq ft: $25 – $32 / sq ft", "$650 job minimum"],
    href: "/pricing/drywall-prices",
  },
  {
    name: "Fence Staining",
    range: "$565 – $1,100+",
    rangeLabel: "standard 6 ft fence",
    details: ["About $4 – $7 / linear ft", "Average fence (100–200 ft): $670 – $880", "Instant calculator on the pricing page"],
    href: "/pricing/fence-staining-prices",
  },
];

export default function PriceSummary({ heading = "What Painting Costs" }: { heading?: string }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-2">{heading}</h2>
      <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
        Typical price ranges for each service we offer. Tap any card for the full rate sheet, warranty
        options, and what moves a project to the low or high end.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SERVICES.map((s) => (
          <Link
            key={s.href}
            href={s.href}
            className="group flex flex-col bg-white border border-gray-200 rounded-xl p-6 hover:border-[#3A6A96] hover:shadow-md transition-all"
          >
            <h3 className="text-lg font-bold text-[#1a2e44]">{s.name}</h3>
            <p className="mt-2 text-2xl font-bold text-[#3A6A96]">{s.range}</p>
            <p className="text-sm text-gray-500 mb-4">{s.rangeLabel}</p>
            <ul className="space-y-1.5 text-sm text-gray-700 mb-5">
              {s.details.map((d) => (
                <li key={d} className="flex gap-2">
                  <span className="text-[#3A6A96]" aria-hidden>•</span>
                  {d}
                </li>
              ))}
            </ul>
            <span className="mt-auto text-[#3A6A96] font-medium group-hover:underline">
              See {s.name.toLowerCase()} prices <span aria-hidden>&rarr;</span>
            </span>
          </Link>
        ))}
        <Link
          href="/pricing"
          className="flex flex-col justify-center bg-[#1a2e44] text-white rounded-xl p-6 hover:bg-[#3A6A96] transition-colors"
        >
          <h3 className="text-lg font-bold mb-2">Compare all pricing</h3>
          <p className="text-white/80 text-sm mb-5">
            Interior vs. exterior vs. cabinets side by side, plus what you&apos;re actually paying for.
          </p>
          <span className="font-semibold">
            View pricing overview <span aria-hidden>&rarr;</span>
          </span>
        </Link>
      </div>
      <p className="text-gray-600 text-sm mt-6 text-center leading-relaxed">
        Every project gets its own written quote after a free on-site walkthrough. These ranges are a
        starting reference, not a substitute for a real estimate.
      </p>
    </div>
  );
}
