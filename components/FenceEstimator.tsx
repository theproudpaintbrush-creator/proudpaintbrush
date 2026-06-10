"use client";

import { useState } from "react";
import { BOOKING_URL } from "@/lib/site";

// Instant fence-staining ballpark. Mirrors the pricing model used on-site:
//   gallons = ceil(length * height / 280)
//   materials = gallons * $70
//   labor = $390 base + $0.70 * length
//   total = materials + labor   (no tax applied)
const COVERAGE_SQFT_PER_GAL = 280;
const PRICE_PER_GAL = 70;
const LABOR_BASE = 390;
const LABOR_PER_FT = 0.7;

function money(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export default function FenceEstimator() {
  const [length, setLength] = useState("");
  const [height, setHeight] = useState("");

  const l = parseFloat(length);
  const h = parseFloat(height);
  const valid = l > 0 && h > 0;

  let result: { gallons: number; materials: number; labor: number; total: number; perFoot: number } | null = null;
  if (valid) {
    const gallons = Math.ceil((l * h) / COVERAGE_SQFT_PER_GAL);
    const materials = gallons * PRICE_PER_GAL;
    const labor = LABOR_BASE + l * LABOR_PER_FT;
    const total = materials + labor;
    result = { gallons, materials, labor, total, perFoot: total / l };
  }

  return (
    <section className="bg-[#eef1f5] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg ring-1 ring-black/5 p-6 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-2">Instant Fence Staining Estimate</h2>
          <p className="text-gray-600 mb-6">
            Enter your fence size for a ballpark price. For an exact, no-pressure quote we&apos;ll measure on site.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label htmlFor="fence-length" className="block text-sm font-semibold text-[#1a2e44] mb-1">
                  How long is your fence? (linear feet)
                </label>
                <input
                  id="fence-length"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  placeholder="e.g. 150"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#4B83B2] focus:ring-1 focus:ring-[#4B83B2] outline-none"
                />
              </div>
              <div>
                <label htmlFor="fence-height" className="block text-sm font-semibold text-[#1a2e44] mb-1">
                  How tall is your fence? (feet)
                </label>
                <input
                  id="fence-height"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="e.g. 6"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-[#4B83B2] focus:ring-1 focus:ring-[#4B83B2] outline-none"
                />
              </div>
            </div>

            {/* Output */}
            <div className="rounded-xl bg-[#1a2e44] text-white p-5 flex flex-col justify-center">
              {result ? (
                <>
                  <dl className="space-y-2 text-sm">
                    <div className="flex justify-between"><dt className="text-white/70">Stain needed</dt><dd className="font-semibold">{result.gallons} gal</dd></div>
                    <div className="flex justify-between"><dt className="text-white/70">Materials</dt><dd className="font-semibold">{money(result.materials)}</dd></div>
                    <div className="flex justify-between"><dt className="text-white/70">Labor</dt><dd className="font-semibold">{money(result.labor)}</dd></div>
                  </dl>
                  <div className="border-t border-white/20 mt-3 pt-3 flex justify-between items-baseline">
                    <span className="text-white/80">Estimated total</span>
                    <span className="text-3xl font-extrabold text-[#7fb0d8]">{money(result.total)}</span>
                  </div>
                  <p className="text-white/60 text-xs mt-2">
                    ≈ {money(result.perFoot)}/linear ft · ballpark only, plus applicable tax
                  </p>
                </>
              ) : (
                <p className="text-white/70 text-center">Enter your fence length and height to see an estimate.</p>
              )}
            </div>
          </div>

          <div className="mt-6 text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4B83B2] text-white hover:bg-[#1a2e44] font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get My Exact Quote &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
