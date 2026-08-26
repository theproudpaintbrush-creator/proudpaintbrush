import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TrustBar from "@/components/TrustBar";
import ProudProcess from "@/components/ProudProcess";
import LiteYouTube from "@/components/LiteYouTube";
import ReviewCards from "@/components/ReviewCards";
import CostTable from "@/components/CostTable";
import MechanismSection from "@/components/MechanismSection";
import FaqSection from "@/components/FaqSection";
import { getReviews } from "@/lib/reviews";
import { BOOKING_EMBED_URL, PHONE_TEL, PHONE_DISPLAY } from "@/lib/site";
import BookingButton from "@/components/BookingButton";

// A balanced cross-section: general, exterior, interior, and cabinet reviews,
// pulled from the same real, verified set used sitewide.
const HOMEPAGE_REVIEW_AUTHORS = [
  "Joshua D. Randall",
  "Derrick McCain",
  "Catherine Harter",
  "Jeff Deurlein",
  "Travis Phillips",
  "Satrice Morris",
];

const HOMEPAGE_FAQS = [
  {
    q: "What painting services do you offer?",
    a: "Interior painting, exterior painting, cabinet painting, drywall repair, and fence staining — for whole-home repaints, single rooms, or a specific problem area. Every project starts with the same prep-first process regardless of size.",
  },
  {
    q: "How much does painting cost in Fort Bend County?",
    a: "Based on 97 real, closed jobs across Fort Bend County (excluding touch-ups under $800), the median project runs about $2,500, with most falling between $837 and $21,078 depending on size and scope. Every project gets its own written quote after a free on-site walkthrough — see the table above for a fuller breakdown by city.",
  },
  {
    q: "Do you offer a warranty?",
    a: "Yes. Every project is backed by our 2 & 5-Year Written Warranty — a Standard 2-year package on every job, with a Premium 5-year upgrade available for homeowners who want maximum long-term protection.",
  },
  {
    q: "Why does Gulf Coast weather matter for a paint job?",
    a: "Heat, humidity, UV exposure, and our shrink-swell clay soil all work against a coating that wasn't chosen and applied for this specific climate. That is why prep — washing, scraping, caulking, and priming the right way — matters more here than the paint brand itself.",
  },
  {
    q: "What areas do you serve?",
    a: "Sugar Land, Missouri City, Katy, Richmond, Rosenberg, Fulshear, West Houston, and Southwest Houston, plus the surrounding Fort Bend County communities.",
  },
  {
    q: "Are you insured, and how long have you been in business?",
    a: "Yes — Fully Insured with $1M in liability coverage. The Proud Paintbrush has been locally owned and operated in Sugar Land since 2020.",
  },
];

const homepageFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOMEPAGE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const metadata: Metadata = {
  title: "The Proud Paintbrush | Sugar Land Painting Contractor",
  description: "Top-rated residential & commercial painters in Sugar Land & Fort Bend County. Fully insured, 2 & 5-Year Written Warranty. Get your free estimate today.",
  alternates: { canonical: "https://www.theproudpaintbrush.com" },
  openGraph: {
    title: "The Proud Paintbrush | Sugar Land Painting Contractor",
    description: "Top-rated residential & commercial painters in Sugar Land & Fort Bend County. Fully insured, 2 & 5-Year Written Warranty. Get your free estimate today.",
    url: "https://www.theproudpaintbrush.com",
    type: "website",
    images: [{ url: "https://www.theproudpaintbrush.com/images/hero-stucco-richmond.webp" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Proud Paintbrush | Sugar Land Painting Contractor",
    description: "Top-rated residential & commercial painters in Sugar Land & Fort Bend County. Free estimate today.",
    images: ["https://www.theproudpaintbrush.com/images/hero-stucco-richmond.webp"],
  },
};
const HERO_IMAGE = "/images/hero-stucco-richmond.webp";

function WaveDown({ from, to }: { from: string; to: string }) {
  return (
    <div className={`${from} -mb-1`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
        <path d="M0,0 C360,80 1080,80 1440,0 L1440,80 L0,80 Z" fill={to} />
      </svg>
    </div>
  );
}

function WaveUp({ from, to }: { from: string; to: string }) {
  return (
    <div className={`${from} -mt-1`}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 block">
        <path d="M0,80 C360,0 1080,0 1440,80 L1440,0 L0,0 Z" fill={to} />
      </svg>
    </div>
  );
}

// The 3 money services get the prominent grid; drywall/fence are real
// services but shown as a smaller secondary strip beneath them.
const coreServices = [
  { title: "Interior Painting", description: "Interior painting for walls, ceilings, trim, doors, and whole-home repaints.", href: "/interior-painting", img: "/images/service-interior.jpg", alt: "Modern living room interior painting in Sugar Land, TX" },
  { title: "Exterior Painting", description: "Exterior painting built for Texas weather with proper washing, prep, caulking, priming, and durable coatings.", href: "/exterior-painting", img: "/images/service-exterior.jpg", alt: "Spanish-style exterior house painting in Richmond, TX" },
  { title: "Cabinet Painting", description: "Factory-style cabinet finishes for kitchens, bathrooms, built-ins, and storage spaces.", href: "/cabinet-painting", img: "/images/service-cabinet.jpg", alt: "Kitchen cabinet painting in Missouri City, TX" },
];
const secondaryServices = [
  { title: "Drywall Repair", href: "/interior-painting/drywall-repair" },
  { title: "Fence Staining", href: "/exterior-painting/fence-staining" },
];

// Fulshear intentionally stays a plain (non-linked) badge here — it's a
// controlled Sprint 2 pilot page and new inbound links from the highest-
// traffic page on the site would confound its measurement.
const serviceAreas = [
  { name: "Sugar Land", slug: "sugar-land" },
  { name: "Richmond", slug: "richmond" },
  { name: "Katy", slug: "katy" },
  { name: "Missouri City", slug: "missouri-city" },
  { name: "Fulshear", slug: null },
  { name: "Rosenberg", slug: "rosenberg" },
  { name: "West Houston", slug: "west-houston" },
  { name: "Southwest Houston", slug: "southwest-houston" },
];

// The canonical business entity (@id #business) is emitted once globally in
// app/layout.tsx and referenced by every page's Service/Breadcrumb nodes, so
// the homepage does not redefine it here.

export default function HomePage() {
  const homepageReviews = HOMEPAGE_REVIEW_AUTHORS
    .map((author) => getReviews().find((r) => r.author === author))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }} />

      {/* ── HERO ── */}
      <section className="relative w-full h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Freshly painted stucco exterior in Richmond, TX by The Proud Paintbrush"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow">
            House Painters in Sugar Land &amp; Fort Bend County
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow">
            Interior, exterior &amp; cabinet painting done right — prep-first, warranty-backed, locally owned.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton
              label="Get a Free Estimate"
              className="inline-block bg-[#4B83B2] hover:bg-white hover:text-[#1a2e44] text-white font-bold text-lg px-8 py-4 rounded-xl shadow-xl ring-2 ring-white/30 transition-colors"
            />
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#1a2e44] font-bold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ── AMY VIDEO TESTIMONIAL BANNER ── */}
      <section className="bg-[#3A6A96] text-white pt-10 pb-0">
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/90 mb-2">
                Amy — Kitchen Painting
              </p>
              <blockquote className="text-2xl sm:text-3xl font-light italic leading-snug mb-4">
                &ldquo;I did not know paint could make me so happy.&rdquo;
              </blockquote>
              <p className="text-white/90 leading-relaxed">
                Amy&apos;s kitchen was dated 15-plus years — new paint alone transformed it. She highly,
                highly, highly recommends The Proud Paintbrush.
              </p>
            </div>
            <div className="relative aspect-video w-full rounded-sm overflow-hidden shadow-2xl">
              <LiteYouTube id="5EHTLQCh5tM" label="Amy testimonial — The Proud Paintbrush" />
            </div>
          </div>
        </div>
        <WaveDown from="bg-[#3A6A96]" to="#eef1f5" />
      </section>

      {/* ── REQUEST A FREE ESTIMATE (booking embed) ── */}
      <section className="bg-[#eef1f5] text-[#1a2e44] pt-12 pb-0">
        <div className="max-w-6xl mx-auto px-4 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* LEFT: copy + booking form */}
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-3">Request Your Free Estimate</h2>
              <p className="text-gray-600 text-lg mb-8">
                Pick a time that works for you — most estimates take 30&ndash;40 minutes. We&apos;ll walk the
                space with you, answer every question, and leave you with a clear, honest quote.
              </p>
              <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-6">
                <iframe
                  src={BOOKING_EMBED_URL}
                  title="Book your free painting estimate — The Proud Paintbrush"
                  className="w-full rounded-lg overflow-hidden"
                  style={{ minHeight: "640px", border: "none" }}
                  loading="lazy"
                />
              </div>
            </div>
            {/* RIGHT: trust-building photo */}
            <div className="relative min-h-[360px] lg:min-h-full rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/exterior-house-painting-after-the-proud-paintbrush.jpg"
                alt="Freshly painted two-story home exterior by The Proud Paintbrush in Fort Bend County, TX"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
                quality={85}
              />
            </div>
          </div>
        </div>
        <WaveDown from="bg-[#eef1f5]" to="#111111" />
      </section>

      {/* ── SERVICES on black ── */}
      <section className="bg-[#111111] text-white pt-4 pb-0">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Painting Services Across Fort Bend &amp; West Houston
          </h2>
          <p className="text-white/60 text-center max-w-2xl mx-auto mb-14 text-lg">
            Interior painting that actually lasts — and exterior work built for Texas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {coreServices.map((s) => (
              <Link key={s.href} href={s.href} className="group flex flex-col hover:opacity-90 transition-opacity">
                <div className="relative w-full h-56 overflow-hidden mb-5">
                  <Image src={s.img} alt={s.alt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover object-center group-hover:scale-105 transition-transform duration-500" quality={85} />
                </div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-[#3A6A96] transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <span className="text-white/50 text-sm uppercase tracking-widest">Also available</span>
            {secondaryServices.map((s) => (
              <Link key={s.href} href={s.href} className="text-white/80 hover:text-[#3A6A96] font-medium transition-colors">
                {s.title} &rarr;
              </Link>
            ))}
          </div>
        </div>
        <WaveDown from="bg-[#111111]" to="#ffffff" />
      </section>

      {/* ── WHY GULF COAST CONDITIONS ARE HARD ON PAINT ── */}
      <section className="bg-white py-20">
        <MechanismSection
          heading="Why Gulf Coast Conditions Punish a Paint Job"
          body="Fort Bend County sits on shrink-swell clay that expands and contracts with every wet-to-dry cycle, pulling at fascia, siding, and stucco joints year after year. Add summer heat and UV that break down lower-grade coatings in five to seven years, and humidity that pushes moisture into caulk lines, bathrooms, and closets on exterior walls, and the paint on a Texas home is under real, constant pressure. Most repaints that fail early didn't fail because of a bad paint brand — they failed because the surface wasn't washed, scraped, caulked, and primed correctly before the first coat went on. That prep-first standard is what we build every project around, on every surface, every time."
        />
      </section>

      {/* ── COST ANCHORING ── */}
      <section className="bg-[#eef1f5] py-20">
        <CostTable
          heading="What Painting Costs in Fort Bend County"
          intro="Based on 97 real, closed painting jobs across Fort Bend County, excluding touch-ups and single-item jobs under $800 that would skew the range low."
          rows={[
            { area: "Fort Bend County (all jobs)", median: "$2,500", low: "$837", high: "$21,078", sample: "97 jobs" },
            { area: "Missouri City", median: "$3,841", low: "—", high: "—", sample: "12 jobs" },
            { area: "Katy", median: "$2,735", low: "—", high: "—", sample: "17 jobs" },
            { area: "Richmond", median: "$2,029", low: "—", high: "—", sample: "11 jobs" },
            { area: "Sugar Land", median: "$1,534", low: "—", high: "—", sample: "10 jobs" },
          ]}
          note="Every project gets its own written quote after a free on-site walkthrough — these numbers are a starting reference, not a substitute for a real estimate."
        />
      </section>

      <ProudProcess />

      {/* ── INTERIOR PAINTING + 2 VIDEO TESTIMONIALS ── */}
      <section className="bg-[#eef1f5] pt-16 pb-0">
        <div className="max-w-6xl mx-auto px-4 pb-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#3A6A96] text-center mb-3">
            Real Customers, Real Results
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-4">
            Interior Painting That Actually Lasts
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12 text-lg">
            Most painters skip the prep. We don&apos;t. Every project starts with surface cleaning, sanding, caulking, and priming — because that&apos;s what makes the finish last.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <LiteYouTube id="4K_j8zfo2zQ" label="Interior painting testimonial — The Olsons — The Proud Paintbrush" />
              </div>
              <p className="text-center text-gray-500 text-sm mt-3 font-medium">The Olsons — Interior Repaint</p>
            </div>
            <div>
              <div className="relative aspect-video w-full rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <LiteYouTube id="HkXdwkgfhCI" label="Dr. Tepper testimonial — The Proud Paintbrush" />
              </div>
              <p className="text-center text-gray-500 text-sm mt-3 font-medium">Dr. Tepper — Exterior Repaint</p>
            </div>
          </div>
          <div className="text-center">
            <BookingButton
              label="Schedule Your Free Estimate"
              className="inline-block bg-[#3A6A96] hover:bg-[#2d5478] text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition-colors"
            />
          </div>
        </div>
      </section>

      {/* ── BLUE CTA ── */}
      <section className="bg-[#eef1f5] pb-0">
        <WaveUp from="bg-[#eef1f5]" to="#3A6A96" />
        <div className="bg-[#3A6A96] text-white py-16 px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Talk About Your Project?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Most painting estimates take 30–40 minutes. We&apos;ll walk the space with you, answer every question, and leave you with a clear, honest quote.
          </p>
          <BookingButton
            label="Schedule Your Free Estimate"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors"
          />
        </div>
        <WaveDown from="bg-[#3A6A96]" to="#ffffff" />
      </section>

      {/* ── WRITTEN GOOGLE REVIEWS ── */}
      {homepageReviews.length > 0 && (
        <section className="bg-white pt-16 pb-4">
          <ReviewCards
            reviews={homepageReviews}
            heading="What Fort Bend County Homeowners Say"
            intro="Real, verified five-star Google reviews from Proud Paintbrush customers."
            columns={3}
            masonry
          />
        </section>
      )}

      {/* ── TESTIMONIAL PHOTO CAROUSEL ── */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-2">
            Here&apos;s What Your Neighbors Had To Say
          </h2>
          <p className="text-gray-500 text-center mb-10">Real customers. Real results.</p>
          <TestimonialCarousel />
          <div className="text-center mt-10">
            <Link href="/testimonials"
              className="border-2 border-[#3A6A96] text-[#3A6A96] hover:bg-[#3A6A96] hover:text-white font-semibold px-8 py-3 transition-colors inline-block">
              See All Testimonials
            </Link>
          </div>
        </div>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="relative py-20 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)" }}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }} />
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                We&apos;ve Painted Hundreds of Homes Across Fort Bend County &amp; West Houston
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">But the company we built is a reflection of the family behind it — and our story didn&apos;t start easy.</p>
              <p className="text-white/70 leading-relaxed mb-4">We walked through infertility, IVF, uncertainty, and a lot of hard years.</p>
              <p className="text-white/70 leading-relaxed mb-4">Those experiences shaped who we became. They taught us patience. They taught us perseverance. And they reinforced something we already believed: do things the right way — even when it&apos;s harder.</p>
              <p className="text-white/70 leading-relaxed mb-8">Today we&apos;re proud parents to Isaac and Samuel, and those same values guide how we serve our customers. To us, painting isn&apos;t just paint.</p>
              <Link href="/our-story"
                className="inline-block border-2 border-[#3A6A96] text-[#3A6A96] hover:bg-[#3A6A96] hover:text-white font-semibold px-8 py-3 transition-colors">
                Read Our Story
              </Link>
            </div>
            <div className="relative h-80 lg:h-[480px] overflow-hidden rounded-sm">
              <Image src="/images/paint-it-forward-community.jpg" alt="The Proud Paintbrush Paint It Forward community project in Sugar Land, TX"
                fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-center" quality={90} />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICE AREAS WITH MAP ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-4">
            Have We Painted In Your Area?
          </h2>
          <p className="text-gray-500 text-center mb-10 text-lg">
            Based in Sugar Land — serving all of Fort Bend County and West Houston.
          </p>
          <div className="relative w-full max-w-3xl mx-auto mb-8 overflow-hidden rounded-[3rem] shadow-2xl ring-1 ring-gray-200">
            <Image
              src="/images/service-area-map.jpg"
              alt="Map of painting service areas including Sugar Land, Richmond, Katy, Missouri City, Fulshear, and West Houston"
              width={900}
              height={600}
              className="w-full h-auto"
              quality={90}
            />
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area) =>
              area.slug ? (
                <Link
                  key={area.name}
                  href={`/service-areas/${area.slug}`}
                  className="bg-gray-100 hover:bg-[#3A6A96] text-[#111111] hover:text-white text-sm font-medium px-5 py-2 rounded-full transition-colors"
                >
                  {area.name}
                </Link>
              ) : (
                <span key={area.name} className="bg-gray-100 text-[#111111] text-sm font-medium px-5 py-2 rounded-full">
                  {area.name}
                </span>
              )
            )}
          </div>
          <div className="text-center mt-6">
            <Link href="/service-areas" className="text-[#3A6A96] font-semibold hover:underline">
              See all service areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-20">
        <FaqSection heading="Common Questions About Painting in Fort Bend County" faqs={HOMEPAGE_FAQS} />
      </section>

      {/* ── FINAL CTA with painter photo ── */}
      <section className="relative bg-[#3A6A96] text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cta-painter-trim.jpg"
            alt="Painter working on exterior trim in Sugar Land, TX"
            fill
            className="object-cover object-center opacity-20"
            quality={80}
          />
        </div>
        <div className="relative z-10 py-20 px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready To Talk About Your Project?</h2>
          <p className="text-white/90 text-lg mb-8 max-w-xl mx-auto">
            Get a free estimate from Fort Bend County&apos;s most trusted painting team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingButton
              label="Schedule Your Free Estimate"
              className="border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors"
            />
            <a href="tel:+18326050493"
              className="border-2 border-white text-white hover:bg-white hover:text-[#3A6A96] font-semibold px-10 py-4 text-lg transition-colors">
              Call (832) 605-0493
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
