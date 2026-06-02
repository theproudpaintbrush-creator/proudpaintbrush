import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Drywall Repair in Sugar Land & Fort Bend County",
  description:
    "Expert drywall repair in Sugar Land — holes, cracks, water damage, popcorn ceiling removal. Seamless finish, paint-ready results. Free estimates.",
  openGraph: {
    title: "Drywall Repair in Sugar Land & Fort Bend County | The Proud Paintbrush",
    description:
      "Expert drywall repair in Sugar Land — holes, cracks, water damage, popcorn ceiling removal. Seamless finish, paint-ready results. Free estimates.",
    url: "https://www.theproudpaintbrush.com/drywall-repair",
  },
};

const BOOKING_URL = "https://theproudpaintbrush.youcanbook.me";

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Drywall Repair",
  provider: { "@id": "https://www.theproudpaintbrush.com/#business" },
  areaServed: [
    "Sugar Land, TX",
    "Missouri City, TX",
    "Richmond, TX",
    "Katy, TX",
    "Fulshear, TX",
    "Rosenberg, TX",
    "West Houston, TX",
  ],
  description:
    "Professional drywall repair in Sugar Land — holes, cracks, water damage, seamless finish, paint-ready results.",
};

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

const serviceAreas = [
  "Sugar Land",
  "Missouri City",
  "Richmond",
  "Katy",
  "Fulshear",
  "Rosenberg",
  "West Houston",
];

const commonIssues = [
  "Holes from door handles or accidents",
  "Water damage and stains",
  "Nail pops and screw holes",
  "Settlement cracks around doors, windows, or ceilings",
  "Seam gaps and uneven textures",
];

const processSteps = [
  {
    num: "1",
    title: "Assessment",
    desc: "We inspect the damaged area, determine the cause and extent of the problem, and plan the right repair approach.",
  },
  {
    num: "2",
    title: "Preparation",
    desc: "We protect surrounding surfaces and prepare the work area before any repair work begins.",
  },
  {
    num: "3",
    title: "Repair & Blending",
    desc: "We patch, fill, and blend the repair into the surrounding wall or ceiling texture so it disappears seamlessly.",
  },
  {
    num: "4",
    title: "Sanding & Finishing",
    desc: "We sand and finish the repaired area to match the surrounding surface texture and create a paint-ready result.",
  },
  {
    num: "5",
    title: "Painting (Optional)",
    desc: "We can paint the repaired area or the entire wall to ensure a consistent, finished appearance.",
  },
];

const whyChooseUs = [
  {
    title: "Local Expertise",
    desc: "We understand the common causes of drywall damage in Fort Bend County homes and know how to fix them right.",
  },
  {
    title: "Seamless Finish",
    desc: "Our repairs blend flawlessly with surrounding surfaces — no visible patches or texture mismatches.",
  },
  {
    title: "Complete Service",
    desc: "From patching to painting, we handle every step so you don't have to coordinate multiple contractors.",
  },
];

const faqs = [
  {
    q: "How much does drywall repair cost?",
    a: "Cost varies based on the size, number, and complexity of repairs needed. Small holes and cracks are typically straightforward. Larger areas with water damage or structural issues require more work. We provide free estimates so you know the cost upfront.",
  },
  {
    q: "Can you match my existing wall texture?",
    a: "Yes. Texture matching is a core part of what we do. Whether your walls have orange peel, knockdown, smooth, or another texture, we work to blend the repair so it's not visible after painting.",
  },
  {
    q: "Do I need to repaint after drywall repair?",
    a: "In most cases, yes — at least the repaired area. For a truly seamless result, painting the full wall is often recommended. We offer painting as part of our drywall repair service.",
  },
  {
    q: "How long does drywall repair take?",
    a: "Small repairs often take a few hours. Larger projects or multiple rooms may require a full day or more. We outline the timeline during your free estimate.",
  },
];

export default function DrywallRepairPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* HERO */}
      <section className="relative w-full h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/dry-professional.jpg"
          alt="Drywall repair in Sugar Land, TX by The Proud Paintbrush"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Drywall Repair in Sugar Land, TX
          </h1>
          <p className="text-lg sm:text-xl text-white/85 mb-8">
            Seamless repairs for cracks, holes, and water damage. Paint-ready finish every time.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#111111] font-semibold px-8 py-4 transition-colors"
          >
            Schedule Your Free Estimate &rarr;
          </a>
        </div>
      </section>

      {/* SECTION 1 — Intro (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-8">
            Professional Drywall Repair
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-5">
            Drywall damage can take away from the beauty of your home. Whether caused by accidents, settling, or moisture, professional drywall repair ensures your walls look smooth and ready for paint. At The Proud Paintbrush, we offer drywall repair in Sugar Land with attention to detail that leaves no trace of prior damage.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            We believe in craftsmanship that lasts, whether you need a small patch or multiple rooms repaired.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Common Issues (black bg with waves) */}
      <WaveDown from="bg-white" to="#111111" />
      <section className="bg-[#111111] text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            Common Drywall Issues We Fix
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
            {commonIssues.map((issue) => (
              <div key={issue} className="border border-white/20 p-5 text-white/80 text-sm">
                {issue}
              </div>
            ))}
          </div>
          {/* Photo row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { src: "/images/commercial-interior-painting-happy-customer-sugar-land-tx.jpg", alt: "Happy customer after commercial interior painting in Sugar Land TX" },
              { src: "/images/dry-popcorn-ceiling.jpg", alt: "Popcorn ceiling removal in Sugar Land TX" },
              { src: "/images/dry-ceiling-repair.jpg", alt: "Drywall ceiling repair Sugar Land TX" },
            ].map((img) => (
              <div key={img.src} className="relative h-64 overflow-hidden">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <WaveUp from="bg-[#111111]" to="#ffffff" />

      {/* SECTION 3 — Process (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">
            Our Drywall Repair Process
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="flex gap-5">
                <div className="flex-shrink-0 w-10 h-10 bg-[#4B83B2] text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-[#111111] mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — Why Us (light gray bg) */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-10">
            Why Choose The Proud Paintbrush for Drywall Repair?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
            {whyChooseUs.map((item) => (
              <div key={item.title} className="bg-white p-6 border border-gray-200">
                <h3 className="font-bold text-[#111111] mb-3 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="relative w-full h-72 overflow-hidden">
            <Image
              src="/images/dry-entertainment-1.jpg"
              alt="Custom drywall entertainment center in Sugar Land, TX"
              fill
              className="object-cover"
              quality={90}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 — FAQs (white bg) */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] text-center mb-12">
            Drywall Repair FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border border-gray-200 p-6">
                <h3 className="font-bold text-[#111111] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — Service Areas + CTA (blue bg) */}
      <section className="bg-[#4B83B2] text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Drywall Repair in Sugar Land &amp; Surrounding Areas
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="bg-white/20 text-white text-sm font-medium px-4 py-2"
              >
                {area}
              </span>
            ))}
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-2 border-white text-white hover:bg-white hover:text-[#4B83B2] font-semibold px-10 py-4 text-lg transition-colors"
          >
            Schedule Your Free Estimate
          </a>
        </div>
      </section>
    </>
  );
}
