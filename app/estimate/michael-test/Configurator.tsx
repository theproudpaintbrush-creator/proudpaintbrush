"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EMAIL } from "@/lib/site";

type Zone = { id: string; name: string; detail: string; price: number };
type AddOn = { id: string; name: string; detail: string; price: number };
type Finish = {
  id: string;
  name: string;
  multiplier: number;
  swatch: string;
  warranty: string;
  perks: string[];
  badge?: string;
};
type Preset = { id: string; label: string; zoneIds: string[] };

const ZONES: Zone[] = [
  {
    id: "downstairs",
    name: "Downstairs Living",
    detail: "Entry, living, dining, kitchen, breakfast, primary suite, laundry, bath",
    price: 13489,
  },
  {
    id: "upstairs",
    name: "Upstairs",
    detail: "4 bedrooms, Jack & Jill bath, hallway, stairway",
    price: 8468,
  },
  {
    id: "closets",
    name: "Closets",
    detail: "8 closets — walls, ceilings & shelving",
    price: 2879,
  },
];

const ADD_ONS: AddOn[] = [
  {
    id: "cabinets",
    name: "Cabinet Refinishing",
    detail: "43 cabinets, sprayed SW Gallery finish",
    price: 6235,
  },
  {
    id: "popcorn",
    name: "Popcorn Ceiling Removal",
    detail: "590 sq ft — scrape, skim-coat & finish",
    price: 1769,
  },
  {
    id: "wallpaper",
    name: "Wallpaper Removal",
    detail: "680 sq ft — strip, prep & smooth",
    price: 2040,
  },
  {
    id: "drywall",
    name: "Drywall Repairs",
    detail: "15 repairs + 55 sq ft, Level 4 finish",
    price: 2802,
  },
];

const FINISHES: Finish[] = [
  {
    id: "superpaint",
    name: "SuperPaint",
    multiplier: 0.91,
    swatch: "#8A8578",
    warranty: "2-year warranty",
    perks: [
      "SW SuperPaint · ProClassic trim",
      "2 full coats, full prep",
      "2-year workmanship warranty",
    ],
  },
  {
    id: "duration",
    name: "Duration",
    multiplier: 1.0,
    swatch: "#2F5D8A",
    warranty: "5-year warranty",
    badge: "MOST POPULAR",
    perks: [
      "Complimentary upgrade to SW Duration",
      "5-year warranty + 1 touch-up visit",
      "Color consultation · CC fees waived",
    ],
  },
  {
    id: "emerald",
    name: "Emerald",
    multiplier: 1.13,
    swatch: "#0F6B4F",
    warranty: "5-yr + annual touch-ups",
    perks: [
      "SW Emerald · Emerald Urethane trim",
      "Annual touch-up visits",
      "Post-paint professional cleaning",
    ],
  },
];

const PRESETS: Preset[] = [
  { id: "refresh", label: "Refresh", zoneIds: ["downstairs"] },
  { id: "signature", label: "Signature", zoneIds: ["downstairs", "upstairs"] },
  { id: "showcase", label: "Showcase", zoneIds: ["downstairs", "upstairs", "closets"] },
];

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function sameZoneSet(a: string[], b: Set<string>) {
  return a.length === b.size && a.every((id) => b.has(id));
}

export default function Configurator() {
  const [selectedZones, setSelectedZones] = useState<Set<string>>(
    () => new Set(ZONES.map((z) => z.id))
  );
  const [selectedAddOns, setSelectedAddOns] = useState<Set<string>>(() => new Set());
  const [finishId, setFinishId] = useState<string>("duration");
  const [pulse, setPulse] = useState(false);
  const [device] = useState<"desktop" | "ios" | "android">(() => {
    if (typeof navigator === "undefined") return "desktop";
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return "ios";
    if (/Android/i.test(navigator.userAgent)) return "android";
    return "desktop";
  });

  const toggleZone = (id: string) => {
    setSelectedZones((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyPreset = (preset: Preset) => setSelectedZones(new Set(preset.zoneIds));

  const finish = FINISHES.find((f) => f.id === finishId) ?? FINISHES[1];

  const subtotal = useMemo(() => {
    const zonesTotal = ZONES.filter((z) => selectedZones.has(z.id)).reduce((s, z) => s + z.price, 0);
    const addOnsTotal = ADD_ONS.filter((a) => selectedAddOns.has(a.id)).reduce((s, a) => s + a.price, 0);
    return zonesTotal + addOnsTotal;
  }, [selectedZones, selectedAddOns]);

  const total = Math.round(subtotal * finish.multiplier);
  const monthly = Math.ceil(total / 25);

  const activePreset = useMemo(
    () => PRESETS.find((p) => sameZoneSet(p.zoneIds, selectedZones)) ?? null,
    [selectedZones]
  );

  const prevTotal = useRef(total);
  useEffect(() => {
    if (prevTotal.current !== total) {
      setPulse(true);
      prevTotal.current = total;
      const t = setTimeout(() => setPulse(false), 260);
      return () => clearTimeout(t);
    }
  }, [total]);

  const contactHref = useMemo(() => {
    const scopeLabel = activePreset ? activePreset.label : "a custom scope";
    const message = `Hi Chris — it's Michael. I'd like to move forward with ${scopeLabel} / ${finish.name} / ${currency(total)}.`;
    const encoded = encodeURIComponent(message);
    if (device === "ios") return `sms:8326050493&body=${encoded}`;
    if (device === "android") return `sms:8326050493?body=${encoded}`;
    return `mailto:${EMAIL}?subject=${encodeURIComponent("Ready to move forward")}&body=${encoded}`;
  }, [device, activePreset, finish, total]);

  return (
    <>
      <section className="bg-[#f8f9fa] py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* SCOPE PRESETS */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96]">Scope</span>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Scope presets">
                {PRESETS.map((preset) => {
                  const active = activePreset?.id === preset.id;
                  return (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      aria-pressed={active}
                      className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors border ${
                        active
                          ? "bg-[#3A6A96] border-[#3A6A96] text-white"
                          : "bg-white border-gray-300 text-[#1a2e44] hover:border-[#3A6A96]"
                      }`}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ZONES */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-1">Areas of the Home</h2>
            <p className="text-gray-600 mb-5">Toggle the areas included in this project.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {ZONES.map((zone) => (
                <ToggleCard
                  key={zone.id}
                  title={zone.name}
                  detail={zone.detail}
                  price={zone.price}
                  selected={selectedZones.has(zone.id)}
                  onToggle={() => toggleZone(zone.id)}
                />
              ))}
            </div>
          </div>

          {/* ADD-ONS */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-1">Add-on projects</h2>
            <p className="text-gray-600 mb-5">Add-on projects · à la carte</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ADD_ONS.map((addOn) => (
                <ToggleCard
                  key={addOn.id}
                  title={addOn.name}
                  detail={addOn.detail}
                  price={addOn.price}
                  selected={selectedAddOns.has(addOn.id)}
                  onToggle={() => toggleAddOn(addOn.id)}
                />
              ))}
            </div>
          </div>

          {/* FINISH LEVEL */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-1">Finish Level</h2>
            <p className="text-gray-600 mb-5">Choose one — applies to everything selected above.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="radiogroup" aria-label="Finish level">
              {FINISHES.map((f) => {
                const selected = f.id === finishId;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setFinishId(f.id)}
                    className={`relative text-left rounded-lg border p-5 bg-white transition-colors ${
                      selected
                        ? "border-[#3A6A96] ring-1 ring-[#3A6A96] bg-[#3A6A96]/5"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {f.badge && (
                      <span className="absolute -top-3 right-4 bg-[#3A6A96] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                        {f.badge}
                      </span>
                    )}
                    <span
                      className="block h-3 rounded-full mb-4"
                      style={{ backgroundColor: f.swatch }}
                      aria-hidden
                    />
                    <span className="flex items-center gap-2 mb-1">
                      <span
                        className="inline-block w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: f.swatch }}
                        aria-hidden
                      />
                      <span className="font-bold text-[#1a2e44] text-lg">{f.name}</span>
                    </span>
                    <span className="block text-sm font-semibold text-[#3A6A96] mb-3">{f.warranty}</span>
                    <ul className="space-y-1.5">
                      {f.perks.map((perk) => (
                        <li key={perk} className="text-sm text-gray-600 flex gap-2">
                          <span className="text-[#3A6A96]" aria-hidden>
                            ✓
                          </span>
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TOTAL BAR */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div className="flex items-center gap-2 min-w-0">
              <span
                className="inline-block w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: finish.swatch }}
                aria-hidden
              />
              <span className="text-sm text-gray-500 truncate">
                <span className="font-semibold text-[#1a2e44]">{finish.name}</span> finish
              </span>
            </div>
            <div className="text-right sm:hidden">
              <div
                className={`text-2xl font-bold text-[#1a2e44] tabular-nums transition-transform duration-200 ${
                  pulse ? "scale-105" : "scale-100"
                }`}
              >
                {currency(total)}
              </div>
              <div className="text-base font-bold text-[#3A6A96]">
                {currency(monthly)}/mo <span className="text-xs font-normal text-gray-500">— 0% for 25 months*</span>
              </div>
            </div>
          </div>

          <div className="hidden sm:block text-right">
            <div
              className={`text-2xl sm:text-3xl font-bold text-[#1a2e44] tabular-nums transition-transform duration-200 ${
                pulse ? "scale-105" : "scale-100"
              }`}
            >
              {currency(total)}
            </div>
            <div className="text-base sm:text-lg font-bold text-[#3A6A96]">
              {currency(monthly)}/mo <span className="text-xs sm:text-sm font-normal text-gray-500">— 0% for 25 months*</span>
            </div>
          </div>

          <a
            href={contactHref}
            className="block sm:inline-block text-center bg-[#3A6A96] hover:bg-[#2D5479] text-white font-semibold px-5 py-3 rounded-lg transition-colors whitespace-nowrap"
          >
            Reserve my start date
          </a>
        </div>
      </div>
    </>
  );
}

function ToggleCard({
  title,
  detail,
  price,
  selected,
  onToggle,
}: {
  title: string;
  detail: string;
  price: number;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`text-left rounded-lg border p-5 bg-white transition-colors ${
        selected
          ? "border-[#3A6A96] ring-1 ring-[#3A6A96] bg-[#3A6A96]/5"
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="font-bold text-[#1a2e44]">{title}</span>
        <span
          className={`shrink-0 mt-0.5 w-5 h-5 rounded border flex items-center justify-center ${
            selected ? "bg-[#3A6A96] border-[#3A6A96] text-white" : "border-gray-300"
          }`}
          aria-hidden
        >
          {selected && (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{detail}</p>
      <p className="font-bold text-[#1a2e44] tabular-nums">{currency(price)}</p>
    </button>
  );
}
