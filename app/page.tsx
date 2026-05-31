import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import TrustBar from "@/components/TrustBar";
import ProudProcess from "@/components/ProudProcess";

export const metadata: Metadata = {
  title: "Sugar Land Painting Contractor",
  description: "Top-rated residential & commercial painters in Sugar Land & Fort Bend County. Licensed, insured, 2-year warranty. Get your free estimate today.",
  openGraph: {
    title: "The Proud Paintbrush | Sugar Land Painting Contractor",
    description: "Top-rated residential & commercial painters in Sugar Land & Fort Bend County. Licensed, insured, 2-year warranty. Get your free estimate today.",
    url: "https://www.theproudpaintbrush.com",
  },
};

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";
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

const services = [
  { title: "Interior Painting", description: "Interior painting for walls, ceilings, trim, doors, and whole-home repaints.", href: "/interior-painting", img: "/images/service-interior.jpg", alt: "Modern living room interior painting in Sugar Land, TX" },
  { title: "Exterior Painting", description: "Exterior painting built for Texas weather with proper washing, prep, caulking, priming, and durable coatings.", href: "/exterior-painting", img: "/images/service-exterior.jpg", alt: "Spanish-style exterior house painting in Richmond, TX" },
  { title: "Cabinet Painting", description: "Factory-style cabinet finishes for kitchens, bathrooms, built-ins, and storage spaces.", href: "/cabinet-painting", img: "/images/service-cabinet.jpg", alt: "Kitchen cabinet painting in Missouri City, TX" },
  { title: "Drywall Repair", description: "Holes, cracks, and water damage patched and textured to blend seamlessly before painting.", href: "/drywall-repair", img: "/images/service-drywall.jpg", alt: "Drywall repair and texture finishing in Sugar Land, TX" },
  { title: "Fence Staining", description: "Professional-grade stains and sealers to protect and beautify your wood fence.", href: "/fence-staining", img: "/images/service-fence.jpg", alt: "Fence staining project in Katy, TX" },
];

const serviceAreas = ["Sugar Land", "Richmond", "Katy", "Missouri City", "Fulshear", "Rosenberg", "West Houston", "Southwest Houston"];

const homepageSchema = {
  "@context": "https://schema.org",
  "@type": "PaintingContractor",
  name: "The Proud Paintbrush",
  url: "https://www.theproudpaintbrush.com",
  telephone: "+1-832-605-0493",
  address: { "@type": "PostalAddress", addressLocality: "Sugar Land", addressRegion: "TX", postalCode: "77498", addressCountry: "US" },
  areaServed: serviceAreas.map((a) => `${a}, TX`),
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />

      {/* ── HERO ── */}
      <section className="relative w-full h-[90vh] min-h-[560px] flex items-center justify-center overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Freshly painted stucco exterior in Richmond, TX by The Proud Paintbrush"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 drop-shadow">
            House Painters in Sugar Land &amp; Fort Bend County
          </h1>
          <p className="text-lg sm:text-xl text-white/90 drop-shadow">
            Interior, exterior &amp; cabinet painting done right — prep-first, warranty-backed, locally owned.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* ── DR. TEPPER VIDEO TESTIMONIAL BANNER ── */}
      <section className="bg-[#4B83B2] text-white pt-10 pb-0">
        <div className="max-w-6xl mx-auto px-4 pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-2">
                Dr. Tepper — Avalon · Exterior House Painting
              </p>
              <blockquote className="text-2xl sm:text-3xl font-light italic leading-snug mb-4">
                &ldquo;You guys did great.&rdquo;
              </blockquote>
              <p className="text-white/80 leading-relaxed">
                Dr. Tepper found us through a neighbor and said we did exactly what was promised.
              </p>
            </div>
            <div className="aspect-video w-full rounded-sm overflow-hidden shadow-2xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/HkXdwkgfhCI"
                title="Dr. Tepper testimonial — The Proud Paintbrush"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
        <WaveDown from="bg-[#4B83B2]" to="#111111" />
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {services.map((s) => (
              <Link key={s.href} href={s.href} className="group flex flex-col hover:opacity-90 transition-opacity">
                <div className="relative w-full h-56 overflow-hidden mb-5">
                  <Image src={s.img} alt={s.alt} fill className="object-cover object-center group-hover:scale-105 transition-transform duration-500" quality={85} />
                </div>
                <h3 className="text-2xl font-semibold mb-2 group-hover:text-[#4B83B2] transition-colors">
                  {s.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">{s.description}</p>
              </Link>
            ))}
          </div>
        </div>
        <WaveDown from="bg-[#111111]" to="#ffffff" />
      </section>

      <ProudProcess />

      {/* ── INTERIOR PAINTING + 2 VIDEO TESTIMONIALS ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-4">
            Interior Painting That Actually Lasts
          </h2>
          <p className="text-gray-500 text-center max-w-2xl mx-auto mb-12 text-lg">
            Most painters skip the prep. We don&apos;t. Every project starts with surface cleaning, sanding, caulking, and priming — because that&apos;s what makes the finish last.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="aspect-video w-full rounded-sm overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/4K_j8zfo2zQ"
                title="Interior painting testimonial — The Proud Paintbrush"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <div className="aspect-video w-full rounded-sm overflow-hidden shadow-md">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/gxB9xw9m34U"
                title="Interior painting testimonial 2 — The Proud Paintbrush"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
          <div className="text-center">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[#4B83B2] text-[#4B83B2] hover:bg-[#4B83B2] hover:text-white font-semibold px-8 py-3 transition-colors"
            >
              Schedule Your Free Estimate
            </a>
          </div>
        </div>
      </section>

      {/* ── BLUE CTA ── */}
      <section className="bg-white pb-0">
        <WaveUp from="bg-white" to="#4B83B2" />
        <div className="bg-[#4B83B2] text-white py-16 px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Talk About Your Project?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Most painting estimates take 30–40 minutes. We&apos;ll walk the space with you, answer every question, and leave you with a clear, honest quote.
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors">
            Schedule Your Free Estimate
          </a>
        </div>
        <WaveDown from="bg-[#4B83B2]" to="#ffffff" />
      </section>

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
              className="border-2 border-[#4B83B2] text-[#4B83B2] hover:bg-[#4B83B2] hover:text-white font-semibold px-8 py-3 transition-colors inline-block">
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
              <p className="text-white/70 leading-relaxed mb-4">We walked through infertility, IVF, uncertainty, and a lot of hard years.</p>
              <p className="text-white/70 leading-relaxed mb-4">Those experiences shaped who we became. They taught us patience. They taught us perseverance. And they reinforced something we already believed: do things the right way — even when it&apos;s harder.</p>
              <p className="text-white/70 leading-relaxed mb-8">Today we&apos;re proud parents to Isaac and Samuel, and those same values guide how we serve our customers. To us, painting isn&apos;t just paint.</p>
              <Link href="/our-story"
                className="inline-block border-2 border-[#4B83B2] text-[#4B83B2] hover:bg-[#4B83B2] hover:text-white font-semibold px-8 py-3 transition-colors">
                Read Our Story
              </Link>
            </div>
            <div className="relative h-80 lg:h-[480px] overflow-hidden rounded-sm">
              <Image src="/images/paint-it-forward-community.jpg" alt="The Proud Paintbrush Paint It Forward community project in Sugar Land, TX"
                fill className="object-cover object-center" quality={90} />
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
            {serviceAreas.map((area) => (
              <span key={area} className="bg-gray-100 text-[#111111] text-sm font-medium px-5 py-2 rounded-full">
                {area}
              </span>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/exterior-painting" className="text-[#4B83B2] font-semibold hover:underline">
              See all service areas &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA with painter photo ── */}
      <section className="relative bg-[#4B83B2] text-white overflow-hidden">
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
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors">
              Schedule Your Free Estimate
            </a>
            <a href="tel:+18326050493"
              className="border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors">
              Call (832) 605-0493
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
