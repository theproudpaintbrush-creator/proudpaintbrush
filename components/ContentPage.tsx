import Link from "next/link";
import type { PageContent } from "@/lib/pages";
import { getReviewsForPage } from "@/lib/reviews";
import ReviewCards from "@/components/ReviewCards";
import PricingBand from "@/components/PricingBand";
import FenceEstimator from "@/components/FenceEstimator";
import BookingButton from "@/components/BookingButton";
import CostTable from "@/components/CostTable";
import MechanismSection from "@/components/MechanismSection";
import FaqSection from "@/components/FaqSection";
import { BOOKING_URL, REVIEW_COUNT } from "@/lib/site";
const PHONE = "(832) 605-0493";
const PHONE_TEL = "+18326050493";

function titleCase(seg: string) {
  return seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function ContentPage({ page }: { page: PageContent }) {
  const segs = page.key.split("/");
  const crumbs = segs.map((s, i) => ({ label: titleCase(s), href: "/" + segs.slice(0, i + 1).join("/") }));
  const reviewList = getReviewsForPage(page.reviews);

  return (
    <>
      {/* HERO */}
      <section className="bg-[#1a2e44] text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs sm:text-sm text-white/60 tracking-wide">
            <Link href="/" className="hover:text-white">Home</Link>
            {crumbs.map((c, i) => (
              <span key={c.href}>
                <span className="mx-2">/</span>
                {i < crumbs.length - 1 ? (
                  <Link href={c.href} className="hover:text-white">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">{page.h1}</h1>
          {page.heroCta && (
            <div className="flex flex-col sm:flex-row gap-4 mt-7">
              <BookingButton
                label={<>Book My Free Estimate &rarr;</>}
                className="inline-block bg-[#3A6A96] hover:bg-[#2D5479] text-white font-semibold px-7 py-3 rounded-lg transition-colors"
              />
              <a
                href={`tel:${PHONE_TEL}`}
                className="inline-block border-2 border-white/70 text-white hover:bg-white hover:text-[#1a2e44] font-semibold px-7 py-3 rounded-lg transition-colors"
              >
                Call {PHONE}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* TRUST ROW (opt-in) */}
      {page.trustRow && (
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="text-yellow-400 tracking-tight" aria-hidden>★★★★★</span>
              <strong className="text-[#1a2e44]">5.0</strong>
            </span>
            <span className="hidden sm:inline text-gray-300" aria-hidden>·</span>
            <span>{REVIEW_COUNT} Google reviews</span>
            <span className="hidden sm:inline text-gray-300" aria-hidden>·</span>
            <span>Fully Insured</span>
            <span className="hidden sm:inline text-gray-300" aria-hidden>·</span>
            <span>Locally Owned Since 2020</span>
          </div>
        </div>
      )}

      {/* INTERACTIVE CALCULATOR (opt-in) — sits right under the hero */}
      {page.calculator === "fence" && <FenceEstimator />}

      {/* BODY */}
      <article className="py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg max-w-none text-gray-700
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1a2e44] [&_h2]:mt-8 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1a2e44] [&_h3]:mt-6 [&_h3]:mb-3
              [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:mb-1
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol_li]:mb-1
              [&_strong]:text-[#1a2e44] [&_strong]:font-semibold
              [&_a]:text-[#3A6A96] [&_a]:font-medium [&_a:hover]:underline
              [&_img]:rounded-xl [&_img]:my-6 [&_img]:w-full [&_img]:h-auto [&_img]:shadow-sm
              [&_table]:w-full [&_table]:my-6 [&_table]:text-sm [&_th]:bg-gray-100 [&_th]:p-2 [&_th]:text-left [&_td]:border [&_td]:border-gray-200 [&_td]:p-2 [&_th]:border [&_th]:border-gray-200"
            dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
          />
        </div>
      </article>

      {/* SERVICE SECTIONS — per-service scope breakdown (opt-in, city hub pages) */}
      {page.serviceSections && page.serviceSections.items.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.serviceSections.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-2">
                {page.serviceSections.heading}
              </h2>
            )}
            {page.serviceSections.intro && (
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">{page.serviceSections.intro}</p>
            )}
            <div className="grid sm:grid-cols-2 gap-6">
              {page.serviceSections.items.map((item) => (
                <div key={item.heading} className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-[#1a2e44] mb-3">{item.heading}</h3>
                  <p className="text-gray-700 leading-relaxed mb-3">{item.body}</p>
                  {item.href && item.linkLabel && (
                    <Link href={item.href} className="text-[#3A6A96] font-medium hover:underline">
                      {item.linkLabel} &rarr;
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* MECHANISM SECTION — why this is hard here (climate, etc.) (opt-in) */}
      {page.mechanismSection && (
        <section className="bg-white py-16">
          <MechanismSection heading={page.mechanismSection.heading} body={page.mechanismSection.body} />
        </section>
      )}

      {/* COST TABLE — scannable, AI-Overview-friendly (opt-in) */}
      {page.costTable && page.costTable.rows.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <CostTable
            heading={page.costTable.heading}
            intro={page.costTable.intro}
            rows={page.costTable.rows}
            note={page.costTable.note}
          />
        </section>
      )}

      {/* NEIGHBORHOOD GRID — named local areas (opt-in) */}
      {page.neighborhoodGrid && page.neighborhoodGrid.neighborhoods.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {page.neighborhoodGrid.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] mb-3">{page.neighborhoodGrid.heading}</h2>
            )}
            {page.neighborhoodGrid.intro && (
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">{page.neighborhoodGrid.intro}</p>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto">
              {page.neighborhoodGrid.neighborhoods.map((n) => (
                <div
                  key={n}
                  className="bg-gray-50 border border-gray-200 px-4 py-3 text-[#1a2e44] text-sm font-medium"
                >
                  {n}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BEFORE / AFTER PLACEHOLDER — clearly marked, no slider yet (opt-in) */}
      {page.beforeAfterPlaceholder && (
        <section className="bg-gray-50 py-16 border-t border-b border-dashed border-gray-300">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Coming Soon</p>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1a2e44] mb-3">
              {page.beforeAfterPlaceholder.heading ?? "Before & After"}
            </h2>
            <p className="text-gray-600 leading-relaxed">{page.beforeAfterPlaceholder.note}</p>
          </div>
        </section>
      )}

      {/* VISIBLE FAQ SECTION (opt-in) — reuses the same `faqs` array the route
          already emits as FAQPage schema, rendered visibly instead of only
          inline within bodyHtml. */}
      {page.showFaqs && page.faqs.length > 0 && (
        <section className="bg-white py-16">
          <FaqSection faqs={page.faqs} />
        </section>
      )}

      {/* CITY CARDS — photo directory of service-area cities (opt-in, hub page) */}
      {page.cityCards && page.cityCards.cards.length > 0 && (
        <section className="bg-white pb-4 pt-2">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.cityCards.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-2">{page.cityCards.heading}</h2>
            )}
            {page.cityCards.intro && (
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">{page.cityCards.intro}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {page.cityCards.cards.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group block overflow-hidden rounded-xl border border-gray-200 bg-white hover:border-[#3A6A96] hover:shadow-md transition-all"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image.src}
                      alt={c.image.alt}
                      width={c.image.width}
                      height={c.image.height}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-base font-bold text-[#1a2e44]">
                      {c.label} <span aria-hidden>&rarr;</span>
                    </span>
                    {c.description && <p className="mt-1 text-sm leading-snug text-gray-600">{c.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RELATED LINKS — funnel down to rich service x city pages (opt-in) */}
      {page.relatedLinks && page.relatedLinks.links.length > 0 && (
        <section className="bg-gray-50 py-14 border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {page.relatedLinks.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1a2e44] text-center mb-2">
                {page.relatedLinks.heading}
              </h2>
            )}
            {page.relatedLinks.intro && (
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-9">{page.relatedLinks.intro}</p>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {page.relatedLinks.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block bg-white border border-gray-200 rounded-xl p-6 hover:border-[#3A6A96] hover:shadow-md transition-all"
                >
                  <span className="text-lg font-bold text-[#1a2e44]">
                    {l.label} <span aria-hidden>&rarr;</span>
                  </span>
                  {l.description && <p className="mt-2 text-sm leading-relaxed text-gray-600">{l.description}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS (opt-in) */}
      {reviewList.length > 0 && (
        <section className="bg-white py-14">
          <ReviewCards
            reviews={reviewList}
            heading={page.reviews?.heading}
            intro={page.reviews?.intro}
            columns={3}
            masonry
          />
        </section>
      )}

      {/* PRICING BAND (opt-in) */}
      {page.priceTeaser && (
        <PricingBand
          heading={page.priceTeaser.heading}
          range={page.priceTeaser.range}
          note={page.priceTeaser.note}
          href={page.priceTeaser.href}
          linkLabel={page.priceTeaser.linkLabel}
        />
      )}

      {/* GALLERY (portfolio) */}
      {page.gallery && page.gallery.length > 0 && (
        <section className="bg-white pb-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {page.gallery.map((img, i) => (
                <figure key={`${img.src}-${i}`} className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Q&A already appears inline in the body above; FAQPage schema is
          emitted from page.faqs in the route (no duplicate visible section). */}

      {/* CTA — custom (e.g. careers "Apply") replaces the default estimate CTA */}
      {page.cta ? (
        <section className="bg-[#1a2e44] text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">{page.cta.heading ?? "Ready to Get Started?"}</h2>
            {page.cta.note && <p className="text-white/85 text-lg mb-9 max-w-2xl mx-auto">{page.cta.note}</p>}
            <a
              href={page.cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#3A6A96] hover:bg-white hover:text-[#1a2e44] text-white font-bold text-xl sm:text-2xl px-14 py-6 rounded-xl shadow-xl ring-2 ring-white/30 transition-colors"
            >
              {page.cta.label} <span aria-hidden>&rarr;</span>
            </a>
          </div>
        </section>
      ) : (
        <section className="bg-[#3A6A96] text-white py-14 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-white/90 mb-8">Get a free, no-pressure estimate from Sugar Land&apos;s top-rated, locally owned painting company.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-[#3A6A96] hover:bg-[#1a2e44] hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors">Request a Free Estimate</a>
              <a href={`tel:${PHONE_TEL}`} className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-8 py-3 rounded-lg transition-colors">Call {PHONE}</a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
