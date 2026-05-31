import Link from "next/link";

const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

const links = [
  { href: "/interior-painting", label: "Interior Painting" },
  { href: "/exterior-painting", label: "Exterior Painting" },
  { href: "/cabinet-painting", label: "Cabinet Painting" },
  { href: "/pricing", label: "Pricing" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/blog", label: "Blog" },
];

export default function NotFound() {
  return (
    <section className="bg-[#1a2e44] text-white min-h-[70vh] flex items-center justify-center py-20 px-4">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-[#4B83B2] font-semibold tracking-widest uppercase text-sm mb-4">404 — Page Not Found</p>
        <h1 className="text-3xl sm:text-4xl font-bold mb-5">We couldn&apos;t find that page</h1>
        <p className="text-white/80 text-lg mb-10">
          The page may have moved during our recent site update. Try one of these, or give us a call —
          we&apos;re always happy to help.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border border-white/40 hover:bg-white hover:text-[#1a2e44] text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-block bg-white text-[#1a2e44] hover:bg-[#4B83B2] hover:text-white font-semibold px-8 py-3 transition-colors">
            Back to Home
          </Link>
          <a href={`tel:${PHONE_TEL}`} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#1a2e44] font-semibold px-8 py-3 transition-colors">
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}
