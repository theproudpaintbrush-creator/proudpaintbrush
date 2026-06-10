import Link from "next/link";
import type { ServiceContent, ServiceParent } from "@/lib/services";
import { imageDims } from "@/lib/imageDims";
import ReviewCards from "@/components/ReviewCards";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import type { Review } from "@/lib/reviews";
import EstimatePrompt from "@/components/EstimatePrompt";
import { BOOKING_URL } from "@/lib/site";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

const PARENT_LABEL: Record<ServiceParent, string> = {
  interior: "Interior Painting",
  exterior: "Exterior Painting",
  cabinet: "Cabinet Painting",
};
const PARENT_PATH: Record<ServiceParent, string> = {
  interior: "/interior-painting",
  exterior: "/exterior-painting",
  cabinet: "/cabinet-painting",
};

export default function ServiceDetail({
  service,
  related,
  reviews,
  areaLinks,
  crossLinks,
}: {
  service: ServiceContent;
  related: { slug: string; name: string }[];
  reviews?: Review[];
  // Optional contextual links to the per-city service-area landing pages.
  // Passed on sub-service pages to feed the otherwise link-starved
  // /service-areas/<city> pages with keyword-rich anchors.
  areaLinks?: { href: string; label: string }[];
  // Optional same-city sibling-service links (e.g. on a cabinet city page,
  // link to interior/exterior/fence painting in that same city) so every city
  // page connects to its siblings instead of sitting in a single-service silo.
  crossLinks?: { heading: string; links: { href: string; label: string }[] };
}) {
  const parentLabel = PARENT_LABEL[service.parent];
  const parentPath = PARENT_PATH[service.parent];

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <Link href={parentPath} className="hover:text-white">{parentLabel}</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{service.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 leading-tight">
            {service.h1}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#4B83B2] hover:bg-[#3a6a96] text-white font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Book My Free Estimate &rarr;
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white/70 text-white hover:bg-white hover:text-[#1a2e44] font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>

      {/* FEATURE: before/after slider when provided, else the feature image */}
      {service.beforeAfter ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <BeforeAfterSlider before={service.beforeAfter.before} after={service.beforeAfter.after} />
        </div>
      ) : (
        service.ogImage && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={service.ogImage}
              alt={`${service.name} project in Sugar Land, TX by The Proud Paintbrush`}
              {...(() => { const d = imageDims(service.ogImage); return d ? { width: d.w, height: d.h } : {}; })()}
              className="w-full h-auto rounded-xl shadow-md object-cover max-h-[460px]"
            />
          </div>
        )
      )}

      {/* BODY */}
      <article className="py-14 pt-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-gray-700
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a2e44] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1a2e44] [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:mb-1
              [&_strong]:text-[#1a2e44] [&_strong]:font-semibold
              [&_a]:text-[#4B83B2] [&_a]:font-medium [&_a:hover]:underline
              [&_img]:w-full [&_img]:rounded-xl [&_img]:shadow-md [&_img]:my-8 [&_img]:object-cover [&_img]:max-h-[460px]"
            dangerouslySetInnerHTML={{ __html: service.bodyHtml }}
          />
        </div>
      </article>

      {/* FAQs */}
      {service.faqs.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-10">
              {service.name} — Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              {service.faqs.map((faq) => (
                <div key={faq.q} className="bg-white border border-gray-200 p-6">
                  <h3 className="font-bold text-[#1a2e44] mb-2 text-lg">{faq.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED SERVICES */}
      {related.length > 0 && (
        <section className="bg-white py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#1a2e44] mb-8 text-center">
              More {parentLabel} Services
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`${parentPath}/${r.slug}`}
                  className="border border-gray-200 hover:border-[#4B83B2] hover:text-[#4B83B2] text-[#1a2e44] text-sm font-medium px-4 py-2 transition-colors"
                >
                  {r.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SAME-CITY SIBLING SERVICES — connects this city page to its siblings */}
      {crossLinks && crossLinks.links.length > 0 && (
        <section className="bg-white py-14 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-[#1a2e44] mb-8">
              {crossLinks.heading}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {crossLinks.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="border border-gray-200 hover:border-[#4B83B2] hover:text-[#4B83B2] text-[#1a2e44] text-sm font-medium px-4 py-2 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE AREAS — contextual links to per-city landing pages */}
      {areaLinks && areaLinks.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-[#1a2e44] mb-3">
              {parentLabel} Across Fort Bend &amp; Houston
            </h2>
            <p className="text-gray-600 mb-8">
              Explore our painting services in the communities we serve:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {areaLinks.map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
                  className="bg-white border border-gray-200 hover:border-[#4B83B2] hover:text-[#4B83B2] text-[#1a2e44] text-sm font-medium px-4 py-2 transition-colors"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GOOGLE REVIEWS (opt-in) */}
      {reviews && reviews.length > 0 && (
        <section className="bg-white py-14">
          <ReviewCards
            reviews={reviews}
            heading="What Our Cabinet & Interior Customers Say"
            intro="Verified five-star Google reviews from real Proud Paintbrush customers."
            columns={3}
            masonry
          />
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#4B83B2] text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/90 mb-8">
            Get a free estimate from Sugar Land&apos;s top-rated painting contractor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-[#4B83B2] hover:bg-[#1a2e44] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Request a Free Estimate
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
      <EstimatePrompt />
    </>
  );
}
