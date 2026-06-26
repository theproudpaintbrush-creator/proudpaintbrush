import Image from "next/image";
import Link from "next/link";
import type { HubContent, ServiceParent } from "@/lib/services";
import TrustBar from "@/components/TrustBar";
import ProjectGallery from "@/components/ProjectGallery";
import PricingBand from "@/components/PricingBand";
import ReviewCards from "@/components/ReviewCards";
import type { Review } from "@/lib/reviews";
import EstimatePrompt from "@/components/EstimatePrompt";
import { BOOKING_URL } from "@/lib/site";

// Pick a simple line-icon for a "why choose us" card based on its title.
function CardIcon({ title }: { title: string }) {
  const t = title.toLowerCase();
  let path: string;
  if (/warrant/.test(t)) {
    path = "M12 2l8 3v6c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V5l8-3z"; // shield
  } else if (/local|owner|hoa|area/.test(t)) {
    path = "M12 2a7 7 0 00-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6a2.5 2.5 0 010 5.5z"; // map pin
  } else if (/clean|respect/.test(t)) {
    path = "M12 2l1.8 4.6L18 8l-4.2 1.4L12 14l-1.8-4.6L6 8l4.2-1.4L12 2z"; // sparkle
  } else if (/bond|primer|degrease|sand/.test(t)) {
    path = "M4 7l8-4 8 4-8 4-8-4zm0 5l8 4 8-4m-16 5l8 4 8-4"; // layers
  } else {
    path = "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"; // check-badge (prep / default)
  }
  return (
    <svg className="w-7 h-7 text-[#3A6A96] mb-3" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}
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

export default function ServiceHub({
  hub,
  subServices,
  cities,
  relatedPosts = [],
  reviews = [],
}: {
  hub: HubContent;
  subServices: { slug: string; name: string }[];
  cities: { slug: string; name: string }[];
  relatedPosts?: { slug: string; title: string }[];
  reviews?: Review[];
}) {
  const parentPath = PARENT_PATH[hub.parent];
  const parentLabel = PARENT_LABEL[hub.parent];

  return (
    <>
      {/* HERO */}
      <section className="relative w-full h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image src={hub.heroImage} alt={hub.heroAlt} fill sizes="100vw" className="object-cover object-center" priority quality={90} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide uppercase">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-white">{parentLabel}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">{hub.h1}</h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8 max-w-2xl mx-auto">{hub.intro[0]}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#111111] hover:bg-transparent hover:text-white border-2 border-white font-semibold px-8 py-4 transition-colors">
              Schedule a Free Estimate &rarr;
            </a>
            <a href={`tel:${PHONE_TEL}`} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#111111] font-semibold px-8 py-4 transition-colors">
              Call {PHONE}
            </a>
          </div>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <span className="text-yellow-400" aria-hidden>★★★★★</span>
              <span className="font-semibold">5.0</span>
              <span className="text-white/70">· 113 Google reviews</span>
            </span>
            <span className="text-white/40" aria-hidden>•</span>
            <span>Fully Insured</span>
            <span className="text-white/40" aria-hidden>•</span>
            <span>Locally Owned Since 2020</span>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* INTRO (remaining paragraphs) */}
      {hub.intro.length > 1 && (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4">
            {hub.intro.slice(1).map((p, i) => (
              <p key={i} className="text-gray-700 leading-relaxed mb-5 text-lg">{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* EXTRA PROSE SECTIONS (e.g. cabinet spray-vs-brush, repaint-vs-replace) */}
      {hub.sections && hub.sections.length > 0 && (
        <section className="bg-white pb-4">
          <div className="max-w-4xl mx-auto px-4">
            {hub.sections.map((s) => (
              <div key={s.heading} className="mb-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-4">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-4 text-lg">{p}</p>
                ))}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROJECT GALLERY (real finished-work photos) */}
      {hub.gallery && hub.gallery.length > 0 && (
        <ProjectGallery
          heading={hub.galleryHeading ?? "Recent Projects"}
          intro={hub.galleryIntro}
          items={hub.gallery}
        />
      )}

      {/* SUB-SERVICE GRID (the hub → spoke links) */}
      {subServices.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-4">{hub.servicesHeading}</h2>
            <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-12">{hub.servicesIntro}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {subServices.map((s) => (
                <Link
                  key={s.slug}
                  href={`${parentPath}/${s.slug}`}
                  className="group bg-white border border-gray-200 hover:border-[#3A6A96] p-5 flex items-center justify-between transition-colors"
                >
                  <span className="text-[#111111] font-medium text-sm group-hover:text-[#3A6A96]">{s.name}</span>
                  <span className="text-[#3A6A96] ml-2">&rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY CHOOSE */}
      {hub.whyCards.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">{hub.whyHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {hub.whyCards.map((c) => (
                <div key={c.title} className="border border-gray-200 p-6 hover:border-[#3A6A96] transition-colors">
                  <CardIcon title={c.title} />
                  <h3 className="font-bold text-[#111111] mb-3 text-lg">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {hub.process.length > 0 && (
        <section className="bg-gray-50 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">{hub.processHeading}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {hub.process.map((step, i) => (
                <div key={step.title} className="flex gap-5">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#3A6A96] text-white rounded-full flex items-center justify-center font-bold">{i + 1}</div>
                  <div>
                    <h3 className="font-bold text-[#111111] mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INVESTMENT & GUARANTEE (price range + credentials) */}
      {hub.priceTeaser && (
        <PricingBand
          heading={hub.priceTeaser.heading}
          range={hub.priceTeaser.range}
          note={hub.priceTeaser.note}
          href={hub.priceTeaser.href}
          linkLabel={hub.priceTeaser.linkLabel}
        />
      )}

      {/* WRITTEN REVIEWS (social proof on the service page itself) */}
      {reviews.length > 0 && (
        <section className="bg-white py-20">
          <ReviewCards
            reviews={reviews}
            heading="What Your Neighbors Say"
            intro="Real reviews from Fort Bend County homeowners we've worked with."
            columns={2}
          />
          <div className="text-center mt-8">
            <Link href="/testimonials" className="text-[#3A6A96] font-semibold hover:underline">
              Read all 113 reviews &rarr;
            </Link>
          </div>
        </section>
      )}

      {/* RELATED LINKS (e.g. cabinet pillar) */}
      {hub.relatedLinks && hub.relatedLinks.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-[#111111] mb-8">Related Services &amp; Resources</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {hub.relatedLinks.map((l) => (
                <Link key={l.href} href={l.href} className="border border-gray-200 hover:border-[#3A6A96] hover:text-[#3A6A96] text-[#111111] text-sm font-medium px-4 py-2 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SERVICE AREAS (hub → city pages) */}
      {cities.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] mb-3">{parentLabel} Across Fort Bend &amp; West Houston</h2>
            <p className="text-gray-600 mb-8">We bring {parentLabel.toLowerCase()} to homes throughout the area:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {cities.map((c) => (
                <Link key={c.slug} href={`${parentPath}/${c.slug}`} className="bg-white border border-gray-200 hover:border-[#3A6A96] hover:text-[#3A6A96] text-[#111111] text-sm font-medium px-4 py-2 transition-colors">
                  {parentLabel} in {c.name}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {hub.faqs.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">{parentLabel} — Frequently Asked Questions</h2>
            <div className="space-y-5">
              {hub.faqs.map((f) => (
                <div key={f.q} className="bg-gray-50 border border-gray-200 p-6">
                  <h3 className="font-bold text-[#111111] mb-2 text-lg">{f.q}</h3>
                  <p className="text-gray-700 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FROM THE BLOG */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] text-center mb-8">From the Blog</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-gray-50 border border-gray-200 hover:border-[#3A6A96] p-5 transition-colors">
                  <span className="text-[#111111] font-medium text-sm hover:text-[#3A6A96] leading-snug">{p.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[#3A6A96] text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-10">Get a free, no-pressure estimate from Sugar Land&apos;s top-rated, locally owned painting company.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#3A6A96] hover:bg-[#111111] hover:text-white font-semibold px-10 py-4 text-lg transition-colors">
              Request a Free Estimate
            </a>
            <a href={`tel:${PHONE_TEL}`} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors">
              Call {PHONE}
            </a>
          </div>
        </div>
      </section>
      <EstimatePrompt />
    </>
  );
}
