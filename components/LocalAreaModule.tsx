import Link from "next/link";

// Additive-only module for the 9 national-paint-brand posts that drive most
// of the site's blog traffic but almost none of its conversions (readers are
// largely outside Texas). Goal is internal link equity to real service pages,
// not converting these particular readers — so it stays brief and honest.
//
// Deliberately excludes /service-areas/fulshear: that page is a controlled
// Sprint 2 pilot, and adding inbound links from the 9 highest-traffic posts
// on the site would confound its measurement.
const CITY_LINKS = [
  { label: "Katy", href: "/service-areas/katy" },
  { label: "Richmond", href: "/service-areas/richmond" },
  { label: "Missouri City", href: "/service-areas/missouri-city" },
  { label: "Sugar Land", href: "/service-areas/sugar-land" },
];

const SERVICE_LINKS = [
  { label: "Interior Painting", href: "/interior-painting" },
  { label: "Exterior Painting", href: "/exterior-painting" },
  { label: "Cabinet Painting", href: "/cabinet-painting" },
];

export default function LocalAreaModule() {
  return (
    <section className="py-2">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            We&apos;re residential painters based in Fort Bend County, Texas — serving{" "}
            {CITY_LINKS.map((c, i) => (
              <span key={c.href}>
                <Link href={c.href} className="text-[#3A6A96] font-medium hover:underline">
                  {c.label}
                </Link>
                {i < CITY_LINKS.length - 1 ? ", " : ""}
              </span>
            ))}
            {" "}and the surrounding area. If you&apos;re local and have a project in mind, here&apos;s what we do:
          </p>
          <div className="flex flex-wrap gap-3">
            {SERVICE_LINKS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="text-sm border border-gray-300 rounded-full px-4 py-1.5 text-[#1a2e44] hover:border-[#3A6A96] hover:text-[#3A6A96] transition-colors"
              >
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
