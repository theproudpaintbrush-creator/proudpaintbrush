import type { Metadata } from "next";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { BOOKING_EMBED_URL, REVIEW_URL, BOOKING_URL, WEB3FORMS_ACCESS_KEY } from "@/lib/site";
import LeadForm from "@/components/LeadForm";

const BASE_URL = "https://www.theproudpaintbrush.com";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";
const EMAIL = "info@theproudpaintbrush.com";

export const metadata: Metadata = {
  title: "Contact The Proud Paintbrush | Sugar Land, TX Painters",
  description:
    "Contact The Proud Paintbrush for a free painting estimate in Sugar Land & Fort Bend County. Call (832) 605-0493, email us, or book a walkthrough online.",
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    title: "Contact The Proud Paintbrush | Sugar Land, TX Painters",
    description: "Free painting estimates across Sugar Land & Fort Bend County. Call, email, or book online.",
    url: `${BASE_URL}/contact`,
    type: "website",
    images: [{ url: `${BASE_URL}/images/hero-stucco-richmond.webp` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact The Proud Paintbrush | Sugar Land, TX Painters",
    description: "Free painting estimates across Sugar Land & Fort Bend County. Call, email, or book online.",
    images: [`${BASE_URL}/images/hero-stucco-richmond.webp`],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BASE_URL}/#business`,
  name: "The Proud Paintbrush",
  url: BASE_URL,
  telephone: PHONE_TEL,
  email: EMAIL,
  priceRange: "$$",
  address: { "@type": "PostalAddress", addressLocality: "Sugar Land", addressRegion: "TX", postalCode: "77498", addressCountry: "US" },
  areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE_TEL,
    email: EMAIL,
    contactType: "customer service",
    areaServed: "US-TX",
    availableLanguage: "English",
  },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: 113 },
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* HERO */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Contact The Proud Paintbrush</h1>
          <p className="text-white/85 text-lg max-w-2xl mx-auto">
            Ready for a free estimate, or have a question about your project? We&apos;d love to hear from you — we
            serve Sugar Land and all of Fort Bend County.
          </p>
        </div>
      </section>

      {/* CONTACT METHODS */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "Call or Text", value: PHONE, href: `tel:${PHONE_TEL}`, note: "The fastest way to reach us." },
            { label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, note: "We reply within one business day." },
            { label: "Book Online", value: "Schedule a walkthrough", href: "#book", note: "Pick a time that works for you." },
          ].map((m) => (
            <a
              key={m.label}
              href={m.href}
              className="block border border-gray-200 hover:border-[#4B83B2] p-6 transition-colors text-center"
            >
              <div className="text-sm font-semibold uppercase tracking-widest text-[#4B83B2] mb-2">{m.label}</div>
              <div className="text-base sm:text-lg font-bold text-[#1a2e44] mb-1 break-words">{m.value}</div>
              <div className="text-sm text-gray-500">{m.note}</div>
            </a>
          ))}
        </div>
      </section>

      {/* BOOKING + LEAD FORM */}
      <section id="book" className="bg-gray-50 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-3">Request Your Free Estimate</h2>
          <p className="text-gray-600">
            {WEB3FORMS_ACCESS_KEY
              ? "Two easy ways: leave your details and we'll call you, or book a time right now. Fully insured and locally owned since 2020 — every estimate is honest, detailed, and no-pressure."
              : "Pick a time below — fully insured and locally owned since 2020. Every estimate is honest, detailed, and no-pressure."}
          </p>
        </div>
        {WEB3FORMS_ACCESS_KEY ? (
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-lg font-bold text-[#1a2e44] mb-3">Tell us about your project</h3>
              <LeadForm />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1a2e44] mb-3">Or book a walkthrough now</h3>
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                <iframe
                  title="Book a free painting estimate with The Proud Paintbrush"
                  src={BOOKING_EMBED_URL}
                  className="w-full"
                  style={{ minHeight: "780px", border: 0 }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <iframe
              title="Book a free painting estimate with The Proud Paintbrush"
              src={BOOKING_EMBED_URL}
              className="w-full"
              style={{ minHeight: "780px", border: 0 }}
              loading="lazy"
            />
          </div>
        )}
        <p className="text-center text-sm text-gray-500 mt-4">
          Prefer a new tab?{" "}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="text-[#4B83B2] font-medium hover:underline">
            Open the scheduler &rarr;
          </a>
        </p>
      </section>

      {/* GOOGLE REVIEW CTA */}
      <section className="bg-[#4B83B2] text-white py-12 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-3">Already worked with us?</h2>
          <p className="text-white/90 mb-6">
            A quick Google review helps other Fort Bend homeowners find us — and it means the world to our team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="https://g.page/r/CaafH5ZU7h7cEBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#4B83B2] hover:bg-[#1a2e44] hover:text-white font-semibold px-6 py-3 transition-colors"
            >
              Leave a Google review
            </a>
            <a
              href={REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-6 py-3 transition-colors"
            >
              Read our reviews
            </a>
          </div>
        </div>
      </section>

      {/* SERVICE AREAS */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-[#1a2e44] mb-3">Areas We Serve</h2>
          <p className="text-gray-600 mb-8">Proudly painting homes across Fort Bend County and West Houston:</p>
          <div className="flex flex-wrap justify-center gap-3">
            {CITIES.map((c) => (
              <Link
                key={c.slug}
                href={`/service-areas/${c.slug}`}
                className="border border-gray-200 hover:border-[#4B83B2] hover:text-[#4B83B2] text-[#1a2e44] text-sm font-medium px-4 py-2 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </div>
          <p className="text-gray-500 text-sm mt-8">Based in Sugar Land, TX 77498 · {PHONE}</p>
        </div>
      </section>
    </>
  );
}
